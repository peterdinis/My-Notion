import { useRouter } from 'next/navigation';

import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { MoreHorizontal, Trash } from 'lucide-react';

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

    const archive = useMutation(api.documents.archiveDocument);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast({
            title: 'Archiving note...' + promise,
            duration: 2000,
            className: 'bg-green-800 font-bold text-xl',
        });

        router.push('/documents');
    };
    return (
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
                <DropdownMenuItem className="z-100000" onClick={onArchive}>
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='p-2 text-xs text-muted-foreground'>
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className='h-10 w-10' />;
};
