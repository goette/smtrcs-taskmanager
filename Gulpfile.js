var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync =require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source =  require('vinyl-source-stream');

var paths = {
    appJs: './public/js/app.js',
    jsFolder: 'public/js',
    jsFiles: ['public/js/**/*.js', '!public/js/bundle.js'],
    scssFiles: 'public/scss/**/*.scss',
    scssMain: 'public/scss/main.scss',
    cssFolder: 'public/css',
    cssMain: 'public/css/main.css'
};

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
    // Browserify/bundle the JS.
    var bundler = watchify(browserify(paths.appJs, watchify.args));

    bundler.transform('reactify');
    bundler.on('update', rebundle);

    function rebundle () {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.jsFolder));
    }
});

gulp.task('sass', function () {
    return gulp.src(paths.scssMain)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.cssFolder));
        //.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {
    /*browserSync({
        server: {
            baseDir: './app/dashboard_suite/public'
        }
    });*/

    gulp.watch(paths.scssFiles, ['sass']);
    gulp.watch(paths.jsFiles, ['js']);
});

gulp.task('default', ['serve']);