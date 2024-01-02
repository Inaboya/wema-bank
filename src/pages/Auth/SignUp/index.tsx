import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function SignUp1() {
  const [image, setImage] = useState<string>("");

  const userData =
    JSON.parse(localStorage.getItem("userData") as string) || ([] as any[]);

  const [formData, setFormData] = useState({
    business_name: "",
    business_email: "",
    business_phone_number: "",
    business_category: "",
    account_no: "",
  });

  const navigate = useNavigate();
  // const routeToNextPage = () => ;
  const routeToSignInPage = () => navigate("/sign-in");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isImageFile = (file: File) => {
    const allowedExtensions = "jpg";
    const extension = file.name.split(".").pop()?.toLowerCase();
    return allowedExtensions.includes(extension || "");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = (e.dataTransfer.files[0] as File) || null;

    if (file && isImageFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Please upload a valid image file with extensions: JPG, PNG, or TIFF."
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null;

    if (file && isImageFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file with extensions: JPG");
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const {
      business_name,
      business_category,
      business_email,
      business_phone_number,
      account_no,
    } = formData;
    const checkEmail = userData.find(
      (item: any) => item.business_email === business_email
    );

    if (checkEmail) {
      toast.error("Email already exists", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
      });
      return;
    }

    if (
      business_name.length === 0 ||
      business_category.length === 0 ||
      business_email.length === 0 ||
      business_phone_number.length === 0 ||
      account_no.length === 0 ||
      image.length === 0
    ) {
      toast.error("No Empty Values", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
      });
      return;
    } else {
      const newObject = {
        ...formData,
        image,
      };

      localStorage.setItem("userDetails", JSON.stringify(newObject));
      navigate("/signup-2");
    }
  };

  return (
    <div className="w-screen h-full bg-[#F5F6F8] px-4 py-2 lg:px-20 lg:py-8 flex flex-col gap-8 lg:gap-14">
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
                Business Information
              </h6>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Business name
                </label>
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Business Email Address
                </label>
                <input
                  type="email"
                  name="business_email"
                  onChange={handleChange}
                  value={formData.business_email}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Business Phone Number
                </label>
                <input
                  type="text"
                  name="business_phone_number"
                  onChange={handleChange}
                  value={formData.business_phone_number}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] text-normal"
                >
                  Business Category
                </label>

                <select
                  name="business_category"
                  value={formData.business_category}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                >
                  <option value=""></option>
                  <option value="Type A">Type A</option>
                  <option value="Type B">Type B</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1A1619] font-medium"
                >
                  Account No
                </label>
                <input
                  type="text"
                  name="account_no"
                  value={formData.account_no}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#ccc] p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-[14px] text-[#1a1619] font-medium"
                >
                  Image(Logo)
                </label>

                <div
                  onDrop={handleDrop}
                  onDragOver={preventDefault}
                  onClick={handleClick}
                  className="w-full cursor-pointer py-5 px-4 flex flex-col justify-center items-center rounded-[4px] border-dashed border border-[#ABA7AF]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="36"
                    viewBox="0 0 40 36"
                    fill="none"
                  >
                    <path
                      d="M29.1286 8.34193C28.3042 6.18038 27.0131 4.49389 25.2553 3.28246C23.4975 2.07104 21.3336 1.46533 18.7636 1.46533C15.4419 1.46533 12.6961 2.5283 10.5261 4.65422C8.35609 6.78015 7.16199 9.45834 6.94378 12.6888C5.31932 13.2114 3.98581 14.2031 2.94324 15.6639C1.90068 17.1247 1.37939 18.7697 1.37939 20.5987C1.37939 22.8315 2.15526 24.7674 3.70698 26.4064C5.2587 28.0454 7.10138 28.8648 9.235 28.8648H10.2533C10.423 28.8648 10.5806 28.8351 10.7261 28.7758C10.8716 28.7164 10.9928 28.6332 11.0898 28.5264C11.1868 28.4195 11.2656 28.2948 11.3262 28.1522C11.3868 28.0097 11.4171 27.8672 11.4171 27.7247C11.4171 27.4159 11.308 27.1487 11.0898 26.923C10.8716 26.6973 10.5928 26.5845 10.2533 26.5845H9.235C7.73176 26.5845 6.42856 25.9907 5.32538 24.803C4.2222 23.6153 3.67061 22.2139 3.67061 20.5987C3.67061 19.1735 4.11916 17.8908 5.01625 16.7506C5.91334 15.6105 7.00439 14.9335 8.28942 14.7197L9.3441 14.5416L9.27137 13.4727H9.235C9.235 10.646 10.1078 8.31818 11.8535 6.48917C13.5992 4.66016 15.9026 3.74566 18.7636 3.74566C23.1035 3.74566 25.9039 5.75281 27.1647 9.76713L27.4193 10.551L28.2557 10.5866C29.6862 10.6104 31.0197 10.9667 32.2563 11.6555C33.4928 12.3444 34.4869 13.2886 35.2385 14.4881C35.9901 15.6877 36.3659 16.9763 36.3659 18.354C36.3659 19.0191 36.2932 19.6782 36.1477 20.3314C36.0022 20.9847 35.8022 21.6141 35.5476 22.2198C35.293 22.8255 34.9657 23.3956 34.5657 23.9301C34.1656 24.4645 33.7292 24.9277 33.2564 25.3197C32.7836 25.7116 32.2442 26.0204 31.638 26.246C31.0319 26.4717 30.4015 26.5845 29.7468 26.5845H29.4195C29.2741 26.5845 29.1286 26.6142 28.9831 26.6736C28.8376 26.733 28.7103 26.8161 28.6012 26.923C28.4921 27.0299 28.4073 27.1487 28.3467 27.2793C28.286 27.4099 28.2557 27.5584 28.2557 27.7247C28.2557 28.0335 28.3709 28.3007 28.6012 28.5264C28.8316 28.752 29.1043 28.8648 29.4195 28.8648C30.8258 28.8173 32.1229 28.4788 33.311 27.8494C34.499 27.2199 35.4688 26.4004 36.2204 25.3909C36.9721 24.3814 37.56 23.2709 37.9843 22.0595C38.4086 20.8481 38.6208 19.6129 38.6208 18.354C38.6208 15.7649 37.7055 13.5202 35.8749 11.6199C34.0444 9.71963 31.7956 8.62697 29.1286 8.34193ZM24.8735 26.6914C24.728 26.5251 24.5401 26.442 24.3098 26.442C24.0794 26.442 23.8794 26.5251 23.7097 26.6914L21.1639 29.4706V17.9977C21.1639 17.9264 21.1518 17.8492 21.1275 17.7661C21.1033 17.6829 21.079 17.6117 21.0548 17.5523C21.0305 17.4929 20.9942 17.4276 20.9457 17.3563C20.8972 17.2851 20.8487 17.2257 20.8002 17.1782C20.7517 17.1307 20.6971 17.0891 20.6365 17.0535C20.5759 17.0178 20.5092 16.9822 20.4365 16.9466C20.3638 16.911 20.291 16.8872 20.2183 16.8753C20.1456 16.8635 20.0728 16.8575 20.0001 16.8575C19.6606 16.8575 19.3818 16.9703 19.1636 17.196C18.9454 17.4217 18.8363 17.6889 18.8363 17.9977V29.4706L16.3632 26.7627C16.1935 26.5964 15.9935 26.5073 15.7631 26.4954C15.5328 26.4836 15.3328 26.5489 15.1631 26.6914L14.8721 26.8696C14.7024 27.0358 14.6175 27.2377 14.6175 27.4753C14.6175 27.7128 14.7024 27.9147 14.8721 28.081L19.0909 32.606V32.6416L19.3818 32.9267C19.5515 33.0929 19.7516 33.1761 19.9819 33.1761C20.2122 33.1761 20.4123 33.0929 20.582 32.9267L20.8729 32.6416V32.606L25.1644 28.0097C25.5281 27.6534 25.5281 27.2971 25.1644 26.9408L24.8735 26.6914Z"
                      fill="#039BF0"
                    />
                    <path
                      d="M21.7242 25.8114V16.6416L18.2759 16.6416V25.8114H13.1035L20.0001 34.302L26.8966 25.8114H21.7242Z"
                      fill="#039BF0"
                    />
                  </svg>

                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                  />

                  <p className="text-[#1A141F] text-sm font-bold">
                    Drag here or click the button below to upload{" "}
                  </p>

                  <p className="text-[#000] text-sm font-normal">
                    Maximum upload size: 10MB (.jpg)
                  </p>
                </div>

                <p className="text-[#000] text-[14px] text-medium">
                  {image!.length > 0 ? "Image File Choosen" : ""}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-center px-12 py-4 bg-[#039BF0] rounded-[4px] text-[14px] text-[#fff] font-medium"
                >
                  Next
                </button>
                <p className="text-[14px] text-[#808080] font-medium">
                  Step 1 of 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp1;
