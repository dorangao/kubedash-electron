import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Server, Box, Layers } from 'lucide-react';
import styles from '../styles/Dashboard.module.css';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
    const router = useRouter();

    const navItems = [
        { href: '/', label: 'Overview', icon: LayoutDashboard },
        { href: '/pods', label: 'Pods', icon: Box },
        { href: '/nodes', label: 'Nodes', icon: Server },
        { href: '/deployments', label: 'Deployments', icon: Layers },
    ];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <Box size={28} /> KubeDash
                </div>
                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
            <main className={styles.content}>
                <h1 className={styles.header}>{title}</h1>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
