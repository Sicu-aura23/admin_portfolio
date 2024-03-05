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
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
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
    const jobid = params.slug;
    const [loading, setLoading] = useState<boolean | null>(null);
    const [post, setPost] = useState<DocumentData | null>(null);
    const [applications, setApplications] = useState<DocumentData[]>([]);
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const formDataFromLocalStorage = JSON.parse(window.localStorage.getItem("jobposts") || "[]");
            const filteredData = formDataFromLocalStorage.filter((data: { id: any; }) => data.id === jobid);
            setPost(filteredData.length > 0 ? filteredData[0] : null);

            const { data: applicationData, count: applicationCount } = await getApplications(jobid);
            setApplications(applicationData);


            setCount(applicationCount);


            setLoading(false);
        };

        fetchData();
    }, [jobid]);

    const getApplications = async (jobid: string) => {
        const q = query(collection(db, 'application'), where('jobid', '==', jobid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        const count = querySnapshot.docs.length;
        console.log(data)
        return { data, count };
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
            {
                loading ? (
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

                        <div className="flex items-center mx-[2%] mt-4">
                            <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <div className="w-[30%] h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                            <div className="w-[60%] h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="flex items-center mx-[2%] mt-4">
                            <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <div className="w-[30%] h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                            <div className="w-[60%] h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) :
                    <section className='w-[95%] h-[55vh] overflow-y-scroll px-5 my-6 border rounded-lg text-black'>

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
                                        •{count} Applicants


                                    </div>
                                    <div>
                                        • {post?.daysSinceLastUpdate}
                                    </div>
                                </div>
                            </div>

                            <Link href={`/Jobposts/${jobid}/Applicants/Edit`}>
                                <button className='flex px-6 py-1 mt-6 rounded-full'><Image src={edit} alt='edit' />Edit</button>
                            </Link>
                        </div>
                        <div className='border-b border-gray-300 flex gap-20 py-4 font-bold'><h1> {count} Applicants</h1><button className='flex shadow-md shadow-gray-500 items-center rounded text-gray-500 text-xs px-2 py-1 gap-1'><Image width={15} src={sort} alt='sort' />Sort By</button></div>
                        <div className='flex gap-3 pt-5'>
                            <div className='border  rounded w-4/12 flex flex-col gap-4'>
                                {
                                    applications && applications.map((data) => {
                                        return (

                                            <div className='flex items-center gap-5 p-5 border-l-4 border-l-blue-800 rounded-l-sm '>


                                                <img className='rounded-full border  w-[70px] h-[70px]' src={data.photo} alt='profile' />

                                                <div>
                                                    <h1>{data.firstName}<span>{" "}{data.lastName}</span></h1>
                                                    <p className='text-xs text-gray-400'>{data.email}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            {
                                applications && applications.map((data) => {
                                    return (
                                        <div className='border rounded w-8/12 p-5'>
                                            <h1 className='font-semibold'>{data.firstName}<span>{" "}{data.lastName}</span>'s Application</h1>
                                            <p className='text-xs text-gray-400'>{data.address}</p>
                                            <p className='text-xs text-gray-400'>{data.highestDegree} in <span>{data.stream}</span>, {data.institution}</p>
                                            <p className='text-xs text-gray-400'>{data.email}</p>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </section>
            }
            <div className='flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika'>
                <Link href={`/Jobposts/${jobid}`}>
                    <button className='bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end'>
                        Back
                    </button>
                </Link>
            </div>

        </main>
    )
}

export default page;
