import { copyFileSync, mkdirSync, cpSync, existsSync } from 'fs';
import { join } from 'path';
import { build } from 'esbuild';

const distDir = 'dist';
const publicDir = join(distDir, 'public');

mkdirSync(publicDir, { recursive: true });

copyFileSync('client/index.html', join(publicDir, 'index.html'));

if (existsSync('client/assets')) {
  cpSync('client/assets', join(publicDir, 'assets'), { recursive: true });
}

await build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  external: [
    'pg-native',
    'vite',
    '@replit/vite-plugin-cartographer',
    '@replit/vite-plugin-dev-banner',
    '@replit/vite-plugin-runtime-error-modal',
    '@vitejs/plugin-react',
    'lightningcss',
    'esbuild',
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

console.log('Build complete!');
