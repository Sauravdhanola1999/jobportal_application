import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-red-500">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 my-5 px-4 md:px-8">
        {allJobs.length < 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
