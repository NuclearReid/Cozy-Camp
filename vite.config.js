import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import restart from 'vite-plugin-restart'
import glsl from 'vite-plugin-glsl'

export default {
    root: 'src/',
    publicDir: '../public/',
    optimizeDeps: {
    // exclude: ['problematic-dependency'] // run 'rm -rf node_modules/.vite' to clear the cache if vite is not working. This error 'The file does not exist at "/Users/monks/Documents/threejs/practice/Cozy-CampFire/node_modules/.vite/deps/chunk-5DVSGM7Q.js?v=313eda2c" which is in the optimize deps directory. The dependency might be incompatible with the dep optimizer. Try adding it to `optimizeDeps.exclude`.' 
    },
    plugins:
    [
        // Restart server on static/public file change
        restart({ restart: [ '../public/**', ] }),

        // React support
        react(),

        // GLSL Support,
        glsl(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
    ],
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
}