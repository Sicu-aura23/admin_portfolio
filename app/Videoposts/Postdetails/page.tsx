"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import edit from '@/public/edit.png'
import deleteicom from '@/public/delete.png'
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Navbar from "@/app/Navbar";
import { Sidebar } from "@/app/Sidebar";
import Image from "next/image";

interface post {
  jobtitle: string;
  location: string;
  type: string;
  jobtype: string;
  duration: string;
  payroll: string;
  skills: string[];
  email: string;
  description: string;
  status: string;
  timestamp: Date;
  daysSinceLastUpdate: string;
  count: number;
  // Add other keys as needed
}

const Viewjobpost: React.FC<{ }> = () => {
  const [post, setPost] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "blogPosts"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let postsArr: { id: string }[] = [];
      querySnapshot.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(postsArr);
      setPost(postsArr);
      setLoading(false);
    });

    return () => unsubscribe();
  };

  const pathname = usePathname();
  const handleDelete = async (postId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'blogPosts', postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };
  return (

  <div className='flex'>
      <Sidebar/>
    <main className={"flex flex-col items-center  w-screen"}>
     <Navbar/>
      <div className={"border-b flex w-[95%] space-x-14 px-0 py-2 font-Inika"}>
        <Link href={"/Videoposts"} className="flex flex-col justify-center items-center">
          <span
            className={
              pathname === "/"
                ? " text-[#0DF5E3]"
                : pathname === "/Previewjobpost"
                ? "text-[#0DF5E3]"
                : ""
            }
          >
          Post a blogs
          </span>
          <span
            className={
              pathname === "/Videoposts"
                ? "p-[1.5px] w-[40px] bg-[#0DF5E3]"
                : pathname === "/Previewjobpost"
                ? "p-[1.5px] w-[40px] bg-[#0DF5E3]"
                : "bg-[#ffff]"
            }
          ></span>
        </Link>
        <Link
          href={"/Videoposts/Postdetails"}
          className="flex flex-col justify-center items-center"
        >
          <span className={pathname === "/Videoposts/Postdetails" ? " text-[#0DF5E3]" : ""}>
          Updated Blogs
          </span>
          <span
            className={
              pathname === "/Videoposts/Postdetails"
                ? "p-[1.5px] w-[40px] bg-[#0DF5E3]"
                : "p-[1.5px] w-[40px] bg-[#ffff]"
            }
          ></span>
        </Link>
      </div>
      {loading ? (
        <div
          role="status"
          className="animate-pulse w-[95%] space-y-11 py-5 my-6 bg-slate-300 rounded-md"
        >
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[30%] mb-2.5 mx-[1%]"></div>
          <div className="flex mx-[1%]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[15%] mb-2.5 "></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[10%] mb-2.5 mx-[5%]"></div>
          </div>
          <div className="flex mx-[1%]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[15%] mb-2.5 "></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[5%] mb-2.5 mx-[5%]"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700  w-[8%] mb-2.5 mx-[5%]"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mt-10 w-[90%] mb-2.5 mx-[1%]"></div>

          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <section className="w-[95%] h-[55vh] overflow-y-scroll px-10 my-6 border rounded-lg text-black">
          {post &&
            post.map(
              (post: {
                id: any;
                date: ReactNode;
                tagline: ReactNode;
                title: ReactNode;
                imageUrl: ReactNode;
                author: ReactNode;
                content: ReactNode;
              }) => {
                return (
                    <div className="flex border-b border-gray-300 gap-10 items-center justify-between py-10">
                      <div className="w-3/12">
                        {typeof post.imageUrl === "string" &&
                        post.imageUrl.includes(".mp4") ? (
                          <video width="300" height="200" controls>
                            <source src={post.imageUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            width="200"
                            height="100"
                            src={`${post.imageUrl}`}
                            loading="lazy"
                            alt="blogpost banner"
                            className="w-[300px] h-auto object-cover"
                          />
                        )}
                      </div>
                      <div className="w-9/12">
                                <button className='flex px-6 mx-3 py-1 mt-6  items-center rounded-full bg-red-500 float-end' onClick={() => handleDelete(post.id)} ><Image src={deleteicom} width={20} height={20} alt='delete' />Delete</button>
                      <Link href={`/Videoposts/Postdetails/${post.id}`} >
                                <button className='flex px-6 py-1 mt-6 rounded-full items-center bg-blue-500 float-end'><Image src={edit} alt='edit' />Edit</button>
                            </Link>
                         
                      <h1 className="text-xl font-bold">{post.title}</h1>
                      <h1 className="text-lg font-bold text-gray-500">{post.tagline}</h1>
                      <div className="pt-2" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                      {/* <h1 className="pt-2">{post.content}</h1> */}
                        <h1 className="float-right px-20"> - {post.author}</h1>
                      </div>
                    </div>
              
                );
              }
            )}
        </section>
      )}
      <div className="flex flex-row w-full justify-end gap-5 px-6 py-6 font-Inika">
        <Link href={"/Videoposts"}>
          <button className="bg-[#ffffff] shadow-md shadow-gray-400 rounded px-[2vw] py-[1vh] text-[#201A31] float-end">
            Back
          </button>
        </Link>
      </div>
    </main>

  
      </div>
      
  );
};

export default Viewjobpost;
