import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { FaBookBookmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import FacultyPopup from "../../DetailedSuperAdmin/FacultyPopup";
import "./Tablescrollbar.css"
import { FaRegComments } from "react-icons/fa";
import CommentModal from "./CommentModal";

const ModeratorViewTable = ({ name, dummyData, dummy, fullData }) => {
  const [data, setData] = useState(""); // for selected row data
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const rowsPerPage = 5;
  const [searchData, setSearchData] = useState(""); // Search state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for comments
  const [comment, setComment] = useState(""); // Store the comment
  const [selectedRow, setSelectedRow] = useState(null); // Selected row for comments
  const [columnHeaders, setColumnHeaders] = useState([]); // Store dynamic column headers
  const [id, setId] = useState("");
  const [itemData, setItemData] = useState([]);

  // Dynamically generate column headers
  useEffect(() => {
    if (dummyData?.length > 0) {
      const getColumnHeaders = (data) => {
        const keys = Object.keys(data[0]);
        return keys.flatMap((key) => {
          if (typeof data[0][key] === "object" && data[0][key] !== null) {
            return Object.keys(data[0][key]).map((subKey) => `${key}.${subKey}`);
          }
          return key;
        });
      };
      setColumnHeaders(getColumnHeaders(dummyData).filter(
        (header) => header !== "_id"
      ));
    }
  }, [dummyData]);

  const handleSearch = (event) => {
    setSearchData(event.target.value);
    setCurrentPage(1); 
  };

  const filteredData = dummyData.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchData.toLowerCase())
    );
  });

  // Get current data for pagination based on filtered data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  // Handle pagination
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle modal open and close for adding comments
  const handleAddCommentClick = (item) => {
    setSelectedRow(item); // Set the selected row
    setComment(item.comment || ""); // Load the existing comment (if any)
    setIsModalOpen(true); // Open the modal
    setId(item._id)
  };

  const handleCommentSubmit = (updatedComment) => {
    if (selectedRow) {
      console.log("Updated comment:", updatedComment);
      setSelectedRow(null); // Clear selected row after submission
      setIsModalOpen(false); // Close modal after submitting comment
    }
  };

  const [detailedClick, setDetailedClick] = useState(false);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <>
      <div className="px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start font-poppins">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">{name}</div>
          </div>

          <div className="w-full sm:w-[300px] lg:w-[500px] h-[50px] font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)] flex px-2 items-center justify-between">
            <div className="flex w-full justify-center items-center">
              <div>
                <CiSearch size={23} className="font-bold text-[#7A7A7A]" />
              </div>
              <input
                className="outline-none w-full pl-3 py-2 mr-2"
                placeholder="Search by Book Name"
                value={searchData}
                onChange={handleSearch}
              />
            </div>
            <div>
              <IoIosCloseCircleOutline size={25} className="font-bold text-[#7A7A7A]" />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-auto mt-5 rounded-lg text-center">
          <div className="min-w-full bg-white rounded-lg table-scrollbar" >
            <div className="table w-full" style={{boxShadow:'0px 10px 10px rgba(0,0,0,0.1)'}}>
              {/* Table Header */}
              <div className="table-header-group text-center">
                <div className="table-row bg-[#DEF4FF] h-12 rounded-lg items-center justify-center">
                  <div className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold">SL. No</div>
                  {columnHeaders.map((header, index) => (
                    <div key={index} className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </div>
                  ))}
                  <div className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold">Add Comment</div>
                </div>
              </div>

              {/* Table Body */}

              <div className="table-row-group">
                {currentRows?.filter((item) => item !== "_id")
                .map((item, rowIndex) => (

                  <div
                    key={rowIndex}
                    className="table-row border-b"
                    onClick={() => {
                      const selectedItem = dummy?.find((dt) => dt._id === id); // Find item by matching _id
                      if (selectedItem) {
                        setData(selectedItem); // Set the data to the found item
                        setDetailedClick(true); // Open the popup
                      }
                    }}
                  >
                    <div className="table-cell px-4 py-2">{indexOfFirstRow + rowIndex + 1}</div>
                    {columnHeaders.map((header, colIndex) => (
                      <div key={colIndex} className="table-cell px-4 py-2">
                        {header === "proofDocument" ? (
                          <a href={item[header]} target="_blank" className="text-[#03A8FD]">
                            Link
                          </a>
                        ) : (
                          item[header] // Render other fields normally
                        )}
                      </div>
                    ))}
                    <div className="table-cell px-4 py-2">
                      <span
                        className="flex items-center text-[#03A8FD] cursor-pointer pl-3 sm:w-[300px] md:w-[150px] lg:w-[150px] h-[30px] rounded-[10px] border backdrop-blur-lg s px-2 gap-2 justify-items-center text-sm sm:text-wrap"
                        onClick={() => {
                          handleAddCommentClick(item)
                          setId(item._id)
                          fullData?.map((dt)=>{
                              // console.log('=-=-=-=-=-=-=-=-==-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=',dt)
                              if(item.isbn===dt.isbn)
                                setItemData(dt)
                          })
                        }}
                      >
                        <FaRegComments size={16} />
                        Add Comment
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
        </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </div>

      {/* Modal for adding comment */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommentSubmit}
        id={id}
        itemData={itemData}
        comment={comment}
        setComment={setComment}
        name={name}
      />
    </>
  );
};

export default ModeratorViewTable;
