var gulp = require("gulp");
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var clean = require("gulp-clean");
var nodemon = require("gulp-nodemon");
var jsdoc = require("gulp-jsdoc3");
var webserver = require("gulp-webserver");
var jsdocConfig = require('./jsdoc.json')


var docRoot = jsdocConfig.opts.destination;

gulp.task("build",async function () {
    gulp.src(["src/**.js", "src/**/**.js"])
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});


gulp.task("clean-code", async function () {
    gulp.src(["dist/**.*", "dist/**/**.*"])
    .pipe(clean())
});

gulp.task("copy-config", async function () {
    gulp.src(["src/**.json", "src/**/**.json"])
        .pipe(gulp.dest('dist'));
});

gulp.task("compile", async function () {

    gulp.src(["src/**.json", "src/**/**.json"])
        .pipe(gulp.dest('dist'));

    gulp.src(["src/**.js", "src/**/**.js"])
        .pipe(babel())
        //.pipe(uglify())
        .pipe(gulp.dest('dist'));

} );


gulp.task('dev', gulp.series("clean-code","compile", function (done){
    var stream = nodemon({
        script: 'dist/app.js',
        watch: 'src',
        env:{'NODE_ENV': 'development'},
        tasks: ['compile'],
        done: done
    });
    return stream;
}));

gulp.task('build', gulp.series("clean-code", "compile", function (done) {
    var stream = nodemon({
        script: 'dist/app.js',
        watch: 'src',
        env: { 'NODE_ENV': 'prod' },
        tasks: ['compile'],
        done: done
    });
    return stream;
}));


gulp.task("doc",async function(cb){
    gulp.src(["src/**/*.js", "src/*.js","README.md"],{read:false})
        .pipe(jsdoc(jsdocConfig,cb))
});

gulp.task('doc-open', async function () {
    gulp.src(docRoot)
    .pipe(webserver({
        livereload:true,
        open:true,
        port:3030
    }))
});
