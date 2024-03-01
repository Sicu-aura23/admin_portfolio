"use client"
import React, { useState } from 'react';
import TextEditor, { EditorContentChanged } from './Jobpost/texteditor'
import vector from '@/public/vector x.png'
import vector1 from '@/public/vector +.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}
const Jobpost = () => {
  const [skills, setSkills] = useState<string[]>(['']);
  const [editorValue, setEditorValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>('Job');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      skills: skills,
      description: editorValue,
    };
  
    console.log(updatedFormData);
    window.localStorage.setItem("formdata",JSON.stringify(updatedFormData))
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
    });
    router.push(`/Viewjobpost`);
  };


  return (
    <main className={'w-[100%] flex flex-col items-center'}>
       <div className={'border-b w-[95%] space-x-10 px-0 py-2 font-Inika'}>
        <span className={'border-b-2 border-cyan-300'}>Post a Job</span>
        <span className={'border-b-2 border-cyan-300'}>Job post Details</span>
       </div>
        <form className={'w-[95%] mt-5 space-y-5'}  onSubmit={handleSubmit}>
           <div className='flex md:justify-between space-y-3 md:space-y-0 md:flex-row flex-col '>
            <div className=' md:space-x-10'>
            <label className='font-Inika '>Job Title</label>
           <input className='border rounded outline-none md:w-[30vw] w-[85vw] px-3' name='jobtitle'   onChange={handleInputChange} placeholder='Add the title you are hiring for' />
            </div>
            <div  className=' md:space-x-10'>
           <label className='font-Inika'>Location</label>
           <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded' name="location" id="Location" onChange={handleInputChange}>
           <option value=""  selected disabled hidden >Kolkata, West Bengal, India</option>
    <option value="Kolkata, West Bengal, India">Kolkata, West Bengal, India</option>
    <option value="India">India</option>
    {/* <option value="opel">Opel</option>
    <option value="audi">Audi</option> */}
  </select>

            </div>
           </div>
           <div className='flex flex-wrap items-center md:gap-5 gap-0 gap-y-5'>
              <label className='w-[100px] bg-gra-500'>Type</label>
            <div className='flex gap-10 '>
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
            <div></div>
            <div></div>
            <div></div>
            
            <div className='flex md:gap-5 gap-0 gap-y-5 flex-wrap '>
              <label className='w-[100px] '> Job Type</label>
              <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded' onChange={handleInputChange} name="jobtype" id="Job Type">
           <option selected disabled hidden >Select</option>
    <option value="On-site">On-site</option>
    <option value="Remote">Remote</option>
  </select>  
            </div>
            <div></div>
            <div></div>
            <div></div>
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
           <div className='flex items-start md:gap-5 gap-0 gap-y-5 '>
              <label className='w-[100px] '>Payroll</label>
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
            <div></div>
            <div></div>
            <div></div>
            <div className='flex gap-5'>
          <label className='w-[100px] '>Skills</label>
          <div className='flex flex-wrap md:gap-5 gap-10 z-20   w-[55vw]'>
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
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[100px] '>Email</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='email' placeholder='Write here Email ID' onChange={handleInputChange} />
           </div>
           <div className='flex md:flex-row flex-col gap-5'>
            <label className=''>Description</label>
            {/* <textarea name="Description"placeholder='Type job description' >  </textarea> */}
            <TextEditor value={editorValue} onChange={handleChange} />
           </div>
           <div>
   
           </div>
           <div >{editorValue}</div>
           <button className='bg-[#201A31] rounded px-[2vw] py-[1vh] text-[#A0A0A0] float-end'>
            Preview
           </button>
        </form>
    </main>
  )
}

export default Jobpost