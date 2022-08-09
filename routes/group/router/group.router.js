const express = require("express");
const router = express.Router();
const groupService = require("../service");
const returnResponse = require("../../../utils/returnResponse");

const auth = require("../../../middleware/auth");
const {
  groupValidationSchema,
} = require("../validation/groupValidationSchema");

router.use(auth);
router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/", groupValidationSchema, async (req, res) => {
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
});

router.put("/:id", groupValidationSchema, async (req, res) => {
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
});

router.delete("/:id", auth, async (req, res) => {
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
});
module.exports = router;
