module.exports = {
  apps : [{
    name: 'express-template',
    script: './dist/app.js',
    log_date_format: "YYYY-MM-DD HH:mm Z",
    output: "./log/out.log",
    error: "./log/error.log",
    merge_logs: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    },
  }]
};
