'use client';
import { useCoverImage } from '@/app/_hooks/use-cover-image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

interface CoverProps {
    url?: string;
    preview?: boolean;
}
function Cover({ url, preview }: CoverProps) {
    const params = useParams();
    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            });
        }
        removeCoverImage({ id: params.documentId as Id<'documents'> });
    };
    return (
        <div
            className={cn(
                'group relative h-[35vh] w-full',
                !url && 'h-[12vh]',
                url && 'bg-muted',
            )}
        >
            {!!url && (
                <Image fill src={url} className='object-cover' alt='Cover' />
            )}
            {url && !preview && (
                <div className='absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100'>
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className='text-xs text-muted-foreground'
                        variant={'outline'}
                        size={'sm'}
                    >
                        <ImageIcon className='mr-2 h-4 w-4' />
                        Change Cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className='text-xs text-muted-foreground'
                        variant={'outline'}
                        size={'sm'}
                    >
                        <X className='mr-2 h-4 w-4' />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className='h-[12vh] w-full' />;
};
