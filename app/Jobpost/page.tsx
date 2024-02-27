
import React from 'react'
import TextEditor from './texteditor'

const page = () => {
  
  return (
    <main className={'w-[100%] flex flex-col items-center'}>
       <div className={'border-b w-[95%] space-x-20 px-10 py-2 font-Inika'}>
        <span className={'border-b-2 border-cyan-300'}>Post a Job</span>
        <span className={'border-b-2 border-cyan-300'}>Job post Details</span>
       </div>
        <form className={'w-[90%] mt-5 space-y-5'}>
           <div className='flex md:justify-between space-y-3 md:space-y-0 md:flex-row flex-col '>
            <div className=' md:space-x-10'>
            <label className='font-Inika'>Job Title</label>
           <input className='border rounded outline-none md:w-[30vw] w-[80vw] px-3' placeholder='Add the title you are hiring for'/>
            </div>
            <div  className=' md:space-x-10'>
           <label className='font-Inika'>Location</label>
           <select className='border md:w-[20vw] w-[80vw] rounded' name="Location" id="Location">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>

            </div>
           </div>
           <div className='flex flex-wrap md:gap-5 gap-0 gap-y-5'>
              <label className='w-[85px] bg-gray-100'>Type</label>
            <div className='flex gap-10 '>
              <span className='flex gap-2'>
              <input type="radio" name='type'   value='Job' />
              <label>Job</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='type' checked value='Internship' />
              <label>Internship</label>

              </span>
            </div>
            <div></div>
            <div></div>
            <div></div>
            
            <div className='flex md:gap-5 gap-0 gap-y-5 flex-wrap '>
              <label className='w-[85px] '> Job Type</label>
              <select className='border sm:w-[15vw] w-[80vw] rounded' name="Location" id="Location">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>    
            </div>
            <div></div>
            <div></div>
            <div></div>
  <div className='flex md:gap-5 gap-0 gap-y-5 flex-wrap'>

              <label className='w-[85px] '>Duration</label>
              <div className='flex gap-10 lg:w-auto'>
              <span className='flex gap-2'>
              <input type="radio" name='Duration'   value='Part Time' />
              <label>Part Time</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='Duration' checked value='Full Time' />
              <label>Full Time</label>

              </span>
            </div>
  </div>
           </div>
           <div className='flex flex-wrap gap-5'>
              <label className='w-[85px] bg-gray-100'>Payroll</label>
            <div className='flex gap-10 '>
              <span className='flex gap-2'>
              <input type="radio" name='Payroll'   value='Paid' />
              <label>Paid</label>
              </span>
              <span className='flex gap-3'>
              <input type="radio" name='Payroll' checked value='Non-Paid' />
              <label>Non-Paid</label>

              </span>
            </div>
            <div></div>
            <div></div>
            <div></div>
  <div className='flex  gap-5'>

              <label className='w-[85px] '>Skills</label>
              <div className='flex flex-wrap gap-10 lg:w-auto'>
              <span className=' border rounded'>
                <input className=' sm:w-[7vw] w-[20vw]  bg-transparent' placeholder='Add Skill'/>
                x
              </span>
              <span className=' border rounded'>
                <input className=' sm:w-[7vw] w-[20vw]  bg-transparent' placeholder='Add Skill'/>
                x
              </span>
              <span className=' border rounded'>
                <input className=' sm:w-[7vw] w-[20vw]  bg-transparent' placeholder='Add Skill'/>
                x
              </span>
              <span className=' border rounded'>
                <input className=' sm:w-[7vw] w-[20vw]  bg-transparent' placeholder='Add Skill'/>
                x
              </span>
              <span className=' border rounded'>
                <input className=' sm:w-[7vw] w-[20vw]  bg-transparent' placeholder='Add Skill'/>
                x
              </span>
              
          
            </div>
  </div>
           </div>
           <div className='flex gap-16 '>
            <label>Email</label>
            <input type="text" className='border rounded md:w-[30vw] w-[80vw] px-3 outline-none' placeholder='Write here Email ID' />
           </div>
           <div className='flex gap-5'>
            <label>Description</label>
            {/* <textarea name="Description"placeholder='Type job description' >  </textarea> */}
            <TextEditor  />
           </div>
        </form>
    </main>
  )
}

export default page