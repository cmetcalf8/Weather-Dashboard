var searchButton = $(".searchButton");

var apiKey = "55da93c9165a7f149a7c143fa11b661c";

// for loop to append data on HTML page
for (var i = 0; i< localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item"); 
    cityName.append("<li>" + city + "</li>");
}

var keys = 0;
searchButton.click(function () {
    var searchInput = $(".searchInput").val();
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: currentWeather,
            method: "GET"
        }).then(function (response){
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            var local = localStorage.setItem(keys, response.name);
            keys = keys + 1;

            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateStrring("en-US"));
            currentName.append('<img src="');
            // what src to put above
            var currentTemp = currentName.append("<p>");
            currentName.append(currenTemp);
            currentTemp.append(",p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            //UV index URL
            var urlUV = "https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}";

            // UV index
            $.ajax({
                url: urlUV, 
                method: "GET"
            }).then(function (response) {
                var currentUV = currentTemp.append("<p>") + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(funciton (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayCard.empty();

            day.forEach(function (i) {
                var FiveDaytimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDaytimeUTC1 = FiveDaytimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class-fiveDaycolor>" + "<p>" + FiveDaytimeUTC1 + "</p>" + '<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        })
    };
});