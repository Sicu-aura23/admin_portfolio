"use client"
import React, { useState } from 'react';
import TextEditor, { EditorContentChanged } from '../Jobpost/texteditor'
import vector from '@/public/vector x.png'
import vector1 from '@/public/vector +.png'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { firestore, storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}
const videopost = () => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const date = new Date().toISOString().split('T')[0]
  const router = useRouter();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return {
        title: "",
        tagline: "",
        content: "",
        date: "",
        author: "",
        imageUrl: "",
      };
    }
  })

  const handleInputChange = (event: { target: { value?: any; name?: any;files?: any;type?: any; }; }) => {
    const { name, value,files,type } = event.target;
if(type ==='file'){
    setFormData((prevState: any) => ({
      ...prevState,
      [name]:files[0]
    }));
  }else{
    setFormData((prevState: any) => ({
        ...prevState,
        [name]:value
      }));
  }

}
//   if (type === 'file') {
//     setFormData(prevState:any => ({
//       ...prevState,
//       [name]:files[0]
//     }));
//   } else {
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: event.target.value,
//     }));
//   }
// };

  const handleChange = (html: string) => {
    setEditorValue(html);
  };
  function handleUpload(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!formData.imageUrl) {
        alert("Please choose a file first!")
    }
    setUploading(true);
    const storageRef = ref(storage, `/postsimage/${formData.imageUrl.name}`)
    const uploadTask = uploadBytesResumable(storageRef, formData.imageUrl);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log(percent)
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              setFileUrl(url);
              setUploading(false);
          });
      }
  ); 
}

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      content: editorValue,
      date:date,
      imageUrl:fileUrl
    };
    console.log(updatedFormData)
  
        setLoading(true);
      
        if (!formData.imageUrl) {
            alert("Please choose a file first!")
        }
        firestore.collection('blogPosts').add(updatedFormData)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        setLoading(false);
      router.push('/Videoposts/Postdetails')
      }
    const pathname = usePathname()

  return (
    <main className={'flex flex-col items-center '}>
          <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
        <Link href={'/'} className='flex flex-col justify-center items-center'>
        <span className={pathname==='/Videoposts'?' text-[#0DF5E3]':pathname==='/Previewjobpost'?'text-[#0DF5E3]':""}>Post a blogs</span>
        <span className={pathname==='/Videoposts'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':pathname==='/Previewjobpost'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':"bg-[#ffff]"}></span>
        </Link>
        <Link href={'/Videoposts/Postdetails'} className='flex flex-col justify-center items-center'>
        <span className={pathname==='/Jobposts'?' text-[#0DF5E3]':''}>Updated Blogs</span>
        <span  className={pathname==='/Jobposts'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
        </Link>
       </div>
        <form className={'w-[95%] relative mt-5 flex flex-col gap-10'}  onSubmit={handleSubmit}>
        
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Title</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='title' placeholder='Write here Title' onChange={handleInputChange} />
           </div>
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Author</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='author' placeholder='Write here Author' onChange={handleInputChange} />
           </div>
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Tagline</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='tagline' placeholder='Write here Tagline' onChange={handleInputChange} />
           </div>
    
           <div className='flex md:flex-row flex-col gap-5'>
            <label  className='w-[140px]'>Description</label>
            <TextEditor value={editorValue} onChange={handleChange} />
           </div>
         
           <div className='text-md flex md:flex-row flex-col gap-3'>
           <label  className='w-[140px] '>Upload Video</label>
            <input className='border rounded w-[50%]' type="file" onChange={handleInputChange} name="imageUrl"  />
            <button disabled={uploading} onClick={handleUpload}  className='bg-[#201A31] rounded  px-[2vw] py-[1vh] text-[#A0A0A0]'>   {uploading ? (
              <p>{`Uploading: ${percent}% done`}</p>
            ) : (
              <p>Upload a file</p>
            )}</button>
           </div>
           <button className='bg-[#201A31] absolute -bottom-10 right-0 rounded  px-[2vw] py-[1vh] text-[#A0A0A0]'>
            Post
           </button>
        </form>
    </main>
  )
}

export default videopost