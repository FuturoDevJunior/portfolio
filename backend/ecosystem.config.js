module.exports = {
  apps: [
    {
      name: 'devferreirag-api',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      combine_logs: true,
      error_file: 'logs/error.log',
      out_file: 'logs/out.log'
    }
  ]
}; 