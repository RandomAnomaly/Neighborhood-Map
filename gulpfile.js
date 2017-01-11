var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    del = require('del'),
    stylish = require('jshint-stylish'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    minifycss = require('gulp-minify-css');


// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('uglify', 'copy-images');
});

// clean
gulp.task('clean', function () {
    return del(['dist']);
});

// copy images
gulp.task('copy-images', function () {
    gulp.src('./dev/bin/**/*.jpg')
        .pipe(gulp.dest('./dist/bin'));
});

// jshint
gulp.task('jshint', function () {
    return gulp.src('./dev/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

//uglify
gulp.task('uglify', ['jshint'], function () {
    return gulp.src('./dev/**/*.html')
        .pipe(usemin({
            css: [minifycss(), rev()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Watch
gulp.task('watch', ['browser-sync'], function () {
    // watch .js files
    gulp.watch('{./dev/scripts/**/*.js,./dev/styles/**/*.css,./dev/**/*.html}',
        ['uglify']);

    // Watch image files
    gulp.watch('./dev/bin/**/*');
});

// sync
gulp.task('browser-sync', ['default'], function () {
    var files = [
        './dev/**/*.html',
        './dev/styles/**/*.css',
        './dev/bin/**/*.jpg',
        './dev/scripts/**/*.js',
        './dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "dist",
            index: "index.html"
        },
        reloadDelay: 1000
    });

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});