module.exports = function(grunt, options){
  return {
    build: {
      options: {
        proxy: 'localhost:8888',
        files: ['src/**/*'],
        watchTask: true,
        logLevel: 'info',
        logConnections: true,
        open: "ui-external",
        notify: false
      }
    }
  }
};