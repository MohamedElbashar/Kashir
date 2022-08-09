const express = require("express");
const router = express.Router();
const groupService = require("../service");
const returnResponse = require("../../../utils/returnResponse");
const authPermission = require("../../../middleware/authPermission");
const auth = require("../../../middleware/auth");
const {
  groupValidationSchema,
} = require("../validation/groupValidationSchema");

router.use(auth);
// Get all groups
router.get("/", authPermission("get_groups"), async (req, res) => {
  try {
    const response = await groupService.getAllGroups();
    return returnResponse(200, "Successfully retrieved groups", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Creating Groups",
      err,
      res
    );
  }
});
// Get group by id
router.get("/:id", authPermission("get_groups"), async (req, res) => {
  try {
    const response = await groupService.getGroup(req.params.id);
    return returnResponse(200, "Successfully retrieved group", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Group",
      err,
      res
    );
  }
});
// Create group
router.post(
  "/",
  [authPermission("create_group"), groupValidationSchema],
  async (req, res) => {
    const group = req.body;
    try {
      const response = await groupService.createGroup(group);
      return returnResponse(200, "Successfully created group", response, res);
    } catch (err) {
      console.log(res);
      return returnResponse(
        400,
        "There Is An Error While Creating Group",
        err,
        res
      );
    }
  }
);
// Update group
router.put(
  "/:id",
  [authPermission("edit_group"), groupValidationSchema],
  async (req, res) => {
    const group = req.body;
    try {
      const response = await groupService.updateGroup(req.params.id, group);
      return returnResponse(200, "Successfully updated group", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Creating Group",
        err,
        res
      );
    }
  }
);
// Delete group
router.delete(
  "/:id",
  authPermission("delete_permission"),
  auth,
  async (req, res) => {
    try {
      const response = await groupService.deleteGroup(req.params.id);
      return returnResponse(200, "Successfully deleted group", response, res);
    } catch (err) {
      return returnResponse(
        400,
        "There Is An Error While Deleting Group",
        err,
        res
      );
    }
  }
);
module.exports = router;
