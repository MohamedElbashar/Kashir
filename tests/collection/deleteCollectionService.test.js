const CollectionMoc = {
  findByIdAndRemove: jest.fn(),
};

jest.doMock("../../models/collection.model", () => {
  return {
    Collection: {
      findByIdAndRemove: CollectionMoc.findByIdAndRemove,
    },
  };
});
const collectionService = require("../../routes/collection/service");
const CollectionId = "5e9f8f8f8f8f8f8f8f8f8f8";
describe("Delete collection service", () => {
  it("should throw an error if exception happens on Collection level", async () => {
    CollectionMoc.findByIdAndRemove.mockRejectedValue(
      new Error("Mock Db Error")
    );
    try {
      await collectionService.deleteCollection(CollectionId);
    } catch (err) {
      expect(err.message).toBe("Mock Db Error");
    }
  });
  it("should return a collection if it is found successfully", async () => {
    CollectionMoc.findByIdAndRemove.mockResolvedValue({
      name: "Collection 1",
      groupId: "5e9f8f8f8f8f8f8f8f8f8f8",
    });

    const response = await collectionService.deleteCollection(CollectionId);
    expect(response.name).toBe("Collection 1");
  });
});
