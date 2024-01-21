const autoprefixer = require('autoprefixer');
const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
  return src('src/scss/app.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'))
}

function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', imagenes);
}

function imagenes() {
  return src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('build/img'))
}

function convertWebp() {
  const options = {
    quality: 50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('build/img'))
}

function convertAvif() {
  const options = {
    quality: 50
  }
  return src('src/img/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('build/img'))
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.convertWebp = convertWebp;
exports.convertAvif = convertAvif;
exports.default = series(imagenes, convertWebp, convertAvif, css, dev);