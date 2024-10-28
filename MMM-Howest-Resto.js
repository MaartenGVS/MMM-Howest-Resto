/*
 * Magic Mirror module for displaying Howest resto weekly menu
 * By Maarten Van Santen
 * GPL Licensed
 */

Module.register("MMM-Howest-Resto", {

    defaults: {
        resto: "RSS1"
    },
    getScripts: function () {
        return ["moment.js"];
    },
    getStyles: function () {
        return ["MMM-Howest-Resto.css", "font-awesome.css"];
    },
    getTranslations: function () {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json",
        };
    },
    start: function () {
        Log.info("Starting module: " + this.name);

        this.loaded = false;
        this.menu = "Loading...";
        setTimeout(() => {
            this.updateMenu();
        }, 30000);
    },
    getDom: function () {
        let wrapper = document.createElement("div");
        if (!this.loaded) {
            wrapper.innerHTML = this.menu;
            wrapper.className = "MMM-Howest-Resto";
            return wrapper;
        }

        wrapper = this.menu;
        return wrapper;
    },

    updateMenu: function () {
        this.menu = "LOADED :)";
        this.updateDom();
    },

});