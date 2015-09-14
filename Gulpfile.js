var gulp = require('gulp'),
    $    = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'browser-sync']
    });

gulp.task('clean', function (cb) {
  $.del('public')
    .then(function (paths) {
      console.log('Deleted files/folders:\n', paths.join('\n'));
      cb();
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'join' of undefined") {
        console.log("Probably nothing to delete... let's keep going, shall we?");
        cb();
      } else {
        console.log("del error: ", err);
      }
    });
});

gulp.task('jade:dev', function () {
  gulp
    .src(['src/**/*.jade', '!src/**/_*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('sass:dev', function () {
  gulp
    .src('src/main.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('js:dev', function () {
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('public'));
});

gulp.task('browser-sync', function() {
    $.browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('copy', function () {
  // gulp.src('src/CNAME')
  //   .pipe(gulp.dest('public'));
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('public/assets'));
});

gulp.task('build:dev', ['jade:dev', 'sass:dev', 'js:dev', 'copy']);

gulp.task('serve', ['build:dev'], function () {
  gulp.start('browser-sync');
  gulp.watch(['src/*.jade'], ['jade:dev']).on('change', $.browserSync.reload);
  gulp.watch(['src/**/*.scss'], ['sass:dev']).on('change', $.browserSync.reload);
  gulp.watch(['src/**/*.js'], ['js:dev']).on('change', $.browserSync.reload);
  gulp.watch(['src/assets/*.*'], ['copy']).on('change', $.browserSync.reload);
});

gulp.task('default', ['clean'], function () {
  gulp.start('serve');
});
