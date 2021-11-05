const weatherdetail =document.querySelector('.weather');
const weathers = document.querySelector('#weather-form')
const cityinput=document.querySelector('#city-input')

const fetchdata=async(city)=>{
    const url=`/api?q=${city}`;
    const response=await fetch(url);
    const data = await response.json();
   
    if(response.status===429){
      alert('Too many requests, please try again later.');
    }

    if(response.cod==='404'){
        alert('city not found');
        return;
    }

    if(response.cod==='401'){
       alert('invalid api key');
       return;
    }
    const displaydata={
        place:data.name,
        temp:tempincelcius(data.main.temp)
    }

    addData(displaydata);
}

const tempincelcius=(temp)=>{
    return parseFloat(temp-273.15).toFixed(2);
}

const addData=(value)=>{
    weatherdetail.innerHTML=`
      <h1>weather in ${value.place}</h1>
      <h2>${value.temp} &deg;C</h2>
    `
    cityinput.value="";
}

weathers.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(cityinput.value===""){
        alert("please input city name");
    }
    else{
        fetchdata(cityinput.value);
    }
})

// fetchdata(Delhi);