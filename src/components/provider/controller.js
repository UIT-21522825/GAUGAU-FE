import { useEffect, useState } from "react";
import { request } from "../../service/axios";
import { toast } from "react-hot-toast";
import { CustomMessage } from "../antd-custom/CustomMessage";

export const useProviderAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getInfo = async () => {
    try {
      setLoading(true);
      setLoggedIn(false);
      const response = await request("get", "/user/data");
      if (response.data.status == "success") {
        setUser(response.data.data);
        setLoggedIn(true);
        setLoading(false);
        return true;
      } else setLoggedIn(false);
      setLoading(false);
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    const response = await request("get", "/user/logout");
    if (response.data.status == "success") {
      setUser(null);
      setLoggedIn(false);
      toast.success("You have logged out");
    } else toast.error("Sorry, something went wrong. Please try again!");
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Return the user object and auth methods
  return {
    isLoggedIn,
    isLoading,
    user,
    setLoading,
    setLoggedIn,
    setUser,
    getInfo,
    logOut,
  };
};

export const useProviderFake = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  const defaultUser = {
    name: "Developer",
    role: "Administrator",
  };

  function getInfo() {
    setLoading(true);
    setLoggedIn(false);
    setUser(defaultUser);
    setLoggedIn(true);
    setLoading(false);
    console.log("Login successful")
  };

  const logOut = async () => {
    setLoading(true);
    setLoggedIn(false);
    setUser({});
    setLoggedIn(false);
    setLoading(false);
    console.log("Login successful");
    CustomMessage({"content": "Đã đăng xuất"}, "success");
  };

  useEffect(() => {
    // getInfo();
  }, []);

  // Return the user object and auth methods
  return {
    isLoggedIn,
    isLoading,
    user,
    setLoading,
    setLoggedIn,
    setUser,
    getInfo,
    logOut,
  };
};
