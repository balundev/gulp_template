const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const c = require('ansi-colors');
const notifier = require('node-notifier');


function showError(err){
    notifier.notify(
        {
            title: 'Błąd kompilacji SASS',
            message: err.messageFormatted,
        });

    console.log(c.red("------------"));
    console.log(c.bold.red(err.messageFormatted));
    console.log(c.red("------------"));
    this.emit("end");

}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler: showError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle : "compressed"
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task("watch",function () {
    gulp.watch("./scss/**/*.scss",["sass"]);
    gulp.watch("./*.html").on('change', browserSync.reload);

})


gulp.task('default', function () {
    console.log("========rozpoczynam prace==========");
    gulp.start(["browser-sync", "sass","watch",])

})

