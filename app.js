window.addEventListener('load',()=>{
    let long;
    let lat;
    let tepertureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSectionSpan = document.querySelector('.temperature span');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;
             const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/88b81145bac2d22aed8be77b90ef3e24/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                // console.log(data);
                const { temperature, summary,icon} = data.currently;
                //set dom element   
                temperatureDegree.textContent = temperature;
                tepertureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                let celcius = (temperature-32)*(5/9);
                setIcons(icon,document.querySelector('.icon'));


                //set tempertaure to celcius
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSectionSpan.textContent === 'F'){
                        temperatureSectionSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celcius);
                    }else{
                        temperatureSectionSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;


                    }
                })
            })

            
        });
    }else{
        h1.textContent = "this is nopt working";
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon =  icon.replace(/-/g,"_");
        const CurrentIcon = currentIcon.toUpperCase();
        console.log(CurrentIcon);
        
        skycons.play();
        return skycons.set(iconID,Skycons[CurrentIcon]);


    }
})