import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Users from "../pages/users/users";
import Brands from "../pages/brands/brands";
import BrandCrate from "../pages/brands/component/create/create";
import BrandEdit from "../pages/brands/component/edit/edit";
import FAQ from "../pages/faq/faq";
import EditFAQ from "../pages/faq/component/edit-FAQ/edit-FAQ";
import CreateFAQ from "../pages/faq/component/create-FAQ/create-FAQ";
import About from "../pages/about/about";
import Branch from "../pages/branch/branch";
import CreateBranch from "../pages/branch/components/create/create-branch";
import EditBranch from "../pages/branch/components/edit/edit-branch";
import Story from "../pages/story/story";
import CreateStory from "../pages/story/components/create/create-story";
import EditStory from "../pages/story/components/edit/edit-story";
import Blogs from "../pages/blog/blogs";
import Banner from "../components/banner/banner";
import CreateHomeBanner from "../pages/home/banner/components/create/create-home-banner";
import EditHomeBanner from "../pages/home/banner/components/edit/edit-home-banner";
import TopText from "../pages/top-text/top-text";
import Create from "../pages/top-text/components/create/create";
import Edit from "../pages/top-text/components/edit/edit";
import ContactUs from "../pages/contact-us/contact-us";
import Product from "../pages/product/product";
import EditProduct from "../pages/product/components/edit/edit";
import EditBlog from "../pages/blog/components/edit/edit-blog";
import CreateBlog from "../pages/blog/components/create/create-blog";

export const adminRoutes = [
  {
    name: "users",
    text: "Users",
    path: "/users",
    element: <Users />,
  },
  {
    name: "Home",
    text: "Home",
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "home/:userId",
        element: <EditHomeBanner />,
      },
      {
        path: "home/create",
        element: <CreateHomeBanner />,
      },
    ],
  },
  {
    name: "brand",
    text: "Brands",
    path: "/brand",
    element: <Brands />,
    children: [
      {
        path: "brand/create",
        element: <BrandCrate />,
      },
      {
        path: "brand/:userId",
        element: <BrandEdit />,
      },
      {
        path: "brand/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "top text",
    text: "Top text",
    path: "/top-text",
    element: <TopText />,
    children: [
      {
        path: "top-text/create",
        element: <Create />,
      },
      {
        path: "top-text/:id",
        element: <Edit />,
      },
      {
        path: "top-text/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "FAQ",
    text: "FAQ",
    path: "/faq",
    element: <FAQ />,
    children: [
      {
        path: "faq/:userId",
        element: <EditFAQ />,
      },
      {
        path: "faq/create",
        element: <CreateFAQ />,
      },
      {
        path: "faq/banner",
        element: <Banner />,
      },
    ],
  },

  {
    name: "story",
    text: "Story",
    path: "/story",
    element: <Story />,
    children: [
      {
        path: "story/create",
        element: <CreateStory />,
      },
      {
        path: "story/:userId",
        element: <EditStory />,
      },
    ],
  },
  {
    name: "About",
    text: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Branch",
    text: "Branch",
    path: "/branch",
    element: <Branch />,
    children: [
      {
        path: "branch/:userId",
        element: <EditBranch />,
      },
      {
        path: "branch/create",
        element: <CreateBranch />,
      },
      {
        path: "branch/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "Blog",
    text: "Blog",
    path: "/blog",
    element: <Blogs />,
    children: [
      {
        path: "blog/:userId",
        element: <EditBlog />,
      },
      {
        path: "blog/create",
        element: <CreateBlog />,
      },
      {
        path: "blog/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "contact us",
    text: "Contact Us",
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    name: "Product",
    text: "Product",
    path: "/product",
    element: <Product />,
    children: [
      {
        path: "product/:userId",
        element: <EditProduct />,
      },
    ],
  },
  {
    name: "logout",
    text: "Log out",
    path: "/login",
    element: <Login />,
  },
];

export const subRoutes = [
  {
    name: "users",
    text: "Users",
    path: "/users",
    element: <Users />,
  },
  {
    name: "brand",
    text: "Brand",
    path: "/brand",
    element: <Brands />,
    children: [
      {
        path: "brand/create",
        element: <BrandCrate />,
      },
      {
        path: "brand/:userId",
        element: <BrandEdit />,
      },
      {
        path: "brand/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "FAQ",
    text: "FAQ",
    path: "/faq",
    element: <FAQ />,
    children: [
      {
        path: "faq/:userId",
        element: <EditFAQ />,
      },
      {
        path: "faq/create",
        element: <CreateFAQ />,
      },
      {
        path: "faq/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "story",
    text: "Story",
    path: "/story",
    element: <Story />,
    children: [
      {
        path: "story/create",
        element: <CreateStory />,
      },
      {
        path: "story/:userId",
        element: <EditStory />,
      },
    ],
  },
  {
    name: "Home",
    text: "Home",
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "home/:userId",
        element: <EditHomeBanner />,
      },
      {
        path: "home/create",
        element: <CreateHomeBanner />,
      },
    ],
  },
  {
    name: "About",
    text: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Branch",
    text: "Branch",
    path: "/branch",
    element: <Branch />,
    children: [
      {
        path: "branch/:userId",
        element: <EditBranch />,
      },
      {
        path: "branch/create",
        element: <CreateBranch />,
      },
      {
        path: "branch/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "Blog",
    text: "Blog",
    path: "/blog",
    element: <Blogs />,
    children: [
      {
        path: "blog/:userId",
        element: <EditBlog />,
      },
      {
        path: "blog/create",
        element: <CreateBlog />,
      },
      {
        path: "blog/banner",
        element: <Banner />,
      },
    ],
  },
  {
    name: "logout",
    text: "Log out",
    path: "/login",
    element: <Login />,
  },
];

export const guestRoutes = [
  {
    name: "login",
    path: "/login",
    text: "Login",
    element: <Login />,
  },
];
