var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('insert-prod-headers', function () {
  return gulp.src('./build/index.html')
    .pipe(inject(gulp.src('./prod-headers.html'), {
      starttag: '<!-- inject:prod-headers -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('./dist'));
});