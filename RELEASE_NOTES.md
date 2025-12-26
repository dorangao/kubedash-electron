# Release v0.1.0 - Initial Alpha

🎉 **Initial release of KubeDash**, a cross-platform Kubernetes dashboard application built with Electron and Next.js.

## Key Features
- **Cross-Platform Support**: Ready to package for macOS (`.dmg`, `.zip`), Windows (`.exe`), and Linux (`.AppImage`).
- **Modern UI**: Built with **Next.js 14+** (Pages Router) and **React**, featuring a premium dark mode aesthetic.
- **Mock Kubernetes Backend**: Demonstrates secure IPC communication between Electron and React with mock data for Pods, Nodes, and Deployments.
- **Type-Safe**: Full **TypeScript** support across both main and renderer processes.
- **Secure Architecture**: Implements `contextBridge` for secure IPC exposure.

## Tech Stack
- **Electron** (v29+)
- **Next.js** (v14+)
- **TypeScript**
- **electron-builder**
- **lucide-react** for icons

## Getting Started
Clone the repo and run:
```bash
npm install
npm run dev
```

## Build
To create a production build for your OS:
```bash
npm run build
```
