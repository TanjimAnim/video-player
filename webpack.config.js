const path = require("path");

module.exports = {
  loaders: [
    {
      test: /\.html$/,
      loader: "html-loader?attrs[]=video:src",
    },
    {
      test: /\.mp4$/,
      loader: "url-loader?limit=10000&mimetype=video/mp4",
    },
  ],
};
