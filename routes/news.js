const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

//Route for create news
router.post("/news", newsController.createNews);

//Route for list news
router.get("/news", newsController.listNews);

//Route for update news by id
router.put("/news/:title", newsController.updateNewsByTitle);

//Route for delete news by id
router.delete("/news/:title", newsController.deleteNewsByTitle);

//Route for delete all news
router.delete("/news", newsController.deleteAllNews);

module.exports = router;
