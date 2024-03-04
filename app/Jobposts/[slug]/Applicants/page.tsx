"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import edit from '@/public/edit.png'
import sort from '@/public/sort.png'
import profile from '@/public/Ellipse 71.png'
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
import { usePathname } from 'next/navigation';
import { DocumentData, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '@/app/firebase.config';

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
    // Add other keys as needed
}

const page: React.FC<{ loading: boolean; params: any }> = ({ params }) => {
    const jobid = params.slug
    const [loading, setLoading] = useState<boolean | null>(null);
    const [post, setPost] = useState<DocumentData | null>(null);

    useEffect(() => {
        const formDataFromLocalStorage = JSON.parse(window.localStorage.getItem("jobposts") || "[]");
        const filteredData = formDataFromLocalStorage.filter((data: { id: any; }) => data.id === jobid);
        setPost(filteredData.length > 0 ? filteredData[0] : null);
    }, []);



    const postjob = async () => {
        try {
            setLoading(true)
            const docRef = await addDoc(collection(db, 'JobList'), post);
            console.log('Document added with ID:', docRef.id);
            setLoading(false)

        } catch (error) {
            console.error('Error adding document:', error);
        }
    };
    const pathname = usePathname()
    return (
        <main className={'grid place-items-center items-center'}>
            <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
                <Link href={'/'} className='flex flex-col justify-center items-center'>
                    <span className={pathname === '/' ? ' text-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'text-[#0DF5E3]' : ""}>Post a Job</span>
                    <span className={pathname === '/' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : "bg-[#ffff]"}></span>
                </Link>
                <Link href={'/Jobposts'} className='flex flex-col justify-center items-center'>
                    <span className={pathname === '/Jobposts' ? ' text-[#0DF5E3]' : pathname === `/Jobposts/${jobid}/Applicants` ? 'text-[#0DF5E3]' : ""}>Job-post Details</span>
                    <span className={pathname === '/Jobposts' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : pathname === `/Jobposts/${jobid}/Applicants` ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : 'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
                </Link>

            </div>
            <section className='w-[95%] h-[55vh] overflow-y-scroll px-5 my-6 border rounded-lg text-black'>

                <div className='flex border-b border-gray-300 justify-between '>
                    <div className='flex flex-col items-start justify-evenly  my-5'>
                        <h1 className='font-Inknut font-bold text-2xl '>{post?.jobtitle} <span className='text-xs mx-6 text-[#00D347] uppercase'>• {post?.status}</span></h1>
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
                                ● 100 Applicants
                            </div>
                            <div>
                                ● {post?.daysSinceLastUpdate}
                            </div>
                        </div>
                    </div>

                    <Link href={`/`}>
                        <button className='flex px-6 py-1 mt-6 rounded-full'><Image src={edit} alt='edit' />Edit</button>
                    </Link>
                </div>
                 <div className='border-b border-gray-300 flex gap-20 py-4 font-bold'><h1>100 Applicants</h1><button className='flex shadow-md shadow-gray-500 items-center rounded text-gray-500 text-xs px-2 py-1 gap-1'><Image width={15} src={sort} alt='sort'/>Sort By</button></div>
                <div className='flex gap-3 pt-5'>
                    <div className='border rounded w-3/12 flex flex-col gap-4'>
                        <div className='flex items-center gap-2 p-5 border-l-4 border-l-blue-800 border-b rounded'>
                            <Image src={profile} alt='profile'/>
                            <div>
                            <h1>Alex Flaming</h1>
                            <p className='text-xs text-gray-400'>Alexflamingemail.com</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 p-5 border-b'>
                            <Image src={profile} alt='profile'/>
                            <div>
                            <h1>Alex Flaming</h1>
                            <p className='text-xs text-gray-400'>Alexflamingemail.com</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 p-5 border-b'>
                            <Image src={profile} alt='profile'/>
                            <div>
                            <h1 className='font-semibold'>Alex Flaming</h1>
                            <p className='text-xs text-gray-400'>Alexflamingemail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded w-9/12 p-5'>
                        <h1 className='font-semibold'>Alex Flaming's Application</h1>
                        <p className='text-xs text-gray-400'>Kolkata,West Begal,indai</p>
                        <p className='text-xs text-gray-400'>B.Tech in Computer Science, ABCD College of Engineering</p>
                        <p className='text-xs text-gray-400'>alexflaming456@gmail.com</p>
                    </div>
                </div>
            </section>
            <div className='flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika'>
                <Link href={'/Jobposts'}>
                    <button className='bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end'>
                        Back
                    </button>
                </Link>
            </div>

        </main>
    )
}

export default page;
