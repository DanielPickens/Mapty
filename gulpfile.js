const { src, gulp } = require('gulp');
const connect = require('gulp-connect'); 
const open = require('gulp-open'); 
const exec = require('child_process').exec; 
const execSync = require('child_process').execSync; 


function openBrowser(done) {
    var options = {
    uri: 'http://localhost:8080'
    };
    return src('./')
    .pipe(open(options));
    done();
}

// Gulp plugin to run a webserver (with LiveReload)
// https://www.npmjs.com/package/gulp-connect
function server(done) {
    return connect.server({
    root: './',
    port: 8080,
    debug: true,
    });
    done();
}

function git(done) {
    return exec('git add . && git commit -m "netlify deploy" && git push');
    done();
}


function vercel(done) {
    return new Promise(function(resolve, reject) {
        console.log(execSync('vercel deployment').toString());
        resolve();
    });
}


function vercelOpen(done) {
    return exec('vercel open:site');
    done();
}


exports.deploy = series(git, vercel, vercelOpen);

// Default Gulp command
exports.default = series(openBrowser, server);
