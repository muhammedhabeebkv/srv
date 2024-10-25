const authController = require("../../controller/authController");

const router = require("express").Router();

router.get("/", (req, res) => {
  authController
    .getUser()
    .then((userData) => {
      let user = {
        _id: userData._id,
        loggedIn: true,
        username: userData.username,
        fname: userData.fname,
        lname: userData.lname,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        mobile: userData.mobile,
        email: userData.email,
        aadhar: userData.aadhar,
        address: userData.address,
        district: userData.district,
        state: userData.state,
        pincode: userData.pincode,
        guardian_name: userData.guardian_name,
        guardian_number: userData.guardian_number,
      };

      req.session.user = user;
      res.status(200).json({ status: "200", userData: user });
    })
    .catch(() => {
      let error = new Error("Couldn't get user");
      error.status = 404;
      return next(error);
    });
});
router.post("/", (req, res) => {
  console.log(req.body);
});

router.put("/:id", (req, res, next) => {
  let { id } = req.params;

  if (id == " ") {
    let error = new Error("Invalid id");
    error.status = 400;
    return next(error);
  }

  authController
    .update(id, req.body)
    .then((userData) => {
      let user = {
        _id: userData._id,
        loggedIn: true,
        username: userData.username,
        fname: userData.fname,
        lname: userData.lname,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        mobile: userData.mobile,
        email: userData.email,
        aadhar: userData.aadhar,
        address: userData.address,
        district: userData.district,
        state: userData.state,
        pincode: userData.pincode,
        guardian_name: userData.guardian_name,
        guardian_number: userData.guardian_number,
      };

      req.session.user = user;
      res.status(200).json({ status: "200", message: "User updated successfully", userData: user });
    })
    .catch((err) => {
      let error = new Error("Error updating user");
      error.status = 500;
      return next(error);
    });
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.status(302).json({ status: "302", redirect: "/", message: "You have been signed!" });
});

module.exports = router;
