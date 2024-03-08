"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import edit from '@/public/edit.png'
import {
    CiLocationOn,
    CiClock2,
} from "react-icons/ci";

import {
    FaMoneyBill,
    FaDesktop,
    FaIndianRupeeSign,
} from "react-icons/fa6";

import { GiSkills } from "react-icons/gi";
import check from '@/public/Checkmark.png';
import { usePathname, useRouter } from 'next/navigation';
import app, { db } from '../../firebase.config';
import { DocumentData, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from '@/app/Navbar';
import { Sidebar } from '@/app/Sidebar';

interface post {
    jobtitle: string;
    location: string;
    type: string;
    jobtype: string;
    duration: string;
    payroll: string;
    skills: string[];
    email: string;
    description: string;
    lookingfor:string;
    // Add other keys as needed
}

const page: React.FC<{params:any }> = ({params}) => {
    const jobid = params.slug
    const router = useRouter();
    const [loading, setLoading] = useState<boolean | null>(null);
    const [post, setPost] = useState<DocumentData | null>(null);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
          router.push('/');
        }
        setLoading(true)
        const formDataFromLocalStorage = JSON.parse(window.localStorage.getItem("jobposts") || "[]");
        const filteredData = formDataFromLocalStorage.filter((data: { id: any; }) => data.id === jobid);
        setPost(filteredData.length > 0 ? filteredData[0] : null);
        setLoading(false)
    }, []);
    

  
    const closethejob = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, 'JobList', jobid);
            await updateDoc(docRef, { status: 'inactive' });
            console.log('Document updated with ID:', jobid);
            setLoading(false);
            router.push(`/Jobposts`);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };
    const activejob = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, 'JobList', jobid);
            await updateDoc(docRef, { status: 'Active' });
            console.log('Document updated with ID:', jobid);
            setLoading(false);
            router.push(`/Jobposts`);

        } catch (error) {
            console.error('Error updating document:', error);
        }
    };
    
    const pathname = usePathname()
    return (
         <div className=''>
         <Navbar/>
      <div className='flex'>
          <Sidebar/>

        <main className={'grid place-items-center items-center w-screen'}>
        <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
      <Link href={'/Postjob'} className='flex flex-col justify-center items-center'>
      <span className={pathname==='/Postjob'?' text-[#0DF5E3]':pathname==='/Previewjobpost'?'text-[#0DF5E3]':""}>Post a Job</span>
      <span className={pathname==='/Postjob'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':pathname==='/Previewjobpost'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':"bg-[#ffff]"}></span>
      </Link>
      <Link href={'/Jobposts'} className='flex flex-col justify-center items-center'>
    <span className={pathname==='/Jobposts'?' text-[#0DF5E3]':pathname===`/Jobposts/${jobid}`?'text-[#0DF5E3]':""}>Job-post Details</span>
    <span  className={pathname==='/Jobposts'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':pathname===`/Jobposts/${jobid}`?'p-[1.5px] w-[40px] bg-[#0DF5E3]':'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
</Link>

     </div>
{
    loading?(
        <div role="status" className="animate-pulse w-[95%] space-y-11 py-5 my-6 bg-slate-300 rounded-md">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[30%] mb-2.5 mx-[1%]"></div>
        <div className='flex mx-[1%]'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[15%] mb-2.5 "></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>

        </div>
        <div className='flex mx-[1%]'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[15%] mb-2.5 "></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[5%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[8%] mb-2.5 mx-[5%]"></div>

        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
   
     
        <span className="sr-only">Loading...</span>
    </div>
    ):
          <section className='w-[95%] h-[55vh] overflow-y-scroll px-10 my-6 border rounded-lg text-black'>
      
              <div className='flex border-b border-gray-300 justify-between '>
              <div className='flex flex-col items-start justify-evenly  my-5'>
              <h1 className='font-Inknut font-bold text-2xl '>{post?.jobtitle} <span className={post?.status === "inactive"?'text-[#FF0000] text-xs mx-6 7] uppercase':'text-xs mx-6 text-[#00D347] uppercase'}>• {post?.status}</span></h1>
                  <div className='flex flex-row flex-wrap  gap-20 h-auto w-full my-8 z-0'>
                      <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'><CiLocationOn />{post?.location} </div>
                      <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'><FaMoneyBill />{post?.type} </div>
                      <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'><FaDesktop />{post?.jobtype} </div>
                      <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'><CiClock2 />{post?.duration} </div>
                      <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'><FaIndianRupeeSign />{post?.payroll} </div>
                  </div>
                  <div className='flex  gap-16  w-[100%]'>

                  <div className='flex  flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-black'>
      <GiSkills />
      {post?.skills.map((skill: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
          <span key={index}>{skill}{index !== post.skills.length - 1 ? ', ' : ''}</span>
      ))}
  </div>
  <div>
  • {post?.count} Applicants
  </div>
  <div>
  • {post?.daysSinceLastUpdate}
  </div>
                  </div>
              </div>
              
              <Link href={`/Jobposts/${jobid}/Applicants/Edit`}>
                  <button className='flex px-6 py-1 mt-6 rounded-full'><Image src={edit} alt='edit'/>Edit</button>
              </Link>
              </div>
              <div className='my-12 gap-4 flex'>
                <div>
                        <h1 className=' font-Inika font-bold text-2xl'>Job Description</h1>
                        <div dangerouslySetInnerHTML={{ __html: post?.description || '' }} />
                </div>
                <div>
                    {
                        post?.status === "inactive"?
                        <button onClick={activejob} className='bg-[#00D347] h-10 w-44 text-white shadow-md shadow-gray-400  px-4 py-1 rounded mb-5'>Active job post</button>
                        :
                        <button onClick={closethejob} className='bg-[#FF0000] h-10 w-44 text-white shadow-md shadow-gray-400  px-4 py-1 rounded mb-5'>Close job post</button>
                    }
                <Link href={`/Jobposts/${jobid}/Applicants`}>
                <button className='bg-[#00D347] h-10 w-44 text-white shadow-md shadow-gray-400  px-4 py-1 rounded'>View Applicants</button>
                </Link>
                </div>
                    </div>
             
          </section>
}
          <div className='flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika'>
              <Link href={'/Jobposts'}>
                  <button className='bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end'>
                      Back
                  </button>
              </Link>
          </div>
          
      </main>
          </div>
          </div>
    )
}

export default page;
