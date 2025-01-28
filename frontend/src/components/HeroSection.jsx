import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 100 }, 
    visible: {
      opacity: 1,
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  

  return (
    <div className="text-center">
      <motion.div
        className="flex flex-col gap-6 my-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span
          className="mx-auto px-4 py-2 bg-gray-200 rounded-2xl text-red-500 font-bold"
          variants={containerVariants}
        >
          No. 1 Job Hunt Website
        </motion.span>
        <motion.h1 className="text-5xl font-bold" variants={containerVariants}>
          Search Apply & Get Your <br />
          <span className="text-red-500">Dream Jobs</span>
        </motion.h1>
        <motion.p className="px-6" variants={containerVariants}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic assumenda
          ipsa nam, eveniet consequatur!
        </motion.p>
        <motion.div
          className="flex md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto"
          variants={containerVariants}
        >
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-red-500"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
