var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile("./index.html");
});

router.post("*", function(req, res, next) {
  console.log("post", req.body);
  
});

module.exports = router;
