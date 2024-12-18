Module.register("MMM-Howest-Resto", {

    defaults: {
        resto: "GKG",
    },

    getTranslations() {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json",
        }
    },

    getStyles: function () {
        return ["MMM-Howest-Resto.css", "font-awesome.css"];
    },

    start: function () {
        Log.info("Starting module: " + this.name);

        this.loaded = false;
        this.updateMenu();
    },

    updateMenu: function () {
        this.sendSocketNotification("GET_MENU", {
            resto: this.config.resto,
            lang: config.language
        });
        this.updateDom(1000);
    },

    notificationReceived: function (notification, payload, sender) {
        switch (notification) {
            case "CHANGE_HOWEST_RESTO":
                this.config.resto = payload;
                this.updateMenu();
                break;
        }
    },

    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
            case "MENU_FETCHED":
                this.loaded = true;
                this.menuData = JSON.parse(payload)
                this.updateDom();
                break;
            case "ERROR":
                this.troubles = true;
                this.updateDom();
                break;
        }
    },

    getHeader() {
        const title = "Howest Resto";
        const svg = this.getHowestLogoSVG();
        return svg + title;
    },

    getDom: function () {
        if (this.troubles) {
            return this.createWrapper("MMM-Howest-Resto", this.translate("GENERAL_ERROR"));
        }

        if (!this.loaded) {
            return this.createWrapper("dimmed light small", this.translate("LOADING"));
        }

        console.log(this.menuData);

        const maxWidth = this.calculateMaxWidth();
        const wrapper = this.createWrapper();

        Object.keys(this.menuData).forEach((day) => {
            const dayContainer = document.createElement("div");
            dayContainer.className = "menu-day-container";

            const dayDetails = this.createDayDetails(day, maxWidth);
            dayContainer.appendChild(dayDetails);

            wrapper.appendChild(dayContainer);
        });

        return wrapper;
    },
    getHowestLogoSVG() {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Laag_1" x="0px" y="0px" viewBox="0 0 281.4 144.1" style="enable-background:new 0 0 281.4 144.1;" xml:space="preserve">
        <style type="text/css">
            .st0{display:none;}
            .st1{display:inline;fill:#ffffff;}
        </style>
        <g class="st0">
            <path class="st1" d="M-551,100.9c-0.1-0.2-0.1-0.4-0.1-0.5c0-0.3,0.2-0.6,0.6-0.6c0.3,0,0.6,0.1,0.7,0.7l1.7,5.5h0l1.7-5.3   c0.2-0.6,0.3-0.9,0.8-0.9c0.5,0,0.6,0.3,0.8,0.9l1.7,5.3h0l1.7-5.5c0.2-0.6,0.5-0.7,0.7-0.7c0.5,0,0.6,0.3,0.6,0.6   c0,0.1,0,0.3-0.1,0.5l-2.2,6.4c-0.2,0.5-0.4,0.7-0.8,0.7c-0.4,0-0.6-0.2-0.8-0.7l-1.7-5.4h0l-1.7,5.4c-0.2,0.5-0.4,0.7-0.8,0.7   c-0.4,0-0.6-0.2-0.8-0.7L-551,100.9z" fill="#ffffff"/>
            <path class="st1" d="M-538.2,104.4c0,1.4,0.9,2.4,2.4,2.4c1.8,0,2.2-1.1,2.7-1.1c0.2,0,0.5,0.2,0.5,0.6c0,0.6-1.6,1.6-3.2,1.6   c-2.6,0-3.7-2-3.7-4.1c0-2.2,1.4-4.1,3.6-4.1c2.2,0,3.5,2,3.5,3.9c0,0.5-0.2,0.7-0.7,0.7H-538.2z M-533.8,103.4   c0-1.1-0.7-2.5-2.1-2.5c-1.6-0.1-2.2,1.3-2.3,2.5H-533.8z" fill="#ffffff"/>
            <path class="st1" d="M-522.1,106.9L-522.1,106.9c-0.4,0.7-1.1,1.1-2.2,1.1c-2.2,0-3.4-2-3.4-4.1c0-2.1,1.3-4.1,3.4-4.1   c1.1,0,1.8,0.6,2.1,1.1h0v-3.9c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v10.3c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V106.9z    M-524.2,100.9c-1.6,0-2.2,1.6-2.2,3c0,1.4,0.6,3,2.2,3s2.2-1.6,2.2-3C-522,102.5-522.6,100.9-524.2,100.9z" fill="#ffffff"/>
            <path class="st1" d="M-518.2,104.4c0,1.4,0.9,2.4,2.4,2.4c1.8,0,2.2-1.1,2.7-1.1c0.2,0,0.5,0.2,0.5,0.6c0,0.6-1.6,1.6-3.2,1.6   c-2.6,0-3.7-2-3.7-4.1c0-2.2,1.4-4.1,3.6-4.1c2.2,0,3.5,2,3.5,3.9c0,0.5-0.2,0.7-0.7,0.7H-518.2z M-513.8,103.4   c0-1.1-0.7-2.5-2.1-2.5c-1.6-0.1-2.2,1.3-2.3,2.5H-513.8z" fill="#ffffff"/>
            <path class="st1" d="M-511.8,100.9c-0.1-0.2-0.1-0.4-0.1-0.5c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.2,0.7,0.5l1.8,5.6h0l1.8-5.6   c0.1-0.3,0.3-0.5,0.7-0.5c0.3,0,0.6,0.2,0.6,0.6c0,0.2,0,0.3-0.1,0.5l-2.3,6.5c-0.1,0.4-0.3,0.6-0.7,0.6c-0.4,0-0.6-0.2-0.7-0.6   L-511.8,100.9z" fill="#ffffff"/>
            <path class="st1" d="M-503.9,104.4c0,1.4,0.9,2.4,2.4,2.4c1.8,0,2.2-1.1,2.7-1.1c0.2,0,0.5,0.2,0.5,0.6c0,0.6-1.6,1.6-3.2,1.6   c-2.6,0-3.7-2-3.7-4.1c0-2.2,1.4-4.1,3.6-4.1c2.2,0,3.5,2,3.5,3.9c0,0.5-0.2,0.7-0.7,0.7H-503.9z M-499.5,103.4   c0-1.1-0.7-2.5-2.1-2.5c-1.6-0.1-2.2,1.3-2.3,2.5H-499.5z" fill="#ffffff"/>
            <path class="st1" d="M-495.6,107.3c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V96.9c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7V107.3z" fill="#ffffff"/>
            <path class="st1" d="M-490.6,99.8c2.3,0,3.5,2,3.5,4.1c0,2.1-1.3,4.1-3.5,4.1c-2.3,0-3.5-2-3.5-4.1   C-494.1,101.7-492.9,99.8-490.6,99.8z M-490.6,106.8c1.6,0,2.2-1.6,2.2-3c0-1.4-0.6-3-2.2-3c-1.6,0-2.2,1.6-2.2,3   C-492.8,105.2-492.2,106.8-490.6,106.8z" fill="#ffffff"/>
            <path class="st1" d="M-485.6,100.5c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v0.4h0c0.4-0.7,1.1-1.1,2.1-1.1c2.2,0,3.4,2,3.4,4.1   c0,2.1-1.3,4.1-3.4,4.1c-1.1,0-1.8-0.6-2.1-1.1h0v3.5c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V100.5z M-482.2,106.8   c1.6,0,2.2-1.6,2.2-3c0-1.4-0.6-3-2.2-3c-1.6,0-2.2,1.6-2.2,3C-484.4,105.2-483.9,106.8-482.2,106.8z" fill="#ffffff"/>
            <path class="st1" d="M-473.5,100.5c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v0.4h0c0.4-0.7,1.1-1.1,2.1-1.1c2.2,0,3.4,2,3.4,4.1   c0,2.1-1.3,4.1-3.4,4.1c-1.1,0-1.8-0.6-2.1-1.1h0v3.5c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V100.5z M-470.1,106.8   c1.6,0,2.2-1.6,2.2-3c0-1.4-0.6-3-2.2-3s-2.2,1.6-2.2,3C-472.3,105.2-471.7,106.8-470.1,106.8z" fill="#ffffff"/>
            <path class="st1" d="M-464.3,104.4c0,1.4,0.9,2.4,2.4,2.4c1.8,0,2.2-1.1,2.7-1.1c0.2,0,0.5,0.2,0.5,0.6c0,0.6-1.6,1.6-3.2,1.6   c-2.6,0-3.7-2-3.7-4.1c0-2.2,1.4-4.1,3.6-4.1c2.2,0,3.5,2,3.5,3.9c0,0.5-0.2,0.7-0.7,0.7H-464.3z M-459.9,103.4   c0-1.1-0.7-2.5-2.1-2.5c-1.6-0.1-2.2,1.3-2.3,2.5H-459.9z" fill="#ffffff"/>
            <path class="st1" d="M-454.1,99.8c2.3,0,3.5,2,3.5,4.1c0,2.1-1.3,4.1-3.5,4.1c-2.3,0-3.5-2-3.5-4.1   C-457.6,101.7-456.4,99.8-454.1,99.8z M-454.1,106.8c1.6,0,2.2-1.6,2.2-3c0-1.4-0.6-3-2.2-3c-1.6,0-2.2,1.6-2.2,3   C-456.3,105.2-455.7,106.8-454.1,106.8z" fill="#ffffff"/>
            <path class="st1" d="M-449.1,100.5c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v0.4h0c0.4-0.7,1.1-1.1,2.1-1.1c2.2,0,3.4,2,3.4,4.1   c0,2.1-1.3,4.1-3.4,4.1c-1.1,0-1.8-0.6-2.1-1.1h0v3.5c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V100.5z M-445.7,106.8   c1.6,0,2.2-1.6,2.2-3c0-1.4-0.6-3-2.2-3s-2.2,1.6-2.2,3C-447.9,105.2-447.3,106.8-445.7,106.8z" fill="#ffffff"/>
            <path class="st1" d="M-439.4,107.3c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7V96.9c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7V107.3z" fill="#ffffff"/>
            <path class="st1" d="M-436.8,104.4c0,1.4,0.9,2.4,2.4,2.4c1.8,0,2.2-1.1,2.7-1.1c0.2,0,0.5,0.2,0.5,0.6c0,0.6-1.6,1.6-3.2,1.6   c-2.6,0-3.7-2-3.7-4.1c0-2.2,1.4-4.1,3.6-4.1c2.2,0,3.5,2,3.5,3.9c0,0.5-0.2,0.7-0.7,0.7H-436.8z M-432.4,103.4   c0-1.1-0.7-2.5-2.1-2.5c-1.6-0.1-2.2,1.3-2.3,2.5H-432.4z" fill="#ffffff"/>
        </g>
        <g>
            <path d="M138.2,49.7l6.3-19.4c0.1-0.4-0.1-0.9-0.5-1c-0.4-0.1-0.9,0.1-1,0.5l-6.4,19.9H138.2z" fill="#ffffff"/>
            <path d="M121.9,94.6l-6.2,19.1c-0.1,0.4,0.1,0.9,0.5,1c0.1,0,0.2,0,0.2,0c0.3,0,0.7-0.2,0.8-0.6l6.3-19.6H121.9z" fill="#ffffff"/>
            <path d="M33,44c0-3.2,2-5.3,4.8-5.3s4.8,2.1,4.8,5.3v13h0.1c2-2.5,5.7-3.3,8.7-3.3c7.5,0,13.1,4.8,13.1,12.9v18.3   c0,3.2-2,5.3-4.8,5.3c-2.8,0-4.8-2.1-4.8-5.3V68.3c0-4.4-2.8-6.6-6.2-6.6c-3.9,0-6.1,2.9-6.1,6.6v16.7c0,3.2-2,5.3-4.8,5.3   S33,88.1,33,84.9V44z" fill="#ffffff"/>
            <path d="M104.1,72.2c0,10-6.8,18.4-17.1,18.4c-10.3,0-17.1-8.4-17.1-18.4c0-9.7,7-18.5,17.1-18.5C97,53.7,104.1,62.6,104.1,72.2z    M79.4,72.2c0,4.6,2.4,9.6,7.6,9.6c5.2,0,7.6-5,7.6-9.6c0-4.6-2.3-9.8-7.6-9.8C81.7,62.5,79.4,67.7,79.4,72.2z" fill="#ffffff"/>
            <path d="M107.1,62.5c-0.7-1.9-1-3.1-1-4.5c0-2.1,2-3.8,4.8-3.8c2.3,0,4,1.5,4.5,3.8l5.5,18.2h0.1l5.6-17.8c0.7-2.6,2.1-4.2,4.8-4.2   c2.8,0,4.1,1.6,4.8,4.2l5.6,17.8h0.1l5.5-18.2c0.5-2.3,2.2-3.8,4.5-3.8c2.8,0,4.8,1.7,4.8,4.6c0,1.1-0.5,2.1-0.9,3.6l-8.2,23   c-1,2.8-2.7,4.8-5.8,4.8c-2.9,0-4.6-1.7-5.5-4.4l-4.9-15.4h-0.1l-4.9,15.4c-0.9,2.8-2.6,4.4-5.5,4.4c-3.1,0-4.8-2.1-5.8-4.8   L107.1,62.5z" fill="#ffffff"/>
            <path d="M169,75.4c0.7,4.7,4.6,6.9,9,6.9c4.9,0,8.3-3.8,10.8-3.8c2.1,0,3.9,2.1,3.9,4.1c0,4.1-8.5,8.1-15.6,8.1   c-10.7,0-17.9-7.8-17.9-18.4c0-9.7,7-18.5,17.1-18.5c10.3,0,17.2,9.4,17.2,17.4c0,2.9-1.3,4.2-4.2,4.2H169z M184,69   c-0.5-4.2-3.2-7.3-7.6-7.3c-4.2,0-7.1,3.3-7.6,7.3H184z" fill="#ffffff"/>
            <path d="M218.4,64.9c-1.8,0-5.4-2.8-8.6-2.8c-1.7,0-3.3,0.8-3.3,2.7c0,4.4,16.6,3.8,16.6,14.7c0,6.4-5.4,11.2-13.6,11.2   c-5.4,0-13.3-3.1-13.3-7.4c0-1.5,1.5-4.2,4.1-4.2c3.7,0,5.4,3.3,9.9,3.3c2.9,0,3.8-0.9,3.8-2.7c0-4.4-16.6-3.7-16.6-14.7   c0-6.6,5.4-11.1,12.9-11.1c4.7,0,11.9,2.2,11.9,6.9C222.3,62.8,220.6,64.9,218.4,64.9z" fill="#ffffff"/>
            <path d="M231.5,62.9h-2.1c-2.6,0-4.2-1.6-4.2-4.2c0-2.4,1.8-4.2,4.2-4.2h2.1v-5.7c0-3.2,2-5.3,4.8-5.3c2.8,0,4.8,2.1,4.8,5.3v5.7   h2.7c2.5,0,4.6,1.1,4.6,4.2c0,3-2.1,4.2-4.6,4.2h-2.7v22c0,3.2-2,5.3-4.8,5.3c-2.8,0-4.8-2.1-4.8-5.3V62.9z" fill="#ffffff"/>
        </g>
        </svg>`
    },


    createWrapper(className, content) {
        const wrapper = document.createElement("div");
        wrapper.className = className || "MMM-Howest-Resto";
        if (content) wrapper.innerHTML = content;
        return wrapper;
    },

    calculateMaxWidth() {
        return Object.keys(this.menuData).reduce((max, day) => {
            const text = `${day}: ${
                this.menuData[day].items.length === 0
                    ? this.translate("NO_MENU_AVAILABLE")
                    : this.menuData[day].items.join(", ")
            }`;

            const tempSpan = document.createElement("span");
            tempSpan.style.visibility = "hidden";
            tempSpan.style.whiteSpace = "nowrap";
            tempSpan.innerHTML = text;

            document.body.appendChild(tempSpan);
            const width = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            return Math.max(max, width);
        }, 0);
    },

    createDayDetails(day, maxWidth) {
        const dayDetails = document.createElement("span");
        dayDetails.className = "menu-day-details";

        dayDetails.innerHTML =
            `${day}: ` +
            (this.menuData[day].items.length === 0
                ? `<span class="dimmed">${this.translate("NO_MENU_AVAILABLE")}</span>`
                : this.menuData[day].items.join(", "));
        dayDetails.style.minWidth = `${maxWidth}px`;

        return dayDetails;
    }
});