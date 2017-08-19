/**
 * Created by raymond on 11/10/15.
 */
"use strict";

var gulp = require("gulp");
// Run a local dev server
var connect = require("gulp-connect");
// Open a URL in a web browser
var open = require("gulp-open");
// Bundles  node js module for browser/client use
var browserify = require("browserify");
// Transforms React JSX to JS
var reactify = require("reactify");
// Use conventional text streams with Gulp
var source = require("vinyl-source-stream");
//Concatenates files
var concat = require("gulp-concat");
//Lint JS files, including JSX
var lint = require("gulp-eslint");
// For Express Twitter Restful Api.
var liveServer = require("gulp-live-server");

var config = {
    port : 9005,
    devBaseUrl : "http://localhost",
    paths : {
        html: "./src/*.html",
        js: "./src/**/*.js",
        images: "./src/images/*",
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
            "node_modules/toastr/toastr.css"
        ],
        dist: "./dist",
        mainJs: "./src/main.js"
    }
}

// Start local dev server
gulp.task("connect", function() {
    connect.server({
        root: ["dist"],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true // adding livereload js snippet on the bottom in the *.html files
    });
});

gulp.task("open", ["connect"], function() {
    gulp.src("dist/index.html")
        .pipe(open({ uri: config.devBaseUrl + ":" + config.port + "/"}));
});

gulp.task("html", function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task("images", function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + "/images"))
        .pipe(connect.reload());

    //favicon.
    gulp.src("./src/images/favicon.ico")
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task("js", function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.dist + "/scripts"))
        .pipe(connect.reload());
});

gulp.task("css", function() {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.dist + "/css"));
});

gulp.task("lint", function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task("watch", function() {
    gulp.watch(config.paths.html, ["html"]);
    gulp.watch(config.paths.js, ["js", "lint"]);
});

gulp.task('live-server', function(){
    var apiServer = new liveServer("./src/server/serverMain.js");
    apiServer.start();
});

gulp.task("default", ["html", "images", "js", "css", "lint", "open", "watch", "live-server"]);
