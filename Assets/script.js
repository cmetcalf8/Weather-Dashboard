$(document).ready(function () {

    var searchButton = $(".searchButton");

    var apiKey = "55da93c9165a7f149a7c143fa11b661c";

    var city = JSON.parse(localStorage.getItem("cities")) || [];
    var cityName = $(".list-group").addClass("list-group-item");

    // for loop to append cities on web page
    function appendHistory() {
        console.log(city.length);
        cityName.empty();
        for (var i = 0; i < city.length; i++) {
            var liTag = document.createElement("li");
            liTag.textContent = city[i];
            cityName.append(liTag);
        }
    }

    // function to get local storage and call functions
    function citySearch(event) {
        console.log($(this));
        if (event.target.matches("li")){
            fetchLatLon($(this).text())
        } else {
        var searchInput = $(".searchInput").val();
        var cities = JSON.parse(localStorage.getItem("cities")) || [];
        cities.push(searchInput);
        console.log(cities);
        localStorage.setItem("cities", JSON.stringify(cities));
        console.log(searchInput);
        fetchLatLon(searchInput);
        appendHistory();
        }
    }


    // function to pull in the weather api
    function fetchLatLon(city) {
        var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        fetch(apiURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                console.log(data.name);

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

    // function to pull in current weather card
    function fetchWeatherData(lat, lon) {
        var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`
        fetch(apiURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var dataObject = data;
                fiveDay(data.daily);
                renderTodayCard(dataObject);

                var temp = document.createElement("h3")
                temp.textContent = "Temperature is: " + dataObject.current.temp + " deg";

                var humidity = document.createElement("h3")
                humidity.textContent = "Humidity is: " + dataObject.current.humidity + "%";

                var wind = document.createElement("h3")
                wind.textContent = "Wind is: " + dataObject.current.wind_speed + " mph";

                var uvColor = document.createElement("span")
                uvColor.textContent = "UV Index: " + dataObject.current.uvi;
                console.log(uvColor.textContent);
                var changeColor = function (uvi) {
                    const uvIndex = parseFloat(dataObject.current.uvi);
                    if (uvIndex < 2) {
                        uvi.style.backgroundColor = 'green';
                    } else if (uvIndex > 2 && uvIndex <= 5) {
                        uvi.style.backgroundColor = 'yellow';
                    } else if (uvIndex > 5 && uvIndex <= 7) {
                        uvi.style.backgroundColor = 'orange';
                    } else if (uvIndex > 7) {
                        uvi.style.backgroundColor = 'red';
                    }
                }
                changeColor(uvColor);
                console.log(uvColor);

                document.querySelector(".card-title").append(temp, humidity, wind, uvColor);
            })
    }

    function renderTodayCard(data) {
        console.log(data);
    }

    // function for the five day forecast card
    function fiveDay(daily) {
        console.log(daily);
        var fiveDayEl = $("#fiveDay");
        fiveDayEl.empty();
        for (var i = 1; i < 6; i++) {
            var forecast = daily[i];
            var column = $("<div>");
            column.addClass("col");
            var date = $("<p>");
            date.text(moment.unix(forecast.dt).format("MM-DD-YYYY"));
            var image = $("<img>");
            console.log(forecast);
            image.attr("src", "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png");
            
            var temp = $("<p>");
            temp.text("Temp is: " + forecast.temp.day + " deg");
            var wind = $("<p>");
            wind.text("Wind is: " + forecast.wind_speed + " mph");
            var humidity = $("<p>")
            humidity.text("Humidity is " + forecast.humidity + "%");

            column.append(date, image, temp, wind, humidity);
            fiveDayEl.append(column);
        }
    };

    appendHistory();

    searchButton.click(function (event) {
        event.preventDefault();
        citySearch(event);
    });

    cityName.on("click", "li", citySearch);
});