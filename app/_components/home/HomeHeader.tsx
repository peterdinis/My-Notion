import { FC } from 'react';

const HomeHeader: FC = () => {
    return (
        <div className='max-w-3xl space-y-3'>
            <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl'>
                Your Ideas, Documents & Workspaces In One Place. Welcome to
                <span className='ml-1 underline'>My Notion</span>
            </h1>
            <h3 className='text-base font-medium sm:text-xl md:text-2xl'>
                The connecting workspace where
                <br /> better, faster work happens
            </h3>
        </div>
    );
};

export default HomeHeader;
