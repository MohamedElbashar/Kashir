const CollectionMoc = {
  findOne: jest.fn(),
  create: jest.fn(),
};
const resetAllMocks = () => {
  CollectionMoc.findOne.mockReset();
};

jest.doMock("../models/collection.model", () => {
  return {
    Collection: CollectionMoc,
  };
});
const collectionService = require("../routes/collection/service");

describe("Collection service", () => {
  beforeEach(() => {
    resetAllMocks();
  });
  it("should throw an error if exception happens on Collection level", async () => {
    CollectionMoc.findOne.mockRejectedValue(new Error("Mock Db Error"));
    try {
      await collectionService.createCollection(CollectionMoc);
    } catch (err) {
      expect(err.message).toBe("Mock Db Error");
    }
  });
  it("should throw an error if exception happens on Collection level", async () => {
    CollectionMoc.findOne.mockResolvedValue(null);
    CollectionMoc.create.mockRejectedValue(new Error("Mock Db Error"));
    try {
      await collectionService.createCollection(CollectionMoc);
    } catch (err) {
      expect(err.message).toBe("Mock Db Error");
    }
  });
  it("should return a collection if it is created successfully", async () => {
    CollectionMoc.findOne.mockResolvedValue(null);
    CollectionMoc.create.mockResolvedValue({
      name: "Collection 1",
      groupId: "5e9f8f8f8f8f8f8f8f8f8f8",
    });

    const response = await collectionService.createCollection(CollectionMoc);
    expect(response.name).toBe("Collection 1");
  });
});
