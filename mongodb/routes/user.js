const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserandUpdate,
  getUserandDelete,
  createUser,
} = require("../controllers/user");

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(getUserandUpdate)
  .delete(getUserandDelete);

module.exports = router;
