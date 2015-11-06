const gulp = require('gulp')
const mocha = require('gulp-mocha')
const jshint = require('gulp-jshint')

const paths = {
  tests: ['./test.js'],
  scripts: ['./*.js']
}
const tasks = ['watch', 'test', 'lint']

gulp.task('test', () => {
  return gulp.src(paths.tests, {read: false})
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('lint', () => {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('watch', () => {
  gulp.watch(paths.tests, ['test'])
  gulp.watch(paths.scripts, ['lint'])
})

gulp.task('default', tasks)
