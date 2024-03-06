"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

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
import { usePathname } from 'next/navigation';
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';

 // Add other keys as needed

const Viewjobpost: React.FC<{ loading: boolean }> = () => {
    const [post, setPost] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const q = query(collection(db, 'JobList'));
            const querySnapshot = await getDocs(q);
            const postsData = [];
    
            for (const doc of querySnapshot.docs) {
                const data = doc.data();
                let count = 0;
    
                if (data.id !== undefined) {
                    const q = query(collection(db, 'application'), where('jobid', '==', data.id));
                    const querySnapshot = await getDocs(q);
                    count = querySnapshot.size;
                }
    
                const lastUpdate = doc.data().timestamp.toDate();
                const currentDate = new Date();

                const diffInMs = currentDate.getTime() - lastUpdate.getTime();
                const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

                let daysSinceLastUpdate: string;
                if (days > 0) {
                    daysSinceLastUpdate = `${days} day${days > 1 ? 's' : ''} ago`;
                } else if (hours > 0) {
                    daysSinceLastUpdate = `${hours} hour${hours > 1 ? 's' : ''} ago`;
                } else {
                    daysSinceLastUpdate = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                }
                const post = {
                    ...data,
                    id: doc.id,
                    count,
                    daysSinceLastUpdate

                };
                
                postsData.push(post);
            }
            
            setPost(postsData);
            window.localStorage.setItem("jobposts", JSON.stringify(postsData));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching documents: ', error);
            setLoading(false);
        }
    };
    



    // const fetchJobPost = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, 'JobList'));
    //         const documentsData = querySnapshot.docs.map(doc => doc.data());
    //         setPost(documentsData);
    //     } catch (error) {
    //         console.error('Error getting documents:', error);
    //     }
    // };
    const pathname = usePathname()
    return (
      
        <div>
            
        <main className={'grid place-items-center items-center'}>
            
            <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
                <Link href={'/'} className='flex flex-col justify-center items-center'>
                    <span className={pathname === '/' ? ' text-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'text-[#0DF5E3]' : ""}>Post a Job</span>
                    <span className={pathname === '/' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : "bg-[#ffff]"}></span>
                </Link>
                <Link href={'/Jobposts'} className='flex flex-col justify-center items-center'>
                    <span className={pathname === '/Jobposts' ? ' text-[#0DF5E3]' : ''}>Job-post Details</span>
                    <span className={pathname === '/Jobposts' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : 'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
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
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>


                        <span className="sr-only">Loading...</span>
                    </div>
                ) :
                    <section className='w-[95%] h-[55vh] overflow-y-scroll px-10 my-6 border rounded-lg text-black'>

                        {
                            post && post.map((post: {
                                jobtitle: ReactNode;
                                location: ReactNode;
                                type: ReactNode;
                                jobtype: ReactNode;
                                duration: ReactNode;
                                payroll: ReactNode;
                                daysSinceLastUpdate: ReactNode;
                                status: ReactNode;
                                count: ReactNode;
                                skills: any;
                                id: string;
                            }) => {
                                return (


                                    <Link href='/Jobposts/[slug]' as={`/Jobposts/${post.id}`}>
                                        <div className='flex border-b border-gray-300 items-center justify-between '>
                                            <div className='flex flex-col items-start justify-evenly  my-5'>
                                                <h1 className='font-Inknut font-bold text-2xl'>{post?.jobtitle}</h1>
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
                                                        • {post.count} Applicants
                                                    </div>
                                                    <div>
                                                        • {post?.daysSinceLastUpdate}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button className={post?.status === "inactive"?'bg-[#FF0000] text-white px-6 py-2 rounded-full uppercase':'bg-[#00D347] text-white px-6 py-2 rounded-full uppercase'}>{post?.status}</button>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            })
                        }
                    </section>

            }
            <div className='flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika'>
                <Link href={'/'}>
                    <button className='bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end'>
                        Back
                    </button>
                </Link>
            </div>
            
        </main>

        </div>
    )
}

export default Viewjobpost;
