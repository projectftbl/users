var gulp = require('gulp');

require('@recipher/gulp')(gulp, { test: { coverage: 75 }});

gulp.task('default', [ 'test' ]);
