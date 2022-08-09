const { User } = require("../../../models/users.model");
const bcrypt = require("bcrypt");

const authUser = async (user) => {
  const currentUser = await User.findOne({ email: user.email });
  if (!currentUser) throw new Error();

  const isValid = await bcrypt.compare(user.password, currentUser.password);
  if (!isValid) throw new Error();
  const token = currentUser.generateAuthToken();
  return token;
};

module.exports = {
  authUser,
};
