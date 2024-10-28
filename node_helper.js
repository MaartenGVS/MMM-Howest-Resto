const NodeHelper = require("node_helper");
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
    start: function () {
        console.log("Starting node helper: " + this.name);
    },
    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_MENU") {
            this.getMenu(payload);
        }
    },
    getMenu: function (payload) {
        const self = this;
        exec('python ' + __dirname + `/scraper/howest-menu.py --resto ${payload.resto} --language ${payload.lang}`, (error, stdout, stderr) => {
            if (error) {
                self.sendSocketNotification("ERROR");
                console.error(`exec error: ${error}`);
                return;
            }
            self.sendSocketNotification("MENU_FETCHED", stdout);
        });
    }
});