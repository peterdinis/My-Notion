'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react';
import Banner from '../documents/Banner';
import { Publish } from '../documents/Publisher';
import { Title } from '../documents/Title';
import { Menu } from '../documents/Menu';
import { MenuIcon } from 'lucide-react';

interface NavigationProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}
export function Navigation({ isCollapsed, onResetWidth }: NavigationProps) {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<'documents'>,
    });

    if (document === undefined)
        return (
            <nav className='flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1f1f1f]'>
                <Title.Skeleton />
                <div className='flex items-center gap-x-2'>
                    <Menu.Skeleton />
                </div>
            </nav>
        );
    if (!document) return <div>Document not found</div>;

    return (
        <>
            <nav className='flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1f1f1f]'>
                {isCollapsed && (
                    <MenuIcon
                        role='button'
                        onClick={onResetWidth}
                        className='h-6 w-6 text-muted-foreground'
                    />
                )}
                <div className='flex w-full items-center justify-between'>
                    <Title initialData={document} />
                    <div className='flex items-center gap-x-2'>
                        <Publish initialData={document} />
                        <Menu documentId={document._id} />
                    </div>
                </div>
            </nav>
            {document.isArchived && <Banner documentId={document._id} />}
        </>
    );
}
