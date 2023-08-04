const express = require("express");

const {
  getForms,
  getForm,
  deleteForm,
  addForm,
  editForm,
  getResponses,
  postResponses,
  postShareLink,
  getSharedForm,
} = require("../controllers/forms");
const { protectRoute } = require("../middleware/auth");

const router = express.Router();

router.get("/", protectRoute, getForms);
router.post("/", protectRoute, addForm);
router.get("/:formId", getForm);
router.delete("/:formId", deleteForm);
router.put("/:formId", editForm);

router.post("/share", postShareLink);
router.get("/share/:shareableLink", getSharedForm);

router.get("/:formId/responses", getResponses);
router.post("/:formId/responses", postResponses);

module.exports = router;
