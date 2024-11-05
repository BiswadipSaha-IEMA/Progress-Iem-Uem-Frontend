import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { VscDiffAdded } from 'react-icons/vsc'
// import FacultyCardBP from './FacultyCardBP'
import { FaBookBookmark } from 'react-icons/fa6'
import { useGetReq, usePostReq } from '../../../hooks/useHttp'
import ManagePopUp from '../../../utils/Popup/FormPopUp/ManagePopUp'
import WorkshopOrganized from '../../../utils/Popup/FormPopUp/WorkshopOrganized'
import FacultyWorkshopOrganizedCard from './FacultyWorkshopOrganizedCard'
import WorkShopPopUp from '../../../utils/Popup/FormPopUp/WorkShopPopUp'

function FacultyWorkshopOrganizedComp() {
    // Set initial count for BpNumber and showPopUp, data, and data1 state variables
    const BpNumber = 30
    const [showPopUp, setShowPopUp] = useState(false)
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [getReq] = useGetReq()

    // Retrieve the access token from session storage
    const accessToken = sessionStorage.getItem('token').split('"')[1]

    // Fetch events data on component mount or when showPopUp changes
    useEffect(() => {
        const getBPData = async () => {
            try {
                // API request to fetch all events
                const response = await getReq('api/v1/document/getAllEvents', accessToken)
                
                // Check if the request was successful, then set data in state
                if (response.success) {
                    console.log(response.data)
                    setData(response.data.data)
                    setData1(response.data.data)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        getBPData()
    }, [showPopUp]) // Dependency array includes showPopUp to re-fetch when popup state changes

    // Handle search input change and filter displayed data accordingly
    const handleSearch = (event) => {
        if (data) {
            const searchData = event.target.value
            const filteredData = data1.filter(item =>
                item.title.toLowerCase().includes(searchData.toLowerCase())
            )
            setData(filteredData)
            if (searchData === '') setData(data1) // Reset data if search input is cleared
        }
    }

    return (
        <div className="p-4 md:p-8">

            {/* Search bar and "Add New Workshop" button section */}
            <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
                {/* Search icon */}
                <MdOutlineSearch className="absolute bottom-3 md:bottom-9 left-4 md:left-10 text-[1.5rem] md:text-[2rem] text-[#979da7] z-10" />

                {/* Search input field */}
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="search for a conference"
                        onChange={handleSearch}
                        className="w-full py-2 px-10 md:px-12 font-[400] text-[16px] md:text-[18px] outline-none border-[#03A8FD] backdrop-blur-lg shadow-[0_0_8px_2px_rgba(3,168,253,0.7)] rounded-md"
                    />
                    {/* Cross icon for clearing the search */}
                    <RxCross2 className="absolute right-2 top-2 md:right-3 md:top-3 border-[#979da7] border-[2px] rounded-full text-[1rem] md:text-[1.2rem] p-1 cursor-pointer" />
                </div>

                {/* Add New Workshop button */}
                <div className="bg-[#03A8FD] text-[#fff] flex justify-center items-center rounded-md w-[300px] py-2 cursor-pointer"
                    onClick={() => setShowPopUp(true)}
                >
                    <div className="w-full flex justify-center items-center gap-2 md:gap-3 text-[1rem] md:text-[1.15rem]">
                        Add New Workshop
                        <VscDiffAdded className="text-[1.3rem] md:text-[1.5rem] mt-1" />
                    </div>
                </div>
            </div>

            {/* Main content container for Workshop Organized list */}
            <div className="w-full p-4 md:p-8 pt-0">
                <div className={`shadow-2xl rounded-md p-4 md:p-8 ${BpNumber <= 8 ? 'h-[600px] md:h-[800px]' : 'h-auto'}`}>
                    <div className="text-[1.5rem] md:text-[2rem] font-[500] flex items-center mb-6 md:mb-10 gap-2">
                        <FaBookBookmark className="text-[1.5rem] md:text-[2rem] text-[#03A8FD]" />
                        Workshop Organized 
                    </div>

                    {/* Workshop cards display area */}
                    <div className="flex flex-wrap gap-4 md:gap-8 w-full h-full">
                        {
                            data
                                ?.filter(item => item.eventType === 'Workshop') // Filter only 'Workshop' type events
                                .map((item, index) => (
                                    <FacultyWorkshopOrganizedCard
                                        key={index}
                                        status={item.status}
                                        title={item.topicName}
                                        date={item.date}
                                        organizedBy={item.organizedBy}
                                        name={item.topicName}
                                    />
                                ))
                        }
                    </div>
                </div>
            </div>

            {/* Conditional rendering of WorkshopOrganized popup component */}
            {showPopUp && (
                <WorkShopPopUp
                    setUtilFor={'bpAddForm'}
                    setShowPopup={setShowPopUp}
                />
            )}
        </div>
    )
}

export default FacultyWorkshopOrganizedComp
