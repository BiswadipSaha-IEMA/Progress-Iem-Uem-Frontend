import React, { useEffect, useState, useRef } from 'react';
import { CiSquarePlus, CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import MemberCard from '../MemberCard/MemberCard';
import Sidebar from '../SideBar/Sidebar';
import { Menu } from 'lucide-react';
import gsap from 'gsap';

const AddFacultyComp = () => {
    const [sidebar, setSidebar] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from your specified IP
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.221:5000/api/v1/user/addUser');
                const result = await response.json();
                setData(result);  // Assuming `result` is an array of users
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex w-full overflow-x-hidden">
            <div className="relative">
                <Sidebar showProfile={sidebar} />
                {sidebar && (
                    <button className={`bg-slate-200 p-2 rounded absolute lxs:hidden`} onClick={() => { setSidebar(!sidebar) }}>
                        <Menu />
                    </button>
                )}
            </div>
            <div className={`flex-grow rounded-lg mb-8 duration-300 ${sidebar ? "lg:w-[calc(100%-320px)] lg:ml-[320px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')]`}>
                <div className="flex justify-between items-center mt-4">
                    <button className={`bg-slate-200 p-2 rounded `} onClick={() => { setSidebar(!sidebar) }}>
                        <Menu />
                    </button>
                    <div className="w-[83%] relative flex items-center">
                        <button className="absolute text-3xl left-2"><CiSearch /></button>
                        <input className='w-full rounded-lg p-2 pl-12 focus:border-[#03A8FD] focus:shadow-[#03A8FD]' />
                        <button className="absolute right-2 text-3xl"><IoIosCloseCircleOutline /></button>
                    </div>
                    <button className='bg-[#03A8FD] p-1 text-lg right-0 rounded-lg flex items-center pl-4 pr-4 text-white'>
                        Add New Faculty 
                        <div className="text-2xl"><CiSquarePlus /></div>
                    </button>
                </div>

                <div className="bg-white p-4 flex flex-wrap w-full mt-8 rounded-lg">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Cards role={'faculty'} sidebar={sidebar} data={data} />
                    )}
                </div>
            </div>
        </div>
    );
}

const Cards = ({ role, sidebar, data }) => {
    const currentDiv = useRef([]);

    useEffect(() => {
        gsap.fromTo(currentDiv.current, {
            opacity: 0,
            y: 50,
            scaleX: 0,
        }, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 2,
            scaleX: 1,
            ease: 'elastic',
        });
    }, [data]);

    return (
        <>
            {data.map((element, index) => (
                <div key={index}
                    ref={ele => currentDiv.current[index] = ele}
                    className={`${sidebar ? 'ml-12' : 'lg:ml-0'}`}
                >
                    <MemberCard role={role} data={element} />
                </div>
            ))}
        </>
    );
};

export default AddFacultyComp;
