'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import ThemeToggle from './ThemeToggle';
import { useConvexAuth } from 'convex/react';
import { Loader2 } from 'lucide-react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import Link from 'next/link';

const Navbar: FC = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div
            className={
                'fixed top-0 z-50 flex w-full items-center bg-background px-6 py-4 dark:bg-[#1f1f1f]'
            }
        >
            <h2 className='prose-h2: prose dark:text-blue-50 text-xl font-bold'>My Notion</h2>
            <div className='flex w-full items-center justify-between gap-x-2 md:ml-auto md:w-fit md:justify-end'>
                {isLoading && <Loader2 className='h-8 w-8 animate-spin' />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton>
                            <Button variant={'secondary'} size={'sm'}>
                                Log In
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant={'ghost'} size={'sm'}>
                            <Link href='/documents'>Enter MyNotion</Link>
                        </Button>
                        <UserButton afterSwitchSessionUrl='/' />
                    </>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
