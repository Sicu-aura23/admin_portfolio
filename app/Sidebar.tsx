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

export const Sidebar = () => {
  const pathname = usePathname()
  return (
    
    <div className={'w-20 text-white flex flex-col gap-20 pt-20 h-screen bg-[#020E1B]'}>
      <Link href={'/Postjob'} className='flex gap-3'>
        <Image src={pathname==='/Postjob'?line:pathname==='/Previewjobpost'?line:pathname.includes('/Jobposts')?line:""}  alt=''/>
        
      <div className='flex flex-col items-center'>
       <Image src={pathname==='/Postjob'?jobcolor:pathname==='/Previewjobpost'?jobcolor:pathname==='/Jobposts'?jobcolor:pathname.includes('/Jobposts/')?jobcolor:job}  alt='job'/>
       <span className='text-xs'>Job Post</span>
      </div>

      </Link>
      <div className='flex gap-5'>
      <Image src={pathname==='/Videoposts'?line:pathname==='/Videoposts/Postdetails'?line:pathname.includes('/Videoposts/Postdetails')?line:""}  alt=''/>
        
      <Link href={'/Videoposts'} className='flex flex-col  items-center'>
       <Image src={pathname==='/Videoposts'?videocolor:pathname==='/Videoposts/Postdetails'?videocolor:pathname.includes('/Videoposts/Postdetails/')?videocolor:video}  alt='video'/>
       <span className='text-xs'>Video</span>
      </Link>

      </div>
      <Link href={'/Milestones'} className='flex gap-6'>
      <Image src={pathname==='/Milestones'?line:pathname==='/Milestones/Postdetails'?line:pathname.includes('/Milestones/Postdetails/')?line:""}  alt=''/>
        
      <Link href={'/Milestones'} className='flex flex-col  items-center'>
       <Image src={pathname==='/Milestones'?IMGcolor:pathname==='/Milestones/Postdetails'?IMGcolor:pathname.includes('/Milestones/Postdetails/')?IMGcolor:IMG}  alt='job'/>
       <span className='text-xs'>Post</span>
      </Link>

      </Link>
    </div>
   
    
  )
}
