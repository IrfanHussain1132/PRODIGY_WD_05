// const names=["irfan","hussain","sandy","mandy"];
// const people={
//     "names":"irfan",
//     "age":30,
//     "isemp":true,
//     "hobbies":["reading","writing"]
// }
// [{
//     "names":"irfan",
//     "age":30,
//     "isemp":true,
//     "hobbies":["reading","writing"]
// }, 
// {
//     "names":"hussain",
//     "age":18,
//     "isemp":false,
//     "hobbies":["smoking","wdrinking"]
// },
// {
//     "names":"sandy",
//     "age":22,
//     "isemp":true,
//     "hobbies":["fucking","writing"]
// },
// {
//     "names":"mandy",
//     "age":12,
//     "isemp":false,
//     "hobbies":["jerking","hacking"]
// }]
// const jsonString=JSON.stringify(names);
// // console.log(people);

// // fetch("https://pokeapi.co/api/v2/pokemon/ditto")
// //     .then(response =>{
// //         if(!response.ok){
// //             throw new Error("Could not fetch resource");
// //         }
// //         return response.json();
// //     })
// //     .then(data =>console.log(data.name))
// //     .catch(error=> console.error(error));
// async function fetchData(){
//     try{
//         const pokemonname=document.getElementById("pokemonname").value.toLowerCase();
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`);

//         if(!response.ok){
//             throw new Error("Could not fetch resource");
//         }
//         const data=await response.json();
//         const pokemonsprite=data.sprites.front_default;
//         const imgelement=document.getElementById("pokemonsprite");

//         imgelement.src=pokemonsprite;
//         imgelement.style.display="block";
//     }
//     catch(error){
//         console.error(error);
//     }
// }

const weartherform=document.querySelector(".weartherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey ="22416eb985fb4432b6a52a2369cd7779";

weartherform.addEventListener("submit",async event=>{

    event.preventDefault();

    const city=cityInput.value;

    if(city){
        try{
            const weartherdata=await getweatherdata(city);
            displayweatherInfo(weartherdata);
            
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city");
    }

});
async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    console.log(response);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();

}
function displayweatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = ""; 
    card.style.display = "flex";

    // Create elements
    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiddisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");  // Renamed to avoid conflict with function

    // Set text content
    citydisplay.textContent = city;
    tempdisplay.textContent = `${(temp - 273.5).toFixed(1)}°C`;
    humiddisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id); // Use function to get weather emoji

    // Add classes
    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiddisplay.classList.add("humiddisplay");
    descdisplay.classList.add("descdisplay");
    emojiDisplay.classList.add("weatheremoji");

    // Append to card
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiddisplay);
    card.appendChild(descdisplay);
    card.appendChild(emojiDisplay);
}

function getWeatherEmoji(wid) {
    switch (true) {
        case (wid >= 200 && wid < 600): // Consolidated cases for rain-related weather
            return "🌧️";
        case (wid >= 600 && wid < 700):
            return "❄️";
        case (wid >= 700 && wid < 800):
            return "💨";
        case (wid === 800):
            return "☀️";
        case (wid > 800 && wid < 900): // For cloud-related weather
            return "☁️";
        default:
            return "🌍"; // A generic emoji for unrecognized weather
    }
}

function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}







