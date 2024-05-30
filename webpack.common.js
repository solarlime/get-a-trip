import path, { dirname } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebPackPlugin from'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import getMinifiedClassName from './getMinifiedClassName.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = (mode) => ({
  mode: mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                ...((mode === 'production') ? {
                  getLocalIdent: (context, localIdentName, localName) => (
                    getMinifiedClassName(localName, context.resourcePath)
                  ),
                }: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                }),
                exportLocalsConvention: 'dashes',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    '@fullhuman/postcss-purgecss',
                    {
                      content: [
                        `${path.join(__dirname, "src")}/index.html`,
                        ...glob.sync(`${path.join(__dirname, "src")}/**/*.tsx`, { nodir: true }),
                      ],
                      variables: true,
                      safelist: {
                        deep: [/custom-/],
                      },
                    },
                  ]
                ],
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: { not: [/react/] }, // exclude react component if *.svg?react
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /react/, // *.svg?react
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({ prefix: 'import.meta.env.', systemvars: true }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new FaviconsWebpackPlugin({ logo: './public/favicon.svg', mode: 'webapp', devMode: 'light'}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});

export default config;
