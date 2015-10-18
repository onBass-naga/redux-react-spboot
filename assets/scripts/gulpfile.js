
// modules
var _ = require('lodash');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var distConfig = _.assign({}, webpackConfig, {
    output: {
        path: './../../src/main/resources/static/js',
        filename: 'bundle.js'
    }});

var webpackCompiler = webpack(distConfig);

// scripts
gulp.task('scripts', function (done) {
    webpackCompiler.run(function (error, result) {
        if (error) {
            gutil.log(gutil.colors.red(error));
        }
        result = result.toJson();
        if (result.errors.length) {
            result.errors.forEach(function (error) {
                gutil.log(gutil.colors.red(error));
            });
        }
        done();
    });
});

gulp.task('build', ['scripts']);


gulp.task('default', ['watch']);