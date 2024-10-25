const models = require("../config/models");

module.exports = {
  getUser: (id, userData) =>
    new Promise((resolve, reject) => {
      models.users
        .findOne({ _id: "671b9a0997f65184ecc276fc" })
        .then((isUserFound) => {
          if (isUserFound) {
            resolve(isUserFound);
          } else {
            reject("User not found");
          }
        })
        .catch(() => {
          reject("Error occurred while fetching user data");
        });
    }),
  update: (id, userData) =>
    new Promise((resolve, reject) => {
      models.users
        .findByIdAndUpdate(id, userData, { new: true, runValidators: true })
        .then((updatedUser) => {
          if (updatedUser) {
            resolve(updatedUser);
          } else {
            reject("User not found");
          }
        })
        .catch((err) => {
          console.error("error occur updating: " + err);
          reject("Error occurred while updating user data");
        });
    }),
};
