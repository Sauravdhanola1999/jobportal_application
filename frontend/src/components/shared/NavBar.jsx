import React, { useState } from "react";
import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between h-16 px-5 md:px-28">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          <ul className="flex font-medium gap-5 items-center">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="link">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-700 hover:bg-red-300">SignUp</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logouHandler}>
                        LogOut
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-5 py-3 bg-gray-50">
          <ul className="font-medium gap-5 flex flex-col">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="link">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-700 hover:bg-red-300">SignUp</Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">Saurav</h4>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-600">
                {user && user.role === "student" && (
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button variant="link" onClick={logouHandler}>
                    LogOut
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
