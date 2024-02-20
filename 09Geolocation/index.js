const electron = require("electron");
const axios = require("axios");
const { remote } = require('electron');
const { BrowserWindow } = remote;

// Importing app Module using Electron remote
const app = electron.remote.app;

let detect = document.getElementById("detect");
detect.addEventListener("click", () => {
    let locale = app.getLocale();
    let country = app.getLocaleCountryCode();

    console.log("Locale Detected - ", locale);
    console.log("Country Detected - ", country);

    // Making an HTTP GET REST API call
    axios.get(
        "https://restcountries.eu/rest/v2/alpha/"+ country).then((res) => {
        console.log(res);
        console.log("Country - ", res.data.name);
    });
});