import { CgNotes } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { LuUserSquare2 } from "react-icons/lu";
import { MdEmail, MdOutlineWorkspacePremium, MdPhone } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import * as Database from "./data";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React from "react";
import { ProfileUpdate } from "./components";
import { User } from "./config/type";

let basicInfoPoint = ["Education", "Career Objectives", "Key Skills", "Resume/Portfolio", "Preferences", "Work Experience", "Additional Documents"];

const App = () => {
  let isMounted = false;
  let abortController: AbortController = new AbortController();
  const [profileUpdate, setProfileUpdate] = React.useState<boolean>(false);
  let [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    axios
      .get("/user/auth", { signal: abortController.signal })
      .then((userData) => {
        isMounted = true;
        if (userData.data.userData) {
          if (userData.data.userData) {
            setUser(userData.data.userData);
          }
        }
      })
      .catch(() => {
        isMounted = true;
      });
    return () => {
      if (isMounted) {
        isMounted = false;
        abortController.abort();
      }
    };
  }, []);

  const handleSignOut = () => {
    axios
      .get("/user/auth/sign-out", { signal: abortController.signal })
      .then((isSignOut) => {
        isMounted = true;
        if (isSignOut.data.redirect) {
          window.location.href = isSignOut.data.redirect;
        } else {
          console.log("Error signing out");
        }
      })
      .catch((err) => {
        isMounted = true;
        toast.error(err?.response.data.message || err.message);
      });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="w-full h-full flex justify-start items-start p-10 gap-x-10 relative">
        {profileUpdate && user && <ProfileUpdate setProfileUpdate={setProfileUpdate} user={user} setUser={setUser} />}
        {/* profile information */}
        <section>
          <div className="w-[330px] border-[2px] rounded-[10px] border-[#eeeeee] flex flex-col justify-start items-center py-10 px-5 gap-7">
            <div className="w-[194px] flex justify-center items-center flex-col">
              <div className="border-[1px] border-yellow-600 border-dashed w-[130px] h-[130px] rounded-[65px] p-[5px]">
                <img src="./images/profile-photo.jpg" alt="user profile photo" className="w-[120px] h-[120px] rounded-[60px] object-cover " />
              </div>

              <div className="w-full flex gap-[20px] justify-center items-center mt-4">
                <div className="w-full bg-[#f3f3f3] h-1 rounded-[5px]">
                  <div className="w-10/12 h-1 bg-yellow-600 rounded-[5px]"></div>
                </div>
                <span className="text-[12px] font-bold">60%</span>
              </div>

              <h1 className="text-[18px] font-bold">
                {user?.fname} {user?.lname}
              </h1>
              <h4 className="text-[14px] font-thin">@{user?.username}</h4>
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <h1 className="flex justify-start items-center gap-2 font-medium text-[16px] text-[#7F7F7F]">
                <MdPhone className="w-5 h-5 text-black" />
                +91 {user?.mobile}
                <img src="./images/icons/verified.png" alt="verified icon" />
              </h1>

              <h1 className="flex justify-start items-center gap-2 font-medium text-[16px] text-[#7F7F7F]">
                <MdEmail className="w-5 h-5 text-black" />
                {user?.email}
                <img src="./images/icons/warning.png" alt="warning icon" />
              </h1>

              <button onClick={() => setProfileUpdate(!profileUpdate)} className="flex justify-start items-center gap-2 font-medium text-[16px] text-blue-500 cursor-pointer">
                <CiEdit className="w-5 h-5" />
                Edit/Update Profile
              </button>
            </div>

            <div className="bg-[#fef8f4] w-full flex flex-col gap-4 p-[15px]">
              <h1 className="flex justify-start items-center gap-2 font-medium text-[16px] text-orange-500 cursor-pointer">
                <LuUserSquare2 className="w-5 h-5 text-black" />
                Edit/Update Profile
              </h1>

              <h1 className="flex justify-start items-center gap-2 font-medium text-[16px] text-[#7F7F7F] cursor-pointer">
                <MdOutlineWorkspacePremium className="w-5 h-5 text-black" />
                Payment
              </h1>

              <h1 className="flex justify-start items-center gap-2 font-medium text-[16px] text-[#7F7F7F] cursor-pointer">
                <CgNotes className="w-5 h-5 text-black" />
                Application Status
              </h1>

              <button onClick={handleSignOut} type="button" className="border-2 border-[#F26F22] text-[#F26F22] rounded-[6px] rounded-tr-[15px] w-[90px] h-[40px]">
                Logout
              </button>
            </div>
          </div>

          <h4 className="text-[#7F7F7F] mt-3">Last updated on 10 Oct 2024</h4>
        </section>

        {/* basic information  */}
        <section className="w-[630px] h-full flex flex-col gap-6">
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Basic Information</h1>

              <button onClick={() => setProfileUpdate(!profileUpdate)} type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Update
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-wrap justify-start items-center p-6 gap-3">
              <div className="grid grid-cols-4 gap-10 w-full">
                <div className="col-span-2">
                  <h4 className="text-[13px]">Full Name</h4>
                  <h1 className="text-[15px] text-[#7F7F7F] mt-[6px]">
                    {user?.fname} {user?.lname}
                  </h1>
                </div>

                <div className="col-span-1">
                  <h4 className="text-[13px]">Date of Birth</h4>
                  <h1 className="text-[15px] text-[#7F7F7F] mt-[6px]">{user?.dateOfBirth && new Date(user.dateOfBirth).toLocaleDateString("en-GB")}</h1>
                </div>

                <div className="col-span-1">
                  <h4 className="text-[13px]">Gender</h4>
                  <h1 className="text-[15px] text-[#7F7F7F] mt-[6px] capitalize">{user?.gender}</h1>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h4 className="text-[13px]">Mobile</h4>
                  <h1 className="flex justify-start items-center gap-2 font-medium text-[15px] text-[#7F7F7F] mt-[6px]">
                    +91 {user?.mobile}
                    <img src="./images/icons/verified.png" alt="verified icon" />
                  </h1>
                </div>

                <div>
                  <h4 className="text-[13px]">Email</h4>
                  <h1 className="flex justify-start items-center gap-2 font-medium text-[15px] text-[#7F7F7F] mt-[6px]">
                    {user?.email}
                    <img src="./images/icons/verified.png" alt="verified icon" />
                  </h1>
                </div>
              </div>

              <div>
                <h4 className="text-[13px]">Aadhar</h4>
                <h1 className="flex justify-start items-center gap-2 font-medium text-[15px] text-[#7F7F7F] mt-[6px]">
                  {user?.aadhar.replace(/^(\d{2})\d{2}-\d{4}-\d{4}-\d{2}(\d{2})$/, "$1xx xxxx xxxx xx$2")}
                  <span className="bg-red-500 text-white py-0.5 px-1.5 rounded-[4px] font-thin cursor-pointer">Verify</span>
                </h1>
              </div>

              <div>
                <h4 className="text-[13px]">Address</h4>
                <h1 className="text-[15px] text-[#7F7F7F] mt-[6px] max-w-[465px]">
                  {user?.address}, {user?.district}, {user?.state}, {user?.pincode}, {user?.country}
                </h1>
              </div>
            </div>
          </section>

          {/* payment pending section  */}

          <section className="w-full bg-green-100 rounded-[10px] flex justify-start items-center gap-6">
            <img src="/images/icons/payment-pending.png" alt="payment pending icon" />
            <div className="max-w-[218px]">
              <h1 className="text-[18px] font-bold">Payment Pending</h1>
              <h4 className="text-[13px] font-thin">Registration fee 500 rupees pending. Pay now and get access to all services.</h4>
            </div>
            <button type="button" className="bg-red-500 text-white rounded-[6px] rounded-tr-[15px] w-[90px] h-[40px]">
              Pay Now
            </button>
          </section>

          {/* employment history section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Education</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Update Education
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-wrap justify-start items-center p-5 gap-4">
              {Database.education.map((dataField, key: number) => (
                <div key={key}>
                  <h1 className="flex justify-start items-center gap-2 text-[15px] font-normal mb-[6px]">
                    {dataField.collage_name}
                    <span className="border border-orange-500 text-orange-500 px-2 rounded-[4px] font-normal cursor-pointer">Edit</span>
                  </h1>
                  <p className="text-[15px] text-[#7F7F7F] max-w-[292px]">{dataField.collage_address}</p>
                </div>
              ))}
            </div>
          </section>

          {/* career objective section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Career Objective</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Update
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-wrap justify-start items-center p-5 gap-4">
              <div>
                <h1 className="flex justify-start items-center gap-2 text-[15px] font-normal mb-[6px]">
                  For Entry-Level Position
                  <span className="border border-orange-500 text-orange-500 px-2 rounded-[4px] font-normal cursor-pointer">Edit</span>
                </h1>
                <p className="text-[15px] text-[#7F7F7F]">
                  Enthusiastic and highly motivated graduate with a degree in Business Administration, eager to apply strong analytical and communication skills in a fast-paced
                  corporate environment. Looking for an entry-level role in marketing where I can contribute to team success while gaining hands-on experience and advancing my
                  career.
                </p>
              </div>
            </div>
          </section>

          {/* key skill section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Key Skills</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Update
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-wrap justify-start items-center p-5 gap-2">
              {Database.skills.map((dataField: string, key: number) => (
                <button type="button" key={key} className="border border-[##EEEEEE] rounded-[20px] py-1 px-3 text-[#7F7F7F] text-[14px]">
                  {dataField}
                </button>
              ))}
            </div>
          </section>

          {/* portfolio section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Portfolio</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Update Portfolio
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-col justify-start items-start p-5 gap-4">
              {Database.portfolio.map((dataField, key: number) => (
                <div key={key}>
                  <h1 className="text-[15px] font-normal mb-[6px]">{dataField.platform_name}</h1>
                  <p className="text-[15px] text-[#7F7F7F] max-w-[292px]">{dataField.url}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Work experience section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Work Experience</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] py-1 px-3">
                Add Experience
              </button>
            </div>

            <div className="w-full border-[2px] rounded-[10px] border-[#eeeeee] flex flex-wrap justify-start items-center p-5 gap-4">
              {Database.experience.map((dataField, key: number) => (
                <div key={key}>
                  <h1 className="flex justify-start items-center gap-2 text-[15px] font-normal mb-[6px]">
                    {dataField.designation}
                    <span className="border border-orange-500 text-orange-500 px-2 rounded-[4px] font-normal cursor-pointer">Edit</span>
                  </h1>
                  <p className="text-[15px] text-[#7F7F7F] max-w-[292px]">{dataField.company_location}</p>

                  {dataField.top_projects && (
                    <div>
                      <h1 className="font-medium text-[13px]">Top Projects</h1>

                      <div className="w-full mt-2 flex gap-1">
                        {dataField.top_projects.map((dataField: string, key: number) => (
                          <button type="button" key={key} className="border border-[##EEEEEE] rounded-[20px] py-1 px-3 text-[#7F7F7F] text-[14px]">
                            {dataField}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* other section  */}
          <section>
            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Preference</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] w-[132px] h-[29px]">
                Add Preference
              </button>
            </div>

            <div className="flex justify-between mb-3">
              <h1 className="font-medium text-[18px]">Documents & Certificate</h1>

              <button type="button" className="text-blue-500 bg-blue-100 rounded-[6px] rounded-tr-[15px] w-[132px] h-[29px]">
                Add Documents
              </button>
            </div>
          </section>
        </section>

        {/* Basic information pointer  */}

        <aside>
          <h1 className="font-medium text-[18px]">Basic Information</h1>
          <ul className="flex flex-col gap-[10px] mt-[10px] text-[#7F7F7F] text-[16px] list-disc cursor-pointer">
            {basicInfoPoint.map((dataField: string, key: number) => (
              <li key={key} className="hover:text-blue-500">
                {dataField}
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  );
};

export default App;
