import React from 'react'
import TextEditor from './texteditor'
import vector from '@/public/vector x.png'
import vector1 from '@/public/vector +.png'
import Image from 'next/image'

const page = () => {
  
  return (
    <main className={'w-[100%] flex flex-col items-center'}>
       <div className={'border-b w-[95%] space-x-20 px-10 py-2 font-Inika'}>
        <span className={'border-b-2 border-cyan-300'}>Post a Job</span>
        <span className={'border-b-2 border-cyan-300'}>Job post Details</span>
       </div>
        <form className={'w-[90%] mt-5 space-y-5'}>
           <div className='flex md:justify-between space-y-3 md:space-y-0 md:flex-row flex-col '>
            <div className=' md:space-x-8'>
            <label className='font-Inika'>Job Title</label>
           <input className='border rounded outline-none md:w-[30vw] w-[85vw] px-3' placeholder='Add the title you are hiring for'/>
            </div>
            <div  className=' md:space-x-10'>
           <label className='font-Inika'>Location</label>
           <select className='border outline-none text-[#404040] md:w-[20vw] w-[85vw] rounded' name="Location" id="Location">
           <option value="" selected disabled hidden >Select</option>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>

            </div>
           </div>
           <div className='flex flex-wrap items-center md:gap-5 gap-0 gap-y-5'>
              <label className='w-[85px] bg-gray-100'>Type</label>
            <div className='flex gap-10 '>
              <span className='flex gap-2'>
              <input type="radio" name='type'value='Job' />
              <label className=''>Job</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='type' defaultChecked value='Internship' />
              <label>Internship</label>

              </span>
            </div>
            <div></div>
            <div></div>
            <div></div>
            
            <div className='flex md:gap-5 gap-0 gap-y-5 flex-wrap '>
              <label className='w-[85px] '> Job Type</label>
              <select className='border sm:w-[15vw] w-[85vw] rounded' name="Location" id="Location">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>    
            </div>
            <div></div>
            <div></div>
            <div></div>
  <div className='flex items-center md:gap-5 gap-0 gap-y-5 flex-wrap'>

              <label className='w-[85px] '>Duration</label>
              <div className='flex gap-10 lg:w-auto'>
              <span className='flex gap-2'>
              <input type="radio" name='Duration'   value='Part Time' />
              <label>Part Time</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='Duration' defaultChecked value='Full Time' />
              <label>Full Time</label>

              </span>
            </div>
  </div>
           </div>
           <div className='flex items-center md:gap-5 gap-0 gap-y-5 flex-wrap'>
              <label className='w-[85px] bg-gray-100'>Payroll</label>
            <div className='flex gap-10 '>
              <span className='flex gap-2'>
              <input type="radio" name='Payroll'   value='Paid' />
              <label>Paid</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='Payroll' defaultChecked value='Non-Paid' />
              <label>Non-Paid</label>

              </span>
            </div>
            <div></div>
            <div></div>
            <div></div>
  <div className='flex  gap-5'>

              <label className='w-[85px] '>Skills</label>
              <div className='flex flex-wrap md:gap-10 gap-10 lg:w-auto'>
          
              <span className=' border rounded px-2 flex items-center border-gray-400'>
                <input className=' sm:w-[7vw] w-[20vw] outline-none text-[#404040]   bg-transparent' value={"React.js"} placeholder='Add Skill'/>
                <Image width={12} src={vector} alt='x'></Image>
              </span>
              <span className=' border rounded px-2 flex items-center border-gray-400'>
                <input className=' sm:w-[7vw] w-[20vw] outline-none text-[#404040] bg-transparent'  value={"Python"} placeholder='Add Skill'/>
                <Image width={12} src={vector} alt='x'></Image>
              </span>
              <span className=' border rounded px-2 flex items-center'>
                <input className=' sm:w-[7vw] w-[20vw] outline-none  bg-transparent' placeholder='Add Skill'/>
                <Image width={13} src={vector1} alt='x'></Image>
              </span>
              <span className=' border rounded px-2 flex items-center'>
                <input className=' sm:w-[7vw] w-[20vw] outline-none  bg-transparent' placeholder='Add Skill'/>
                <Image width={13} src={vector1} alt='x'></Image>
              </span>
              
           
          
              
          
            </div>
  </div>
           </div>
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[85px] '>Email</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' placeholder='Write here Email ID' />
           </div>
           <div className='flex md:flex-row flex-col gap-1'>
            <label>Description</label>
            {/* <textarea name="Description"placeholder='Type job description' >  </textarea> */}
            <TextEditor  />
           </div>
           <button className='bg-[#201A31] rounded px-[2vw] py-[1vh] text-[#A0A0A0] float-end'>
            Preview
           </button>
        </form>
    </main>
  )
}

export default page