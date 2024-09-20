'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ConfirmModel from '../models/ConfirmModel';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerProps {
    documentId: Id<'documents'>;
}

function Banner({ documentId }: BannerProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleted, setIsDeleted] = useState(false); // Track deletion state
    const removeDocument = useMutation(api.documents.removeDocument);
    const restoreDocument = useMutation(api.documents.restoreDocument);

    const onRemove = async () => {
        setIsDeleted(true); // Trigger animation on delete

        const promise = removeDocument({ id: documentId });
        toast({
            title: 'Removing note...' + promise,
            duration: 2000,
            className: 'bg-red-800 text-white font-bold',
        });

        // Wait for the animation to complete before navigating
        setTimeout(() => {
            router.push('/documents');
        }, 300); // Adjust the duration based on the animation timing
    };

    const onRestore = async () => {
        const promise = restoreDocument({ id: documentId });

        toast({
            title: 'Restoring note...' + promise,
            duration: 2000,
            className: 'bg-yellow-800 text-white font-bold',
        });
    };

    return (
        <AnimatePresence>
            {!isDeleted && (
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} // Exit animation
                    transition={{ duration: 0.3 }} // Animation duration
                >
                    <div className='flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white'>
                        <p>This Page is In Trash.</p>
                        <Button
                            size={'sm'}
                            onClick={onRestore}
                            variant={'outline'}
                            className='h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white'
                        >
                            Restore Page
                        </Button>
                        <ConfirmModel onConfirm={onRemove}>
                            <Button
                                size={'sm'}
                                variant={'outline'}
                                className='h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white'
                            >
                                Delete Forever
                            </Button>
                        </ConfirmModel>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Banner;