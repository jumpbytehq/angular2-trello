/*jshint esversion: 6*/

import gulp  from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import browserify from 'browserify';
import source from 'vinyl-source-stream';



gulp.task('copy', () => {
    return gulp
        .src(['./client/**/*', '!./client/**/*.js'])
        .pipe(gulp.dest('./dist', {
            overwrite: true
        }));
});

gulp.task('transpile', ['copy'], () => {
    gulp.src(['./client/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('./dist', {
            overwrite: true
        }));
});

gulp.task('browserify', ['transpile'], function() {
    return browserify('./dist/app/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('server', ['browserify'], function() {
    nodemon({
        script: 'server/app.js',
        watch: ["server/"],
        ext: 'js'
    }).on('restart', () => {
    gulp.src('server.js')
      .pipe(notify('Running the start tasks and stuff'));
  });
});
 
// gulp.task('watch', () => {
//     gulp.watch('./*.js', ['transpile']);
// });
 
gulp.task('default', ['copy', 'transpile', 'browserify', 'server']);