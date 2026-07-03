import Image from "next/image";
import Navbarr from "./component/Navbarr";
import Footerr from "./component/Footerr";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center text-white h-[44vh] px-5 md:px-0 items-center gap-4">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center "> Get me a chai! <span><img src="tea.gif" alt="" /></span> </div>
        <p className="text-center md:text-left">
          A corwd funded project to support the development of Get Me A Chai!
        </p >
        <div>
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>  
        </div>
      </div>
      <div className="bg-white opacity-10 h-1"></div>
      <div className="text-white container mx-auto pb-4 pt-2.5 px-5">
        <h2 className="text-3xl font-bold text-center mb-14">Your fans can buy you a chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2" src="mann.png" width={75} alt="" />
            <p className="font-bold text-center">Fans wants to help</p>
            <p className="text-center"> Your fans are avaliable for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2" src="coin.gif" width={75} alt="" />
            <p className="font-bold text-center">Fans wants to help</p>
            <p className="text-center"> Your fans are avaliable for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2" src="group.png" width={75} alt="" />
            <p className="font-bold text-center">Fans wants to help</p>
            <p className="text-center"> Your fans are avaliable for your help</p>
          </div>
        </div>
      </div>
      <div className="bg-white opacity-10 h-1"></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <iframe width="400" height="220" src="https://www.youtube.com/embed/YdKwr0l176M?si=w4R_2BEd1JWBEbvH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      
    </>
  );
}
