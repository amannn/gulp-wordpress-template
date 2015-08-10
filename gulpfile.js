// Config
///////////////////////////////////////////////////////////////////////////////

var APP_FOLDER = 'wordpress',
    PHPMYADMIN_FOLDER = 'phpmyadmin',
    AUTOOPEN_ADMIN = false;

var SERVERS = {
  DEV: { // Use 0.0.0.0 for access on devices in the same wifi
    HOST: '127.0.0.1',
    PORT: 3000
  },
  DEV_PHP: {
    HOST: '127.0.0.1', // For PHP server that will be proxied to DEV
    PORT: 8000
  },
  ADMIN: { // phpMyAdmin
    HOST: '127.0.0.1',
    PORT: 1337
  }
};

var SASS = {
  IN: APP_FOLDER + '/wp-content/**/*.scss',
  OUT: APP_FOLDER + '/wp-content'
};

var FILES = {
  SASS: {
    IN: APP_FOLDER + '/wp-content/**/*.scss',
    OUT: APP_FOLDER + '/wp-content'
  }
};

var AUTOPREFIXER_OPTIONS = { browsers: ['last 2 versions'] };
var LIVE_RELOAD_FILES = [
  APP_FOLDER + '/wp-content/**/*.css',
  APP_FOLDER + '/wp-content/**/*.php'
];


// Requires
///////////////////////////////////////////////////////////////////////////////

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    $           = require('gulp-load-plugins')();


// Main tasks
///////////////////////////////////////////////////////////////////////////////

gulp.task('serve', ['sass', 'connect', 'browser-sync', 'watch']);
gulp.task('default', ['serve']);


// Sub tasks
///////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src(FILES.SASS.IN)
    .pipe($.sass())
    .pipe($.autoprefixer(AUTOPREFIXER_OPTIONS))
    .pipe(gulp.dest(FILES.SASS.OUT))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  // Watch for SASS compiling
  gulp.watch(FILES.SASS.IN, ['sass']);
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

gulp.task('browser-sync', function() {
  browserSync({
    files: LIVE_RELOAD_FILES,
    proxy: SERVERS.DEV_PHP.HOST + ':' + SERVERS.DEV_PHP.PORT,
    port: SERVERS.DEV.PORT,
    notify: false
  }, function (err, bs) {
      if (err)
        console.log(err);
      else
        console.log('BrowserSync is ready.');
  });
});