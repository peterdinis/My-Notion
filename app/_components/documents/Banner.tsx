'use client';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import ConfirmModel from '../models/ConfirmModel';

interface BannerProps {
    documentId: Id<'documents'>;
}

function Banner({ documentId }: BannerProps) {
    const { toast } = useToast();
    const router = useRouter();
    const removeDocument = useMutation(api.documents.removeDocument);
    const restoreDocument = useMutation(api.documents.restoreDocument);

    const onRemove = () => {
        const promise = removeDocument({ id: documentId });
        /* toast.promise(promise, {
      loading: "Removing Note...",
      success: "Note removed",
      error: "Failed to remove document",
    }); */
        toast({
            title: 'Remove note',
            duration: 2000,
            className: 'bg-red-800 text-white font-bold',
        });
        router.push('/documents');
    };

    const onRestore = () => {
        const promise = restoreDocument({ id: documentId });

        toast({
            title: 'Restore note',
            duration: 2000,
            className: 'bg-yellow-800 text-white font-bold',
        });
    };

    return (
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
    );
}

export default Banner;
