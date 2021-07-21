import gulp from 'gulp';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import del from 'del';

const sass = gulpSass(nodeSass);

const paths = {
    styles :{
        src : "assets/scss/styles.scss",
        dest : "src/static/styles",
        watch: "assets/scss/**/*.scss"
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
}

const dev = gulp.series([clean, styles, watchFiles]);

export default dev; 