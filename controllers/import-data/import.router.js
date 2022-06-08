const router = require("express").Router();
const controller = require("./import.controller");

router.post("/add-data", controller.addData);
router.post("initialize-import", controller.initialize);
router.get("/get-meta-data", controller.showMetaData);
router.get("get-all-meta-data", controller.showAllMetaData);

module.exports= router;
