import { useLogout } from "@/services/mutations";

function Header({ title }: { title: string }) {
  const useLogoutMutation = useLogout();
  return (
    <div
      className="flex p-2 md:p-10 text-blue-50 font-semibold justify-between"
      style={{
        backgroundImage: 'url("../../Header-bg.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="md:text-2xl ml-8 text-base">{title}</div>
      <img
        src="../../Logo.svg"
        alt="logo"
        className="hidden md:block h-8 md:h-14 md:w-full md:justify-self-center flex-end md:-ml-40"
      />
      <div className="flex md:hidden top-0 right-10 gap-2">
        <h2 className="flex text-md cursor-pointer rounded-lg my-2">
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
  );
}

export default Header;
