import React from 'react';

const AcceptRejectButtons = ({ onAccept, onReject }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onAccept}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Accept
      </button>
      <button
        onClick={onReject}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  );
};

export default AcceptRejectButtons;
