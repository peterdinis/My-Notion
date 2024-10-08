'use client';
import React, { useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/app/_hooks/use-cover-image';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SingleImageDropzone } from '../images/single-image-dropzone';

function CoverImageModel() {
    const params = useParams();
    const update = useMutation(api.documents.updateDocument);
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };
    const onChange = async (file?: File) => {
        if (file) {
            setFile(file);
            setIsSubmitting(true);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                },
            });
            await update({
                id: params.documentId as Id<'documents'>,
                coverImage: res.url,
            });

            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className='text-center text-lg font-semibold'>
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className='w-full outline-none'
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
}

export default CoverImageModel;
