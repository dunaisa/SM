const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js'], // Разрешаем импорт .ts и .js файлов
    },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Обрабатываем .ts файлы
        use: 'babel-loader', // Используем babel-loader
        exclude: /node_modules/,
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // Для dev
        }
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]', // Для dev
        }
      },
      {
        test: /\.scss$/, // Регулярное выражение для файлов .scss
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: true,
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },       
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'styles.css', // Имя выходного CSS файла
        }),
  ]
};
