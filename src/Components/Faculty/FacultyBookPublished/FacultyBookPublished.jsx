import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { VscDiffAdded } from 'react-icons/vsc'
import FacultyCardBP from './FacultyCardBP'
import { FaBookBookmark } from 'react-icons/fa6'
import { useGetReq, usePostReq } from '../../../hooks/useHttp'

function FacultyBookPublished() {
    const BpNumber=30
    const [showPopUp, setShowPopUp] = useState(false)
    const [data, setData]= useState([])
    const [getReq] = useGetReq()
    

    
    
    const accessToken=  sessionStorage.getItem('token').split('"')[1]
    
    useEffect(()=>{
        const getBPData= async()=>{
           try {
            const response= await getReq('api/v1/document/getAllPublications',
                accessToken
            )
            if(response.success){
                console.log(response.data)
            } 


           } catch (error) {
            console.log(error)
           }
        }
        getBPData()
    },[showPopUp])
    


  return (
    <div>
        <div className='relative p-8 flex gap-4'>
        <MdOutlineSearch  className='absolute bottom-9 text-[2rem] text-[#979da7] left-10 z-10'/>
        <div className='relative w-full'>
            <input
                type="text"
                placeholder="search for a book"
                className='w-full py-2 px-12 font-[400] text-[18px] outline-none border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)] rounded-md '
            />
            <RxCross2 className='absolute right-3 top-3 border-[#979da7] border-[2px] rounded-full text-[1.2rem] p-1 cursor-pointer' />
        </div>
            

            <div className=' bg-[#03A8FD] text-[#fff] flex justify-center align-middle items-center rounded-md px-4 cursor-pointer'>
            <div className='w-[200px] flex justify-center items-center gap-3 text-[1.15rem]'>
            Publish New Book
            <VscDiffAdded className='font-[700] text-[1.5rem] mt-1' />
            </div>

            </div>
        </div>

        {/* cards section */}
        <div className='w-full p-8 pt-0'>
            <div  className={` shadow-2xl rounded-md p-8 ${BpNumber<=8? 'h-[800px]':'h-[full]'}`}>
                <div className='text-[2rem] font-[500] flex items-center mb-10 gap-2'>
                <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
                    Book Published
                </div>
                
                <div className='flex flex-wrap gap-8 w-full h-full justify-center'>
                <FacultyCardBP status={'pending'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'approved'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'rejected'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'pending'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'approved'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'rejected'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'pending'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'approved'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'rejected'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'pending'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'approved'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                <FacultyCardBP status={'rejected'} date={'01/05/2000'} name={'Biswadip Saha'} ISBN={'00000000'}/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FacultyBookPublished