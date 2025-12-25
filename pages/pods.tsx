import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from '@/styles/Dashboard.module.css';

export default function PodsPage() {
    const [pods, setPods] = useState<any[]>([]);

    useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.invoke('get-pods').then(setPods);
        }
    }, []);

    return (
        <DashboardLayout title="Pods">
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Namespace</th>
                            <th>Status</th>
                            <th>Restarts</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pods.map((pod) => (
                            <tr key={pod.name}>
                                <td>{pod.name}</td>
                                <td>{pod.namespace}</td>
                                <td>
                                    <span className={`${styles.status} ${pod.status === 'Running' ? styles.statusRunning : styles.statusPending}`}>
                                        {pod.status}
                                    </span>
                                </td>
                                <td>{pod.restarts}</td>
                                <td>{pod.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
