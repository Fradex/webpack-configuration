const fs = require('fs');
const hashFiles = require('hash-files');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = class PostCompileDetector {
    constructor(entry, basePath) {
        this.entry = entry;
        this.basePath = basePath;
    }

    get detectChanges() {
        var entry = this.entry;
        var basePath = this.basePath;
        
        Object.keys(entry).forEach((key) => {
            var item = entry[key].replace('./', '/');
            var path__ = basePath + item;
            var filename = item;
            fs.watchFile(path__, (curr, prev) => {
                    if (filename) {
                        var options = { files: path__, algorithm: 'sha256' };
                        hashFiles(options, function (error, hash) {
                            var storageKey = localStorage.getItem('file:' + filename)
                            if (storageKey != hash) {
                                console.log('filename provided: ' + filename + ' oldHash:' + storageKey + ' newHash:' + hash);
                                localStorage.setItem('file:' + filename, hash);
                            }
                        });

                    } else {
                        console.log('filename not provided');
                    }
            });
        });
    }
}
