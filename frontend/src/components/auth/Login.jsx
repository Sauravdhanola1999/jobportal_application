import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email.trim() || !input.password.trim() || !input.role.trim()) {
      toast.error("Please Enter the Required Details");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl border border-gray-200 rounded-lg p-4 sm:p-6 my-6 bg-white shadow-md"
      >
        <h1 className="font-bold text-center text-xl sm:text-2xl mb-5">
          Sign In
        </h1>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center md:my-5">
          <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-0 md:gap-4">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                className="cursor-pointer"
                onChange={onChangeHandler}
              />
              <Label htmlFor="r1">Student</Label>
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
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        {loading ? (
          <Button className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
            Wait.........
          </Button>
        ) : (
          <Button type="submit" className="w-full md:my-1">
            Sign In
          </Button>
        )}
        <span className="block text-center md:pt-3 pt-6">
          Don't Have an Account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
