var gulp = require('gulp'),
    base_url = './src/',
    Queue = require('gulp-queue')(gulp),
    queue = new Queue(),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

gulp.task("concat", function() {
    gulp.src([
        base_url + 'utils.js',
        base_url + 'bridge.js'
    ]).pipe(concat('fshtop.js')).pipe(gulp.dest('./dist/'));
})

gulp.task("min", function() {
    gulp.src([
        base_url + 'utils.js',
        base_url + 'bridge.js'
    ]).pipe(concat('fshtop.js')).pipe(minify({
        ext: {
            src: '.min.js',
            min: '.js'
        }
    })).pipe(gulp.dest('./dist/'));
})

gulp.task('default', ['concat'], function() {
    gulp.watch([base_url + '/*.js'], ['concat']);
});