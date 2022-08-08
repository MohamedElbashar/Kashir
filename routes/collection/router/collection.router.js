const express = require("express");
const router = express.Router();
const collectionService = require("../service");
const { celebrate, Segments, Joi } = require("celebrate");
const auth = require("../../../middleware/auth");
const returnResponse = require("../../../utils/returnResponse");

const collectionValidationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().lowercase(),
  }),
});

router.get("/", auth, async (req, res) => {
  try {
    const response = await collectionService.getAllCollections();
    return returnResponse(
      200,
      "Successfully retrieved collections",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There is an error while retrieving collections",
      err,
      res
    );
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const response = await collectionService.getCollection(req.params.id);
    return returnResponse(
      200,
      "Successfully retrieved collection",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There is an error while retrieving collection",
      err,
      res
    );
  }
});
router.post("/", [collectionValidationSchema, auth], async (req, res) => {
  const collection = req.body;
  try {
    const response = await collectionService.createCollection(collection);
    return returnResponse(
      200,
      "Successfully created collection",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There is an error while creating collection",
      err,
      res
    );
  }
});
router.put("/:id", [collectionValidationSchema, auth], async (req, res) => {
  const collection = req.body;
  try {
    const response = await collectionService.updateCollection(
      req.params.id,
      collection
    );
    return returnResponse(
      200,
      "Successfully updated collection",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There is an error while updating collection",
      err,
      res
    );
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await collectionService.deleteCollection(req.params.id);
    return returnResponse(
      200,
      "Successfully deleted collection",
      response,
      res
    );
  } catch (err) {
    return returnResponse(
      400,
      "There is an error while deleting collection",
      err,
      res
    );
  }
});
module.exports = router;
