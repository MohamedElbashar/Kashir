const express = require("express");
const router = express.Router();
const groupService = require("../service");
const { celebrate, Segments, Joi } = require("celebrate");
const returnResponse = require("../../../utils/returnResponse");
Joi.objectId = require("joi-objectid")(Joi);
const auth = require("../../../middleware/auth");

const groupValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    collectionId: Joi.array().items(Joi.objectId()).required(),
  }),
});

router.get("/", auth, async (req, res) => {
  try {
    const response = await groupService.getAllGroups();
    return returnResponse(200, "Successfully retrieved groups", response, res);
  } catch (err) {
    return returnResponse(400, err.message, err, res);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const response = await groupService.getGroup(req.params.id);
    return returnResponse(200, "Successfully retrieved group", response, res);
  } catch (err) {
    return returnResponse(400, err.message, err, res);
  }
});

router.post("/", [groupValidationSchema, auth], async (req, res) => {
  const group = req.body;
  try {
    const response = await groupService.createGroup(group);
    return returnResponse(200, "Successfully created group", response, res);
  } catch (err) {
    console.Console(err);
    return returnResponse(400, err.message, err, res);
  }
});

router.put("/:id", [groupValidationSchema, auth], async (req, res) => {
  const group = req.body;
  try {
    const response = await groupService.updateGroup(req.params.id, group);
    return returnResponse(200, "Successfully updated group", response, res);
  } catch (err) {
    return returnResponse(400, err.message, err, res);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await groupService.deleteGroup(req.params.id);
    return returnResponse(200, "Successfully deleted group", response, res);
  } catch (err) {
    return returnResponse(400, err.message, err, res);
  }
});
module.exports = router;
