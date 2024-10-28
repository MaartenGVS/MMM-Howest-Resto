Module.register("MMM-Howest-Resto", {

    defaults: {
        resto: "GKG",
        language: "en",
    },
    getScripts: function () {
        return ["moment.js"];
    },
    getStyles: function () {
        return ["MMM-Howest-Resto.css", "font-awesome.css"];
    },

    start: function () {
        Log.info("Starting module: " + this.name);

        this.firstFetch = false;
        this.loaded = false;
        this.updateMenu(1000);
    },

    updateMenu: function () {
        this.sendSocketNotification("GET_MENU", {
            resto: this.config.resto,
            lang: this.config.language
        });
        this.firstFetch = true;
        this.updateDom(1000);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "MENU_FETCHED") {
            this.loaded = true;
            this.menuData = JSON.parse(payload)
            this.updateDom();

        } else if (notification === "ERROR") {
            this.troubles = true;
            this.updateDom();
        }
    },

    getDom: function () {
        let wrapper = document.createElement("div");
        wrapper.className = "MMM-Howest-Resto";

        if (this.troubles) {
            wrapper.innerHTML = "Error fetching menu";
            return wrapper;
        }

        if (!this.firstFetch) {
            wrapper.innerHTML = "Scraping menu...";
            return wrapper;
        }

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            return wrapper;
        }

        const menuTable = document.createElement("table");
        menuTable.className = "menu-table";

        const headerRow = document.createElement("tr");
        headerRow.className = "menu-header";
        menuTable.appendChild(headerRow);

        // Header Columns
        const dayHeader = document.createElement("th");
        dayHeader.innerHTML = "Day";
        headerRow.appendChild(dayHeader);

        const dateHeader = document.createElement("th");
        dateHeader.innerHTML = "Date";
        headerRow.appendChild(dateHeader);

        const itemsHeader = document.createElement("th");
        itemsHeader.innerHTML = "Menu";
        headerRow.appendChild(itemsHeader);

        for (const menuEntry in this.menuData) {
            const row = document.createElement("tr");
            row.className = "menu-row";
            menuTable.appendChild(row);

            const dayCell = document.createElement("td");
            dayCell.className = "menu-day";
            dayCell.innerHTML = menuEntry;
            row.appendChild(dayCell);

            const dateCell = document.createElement("td");
            dateCell.className = "menu-date";
            dateCell.innerHTML = this.menuData[menuEntry].date;
            row.appendChild(dateCell);

            const itemsCell = document.createElement("td");
            itemsCell.className = "menu-items";
            itemsCell.innerHTML = this.menuData[menuEntry].items.join(", ");
            row.appendChild(itemsCell);
        }

        wrapper.appendChild(menuTable);
        return wrapper;
    },
});
