import React, { useEffect, useState } from "react";
import userImage from "../../../assets/user-profile.png";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Lottie from "react-lottie";
import sendingLottie from "../../../Lottie/sending.json";
import sending from "../../../assets/sending.png";
import Skeleton from "react-loading-skeleton";
import { MdInsertComment } from "react-icons/md";
import { useGetReq, usePostReq } from "../../../hooks/useHttp";
import { RiAccountCircleFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

const AddCommentPopup = ({ setShowPopup, data, name }) => {
  const [comments, setComments] = useState(data.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [storeTempStatus, setStoreTempStatus] = useState("");
  const [storeTempMessage, setStoreTempMessage] = useState("");
  const [getReq] = useGetReq();
  const [postReq] = usePostReq();
  const [commentData, setCommentData] = useState(null);
  const [storeAsTemp, setStoreAsTemp]= useState('');
  const [reqReject, setReqReject] = useState(false);
  const [reqAccept, setReqAccept] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInputFor, setShowInputFor] = useState('');

  console.log(data.Status)

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const accesssToken = sessionStorage.getItem("token").split('"')[1];

  const apiList = [
    { nameList: ["Moocs"], api: `/${data._id}/mooccomment` },
    { nameList: ["Patent"], api: `/${data._id}/patentcomment` },
    {
      nameList: ["Student Chapter Activity"],
      api: `/${data._id}/studentchaptercomment`,
    },
    {
      nameList: ["List of Project Proposals"],
      api: `/${data._id}/projectcomment`,
    },
    {
      nameList: [
        "Research Paper Published (Grade-A)",
        "Research Paper Published (Grade-B)",
        "Research Paper Published (Grade-C)",
        "Book Published",
      ],
      api: `/${data._id}/publicationcomment`,
    },
  ];

  // Function to fetch data from a specific API endpoint
  const fetchData = async (endpoint) => {
    const token = await sessionStorage.getItem("token").split('"')[1];
    const response = await fetch(
      `http://iemuemprogressbackend-env.eba-tvmdqzzp.ap-south-1.elasticbeanstalk.com/api/v1/document${endpoint}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
    return response.json();
  };

  // Function to fetch data for a given name from the props
  const fetchDataForName = async (name) => {
    try {
      // Find the matching API from the apiList based on the name in nameList
      const matchedApi = apiList.find((entry) => entry.nameList.includes(name));

      if (!matchedApi) {
        console.error(`No API found for the name: ${name}`);
        return null;
      }

      // Fetch data from the matched API
      const data = await fetchData(matchedApi.api);
      console.log(`Data fetched for ${name}:`, data);
      setCommentData(data);

      return data;
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchDataForName(name);
    }
  }, [name]);

  const handleReqAccept = async () => {
    try { 
        const response = await postReq(
          "api/v1/document/reviewPublication",
          {
            publicationId: data?._id,
            status: "Approved",
            comment: 'Accepted',
          },
          accesssToken
        );

        if (response && response.success) {
          setStoreTempStatus("Request To Accept");
          setStoreTempMessage("Successfully Accepted");
          console.log("Request accepted successfully:", response);
          setIsSend(true); // Show "send" animation or similar after successful action
        }
    } catch (error) {
      console.error("Error in handleReqAccept:", error);
      setStoreTempMessage("Error occurred while accepting request");
    }
  };

  const handleReqReject = async () => {
    try {
        const response = await postReq(
          "api/v1/document/reviewPublication",
          {
            publicationId: data?._id,
            status: "Rejected",
            comment: 'Rejected',
          },
          accesssToken
        );

        if (response && response.success) {
          setStoreTempStatus("Request To Reject");
          setStoreTempMessage("Successfully Rejected");
          console.log("Request rejected successfully:", response);
          setIsSend(true); // Show "send" animation or similar after successful action
        }
    } catch (error) {
      console.error("Error in handleReqReject:", error);
      setStoreTempMessage("Error occurred while rejecting request");
    }
  };

  const onClose = () => {
    setShowPopup(false);
  };

  // const handleSendComment = () => {
  //   if (commentText.trim()) {
  //     setComments([...comments, { text: commentText }]);
  //     setCommentText("");
  //   }
  // };
  const handleSendComment= async(showInputFor)=>{
    console.log('-----------------------------------------', showInputFor)
    if(showInputFor==='Accept'){
      const response = await postReq(
        "api/v1/document/reviewPublication",
        {
          publicationId: data?._id,
          status: "Approved",
          comment: commentText,
        },
        accesssToken
      );
      console.log(response)
      if (response && response.success) {
        setStoreTempStatus("Request To Accept");
        setStoreTempMessage("Successfully Accepted");
        console.log("Request accepted successfully:", response);
        setIsSend(true); // Show "send" animation or similar after successful action
      }
    }
    else{
      const response = await postReq(
        "api/v1/document/reviewPublication",
        {
          publicationId: data?._id,
          status: "Rejected",
          comment: commentText,
        },
        accesssToken
      );

      if (response && response.success) {
        setStoreTempStatus("Request To Reject");
        setStoreTempMessage("Successfully Rejected");
        console.log("Request rejected successfully:", response);
        setIsSend(true); // Show "send" animation or similar after successful action
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && commentText.trim()) {
      handleSendComment();
      setIsLottieLoading(true);
      setTimeout(() => {
        setIsSend(true);
        setIsLottieLoading(false);
      }, 1000);
    }
  };


  useEffect(()=>{
    
  },[showInput])

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[1000px] sm:w-[90%] md:w-[70%] lg:w-[50%] h-auto sm:h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold font-poppins text-[#03A8FD]">
            Add Comment
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-1"
            onClick={() => {
              onClose();
              setCommentText("");
            }}
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
        </div>

        {
          console.log(storeTempStatus)
        }

        {/* Comment Section */}
        <div className="mb-4 h-full w-full bg-[#F0F0F0] rounded-xl p-4 overflow-y-auto">
          <div className="space-y-3">
            {/* Show status message (Accepted / Rejected) */}
            <div className="rounded-lg text-gray-800 bg-[#fff]">
              <p>
                {data?.comment=== "Accepetance Requested" || data?.comment==='Accepted' ? (
                  <div className="text-[#fff] bg-[#2e9b32] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                    <div className="bg-[#fff] rounded-[50%] mr-2">
                      <TiTick className="text-[15px] text-[#2e9b32]" />
                    </div>
                    Acceptance Requested
                  </div>
                ) : (
                  <div className="text-[#fff] bg-[#f84748] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                    <div className="bg-[#fff] rounded-[50%] mr-2">
                      <RxCross2 className="text-[20px] text-[#f00] font-[700] p-1" />
                    </div>
                    <div className="">Rejected</div>
                  </div>
                )}
              </p>
              <div className="flex justify-between">
                <p className="pb-5 pt-5 pl-7 text-[#bbb] font-[700] italic">
                  {commentData?.comment}
                </p>
                <div className="flex pr-2 items-center">
                  <p className="pb-5 pt-5 text-[#bbb] pr-1 font-[700] italic">
                    @{commentData?.reviewedBy?.name}
                  </p>
                  <RiAccountCircleFill className="text-[#0000ffb8] text-[3rem] pr-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 mt-6 justify-start mb-5">
          {
            (data.Status==='RequestToReject' || data.Status==='RequestToAccept') &&  
          <button
            className={`${
              data.Status==='RequestToAccept'
                ? "bg-green-500 text-white p-2 rounded-md font-[600] cursor-pointer"
                : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] cursor-pointer"
            }`}
            onClick={data.Status === 'RequestToReject' ? () => {
              setShowInput(true)
              setShowInputFor('Accept')
              }: handleReqAccept}
            disabled={storeTempStatus === "Request To Accept"}
          >
            {storeTempStatus === "Request To Accept" ? "Accepted" : "Accept"}
          </button>
          }
          {
            (data.Status==='RequestToReject' || data.Status==='RequestToAccept') &&  
            <button
            className={`${
              storeTempStatus === "Request To Reject"
                ? "bg-red-500 text-white p-2 rounded-md font-[600] cursor-pointer"
                : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] cursor-pointer"
            }`}
            onClick={data.Status === 'RequestToAccept' ?   () => {
              setShowInput(true)
              setShowInputFor('Reject')
              }:handleReqReject}
            disabled={storeTempStatus === "Request To Reject"}
          >
            {storeTempStatus === "Request To Reject" ? "Rejected" : "Reject"}
          </button>
          }
          

          
        </div>

        {/* Comment Input */}
        {showInput && (
          <div className="flex items-center">
            <input
              type="text"
              value={commentText}
              onChange={handleCommentChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your comment here..."
              className="bg-[#f0f0f0] h-16 rounded-lg px-4 w-full focus:outline-none focus:border-blue-500"
            />
            <button
              disabled={commentText.trim().length === 0 || isSend}
              className="h-16 w-[100px] ml-2 rounded-md flex justify-center items-center cursor-pointer"
              onClick={handleSendComment}
            >
              {isSend ? (
                <Skeleton
                  className="flex flex-row rounded-full"
                  width={70}
                  height={70}
                  enableAnimation={true}
                  highlightColor={"#d1e3ff"}
                />
              ) : (
                <img src={sending} alt="sending" className="h-16 rounded-md" />
              )}
            </button>
          </div>
        )}
        
      </div>
    </div>
  ); 
};

export default AddCommentPopup;
