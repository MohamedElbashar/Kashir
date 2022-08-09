const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

exports.Permission = Permission;
