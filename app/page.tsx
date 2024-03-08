"use client"
import React, { useState } from 'react'
import bg from '@/public/Group.png'
import user from '@/public/clarity_id-badge-line.png'
import pass from '@/public/mdi_password-off-outline.png'
import key from '@/public/ph_key.png'
import logo from '@/public/Logo.svg'
import form from '@/public/form-bg.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import firebaseApp from '../app/firebase.config'; 

const page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
 setLoading(true)
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, 'admin'));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let adminFound = false;
      querySnapshot.forEach((doc) => {
        const adminData = doc.data();
        console.log(adminData)
        if (adminData.user === userId && adminData.password === password && adminData.code === accessCode) {
          adminFound = true;
          console.log('Login successful');
          router.push('/Postjob');
        }
      });
  setLoading(false)
      if (!adminFound) {
        console.log('User not found or invalid credentials');
        alert('User not found or invalid credentials');
        setLoading(false)
      }
    });
  
    return () => unsubscribe();
  };

  // Function to check if any input field is empty and disable the button accordingly
  const checkEmptyFields = () => {
    if (userId.trim() === '' || password.trim() === '' || accessCode.trim() === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-r from-red-500 to-blue-500 grid place-items-center'>
      <Image src={form} className='relative rounded-[30px]' alt='logo'/>
      <div className=' absolute '>
        <form className='flex flex-col  items-center gap-10 space-y-5' onSubmit={handleLogin}>
          <Image src={logo} alt='logo'/>
          <div className='flex gap-5 items-center w-[270px] border-b'>
            <label><Image src={user} alt='user'/></label>
            <input className=' bg-transparent placeholder-white outline-none text-white' onChange={(e) => { setUserId(e.target.value); checkEmptyFields(); }} placeholder='User ID' />
          </div>
          <div className='flex gap-5 items-center  w-[270px] border-b'>
            <label><Image src={pass} alt='user'/></label>
            <input className=' bg-transparent placeholder-white outline-none text-white' type='password' onChange={(e) => { setPassword(e.target.value); checkEmptyFields(); }} placeholder='Password' />
          </div>
          <div className='flex gap-5 items-center  w-[270px] border-b'>
            <label><Image src={key} alt='user'/></label>
            <input className=' bg-transparent placeholder-white outline-none text-white'  type='password' onChange={(e) => { setAccessCode(e.target.value); checkEmptyFields(); }} placeholder='Access Code' />
          </div>
          <div>
           
        
              
            <button className={ 'bg-[#261E3C] flex justify-center items-center  text-white w-[270px] h-10  rounded-md shadow-md'}>
              {loading?
              
            <div role="status">
              <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
            : "Login"
            }
          </button>
            
              
          </div>
        </form>
      </div>
    </div>
  )
}

export default page;
