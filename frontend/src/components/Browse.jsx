import React, {useEffect} from "react";
import JobCards from "./JobCards";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1>Search Results ({allJobs.length})</h1>
        <div className="grid md:grid-cols-3 mx-5 gap-4">
          {allJobs.map((job) => {
            return (
              <div>
                <JobCards key={job._id} job={job} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
