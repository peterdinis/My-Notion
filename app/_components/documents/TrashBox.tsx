'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery } from 'convex/react';
import { Loader2, Search, Trash, Undo } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import ConfirmModel from '../models/ConfirmModel';

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.removeDocument);
    const remove = useMutation(api.documents.removeDocument);
    const { toast } = useToast();
    const [search, setSearch] = useState('');

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<'documents'>,
    ) => {
        event.stopPropagation();

        const promise = restore({ id: documentId });

        toast({
            title: 'Restoring note...' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });
    };

    const onRemove = (documentId: Id<'documents'>) => {
        const promise = remove({ id: documentId });

        toast({
            title: 'Deleting note...' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });

        if (params.documentId === documentId) {
            router.push('/documents');
        }
    };

    if (documents === undefined) {
        return (
            <div className='flex h-full items-center justify-center p-4'>
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }

    return (
        <div className='text-sm'>
            <div className='flex items-center gap-x-1 p-2'>
                <Search className='h-4 w-4' />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='h-7 bg-secondary px-2 focus-visible:ring-transparent'
                    placeholder='Search by note title...'
                />
            </div>
            <div className='mt-2 px-1 pb-1'>
                <p className='hidden pb-2 text-center text-xs text-muted-foreground last:block'>
                    No notes found.
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role='button'
                        onClick={() => onClick(document._id)}
                        className='flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5'
                    >
                        <span className='truncate pl-2'>{document.title}</span>
                        <div className='flex items-center'>
                            <div
                                role='button'
                                onClick={(e) => onRestore(e, document._id)}
                                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                            >
                                <Undo className='h-4 w-4 text-muted-foreground' />
                            </div>
                            <ConfirmModel
                                onConfirm={() => onRemove(document._id)}
                            >
                                <div
                                    role='button'
                                    className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                >
                                    <Trash className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </ConfirmModel>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
