
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '@/public/Logo.svg'
import logoInnoviz from '@/public/Innoviz Logo.png'
import Link from 'next/link'
const page = () => {
  return (
    <div className='h-screen bg-gradient-to-r from-red-500 to-blue-500 grid place-items-center'>
      <div className='flex justify-around w-[50%]'>
        <Link href={'/Postjob'} className='bg-[#ffffff44] rounded-md p-[10%] cursor-pointer hover:scale-105 transition-All ease-in-out duration-300 shadow-2xl'>
       
          <Image src={logo} className='s scale-125' alt='sicu-aura'></Image>
        

        </Link>
        <Link href={'/Innoviz-blogs'} className='bg-[#ffffff44] rounded-md p-[10%] cursor-pointer hover:scale-105 transition-All ease-in-out duration-300 shadow-2xl'>

          <Image src={logoInnoviz} alt='sicu-aura'></Image>
         
        </Link>
      </div>
    </div>
  )
}

export default page;
