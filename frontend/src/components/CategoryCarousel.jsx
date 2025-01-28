import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';


const category = [
  "Front End Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Graphic Designer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Mobile App Developer",
  "Game Developer",
  "UI/UX Designer",
  "Database Administrator",
  "Cloud Engineer",
  "IT Support Specialist",
  "Product Manager",
  "System Administrator",
  "Cybersecurity Specialist",
  "Network Engineer",
  "Technical Writer",
  "Blockchain Developer",
  "QA Engineer",
  "Embedded Systems Developer",
  "AI Engineer",
  "AR/VR Developer",
  "Software Architect",
  "Digital Marketer",
  "SEO Specialist",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <div>
      <Carousel className="w-full md:max-w-xl max-w-xs mx-auto my-20">
        <CarouselContent className="flex md:gap-8">
          {category.map((items, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button onClick={()=>searchJobHandler(items)} className="bg-red-500">{items}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
