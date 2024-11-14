import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { VscDiffAdded } from 'react-icons/vsc'
import { FaBookBookmark } from 'react-icons/fa6'
import { useGetReq } from '../../../hooks/useHttp'
import ResearchPaperGradeB from '../../../utils/Popup/FormPopUp/ResearchPaperGradeB'
import FacultyPopup from '../../DetailedSuperAdmin/FacultyPopup'
import Header from '../../../Components/Header/Header'

export default function FacultyBookPublished() {
    const [showPopUp, setShowPopUp] = useState(false)
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [getReq] = useGetReq()
    const [currentPage, setCurrentPage] = useState(1)
    const [detailedClick, setDetailedClick] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const rowsPerPage = 10

    const accessToken = sessionStorage.getItem('token').split('"')[1]

    useEffect(() => {
        const getBPData = async () => {
            try {
                const response = await getReq('api/v1/document/getAllPublications', accessToken)
                const arr = []
                if (response.success) {
                    console.log(response.data.data)

                    response.data.data.forEach((data) => {
                        if (data.publicationGrade === "Grade-B")
                            arr.push(data)
                    })

                    setData(arr)
                    setData1(arr)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBPData()
    }, [showPopUp])

    const handleSearch = (event) => {
        const searchData = event.target.value.toLowerCase()
        const filteredData = data1.filter(item => 
            item.title.toLowerCase().includes(searchData) ||
            item.name.toLowerCase().includes(searchData) ||
            item.isbn.toLowerCase().includes(searchData)
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

    const columnHeaders = ['Title', 'Publisher Name','Published Date', 'Issue No', 'Status', 'Proof Document']

    return (
        <div className='mx-10'>
            <Header backPage="/faculty/dashboard" />
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 mt-10">
                <div className="flex items-center gap-5 mb-4 sm:mb-0">
                    <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
                    <div className="text-[20px] sm:text-[25px] font-semibold">
                    Research Paper Grade B
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-[300px] lg:w-[500px]">
                        <input
                            type="text"
                            placeholder="Search by Book Name"
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
                        Publish New Book
                        <VscDiffAdded className="text-[1.3rem]" />
                    </button>
                </div>
            </div>

            {/* Responsive Table */}
            <div className="h-[400px] mt-5 rounded-lg">
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
                                    className="table-row border-b h-[50px] cursor-pointer hover:bg-gray-100"
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
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.title}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.name}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.date}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.issue}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">{item.status}</div>
                                    <div className="table-cell px-4 py-2 text-[#000]">
                                    {item.proofDocument ? (
                                    <a
                                      href={item.proofDocument} 
                                      target="_blank" 
                                    //   rel="noopener noreferrer"
                                      className="text-blue-500 underline"
                                    >
                                        {item.proofDocument.substring(0,15)+'...'}
                                        </a>
                                    ):(
                                        "NA"
                                    )}
                                        </div>
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
                <ResearchPaperGradeB
                    setUtilFor={'bpAddForm'}
                    setShowPopup={setShowPopUp}
                />
            )}

            {/* {detailedClick && (
                <FacultyPopup setShowPopup={setDetailedClick} data={selectedData} />
            )} */}
        </div>
    )
}