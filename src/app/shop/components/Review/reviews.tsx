"use client"
import { motion } from "framer-motion";
import React from "react";
import David from "../../../../../public/David.svg"
import Sonia from "../../../../../public/Sonia.svg"
const reviews = () => {
  const totalRating = 4.5;
  const ratings: { [key: number]: number } = {
    5.0: 30,
    4.0: 20,
    3.0: 10,
    2.0: 5,
    1.0: 5,
  };

  // Calculate the percentage for each rating
  const maxRatingCount = Math.max(...Object.values(ratings));
  
  return (
    <div className="flex justify-between px-[4em]">
      <div className="flex w-full flex-col gap-[2em] p-4 max-w-lg">
        {/* Reviews Section */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-lg font-semibold">Reviews</h1>
            <p className="text-gray-500">(2 out of 32 reviews)</p>
          </div>
          <div>
            <h1 className="bg-gray-200 px-6 py-3 rounded-full">Most recent</h1>
          </div>
        </div>

        {/* Individual Review */}
        <div className="flex flex-col gap-3">
          <div>
          
          <h1>David Carl</h1>
          </div>
         
          <p>
            The cucumbers I bought were fresh and crunchy! Perfect for my
            salads and snacks. They had a great flavor and lasted a good week in
            my fridge without going bad. Definitely will be purchasing again.
          </p>
          <div className="flex gap-[2em]">
            <h1 className="text-green-600">Reply</h1>
            <h1>.</h1>
            <h1 className="text-green-600">View Replies</h1>
          </div>
        </div>
        <hr className="border-b-1 border-b-gray-6" />
        <div className="flex flex-col gap-3">
          <h1>Sonia</h1>
          <p>
            The cucumbers were decent, but a few were a little softer than I
            expected. Most were fresh, though, and worked well in my salad. Not
            the best batch I've gotten, but still usable.
          </p>
          <div className="flex gap-[2em]">
            <h1 className="text-green-600">Reply</h1>
            <h1>.</h1>
            <h1 className="text-green-600">View Replies</h1>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="w-[40%]">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Ratings</h1>
          <h1>
            {totalRating} <span className="text-gray-500">(Total)</span>
          </h1>
        </div>

        {/* Rating bars */}
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
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default reviews;
