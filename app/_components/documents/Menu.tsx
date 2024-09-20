"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { MoreHorizontal, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from '@/hooks/use-toast';

interface MenuProps {
    documentId: Id<'documents'>;
}

export const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const [isDeleted, setIsDeleted] = useState(false); // Track deletion state

    const archive = useMutation(api.documents.archiveDocument);

    const onArchive = async () => {
        setIsDeleted(true); // Trigger animation on delete

        const promise = archive({ id: documentId });
        
        toast({
            title: 'Archiving note...' + promise,
            duration: 2000,
            className: 'bg-green-800 font-bold text-xl',
        });

        // Wait for the animation to complete before redirecting
        setTimeout(() => {
            router.push('/documents');
        }, 300); // Adjust timeout based on animation duration
    };

    return (
        <AnimatePresence>
            {!isDeleted && (
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} // Exit animation
                    transition={{ duration: 0.3 }} // Animation timing
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size='sm' variant='ghost'>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className='w-60'
                            align='end'
                            alignOffset={8}
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className='mr-2 h-4 w-4' />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className='p-2 text-xs text-muted-foreground'>
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className='h-10 w-10' />;
};