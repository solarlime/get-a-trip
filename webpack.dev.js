import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const mode = 'development';

export default merge(common(mode), {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
    allowedHosts: 'all',
    hot: true,
  },
});
