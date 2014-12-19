var gulp = require('gulp'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source =  require('vinyl-source-stream'),
    jest = require('jest-cli'),
    historyApiFallback = require('connect-history-api-fallback');

var paths = {
    appJs: './public/js/app.js',
    jsFolder: 'public/js',
    jsFiles: ['public/js/**/*.js', '!public/js/bundle.js','!public/js/_backup/**/*.js'],
    jsTests: ['public/js/stores/__tests__/*.js','public/js/bundle.js'],
    scssFiles: 'public/scss/**/*.scss',
    scssMain: 'public/scss/main.scss',
    cssFolder: 'public/css',
    cssMain: 'public/css/main.css'
};

function logAndIgnoreError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync({
        open: false,
        server: {
            baseDir: './public'
        }
        //proxy: 'frontend.local/app/public/'
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
            .on('error', logAndIgnoreError)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.jsFolder))
            .pipe(browserSync.reload({stream: true}));;
    }

    return rebundle();
});

gulp.task('sass', function () {
    return gulp.src(paths.scssMain)
        .pipe(sass())
		.on('error', logAndIgnoreError)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.cssFolder))
        .pipe(browserSync.reload({stream: true}));;
});

gulp.task('watch', ['browser-sync','browserify'], function () {
    gulp.watch(paths.scssFiles, ['sass']);
    //gulp.watch(paths.jsTests, ['test']);
});

gulp.task('test', shell.task('npm test'));
gulp.task('default', ['sass','watch']);
