"use client"
import React, { useEffect, useState } from 'react';
// import { EditorContentChanged } from '../Jobpost/texteditor'
import dynamic from "next/dynamic";

const TextEditor = dynamic(
  () => {
    return import("../Jobpost/texteditor");
  },
  { ssr: false }
)
// const EditorContentChanged = dynamic(
//   () => {
//     return import("../Jobpost/texteditor");
//   },
//   { ssr: false }
// )

import vector from '@/public/Vector2.png'
import vector1 from '@/public/Vector1.png'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../Navbar';
import { Sidebar } from '../Sidebar';

// export interface EditorProps {
//   value?: string;
//   onChange?: (changes: EditorContentChanged) => void;
// }
const Jobpost = () => {
  const [skills, setSkills] = useState<string[]>(['']);
  const [editorValue, setEditorValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>('Job');

  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/');
    }

  }, []);
  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const [formData, setFormData] = useState(
    {
      jobtitle: '',
      location: 'Kolkata, West Bengal, India',
      type: 'Internship',
      jobtype: 'Remote',
      duration: 'Full Time',
      payroll: 'Non-Paid',
      skills: [],
      email: '',
      description: '',
      status: 'Active',
      lookingfor: '',
    }
  );

  const handleInputChange = (event: { target: { value?: any; name?: any; }; }) => {
    const { name, value } = event.target;

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (html: string) => {
    setEditorValue(html);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      skills: skills,
      description: editorValue,
    };

    window.localStorage.setItem("formdata", JSON.stringify(updatedFormData))
    // setFormData({
    //   jobtitle: '',
    //   location: '',
    //   type: '',
    //   jobtype: '',
    //   duration: '',
    //   payroll: '',
    //   skills: [],
    //   email: '',
    //   description: '',
    // });
    router.push(`/Previewjobpost`);
  };
  const pathname = usePathname()

  return (
   
      <div className='flex'>
        <Sidebar />
        <main className={'flex flex-col items-center w-[100%]'}>
        <Navbar />
          <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
            <Link href={'/Postjob'} className='flex flex-col justify-center items-center'>
              <span className={pathname === '/Postjob' ? ' text-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'text-[#0DF5E3]' : ""}>Post a Job</span>
              <span className={pathname === '/Postjob' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : pathname === '/Previewjobpost' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : "bg-[#ffff]"}></span>
            </Link>
            <Link href={'/Jobposts'} className='flex flex-col justify-center items-center'>
              <span className={pathname === '/Jobposts' ? ' text-[#0DF5E3]' : ''}>Job-post Details</span>
              <span className={pathname === '/Jobposts' ? 'p-[1.5px] w-[40px] bg-[#0DF5E3]' : 'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
            </Link>
          </div>
          <form className={'w-[95%] relative mt-5 flex flex-col gap-3'} onSubmit={handleSubmit}>
            <div className='flex justify-between items-center space-y-3 flex-row   '>
              <div className=' space-x-12'>
                <label className='font-Inika'>Job Title</label>
                <input className='border rounded outline-none md:w-[30vw] w-[85vw] px-3' name='jobtitle' onChange={handleInputChange} placeholder='Add the title you are hiring for' />
              </div>
              <div className=' space-x-10'>
                <label className='font-Inika'>Location</label>
                <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded' name="location" id="Location" onChange={handleInputChange}>
                  <option value="" selected disabled hidden >Select</option>
                  <option value="Kolkata, West Bengal, India">Kolkata, West Bengal, India</option>
                  <option value="India">India</option>

                </select>

              </div>
            </div>
            <div className='flex gap-[80px]'>
              <label className=''>Type</label>
              <div className='flex flex-wrap items-center w-[100%] justify-between gap-y-5'>
                <div className='flex gap-12 '>
                  <span className='flex gap-2'>
                    <input type="radio" name='type' defaultChecked  value='Job'
                      onChange={handleInputChange} />
                    <label className=''>Job</label>
                  </span>
                  <span className='flex gap-3'>
                    <input type="radio" name='type' value='Internship'
                      onChange={handleInputChange} />
                    <label>Internship</label>

                  </span>
                </div>


                <div className='flex justify-between gap-y-5 flex-wrap '>
                  <label className='w-[100px]'> Job Type</label>
                  <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded' onChange={handleInputChange} name="jobtype" id="Job Type">
                    <option value="" selected disabled hidden  >Select</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className='flex items-center md:gap-5 gap-0 gap-y-5 flex-wrap'>

                  <label className='w-[100px] '>Duration</label>
                  <div className='flex gap-10 lg:w-auto'>
                    <span className='flex gap-2'>
                      <input type="radio" name='duration' onChange={handleInputChange} defaultChecked  value='Part Time' />
                      <label>Part Time</label>
                    </span>
                    <span className='flex gap-3'>
                      <input type="radio" name='duration' onChange={handleInputChange} value='Full Time' />
                      <label>Full Time</label>

                    </span>
                  </div>
                </div>
              </div>

            </div>
            <div className='flex gap-[61px]'>
              <label className=''>Payroll</label>
              <div className='flex items-start w-[100%]  justify-between gap-y-5 '>

                <div className='flex gap-10'>
                  <span className='flex gap-2'>
                    <input type="radio" name='payroll' onChange={handleInputChange} defaultChecked value='Paid' />
                    <label>Paid</label>
                  </span>
                  <span className='flex gap-3'>
                    <input type="radio" name='payroll' onChange={handleInputChange}  value='Non-Paid' />
                    <label>Non-Paid</label>

                  </span>
                </div>
                <div className='flex justify-end '>
                  <label className='w-[100px]'>Skills</label>
                  <div className='flex flex-wrap gap-5 w-[53.3vw]'>
                    {skills.map((skill, index) => (
                      <span key={index} className=' h-[30px]  border rounded px-2 flex items-center border-gray-400'>
                        <input
                          className=' sm:w-[7vw] w-[20vw] h-[30px] outline-none text-[#404040] bg-transparent'
                          name={`skill_${index}`}
                          onChange={(event) => handleSkillChange(index, event.target.value)}
                          value={skill}
                          placeholder='Add Skill'
                        />
                        
                        <Image width={12} onClick={() => removeSkill(index)} src={vector} alt='x' />
                      </span>
                    ))}
                    <span onClick={addSkill} className=' border sm:w-[9vw] h-[30px] w-[20vw] text-sm text-[#A0A0A0] rounded px-2 flex justify-between items-center'>
                      Add Skills<Image width={15} src={vector1} alt='+' />
                    </span>
                  </div>
                </div>
              </div>

            </div>
            <div className='flex md:flex-row flex-col '>
              <label className='w-[125px]'>Email</label>
              <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='email' placeholder='Write here Email ID' onChange={handleInputChange} />
            </div>
            <div className='flex md:flex-row flex-col  '>
              <label className='w-[125px] '>Looking for</label>
              <textarea className='border text-[13px] pt-2 rounded md:w-[30vw] w-[85vw] h-auto px-3 outline-none' name='lookingfor' placeholder='Write what you looking for' onChange={handleInputChange} />
            </div>
            <div className='flex md:flex-row flex-col '>
              <label className='w-[139px]'>Description</label>

              <TextEditor value={editorValue} onChange={handleChange} />
            </div>
            <div>

            </div>
            <button className='bg-[#201A31] w-[120px] self-end  rounded  px-[2vw] py-[1vh] text-[#A0A0A0]'>
              Preview
            </button>
          </form>
        </main>

      </div>

  
  )
}

export default Jobpost