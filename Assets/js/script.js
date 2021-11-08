var cityFormE1 = document.querySelector("#city-form");
var cityBtnE1 = document.querySelector("#citybtn");
var cityNameE1 = document.querySelector("#city");


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
                    }
                    )
                }
            }
            )
    });
});

//$.trim(cityNameE1) 