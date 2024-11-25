import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { usePostReq } from "../../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import sending from "../../../assets/sending.png";
import Skeleton from "react-loading-skeleton";
import Lottie from "react-lottie";
import { TiTick } from "react-icons/ti";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdInsertComment } from "react-icons/md";

const CommentModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
  id,
  comment,
  itemData,
  name,
  fetchDataTable,
}) => {
  const [commentText, setCommentText] = useState("");
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { criteriaId } = useParams();
  const [postReq] = usePostReq();
  const [commentStore, setCommentStore] = useState("");
  const [nameAuthor, setNameAuthor] = useState("");
  const [status, setStatus] = useState(itemData?.status || ""); // To track the current status (Accept/Reject)
  const [handleBtnVissible, setHandleBtnVissible] = useState(false);
  console.log(itemData, "sdhfbjsdfhbsd");

  useEffect(() => {
    console.log("----------------------------------", name);
  });

  useEffect(() => {
    if (itemData?.status) {
      setStatus(itemData?.status);
    }
  }, [itemData]);

  {
    console.log(itemData.status);
  }
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentText.trim().length > 0) {
      handleSubmit();
    }
  };

  const handleReqAccept = async () => {
    setLoading(true);
    try {
      const response = await postReq(
        `${
          name === "Book Published" ||
          name === "Research Paper Grade-A" ||
          name === "Research Paper Grade-B" ||
          name === "Research Paper Grade-C" ||
          name === "Research Paper Published-Journal (Grade-A)" ||
          name === "Research Paper Published-Journal (Grade-B)" ||
          name === "Research Paper Published-Journal (Grade-C)" ||
          name === "Research Paper Conference (Grade-A)" ||
          name === "Research Paper Conference (Grade-B)" ||
          name === "Research Paper Conference (Grade-C)" ||
          name === "Research Paper- Book Chapter (Grade-A)"
            ? "api/v1/document/reviewPublication"
            : name === "Workshop" ||
              name === "Seminar" ||
              name === "Conference" ||
              name === "Faculty Development Programmes" ||
              name === "Competition Organized" ||
              name === "Talks & Distinguished Lecture Series" ||
              name === "Industrial Tour" ||
              name === "Tri-Mentoring System" ||
              name === "Webinar" ||
              name === "Hackathon" ||
              name === "Competition"
            ? "api/v1/document/reviewEvent"
            : name === "Moocs"
            ? "api/v1/document/reviewMooc"
            : name === "Student Chapter Activity"
            ? "api/v1/document/reviewStudentChapter"
            : name === "Patent"
            ? "api/v1/document/reviewPatent"
            : ""
        }`,
        {
          id: id,
          status: "RequestToAccept",
          comment: "Acceptance Requested",
        },
        accessToken
      );
      setStatus("RequestToAccept");
      setCommentStore("Acceptance Requested");
      setNameAuthor(response.data.name);
      setHandleBtnVissible(true);
      console.log(response, "requestaccept");
      if (response.success) fetchDataTable();
    } catch (error) {
      console.error("Error accepting request", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReqReject = async () => {
    setLoading(true);
    try {
      const response = await postReq(
        `${
          name === "Book Published" ||
          name === "Research Paper Grade-A" ||
          name === "Research Paper Grade-B" ||
          name === "Research Paper Grade-C" ||
          name === "Research Paper Published-Journal (Grade-A)" ||
          name === "Research Paper Published-Journal (Grade-B)" ||
          name === "Research Paper Published-Journal (Grade-C)" ||
          name === "Research Paper Conference (Grade-A)" ||
          name === "Research Paper Conference (Grade-B)" ||
          name === "Research Paper Conference (Grade-C)" ||
          name === "Research Paper- Book Chapter (Grade-A)"
            ? "api/v1/document/reviewPublication"
            : name === "Workshop" ||
              name === "Seminar" ||
              name === "Conference" ||
              name === "Faculty Development Programmes" ||
              name === "Competition Organized" ||
              name === "Talks & Distinguished Lecture Series" ||
              name === "Industrial Tour" ||
              name === "Tri-Mentoring System" ||
              name === "Webinar" ||
              name === "Hackathon" ||
              name === "Competition"
            ? "api/v1/document/reviewEvent"
            : name === "Moocs"
            ? "api/v1/document/reviewMooc"
            : name === "Student Chapter Activity"
            ? "api/v1/document/reviewStudentChapter"
            : name === "Patent"
            ? "api/v1/document/reviewPatent"
            : ""
        }`,
        {
          id: id,
          status: "RequestToReject",
          comment: commentText || null,
        },
        accessToken
      );
      setStatus("RequestToReject");
      setCommentStore(commentText);
      setNameAuthor(response.data.name);
      setHandleBtnVissible(true);
      console.log(response);
      if (response.success) fetchDataTable();
    } catch (error) {
      console.error("Error rejecting request", error);
    } finally {
      setLoading(false);
      setCommentText(""); // Clear comment input after rejection
    }
  };

  const handleSubmit = async () => {
    setIsSend(true);
    try {
      const response = await postReq(
        `${
          name === "Book Published" ||
          name === "Research Paper Grade-A" ||
          name === "Research Paper Grade-B" ||
          name === "Research Paper Grade-C" ||
          name === "Research Paper Published-Journal (Grade-A)" ||
          name === "Research Paper Published-Journal (Grade-B)" ||
          name === "Research Paper Published-Journal (Grade-C)" ||
          name === "Research Paper Conference (Grade-A)" ||
          name === "Research Paper Conference (Grade-B)" ||
          name === "Research Paper Conference (Grade-C)" ||
          name === "Research Paper- Book Chapter (Grade-A)"
            ? "api/v1/document/reviewPublication"
            : name === "Workshop" ||
              name === "Seminar" ||
              name === "Conference" ||
              name === "Faculty Development Programmes" ||
              name === "Competition Organized" ||
              name === "Talks & Distinguished Lecture Series" ||
              name === "Industrial Tour" ||
              name === "Tri-Mentoring System" ||
              name === "Webinar" ||
              name === "Hackathon" ||
              name === "Competition"
            ? "api/v1/document/reviewEvent"
            : name === "Moocs"
            ? "api/v1/document/reviewMooc"
            : name === "Student Chapter Activity"
            ? "api/v1/document/reviewStudentChapter"
            : name === "Patent"
            ? "api/v1/document/reviewPatent"
            : ""
        }`,
        {
          id: id,
          status: "RequestToReject",
          comment: commentText,
        },
        accessToken
      );
      console.log(response);
      setStatus("RequestToReject");
      setNameAuthor(response.data.name);
      setCommentStore(commentText);
      setHandleBtnVissible(true);
      console.log(response);
      if (response.success) fetchDataTable();
    } catch (error) {
      console.error("Error posting comment", error);
    } finally {
      setIsSend(false);
      setCommentText(""); // Clear comment input after submission
    }
  };

  if (!isOpen) return null;

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
              setStatus("");
              const [isSend, setIsSend] = useState(false);
              setLoading(false);
              setCommentStore("");
              setNameAuthor("");
              setStatus(itemData?.status || "");
              setHandleBtnVissible(false);
              setCommentText("");
            }}
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
        </div>

        {/* Comment Section */}
        <div className="mb-4 h-full w-full bg-[#F0F0F0] rounded-xl p-4 overflow-y-auto">
          {!itemData?.status ? (
            itemData.status != "Pending" && (
              <div className="flex h-full w-full justify-center items-center bg-[#F0F0F0] rounded-3xl">
                <div className="flex flex-col items-center justify-center ">
                  <MdInsertComment className="text-[#9f9f9f] text-[5rem]" />
                  <p className="text-[#9f9f9f] font-[600]">
                    Be the first person to add a comment
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg text-gray-800 bg-[#fff]">
                <p>
                  {status === "RequestToAccept" && status !== "Pending" ? (
                    <div className="text-[#fff] bg-[#2e9b32] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                      <div className="bg-[#fff] rounded-[50%] mr-2">
                        <TiTick className="text-[15px] text-[#2e9b32]" />
                      </div>
                      Request To Accept
                      {console.log(status)}
                    </div>
                  ) : status === "RequestToReject" && status !== "Pending" ? (
                    <div className="text-[#fff] bg-[#f84748] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                      <div className="bg-[#fff] rounded-[50%] mr-2">
                        <RxCross2 className="text-[20px] text-[#f00] font-[700] p-1" />
                      </div>
                      Request To Reject
                      {console.log(status)}
                    </div>
                  ) : status === "Approved" && status !== "Pending" ? (
                    <div className="text-[#fff] bg-[#2e9b32] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                      <div className="bg-[#fff] rounded-[50%] mr-2">
                        <TiTick className="text-[15px] text-[#2e9b32]" />
                      </div>
                      Accepted
                      {console.log(status)}
                    </div>
                  ) : (
                    status === "Approved" &&
                    status !== "Pending" && (
                      <div className="text-[#fff] bg-[#f84748] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                        <div className="bg-[#fff] rounded-[50%] mr-2">
                          <RxCross2 className="text-[20px] text-[#f00] font-[700] p-1" />
                        </div>
                        Rejected
                        {console.log(status)}
                      </div>
                    ) &&
                    status !== "Pending"
                  )}
                </p>
                {status !== "Pending" ? (
                  <div className="flex justify-between">
                    <p className="pb-5 pt-5 pl-7 text-[#bbb] font-[700] italic">
                      {commentStore || itemData?.comment}
                    </p>
                    <div className="flex pr-2 items-center">
                      <p className="pb-5 pt-5 text-[#bbb] pr-1 font-[700] italic">
                        @{itemData?.reviewedBy?.name || nameAuthor}
                      </p>
                      <RiAccountCircleFill className="text-[#0000ffb8] text-[3rem] pr-5" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full justify-center items-center bg-[#F0F0F0] mt-32">
                    <div className="flex flex-col items-center justify-center ">
                      <MdInsertComment className="text-[#9f9f9f] text-[5rem]" />
                      <p className="text-[#9f9f9f] font-[600]">
                        Be the first person to add a comment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!itemData.hasOwnProperty('comment') && (
          <>
            <div className="flex gap-5 mt-6 justify-start mb-5">
              <div
                className={`${
                  status === "RequestToAccept"
                    ? "bg-green-500 text-white p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                    : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                }`}
                onClick={handleReqAccept}
              >
                {status === "RequestToAccept" ? (
                  <div className="flex items-center px-3">
                    <div className="pr-2">Request Sent</div>
                    <div className="bg-[#fff] rounded-[50%]">
                      <TiTick className="text-[20px] text-[#2e9b32]" />
                    </div>
                  </div>
                ) : (
                  "Request To Accept"
                )}
              </div>

              <div
                className={`${
                  status === "RequestToReject"
                    ? "bg-[#f84748] text-white p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                    : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                }`}
                onClick={handleReqReject}
              >
                {status === "RequestToReject" ? (
                  <div className="flex items-center px-3">
                    <div className="pr-2">Request Sent</div>
                    <div className="bg-[#fff] rounded-[50%]">
                      <RxCross2 className="text-[20px] text-[#2e9b32]" />
                    </div>
                  </div>
                ) : (
                  "Request To Reject"
                )}
              </div>
            </div>

            {/* Input and Send Button */}
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
                onClick={handleSubmit}
                disabled={commentText.trim().length === 0 || isSend}
                className="h-16 w-[100px] ml-2 rounded-md flex justify-center items-center cursor-pointer"
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
                  <img
                    src={sending}
                    alt="sending"
                    className="h-16 rounded-md"
                  />
                )}
              </button>
            </div>
            {/* Action Buttons */}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
