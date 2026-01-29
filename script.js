async function clickButtonLupa() {
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
  boxPesquisa.innerHTML = `
            <h1 class ="cidade">Cidade: ${json.name}</h1>
            <p class ="temperatura">Temperatura: ${Math.floor(json.main.temp)} °C</p>
            <p class ="temperaturaMinima">Temperatura minima: ${Math.floor(json.main.temp_min)} °C</p>
            <p class ="umidade">Umidade: ${json.main.humidity}% </p>
            <p class ="umidade">Sensação térmica: ${Math.floor(json.main.feels_like)} °C </p>
            <img class = "iconeBox" src = "https://openweathermap.org/img/wn/${json.weather[0].icon}.png">
  `;
  //Apagar o input que já estava lá
  document.querySelector(".input-cidade").value = "";
}
//Faz com que apertar o ENTER também sirva no lugar de clicar na lupa
const inputCidade = document.querySelector(".input-cidade");
inputCidade.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    clickButtonLupa();
  }
});

function clickButtonMicrofone() {
  let speechRecognition = new window.webkitSpeechRecognition();
  speechRecognition.lang = "pt-BR";
  speechRecognition.start();

  speechRecognition.onresult = function (evento) {
    let vozParaTexto = evento.results[0][0].transcript;
    document.querySelector(".input-cidade").value = vozParaTexto;
    clickButtonLupa();
  };
}
const icon = document.querySelector("#icon-theme");
const botaoTema = document.querySelector("#toggle-theme");
botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.src = "img/sun-svgrepo-com.svg";
  } else {
    icon.src = "img/night-svgrepo-com.svg";
  }
});
