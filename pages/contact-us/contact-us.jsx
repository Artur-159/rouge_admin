import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContactUsAPI } from "../../services/contact-us";
import Params from "../../helpers/params";
import Toast from "../../helpers/status-text";
import MainButton from "../../components/button/button";
import BasicModal from "../../components/modal/modal";
import { isModalOpen } from "../../store/modal/slice";
import { isDeleteContactID } from "../../store/contact/slice";
import { isPage } from "../../store/pagination/slice";
import Pagination from "../../components/pagination/pagination";
import { isStatusText } from "../../store/contact/slice";

import styles from "./contact-us.module.scss";
import ImageZoom from "./components/image-zoom/image-zoom";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { offset, contacts, total, status } = useSelector((state) => ({
    offset: state.pagination.offset,
    ...state.contactUs,
  }));

  const handleDeleteContact = (id) => {
    dispatch(ContactUsAPI.deleteContact(id));
    dispatch(isDeleteContactID(id));
    dispatch(isModalOpen(false));
    dispatch(isPage(0));
  };

  useEffect(() => {
    const params = Params(10, offset * 10);
    dispatch(ContactUsAPI.getContactUs(params));
  }, [dispatch, offset]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully deleted", false, {
        onClose: () => {
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Contacts</h2>

      {contacts?.length > 0 ? (
        contacts.map((contact) => (
          <div className={styles.contact} key={contact.id}>
            <div className={styles.contact_name}>
              <div>
                <strong>Name: </strong> <span>{contact.name}</span>
              </div>
              <BasicModal
                color="error"
                title="Delete"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                <p>
                  Are you sure you want to proceed with this action? This action
                  cannot be undone.
                </p>

                <MainButton
                  color="error"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </MainButton>
              </BasicModal>
            </div>
            <hr />
            <strong>Phone: </strong> <span>{contact.phone}</span>
            <hr />
            <strong>Email</strong>: <span>{contact.email}</span>
            <hr />
            <strong>Message title</strong>: <span>{contact.message_title}</span>
            <hr />
            <strong>Message</strong>: <span>{contact.message}</span>
            <hr />
            <strong className={styles.media}>Media:</strong>
            {contact?.file ? (
              <ImageZoom
                srcPath={contact.file}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            ) : null}
          </div>
        ))
      ) : (
        <div>Contacts is empty...🥲</div>
      )}
      {total > 10 ? (
        <Pagination total={total} offset={offset} itemsPerPageCount={10} />
      ) : null}
    </div>
  );
};

export default ContactUs;
