"use client"
import Image from 'next/image'
import React from 'react'
import job from '@/public/Job Seeker.png'
import jobcolor from '@/public/Job Seeker1.png'
import video from '@/public/Cinema.png'
import videocolor from '@/public/Cinema1.png'
import IMG from '@/public/Edit Image.png'
import IMGcolor from '@/public/Edit Image1.png'
import line from'@/public/Line 83.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const InnovizSidebar = () => {
  const pathname = usePathname()
  return (
    
    <div className={'w-20 text-white flex flex-col gap-20 pt-20 h-[100vh] bg-[#020E1B]'}>
      <div className='flex gap-5'>
      <Image src={pathname==='/Innoviz-blogs'?line:pathname.includes('/Innoviz-blogs')?line:""}  alt=''/>
        
      <Link href={'/Innoviz-blogs'} className='flex flex-col  items-center'>
       <Image src={pathname==='/Innoviz-blogs'?videocolor:pathname.includes('/Innoviz-blogs')?videocolor:video}  alt='video'/>
       <span className='text-xs'>Blogs</span>
      </Link>

      </div>
      <Link href={'/Innoviz-blogs'} className='flex gap-6'>
      <Image src={pathname==='/Milestones'?line:pathname==='/Milestones/Postdetails'?line:pathname.includes('/Milestones/Postdetails/')?line:""}  alt=''/>
        
      {/* <Link href={'/Innoviz-blogs'} className='flex flex-col  items-center'>
       <Image src={pathname==='/Milestones'?IMGcolor:pathname==='/Milestones/Postdetails'?IMGcolor:pathname.includes('/Milestones/Postdetails/')?IMGcolor:IMG}  alt='job'/>
       <span className='text-xs'>Mails</span>
      </Link> */}

      </Link>
    </div>
   
    
  )
}
