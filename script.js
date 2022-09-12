const citySearch = document.getElementById('city');
const btn = document.getElementById('btn');
const uiCity = document.getElementById('uiCity');
const country = document.getElementById('country');
const weather = document.getElementById('weather');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

btn.addEventListener('click', function () {
  const city = citySearch.value;
  content.style.display = 'block';
  uiCity.textContent = 'Loading....';

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e3d65079656c6a2d12ba80dbba91474e`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setTimeout(() => {
        if (data.cod == '404') {
          uiCity.textContent = 'City Not Found';
          country.textContent = '';
          weather.textContent = '';
          temp.textContent = '- °C';
          icon.setAttribute(
            'src',
            'https://tse2.mm.bing.net/th?id=OIP.cmTcUqX-2WFqJofdiwQLBQHaHa&pid=Api&P=0'
          );
        } else {
          uiCity.textContent = 'Weather in ' + city;
          country.textContent = data.sys.country;
          weather.textContent =
            data.weather[0].main + '   /  ' + data.weather[0].description;
          temp.textContent = data.main.temp + ' °C';
          icon.setAttribute(
            'src',
            'https://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '@2x.png'
          );
        }
      }, 1000);
    });

  citySearch.value = '';
});
