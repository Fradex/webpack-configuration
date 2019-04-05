const orgUrl = "http://**"
    , domain = "**"
    , username = "**"
    , password = "**",
    hostname = "**";
const httpntlm = require('httpntlm');
const base64 = require('js-base64').Base64;
var fs = require('fs');
const path = require('path');

module.exports = class WebResourcePublisher {
    constructor(entry, basePath) {
        this.entry = entry;
        this.basePath = basePath;
    }

    UpdateAndPublish(fullResourcesNames) {
        console.log('UpdateAndPublish');
        var promises = [];
        var webResourceManager = new WebResourceManager();
        var collection = [];
        fullResourcesNames.forEach(fullResourceName => {
            var resourceName = fullResourceName.replace('/WebResources/', '')
            var promise = webResourceManager.getResource(resourceName);
            promises.push(promise);
            collection[resourceName] = fullResourceName;
        });

        Promise.all(promises)
            .then(results => {
                results.forEach(x => {
                    console.log(x);
                    webResourceManager.updateResource(x, x.name);
                });
            })
            .catch(error => {
                console.log(error);

                if (error.length)
                    errors.forEach(x => console.log(x));
            });
    }
}

class WebResourceManager {
    constructor() {
        this.apiUrl = orgUrl + '/api/data/v8.1/';
    }

    getResource(resourceName) {
        var uri = this.apiUrl + "webresourceset()?$select=name,webresourceid&$top=1&$filter=name eq '" + resourceName + "'";
        console.log('getResource uri - ' + uri);
        return new Promise((resolve, reject) => {
            httpntlm.get({
                url: uri,
                username: username,
                password: password,
                workstation: hostname,
                domain: domain
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                var body = JSON.parse(res.body);
                resolve(body && body.value && body.value[0]);
            });
        });
    }

    /**
     * Обновляем без ожидания. todo сделать синхронизацию, обработку ошибок.
     */
    updateResource(resource, resourceName) {
        var dir = path.resolve(__dirname.replace('\\src', ''), 'dist-dev', 'WebResources');
        var filePath = path.resolve(dir, resourceName);
        console.log(filePath)

        fs.readFile(filePath, 'utf8', function (err, contents) {

            httpntlm.post({
                url: uri,
                username: username,
                password: password,
                workstation: hostname,
                domain: domain,
                body: {
                    content: base64.encode(contents),
                    webresourceid: resource.webresourceid
                },
                headers: { 'Content-Type': 'application/json' }

            }, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }else{
                    console.log(`Ресурс обновлен ${resource.name}.`)
                }
            });
        });
    }
}