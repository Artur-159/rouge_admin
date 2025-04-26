import * as yup from "yup";

export const validateFileField = ({
  message,
  fieldName,
  eqValue,
  required = false,
}) => {
  return yup.mixed().test(function (value) {
    const { path, parent, createError } = this;
    let isPassed = true;

    if (path in parent) {
      if (fieldName && parent?.[fieldName] && parent[fieldName] === eqValue) {
        if (!value) {
          isPassed = false;
        }

        if (value instanceof File) {
          if (!value.size && !value.name) {
            isPassed = false;
          }
        } else if (typeof value === "string" && !value?.length) {
          isPassed = false;
        }
      }

      if (!value && required) {
        isPassed = false;
      }

      if (value instanceof File && required) {
        if (!value.size && !value.name) {
          isPassed = false;
        }
      } else if (typeof value === "string" && !value?.length) {
        isPassed = false;
      }
    }

    return (
      isPassed ||
      createError({
        message,
        path,
      })
    );
  });
};

export const validateFileFieldRequired = ({
  message,
  fieldName,
  eqValue,
  required = false,
}) => {
  return yup
    .mixed()
    .required()
    .test(function (value) {
      const { path, parent, createError } = this;
      let isPassed = true;

      if (path in parent) {
        if (fieldName && parent?.[fieldName] && parent[fieldName] === eqValue) {
          if (!value) {
            isPassed = false;
          }

          if (value instanceof File) {
            if (!value.size && !value.name) {
              isPassed = false;
            }
          } else if (typeof value === "string" && !value?.length) {
            isPassed = false;
          }
        }

        if (!value && required) {
          isPassed = false;
        }

        if (value instanceof File && required) {
          if (!value.size && !value.name) {
            isPassed = false;
          }
        } else if (typeof value === "string" && !value?.length) {
          isPassed = false;
        }
      }

      return (
        isPassed ||
        createError({
          message,
          path,
        })
      );
    });
};

export const validation = yup.object().shape({
  name_en: yup.string().required("Name am is required"),
  address_en: yup.string().required("Address am is required"),
  coordinate_x: yup.string().required("Coordinate x:  is required"),
  coordinate_y: yup.string().required("Coordinate y:  is required"),
  image: validateFileFieldRequired("message", "image"),
});
