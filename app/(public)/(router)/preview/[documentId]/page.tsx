'use client';

import Cover from '@/app/_components/shared/Cover';
import Toolbar from '@/app/_components/shared/Toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

interface DocumentsIdPageProps {
    params: {
        documentId: Id<'documents'>;
    };
}
function DocumentsIdPage({ params }: DocumentsIdPageProps) {
    const Editor = useMemo(() => {
        return dynamic(() => import('@/app/_components/editor/Editor'), {
            ssr: false,
        });
    }, []);
    const router = useRouter();
    const document = useQuery(api.documents.getPublishedDocumentById, {
        documentId: params.documentId,
    });

    const update = useMutation(api.documents.updateDocument);
    const onChange = (content: string) => {
        update({ id: params.documentId, content });
    };

    useEffect(() => {
        if (!params.documentId) {
            router.push('/documents');
        }
    }, [params.documentId]);

    if (document === undefined)
        return (
            <div>
                <Cover.Skeleton />
                <div className='mx-auto mt-10 md:max-w-3xl lg:max-w-4xl'>
                    <div className='space-y-4 pl-8 pt-4'>
                        <Skeleton className='h-14 w-[50%]' />
                        <Skeleton className='h-4 w-[80%]' />
                        <Skeleton className='h-4 w-[40%]' />
                        <Skeleton className='h-4 w-[60%]' />
                    </div>
                </div>
            </div>
        );

    if (document === null) return <div>Document not found</div>;

    return (
        <div className='pb-40'>
            <Cover preview url={document.coverImage} />
            <div className='mx-auto md:max-w-3xl lg:max-w-4xl'>
                <Toolbar preview initialData={document} />
                <Editor
                    editable={false}
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
    );
}

export default DocumentsIdPage;
