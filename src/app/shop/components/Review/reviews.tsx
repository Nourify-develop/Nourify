"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { reviewsData, ratingData } from '../../../../ui/landing/_data'; 

const Reviews = () => {
  const { totalRating, ratings } = ratingData;

  // Calculating the percentage for each rating
  const maxRatingCount = Math.max(...Object.values(ratings));

  return (
    <div className="flex-col gap-[4em] flex lg:flex-row justify-between px-[2em] lg:px-[4em]">
      <div className="flex w-full flex-col gap-[2em] p-4 ">
        <div className="flex flex-col lg:flex-row text-center md:justify-between items-center gap-3 ">
          <div className="">
            <h1 className="text-lg font-semibold">Reviews</h1>
            <p className="text-gray-500">(2 out of 32 reviews)</p>
          </div>
          <div>
            <h1 className="bg-gray-200 md:px-6 md:py-3 py-2 px-4 rounded-full">Most recent</h1>
          </div>
        </div>

        {/* Map over reviews */}
        {reviewsData.map((review, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex gap-[2em]">
              <div>
                <Image src={review.image} alt={review.name} width={50} height={50} />
              </div>
              <div>
                <h1>{review.name}</h1>
              </div>
            </div>

            <p>{review.review}</p>
            <div className="flex gap-[2em]">
              <h1 className="text-green-600">Reply</h1>
              <h1>.</h1>
              <h1 className="text-green-600">View Replies</h1>
            </div>
            <hr className="border-b-1 border-b-gray-6" />
          </div>
        ))}
      </div>

      {/* Ratings Section */}
      <div className="w-full mx-auto mb-[3em] lg:mb-0 gap-[1em]">
        <div className="flex justify-between mb-[2em]">
          <h1 className="text-lg font-semibold ">Ratings</h1>
          <h1>
            {totalRating} <span className="text-gray-500">(Total)</span>
          </h1>
        </div>

        {/* Rating bars with vertical space */}
        <div className="flex flex-col gap-4"> {/* Added gap-4 for vertical spacing */}
          {Object.entries(ratings)
            .reverse() // Reverse to display from 5 stars to 1 star
            .map(([rating, count]) => {
              const percentage = (count / maxRatingCount) * 100;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <span className="w-[10%] text-sm">{rating}</span>
                  <div className="w-full h-4 bg-gray-200 rounded-lg">
                    <motion.div
                      className="h-full bg-red-300 rounded-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                    />zz
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
