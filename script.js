const date = new Date();
let presentDay = new Date().toLocaleString('en-us', { weekday: 'long' });

let weekdayno;
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"]


// Declaring the variables
let lon;
let lat;
let lang = "en";

let hour = date.getHours();
let minutes = date.getMinutes();

let countt = "AM";
// let countw = "AM";
// let countx = "AM";
// let county = "AM";
// let countz = "AM";


let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");

let after3hrs = document.querySelector(".after3hrs");
let after6hrs = document.querySelector(".after6hrs");
let after9hrs = document.querySelector(".after9hrs");
let after12hrs = document.querySelector(".after12hrs");

let after3hoursicon = document.querySelector(".after3hoursicon");
let after6hoursicon = document.querySelector(".after6hoursicon");
let after9hoursicon = document.querySelector(".after9hoursicon");
let after12hoursicon = document.querySelector(".after12hoursicon");

let after1day = document.querySelector(".after1day");
let after2day = document.querySelector(".after2day");
let after3day = document.querySelector(".after3day");
let after4day = document.querySelector(".after4day");

let after1daytemp = document.querySelector(".after1daytemp");
let after2daytemp = document.querySelector(".after2daytemp");
let after3daytemp = document.querySelector(".after3daytemp");
let after4daytemp = document.querySelector(".after4daytemp");



const kelvin = 273;



if (minutes < 10) {
    minutes = "0" + date.getMinutes();
}

if (hour > 12) {
    hour = date.getHours() - "12";
    countt = "PM";
}


let w = hour + 3;
let x = hour + 6;
let y = hour + 9;
let z = hour + 12;


function getWeekday(presentDay) {
    for (let i = 0; i < 7; i++) {
        if (weekday[i] === presentDay) {
            weekdayno = i;
        }
    }
}
getWeekday(presentDay)


if (weekday > 6) {
    weekdayno = weekday - 6;
}


after1day = weekday[weekdayno + 1];
after2day = weekday[weekdayno + 2];
after3day = weekday[weekdayno + 3];
after4day = weekday[weekdayno + 4];


document.querySelector(".time").innerHTML = `${hour}:${minutes} ${countt}`;
document.querySelector(".after3hourstime").innerHTML = `${w}:${minutes} `;
document.querySelector(".after6hourstime").innerHTML = `${x}:${minutes} `;
document.querySelector(".after9hourstime").innerHTML = `${y}:${minutes} `;
document.querySelector(".after12hourstime").innerHTML = `${z}:${minutes}`;

document.querySelector(".after1day").innerHTML = `${after1day}`;
document.querySelector(".after2day").innerHTML = `${after2day}`;
document.querySelector(".after3day").innerHTML = `${after3day}`;
document.querySelector(".after4day").innerHTML = `${after4day}`;




window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // API ID


            // API URL
            const base = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df&lang=${lang}`;


            const forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df&exclude=hourly,current,minutely&units=metric`;

            // Calling the API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    temperature.textContent =
                        Math.floor(data.list[0].main.temp - kelvin) + "°C";
                    summary.textContent = data.list[0].weather[0].description;
                    loc.textContent = data.city.name + "," + data.city.country;
                    after3hrs.textContent = Math.floor(data.list[1].main.temp - kelvin) + "°C";
                    after6hrs.textContent = Math.floor(data.list[2].main.temp - kelvin) + "°C";
                    after9hrs.textContent = Math.floor(data.list[3].main.temp - kelvin) + "°C";
                    after12hrs.textContent = Math.floor(data.list[4].main.temp - kelvin) + "°C";
                    let iconafter3hrs = data.list[1].weather[0].icon;
                    let iconafter6hrs = data.list[2].weather[0].icon;
                    let iconafter9hrs = data.list[3].weather[0].icon;
                    let iconafter12hrs = data.list[4].weather[0].icon;

                    after3hoursicon.innerHTML =
                        `<img src="icons/${iconafter3hrs}@2x.png" style= 'height:2rem'/>`;
                    after6hoursicon.innerHTML =
                        `<img src="icons/${iconafter6hrs}@2x.png" style= 'height:2rem'/>`;
                    after9hoursicon.innerHTML =
                        `<img src="icons/${iconafter9hrs}@2x.png" style= 'height:2rem'/>`;
                    after12hoursicon.innerHTML =
                        `<img src="icons/${iconafter12hrs}@2x.png" style= 'height:2rem'/>`;

                });

            fetch(forecast)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    after1daytemp.textContent = Math.floor(data.daily[0].temp.max) + "°C  ↑   " + Math.floor(data.daily[0].temp.min) + "°C ↓";
                    after2daytemp.textContent = Math.floor(data.daily[1].temp.max) + "°C  ↑   " + Math.floor(data.daily[1].temp.min) + "°C ↓";
                    after3daytemp.textContent = Math.floor(data.daily[2].temp.max) + "°C  ↑   " + Math.floor(data.daily[2].temp.min) + "°C ↓";
                    after4daytemp.textContent = Math.floor(data.daily[3].temp.max) + "°C  ↑   " + Math.floor(data.daily[3].temp.min) + "°C ↓";
                });
        });


    }
});

