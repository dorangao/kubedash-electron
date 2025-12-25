import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from '@/styles/Dashboard.module.css';

export default function NodesPage() {
    const [nodes, setNodes] = useState<any[]>([]);

    useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.invoke('get-nodes').then(setNodes);
        }
    }, []);

    return (
        <DashboardLayout title="Nodes">
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodes.map((node) => (
                            <tr key={node.name}>
                                <td>{node.name}</td>
                                <td>{node.role}</td>
                                <td>
                                    <span className={`${styles.status} ${node.status === 'Ready' ? styles.statusReady : styles.statusNotReady}`}>
                                        {node.status}
                                    </span>
                                </td>
                                <td>{node.version}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
