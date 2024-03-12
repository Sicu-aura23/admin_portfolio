"use client"
import React, { useEffect, useState } from 'react';
import TextEditor, { EditorContentChanged } from '../../../Jobpost/texteditor'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { db, firestore, storage } from '../../../firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from '@/app/Navbar';
import { Sidebar } from '@/app/Sidebar';

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}
const videopost: React.FC<{params:any }> = ({params}) => {
    const postid = params.slug
  const [editorValue, setEditorValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const router = useRouter();
  const [saveddata,setsaveddata] = useState()
  const [formData, setFormData] = useState(() => {
    if (saveddata) {
      return JSON.parse(saveddata);
    } else {
      return {
        title: "",
        tagline: "",
        content: "",
        date: "",
        // author: "",
        imageUrl: "",
      };
    }
  })
    useEffect(() => {
      const fdata = window.localStorage.getItem('formData');
      setsaveddata(fdata ? JSON.parse(fdata) : null);
        const fetchData = async () => {
            try {
              const docRef = doc(db, 'milestones', postid);
              const docSnap = await getDoc(docRef);
          
              if (docSnap.exists()) {
                const { imageUrl, ...formDataWithoutImageUrl } = docSnap.data();
                setFileUrl(imageUrl)
                setFormData(formDataWithoutImageUrl);
                setEditorValue(formDataWithoutImageUrl.content);
                setLoading(false);
              } else {
                console.log('No such document!');
              }
            } catch (error) {
              console.error('Error getting document: ', error);
            }
          };
          fetchData()
  }, []);

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
      alert("Please choose a file first!");
      return;
    }
  
    setUploading(true);
    const storageRef = ref(storage, `/milestonesimage/${formData.imageUrl.name}`);
    
    // Delete old image if it exists
    if (fileUrl) {
      const parts = fileUrl.split('%2F');
      const imageName = parts[parts.length - 1].split('?')[0];
      const prevStorageRef = ref(storage, `/milestonesimage/${imageName}`);
      deleteObject(prevStorageRef)
        .catch((error) => {
          console.error("Error deleting old image: ", error);
          setUploading(false);
        });
    }
  
    // Upload new image
    const uploadTask = uploadBytesResumable(storageRef, formData.imageUrl);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => {
        console.log(err);
        setUploading(false); // Set uploading to false in case of an error
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUrl(url);
          setUploading(false);
        } catch (error) {
          console.error("Error getting download URL: ", error);
          setUploading(false);
        }
      }
    );
  }
  
  
  
  
  
  

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      content: editorValue,
      date: date,
      imageUrl:fileUrl
      
    };
  
    setLoading(true);
    if (!updatedFormData.imageUrl) {
      alert("Please choose a file first!");
      setLoading(false);
    } else {
      const docRef = doc(db, 'milestones', postid); 
      updateDoc(docRef, updatedFormData)
        .then(() => {
          console.log("Document updated successfully!");
          setLoading(false);
          router.push('/Milestones/Postdetails');
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          setLoading(false);
        });
    }
}


    const pathname = usePathname()

  return (
  
  <div className='flex'>
      <Sidebar/>
    <main className={'flex flex-col items-center w-screen'}>
     <Navbar/>
          <div className={'border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika'}>
        <Link href={'Milestones'} className='flex flex-col justify-center items-center'>
        <span className={pathname===`/Milestones/Postdetails/${postid}`?' text-[#0DF5E3]':pathname==='/Previewjobpost'?'text-[#0DF5E3]':""}>Post a images</span>
        <span className={pathname==='/Milestones'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':pathname===`/Milestones/Postdetails/${postid}`?'p-[1.5px] w-[40px] bg-[#0DF5E3]':"bg-[#ffff]"}></span>
        </Link>
        <Link href={'/Milestones/Postdetails'} className='flex flex-col justify-center items-center'>
        <span className={pathname==='/Jobposts'?' text-[#0DF5E3]':''}>Updated posts</span>
        <span  className={pathname==='/Jobposts'?'p-[1.5px] w-[40px] bg-[#0DF5E3]':'p-[1.5px] w-[40px] bg-[#ffff]'}></span>
        </Link>
       </div>
        <form className={'w-[95%] relative mt-5 flex flex-col gap-10'}  onSubmit={handleSubmit}>
        
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Title</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' value={formData.title} name='title' placeholder='Write here Title' onChange={handleInputChange} />
           </div>
           {/* <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Author</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' name='author' placeholder='Write here Author' onChange={handleInputChange} />
           </div> */}
           <div className='flex md:flex-row flex-col gap-5 '>
            <label  className='w-[130px] '>Tagline</label>
            <input type="text" className='border rounded md:w-[30vw] w-[85vw] px-3 outline-none' value={formData.tagline} name='tagline' placeholder='Write here Tagline' onChange={handleInputChange} />
           </div>
    
           <div className='flex md:flex-row flex-col gap-12'>
            <label  className=''>Description</label>
            <TextEditor value={editorValue} onChange={handleChange} />
           </div>
         
           <div className='text-md flex md:flex-row flex-col gap-3'>
           <label  className='w-[140px] '>Upload image</label>
            <input className='border rounded w-[50%]' type="file" onChange={handleInputChange} name="imageUrl"  />
            <button disabled={uploading} onClick={handleUpload}  className='bg-[#201A31] rounded  px-[2vw] py-[1vh] text-[#A0A0A0]'>   {uploading ? (
              <p>{`Uploading: ${percent}% done`}</p>
            ) : (
              <p>Upload a file</p>
            )}</button>
           </div>
           <button className='bg-[#201A31] absolute -bottom-10 right-0 rounded  px-[2vw] py-[1vh] text-[#A0A0A0]'>
            Update
           </button>
        </form>
    </main>

  
      </div>
     
  )
}

export default videopost