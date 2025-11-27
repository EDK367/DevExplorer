import '@/app/styles/globals.css'
import { Inter } from 'next/font/google';
import { Layout } from '@/components/Layout'
import I18nProvider from '@/components/I18nProvider';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'DevExplorer',
    description: 'Your interactive journey into the world of modern software engineering.',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <I18nProvider>
                    <Layout>
                        {children}
                    </Layout>
                </I18nProvider>
            </body>
        </html>
    );
}