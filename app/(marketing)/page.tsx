import HomeHeader from '../_components/home/HomeHeader';

const MarketingPage = () => {
    return (
        <div className='flex min-h-full flex-col dark:bg-[#1f1f1f]'>
            <div className='flex flex-1 flex-col items-center justify-center gap-y-8 text-center md:justify-start'>
                <HomeHeader />
            </div>
        </div>
    );
};
export default MarketingPage;
