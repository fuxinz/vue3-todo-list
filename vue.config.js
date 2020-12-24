const path = require('path');
module.exports = {
    publicPath: '/todo-list',
    devServer: {
        proxy: {
            '/api': {
                logLevel: 'debug',
                target: ''
            }
        }
    },
    chainWebpack: (config) => {
        config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');
    },

    pluginOptions: {
        svgSprite: {
            dir: 'src/assets/svg',
            test: /\.svg$/,
            loaderOptions: {
                extract: false,
                symbolId: (file) =>
                    path
                        .relative(path.join(__dirname, 'src/assets/svg'), file)
                        .replace(/\\/g, '/')
                        .replace(/\.svg$/, '')
            },
            pluginOptions: {
                plainSprite: true
            }
        }
    }
};
