
// WEATHER API
// https://api.darksky.net/forecast/917523edc955818a25610c5d1fdb3b62/37.8267,-122.4233

// formula for C
// (temperature - 32) * (5 / 9);

// SVG ICONS
// https://darkskyapp.github.io/skycons/

// weather app workout list : 

//1 get latitude and longitude 
//2 get API information and modify 
// 3 request information from API
// use proxy if api is blocking access
// when you get information .then convert API information into JSON
//set DOM elements from API
// replace every (-) that you get from API icon with (_) and make all letters uppercaseso that skycons can load propertly

/* const { temperature} = data.currently; shorter syntax so you dont type data.currently.SOMETHING every time */



window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span')

    //get latitude and longitude 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // use proxy if api is blocking access
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/917523edc955818a25610c5d1fdb3b62/${lat},${long}`;

            // request information from API
            fetch(api)
                // when you get information .then convert API information into JSON
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    // collect information from API
                    /* const { temperature} = data.currently; shorter syntax so you dont type data.currently.SOMETHING every time */
                    const { temperature, summary, icon } = data.currently;
                    //set DOM elements from API

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    // set icon
                    setIcons(icon, document.querySelector('.icon'));

                    // set celsus/ferinhate

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }
    // setting Icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        // replace every (-) that you get from API icon with (_) and make all letters uppercaseso that skycons can load propertly
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});