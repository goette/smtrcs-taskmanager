var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var reactify = require('reactify');
var source =  require('vinyl-source-stream');
var jest = require('jest-cli');

var paths = {
    appJs: './public/js/app.js',
    jsFolder: 'public/js',
    jsFiles: ['public/js/**/*.js', '!public/js/bundle.js'],
    scssFiles: 'public/scss/**/*.scss',
    scssMain: 'public/scss/main.scss',
    cssFolder: 'public/css',
    cssMain: 'public/css/main.css'
};

gulp.task('browser-sync', function() {
    browserSync({
        open: false,
        server: {
            baseDir: "./public"
        }
    });
});

// Wrap bs-reload in it's own task, it's needed sometimes
gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('browserify', function() {
    // Browserify/bundle the JS.
    var bundler = watchify(browserify(paths.appJs, watchify.args));

    bundler.on('update', rebundle);

    function rebundle () {
        return bundler.transform(reactify).bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.jsFolder))
            .pipe(browserSync.reload({stream: true}));;
    }

    return rebundle();
});

gulp.task('sass', function () {
    return gulp.src(paths.scssMain)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.cssFolder))
        .pipe(browserSync.reload({stream: true}));;
});

gulp.task('watch', ['browser-sync','browserify'], function () {
    gulp.watch(paths.scssFiles, ['sass']);
});

gulp.task('test', shell.task('npm test'));

gulp.task('default', ['sass','watch']);