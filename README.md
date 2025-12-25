# KubeDash

KubeDash is a cross-platform Kubernetes dashboard application built with Electron and Next.js (TypeScript).

## Features

- **Cross-Platform**: Runs on macOS, Windows, and Linux.
- **Cluster Overview**: View cluster status and mock metrics.
- **Resource Management**: View Pods, Nodes, and Deployments.
- **Dark Mode**: Premium dark UI aesthetic.
- **Mock Backend**: Demonstrates IPC communication between Electron and Next.js with mock data.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the app in development mode (concurrently runs Next.js server and Electron window):

```bash
npm run dev
```

### Build

Package the application for distribution:

```bash
npm run build
```

The output executables/installers will be in the `dist/` directory.

## Project Structure

- `main/`: Electron main process and preload scripts.
- `pages/`: Next.js pages (Dashboard UI).
- `components/`: React components.
- `styles/`: CSS modules and global styles.
- `lib/`: Utility functions.
- `electron-builder.yml`: Configuration for packaging.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
