import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const getTitleFromPath = (path: string) => {
    const words = path.slice(1).split(/[-_]/);
    return words
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get the title from the current location
  const title = getTitleFromPath(location.pathname);
  return (
    <div className="flex h-screen">
      <div className="md:w-16 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="fixed md:hidden">
        <BottomNav />
      </div>
      <div className="flex flex-col flex-1 md:ml-16 bg-slate-100 dashboard-container overflow-x-auto h-screen">
        <Header title={title} />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
