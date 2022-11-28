const { app } = require('./app');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  app.listen(process.env.PORT, () => {
    console.log('App is running on port: ' + process.env.PORT || 3000);
  });
}
