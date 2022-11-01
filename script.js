document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

   if (input !== '') {
    clearInfo();
    showWarning('Carregando..')

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=8d8c1b569894013a688fba750dac5f0b&units=metric&lang=pt_br`
    
    let result = await fetch(url);
    let json = await result.json();// a partir daqui da acessa o objeto

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAgle: json.wind.deg,
            })
        }else{
            clearInfo();
            showWarning('Não encontramos esta localização.')

        }

    }

})

function showInfo(json) {
    showWarning('')


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windAgle} <span>Km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAgle-90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none';
}