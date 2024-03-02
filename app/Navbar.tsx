import Image from 'next/image'
import React from 'react'
import logo from '@/public/Logo.svg'
import bell from '@/public/bell.png'

const Navbar = () => {
  return (
    <div className={'min-w-[100%] h-[70px] ps-5 pe-20 flex justify-between items-center text-white bg-[#031B32]'}>
 

    <Image src={logo} alt='sicu-aura'/>
  
      <div className='flex gap-5'>
      <Image src={bell} alt='notify'/>
      <button className='bg-[#87C4FF] py-1 px-5 rounded-lg text-black'>Logout</button>
      </div>

    </div>
  )
}

export default Navbar