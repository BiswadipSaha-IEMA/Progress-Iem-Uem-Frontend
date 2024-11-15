import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { VscDiffAdded } from 'react-icons/vsc'
import { FaBookBookmark } from 'react-icons/fa6'
import { useGetReq } from '../../../hooks/useHttp'
import FacultyPopup from '../../DetailedSuperAdmin/FacultyPopup'
import Header from '../../../Components/Header/Header'
import PatentPopUp from '../../../utils/Popup/FormPopUp/PatentPopUp'

export default function FacultyPatent() {
    const [showPopUp, setShowPopUp] = useState(false)
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [getReq] = useGetReq()
    const [currentPage, setCurrentPage] = useState(1)
    const [detailedClick, setDetailedClick] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const rowsPerPage = 5

    const accessToken = sessionStorage.getItem('token').split('"')[1]

    useEffect(() => {
        const getPatentsData = async () => {
            try {
                const response = await getReq('api/v1/document/getAllPatents', accessToken)
                if (response.success) {
                    console.log(response.data.data)
                    setData(response.data.data)
                    setData1(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPatentsData()
    }, [showPopUp])

    const handleSearch = (event) => {
        const searchData = event.target.value.toLowerCase()
        const filteredData = data1.filter(item => 
            item.name.toLowerCase().includes(searchData) ||
            item.department.toLowerCase().includes(searchData) ||
            item.topicName.toLowerCase().includes(searchData)
        )
        setData(filteredData)
        setCurrentPage(1)
    }

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow)

    const totalPages = Math.ceil(data.length / rowsPerPage)
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const columnHeaders = ['Name', 'Department', 'Designation', 'Topic Name', 'Date of Filing', 'National/International', 'Status']

    return (
        <div className={`px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start font-poppins ${showPopUp ? 'overflow-hidden' : ''}`}>
            <Header backPage="/faculty/dashboard" />
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 mt-10">
                <div className="flex items-center gap-5 mb-4 sm:mb-0">
                    <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
                    <div className="text-[20px] sm:text-[25px] font-semibold">
                        Patents
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-[300px] lg:w-[500px]">
                        <input
                            type="text"
                            placeholder="Search by Name or Topic"
                            onChange={handleSearch}
                            className="w-full h-[50px] font-semibold py-2 pl-10 pr-10 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
                        />
                        <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A]" />
                        <RxCross2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A] cursor-pointer" />
                    </div>
                    <button
                        className="bg-[#03A8FD] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                        onClick={() => setShowPopUp(true)}
                    >
                        Add New Patent
                        <VscDiffAdded className="text-[1.3rem]" />
                    </button>
                </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-auto mt-5 rounded-lg">
                <div className="min-w-full bg-white rounded-lg shadow">
                    <div className="table w-full">
                        {/* Table Header */}
                        <div className="table-header-group">
                            <div className="table-row bg-[#DEF4FF] h-12 rounded-lg items-center justify-center">
                                <div className="table-cell px-4 py-2 text-[#575757] font-semibold">
                                    SL. No
                                </div>
                                {columnHeaders.map((header, index) => (
                                    <div
                                        key={index}
                                        className="table-cell px-4 py-2 text-[#575757] font-semibold"
                                    >
                                        {header}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="table-row-group">
                            {currentRows.map((item, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="table-row border-b cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedData(item)
                                        setDetailedClick(true)
                                    }}
                                >
                                    {/* Sl. No Column */}
                                    <div className="table-cell px-4 py-2 text-[#000]">
                                        {indexOfFirstRow + rowIndex + 1}
                                    </div>
                                    {/* Dynamic Data Columns */}
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.name}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.department}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.designation}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.topicName}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.dateOfFiling}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.nationalOrInternational}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination Controls */}
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

            {showPopUp && (
                <PatentPopUp
                    setUtilFor={'patentAddForm'}
                    setShowPopup={setShowPopUp}
                />
            )}

            {detailedClick && (
                <FacultyPopup setShowPopup={setDetailedClick} data={selectedData} />
            )}
        </div>
    )
}