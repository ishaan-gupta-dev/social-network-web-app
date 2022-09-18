const gulp = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

const uglify = require('gulp-uglify-es').default;

const imagemin = require('gulp-imagemin');

const del = require('del');

gulp.task('css',function(done){
    console.log('minifying CSS...');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    console.log('minified CSS');
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js',function(done){
    console.log('minifying JS...');
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'));

    console.log('minified js');
    gulp.src('./assets/**/*.js')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('images',function(done){
    console.log('compressing images');
    gulp.src('./assets/images/**/*.+(jpeg|jpg|png|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images'));

    console.log('compressed images');
    gulp.src('./assets/**/*.+(jpeg|jpg|png|gif|svg)')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('clean:assets',function(done){
    del.sync('./public/assets'),{force: true};
    done();
})

gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('Building assets');
    done();
})