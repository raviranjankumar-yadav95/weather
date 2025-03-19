const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide=document.querySelector('.city-hide')

// api 
search.addEventListener('click', () => {

    const APIKey = '6239df85d06e603f98a11d84c60d952c';
    const city = document.querySelector('.search-box input').value;


    if (city == "")
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent=city;
            container.style.height = '404px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

       
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if(cityHide.textContent==city){
            return;
        }else{
            cityHide.textContent=city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            },2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
    
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
    
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
    
                case 'Mlouds':
                    image.src = 'images/cloud.png';
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
    
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
    
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            const infoWeather =document.querySelector('.info-weather');
            const infoHumidity =document.querySelector('.info-humidity');
            const infoWind =document.querySelector('.info-wind');

            const enColoneInfoWeather =infoWeather.cloneNode(true);
            const enColoneInfoHumidity =infoHumidity.cloneNode(true);
            const enColoneInfoWind =infoWind.cloneNode(true);

            enColoneInfoWeather.id='clone-info-weather';
            enColoneInfoWeather.classList.add('active-clone');

            enColoneInfoHumidity.id='clone-info-humidity';
            enColoneInfoHumidity.classList.add('active-clone');


            enColoneInfoWind.id='clone-info-wind';
            enColoneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement('afterend', enColoneInfoWeather);

                infoHumidity.insertAdjacentElement('afterend', enColoneInfoHumidity);

                infoWind.insertAdjacentElement('afterend', enColoneInfoWind);
            }, 2200);

            const coloneInfoWeather=document.querySelectorAll('.info-weather.active-clone');
            const totalColoneInfoWeather=coloneInfoWeather.length;
            const coloneInfoWeatherFirst=coloneInfoWeather[0];

            const coloneInfoHumidity=document.querySelectorAll('.info-humidity.active-clone');
            const coloneInfoHumidityFirst=coloneInfoHumidity[0];

            
            const coloneInfoWind=document.querySelectorAll('.info-wind.active-clone');
            const coloneInfoWindFirst=coloneInfoWind[0];

            if(totalColoneInfoWeather>0){
                coloneInfoWeatherFirst.classList.remove('active-clone');
                coloneInfoHumidityFirst.classList.remove('active-clone');
                coloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    coloneInfoWeatherFirst.remove();
                    coloneInfoHumidityFirst.remove();
                    coloneInfoWindFirst.remove();
                }, 2200);
            }
        }


    });

});


// 