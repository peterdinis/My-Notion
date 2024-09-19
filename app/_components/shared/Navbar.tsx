import { Button } from "@/components/ui/button";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar: FC = () => {
  return (
    <div
      className={
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full px-6 py-4 "
      }
    >
        <h2 className="prose prose-h2: font-bold text-xl">My Notion</h2>
        <div className="md:ml-auto md:justify-end flex justify-between items-center md:w-fit w-full gap-x-2">
            <Button variant={"default"} size={"sm"} className="text-xl">Login</Button>
            <ThemeToggle />
        </div>
    </div>
  );
};

export default Navbar;
