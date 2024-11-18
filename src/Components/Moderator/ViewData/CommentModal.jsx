import React, { useState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { usePostReq } from '../../../hooks/useHttp';
import { useParams } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
const CommentModal = ({ isOpen, onClose, onSubmit, selectedRow,id }) => {
  const [commentText, setCommentText] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [postReq] = usePostReq();
  const { criteriaId } = useParams();

  // Set the comment when the modal is opened for the first time
  useEffect(() => {
    if (selectedRow) {
      setCommentText(selectedRow.comment || ''); 
    }
  }, [selectedRow, isOpen]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async () => {
    setIsSend(true);

    try {
      const response = await postReq(
        `api/v1/document/reviewPublication`,
        { 
          publicationId:id, status:'RequestToReject', comment:commentText
         },
        sessionStorage.getItem("token")
      );

      // Assuming you want to call onSubmit to pass the response back
      onSubmit(response.data);
    } catch (error) {
      console.error("Error posting comment", error);
    } finally {
      setIsSend(false);
      setCommentText('');
      onClose(); // Close the modal after submitting
    }
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
  <IoPersonCircleOutline className="text-xl mr-2 h-10 w-8" /> Add a Comment
</h2>

          <button onClick={onClose} className="text-gray-600 text-3xl">
          <IoMdClose className=" text-black bg-red-100 rounded-3xl p-1" />

          </button>
        </div>

        {/* Existing Comment Section */}
        <div className="bg-[#e4e4e4] rounded-md h-96 mb-6 p-4">
          {selectedRow?.comment ? selectedRow.comment : "No existing comment"}
        </div>

        {/* New Comment Section */}
        <div className="bg-[#fff] p-4 rounded-md ">
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Type your comment here..."
            className="w-full h-12 p-2 border rounded-md text-lg resize-none bg-[#e4e4e4]"
          />

          <div className="flex justify-end items-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={isSend || !commentText.trim()}
              className="bg-black text-white py-2 px-6 rounded-md flex items-center disabled:bg-gray-400"
            >
              {isSend ? 'Posting...' : 'Post'}
              <IoSend className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
