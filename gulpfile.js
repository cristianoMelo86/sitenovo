var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('concat-js', function() {
    return gulp.src('./src/js/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js'));
  });

// =============  SASS
gulp.task('sass', gulp.series(function(){
    return gulp.src('./src/scss/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./dist/css/'))
                .pipe(browserSync.stream());
 }));

 gulp.task('html', function(){
    return gulp.src('./src/*.html')
                .pipe(gulp.dest('./dist/'))
                .pipe(browserSync.stream());
 });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch("./src/scss/*.scss", gulp.series(['sass','html','concat-js']));
    gulp.watch("./src/*.html", gulp.series(['sass','html','concat-js'])).on('change', browserSync.reload);
});

