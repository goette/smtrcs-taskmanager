var gulp = require('gulp'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    autoprefixer = require('gulp-autoprefixer'),
    assign = require('object-assign'),
    livereload = require('gulp-livereload'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source =  require('vinyl-source-stream'),
    jest = require('jest-cli'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

/**
 * All relevant file paths used in this Gulpfile
 */
var paths = {
    appJs: './public/js/app.js',
    jsFolder: 'public/js',
    jsTests: ['public/js/stores/__tests__/*.js','public/js/bundle.js'],
    jsToCompress: ['public/js/_vendor/jquery.js','public/js/_vendor/highcharts.js','public/js/bundle.js'],
    dist: 'public/dist',
    scssFiles: 'public/scss/**/*.scss',
    scssMain: 'public/scss/main.scss',
    cssFolder: 'public/css',
    cssMain: 'public/css/main.css'
};

/**
 * Custom error log function for sass and browserify to not break things when an error occurs
 * @param err
 */
function logAndIgnoreError(err) {
  console.log(err.toString());
  this.emit('end');
}

/**
 * This task takes all commonjs modules and browserifys them in on file: bundle.js
 * Watchify makes sure only the parts that changed get re-compiled, which makes everything
 * much faster
 */
gulp.task('browserify', function() {
    var bundler = watchify(browserify(paths.appJs, assign(watchify.args, {
        fullPaths: false
    })));
    bundler.on('update', rebundle);
    function rebundle () {
        return bundler.transform(reactify).bundle()
            .on('error', logAndIgnoreError)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.jsFolder))
            .pipe(livereload());
    }
    return rebundle();
});

/*
 * Compile Sass to css using node-sass and autoprefix automatically for the given browsers
 */
gulp.task('sass', function () {
    return gulp.src(paths.scssMain)
        .pipe(sass())
		.on('error', logAndIgnoreError)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.cssFolder))
        .pipe(livereload());
});

/*
 * First browserify then start the watching; make livereload listen for changes
 * This only affects since the js watching is handled by the browserify task already
 * One could also run the tests on every change, but we don't want that
 */
gulp.task('watch', ['browserify'], function () {
    livereload.listen();
    gulp.watch(paths.scssFiles, ['sass']);
    //gulp.watch(paths.jsTests, ['test']);
});

/*
 * Uglify JS to one minified file in dist/app.min.js
 */
gulp.task('compress', function() {
    gulp.src(paths.jsToCompress)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

/*
 * Manually run the tests with 'gulp test'
 */
gulp.task('test', shell.task('npm test'));

/**
 * Run 'gulp' to run SASS, Browserify and start the watch process
 */
gulp.task('default', ['sass','watch']);