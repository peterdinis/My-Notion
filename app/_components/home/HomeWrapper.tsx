import { FC } from "react";
import HomeHeader from "./HomeHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

const HomeWrapper: FC = () => {
    return (
        <div className="min-h-full flex flex-col dark:bg-[#1f1f1f]">
           <div className="flex flex-col mt-20 items-center justify-center md:justify-start text-center gap-y-8 flex-1">    
                <HomeHeader />
                <Button asChild>
          <Link href="/documents">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
           </div>
        </div>
    )
}

export default HomeWrapper;