import { useEffect, useState } from "react";
import Table from "../../components/Table";
import {
  buildUserTableData,
  verifiersColumn,
  verifiersRow,
} from "../../utils/tableBuilders";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const loading = false;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [dataRows, setDataRows] = useState([] as any[]);

  const token = localStorage.getItem("token");

  console.log({ verifiersRow, activeTab });

  useEffect(() => {
   if (activeTab === "Active Verifiers") {
      setDataRows(verifiersRow.filter((item) => item.status === "Active"));
    } else if (activeTab === "Pending Verifiers") {
      setDataRows(
        verifiersRow.filter((item) => item.status === "Awaiting Approval")
      );
    } else if (activeTab === "Deactivated Verifiers") {
      setDataRows(verifiersRow.filter((item) => item.status === "Deactivated"));
    } else {
      setDataRows(verifiersRow)
    }
  }, [activeTab]);

  useEffect(() => {
    if (!token) navigate("/sign-in");

    window.addEventListener("storage", () => {
      if (!localStorage.token) navigate("/sign-in");
    });
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2 lg:flex-row lg:justify-between items-start lg:items-center">
        <select
          name="activeTab"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="px-2 py-3 w-full lg:w-[212px] bg-[#fff] rounded-[4px]"
        >
          <option value=""></option>
          <option value="All">All</option>
          <option value="Active Verifiers">Active Verifiers</option>
          <option value="Pending Verifiers">Pending Verifiers</option>
          <option value="Deactivated Verifiers">Deactivated Verifiers</option>
        </select>

        <div className="flex items-center gap-2">
          <div className="px-2 py-3 bg-[#fff] rounded-[4px] flex items-center gap-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="w-1/3"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.436 15.0849L20.376 19.0949C20.5525 19.2857 20.6478 19.5377 20.6417 19.7975C20.6356 20.0573 20.5286 20.3046 20.3433 20.4869C20.158 20.6691 19.9091 20.7721 19.6492 20.774C19.3893 20.7759 19.1389 20.6765 18.951 20.4969L15.013 16.4909C13.4935 17.6356 11.5959 18.16 9.70428 17.9581C7.81266 17.7562 6.06845 16.8431 4.82482 15.4035C3.58118 13.9639 2.93106 12.1056 3.00608 10.2047C3.08111 8.30382 3.87568 6.50248 5.22891 5.16542C6.58214 3.82836 8.3929 3.05549 10.2945 3.00331C12.1962 2.95114 14.0466 3.62355 15.4711 4.88439C16.8956 6.14524 17.7878 7.9003 17.9669 9.7942C18.1461 11.6881 17.5988 13.5793 16.436 15.0849ZM10.5 15.9999C11.9587 15.9999 13.3576 15.4204 14.3891 14.389C15.4205 13.3575 16 11.9586 16 10.4999C16 9.04122 15.4205 7.64227 14.3891 6.61082C13.3576 5.57937 11.9587 4.99991 10.5 4.99991C9.04131 4.99991 7.64236 5.57937 6.61091 6.61082C5.57946 7.64227 5 9.04122 5 10.4999C5 11.9586 5.57946 13.3575 6.61091 14.389C7.64236 15.4204 9.04131 15.9999 10.5 15.9999Z"
                fill="#808080"
              />
            </svg>
            <input
              type="text"
              name=""
              id=""
              placeholder="Name/Phone no / Location"
              className="border-none outline-none text-[#C4C4C4] text-[12px] font-medium w-2/3"
            />
          </div>

          <button
            type="button"
            className="p-3 flex items-center gap-2 text-[#fff] bg-[#039BF0] rounded-[4px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Add New Verifier
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-full w-full">
        <Table
          column={verifiersColumn}
          data={buildUserTableData(dataRows)}
          loading={loading}
          paginate
          pageSize={10}
        />
      </div>
    </div>
  );
}
export default Dashboard;
