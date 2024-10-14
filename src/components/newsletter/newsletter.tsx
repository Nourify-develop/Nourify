import React from "react";
import "./newsletter.css";

const newsletter = () => {
  return (
    <div className="lg:p-[5em] px-[1em] py-[2em]  w-[92%] rounded-3xl newsletter gap-[1em] text-center  my-[2em] flex flex-col ">
      <h1 className="lg:text-[46px] text-[25px] font-[700] text-white ">SUBSCRIBE TO OUR NEWSLETTER</h1>
      <p className="text-[20px] font-[500] text-[#FFFFFFB2] w-[70%] mx-auto ">
        Enjoy the best deals and freshest finds every week. Stay updated with
        the latest grocery offers and more.
      </p>
      <div className="flex justify-center lg:mt-6 w-[90%] md:w-[50%] lg:w-[50%] mx-auto">
        <form
          
          className="flex items-center w-full   px-[3px] py-[2px] md:py-[4px] lg:px-[5px]  bg-white  rounded-full z-20"
          
        >
          <input
            type="email"
            placeholder="Email address"
           
            
            className="w-full text-white placeholder-gray-6  p-3 bg-transparent outline-none placeholder-[#1E1E1E80] md:text-[20px] text-[12px] font-space"
          />
          <button
            className="bg-[#079C4E] text-white font-semibold text-[8px] lg:text-[18px] lg:py-6 px-2 p-3 md:py-5 lg:w-[20em] w-[50%] md:w-[40%] rounded-full hover:bg-green-800 transition ease-linear duration-300  "
             // Disable the button while loading
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default newsletter;
