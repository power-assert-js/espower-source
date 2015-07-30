var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var webserver = require('gulp-webserver');
var del = require('del');
var path = require('path');
var glob = require("glob");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var licensify = require('licensify');
var derequire = require('gulp-derequire');
var dereserve = require('gulp-dereserve');
var config = {
    jshint: {
        src: './index.js'
    },
    bundle: {
        standalone: 'espowerSource',
        srcFile: './index.js',
        destDir: './build',
        destName: 'espower-source.js'
    },
    test_bundle: {
        srcFile: './test/*test.js',
        destDir: './build',
        destName: 'test.js'
    },
    test: {
        base: './test/',
        pattern: '**/*test.js',
        browser: 'test/test-browser.html'
    }
};

function runMochaSimply() {
    return gulp
        .src(config.test.base + config.test.pattern, {read: false})
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'dot'
        }))
        .on('error', gutil.log);
}

gulp.task('webserver', function() {
    gulp.src(__dirname)
        .pipe(webserver({
            port: 9001,
            directoryListing: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(['index.js', 'test/**/*.js'], runMochaSimply);
    runMochaSimply();
});

gulp.task('clean_bundle', function (done) {
    del([path.join(config.bundle.destDir, config.bundle.destName)], done);
});

gulp.task('clean_test_bundle', function (done) {
    del([path.join(config.test_bundle.destDir, config.test_bundle.destName)], done);
});

gulp.task('bundle', ['clean_bundle'], function() {
    var b = browserify({entries: config.bundle.srcFile, standalone: config.bundle.standalone});
    b.plugin(licensify);
    return b.bundle()
        .pipe(source(config.bundle.destName))
        .pipe(dereserve())
        .pipe(derequire())
        .pipe(gulp.dest(config.bundle.destDir));
});

gulp.task('test_bundle', ['clean_test_bundle'], function() {
    var files = glob.sync(config.test_bundle.srcFile);
    var b = browserify({entries: files});
    b.transform('brfs');
    return b.bundle()
        .pipe(source(config.test_bundle.destName))
        .pipe(gulp.dest(config.test_bundle.destDir));
});

gulp.task('lint', function() {
    return gulp.src(config.jshint.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('unit', function () {
    return runMochaSimply();
});

gulp.task('test_browser', function () {
    return gulp
        .src(config.test.browser)
        .pipe(mochaPhantomJS({reporter: 'dot'}));
});

gulp.task('clean', ['clean_bundle', 'clean_test_bundle']);

gulp.task('test', ['unit','test_browser']);
