import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="transform hover:scale-110 transition-transform duration-300 p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.name}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-400 font-bold"} varient="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-blue-400 font-bold"} varient="ghost">
          {job?.salary}LPA
        </Badge>
        <Badge className={"text-blue-400 font-bold"} varient="ghost">
          {job?.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
