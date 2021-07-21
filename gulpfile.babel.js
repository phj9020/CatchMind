import gulp from 'gulp';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import del from 'del';
import babelify from "babelify";
import bro from 'gulp-bro';

const sass = gulpSass(nodeSass);

const paths = {
    styles :{
        src : "assets/scss/styles.scss",
        dest : "src/static/styles",
        watch: "assets/scss/**/*.scss"
    },
    js: {
        src : "assets/js/main.js",
        dest : "src/static/js",
        watch : "assets/js/**/*.js"
    }
}

function clean() {
    return del("src/static/styles")
}

function styles() {
    return gulp.src(paths.styles.src, {allowEmpty: true})
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(csso({
        restructure: false,
        sourceMap: true,
        debug: true
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles(){
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.js.watch, js);
}


function js(){
    return gulp.src(paths.js.src, {allowEmpty: true})
    .pipe(bro({
        transform: [
            babelify.configure({ presets: ["@babel/preset-env"] }),
            [ 'uglifyify', { global: true } ]
        ]
    }))
    .pipe(gulp.dest(paths.js.dest))
}

const dev = gulp.series([clean, styles, js, watchFiles]);

export const build = gulp.series(clean, styles, js);

export default dev; 