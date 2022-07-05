import Intro from "views/Intro";
import products from "views/pages/AddProducts/products";
import productsAddForm from "views/pages/AddProducts/productsAddForm";
import brands from "views/pages/brands/brands";
import brandsAddModal from "views/pages/brands/brandsAddModal";
import categories from "views/pages/Categories/categories";
import categoriesAddModal from "views/pages/Categories/categoriesAddModal";
import colors from "views/pages/Colors/colors";
import colorsAddModal from "views/pages/Colors/colorsAddModal";
import markers from "views/pages/Markers/markers";
import markersAddModal from "views/pages/Markers/markersAddModal";
import papers from "views/pages/Papers/papers";
import papersAddModal from "views/pages/Papers/papersAddModal";
import sizes from "views/pages/Sizes/sizes";
import sizesAddModal from "views/pages/Sizes/sizesAddModal";

const dashboardRoutes = [
  { path: "/intro", component: Intro },
  { path: "/categories", component: categories },
  { path: "/categories/add", component: categoriesAddModal },

  { path: "/brands", component: brands },
  { path: "/brands/add", component: brandsAddModal },

  { path: "/colors", component: colors },
  { path: "/colors/add", component: colorsAddModal },

  { path: "/papers", component: papers },
  { path: "/papers/add", component: papersAddModal },

  { path: "/sizes", component: sizes },
  { path: "/sizes/add", component: sizesAddModal },

  { path: "/markers", component: markers },
  { path: "/markers/add", component: markersAddModal },

  { path: "/Products", component: products },
  { path: "/Products/add", component: productsAddForm },
  { path: "/Products/edit/:id", component: productsAddForm },
];

export default dashboardRoutes;
