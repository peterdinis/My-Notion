import HomeHeader from "../_components/home/HomeHeader";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1f1f1f]">
      <div
        className="flex flex-col items-center justify-center
      md:justify-start text-center gap-y-8 flex-1"
      >
        <HomeHeader/>
      </div>
    </div>
  );
};
export default MarketingPage;