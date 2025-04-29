import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            port: 5174,
        },
        plugins: [react(), tsconfigPaths()],
        define: {
            'process.env': env,
        },
    };
});
