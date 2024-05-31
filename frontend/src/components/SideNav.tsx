import { useLogout } from "@/services/mutations";
import { Link, useLocation } from "react-router-dom";

function SideNav() {
  const useLogoutMutation = useLogout();
  const location = useLocation();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: "../../Dashboard.svg",
      activeIcon: "../../Dashboard-active.svg",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Projects",
      icon: "../../Project-list.svg",
      activeIcon: "../../Project-list-active.svg",
      path: "/project-list",
    },
    {
      id: 3,
      name: "Create Project",
      icon: "../../create-project.svg",
      activeIcon: "../../create-project-active.svg",
      path: "/create-project",
    },
  ];

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          {menuList.map((menu, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Link
                to={menu.path}
                className={`flex gap-3 p-3 text-md text-slate-500 cursor-pointer mr-2 my-2 border-l-8 border-white ${
                  location.pathname == menu.path && "border-blue-600"
                }`}
                key={index}
              >
                <img
                  src={
                    location.pathname === menu.path
                      ? menu.activeIcon
                      : menu.icon
                  }
                  key={index}
                  alt={menu.name}
                  height={8}
                  width={8}
                  className="h-7 w-7"
                />
              </Link>
              {index == 1 && (
                <hr className="flex items-center my-5 w-10 border-2 border-gray-300" />
              )}
            </div>
          ))}
          <div className="flex gap-2 bottom-5 fixed">
            <h2 className="flex text-md text-slate-500 cursor-pointer rounded-lg my-2">
              <img
                src="../../Logout.svg"
                alt="logout"
                height={24}
                width={24}
                className="h-7 w-7"
                onClick={() => {
                  useLogoutMutation.mutate();
                }}
              />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
