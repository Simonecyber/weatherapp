/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const api = {\r\n    key: \"9f11284868fdf52b7ff9cdb0d1e61737\",\r\n    baseurl: \"http://api.openweathermap.org/data/2.5/\"\r\n}\r\n\r\nconst lang = \"it\";\r\n\r\n//geolocalizzazione parte appena aperto il sito chiedendo il consenso\r\nwindow.addEventListener(\"load\", () => {\r\n    let long;\r\n    let lat;\r\n\r\n    navigator.geolocation.getCurrentPosition(position => {\r\n        long = position.coords.longitude;\r\n        lat = position.coords.latitude;\r\n\r\n        //recupero file JSON\r\n        fetch(`${api.baseurl}weather?lat=${lat}&lon=${long}&units=metric&lang=it&appid=${api.key}`)\r\n        .then(weather => {\r\n            return weather.json();\r\n\r\n        })\r\n        .then (displayResults)\r\n\r\n    });\r\n});\r\n\r\n//selezione del riquadro di ricerca\r\nconst searchBox = document.querySelector('.search-box');\r\nsearchBox.addEventListener('keypress', setQuery);\r\n\r\n function setQuery(evt) {\r\n    if (evt.keyCode == 13) {\r\n        getResults(searchBox.value);\r\n    }\r\n }\r\n\r\n //funzione per recuperare file JSON \r\n function getResults (query) {\r\n    fetch(`${api.baseurl}weather?q=${query}&units=metric&lang=it&APPID=${api.key}`)\r\n    .then(weather => {\r\n        return weather.json();\r\n    }).then(displayResults)\r\n }\r\n\r\n //Funzione che mostra i dati\r\n\r\n function displayResults (weather) {\r\n    //console.log(weather);\r\n    //Dati principali\r\n    let city = document.querySelector('.location .city');\r\n    city.innerText = `${weather.name}, ${weather.sys.country}`;\r\n\r\n    let now = new Date();\r\n    let date = document.querySelector('.location .date');\r\n    date.innerText = dateBuilder(now);\r\n\r\n    let temp = document.querySelector('.current .temp');\r\n    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;\r\n\r\n    let weather_el = document.querySelector('.current .weather');\r\n    weather_el.innerText = (weather.weather[0].description).toUpperCase();\r\n\r\n//icone tempo\r\n    let iconWeather = document.querySelector('.imgContainer');\r\n    iconWeather.innerHTML = `<img class=\"iconeTempo\" src=\"icone/${weather.weather[0].icon}.png\"/>`;\r\n\r\n//dati minori\r\n    let hi = document.querySelector('.hi ');\r\n    hi.innerHTML = `<span style=\"margin-right:10px;\">Temperatura max:</span>${Math.round(weather.main.temp_max)}°C`;\r\n\r\n    let low = document.querySelector('.low ');\r\n    low.innerHTML = `<span style=\"margin-right:10px;\">Temperatura min:</span>${Math.round(weather.main.temp_min)}°C <br><br>`;\r\n\r\n   let sunrise = document.querySelector('.alba');\r\n   sunrise.innerHTML = `<sp\r\n   an style=\"margin-right:10px;\">Il sole sorge alle:</span>${msToTime(weather.sys.sunrise)}`;\r\n\r\n   let sunset = document.querySelector('.tramonto');\r\n   sunset.innerHTML = `<span style=\"margin-right:10px;\">Il sole tramonta alle:</span>${msToTime(weather.sys.sunset)}`;\r\n\r\n};\r\n\r\n\r\n//funzione costruzione data\r\nfunction dateBuilder (d){\r\n    let months = [\"Gennaio\",\"Febbraio\", \"Marzo\", \"Aprile\", \"Maggio\", \"Giugno\", \"Luglio\", \r\n    \"Agosto\", \"Settembre\", \"Ottobre\", \"Novembre\", \"Dicembre\"];\r\n    let days = [\"Domenica\", \"Lunedì\", \"Martedì\", \"Mercoledì\", \"Giovedì\", \"Venerdì\", \"Sabato\"];\r\n\r\n    let day = days[d.getDay()];\r\n    let date = d.getDate();\r\n    let month = months[d.getMonth()];\r\n    let year = d.getFullYear();\r\n\r\n    return `${day} ${date} ${month} ${year}`;\r\n};\r\n\r\n//funzione costruzione tempo per alba e tramonto\r\n\r\nfunction msToTime(msDurata) {\r\n    let date =  new Date (msDurata * 1000);\r\n    let hours = date.getHours();\r\n    let minutes = \"0\" + date.getMinutes();\r\n\r\n    return hours + ':' + minutes.substr(-2);\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });