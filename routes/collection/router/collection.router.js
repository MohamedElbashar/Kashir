const express = require("express");
const router = express.Router();
const collectionService = require("../service");
const { celebrate, Segments, Joi } = require("celebrate");
const auth = require("../../../middleware/auth");

const collectionValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().lowercase(),
  }),
});

router.get("/", auth, async (req, res) => {
  try {
    const response = await collectionService.getAllCollections();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const response = await collectionService.getCollection(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.post("/", [collectionValidationSchema, auth], async (req, res) => {
  const collection = req.body;

  try {
    const response = await collectionService.createCollection(collection);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.put("/:id", [collectionValidationSchema, auth], async (req, res) => {
  const collection = req.body;

  try {
    const response = await collectionService.updateCollection(
      req.params.id,
      collection
    );
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await collectionService.deleteCollection(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
});
module.exports = router;
