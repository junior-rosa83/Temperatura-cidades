const key = '7c9ec2819947ae54ec74d93cd68fb94d'
const page = document.querySelector('.page')
const div = document.createElement('div')

document.querySelector('.searchCity input').addEventListener('keypress', function(event){
  if(event.key === 'Enter') {
    valueInput()
  }
})

function valueInput() {
  div.innerHTML = ''
  
  var input = document.querySelector('.searchCity input').value
  if(input.length == 0){
    alert('Digite o nome de alguma cidade')
    return
  }
  
  document.querySelector('.searchCity input').value = ''
  dados(input)
}

async function dados(cidade) {
  const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())
  
  if(dados.cod !== 200) {
    alert('Não foi possivel localizar...')
    return
  }

  createRow(dados)
}

function createRow(dados) {
  div.innerHTML = `
  <p class="nameCity">${dados.name}</p> 
  <section>
    <div class="temperature">
      <img class="imageTemp" src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png" alt="">
      <div class="tempName">
        <p class="temp">${dados.main.temp.toFixed(1)}°C</p>
        <p class="state">${dados.weather[0].description}</p> 
      </div>
    </div> 
    <div class="boxes" id="box1">
      <div class="box">
        <img src="img/Humidity.png" alt="">
        <div class="divBox"> 
          <P>Umidade</P>
          <span class="">${dados.main.humidity}%</span> 
        </div>    
      </div>
      <div class="box" id="box2">
        <img src="img/wind.png" alt="">
        <div class="divBox"> 
          <P>Vento</P>
          <span class="">${dados.wind.speed.toFixed(1)}Km</span> 
        </div>    
      </div>  
      <div class="box" id="box3">
        <img src="img/tempHot.png" alt="">
        <div class="divBox"> 
          <P>Temp Máx</P>
          <span class="tempMax">${dados.main.temp_max.toFixed(1)}°C</span> 
        </div>    
      </div>  
      <div class="box" id="box4">
        <img src="img/tempCold.png" alt="">
        <div class="divBox"> 
          <P>Temp Min</P>
          <span class="tempMin">${dados.main.temp_min.toFixed(1)}°C</span> 
        </div>    
      </div>
    </div>
  </section>
  `
  page.appendChild(div)
}
