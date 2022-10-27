const path = require('path');

const MODE = process.env.WEBPACK_ENV;
//__dirname은 NodeJS에서 현재 프로젝트 디렉터리를 의미합니다.
//const ENTRY_FILE = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.join(__dirname, 'dist');

const config = {
  entry: {
    //웹팩은 다른 모듈을 사용하고 있는 최상위 자바스크립트 파일이 어디에 있는지 알아야 하며, 설정 파일에서 이를 Entry 속성으로 명시합니다.
    app: './src/App.js',
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        //웹팩은 자바스크립트 뿐만 아니라, Loader를 이용하여 CSS나 이미지, 웹폰트, JSX, VUE 등 다양한 종류의 파일을 함께 번들링할 수 있습니다.
        use: [
          {
            loader: 'style-loader',
            options: { attributes: { id: 'hn-accessibility' } },
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader',
      },
    ],
  },
  output: {
    //Output 설정은 항상 프로젝트 디렉터리 내부라는 보장이 없으므로 절대 경로로 하는 점에 주의 바랍니다.
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
};

module.exports = config;
