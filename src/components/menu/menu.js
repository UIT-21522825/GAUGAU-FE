import {
  AppstoreOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type, path = "#") {
  if (children || type ==="group")
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  else
    return {
      key,
      icon,
      children,
      label: <Link to={path}>{label}</Link>,
      type,
    };
}

export const SidebarMenuItems = [
  {type: "divider"},
  getItem("Điều khiển", "/", null, null, "group", null),
  // getItem("Học viên", "student", <AppstoreOutlined/>,null, null, "/student"),
  getItem("Demo", "demo", <AppstoreOutlined/>, [getItem("Option 1", "1"), getItem("Option 2", "2")], null, "/demo"),
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  // {
  //   type: "divider",
  // },
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Option 11", "11"),
  //   getItem("Option 12", "12"),
  // ]),
  // getItem(
  //   "Group",
  //   "grp",
  //   null,
  //   [getItem("Option 13", "13", <AppstoreOutlined />), getItem("Option 14", "14", <AppstoreOutlined />)],
  //   "group"
  // ),
];
