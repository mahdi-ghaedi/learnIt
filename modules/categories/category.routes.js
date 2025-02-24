const express = require("express");
const { checkUser, isAdmin } = require("../../utilities/middlewares/auth");
const { isExistCat } = require("../../utilities/middlewares/category");
const {
  setCategory,
  edit,
  deleteOne,
  getCat,
} = require("./category.controller");

const catRouter = express.Router();

// لیست مسیرها برای مدیریت بهتر
const routes = [
  { method: "get", path: "/:id?", handlers: [getCat] },
  {
    method: "post",
    path: "/new",
    handlers: [isExistCat, checkUser, isAdmin, setCategory],
  },
  { method: "put", path: "/:id?", handlers: [checkUser, isAdmin, edit] },
  { method: "delete", path: "/:id?", handlers: [checkUser, deleteOne] },
];

// ثبت مسیرها در `catRouter`
routes.forEach(({ method, path, handlers }) => {
  catRouter[method](path, ...handlers);
});

module.exports = catRouter;
