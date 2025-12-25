import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import styles from '@/styles/Dashboard.module.css';
// import { electronAPI } from '@/lib/electron'; // Can use directly window.electronAPI

export default function Home() {
  const [clusterInfo, setClusterInfo] = useState<any>(null);
  const [stats, setStats] = useState({ nodes: 0, pods: 0, deployments: 0 });

  useEffect(() => {
    if (window.electronAPI) {
      const fetchData = async () => {
        const info = await window.electronAPI.invoke('get-cluster-info');
        const nodes = await window.electronAPI.invoke('get-nodes');
        const pods = await window.electronAPI.invoke('get-pods');
        const deployments = await window.electronAPI.invoke('get-deployments');

        setClusterInfo(info);
        setStats({
          nodes: nodes.length,
          pods: pods.length,
          deployments: deployments.length
        });
      };

      fetchData();
    }
  }, []);

  return (
    <DashboardLayout title="Cluster Overview">
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Cluster Name</div>
          <div className={styles.cardValue}>{clusterInfo?.name || 'Loading...'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Status</div>
          <div className={`${styles.cardValue} ${styles.status} ${styles.statusActive}`} style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {clusterInfo?.status || 'N/A'}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Version</div>
          <div className={styles.cardValue}>{clusterInfo?.version || '...'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Server</div>
          <div className={styles.cardValue} style={{ fontSize: '1rem' }}>{clusterInfo?.server}</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Resource Summary</h2>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Total Nodes</div>
          <div className={styles.cardValue}>{stats.nodes}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Total Pods</div>
          <div className={styles.cardValue}>{stats.pods}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Deployments</div>
          <div className={styles.cardValue}>{stats.deployments}</div>
        </div>
      </div>

    </DashboardLayout>
  );
}
