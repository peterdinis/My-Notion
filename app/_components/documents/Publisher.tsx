'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { Check, Copy, Globe } from 'lucide-react';
import { useToast } from '@/app/_hooks/use-toast';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import useOrigin from '@/app/_hooks/use-origin';

interface PublishProps {
    initialData: Doc<'documents'>;
}

export const Publish = ({ initialData }: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.updateDocument);
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        }).finally(() => setIsSubmitting(false));

        toast({
            title: 'Publishing note...' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });
    };

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        }).finally(() => setIsSubmitting(false));

        toast({
            title: 'Unpublishing note...' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='sm' variant='ghost'>
                    Publish{' '}
                    {initialData.isPublished && (
                        <Globe className='ml-2 h-4 w-4 text-sky-500' />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-72'
                align='end'
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className='space-y-4'>
                        <div className='flex items-center gap-x-2'>
                            <Globe className='h-4 w-4 animate-pulse text-sky-500' />
                            <p className='text-xs font-medium text-sky-500'>
                                This note is live on web.
                            </p>
                        </div>
                        <div className='flex items-center'>
                            <input
                                value={url}
                                className='h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs'
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className='h-8 rounded-l-none'
                            >
                                {copied ? (
                                    <Check className='h-4 w-4' />
                                ) : (
                                    <Copy className='h-4 w-4' />
                                )}
                            </Button>
                        </div>
                        <Button
                            size='sm'
                            className='w-full text-xs'
                            disabled={isSubmitting}
                            onClick={onUnpublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center'>
                        <Globe className='mb-2 h-8 w-8 text-muted-foreground' />
                        <p className='mb-2 text-sm font-medium'>
                            Publish this note
                        </p>
                        <span className='mb-4 text-xs text-muted-foreground'>
                            Share your work with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className='w-full text-xs'
                            size='sm'
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};
