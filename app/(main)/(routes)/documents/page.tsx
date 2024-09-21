'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/_hooks/use-toast';

function DocumentsPage() {
    const router = useRouter();
    const { user } = useUser();
    const createDocument = useMutation(api.documents.createDocument);
    const { toast } = useToast();
    const onCreateDocument = () => {
        const promise = createDocument({ title: 'Untitled' }).then(
            (documentId) => {
                router.push(`/documents/${documentId}`);
            },
        );

        toast({
            title: 'Create new node' + promise,
            duration: 2000,
            className: 'bg-green-800 text-white font-bold',
        });
    };

    return (
        <div className='flex min-h-[100vh] flex-col items-center justify-center space-y-4'>
            <h2 className='text-lg font-medium'>
                Welcom to {user?.firstName}&apos;s Notion
            </h2>
            <Button onClick={onCreateDocument}>
                <PlusCircle className='mr-2 h-4 w-4' />
                Create a Note
            </Button>
        </div>
    );
}

export default DocumentsPage;
