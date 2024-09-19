import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NextPage } from "next";

const DocumentsPage: NextPage = () => {
    return (
        <div className="min-h-[100vh] flex flex-col items-center justify-center space-y-4">
         <h2 className="text-lg font-medium">
        Welcom to &apos;s MyNotion
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a Note
      </Button>
        </div>
    )
}

export default DocumentsPage