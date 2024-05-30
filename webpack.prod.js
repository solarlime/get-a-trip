import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import common from './webpack.common.js';

const mode = 'production';

export default merge(common(mode), {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin(),
    ],
  },
});
