/** @type {import('next').NextConfig} */
import { resolve } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import Path from 'path';

const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    webpack: (config, context) => {
        config.plugins.push(
            new CopyPlugin({
              patterns: [
                {
                    context: 'posts',
                    from: '**/images/*.{jpg,png,jpeg,gif,svg}',
                    to({ context, absoluteFilename }) {
                        const relativePath = absoluteFilename.replace(context, '');
                        const [year, title, ...rest] = relativePath.split(Path.sep).filter(Boolean);
                        return resolve(`./public/${title}/${rest.join('/')}`);
                    },
                },
              ],
            }),
          new WriteFilePlugin()
        );
        return config;
    },
}


export default nextConfig;
