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

const CommentModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
  id,
  comment,
  itemData,
}) => {
  const [commentText, setCommentText] = useState("");
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const [isSend, setIsSend] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const { criteriaId } = useParams();
  const [postReq] = usePostReq();
  const [loading, setLoading] = useState(false);
  const [storeTempMessage, setStoreTempMessage] = useState("");
  const [storeTempStatus, setStoreTempStatus] = useState("");

  useEffect(() => {
    console.log("---------------------------", itemData);
    console.log(loading);
  }, [loading]);

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
    const response = await postReq(
      `api/v1/document/reviewPublication`,
      {
        publicationId: itemData?._id,
        status: "RequestToAccept",
        comment: "This File Is Accepeted",
      },
      accessToken
    );
    setStoreTempMessage("This File Is Accepeted");
    setStoreTempStatus("Request To Accept");
    setLoading(false);
    console.log(response);
  };
  const handleReqReject = async () => {
    const response = await postReq(
      `api/v1/document/reviewPublication`,
      {
        publicationId: itemData?._id,
        status: "RequestToReject",
        comment: `${commentText !== '' ? commentText : null}`,
      },
      accessToken
    );
    setStoreTempMessage(commentText !== '' ? commentText : null);
    setStoreTempStatus("Request To Reject");
    setCommentText("");
  };

  const handleSubmit = async () => {
    setIsSend(true);
    try {
      const response = await postReq(
        `api/v1/document/reviewPublication`,
        {
          publicationId: itemData?._id,
          status: "RequestToReject",
          comment: commentText,
        },
        accessToken
      );
      setStoreTempMessage(commentText);
      setStoreTempStatus("Request To Reject");
    } catch (error) {
      console.error("Error posting comment", error);
    } finally {
      setIsSend(false);
      setCommentText("");
    }
  };

  useEffect(() => {
    if (itemData?.status) {
      if (itemData.status === "RequestToAccept") {
        setStoreTempStatus("Request To Accept");
      } else if (itemData.status === "RequestToReject") {
        setStoreTempStatus("Request To Reject");
      }
    }
  }, [itemData]);

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
            onClick={onClose}
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
        </div>

        {/* Comment Section */}
        <div className="mb-4 h-full w-full bg-[#F0F0F0] rounded-xl p-4 overflow-y-auto">
          {!storeTempStatus? (
            <div className="flex h-full w-full justify-center items-center bg-[#F0F0F0] rounded-3xl">
              <p className="text-gray-500">
                Be the first person to add a comment
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="  rounded-lg text-gray-800 bg-[#fff]">
                <p>
                  {
                    storeTempStatus === "Request To Accept" ? (
                      <div className="text-[#fff] bg-[#2e9b32] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                        <div className="bg-[#fff] rounded-[50%] mr-2">
                          <TiTick className="text-[15px] text-[#2e9b32]" />
                        </div>
                        Accepted
                      </div>
                    ) : (
                      <div className="text-[#fff] bg-[#f84748] flex rounded-t-lg items-center pl-7 pt-2 pb-2">
                        <div className="bg-[#fff] rounded-[50%] mr-2">
                          <RxCross2 className="text-[20px] text-[#f00] font-[700] p-1" />
                        </div>
                        <div className="">
                          Rejected
                        </div>
                      </div>
                    )
                  }
                </p>
                <div className="flex justify-between">
                  <p className="pb-5 pt-5 pl-7 text-[#bbb] font-[700] italic">
                    {storeTempMessage ? storeTempMessage : itemData?.comment}
                  </p>
                  <div className="flex pr-2 items-center">
                    <p className="pb-5 pt-5 text-[#bbb] pr-1 font-[700] italic">@{itemData?.reviewedBy?.name}</p>
                    <RiAccountCircleFill className="text-[#0000ffb8] text-[3rem] pr-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-5 mt-6 justify-start mb-5">
          <div
            className={`${
              storeTempStatus === "Request To Accept"
                ? "bg-green-500 text-white p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                : storeTempStatus === "Request To Reject"
                ? "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
            }`}
            onClick={handleReqAccept}
          >
            {
              storeTempStatus === "Request To Accept" ? (
                <div className="flex items-center px-3">
                  <div className="pr-2">
                    Request Sent
                  </div>
                  <div className="bg-[#fff] rounded-[50%]">
                    <TiTick className="text-[20px] text-[#2e9b32]" />
                  </div>
                </div>
              ) : "Request To Accept"
            }
          </div>

          <div
            className={`${
              storeTempStatus === "Request To Reject"
                ? "bg-[#f84748] text-white p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                : storeTempStatus === "Request To Accept"
                ? "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
                : "bg-[#def4ff] text-[#69a7c6] p-2 rounded-md font-[600] border-[#bae8ff] border-[2px] pl-5 pr-5 cursor-pointer"
            }`}
            onClick={handleReqReject}
          >
            {
              storeTempStatus === "Request To Reject" ? (
                <div className="flex items-center px-3">
                  <div className="pr-2">
                    Request Sent
                  </div>
                  <div className="bg-[#fff] rounded-[50%]">
                    <RxCross2 className="text-[20px] text-[#2e9b32]" />
                  </div>
                </div>
              ) : "Request To Reject"
            }
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
              <img src={sending} alt="sending" className="h-16 rounded-md" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
