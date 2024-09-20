'use client';

import { useConvexAuth } from 'convex/react';
import { Loader2 } from 'lucide-react';

import { redirect } from 'next/navigation';
import { Sidebar } from '../_components/shared/Sidebar';
import SearchCommand from '../_components/commands/SearchCommand';

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return (
            <div className='flex h-full min-h-[100vh] items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }

    if (!isAuthenticated) {
        return redirect('/');
    }
    return (
        <div className='flex h-full dark:bg-[#1f1f1f]'>
            <Sidebar />
            <main className='h-full flex-1 overflow-y-auto'>
                <SearchCommand />
                {children}
            </main>
        </div>
    );
};

export default MainLayOut;
