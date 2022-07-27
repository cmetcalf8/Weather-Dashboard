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
        var cityName = document.createElement("h2");
        cityName.textContent = "Weather in " + data.name;
        document.querySelector(".card-title").append(cityName);
        fetchWeatherData(lat, lon);
        console.log(data.coord.lat);
    })
}
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

        document.querySelector(".card-title").append(temp, humidity, wind);
    })
}

function renderTodayCard(data) {

    console.log(data);
}

var keys = 0;
searchButton.click(function () {
    citySearch();


    //         //UV index URL
    //         var urlUV = "https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}";

    //         // UV index
    //         $.ajax({
    //             url: urlUV, 
    //             method: "GET"
    //         }).then(function (response) {
    //             var currentUV = currentTemp.append("<p>") + "UV Index: " + response.value + "</p>".addClass("card-text");
    //             currentUV.addClass("UV");
    //             currentTemp.append(currentUV);
    //         });
    //     });

    //     $.ajax({
    //         url: urlFiveDay,
    //         method: "GET"
    //     }).then(function (response) {
    //         // Array for 5-days 
    //         var day = [0, 8, 16, 24, 32];
    //         var fiveDayCard = $(".fiveDayCard").addClass("card-body");
    //         var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
    //         fiveDayDiv.empty();
    //         // For each for 5 days
    //         day.forEach(function (i) {
    //             var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
    //             FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

    //             fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


    //         })

    //     });
    // }
});