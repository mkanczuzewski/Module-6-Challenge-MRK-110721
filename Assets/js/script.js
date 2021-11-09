var cityFormE1 = document.querySelector("#city-form");
var cityBtnE1 = document.querySelector("#citybtn");
var cityNameE1 = document.querySelector("#city");
var cityLat = null;
var cityLon = null;
const currentWeatherE2 = document.getElementById('currentWeather')


$(document).ready(function() 
{
    $(cityBtnE1).click(function() 
    {
        //alert($(cityNameE1).val());
        //format the open weather API URL
        var cityName = $(cityNameE1).val()
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + $.trim(cityName) + '&appid=d318a1a45ba023e17ddc1da41d22b214';
        console.log(apiUrl)

        fetch(apiUrl)
            .then(function(response)
            {
                if (response.ok)
                {
                    console.log(response);
                    response.json().then(function(data)
                    {
                        console.log(data);
                        cityLat = data['coord'].lat;
                        cityLon = data['coord'].lon;
                        oneCallApi();
                    });
                } else 
                {
                    alert('Error: ' + response.statusText);
                }
            })
    });
});

function oneCallApi () 
{
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=d318a1a45ba023e17ddc1da41d22b214';
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response)
        {
            if (response.ok)
            {
                console.log(response);
                response.json().then(function(data)
                {
                    console.log(data);
                    let curDt = data['current'].dt;
                    let curDtMil = curDt*1000;
                    let date = new Date(curDtMil);
                    let curTempE2 = data['current'].temp;
                    let curWindE2 = data['current'].wind_speed;
                    let curHumE2 = data['current'].humidity;
                    let curUVE2 = data['current'].uvi;

                    var cityName = $(cityNameE1).val()
                    $(currentWeatherE2).append('<div id="curCity" class="h3 text-uppercase">'+cityName+" - "+date+'</div>');
                    $(currentWeatherE2).append('<div id="curTemp" class="li">'+"Temp: "+curTempE2+' °F'+'</div>');
                    $(currentWeatherE2).append('<div id="curWind" class="li">'+"Wind Speed: "+curWindE2+' MPH'+'</div>');
                    $(currentWeatherE2).append('<div id="curHum" class="li">'+"Humidity: "+curHumE2+' %'+'</div>');
                    $(currentWeatherE2).append('<span id="curUV" class="li">'+"UV Index "+curUVE2+'</span>');

                    if (curUVE2 <= 2)
                    {
                        $(curUV).css("background-color", "green");
                        $(curUV).css("color", "white");
                    }
                    else if (curUVE2 >=3 && curUVE2 <=5) 
                    {
                        $(curUV).css("background-color", "yellow");
                        $(curUV).css("color", "white");
                    }
                    else
                    {
                        $(curUV).css("background-color", "red");
                        $(curUV).css("color", "white");
                    }
                });
            } else 
            {
                alert('Error: ' + response.statusText);
            }
        })
}
