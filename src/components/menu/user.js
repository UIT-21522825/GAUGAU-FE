import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton, Button } from "antd";
import { useAuth } from "../provider";
import { Link, useNavigate } from "react-router-dom";
const { Meta } = Card;

const UserCard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, user, logOut } = useAuth();
  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "none",
        background: "transparent",
        display: "block",
      }}
      className="text-clip overflow-hidden"
    >
      <Skeleton loading={isLoading} avatar active>
        {isLoggedIn ? (
          <>
            <div className="grid grid-flow-col auto-cols-max gap-2 content-center text-clip overflow-hidden mb-2">
              <img
                src="https://joesch.moe/api/v1/random?key=1"
                className="w-8"
              />
              <div className="block items-center justify-center col-span-3">
                <p className="text-clip overflow-hidden font-bold uppercase">
                  {user.name}
                </p>
                <p className="text-clip overflow-hidden">{user.role}</p>
              </div>
            </div>
            <Button
              type="text"
              block
              size="large"
              icon={<LogoutOutlined />}
              className="text-error hover:bg-error hover:text-white flex items-center px-2 text-clip overflow-hidden mb-1 text-sm"
              onClick={logOut}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            block
            size="large"
            icon={<UserOutlined />}
            style={{
              boxShadow: "none",
            }}
            className="bg-primary text-white text-sm flex items-center px-2 text-clip overflow-hidden"
              onClick={()=>navigate("/login")}
          >
            Login
          </Button>
        )}
      </Skeleton>
    </Card>
  );
};

export default UserCard;
