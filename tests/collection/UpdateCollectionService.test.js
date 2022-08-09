const CollectionMoc = {
  findByIdAndUpdate: jest.fn(),
};

const resetAllMocks = () => {
  CollectionMoc.findByIdAndUpdate.mockReset();
};

jest.doMock("../../models/collection.model", () => {
  return {
    Collection: CollectionMoc,
  };
});

const collectionService = require("../../routes/collection/service");
const CollectionId = "5e9f8f8f8f8f8f8f8f8f8f8";
describe("Update collection service", () => {
  beforeEach(() => {
    resetAllMocks();
  });
  it("should throw an error if exception happens on Collection level", async () => {
    CollectionMoc.findByIdAndUpdate.mockRejectedValue(
      new Error("Mock Db Error")
    );
    try {
      await collectionService.updateCollection(CollectionId, CollectionMoc);
    } catch (err) {
      expect(err.message).toBe("Mock Db Error");
    }
  });
  it("should return a collection if it is updated successfully", async () => {
    CollectionMoc.findByIdAndUpdate.mockResolvedValue({
      name: "Collection 1",
      groupId: "5e9f8f8f8f8f8f8f8f8f8f8",
    });

    const response = await collectionService.updateCollection(
      CollectionId,
      CollectionMoc
    );
    expect(response.name).toBe("Collection 1");
  });
});
