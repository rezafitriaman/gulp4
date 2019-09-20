const { task, src, dest, parallel, series, watch, start } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();
const watchify = require("watchify");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const fs = require('fs');
const spawn = require('child_process').spawn;
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");


/*
------------------------------
SRC PATH
------------------------------
*/
const srcPaths = {
	appIndexHtml: ['./src/app/*.html'], // all html files on app
	scss:['./src/app/*.scss',
			'./src/banners/lead/scss/*.scss',
			'./src/banners/rect/scss/*.scss',
			'./src/banners/sky/scss/*.scss'], // main scss files
	appJs: ['./src/app/*.ts'], // we dont use this yet
	bannerJs: ['./src/banners/framework/*.ts',
				'./src/banners/lead/js/*.ts',
				'./src/banners/rect/js/*.ts',
				'./src/banners/sky/js/*.ts'],
	appDevelopEngine:['./src/app/developEngine.ts'], // base on node js
	mainEntries: './src/app/main.ts', // main entries
	bannersHtml: ['./src/banners/sky/html/*.html',
				'./src/banners/rect/html/*.html',
				'./src/banners/lead/html/*.html'], // template html for the banner
	img: ['./src/banners/img/*'], // image for the banner
	fonts: ['./src/banners/fonts/*'] // fonts for the banner
};

/*
------------------------------
DIST PATH
------------------------------
*/
const distPaths = {
	dist: ['./dist'], //dist map
	app: './dist/app', // app map engine.js inside
	bannersHtml: './dist/banners/html/' // all html template size gonna be inside
};

/*
------------------------------
NODE FILE PATH
------------------------------
*/
const nodeFile = {
	developEngine: ['./dist/app/developEngine.js'] //engine.js base on Nodejs
};

/*
------------------------------
NODE FILE PATH
------------------------------
*/
const vendorFile = ['./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
	'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
	'./node_modules/bootstrap/dist/css/bootstrap.min.css',
	'./node_modules/bootstrap/dist/css/bootstrap.min.css.map',
	'./node_modules/gsap/src/minified/TweenMax.min.js',
	'./node_modules/normalize.css/normalize.css'];


/*
------------------------------
WATCHED WITH BROWSERIFY
watch ts file such as main.ts
tsify it
babelify it

PS: SOMEHOW HE WATCHED ALSO greet.js and other .ts file
and not only main.ts
------------------------------
*/

const watchedBrowserify = watchify ( //done
	browserify({
		basedir: '.',
		debug: true,
		entries: srcPaths.mainEntries,
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.transform('babelify', {
		"presets": [
			"@babel/preset-typescript",
			[
				"@babel/preset-env",
				{
					"targets": {
						"node": "current"
					}
				}
			]
		], extensions: ['.ts']}
	)
);

/*
------------------------------
BUNDLE
after babelify
name the file to bundle.js
save it in buffer
load sourcemaps
write sourcemaps
send it to dist
stream to the browser and reload it
------------------------------
*/

function bundleJs() { //done
	// body omitted
	return watchedBrowserify
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(distPaths.app)) // go to de app dist
		.pipe(browserSync.stream());

}

/*
------------------------------
ENGINE
engine.js is file base on nodejs
send engine file to dist

engine-file is the one who has
responsibility adding html-template to main-html

engine.js come from tsconfig.json = files
------------------------------
*/

function developEngine() {  //done
	// body omitted
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(dest(distPaths.app)) // go to de app dist
}

/*
------------------------------
EXECUTE NODE-FILE
but first engine file must added to the dist
------------------------------
*/

function executeNode() { // todo first run ['app::engine'] / developEngine
	// body omitted
	let promiseSpawn = new Promise(function(resolve, reject) {
		resolve(
			spawn('node', nodeFile.developEngine, { stdio: 'inherit' })
		)
	});

	return promiseSpawn.then(function() {
		setTimeout(() => {
			browserSync.reload();
		},2000);
	});
}

/*
------------------------------
SASS
send sass file to dist
add plumber
add sourcemaps
add error log
add auto prefix
send it to dist
stream to browser and reload
------------------------------
*/

function all_sass() { //done
	// body omitted
	return src(srcPaths.scss, {allowEmpty: true})
		.pipe(plumber())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist : [ "> 1%",
				"ie >= 8",
				"edge >= 15",
				"ie_mob >= 10",
				"ff >= 45",
				"chrome >= 45",
				"safari >= 7",
				"opera >= 23",
				"ios >= 7",
				"android >= 4",
				"bb >= 10"]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(distPaths.app)) // go to de app dist
		.pipe(browserSync.stream());
}

/*
------------------------------
APP HTML INDEX
send html file to dist
------------------------------
*/

function app_indexHtml() { //done
	// body omitted
	return src(srcPaths.appIndexHtml)
		.pipe(dest(distPaths.app)) // go to de app dist
}

/*
------------------------------
TEMPLATE HTML BANNERS
send html template file to dist template
------------------------------
*/

function banners_html() { //done
	// body omitted
	return src(srcPaths.bannersHtml)
		.pipe(dest(distPaths.bannersHtml)) // go to de app dist
}

/*
------------------------------
IMG
send IMG template file to dist
------------------------------
*/

function banner_img() { //done
	// body omitted
	return src(srcPaths.img)
		.pipe(dest(distPaths.app)) // go to de app dist
}

/*
------------------------------
FONTS
send FONTS template file to dist
------------------------------
*/

function banner_fonts() { // done
	// body omitted
	return src(srcPaths.fonts)
		.pipe(dest(distPaths.app)) // go to de app dist
}

/*
------------------------------
ALL VENDOR
add GSAP to the app folder
add bootstrap to the app folder
------------------------------
*/

function allVendor() { // done
	// body omitted
	return src(vendorFile)
		.pipe(dest(distPaths.app)) // go to de app dist
}

/*
------------------------------
SERVE BROWSERSYNC
start browser - with local host
------------------------------
*/

function serve() {
	// body omitted
	browserSync.init({
		server: {
			baseDir: distPaths.app,
			/*directory: true,*/	//show directory
			proxy: "grqbge-nwx7013:3000"
		},
		port: 9999
	});

	/*
	------------------------------
	WATCH
	with gulp.watch - the normal one
	------------------------------
	*/
	//watch(srcPaths.appEngine, ['executeNode::afterAppEngineWatch']);
	//watch(srcPaths.appIndexHtml, ['executeNode::afterAppIndexWatch']);

	watch(srcPaths.appDevelopEngine, { queue: false, events: 'all' }, series(developEngine, executeNode));
	watch(srcPaths.appIndexHtml,{ queue: false, events: 'all' }, series(app_indexHtml, executeNode));
	watch(srcPaths.bannersHtml,{ queue: false, events: 'all' }, series(banners_html, executeNode));
	watch(srcPaths.appJs,{ queue: false, events: 'all' }, series(bundleJs));
	watch(srcPaths.bannerJs,{ queue: false, events: 'all' }, series(bundleJs));
	watch(srcPaths.scss,{ queue: false, events: 'all' }, series(all_sass));

	// IF U WANT TO FULL REFRESH ON SCSS WATCH PLEASE REPLACE IT WITH THIS
	//watch(srcPaths.scss,{ queue: false, events: 'all' }, series(all_sass)).on('change', browserSync.reload());

	/*
	------------------------------
	PLUGIN WATCH
	- watch with a plugin so u can watch a new or deleted file
	- the html template is dynamic html file, u can add and delete file
	and u dont have to restart gulp
	------------------------------
	*/


	/*watch(srcPaths.bannersHtml, function() {
		start('executeNode::afterbannersHtmlWatch');
	});
	watch(srcPaths.scss, function() {
		start('app::sass');
	});*/

	//watchedBrowserify.on("update", bundleJs);
}

exports.allVendor = allVendor;
exports.developEngine = developEngine;
exports.banner_img = banner_img;
exports.banner_fonts = banner_fonts;
exports.banners_html = banners_html;
exports.app_indexHtml = app_indexHtml;
exports.all_sass = all_sass;
exports.bundleJs = bundleJs;
exports.executeNode = executeNode;
exports.serve = serve;

exports.default = series(
	parallel(
		banners_html,
		app_indexHtml,
		developEngine,
	),
	executeNode,
	parallel(
		allVendor,
		banner_img,
		banner_fonts,
		all_sass,
		bundleJs,
	),
	serve
);
