import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Header";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [openModal, setOpenModal] = useState(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <div className="relative flex h-full flex-row overflow-y-auto overflow-x-hidden">
        <aside className="sticky top-0 left-0 right-0 z-50 h-screen bg-red flex-initial md:flex md:h-full">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </aside>

        <main className="flex-1 overflow-y-scroll">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <section className="relative bg-[#F5F6F8] mx-auto max-w-[110rem] h-full py-8 px-4 sm:pl-4 sm:pr-4 md:pr-10 md:pl-8 lg:pl-8 lg:pr-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
