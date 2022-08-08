const express = require("express");
const router = express.Router();
const groupService = require("../service");
const { celebrate, Segments, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
const auth = require("../../../middleware/auth");

const groupValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().lowercase(),
    collectionId: Joi.array().items(Joi.objectId()).required(),
  }),
});
router.get("/", auth, async (req, res) => {
  try {
    const response = await groupService.getAllGroups();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const response = await groupService.getGroup(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.post("/", [groupValidationSchema, auth], async (req, res) => {
  const group = req.body;
  try {
    const response = await groupService.createGroup(group);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.put("/:id", [groupValidationSchema, auth], async (req, res) => {
  const group = req.body;
  try {
    const response = await groupService.updateGroup(req.params.id, group);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await groupService.deleteGroup(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
module.exports = router;
