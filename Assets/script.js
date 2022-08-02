var searchButton = $(".searchButton");

var apiKey = "55da93c9165a7f149a7c143fa11b661c";

// for loop to append data on HTML page
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item"); 
    cityName.append("<li>" + city + "</li>");
}

function citySearch () {
    var searchInput = $(".searchInput").val();
    console.log(searchInput);
    fetchLatLon(searchInput);
}

// function to pull in the weather api
function fetchLatLon(city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(data.name);

        // adds cities to local storage
        var cities = localStorage.getItem("cities") || [];
        cities.push(data.name);
        console.log(cities);
        localStorage.setItem("cities", cities);

        var parent = document.querySelector(".card-title");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        var cityName = document.createElement("h2");
        cityName.textContent = "Weather in " + data.name;
        document.querySelector(".card-title").append(cityName);
        fetchWeatherData(lat, lon);
        console.log(data.coord.lat);
    })
}

// function to pull in latitude and longitude info
function fetchWeatherData(lat, lon) {
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var dataObject = data;
        renderTodayCard(dataObject);

        var temp = document.createElement("h3")
        temp.textContent = "Temperature is: " + dataObject.current.temp + " deg";

        var humidity = document.createElement("h3")
        humidity.textContent = "Humidity is: " + dataObject.current.humidity + "%";

        var wind = document.createElement("h3")
        wind.textContent = "Wind is: " + dataObject.current.wind_speed + "mph";

        var uvIndex = document.createElement("h3")
        uvIndex.textContent = "UV Index: " + dataObject.current.uvi;

        var uvColor = document.createElement("span")
        uvColor.textContent = dataObject.current.uvi;
        console.log(uvColor.textContent);
                    var changeColor = function(uvi) {
                        const uvIndex = parseFloat(uvi.textContent);
                    if(uvIndex < 2){
                        uvi.style.backgroundColor = 'green';
                    } else if(uvIndex > 2 && uvIndex <= 5){
                        uvi.style.backgroundColor = 'yellow';
                    } else if(uvIndex > 5 && uvIndex <= 7){
                        uvi.style.backgroundColor = 'orange';
                    } else if(uvIndex >7){
                        uvi.style.backgroundColor = 'red';
                    }
                }
                changeColor(uvColor);
                console.log(uvColor);

        document.querySelector(".card-title").append(temp, humidity, wind, uvIndex, uvColor);
    })
}

function renderTodayCard(data) {
    console.log(data);
}

var keys = 0;
searchButton.click(function () {
    citySearch();


            // function changeUvColor(input, uvi){
        //     $(input).removeClass();
        //     if (uvi <= 2){
        //         $(input).addClass('low');
        //     }
        //     else if(uvi > 2 && uvi <= 5){
        //         $(input).addClass('moderate');
        //     }
        //     else if(uvi > 5 && uvi <= 7){
        //         $(input).addclass('high');
        //     }
        //     else if(uvi > 7){
        //         $(input).addClass('very-high');
        //     }
        //     console.log(changeUvColor);
        // }


});