import { FC } from 'react';
import HomeHeader from './HomeHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HomeWrapper: FC = () => {
    return (
        <div className='flex min-h-full flex-col dark:bg-[#1f1f1f]'>
            <div className='mt-20 flex flex-1 flex-col items-center justify-center gap-y-8 text-center md:justify-start'>
                <HomeHeader />
                <Button asChild>
                    <Link href='/documents'>
                        Get Started
                        <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default HomeWrapper;
