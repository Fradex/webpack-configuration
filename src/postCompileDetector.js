const fs = require('fs');
const hashFiles = require('hash-files');
const WebResourcePublisher = require('./webResourcePublisher')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = class PostCompileDetector {
    constructor(entry, basePath) {
        this.entry = entry;
        this.basePath = basePath;
    }

    detectChanges() {
        var entry = this.entry;
        var basePath = this.basePath;
        var _this = this;
        PostCompileDetector.publishFiles = PostCompileDetector.publishFiles || [];

        Object.keys(entry).forEach((key) => {
            var item = entry[key].replace('./', '/');
            var path__ = basePath + item;
            var filename = item;

            fs.watchFile(path__, (curr, prev) => {
                if (filename) {
                    var options = { files: path__, algorithm: 'sha256' };
                    hashFiles(options, function (error, hash) {
                        var storageKey = localStorage.getItem('file:' + filename);
                        if (storageKey != hash) {
                            console.log('filename provided: ' + filename + ' oldHash:' + storageKey + ' newHash:' + hash);
                            localStorage.setItem('file:' + filename, hash);
                            PostCompileDetector.publishFiles.push(filename);
                        }
                    });

                } else {
                    console.log('filename not provided');
                }
            });
        });

        console.log('wait 15 seconds')
        setTimeout(_ => {
            if (PostCompileDetector.publishFiles && PostCompileDetector.publishFiles.length != 0) {
                new WebResourcePublisher().UpdateAndPublish(PostCompileDetector.publishFiles);
            }
            console.log('update files - ' + PostCompileDetector.publishFiles.length);
            PostCompileDetector.publishFiles = [];
        }, 30000);
    }
}