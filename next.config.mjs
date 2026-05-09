import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

// The project lives inside a OneDrive-synced folder, which races webpack's
// persistent-cache file rename ("0.pack.gz_" -> "0.pack.gz") and produces
// `Caching failed for pack: ENOENT ...rename...` warnings.
//
// Fix: relocate the webpack cache to %LOCALAPPDATA% (Windows) or ~/.cache
// (POSIX), so OneDrive never sees it. The project hash keeps caches isolated
// per-project on the same machine.
function externalCacheDir() {
  const home = os.homedir();
  const base =
    process.env.LOCALAPPDATA ||
    (process.platform === 'win32' ? path.join(home, 'AppData', 'Local') : path.join(home, '.cache'));

  const projectHash = crypto
    .createHash('md5')
    .update(process.cwd())
    .digest('hex')
    .slice(0, 10);

  return path.join(base, 'NextCache', `webpack-${projectHash}`);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion'],
  },
  webpack: (config, { dev, isServer }) => {
    if (config.cache && typeof config.cache === 'object' && config.cache.type === 'filesystem') {
      const dir = externalCacheDir();
      config.cache.cacheDirectory = path.join(
        dir,
        dev ? 'dev' : 'prod',
        isServer ? 'server' : 'client'
      );
    }
    return config;
  },
};

export default nextConfig;
