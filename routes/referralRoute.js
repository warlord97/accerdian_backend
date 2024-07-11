const express = require("express");
const {
  handleGetReferrals,
  handleCreateReferrals,
} = require("../controller/referralController");

const router = express.Router();

router.get("/", handleGetReferrals);
router.post("/", handleCreateReferrals);

module.exports = router;
