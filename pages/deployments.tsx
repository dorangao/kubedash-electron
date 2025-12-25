import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from '@/styles/Dashboard.module.css';

export default function DeploymentsPage() {
    const [deployments, setDeployments] = useState<any[]>([]);

    useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.invoke('get-deployments').then(setDeployments);
        }
    }, []);

    return (
        <DashboardLayout title="Deployments">
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Namespace</th>
                            <th>Replicas</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map((dep) => (
                            <tr key={dep.name}>
                                <td>{dep.name}</td>
                                <td>{dep.namespace}</td>
                                <td>{dep.replicas}</td>
                                <td>{dep.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
