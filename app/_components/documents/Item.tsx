'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/app/_hooks/use-toast';
import {
    type LucideIcon,
    ChevronDown,
    ChevronRight,
    Plus,
    MoreHorizontal,
    Trash,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { cn } from '@/lib/utils';

interface ItemProps {
    id?: Id<'documents'>;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {
    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.createDocument);
    const archive = useMutation(api.documents.archiveDocument);
    const { toast } = useToast();
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        const promise = create({ title: 'Untitled', parentDocument: id }).then(
            (documentId) => {
                if (!expanded) {
                    onExpand?.();
                }

                router.push(`/documents/${documentId}`);
            },
        );

        toast({
            title: 'Creating a new note...' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });
    };

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        const promise = archive({ id }).then(() => router.push('/documents'));

        toast({
            title: 'Archiving a new note...' + promise,
            duration: 2000,
            className: 'bg-yellow-800 text-white font-bold text-xl',
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                role='button'
                onClick={onClick}
                style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
                className={cn(
                    'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
                    active && 'bg-primary/5 text-primary',
                )}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                {!!id && (
                    <div
                        role='button'
                        className='mr-1 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
                        onClick={handleExpand}
                    >
                        <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
                    </div>
                )}
                {documentIcon ? (
                    <div className='mr-2 shrink-0 text-[18px]'>
                        {documentIcon}
                    </div>
                ) : (
                    <Icon className='mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground' />
                )}
                <span className='truncate'>{label}</span>
                {isSearch && (
                    <kbd className='pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                        <span className='text-xs'>⌘</span>K
                    </kbd>
                )}
                {!!id && (
                    <div className='z-100000 ml-auto flex items-center gap-x-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    role='button'
                                    className='ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600'
                                >
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-60'
                                align='start'
                                side='right'
                                forceMount
                            >
                                <DropdownMenuItem
                                    className='z-1000000'
                                    onClick={onArchive}
                                >
                                    <Trash className='mr-2 h-4 w-4' />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className='p-2 text-xs text-muted-foreground'>
                                    Last edited by: {user?.fullName}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div
                            role='button'
                            className='ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600'
                            onClick={onCreate}
                        >
                            <Plus className='h-4 w-4 text-muted-foreground' />
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
            className='flex gap-x-2 py-[3px]'
        >
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-[30%]' />
        </div>
    );
};
