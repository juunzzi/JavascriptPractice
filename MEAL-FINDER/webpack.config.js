const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/app.js",
  },
  mode: "none",

  // 번들링 된 파일이 생성될 위치 설정 dist/main.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  // 적용할 플러그인 목록
  plugins: [new CleanWebpackPlugin()],
};
