const express = require("express");
const router = express.Router();
const collectionService = require("../service");
const auth = require("../../../middleware/auth");
const authPermission = require("../../../middleware/authPermission");
const returnResponse = require("../../../utils/returnResponse");
const {
  collectionValidationSchema,
} = require("../validation/collectionValidationSchema");

router.use(auth);
router.get("/", authPermission("get_collections"), async (req, res) => {
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
router.get("/:id", authPermission("get_collections"), async (req, res) => {
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
router.post(
  "/",
  [authPermission("create_collection"), collectionValidationSchema],
  async (req, res) => {
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
  }
);
router.put(
  "/:id",
  [authPermission("edit_collection"), collectionValidationSchema],
  async (req, res) => {
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
  }
);
router.delete(
  "/:id",
  authPermission("delete_collection"),
  auth,
  async (req, res) => {
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
  }
);
module.exports = router;
