async function clickButton() {
  let chaveAPI = "cfecc626caba42e3ffbae33f551d91b8";
  let cidade = document.querySelector(".input-cidade").value;
  let boxPesquisa = document.querySelector(".box-pesquisa");
  //Validar input vazio
  if (!cidade.trim()) {
    alert("Digite uma cidade");
    return;
  }

  let urlSite = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&units=metric&lang=pt_br`;
  let enderecoServidor = await fetch(urlSite);

  if (!enderecoServidor.ok) {
    alert("Cidade não encontrada, digite novamente!");
    return;
  }

  let json = await enderecoServidor.json();
  console.log(json);

  boxPesquisa.innerHTML = `
            <h1 class ="cidade">Cidade: ${json.name}</h1>
            <p class ="temperatura">Temperatura: ${Math.floor(json.main.temp)} °C</p>
            <p class ="temperaturaMinima">Temperatura minima: ${Math.floor(json.main.temp_min)} °C</p>
            <p class ="umidade">Umidade: ${json.main.humidity}% </p>
            <img class = "iconeBox" src = "https://openweathermap.org/img/wn/${json.weather[0].icon}.png">
  `;
}
