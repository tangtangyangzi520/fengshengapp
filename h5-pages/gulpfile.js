var config = require('./config');
var gulp = require('gulp'),
    // imagemin = require('gulp-imagemin'),
    // pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    proname = config.proName,
    base_url = './' + proname + '/',
    dev = true;

gulp.task('sprite', function() {
    var spriteData = gulp.src('./' + proname + '/images/**/*.+(jpeg|jpg|png)').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.less',
        cssFormat: 'css',
        padding: 10
    }));
    return spriteData.pipe(gulp.dest('./' + proname + '/styles'));
});