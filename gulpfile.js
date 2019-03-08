var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-html-minifier'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    del = require("del");

var paths = {
    styles: {
        src: 'src/sass/*.sass',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'dist/js'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist'
    }
};

function styles() {
    return gulp
        .src(paths.styles.src, {
            sourcemaps: true
        })
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({grid: 'autoplace', browsers: 'last 3 versions', cascade: false }))
//        .pipe(rename({
//            suffix: '.min'
//        }))
        .pipe(cleanCSS({
            debug: true
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function html() {
    return gulp
        .src(paths.html.src, {
            sourcemaps: true
        })
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.html.dest));
}

function watch() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

var build = gulp.parallel(styles, scripts, html, watch);


gulp.task(build);
gulp.task('default', build);
gulp.task(styles);
gulp.task(html);

// Clean dist
gulp.task('clean', function () {
  return del(["./dist/*.html", './dist/**.*',"./dest/css/**.*", "./dist/css/**.*",'./dist/js/*.js']);
});
