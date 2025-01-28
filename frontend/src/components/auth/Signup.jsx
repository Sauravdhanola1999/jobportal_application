import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onChangeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !input.fullname.trim() ||
      !input.email.trim() ||
      !input.phoneNumber.trim() ||
      !input.password.trim() ||
      !input.role.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

//   useEffect(()=>{
//     if(user){
//         navigate("/");
//     }
// },[])

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
    <form
      onSubmit={submitHandler}
      className="w-full max-w-xl border border-gray-200 rounded-lg p-4 sm:p-6 my-6 bg-white shadow-md"
    >
      <h1 className="font-bold text-center text-xl sm:text-2xl mb-5">Sign Up</h1>
      <div className="my-4">
        <Label htmlFor="fullname">Full Name</Label>
        <Input
          type="text"
          value={input.fullname}
          name="fullname"
          placeholder="John Dick"
          onChange={onChangeHandler}
          className="w-full"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          value={input.email}
          name="email"
          placeholder="pushpa@gmail.com"
          onChange={onChangeHandler}
          className="w-full"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="phoneNumber">Phone No.</Label>
        <Input
          type="text"
          value={input.phoneNumber}
          name="phoneNumber"
          placeholder="80808080808"
          onChange={onChangeHandler}
          className="w-full"
        />
      </div>
      <div className="my-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={input.password}
          name="password"
          placeholder="Enter Your Password"
          onChange={onChangeHandler}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-5">
        <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="student"
              checked={input.role === "student"}
              className="cursor-pointer"
              onChange={onChangeHandler}
            />
            <Label htmlFor="student">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              className="cursor-pointer"
              onChange={onChangeHandler}
            />
            <Label htmlFor="recruiter">Recruiter</Label>
          </div>
        </RadioGroup>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Label>Profile</Label>
          <Input
            accept="image/*"
            type="file"
            name="file"
            className="cursor-pointer"
            onChange={onChangeFileHandler}
          />
        </div>
      </div>
      {loading ? (
        <Button className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait.........
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4">
          SignUp
        </Button>
      )}
      <span className="block text-center">
        Already Have an Account?{" "}
        <Link to="/login" className="text-blue-500 font-semibold">
          Login
        </Link>
      </span>
    </form>
  </div>
  
  );
};

export default Signup;
