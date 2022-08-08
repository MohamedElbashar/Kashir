const schema = require("mongoose");

const permissionSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Permission = schema.model("Permission", permissionSchema);

module.exports = Permission;
