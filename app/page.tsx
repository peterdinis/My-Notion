import { NextPage } from "next"
import HomeWrapper from "./_components/home/HomeWrapper"
import Navbar from "./_components/shared/Navbar"

const Homepage: NextPage = () => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full pt-32">
          <HomeWrapper />
      </main>
    </div>
  )
}

export default Homepage