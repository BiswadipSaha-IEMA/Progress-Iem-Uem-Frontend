import React, { useEffect, useState } from 'react'
// Importing required icons
import { MdOutlineSearch } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { VscDiffAdded } from 'react-icons/vsc'
// import FacultyCardBP from './FacultyCardBP'
import { FaBookBookmark } from 'react-icons/fa6'
// Importing custom hooks and components
import { useGetReq, usePostReq } from '../../../hooks/useHttp'
import ManagePopUp from '../../../utils/Popup/FormPopUp/ManagePopUp'
import WorkshopOrganized from '../../../utils/Popup/FormPopUp/WorkshopOrganized'
import FacultyIndustrialTourCard from './FacultyIndustrialTourCard'
import WorkShopPopUp from '../../../utils/Popup/FormPopUp/WorkShopPopUp'
import IndustrialTourPopUp from '../../../utils/Popup/FormPopUp/IndustrialTourPopUp'

// Main component to display and manage organized workshops
function FacultyIndustrialTourComp() {
    // Variable for managing a specific numeric identifier
    const BpNumber = 30
    
    // State to toggle popup display
    const [showPopUp, setShowPopUp] = useState(false)
    
    // States to store fetched data and its backup for search functionality
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    
    // Custom hook for GET request
    const [getReq] = useGetReq()
    
    // Access token retrieval for API authentication
    const accessToken = sessionStorage.getItem('token').split('"')[1]
    
    // Fetching workshop data on component mount or popup close
    useEffect(() => {
        const getBPData = async () => {
           try {
               // API call to fetch all event data
               const response = await getReq('api/v1/document/getAllEvents', accessToken)
               if (response.success) {
                   console.log(response.data)
                   setData(response.data.data)
                   setData1(response.data.data)
               } 
           } catch (error) {
               console.log(error) // Logging any errors
           }
        }
        getBPData()
    }, [showPopUp]) // Dependency on showPopUp to refetch data when popup closes

    // Search function to filter displayed data
    const handleSearch = (event) => {
        if (data) {
            const searchData = event.target.value
            const filteredData = data1.filter(item => item.title.toLowerCase().includes(searchData.toLowerCase()))
            setData(filteredData)
            if (searchData === '') // Reset data if search input is cleared
                setData(data1)
        }
    }

    return (
        <div className="p-4 md:p-8">
            {/* Search bar and 'Add New Workshop' button */}
            <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
                <MdOutlineSearch className="absolute bottom-3 md:bottom-9 left-4 md:left-10 text-[1.5rem] md:text-[2rem] text-[#979da7] z-10" />
                
                {/* Search input field */}
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="search for a conference"
                        onChange={handleSearch}
                        className="w-full py-2 px-10 md:px-12 font-[400] text-[16px] md:text-[18px] outline-none border-[#03A8FD] backdrop-blur-lg shadow-[0_0_8px_2px_rgba(3,168,253,0.7)] rounded-md"
                    />
                    <RxCross2 className="absolute right-2 top-2 md:right-3 md:top-3 border-[#979da7] border-[2px] rounded-full text-[1rem] md:text-[1.2rem] p-1 cursor-pointer" />
                </div>

                {/* Button to open popup for adding a new workshop */}
                <div className="bg-[#03A8FD] text-[#fff] flex justify-center items-center rounded-md w-[300px] py-2 cursor-pointer"
                    onClick={() => setShowPopUp(true)}
                >
                    <div className="w-full flex justify-center items-center gap-2 md:gap-3 text-[1rem] md:text-[1.15rem]">
                        Add New Tour
                        <VscDiffAdded className="text-[1.3rem] md:text-[1.5rem] mt-1" />
                    </div>
                </div>
            </div>

            {/* Displaying the list of organized workshops */}
            <div className="w-full p-4 md:p-8 pt-0">
                <div className={`shadow-2xl rounded-md p-4 md:p-8 ${BpNumber <= 8 ? 'h-[600px] md:h-[800px]' : 'h-auto'}`}>
                    <div className="text-[1.5rem] md:text-[2rem] font-[500] flex items-center mb-6 md:mb-10 gap-2">
                        <FaBookBookmark className="text-[1.5rem] md:text-[2rem] text-[#03A8FD]" />
                        Industrial Tour
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8 w-full h-full">
                        {/* Rendering workshop cards for each workshop item */}
                        {data
                            ?.filter(item => item.eventType === 'Industrial Tour') // Filtering workshops by event type
                            .map((item, index) => (
                                <FacultyIndustrialTourCard
                                    key={index} // Key for unique mapping
                                    status={item.status} // Status of workshop
                                    title={item.topicName} // Workshop title
                                    organizedBy={item.organizedBy}
                                    date={item.date} // Date of workshop
                                    industryName={item.industryName} // Organizer's name
                                    attendedBy={item.topicName} // Topic name for display
                                    // ISBN={item.isbn} // Uncomment if ISBN needed
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Conditional rendering of popup form for adding a new workshop */}
            {showPopUp && <IndustrialTourPopUp
                setUtilFor={'bpAddForm'}
                setShowPopup={setShowPopUp}
            />}
        </div>
    )
}

export default FacultyIndustrialTourComp
