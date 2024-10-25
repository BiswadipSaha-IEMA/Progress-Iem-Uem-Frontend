import React, { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";
import MemberCard from "../MemberCard/MemberCard";
import Sidebar from "../SideBar/Sidebar";
import { Menu } from "lucide-react";
import { useGetReq } from "../../hooks/useHttp";
import gsap from "gsap";
import ManagePopUp from "../../utils/Popup/FormPopUp/ManagePopUp";

const AddFacultyComp = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [utilFor, setUtilFor] = useState("");

  const handleAddUserClick = () => {
    setUtilFor("Faculty");
    setShowPopup(true);
  };

  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="relative">
        <Sidebar showProfile={sidebar} />
        {sidebar && (
          <button
            className="bg-slate-200 p-2 rounded absolute lxs:hidden"
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu />
          </button>
        )}
      </div>
      <div
        className={`flex-grow rounded-lg mb-8 duration-300 ${
          sidebar ? "lg:w-[calc(100%-320px)] lg:ml-[320px]" : "lg:w-full lg:ml-0"
        } bg-[url('/src/assets/image2.svg')]`}
      >
        <div className="flex justify-between items-center mt-4">
          <button className="bg-slate-200 p-2 rounded" onClick={() => setSidebar(!sidebar)}>
            <Menu />
          </button>
          <div className="w-[83%] relative flex items-center ml-4">
            <button className="absolute text-3xl left-2">
              <CiSearch />
            </button>
            <input className="w-full rounded-lg p-2 pl-12 focus:border-[#03A8FD] focus:shadow-[#03A8FD]" />
            <button className="absolute right-2 text-3xl">
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <button
            className="bg-[#03A8FD] ml-4 sm:pl-5 lg:h-12 h-11 lg:text-lg text-base p-4 right-0 rounded-lg flex items-center lg:pl-4 lg:pr-4 text-white lg:gap-2 gap-2"
            onClick={handleAddUserClick}
          >
            <span className="hidden lg:block">Add Faculty</span>
            <div className="text-2xl">
              <RiUserAddFill size={20} />
            </div>
          </button>
        </div>

        <div className="bg-white p-4 flex flex-wrap w-full mt-8 rounded-lg">
          <Cards sidebar={sidebar} />
        </div>
      </div>

      {showPopup && (
        <ManagePopUp setPopupShow={setShowPopup} setUtilFor={utilFor} />
      )}
    </div>
  );
};

const Cards = ({ sidebar }) => {
  const currentDiv = useRef([]);
  const [getReq] = useGetReq();
  const [userData, setUserData] = useState([]);
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getReq('api/v1/user/getAllUsers', accessToken);
        console.log(data.data);

        if (Array.isArray(data.data)) {
          const filteredData = data.data.filter(user => user.role === "Faculty");
          setUserData(filteredData);
        } else {
          console.error("Fetched data is not an array:", data.data);
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      gsap.fromTo(
        currentDiv.current,
        { opacity: 0, y: 50, scaleX: 0 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 2, scaleX: 1, ease: "elastic" }
      );
    }
  }, [userData]);

  return (
    <>
      {userData.map((element, index) => (
        <div
          key={index}
          ref={(ele) => (currentDiv.current[index] = ele)}
          className={`${sidebar ? "ml-12" : "lg:ml-0"}`}
        >
          <MemberCard role={element.role} data={element} />
        </div>
      ))}
    </>
  );
};

export default AddFacultyComp;
