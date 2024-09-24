'use client';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { File } from 'lucide-react';
import UseSearch from '@/app/_hooks/use-search';
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command';

function SearchCommand() {
    const { user } = useUser();
    const router = useRouter();
    const searchDocuments = useQuery(api.documents.getSearch);
    const [ismounted, setismounted] = useState(false);

    const toggle = UseSearch((store) => store.onToggle);
    const isOpen = UseSearch((store) => store.isOpen);
    const onClose = UseSearch((store) => store.onClose);

    useEffect(() => {
        setismounted(true);
    }, []);

    // Wrap the 'down' function in useCallback to prevent it from being redefined on every render
    const down = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        },
        [toggle],
    );

    useEffect(() => {
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [down]);

    const handleSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    if (!ismounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={toggle}>
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Notion...`}
            ></CommandInput>

            <CommandList>
                <CommandEmpty>
                    <p>No results found.</p>
                </CommandEmpty>
                <CommandGroup heading='Documents'>
                    {searchDocuments?.map((doc) => (
                        <CommandItem
                            key={doc._id}
                            value={`${doc._id}`}
                            title={doc.title}
                            onSelect={handleSelect}
                        >
                            {doc.icon ? (
                                <p className='mr-2 text-[18px]'>{doc.icon}</p>
                            ) : (
                                <File className='mr-2 h-4 w-4' />
                            )}
                            <span> {doc.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

export default SearchCommand;
