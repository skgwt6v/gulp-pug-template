const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');


const config = {
  browserSync:{
    baseDir: './dest/',
    index: 'index.html',
    reloadDelay: 0
  },
  watch: {
    pug: ['./source/pug/**/*.pug'],
    sass: ['./source/sass/**/*.sass'],
    img: ['./source/images/**/*.+(jpg|jpeg|png|gif|svg)']
  },
  src: {
    pug: ['./source/pug/*.pug','!./source/pug/_*.pug'],
    sass: ['./source/sass/**/*.sass','!./source/sass/**/_*.sass'],
    img: ['./source/images/**/*.+(jpg|jpeg|png|gif|svg)']
  },
  dest: {
    pug: './dest',
    sass: './dest/sass',
    img: './dest/images'
  },
  opt: {
    pug: false,
    sass: false,
    img: {
      optimizationLevel: 7
    }
  }
};

gulp.task('server', () => {
    return browserSync.init({
      server: {
        baseDir: config.browserSync.baseDir,
        index: config.browserSync.index,
        reloadDelay: config.browserSync.reloadDelay 
     }
  });
});

gulp.task('pug', () => {
  return gulp.src(config.src.pug)
  .pipe(pug({}))
  .pipe(plumber())
  .pipe(gulp.dest(config.dest.pug))
  .pipe(browserSync.stream())
});

gulp.task('sass', () => {
  return gulp.src(config.src.sass)
  .pipe(sass())
  .pipe(plumber())
  .pipe(gulp.dest(config.dest.sass))
  .pipe(browserSync.stream())
});

gulp.task('imagemin', () => {
  return gulp.src(config.src.img)
  .pipe(imagemin( config.opt.img ))
  .pipe(plumber())
  .pipe(gulp.dest(config.dest.img))
  .pipe(browserSync.stream())
});

gulp.task('watch', () => {
  gulp.watch(config.watch.pug, ['pug']);
  gulp.watch(config.watch.sass, ['sass']);
  gulp.watch(config.watch.img, ['imagemin']);
});

gulp.task('bs-reload', () => {
  browserSync.reload();
})


gulp.task('default', ['server','watch']);
gulp.task('build', ['pug','sass','imagemin']);
