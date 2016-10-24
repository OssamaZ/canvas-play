
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');


var webpackConfig = require('./webpack.config.dev'),
    bundler = webpack(webpackConfig);

gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer("last 3 versions", "> 1%", "ie 8", "ie 7"))
    .pipe(maps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
       stream: true
    }));
});

gulp.task('watch', ['default'], function(){
  runBrowserSync();
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./public/index.html', browserSync.reload);
});

gulp.task('default', function(){});

function runBrowserSync() {
  /**
  * Run Browsersync and use middleware for Hot Module Replacement
  */
  browserSync({
    server: {
      baseDir: 'public',
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,
          noInfo: true,
          // pretty colored output
          stats: { colors: true }
          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    },
    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'public/css/*.css',
      'public/*.html'
    ]
  });
}
