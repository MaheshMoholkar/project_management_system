import { Link, useLocation } from "react-router-dom";

function BottomNav() {
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
      <div className="flex fixed bottom-0 bg-white w-full rounded-t-lg">
        <div className="flex justify-evenly w-full">
          {menuList.map((menu, index) => (
            <div className="flex" key={index}>
              <Link
                to={menu.path}
                className={`flex gap-3 p-3 text-md text-slate-500 cursor-pointer mr-2 border-l-8 border-white ${
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
                  className="h-5 w-5"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BottomNav;
