// your class and name
const name = `1ITFxx_surname_name`;

const gulp = require('gulp');

// Needed for development (gulp)
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer');
const sass = require('gulp-dart-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const mqpacker = require('@lipemat/css-mqpacker');
const zip = require('gulp-zip');


// Copy Bootstrap and jQuery JS-files
gulp.task('copy-js', () =>
    gulp
        .src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
        .pipe(newer('./src/js'))
        .pipe(notify({ message: 'Copy JS files' }))
        .pipe(gulp.dest('./src/js'))
);

// Compile sass into CSS (/src/css/)
gulp.task('sass', () => {
    const processors = [mqpacker({ sort: true })];
    return (
        gulp
            .src('./scss/**/*.scss')
            .pipe(
                plumber({
                    errorHandler: notify.onError({
                        title: 'SASS compile error!',
                        message: '<%= error.message %>',
                    }),
                })
            )
            .pipe(sourcemaps.init())
            // outputStyle: expanded or compressed
            .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(prefix('last 2 versions'))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./src/css'))
    );
});

// Live-reload the browser
gulp.task('browser-sync', () => {
    browserSync.init({
        startPath: '/index.html',
        port: 7700,
        server: {
            baseDir: './src',
            directory: true,
        },
        ui: {
            port: 7710,
        },
    });
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.{html,css,js}').on('change', browserSync.reload);
});

// gulp.task('zip', () => gulp.src('./{src/**/*,scss/**/*}').pipe(zip(`${name}.zip`)).pipe(gulp.dest('./')));
gulp.task('zip', () => gulp.src(['./**/*', '!./**/node_*', '!./**/node_modules/**/*', '!./*.zip']).pipe(zip(`${name}.zip`)).pipe(gulp.dest('./')));

gulp.task('default', gulp.series('copy-js', 'sass', 'browser-sync'));
