import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/Innoviz Logo.png";
import { useRouter } from "next/navigation";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase.config";

const InnovizNavbar = () => {
  const router = useRouter();
  const [count, setcount] = useState(0);
  const logout = () => {
    window.sessionStorage.removeItem("isLoggedIn");
    router.push("/");
  };
  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    const q = query(collection(db, "application"));
    const querySnapshot = await getDocs(q);
    const counts = querySnapshot.docs.length;
    setcount(counts);
  };

  return (
    <div
      className={
        "min-w-[100%] h-[70px] px-7 flex justify-between items-center text-white bg-[#031B32]"
      }
    >
      <div>
        <Image src={logo} className="w-[80%]" alt="sicu-aura Innoviz" />
      </div>
      <div className="flex gap-10 items-center">

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

export default InnovizNavbar;
