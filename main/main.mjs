import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import serve from 'electron-serve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock Data
const MOCK_NODES = [
    { name: 'worker-node-1', status: 'Ready', role: 'worker', version: 'v1.29.0' },
    { name: 'worker-node-2', status: 'Ready', role: 'worker', version: 'v1.29.0' },
    { name: 'control-plane', status: 'Ready', role: 'control-plane', version: 'v1.29.0' },
    { name: 'worker-node-3', status: 'NotReady', role: 'worker', version: 'v1.29.0' },
];

const MOCK_PODS = [
    { name: 'nginx-deployment-574b87c764-x9z4q', namespace: 'default', status: 'Running', restarts: 0, age: '2d' },
    { name: 'coredns-76f75df574-2h9z8', namespace: 'kube-system', status: 'Running', restarts: 0, age: '5d' },
    { name: 'coredns-76f75df574-8b6v2', namespace: 'kube-system', status: 'Running', restarts: 1, age: '5d' },
    { name: 'redis-master-0', namespace: 'default', status: 'Pending', restarts: 0, age: '1m' },
];

const MOCK_DEPLOYMENTS = [
    { name: 'nginx-deployment', namespace: 'default', replicas: '3/3', age: '2d' },
    { name: 'redis-cluster', namespace: 'default', replicas: '0/1', age: '1m' },
];

// IPC Handlers
ipcMain.handle('get-cluster-info', async () => {
    return {
        name: 'minikube-local',
        server: 'https://127.0.0.1:8443',
        status: 'Active',
        version: 'v1.29.0'
    };
});

ipcMain.handle('get-nodes', async () => {
    return MOCK_NODES;
});

ipcMain.handle('get-pods', async () => {
    return MOCK_PODS;
});

ipcMain.handle('get-deployments', async () => {
    return MOCK_DEPLOYMENTS;
});

const isProd = app.isPackaged;
const serveApp = isProd ? serve({ directory: path.join(__dirname, '../out') }) : null;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    if (isProd) {
        serveApp(win).then(() => {
            win.loadURL('app://-');
        });
    } else {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
        win.webContents.on('did-fail-load', () => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
