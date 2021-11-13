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

    $('#city-form').on('submit', () => {
        console.log('test1');
        // prevents default behaviour
        // Prevents event propagation
        return false;
    });
    
    // Click Search
    $(cityBtnE1).click(function() 
    {
        //format the open weather "current weather data" API URL
        var cityName = $(cityNameE1).val()
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + $.trim(cityName) + '&appid=d318a1a45ba023e17ddc1da41d22b214';
        
        if (localStorage.getItem(cityName) === null)
        {
        localStorage.setItem(cityName, JSON.stringify(cityName));
        }
        
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
            weatherE2.innerHTML="";
            weatherHistory();
    });
});

function weatherHistory(){

    for (var i = 0; i < localStorage.length; i++)
    {
        let weatherStorage = localStorage.key(i);
        $(weatherE2).append('<button type="button" class="btn btn-secondary btn-block" id="historyBtn" onclick="bob(\''+weatherStorage+'\')">'+weatherStorage+'</button>')
    }
};

function bob(cityName){
    cityNameE1.value=cityName;
    cityBtnE1.click();
}

    $('#city').keypress((e) => {
  
        // Enter key corresponds to number 13
        if (e.which === 13) {
            $('#city-form').submit();
            console.log('form submitted');
        }
    })

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
                   currentWeatherE2.innerHTML="";

                    let curDt = data['current'].dt;
                    let date = new Date(curDt*1000);
                    let curTempE2 = data['current'].temp;
                    let curWindE2 = data['current'].wind_speed;
                    let curHumE2 = data['current'].humidity;
                    let curUVE2 = data['current'].uvi;
                    let icons = data['daily'][0].weather[0].icon;
                    let urlIcons = 'https://openweathermap.org/img/wn/'+icons+'.png';
                    
                    var cityName = $(cityNameE1).val()
                    $(currentWeatherE2).append('<div id="curCity" class="h3 text-uppercase">'+cityName+" - "+date+'</div>');
                    $(currentWeatherE2).append('<div id="curIcon" class="li"><img id="weatherIcon" src='+urlIcons+'></img></div>');
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
                        $(curUV).css("color", "black");
                    }
                    else
                    {
                        $(curUV).css("background-color", "red");
                        $(curUV).css("color", "white");
                    }
                });
                fiveDayWeatherE2.innerHTML="";
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

    fetch(apiUrl)
        .then(function(response)
        {
            if (response.ok)
            {
                response.json().then(function(data)
                {
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
