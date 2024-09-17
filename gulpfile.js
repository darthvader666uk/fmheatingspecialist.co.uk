const gulp = require('gulp');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
// const del = require('del');

// Concat and minify CSS files
gulp.task('build-css', () => {
    return gulp.src('non-minified/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('css'));
});

// Concat and minify libraries JS files
gulp.task('build-vendor-js', () => {
    return gulp.src(['src/libs/jquery-1.8.3.min.js', 
                     'src/libs/jquery-ui-1.9.2.custom.min.js', 
                     'src/libs/jquery_ui_touch.js',
                     'src/libs/Math.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/libs'));
});

// Concat and minify application specific JS files
gulp.task('build-js', () => {
    return gulp.src('non-minified/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// gulp.task('clean', async () => {
//    return del.sync('build');
// });

// Start session
gulp.task("session-start", (cb) => {
    return gulp.series('build-css', 'build-js')(cb);
});

// static server and watching CSS/JS/HTML files for changes
gulp.task("server", (done) => {
  browsersync.init({
      server: './build',
      directory: true
  });

  // Watch for file changes
  gulp.watch('./src/css/*.css', gulp.series('session-start'), browsersync.reload);
  gulp.watch('./src/js/*.js', gulp.series('session-start'), browsersync.reload);
  gulp.watch('./src/libs/*.js', gulp.series('session-start'), browsersync.reload)

});

gulp.task('default', gulp.series('session-start'));