const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController.js");


// all data route
router.get("/data", dataController.allData);
// get one route
router.get("/data/:id", dataController.getOne);
// create post route
router.post("/data", dataController.createPost);

router.put("/data/:id", dataController.update);

router.delete("/data/:id", dataController.deletePost);


// export router
module.exports = router;