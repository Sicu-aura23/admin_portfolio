"use client"
import React, { useEffect, useState } from 'react';
import TextEditor, { EditorContentChanged } from '../../../../Jobpost/texteditor'
import vector from '@/public/vector x.png'
import vector1 from '@/public/vector +.png'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DocumentData, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import { motion } from "framer-motion";
import check from '@/public/Checkmark.png';

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const edit: React.FC<{ params: any }> = ({params}) => {
    const jobid = params.slug
    console.log(jobid)
  const [skills, setSkills] = useState<string[]>(['']);
  const [editorValue, setEditorValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>('Job');
  const [loading, setLoading] = useState<boolean | null>();
  const [open, setopen] = useState<boolean | null>();

  useEffect(() => {
    const formDataFromLocalStorage = JSON.parse(window.localStorage.getItem("jobposts") || "[]");
    const filteredData = formDataFromLocalStorage.filter((data: { id: any; }) => data.id === jobid);
    // setSkills(filteredData.length > 0 ? filteredData[0].Skills : null);
    setSkills(filteredData[0].skills)
    setEditorValue(filteredData[0].description)
    setFormData(filteredData.length > 0 ? filteredData[0] : null);
}, []);

  const router = useRouter();
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

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return {
        jobtitle: '',
        location: 'Kolkata, West Bengal, India',
        type: 'Internship',
        jobtype: 'Remote',
        duration: 'Full Time',
        payroll: 'Non-Paid',
        skills: [],
        email: '',
        description: '',
        status:'Active',
        lookingfor:'',
      };
    }
  });

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


  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const updatedFormData = {
          ...formData,
          skills: skills,
          description: editorValue,
          timestamp: serverTimestamp()
      };
  
      try {
          setLoading(true);
          const docRef = doc(db, 'JobList', jobid); // 'jobid' is the ID of the document you want to update
          await updateDoc(docRef, updatedFormData);
          console.log('Document updated successfully');
          setLoading(false);
          router.push(`/Jobposts`);
      } catch (error) {
          console.error('Error updating document:', error);
          setLoading(false);
          setopen(true)
      }
  
      setFormData({
          jobtitle: '',
          location: '',
          type: '',
          jobtype: '',
          duration: '',
          payroll: '',
          skills: [],
          email: '',
          description: '',
          lookingfor:'',
      });
  };
  
  const pathname = usePathname()

  return (
    <main className={'grid place-items-center items-center'}>
          <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
        <Link href={'/'} className='flex flex-col justify-center items-center'>
        <span className={pathname==='/'?' text-[#0DF5E3]':pathname==='/Previewjobpost'?'text-[#0DF5E3]':""}>Post a Job</span>
        <span className={pathname==='/'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':pathname==='/Previewjobpost'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':"bg-[#ffff]"}></span>
        </Link>
        <Link href={'/Jobposts'} className='flex flex-col justify-center items-center'>
        <span className={pathname==='/Jobposts'?' text-[#0DF5E3]':''}>Job-post Details</span>
        <span  className={pathname==='/Jobposts'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
        </Link>
       </div>
        <form className={'w-[95%] relative mt-5 flex flex-col gap-3'}  onSubmit={handleSubmit}>
           <div className='flex md:justify-between space-y-3 md:space-y-0 md:flex-row flex-col '>
            <div className=' md:space-x-12'>
            <label className='font-Inika '>Job Title</label>
           <input className='border rounded outline-none md:w-[30vw] w-[85vw] px-3' name='jobtitle'  value={formData.jobtitle}  onChange={handleInputChange} placeholder='Add the title you are hiring for' />
            </div>
            <div  className=' md:space-x-10'>
           <label className='font-Inika'>Location</label>
           <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded'  value={formData?.location}  name="location" id="Location" onChange={handleInputChange}>
           <option value=""  selected disabled hidden >Kolkata, West Bengal, India</option>
    <option value="Kolkata, West Bengal, India">Kolkata, West Bengal, India</option>
    <option value="India">India</option>
    {/* <option value="opel">Opel</option>
    <option value="audi">Audi</option> */}
  </select>

            </div>
           </div>
           <div className='flex gap-20'>
              <label className=''>Type</label>
           <div className='flex flex-wrap items-center w-[100%] justify-between gap-y-5'>
            <div className='flex gap-12 '>
              <span className='flex gap-2'>
              <input type="radio" name='type'value='Job' 
          onChange={handleInputChange} />
              <label className=''>Job</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='type' defaultChecked value='Internship' 
          onChange={handleInputChange} />
              <label>Internship</label>

              </span>
            </div>
          
            
            <div className='flex justify-between gap-y-5 flex-wrap '>
              <label className='w-[100px]'> Job Type</label>
              <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded'  value={formData?.jobtype}  onChange={handleInputChange} name="jobtype" id="Job Type">
           <option selected disabled hidden >Select</option>
    <option value="On-site">On-site</option>
    <option value="Remote">Remote</option>
  </select>  
            </div>
         
  <div className='flex items-center md:gap-5 gap-0 gap-y-5 flex-wrap'>

              <label className='w-[100px] '>Duration</label>
              <div className='flex gap-10 lg:w-auto'>
              <span className='flex gap-2'>
              <input type="radio" name='duration' onChange={handleInputChange}  value='Part Time' />
              <label>Part Time</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='duration' onChange={handleInputChange} defaultChecked value='Full Time' />
              <label>Full Time</label>

              </span>
            </div>
  </div>
           </div>

           </div>
           <div className='flex gap-[60px]'>
              <label className=''>Payroll</label>
           <div className='flex items-start w-[100%]  justify-between gap-y-5 '>
              
            <div className='flex gap-10'>
              <span className='flex gap-2'>
              <input type="radio" name='payroll' onChange={handleInputChange}  value='Paid' />
              <label>Paid</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='payroll'onChange={handleInputChange} defaultChecked value='Non-Paid' />
              <label>Non-Paid</label>

              </span>
            </div>
            <div className='flex'>
          <label className='w-[100px]  '>Skills</label>
          <div className='flex flex-wrap gap-5 w-[53vw]'>
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
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[100px] '>Email</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none'  value={formData?.email}   name='email' placeholder='Write here Email ID' onChange={handleInputChange} />
           </div>
           <div className='flex md:flex-row flex-col gap-3 '>
            <label  className='w-[110px] '>Looking for</label>
            <textarea  className='border text-[13px] pt-2 rounded md:w-[30vw] w-[85vw] h-auto px-3 outline-none'  value={formData?.lookingfor}   name='lookingfor' placeholder='Write what you looking for' onChange={handleInputChange} />
           </div>
           <div className='flex md:flex-row flex-col gap-5'>
            <label className=''>Description</label>
            {/* <textarea name="Description"placeholder='Type job description' >  </textarea> */}
            <TextEditor  value={editorValue}  onChange={handleChange} />
           </div>
           <div>
   
           </div>
           <button className='bg-[#201A31] absolute -bottom-10 right-0 rounded h-10  px-[2vw] py-[1vh] shadow-md shadow-gray-400 text-[#A0A0A0]'>
            {

              loading? (
                
                <div role="status">
                <svg aria-hidden="true" className="w-8 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#A0A0A0]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
          </div>
                ):"Update"
            }
            
          
           </button>
           <Link href={`/Jobposts/${jobid}/Applicants`}>
           <button className='text-[#201A31] absolute -bottom-10 right-32 rounded h-10  px-[2vw] py-[1vh] bg-[#FEFEFE] shadow-md shadow-gray-400'>Back</button>
           
           </Link>
   
        </form>
           {open && (
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

export default edit