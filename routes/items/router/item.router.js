const express = require("express");
const router = express.Router();
const itemService = require("../service");

const auth = require("../../../middleware/auth");
const returnResponse = require("../../../utils/returnResponse");
const { itemValidationSchema } = require("../validation/itemValidationSchema");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const response = await itemService.getAllItems();
    return returnResponse(200, "Successfully retrieved items", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Items",
      err,
      res
    );
  }
});
router.get("/:id", async (req, res) => {
  try {
    const response = await itemService.getItem(req.params.id);
    return returnResponse(200, "Successfully retrieved item", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Retrieving Item",
      err,
      res
    );
  }
});
router.post("/", itemValidationSchema, async (req, res) => {
  const item = req.body;
  try {
    const response = await itemService.createItem(item);
    return returnResponse(200, "Successfully created item", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Creating Item",
      err,
      res
    );
  }
});
router.put("/:id", itemValidationSchema, async (req, res) => {
  const item = req.body;
  try {
    const response = await itemService.updateItem(req.params.id, item);
    return returnResponse(200, "Successfully updated item", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Updating Item",
      err,
      res
    );
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const response = await itemService.deleteItem(req.params.id);
    return returnResponse(200, "Successfully deleted item", response, res);
  } catch (err) {
    return returnResponse(
      400,
      "There Is An Error While Deleting Item",
      err,
      res
    );
  }
});
module.exports = router;
