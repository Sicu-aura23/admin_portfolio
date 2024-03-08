import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/Logo.svg";
import bell from "@/public/bell.png";
import { useRouter } from "next/navigation";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase.config";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [count,setcount] = useState(0)
  const logout = () => {
    window.sessionStorage.removeItem("isLoggedIn");
    router.push("/");
  };
  useEffect(() => {
    getApplications()
  }, []);
  
  const getApplications = async () => {

  const q = query(collection(db, 'application'));
  const querySnapshot = await getDocs(q);
  const counts = querySnapshot.docs.length;
  setcount(counts)
  }


  return (
    <div
      className={
        "min-w-[100%] h-[70px] ps-5 pe-20 flex justify-between items-center text-white bg-[#031B32]"
      }
    >
      <div>
        <Image src={logo} alt="sicu-aura" />
      </div>
<div className="flex gap-10 items-center">
        <Link href={'/Jobposts'}  className="relative">
      <Image src={bell} alt="notify" />
      <p className="bg-[#FF0000] text-white h-4 w-4 absolute -right-2 -top-1  rounded-full  text-xs  text-center">{count}</p>
        </Link>

      <button
        onClick={logout}
        className="bg-[#87C4FF] h-8 px-5 rounded-lg text-black"
      >
        Logout
      </button>
</div>
    </div>
  );
};

export default Navbar;
