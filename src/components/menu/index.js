import { Menu } from "antd";
import UserCard from "./user";
import { SidebarMenuItems } from "./menu";
import { useLocation } from "react-router-dom";

export const SidebarMenu = () => {
  const { pathname } = useLocation();
  let arr = pathname.split("/");
  let keys = [];
  arr.forEach((key) => {
    if (key != "" && key != null) keys.push(key);
  });
  console.log(keys);
  return (
    <>
      <UserCard />
      <Menu
        theme="light"
        mode="inline"
        style={{
          boxShadow: "none",
          border: "none",
        }}
        selectedKeys={keys}
        items={SidebarMenuItems}
        className="p-1 gap-1 bg-white"
      />
    </>
  );
};
