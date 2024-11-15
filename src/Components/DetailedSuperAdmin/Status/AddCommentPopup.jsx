import React, { useState } from "react";
import userImage from "../../../assets/user-profile.png";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Lottie from "react-lottie";
import sendingLottie from "../../../Lottie/sending.json";
import sending from "../../../assets/sending.png";
import Skeleton from "react-loading-skeleton";

const AddCommentPopup = ({ setShowPopup, data }) => {
  const [comments, setComments] = useState(data.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const handleSendComment = () => {
    if (commentText.trim()) {
      setComments([...comments, { text: commentText }]);
      setCommentText("");
    }
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[1000px] h-auto sm:h-[70vh] overflow-hidden flex flex-col">
        
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold font-poppins text-[#03A8FD]">Add Comment</h2>
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-1"
            onClick={() => setShowPopup(false)}
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
        </div>

        {/* Comments Display */}
        <div className="mb-4 h-full w-full bg-[#F0F0F0] rounded-xl p-4 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="flex h-full w-full justify-center items-center bg-[#F0F0F0] rounded-3xl">
              <p className="text-gray-500">Be the first person to add a comment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="pt-8 px-8 rounded-lg text-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={userImage}
                      alt="Profile"
                      className="h-5 w-5 rounded-full"
                    />
                    <div className="font-medium">UserName</div>
                  </div>
                  <div className="bg-[#E4E4E4] p-4 rounded-xl ml-5">
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Comment Input */}
        <div className="flex items-center mt-6">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment here..."
            className="bg-[#f0f0f0] h-16 rounded-lg px-4 w-full focus:outline-none focus:border-blue-500"
          />
          {commentText.trim().length !== 0 ? (
            <div
              onClick={() => {
                if (commentText.trim()) {
                  setComments([...comments, { text: commentText }]);
                  setCommentText("");
                }
                setIsLottieLoading(true);
                setTimeout(() => {
                  setIsSend(true);
                  setIsLottieLoading(false);
                }, 1000);
              }}
            >
              {isLottieLoading ? (
                <div className="h-16 rounded-md flex justify-center align-middle items-center cursor-pointer">
                  <Lottie
                    options={{
                      animationData: sendingLottie,
                    }}
                    height={"90px"}
                    width={"100px"}
                  />
                </div>
              ) : (
                <div className="h-16 w-[100px] rounded-md flex justify-center align-middle items-center cursor-pointer">
                  <img
                    src={sending}
                    alt="sending"
                    className="h-16 rounded-md flex justify-center items-center cursor-pointer"
                  />
                </div>
              )}
            </div>
          ) : isLoading ? (
            <Skeleton
              className="flex flex-row ml-2 gap-10 rounded-full mt-8 flex-wrap w-[70px] h-[70px]"
              enableAnimation={true}
              direction="ltr"
              highlightColor={"#d1e3ff"}
            />
          ) : (
            <div className="h-16 w-[100px] rounded-md flex justify-center align-middle items-center opacity-60">
              <img
                src={sending}
                alt="sending"
                className="h-16 rounded-md flex justify-center items-center"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCommentPopup;
