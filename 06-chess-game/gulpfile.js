// const { task } = require('gulp');
const gulp = require("gulp");//task runner
const sass = require("gulp-sass");//convert sass to css
const sourcemaps = require("gulp-sourcemaps");//map scss dev in css prod
const browserSync = require("browser-sync").create();//live local server
const cssnano = require("gulp-cssnano");//minifying css files
const terser = require("gulp-terser");// minify js files
const rename = require("gulp-rename");//renaming files (min.js or min.css)
const concat = require("gulp-concat");//combining js files into 1
const stripImportExport = require('gulp-strip-import-export');// strip import and export
const imagemin = require("gulp-imagemin");// minifying images
const cache = require("gulp-cache");//caching minified images
const kit = require("gulp-kit"); //combining partials in html
const htmlmin = require("gulp-htmlmin");//minify html
const autoprefixer = require("gulp-autoprefixer");//css compatibility with diff. browsers
const babel = require("gulp-babel");//convert all js to ES5 for compatibility with diff. browsers
const zip = require("gulp-zip");//zipping whole project
const del = require("del");//delete dist files
const plumber = require("gulp-plumber");// for debugging
const notifier = require("gulp-notifier");//notifies when tasks were done successfully


notifier.defaults({
  messages: {
    sass: "CSS was successfully compiled!",
    js: "Javascript is ready!",
    kit: "HTML was delivered!"
  },
//   prefix: "=====",
//   suffix: "=====",
//   exclusions: ".map"
});

filesPath = {
    html: "./src/**/*.html",
    sass: "./src/assets/sass/**/*.scss",
    image: "./src/assets/img/**/*.+(png|jpg|gif|svg)",
    js: "./src/assets/js/**/*.js",
    // html: "./html/**/*.kit",
}

filesDestpath = {
    html: "./dist",
    sass : "./dist/assets/css",
    image: "./dist/assets/img",
    js : "./dist/assets/js",
}


// HTML

gulp.task("html", function(done) {
    return (
        gulp.src(filesPath.html)
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(htmlmin({
            minifyCSS: true, // inline css,
            minifyJS: true, // inline js, not working
            removeComments: true,
            // removeAttributeQuotes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(filesDestpath.html))
        .pipe(notifier.success("html"))
    )
    done();
})

// Sass

gulp.task("sass", function(done) {
    return (
        gulp
            .src([filesPath.sass])
            // .src(["./src/sass/**/*.scss", "!./src/sass/widget.scss"])
            // *.scss - all files at the end of the path
            //  **/*.scss - match all files at the end of the path plus all children files and folders
            // !*.scss or !**/*.scss - exclude the matching expressions
            .pipe(plumber({errorHandler: notifier.error}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssnano()) // minify css
            .pipe(sourcemaps.write("."))
            .pipe(
                rename(function(path) {
                    if (!path.extname.endsWith(".map")) {
                        path.basename += ".min";
                    }
                })
            )
            .pipe(gulp.dest(filesDestpath.sass))
            .pipe(notifier.success("sass"))
    );
    done();
});


sourceJS = ["./src/assets/js/chess-pieces/bishop.js",
"./src/assets/js/chess-pieces/utils.js",
"./src/assets/js/chess-pieces/king.js",
"./src/assets/js/data/chess-pieces.js",
"./src/assets/js/chess-pieces/knight.js",
"./src/assets/js/data/state.js",
"./src/assets/js/chess-pieces/moves.js",
"./src/assets/js/special-rules/castling.js",
"./src/assets/js/chess-pieces/pawn.js",
"./src/assets/js/special-rules/check.js",
"./src/assets/js/chess-pieces/queen.js",
"./src/assets/js/special-rules/en-passant.js",
"./src/assets/js/chess-pieces/rook.js",
"./src/assets/js/special-rules/promotion.js",
"./src/assets/js/active-player.js",
"./src/assets/js/utils.js",
"./src/assets/js/draw.js",
"./src/assets/js/main.js",
"./src/assets/js/components/modal.js",
"./src/assets/js/components/timer.js",
"./src/assets/js/components/slideshow.js",
"./src/assets/js/index.js"]

gulp.task("javascript", function(done) {
    return (
        gulp.src(sourceJS)
        .pipe(plumber({errorHandler: notifier.error}))
        .pipe(sourcemaps.init())
        .pipe(stripImportExport())
        .pipe(concat("index.min.js"))
        .pipe(
            babel({
                presets: ['@babel/preset-env']
            })
        )
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(filesDestpath.js))
        .pipe(notifier.success("js"))
    );
    done();
});

// Images optimization

gulp.task("imagemin", function(done) {
    return (
      gulp.src(filesPath.image)
      .pipe(cache(imagemin()))
      .pipe(gulp.dest(filesDestpath.image))
    )
    done();
});


//  HTML kit templating

/*
gulp.task("kit", function(done) {
    return (
      gulp.src(filesPath.html)
        .pipe(plumber({errorHandler: notifier.error}))//enables whole tasks to run even with error
        .pipe(kit())// combine partials into index.html
        .pipe(htmlmin({
          collapseWhitespace: true
        }))// minify index.html file
        .pipe(gulp.dest(filesDestpath.html))//save to destination file
        // .pipe(notifier.success("kit"))//
    )
    done();
})
*/


// Copy the FONTS folder/contents
// const fonts = () =>
//     gulp
//         .src(paths.fonts.src)
//         .pipe(plumber())
//         .pipe(gulp.dest(paths.fonts.dest));



// // Copy the VIDEOS folder/contents
// const videos = () =>
//     gulp
//         .src(paths.videos.src)
//         .pipe(plumber())
//         .pipe(gulp.dest(paths.videos.dest));


// Watch task with BrowserSync

gulp.task("watch", function() {
    browserSync.init({
        server: {
        baseDir: "./dist/"
        },
        browser: "google chrome"
    });

    gulp
        .watch(
            [
                filesPath.html,
                filesPath.sass,
                filesPath.image,
                filesPath.js,
            ], 
            gulp.parallel([
                            "html",
                            "sass",
                            "imagemin",
                            "javascript", 
                            //  "kit"
                            ])
        )
        .on("change", browserSync.reload);
});



// Clear cache

gulp.task("clear-cache", function(done) {
    return cache.clearAll(done);
  });
  

// Serve

gulp.task("serve", gulp.parallel([
                                    "html",
                                    "sass",
                                    "imagemin",
                                    "javascript", 
                                ]));


// Gulp default command
  
gulp.task("default", gulp.series(["serve", "watch"]));
  


// Zip project
// Zipped all recursively except the node modules

gulp.task("zip", function(done) {
    return(
      gulp.src(["./**/*", "!./node_modules/**/*"])
      .pipe(zip("project.zip"))
      .pipe(gulp.dest("./"))
    )
    done();
  })



// Clean "dist" folder

gulp.task("clean-dist", function(done) {
    return del(["./dist/**/*"]);
      done();
});
  