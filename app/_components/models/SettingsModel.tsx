'use clinent';

import { useSettings } from '@/app/_hooks/use-settings';
import ThemeToggle from '../shared/ThemeToggle';
import { DialogHeader, Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export const SettingsModel = () => {
    const setting = useSettings();
    return (
        <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
            <DialogContent>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-lg font-medium'>My Setting</h2>
                </DialogHeader>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1'>
                        <Label>Appearance</Label>
                        <span className='text-[.8rem] text-muted-foreground'>
                            Customize Your Notion Appearance
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};
