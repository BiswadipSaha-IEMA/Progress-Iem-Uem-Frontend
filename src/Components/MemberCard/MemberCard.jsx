import React,{useState} from 'react';
import { MdPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { usePutReq } from "../../hooks/useHttp";
import ModeratorEditForm from './ModeratorEditForm';

const MemberCard = ({ role, data, onDataUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModeratorForm, setShowModeratorForm] = useState(false);
    const [selectedStream, setSelectedStream] = useState("");
    const [putReq] = usePutReq();

    const arrOfFacultyStreams = [];
    const handleFacultyStreamClick = (stream) => {
        setSelectedStream(stream);
        if (!arrOfFacultyStreams.includes(stream)) {
            arrOfFacultyStreams.push(stream);
            setFacultyData((prevData) => ({
            ...prevData,
            department: arrOfFacultyStreams,
        }));
    }

    console.log(arrOfFacultyStreams);
  };

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

    const [facultyData, setFacultyData] = useState({
        role: "Faculty",
        name: data.name || "",
        contact: data.contact || "",
        email: data.email || "",
        college: data.college || "",
        department: data.department || [],
        userId: data._id,
      });

    const togglePopup = () => {
        if(role === "Faculty" ){
          setIsOpen(!isOpen);
        }
        else if(role === "moderator"){
          setShowModeratorForm(!showModeratorForm);
          console.log("Hit success");
        }
    };

    const handelFacultySubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await putReq(
            "api/v1/user/editUser",
            { ...facultyData },
            accessToken
          );
    
          console.log(response);
          if (response.success) {
            setIsOpen(false);
            if (onDataUpdate) {
                onDataUpdate(facultyData);
            }
          }
        } catch (error) {
          console.log("NetworkError: ", error);
        }
      };

      const handleFacultyInputChange = (e) => {
        const { name, value } = e.target;
        setFacultyData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      // function for checking if the phone number is valid or not
      const isValidPhone = (e) => {
        const value = e.target.value;
        // Use regex to allow only digits
        const numericValue = value.replace(/[^0-9]/g, '');

        if(numericValue.length <= 10){
          setFacultyData((prevData) => ({
              ...prevData,
              contact: numericValue,
          }));
        }
    };

    return (
        <>
        <div className='m-4 sm:pb-4 ml-[0px] sm:ml-0 rounded-lg w-auto lg:w-[400px] md:w-[300px] min-w-[350px] min-h-[250px] flex flex-col' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex flex-col flex-wrap p-3  lg:ml-6 md:ml-6 ">
                <div className="flex justify-end">
                    <button className='bg-[#03A8FD] p-2 rounded-lg flex items-center gap-2' onClick={togglePopup}>
                        <div className="text-2xl text-[#fff]"><TbEdit /></div>
                        <div className='text-[#fff]'>Edit</div>
                    </button>
                </div>
                <div className="flex flex-wrap justify-start gap-4 my-2">
                    <div className="text-[#03A8FD] text-3xl">{data.name}</div>
                    <div className="bg-[#DCF3FF] flex items-center rounded-lg text-sm px-3">{role}</div>
                </div>
                <div className='w-[96%] flex text-center border border-[#D2D2D2]'></div>
                <div className="flex flex-col flex-wrap gap-2 mt-2">
                    <div className="flex items-center gap-2">
                        <MdPhone />
                        {data.contact}
                    </div>
                    <div className="flex items-center gap-2">
                        <CiMail />
                        <span className="flex flex-wrap">{data.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiMiniBuildingOffice />
                        {Array.isArray(data.department) ? (
                            <div className="flex flex-wrap gap-2">
                                {data.department.map((dept, index) => (
                                    <span key={index} className="bg-[#F3F3F3] px-2 py-1 rounded-md">{dept}</span>
                                ))}
                            </div>
                        ) : (
                            data.department
                        )}
                    </div>
                </div>
            </div>
        </div>
        {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg alertcontent">
            <div className="flex justify-between p-5">
              <h2 className="flex items-center justify-center mb-4 text-4xl font-bold">
                Edit your details
              </h2>
              <div
                className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="text-white" />
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2 p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={facultyData.name}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Phone No</p>
                <input
                  type="tel"
                  name="contact"
                  value={facultyData.contact}
                  onChange={isValidPhone}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Mobile Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  value={facultyData.email}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>University/Institute Name</p>
                <input
                  type="name"
                  name="college"
                  value={facultyData.college}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="University Name"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p>Stream</p>
                <div className="flex gap-4">
                  {["CSE", "CSIT", "BioTech"].map((stream) => (
                    <div
                      key={stream}
                      onClick={() => handleFacultyStreamClick(stream)}
                      className={`py-2 px-4 rounded-md cursor-pointer ${
                        selectedStream.includes(stream)
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-[#a6adb7]"
                      }`}
                    >
                      {stream}
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-4">
            <p>Selected Streams: {streamString}</p> {/* Display selected streams 
          </div> */}

              <div className="flex flex-col items-center justify-center mt-5">
                <button
                  className="flex justify-center items-center py-2 bg-[#03A8FD] text-center w-[20%] text-white rounded-md font-semibold cursor-pointer"
                  onClick={handelFacultySubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
                </div>
            )}

        {showModeratorForm && <ModeratorEditForm setShowModeratorForm={setShowModeratorForm} data={data} onDataUpdate={onDataUpdate}/>}
        </>
    );
};

export default MemberCard;
