document.addEventListener("DOMContentLoaded", () => {
    const extensions = [
        {
            "logo": "./assets/images/logo-devlens.svg",
            "name": "DevLens",
            "description": "Quickly inspect page layouts and visualize element boundaries.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-style-spy.svg",
            "name": "StyleSpy",
            "description": "Instantly analyze and copy CSS from any webpage element.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-speed-boost.svg",
            "name": "SpeedBoost",
            "description": "Optimizes browser resource usage to accelerate page loading.",
            "isActive": false
        },
        {
            "logo": "./assets/images/logo-json-wizard.svg",
            "name": "JSONWizard",
            "description": "Formats, validates, and prettifies JSON responses in-browser.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-tab-master-pro.svg",
            "name": "TabMaster Pro",
            "description": "Organizes browser tabs into groups and sessions.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-viewport-buddy.svg",
            "name": "ViewportBuddy",
            "description": "Simulates various screen resolutions directly within the browser.",
            "isActive": false
        },
        {
            "logo": "./assets/images/logo-markup-notes.svg",
            "name": "Markup Notes",
            "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-grid-guides.svg",
            "name": "GridGuides",
            "description": "Overlay customizable grids and alignment guides on any webpage.",
            "isActive": false
        },
        {
            "logo": "./assets/images/logo-palette-picker.svg",
            "name": "Palette Picker",
            "description": "Instantly extracts color palettes from any webpage.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-link-checker.svg",
            "name": "LinkChecker",
            "description": "Scans and highlights broken links on any page.",
            "isActive": true
        },
        {
            "logo": "./assets/images/logo-dom-snapshot.svg",
            "name": "DOM Snapshot",
            "description": "Capture and export DOM structures quickly.",
            "isActive": false
        },
        {
            "logo": "./assets/images/logo-console-plus.svg",
            "name": "ConsolePlus",
            "description": "Enhanced developer console with advanced filtering and logging.",
            "isActive": true
        }
    ];

    let previousButton = document.getElementById("all-filter");

    const filerbutton = document.querySelectorAll(".filter");
    filerbutton.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-name");


            if (localStorage.getItem("theme") === "dark") {
                button.classList.add('dark:bg-red-400', 'dark:text-blue-900')
                button.classList.remove('dark:text-white')
                previousButton && previousButton !== button && previousButton.classList.remove('dark:bg-red-400', 'dark:text-blue-900');
                previousButton && previousButton !== button && previousButton.classList.add('dark:text-white', 'dark:bg-[#212636ff]');
                previousButton = button;
            } else {
                button.classList.add("bg-red-700", "text-white");
                button.classList.remove("bg-white");
                previousButton && previousButton !== button && previousButton.classList.remove("bg-red-700", "text-white");
                previousButton && previousButton !== button && previousButton.classList.add("bg-white");
                previousButton = button;
            }
            loadExtenstions(filter);
        });
    });

    const loadExtenstions = (filter) => {

        if (filter === "active") {
            filteredExtensions = extensions.filter(ext => ext.isActive);
        } else if (filter === "inactive") {
            filteredExtensions = extensions.filter(ext => !ext.isActive);
        } else {
            filteredExtensions = extensions;
        }

        const extensionsContainer = document.getElementById("cards-container");
        extensionsContainer.innerHTML = ""; // Clear any static placeholder cards

        filteredExtensions.forEach((extension, index) => {
            const card = document.createElement("div");
            card.className =
                "border-inherit rounded-xl p-4 flex flex-col gap-10 shadow-sm hover:shadow-md transition bg-white dark:bg-[#212636ff]";

            card.innerHTML = `
      <div class="flex gap-4">
        <img src="${extension.logo}" alt="${extension.name} logo" class="h-20">
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-bold dark:text-white">${extension.name}</h2>
          <p class="font-light dark:text-[#c7c7c7ff]">${extension.description}</p>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <button class="border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition hover:bg-red-700 dark:hover:bg-red-500 hover:text-white cursor-pointer dark:text-white dark:hover:text-black
        dark:hover:border-[#212636ff]">
          Remove
        </button>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" ${extension.isActive ? "checked" : ""} id="switch-${index}">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
            after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700 dark:peer-checked:bg-red-400">
            </div>
        </label>
      </div>
    `;

            extensionsContainer.appendChild(card);
        });

    };

    const html = document.documentElement;
    const darkToggle = document.getElementById("dark-toggle");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
        if (mediaQuery.matches) {
            html.classList.add("dark");
            darkToggle.src = "./assets/images/icon-sun.svg";
        } else {
            html.classList.remove("dark");
            darkToggle.src = "./assets/images/icon-moon.svg";
        }
    };

    applyTheme();

    mediaQuery.addEventListener("change", applyTheme);

    loadExtenstions("all");
});
