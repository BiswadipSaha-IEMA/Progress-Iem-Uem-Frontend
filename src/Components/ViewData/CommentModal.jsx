import React, { useState, useEffect } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit, selectedRow }) => {
  const [comment, setComment] = useState('');

  // Set the comment when the modal is opened for the first time
  useEffect(() => {
    if (selectedRow) {
      setComment(selectedRow.comment || ''); 
    }
  }, [selectedRow, isOpen]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(comment); 
    onClose(); // Close the modal after submitting the comment
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Leave a Comment for {selectedRow?.name}</h2>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Type your comment here..."
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
