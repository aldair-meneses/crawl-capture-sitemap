const fs = require('fs');
const path = require('path');

const crawlerSettings = JSON.parse(fs.readFileSync( path.join(__dirname, '../crawlerSettings.json')))

const settings = {
    gotoOptions:  crawlerSettings.gotoOptions,
    launcherOptions: crawlerSettings.launcherOptions,
    cookies: crawlerSettings.cookies
}

module.exports = settings;