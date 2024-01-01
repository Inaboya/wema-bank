import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function SignUp2() {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") as string);
  const userData =
    JSON.parse(localStorage.getItem("userData") as string) || ([] as any[]);
  const routeToSignInPage = () => navigate("/sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    house_number: "",
    street: "",
    city: "",
    state: "",
    contact_name: "",
    contact_phone_number: "",
    contact_email_address: "",
    password: "",
    password2: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowPassword2(!showPassword2);
  const handleSubmit = () => {
    const {
      house_number,
      street,
      state,
      city,
      contact_email_address,
      contact_name,
      contact_phone_number,
      password,
      password2,
    } = formData;

   const checkEmail = userData.find((item: any) => item.contact_email_address === contact_email_address);

   if (checkEmail) {
    toast.error("Email already exists", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 5000,
    })
    return;
   }

    if (
      house_number.length === 0 ||
      street.length === 0 ||
      state.length === 0 ||
      city.length === 0 ||
      contact_email_address.length === 0 ||
      contact_email_address.length === 0 ||
      contact_name.length === 0 ||
      contact_phone_number.length === 0 ||
      password.length === 0 ||
      password2.length === 0
    ) {
      toast.error("No Empty Values", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
      });

      return;
    } else if (password !== password2) {
      toast.error("Password do not match", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
      });
      return;
    } else {
      const newObject = {
        ...userDetails,
        house_number,
        street,
        state,
        city,
        contact_email_address,
        contact_name,
        contact_phone_number,
        password,
      };

      userData.push(newObject);

      localStorage.setItem("userData", JSON.stringify(userData));
      setShowModal(!showModal);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(userData);

  return (
    <div className="w-screen h-full bg-[#F5F6F8] px-4 py-2 lg:px-20 lg:py-8 flex flex-col gap-8 lg:gap-14">
      {showModal && (
        <Modal>
          <div
            className="w-full p-5 bg-[#fff] flex flex-col justify-center items-center gap-4 rounded-[8px]"
            style={{
              boxShadow: "box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              className="p-3 rounded-[6px]"
              style={{ background: "rgba(255, 153, 0, 0.10)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15 10V15M15 20H15.0125M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                  stroke="#FF9900"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-[#f90] text-[24px] font-medium">Pending</h3>

            <p className="text-[14px] text-center text-[#1A1619] font-medium">
              Your registration is awaiting approval from our partnership team
            </p>

            <button
              type="button"
              onClick={() => setShowModal(!showModal)}
              className="w-full p-5 bg-[#039BF0] rounded-[4px] text-center text-[#fff]"
            >
              Done
            </button>
          </div>
        </Modal>
      )}
      <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="144"
          height="30"
          viewBox="0 0 144 30"
          fill="none"
        >
          <path
            d="M0 30V21.6562C0 17.7396 2.21875 15.5208 6.65625 15C2.21875 14.4792 0 12.2604 0 8.34375V0H6.65625V10C6.65625 10.9062 6.98437 11.6927 7.64062 12.3594C8.29688 13.0156 9.08333 13.3438 10 13.3438C10.9062 13.3438 11.6875 13.0156 12.3438 12.3594C13.0104 11.6927 13.3438 10.9062 13.3438 10V0H20V8.34375C20 12.2604 17.7812 14.4792 13.3438 15C17.7812 15.5417 20 17.7656 20 21.6719V30H13.3438V20C13.3438 19.0833 13.0104 18.2969 12.3438 17.6406C11.6875 16.9844 10.9062 16.6562 10 16.6562C9.08333 16.6562 8.29688 16.9844 7.64062 17.6406C6.98437 18.2969 6.65625 19.0833 6.65625 20V30H0Z"
            fill="#039BF0"
          />
          <path
            d="M26.6797 30V0H40.0234C41.8464 0 43.4089 0.656249 44.7109 1.96875C46.0234 3.28125 46.6797 4.84375 46.6797 6.65625V10C46.6797 11.8229 46.0234 13.3906 44.7109 14.7031C43.4089 16.0052 41.8464 16.6562 40.0234 16.6562H33.3359V30H26.6797ZM33.3359 13.3438H36.6797C37.5859 13.3438 38.3672 13.0156 39.0234 12.3594C39.6901 11.6927 40.0234 10.9062 40.0234 10V6.65625C40.0234 5.75 39.6901 4.97396 39.0234 4.32812C38.3672 3.67187 37.5859 3.34375 36.6797 3.34375H33.3359V13.3438Z"
            fill="#039BF0"
          />
          <path
            d="M53.3203 30V0H66.6641C68.487 0 70.0495 0.656249 71.3516 1.96875C72.6641 3.28125 73.3203 4.84375 73.3203 6.65625V8.46875C73.3203 9.95833 72.8099 11.3958 71.7891 12.7812C70.7682 14.1562 69.0599 14.8438 66.6641 14.8438H69.9766C70.8932 14.8438 71.6797 15.1719 72.3359 15.8281C72.9922 16.4844 73.3203 17.2708 73.3203 18.1875V30H66.6641V20C66.6641 19.0833 66.3307 18.2969 65.6641 17.6406C65.0078 16.9844 64.2266 16.6562 63.3203 16.6562H59.9766V30H53.3203ZM59.9766 13.3438H63.3203C64.2266 13.3438 65.0078 13.0156 65.6641 12.3594C66.3307 11.6927 66.6641 10.9062 66.6641 10V6.65625C66.6641 5.75 66.3307 4.97396 65.6641 4.32812C65.0078 3.67187 64.2266 3.34375 63.3203 3.34375H59.9766V13.3438Z"
            fill="#039BF0"
          />
          <path
            d="M79.9609 30V0H96.6172V3.34375H86.6172V13.3438H93.3047V16.6562H86.6172V26.6562H96.6172V30H79.9609Z"
            fill="#039BF0"
          />
          <path
            d="M119.977 6.65625H116.664C116.372 4.42708 115.32 3.3125 113.508 3.3125C112.341 3.3125 111.461 3.59375 110.867 4.15625C110.273 4.71875 109.977 5.55729 109.977 6.67188C109.977 7.50521 110.305 8.28646 110.961 9.01562L118.023 16.9531C119.326 18.4115 119.977 19.9792 119.977 21.6562V23.3438C119.977 25.1458 119.326 26.7083 118.023 28.0312C116.721 29.3438 115.154 30 113.32 30H109.977C107.768 30 106.107 29.4427 104.992 28.3281C103.878 27.2135 103.32 25.5521 103.32 23.3438H106.664C106.643 23.5729 106.633 23.7552 106.633 23.8906C106.633 24.7969 106.982 25.4844 107.68 25.9531C108.378 26.4219 109.143 26.6562 109.977 26.6562C111.164 26.6562 112.018 26.3698 112.539 25.7969C113.06 25.224 113.32 24.3906 113.32 23.2969C113.32 22.4531 112.992 21.6719 112.336 20.9531L105.273 13.0469C103.971 11.599 103.32 10.0312 103.32 8.34375V6.65625C103.32 4.84375 103.971 3.28125 105.273 1.96875C106.576 0.656249 108.143 0 109.977 0H113.32C117.487 0 119.706 2.21875 119.977 6.65625Z"
            fill="#039BF0"
          />
          <path
            d="M143.336 6.65625H140.023C139.732 4.42708 138.68 3.3125 136.867 3.3125C135.701 3.3125 134.82 3.59375 134.227 4.15625C133.633 4.71875 133.336 5.55729 133.336 6.67188C133.336 7.50521 133.664 8.28646 134.32 9.01562L141.383 16.9531C142.685 18.4115 143.336 19.9792 143.336 21.6562V23.3438C143.336 25.1458 142.685 26.7083 141.383 28.0312C140.081 29.3438 138.513 30 136.68 30H133.336C131.128 30 129.466 29.4427 128.352 28.3281C127.237 27.2135 126.68 25.5521 126.68 23.3438H130.023C130.003 23.5729 129.992 23.7552 129.992 23.8906C129.992 24.7969 130.341 25.4844 131.039 25.9531C131.737 26.4219 132.503 26.6562 133.336 26.6562C134.523 26.6562 135.378 26.3698 135.898 25.7969C136.419 25.224 136.68 24.3906 136.68 23.2969C136.68 22.4531 136.352 21.6719 135.695 20.9531L128.633 13.0469C127.331 11.599 126.68 10.0312 126.68 8.34375V6.65625C126.68 4.84375 127.331 3.28125 128.633 1.96875C129.935 0.656249 131.503 0 133.336 0H136.68C140.846 0 143.065 2.21875 143.336 6.65625Z"
            fill="#039BF0"
          />
        </svg>

        <div className="flex items-center gap-2">
          <p className="text-[#606060] text-[10px] lg:text-[14px] font-medium">
            Already have an account?
          </p>
          <button
            type="button"
            onClick={routeToSignInPage}
            className="px-4 py-2 border border-[#039BF0] rounded-[4px] text-[#039BF0] text-[14px] font-medium"
          >
            Sign in
          </button>
        </div>
      </div>

      <div className="lg:px-60">
        <div className="flex justify-center items-center flex-col p-6 rounded-[8px] bg-[#fff]">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-[24px] text-[#039BF0] font-medium">
                Welcome to Xpress Rewards
              </h3>

              <p className="text-[12px] text-[#606060] font-medium">
                Complete the form below to get started
              </p>
            </div>

            <div className="flex flex-col w-full gap-4">
              <h6 className="text-[14px] text-[#039BF0] font-medium">
                Business Address
              </h6>

              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
                <div className="w-1/5 flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="text-[14px] text-[#1A1619] text-normal"
                  >
                    House Number
                  </label>
                  <input
                    type="text"
                    name="house_number"
                    value={formData.house_number}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-[#ccc] p-2"
                  />
                </div>

                <div className="w-4/5 flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="text-[14px] w-full text-[#1A1619] text-normal"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-[#ccc] p-2"
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="text-[14px] text-[#1A1619] text-normal"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-[#ccc] p-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="text-[14px] text-[#1A1619] text-normal"
                  >
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-[#ccc] p-2"
                  >
                    <option value=""></option>
                    <option value="Type A">State A</option>
                    <option value="Type B">State B</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4">
              <h6 className="text-[14px] text-[#039BF0] font-medium">
                Contact Person Information
              </h6>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  name="contact_phone_number"
                  value={formData.contact_phone_number}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Contact Email Address
                </label>
                <input
                  type="email"
                  name="contact_email_address"
                  value={formData.contact_email_address}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4">
              <h6 className="text-[14px] text-[#039BF0] font-medium">
                Password
              </h6>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Password
                </label>
                <div className="w-full flex items-center gap-2 rounded-[4px] border border-[#ccc] p-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-[95%] border-none outline-none"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    cursor="pointer"
                    onClick={togglePassword}
                  >
                    <path
                      d="M12 9.2C12.7233 9.2 13.417 9.495 13.9285 10.0201C14.4399 10.5452 14.7273 11.2574 14.7273 12C14.7273 12.7426 14.4399 13.4548 13.9285 13.9799C13.417 14.505 12.7233 14.8 12 14.8C11.2767 14.8 10.583 14.505 10.0715 13.9799C9.56006 13.4548 9.27273 12.7426 9.27273 12C9.27273 11.2574 9.56006 10.5452 10.0715 10.0201C10.583 9.495 11.2767 9.2 12 9.2ZM12 5C16.5455 5 20.4273 7.90267 22 12C20.4273 16.0973 16.5455 19 12 19C7.45455 19 3.57273 16.0973 2 12C3.57273 7.90267 7.45455 5 12 5ZM3.98182 12C5.48182 15.136 8.58182 17.1333 12 17.1333C15.4182 17.1333 18.5182 15.136 20.0182 12C18.5182 8.864 15.4182 6.86667 12 6.86667C8.58182 6.86667 5.48182 8.864 3.98182 12Z"
                      fill="#606060"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Confirm Password
                </label>
                <div className="w-full flex items-center gap-2 rounded-[4px] border border-[#ccc] p-2">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    className="w-[95%] border-none outline-none"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    cursor="pointer"
                    onClick={toggleConfirmPassword}
                  >
                    <path
                      d="M12 9.2C12.7233 9.2 13.417 9.495 13.9285 10.0201C14.4399 10.5452 14.7273 11.2574 14.7273 12C14.7273 12.7426 14.4399 13.4548 13.9285 13.9799C13.417 14.505 12.7233 14.8 12 14.8C11.2767 14.8 10.583 14.505 10.0715 13.9799C9.56006 13.4548 9.27273 12.7426 9.27273 12C9.27273 11.2574 9.56006 10.5452 10.0715 10.0201C10.583 9.495 11.2767 9.2 12 9.2ZM12 5C16.5455 5 20.4273 7.90267 22 12C20.4273 16.0973 16.5455 19 12 19C7.45455 19 3.57273 16.0973 2 12C3.57273 7.90267 7.45455 5 12 5ZM3.98182 12C5.48182 15.136 8.58182 17.1333 12 17.1333C15.4182 17.1333 18.5182 15.136 20.0182 12C18.5182 8.864 15.4182 6.86667 12 6.86667C8.58182 6.86667 5.48182 8.864 3.98182 12Z"
                      fill="#606060"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-center px-12 py-4 bg-[#039BF0] rounded-[4px] text-[14px] text-[#fff] font-medium"
              >
                Submit
              </button>
              <p className="text-[14px] text-[#808080] font-medium">
                Step 2 of 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp2;
