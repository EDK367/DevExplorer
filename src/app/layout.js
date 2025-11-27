import './globals.css';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/Layout';
import I18nProvider from '@/components/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'DevExplorer',
    description: 'Your interactive journey into the world of modern software engineering.',
};

export default function RootLayout({ children }) {
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
