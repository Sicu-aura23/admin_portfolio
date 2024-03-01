"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
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

interface FormData {
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

const Viewjobpost: React.FC<{loading:boolean}> = () => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        const formDataFromLocalStorage = JSON.parse(window.localStorage.getItem("formdata") || "{}") as FormData;
        setFormData(formDataFromLocalStorage);
        console.log(formDataFromLocalStorage)
    }, []);
    const postjob = () => {
        setLoading(true)

        // console.log("posted")
        // window.localStorage.removeItem("formdata")
        // setLoading(false)
    }
    return (
        <main className={'w-[100%]  grid place-items-center items-center'}>
            <div className={'border-b w-[95%] space-x-20 px-0 py-2 font-Inika'}>
                <span className={'border-b-2 border-cyan-300'}>Post a Job</span>
                <span className={'border-b-2 border-cyan-300'}>Job post Details</span>
            </div>
            <section className='w-[95%] h-11/12 overflow-y-scroll my-6 border rounded-lg text-black'>
                <div className='flex flex-col items-start justify-evenly mx-6 my-12'>
                    <h1 className='font-Inknut font-bold text-2xl'>{formData?.jobtitle}</h1>
                    <div className='flex flex-row flex-wrap gap-8 h-auto w-full my-8 z-0'>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'><CiLocationOn />{formData?.location} </div>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'><FaMoneyBill />{formData?.type} </div>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'><FaDesktop />{formData?.jobtype} </div>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'><CiClock2 />{formData?.duration} </div>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'><FaIndianRupeeSign />{formData?.payroll} </div>
                        <div className='flex flex-row items-center justify-evenly gap-2 font-Inknut font-normal text-sm text-gray-700'>
        <GiSkills />
        {formData?.skills.map((skill, index) => (
            <span key={index}>{skill}{index !== formData.skills.length - 1 ? ', ' : ''}</span>
        ))}
    </div>
                    </div>
                    <div className='my-12 gap-4 flex flex-col'>
                        <h1 className=' font-Inika font-bold text-2xl'>Job Description</h1>
                        <div dangerouslySetInnerHTML={{ __html: formData?.description || '' }} />
                    </div>
                </div>
            </section>
            <div className='flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika'>
                <Link href={'/'}>
                    <button className='bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end'>
                        Back
                    </button>
                </Link>
                <button onClick={postjob} className='bg-[#201A31] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#A0A0A0] float-end'>
                    Post
                </button>
            </div>
            {loading && (
                <motion.div
                    className='w-[30%] bg-white rounded-xl h-[20vh] absolute flex flex-col justify-center items-center' style={{ boxShadow: "1px 1px 30px lightgray" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <Image src={check} width={50} alt="tic" />
                    <h1 className='font-Inika'>Job has been posted Successfully</h1>
                </motion.div>
            )}
        </main>
    )
}

export default Viewjobpost;
