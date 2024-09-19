import { NextPage } from "next"
import HomeWrapper from "./_components/home/HomeWrapper"

const Homepage: NextPage = () => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <main className="h-full pt-32">
          <HomeWrapper />
      </main>
    </div>
  )
}

export default Homepage