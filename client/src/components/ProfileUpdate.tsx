import { MdClose } from "react-icons/md";
import { Formik } from "formik";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { User } from "../config/type";

interface ProfileUpdateProps {
  setProfileUpdate: (value: boolean) => void;
  user: User;
  setUser: (value: User) => void;
}
const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ setProfileUpdate, user, setUser }) => {
  let abortController: AbortController = new AbortController();
  let isMounted: boolean = false;

  React.useEffect(() => {
    if (isMounted) {
      isMounted = false;
      abortController.abort();
    }
  }, []);

  return (
    <section className="absolute w-full h-full top-0 right-0 flex justify-center items-start bg-[#7fd4dd8c]">
      <div className="bg-white w-[800px] border border-[#eeeeee] rounded-[20px] rounded-tr-[75px] mt-20 relative py-3 px-10">
        <button onClick={() => setProfileUpdate(false)}>
          <MdClose className="w-[36px] h-[36px] p-1 rounded-full text-gray-500 bg-white absolute right-1 top-2 shadow-lg" />
        </button>
        <h1 className="font-medium text-[18px] mb-5">Basic Information</h1>

        <Formik
          initialValues={{
            fname: user.fname,
            lname: user.lname,
            dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0],
            gender: user.gender,
            mobile: user.mobile,
            email: user.email,
            aadhar: user.address,
            address: user.address,
            district: user.district,
            state: user.state,
            pincode: user.pincode,
            guardian_name: user.guardian_name,
            guardian_number: user.guardian_number,
          }}
          onSubmit={(value) => {
            axios
              .put("/user/auth/" + user._id, value, { signal: abortController.signal })
              .then((isChanged) => {
                if (isChanged.data.userData) {
                  setUser(isChanged.data.userData);
                }
                toast.success("Profile updated successfully.");
                setProfileUpdate(false);
              })
              .catch((err) => {
                console.log(err);
                toast.error(err?.response.data.message || err.message);
              });
          }}
        >
          {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="fname" className="text-[13px] text-[#2A2A2A]">
                    First Name <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Name"
                    value={values.fname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.lname && touched.lname && <span className="text-red-500 text-xs font-bold">{errors.lname}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="lname" className="text-[13px] text-[#2A2A2A]">
                    Last Name <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Last name"
                    value={values.lname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.lname && touched.lname && <span className="text-red-500 text-xs font-bold">{errors.lname}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="dateOfBirth" className="text-[13px] text-[#2A2A2A]">
                    Date of Birth <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    value={values.dateOfBirth}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.lname && touched.lname && <span className="text-red-500 text-xs font-bold">{errors.lname}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="lname" className="text-[13px] text-[#2A2A2A]">
                    Gender <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <ul className="w-full flex gap-3 py-3">
                    <li>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        className="hidden peer"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultChecked={user.gender === "male" ? true : false}
                      />
                      <label
                        htmlFor="male"
                        className="py-3 px-3.5 border peer-checked:border-orange-500 border-[#EEEEEE] rounded-[10px] cursor-pointer peer-checked:text-orange-500"
                      >
                        Male
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        className="hidden peer"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultChecked={user.gender === "female" ? true : false}
                      />
                      <label
                        htmlFor="female"
                        className="py-3 px-3.5 border peer-checked:border-orange-500 border-[#EEEEEE] rounded-[10px] cursor-pointer peer-checked:text-orange-500"
                      >
                        Female
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="non-binary"
                        name="gender"
                        value="non-binary"
                        className="hidden peer"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        defaultChecked={user.gender === "non-binary" ? true : false}
                      />
                      <label
                        htmlFor="non-binary"
                        className="py-3 px-3.5 border peer-checked:border-orange-500 border-[#EEEEEE] rounded-[10px] cursor-pointer peer-checked:text-orange-500"
                      >
                        Non-Binary
                      </label>
                    </li>
                  </ul>
                  {errors.gender && touched.gender && <span className="text-red-500 text-xs font-bold">{errors.gender}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="mobile" className="text-[13px] text-[#2A2A2A]">
                    Mobile <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <div className="border-2 border-[#EEEEEE] rounded-[10px] p-3 flex justify-center items-center">
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="Mobile"
                      value={values.mobile}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="outline-none w-full"
                    />

                    <img src="./images/icons/verified.png" alt="verified icon" />
                  </div>
                  {errors.mobile && touched.mobile && <span className="text-red-500 text-xs font-bold">{errors.mobile}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="email" className="text-[13px] text-[#2A2A2A]">
                    Email <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <div className="border-2 border-[#EEEEEE] rounded-[10px] p-3 flex justify-center items-center">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="outline-none w-full"
                    />

                    <img src="./images/icons/verified.png" alt="verified icon" />
                  </div>
                  {errors.email && touched.email && <span className="text-red-500 text-xs font-bold">{errors.email}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="aadhar" className="text-[13px] text-[#2A2A2A]">
                    Aadhar <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <div className="border-2 border-[#EEEEEE] rounded-[10px] p-3 flex justify-center items-center">
                    <input
                      type="text"
                      id="aadhar"
                      name="aadhar"
                      placeholder="Aadhar"
                      value={values.aadhar}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="outline-none w-full"
                    />

                    <img src="./images/icons/warning.png" alt="warring icon" />
                  </div>
                  {errors.aadhar && touched.aadhar && <span className="text-red-500 text-xs font-bold">{errors.aadhar}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="address" className="text-[13px] text-[#2A2A2A]">
                    Address <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.address && touched.address && <span className="text-red-500 text-xs font-bold">{errors.address}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[250px]">
                  <label htmlFor="state" className="text-[13px] text-[#2A2A2A]">
                    State <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.state && touched.state && <span className="text-red-500 text-xs font-bold">{errors.state}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[250px]">
                  <label htmlFor="district" className="text-[13px] text-[#2A2A2A]">
                    Last Name <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    placeholder="District"
                    value={values.district}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.district && touched.district && <span className="text-red-500 text-xs font-bold">{errors.district}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[145px]">
                  <label htmlFor="pincode" className="text-[13px] text-[#2A2A2A]">
                    Last Name <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    value={values.pincode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.pincode && touched.pincode && <span className="text-red-500 text-xs font-bold">{errors.pincode}</span>}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="guardian_name" className="text-[13px] text-[#2A2A2A]">
                    Parent/ Guardian Name <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="guardian_name"
                    name="guardian_name"
                    placeholder="Parent/ Guardian Name"
                    value={values.guardian_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.guardian_name && touched.guardian_name && <span className="text-red-500 text-xs font-bold">{errors.guardian_name}</span>}
                </div>

                <div className="flex flex-col gap-1 w-[325px]">
                  <label htmlFor="guardian_number" className="text-[13px] text-[#2A2A2A]">
                    Parent/ Guardian Number <span className="text-red-500 text-xs font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="guardian_number"
                    name="guardian_number"
                    placeholder="Parent/ Guardian Number"
                    value={values.guardian_number}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="outline-orange-500 border-2 border-[#EEEEEE] rounded-[10px] p-3"
                  />
                  {errors.guardian_number && touched.guardian_number && <span className="text-red-500 text-xs font-bold">{errors.guardian_number}</span>}
                </div>
              </div>

              <div className="self-end mt-3 mb-10 flex gap-2">
                <button
                  onClick={() => setProfileUpdate(false)}
                  type="button"
                  className="border-2 border-[#7F7F7F] text-[#7F7F7F] rounded-[6px] rounded-tr-[15px] w-[90px] h-[40px]"
                >
                  Cancel
                </button>

                <button type="submit" className="border-2 border-red-500 bg-red-500 text-white rounded-[6px] rounded-tr-[15px] w-[140px] h-[40px]">
                  Save Change
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ProfileUpdate;
