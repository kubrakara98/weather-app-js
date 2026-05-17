const apiKey="03763d14d45bf198dd637d06ee7e7118";
const weatherForm=document.getElementById("weatherForm");
const cityInput=document.getElementById("city");
const weatherResult=document.getElementById("weatherResult");



weatherForm.addEventListener("submit",function(event){
    event.preventDefault();
    const city=document.querySelector("#cityInput").value;
    if(city===""){
        weatherResult.style.color="red";
        weatherResult.innerHTML="Lütfen bir şehir adı giriniz!";
        return;
    }
    getWeather(city);
});

async function getWeather(city){ 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`; 
    try{
        const response=await fetch(url); 

        if(!response.ok){
            throw new Error("Şehir Bulunmadı"); 
        }
        const data=await response.json();
        displayWeather(data);
    }
    catch(error){
        weatherResult.style.color="red"; weatherResult.innerHTML="Hata: "+error.message;
    }
}

function displayWeather(data){ 
    weatherResult.innerHTML="";// Önceki sonuçları temizle
    weatherResult.style.color="black";// Renk sıfırlama

    //api verileri sınıflandırma(dokumantasyon bilgileri)
    const { name, main: { temp, humidity }, weather } = data;
    const { description } = weather[0];

    //hava durumuna göre ikon ekleme
    const iconUrl=`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherResult.innerHTML=`<h2>${name}</h2><img src='${iconUrl}' alt='Hava İkonu'><p>Sıcaklık: ${temp}°C</p><p>Durum: ${description}</p><p>Nem: % ${humidity}</p>`;

    const status=description.toLowerCase(); 
    const body=document.body; 

    switch (true) {
    case status.includes("açık") || status.includes("güneş"):
        // Güneşli hava için canlı, sıcak bir sarı-turuncu degrade
        body.style.background = "linear-gradient(135deg, #fce38a, #f38181)";
        break;
        
    case status.includes("bulut"):
        // Bulutlu/parçalı bulutlu hava için modern gri-mavi tonları
        body.style.background = "linear-gradient(135deg, #828890, #3e4252)";
        break;
        
    case status.includes("yağmur") || status.includes("çiseleme"):
        // Yağmurlu hava için koyu, ıslak bir mavi-gri tonu
        body.style.background = "linear-gradient(135deg, #154a86, #a5b1c2)";
        break;
        
    case status.includes("kar"):
        // Kar için daha soft bir kış tonu 
        body.style.background = "linear-gradient(135deg, #87b7e6, #ffffff)";
        break;
        
    case status.includes("fırtına") || status.includes("şimşek"):
        // Fırtınalı hava için dinamik mor-siyah tonları
        body.style.background = "linear-gradient(135deg, #141d26, #485460)";
        break;

    default:
        // Eğer yukarıdakilerden hiçbiri tutmazsa varsayılan
        body.style.background = "linear-gradient(135deg, #20bd47, #a29bfe)";
        break;
    }
} 
