// test getCollectionService
const CollectionMoc = {
  findById: jest.fn(),
};

const resetAllMocks = () => {
  CollectionMoc.findById.mockReset();
};

jest.doMock("../../models/collection.model", () => {
  return {
    Collection: CollectionMoc,
  };
});
const collectionService = require("../../routes/collection/service");
const CollectionId = "5e9f8f8f8f8f8f8f8f8f8f8";

describe("Get collection service", () => {
  beforeEach(() => {
    resetAllMocks();
  });
  it("should throw an error if exception happens on Collection level", async () => {
    CollectionMoc.findById.mockRejectedValue(new Error("Mock Db Error"));
    try {
      await collectionService.getCollection(CollectionId);
    } catch (err) {
      expect(err.message).toBe("Mock Db Error");
    }
  });
  it("should return a collection if it is found successfully", async () => {
    CollectionMoc.findById.mockResolvedValue({
      name: "Collection 1",
      groupId: "5e9f8f8f8f8f8f8f8f8f8f8",
    });

    const response = await collectionService.getCollection(CollectionId);
    expect(response.name).toBe("Collection 1");
  });
});
