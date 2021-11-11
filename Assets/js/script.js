var cityFormE1 = document.querySelector("#city-form");
var cityBtnE1 = document.querySelector("#citybtn");
var cityNameE1 = document.querySelector("#city");
var getHistoryBtn = document.querySelector("#historyBtn");
var cityLat = null;
var cityLon = null;
const currentWeatherE2 = document.getElementById('currentWeather');
const fiveDayWeatherE2 = document.getElementById('fiveDayWeather');
const weatherE2 = document.getElementById('history');


//on search click query to first weather api to convert citys to latitude and longitude
$(document).ready(function() 
{
    weatherHistory();
    //console.log(getHistoryBtn);
    // getHistoryBtn.forEach(button =>
    //     {
    //         button.addEventListener('click', event=>
    //         {
    //             console.log(event.target.id)
    //             // if (event.target.id == correctAns.innerText)
    //             // {
    //             //     document.getElementById("correct").style.display = "flex";
    //             // }
    //             // else{
    //             //     document.getElementById("incorrect").style.display = "flex";
    //             //     timeLeft = timeLeft - 10;
    
    //             // }
    //             // setTimeout(nextQuestion, 1000);
    //         });
    //     });

    $(cityBtnE1).click(function() 
    {
        //format the open weather "current weather data" API URL
        var cityName = $(cityNameE1).val()
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + $.trim(cityName) + '&appid=d318a1a45ba023e17ddc1da41d22b214';
        
        if (localStorage.getItem(cityName) === null)
        {
        localStorage.setItem(cityName, JSON.stringify(cityName));
        }

        weatherHistory();
        
        fetch(apiUrl)
            .then(function(response)
            {
                if (response.ok)
                {
                    response.json().then(function(data)
                    {
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

function weatherHistory(){

    for (var i = 0; i < localStorage.length; i++)
    {
        let weatherStorage = localStorage.key(i);
        //$(weatherE2).append('<button type="button" class="btn btn-secondary btn-block" id="historyBtn" onclick="bob("'+weatherStorage+'")">'+weatherStorage+'</button>')
        $(weatherE2).append('<button type="button" class="btn btn-secondary btn-block" id="historyBtn" onclick="getElementById(\'city\').val()="'+weatherStorage+'">'+weatherStorage+'</button>')
    }
};

function bob(cityName){
    console.log(cityName)
}

//Once city is converted to latitude and longitude, query to second api and build current weather
function oneCallApi () 
{
    //format the open weather "One Call" API URL
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=d318a1a45ba023e17ddc1da41d22b214';

    fetch(apiUrl)
        .then(function(response)
        {
            if (response.ok)
            {
                response.json().then(function(data)
                {
                    let curDt = data['current'].dt;
                    let date = new Date(curDt*1000);
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
                forecastApi();
            } else 
            {
                alert('Error: ' + response.statusText);
            }
        })
};

//Dynamically build five day weather cards
let forecastApi = function()
{
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=d318a1a45ba023e17ddc1da41d22b214';
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response)
        {
            if (response.ok)
            console.log(response);
            {
                response.json().then(function(data)
                {
                    console.log(data);
                    for (var i = 1; i < 6; i++)
                    {
                        let fiveDayDate = data['daily'][i].dt; 
                        let fiveDate = new Date(fiveDayDate*1000).toLocaleDateString("en-US");
                        let icons = data['daily'][i].weather[0].icon;
                        let urlIcons = 'https://openweathermap.org/img/wn/'+icons+'.png';
                        let fiveDayTemp = data['daily'][i].temp.day;
                        let fiveDayWind = data['daily'][i].wind_speed;
                        let fiveDayHumid = data['daily'][i].humidity;
                        $(fiveDayWeatherE2).append('<div class="col-lg-2 col-md-4"><div class="card"><div class="card-body"><h5 class="card-title">'+fiveDate+'</h5><div><img id="weatherIcon" src='+urlIcons+'></div><div>Temp: '+fiveDayTemp+' °F</div><div>Wind: '+fiveDayWind+' MPH</div><div>Humidity: '+fiveDayHumid+' %</div></div></div></div>')
                    }
                });
            }
        })    
};
