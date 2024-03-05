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
    
    <div className={'w-20 text-white flex flex-col gap-20 pt-20  bg-[#020E1B]'}>
      <div className='flex gap-3'>
        <Image src={pathname==='/'?line:pathname==='/Previewjobpost'?line:pathname==='/Jobposts'?line:pathname==='/Jobposts/Hfh4Rrg4XpRvZ91jR3a9'?line:pathname==='/Jobposts/Hfh4Rrg4XpRvZ91jR3a9/Applicants'?line:""}  alt=''/>
        
      <div className='flex flex-col items-center'>
       <Image src={pathname==='/'?jobcolor:pathname==='/Previewjobpost'?jobcolor:pathname==='/Jobposts'?jobcolor:pathname==='/Jobposts/Hfh4Rrg4XpRvZ91jR3a9'?jobcolor:pathname==='/Jobposts/Hfh4Rrg4XpRvZ91jR3a9/Applicants'?jobcolor:job}  alt='job'/>
       <span className='text-xs'>Job Post</span>
      </div>

      </div>
      <div className='flex gap-5'>
      <Image src={pathname==='/Videoposts'?line:pathname==='/Videoposts/Postdetails'?line:""}  alt=''/>
        
      <Link href={'/Videoposts'} className='flex flex-col  items-center'>
       <Image src={pathname==='/Videopost'?videocolor:pathname==='/Videoposts/Postdetails'?videocolor:video}  alt='video'/>
       <span className='text-xs'>Video</span>
      </Link>

      </div>
      <div className='flex gap-6'>
      <Image src={pathname==='/imagepost'?line:""}  alt=''/>
        
      <div className='flex flex-col  items-center'>
       <Image src={pathname==='/imagepost'?IMGcolor:IMG}  alt='job'/>
       <span className='text-xs'>Post</span>
      </div>

      </div>
    </div>
   
    
  )
}
