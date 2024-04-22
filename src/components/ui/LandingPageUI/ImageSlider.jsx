"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../aceComponents/images-slider";
import { useNavigate } from "react-router-dom";

export function ImagesSliderDemo() {
  const images = [
    "https://students-residents.aamc.org/sites/default/files/d/5/81-people_doctor-and-patient-family-smiling_landscape.jpg__750x325_q85_crop-smart_subsampling-2_upscale%402x.jpg",
    "https://students-residents.aamc.org/sites/default/files/d/5/481-people_two-medical-students-examines_patient_landscape.jpg__750x325_q85_crop-smart_subsampling-2_upscale%402x.jpg",
    "https://students-residents.aamc.org/sites/default/files/d/5/8-people_doctor-talking-to-patient_landscape.jpg__750x325_q85_crop-smart_subsampling-2_upscale%402x.jpg",
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      "/Patient-and-Health-Insurance-Management-System-Group20-Frontend1/login"
    );
  };
  return (
    <ImagesSlider className="h-[50rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Welcome to Mediapp, the best patient <br /> and insurance management
          platform available.
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span onClick={handleClick}>Login or Register Today →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
