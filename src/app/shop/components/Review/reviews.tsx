import { div } from "framer-motion/client";
import React from "react";

const reviews = () => {
  const totalRating = 4.5;
  const ratings: { [key: number]: number } = {
    5: 30,
    4: 50,
    3: 10,
    2: 5,
    1: 5,
  };

  return (
    <div className="flex justify-between">
      <div className="flex w-full flex-col gap-[2em] p-4   max-w-lg">
        <div className="flex justify-between">
          <div>
            <h1 className="text-lg font-semibold">Reviews</h1>
            <p className="text-gray-500">(2 out of 32 reviews)</p>
          </div>
          <div>
            <h1 className="bg-gray-200 p-3 rounded-full">Most recent</h1>
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          <h1>David Carl</h1>
          <p>The cucumbers I bought were fresh and crunchy! Perfect for my salads and snacks. They had a great flavor and lasted a good week in my fridge without going bad. Definitely will be purchasing again.</p>
          <div className="flex gap-[2em]" >
            <h1>Reply</h1>
            <h1>.</h1>
            <h1>View Replies</h1>
          </div>

        </div>
        <div className=" flex flex-col gap-3">
          <h1>David Carl</h1>
          <p>The cucumbers I bought were fresh and crunchy! Perfect for my salads and snacks. They had a great flavor and lasted a good week in my fridge without going bad. Definitely will be purchasing again.</p>
          <div className="flex gap-[2em]" >
            <h1>Reply</h1>
            <h1>.</h1>
            <h1>View Replies</h1>
          </div>

        </div>

        
      </div>
      {/* Add the review section here */}
      <div>
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default reviews;
