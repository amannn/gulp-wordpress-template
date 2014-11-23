// Config
///////////////////////////////////////////////////////////////////////////////

var APP_FOLDER = 'wordpress',
    PHPMYADMIN_FOLDER = 'phpmyadmin',
    AUTOOPEN_ADMIN = false;

var SERVERS = {
  DEV: { // Use 0.0.0.0 for access on devices in the same wifi
    HOST: 'localhost',
    PORT: 3000
  },
  DEV_PHP: {
    HOST: 'localhost', // For PHP server that will be proxied to DEV
    PORT: 8000
  },
  ADMIN: { // phpMyAdmin
    HOST: 'localhost',
    PORT: 1337
  }
};


// Requires
///////////////////////////////////////////////////////////////////////////////

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    $           = require('gulp-load-plugins')();


// Main tasks
///////////////////////////////////////////////////////////////////////////////

gulp.task('serve', ['sass', 'connect', 'browser-sync', 'watch'], function() {
    console.log('*** browser sync active: ' + browserSync.active);
});
gulp.task('default', ['serve']);


// Sub tasks
///////////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
  browserSync({
    files: [APP_FOLDER + '/wp-content/**/*.css'],
    proxy: SERVERS.DEV_PHP.HOST + ':' + SERVERS.DEV_PHP.PORT,
    port: SERVERS.DEV.PORT,
    notify: false
  });
});

gulp.task('sass', function() {
  return gulp.src(APP_FOLDER + '/wp-content/**/*.scss')
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(APP_FOLDER + '/wp-content'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(APP_FOLDER + '/wp-content/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
  // Server for wordpress (will be proxied)
  $.connectPhp.server({
    base: APP_FOLDER,
    hostname: SERVERS.DEV_PHP.HOST,
    port: SERVERS.DEV_PHP.PORT
  });

  // Another server for phpMyAdmin, since connect-php doesn't support multiple bases
  $.connectPhp.server({
    base: PHPMYADMIN_FOLDER,
    open: AUTOOPEN_ADMIN,
    hostname: SERVERS.ADMIN.HOST,
    port: SERVERS.ADMIN.PORT
  });
});