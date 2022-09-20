import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import { deleteAsync as del, deleteAsync } from 'del';

// Styles

export function styles() {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

//Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(rename('script.min.js'))
  .pipe(gulp.dest('build/js'));
}

//images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

//Webp

const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({webp: {}}))
  .pipe(gulp.dest('build/img'))
}

//svg

const svg = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img/icons'))
}

const svgLogo = () => {
  return gulp.src('source/img/images/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img/images'))
}


//Sprites

export const sprites = () => {
  return gulp.src('source/img/sprite.svg')
  .pipe(gulp.dest('build/img'));
}


//Copy

const copy = (done) => {
  gulp.src(['source/fonts/*.{woff2,woff}','source/*.ico'],
  {base: 'source'})
  .pipe(gulp.dest('build'))
  done();
}

//Clean

const clean = () => {
  return deleteAsync ('build');
}


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html,reload));
  //gulp.watch('source/*.html').on('change', browser.reload);
}

//Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprites,
    svg,
    createWebp
  )
);

//Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprites,
    svgLogo,
    svg,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

//default gulp.series(
  //clean,
  // copy,
  //createWebp,
  //optimizeImages,
  //scripts,
  //html,
  //styles,
  //server,
  //watcher
//);
