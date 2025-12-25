const { ipcRenderer } = require('electron');

export const electronAPI = {
    invoke: (channel: string, data?: any) => {
        if (typeof window !== 'undefined' && window.electronAPI) {
            return window.electronAPI.invoke(channel, data);
        }
        // Fallback for dev mode in browser (mocking response if needed or just failing gracefully)
        console.warn('Electron API not found. Are you running in Electron?');
        return Promise.resolve(null);
    },
};
