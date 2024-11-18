import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { usePostReq } from "../../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import sending from "../../../assets/sending.png";
import Skeleton from "react-loading-skeleton";
import Lottie from "react-lottie";

const CommentModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedRow,
  id,
  comment,
  itemData
}) => {
  const [commentText, setCommentText] = useState("");
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const [isSend, setIsSend] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const { criteriaId } = useParams();
  const [postReq] = usePostReq();
  const [loading, setLoading] = useState(false);

  // Set the initial comment text when the modal opens
  // useEffect(() => {
  //   if (selectedRow) {
  //     setCommentText(selectedRow.comment || "");
  //   }
  // }, [selectedRow, isOpen]);

  

  useEffect(()=>{
    console.log('---------------------------',itemData)
    console.log(loading)

  },[loading])

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentText.trim().length > 0) {
      handleSubmit();
    }
  };

  const handleReqAccept = async () => {
    setLoading(true)
    const response = await postReq(`api/v1/document/reviewPublication`, {
      publicationId: itemData._id,
      status: "RequestToAccept",
      comment: 'Request to accept',
    },
    accessToken
  );
  setLoading(false)
  console.log(response)
  };
  const handleReqReject = async () => {
  //   const response = await postReq(`api/v1/document/reviewPublication`, {
  //     publicationId: id,
  //     status: "RequestToAccept",
  //     comment: 'RequestToAccept',
  //   },
  //   accessToken
  // );
  // console.log(response)
  };

  const handleSubmit = async () => {
    setIsSend(true);
    try {
      const response = await postReq(
        `api/v1/document/reviewPublication`,
        {
          publicationId: itemData._id,
          status: "RequestToReject",
          comment: commentText,
        },
        accessToken
      );
      // onSubmit(response.data);
    } catch (error) {
      console.error("Error posting comment", error);
    } 
    finally{
      setIsSend(false)
      setCommentText('')
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
            onClick={onClose}
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
        </div>

        {/* Comment Section */}
        <div className="mb-4 h-full w-full bg-[#F0F0F0] rounded-xl p-4 overflow-y-auto">
          {itemData.comment?.length === 0 ? (
            <div className="flex h-full w-full justify-center items-center bg-[#F0F0F0] rounded-3xl">
              <p className="text-gray-500">
                Be the first person to add a comment
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="pt-8 px-8 rounded-lg text-gray-800">
                <p>{itemData.comment}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex  gap-5 mt-6 justify-end w-[790px] mb-2">
          <div
            className="bg-[#d6ffce] p-1 px-2 rounded-md font-[600] text-[#1c6229] cursor-pointer"
            onClick={handleReqAccept}
          >
            Request To Accept
          </div>
          <div
            className="bg-[#f00] p-1 px-2 rounded-md font-[600] text-[#fff] cursor-pointer"
            onClick={handleReqReject}
          >
            Request To Reject
          </div>
          {/* <div></div> */}
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
