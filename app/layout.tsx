import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Domine} from 'next/font/google';
import './globals.css';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { cn } from '@/lib/utils';
import ConvexClientProvider from './_components/shared/providers/ConvexClerkProvider';
import { ThemeProvider } from './_components/shared/providers/ThemeProvider';
import { ModelProvider } from './_components/shared/providers/ModelProvider';

const inter = Domine({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MyNotion',
    description: 'The Connecting workspace where better, faster work happens',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='dark:bg-[#1f1f1f]' suppressHydrationWarning>
            <body className={cn(inter.className, 'dark:bg-[#1f1f1f]')}>
                <ConvexClientProvider>
                    <EdgeStoreProvider>
                        <ThemeProvider
                            attribute='class'
                            enableSystem
                            defaultTheme='system'
                            disableTransitionOnChange
                            storageKey='myNotionKey'
                        >
                            <Toaster />
                            <ModelProvider />
                            {children}
                        </ThemeProvider>
                    </EdgeStoreProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
