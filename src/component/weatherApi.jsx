import { useEffect, useState } from "react"
import { FaLocationDot, FaWind } from "react-icons/fa6"
import { GiNightSleep } from "react-icons/gi"
import { WiCelsius, WiDaySunny, WiHumidity, WiThermometer } from "react-icons/wi"

export const Weather2 = ()=>{
    const [cityinput,setcityinput] = useState({city:""})
    const [weather2 , setweather2]= useState()
    const [lat,setlat]= useState()
    const [lon,setlon] = useState()
    const [error,seterror]= useState()
    const [weather,setweather]= useState()
    const [name,setname]=useState({name:""})
    const [temp,settemp] = useState({temp:""})
    const [region , setregion] = useState({region:""})
    const [country, setcountry] = useState({country:""})
    const [condition, setcondition] = useState({condition:""})
    const [wind,setwind] = useState({wind:""})
    const [text,settext] = useState({text:""})
    const [humidity,sethumidity] = useState({humidity:""})
    const [feel,setfeel] = useState({feel:""})
    const [day,setday] = useState({day:""})
    const api_key = 'beebb29b0ede47429a4174711242709'
    const API_key = `69b61466cef3a1d47a771c71793a18cf`
    const cityloca = (event)=>{
        setcityinput({
            ...cityinput,
            [event.target.name]: event.target.value
        })
    }
    
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((positon)=>{
                setlat(positon.coords.latitude)
                setlon(positon.coords.longitude)
            },(error)=>{
                seterror("location not found")
            }
        )
        }else{
            seterror("geolocation not found")
        }
    },[])
    
    useEffect(()=>{
        if(lat && lon){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
                .then((Response) => Response.json())
                .then((data) => setweather(data)).catch((error) => seterror("data not found"))
        }
    },[lat,lon,API_key])


    // 
    useEffect(()=>{
        if(weather){            
            const location = weather.name
            fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}` )
            .then((e)=> e.json())
            .then((data)=> {setweather2(data)
            // console.log(weather2.location.name);
            setname({name: data.location.name})
            settemp({temp: data.current.temp_c})
            setregion({region: data.location.region})
            setcountry({country: data.location.country})
            setcondition({condition: data.current.condition.icon})
            settext({text: data.current.condition.text})
            setwind({wind: data.current.wind_kph})
            sethumidity({humidity: data.current.humidity})
            setfeel({feel: data.current.feelslike_c})
            setday({day: data.current.is_day })
        })
        }
    },[api_key,location,weather2,setname,weather])
    // console.log(weather.name)
    if (error) return <p>{error}</p>;
    if (!lat || !lon) return <p>Getting your location...</p>;
    if (!weather) return <p>Loading weather data...</p>;
    return(
        <>
          <main className="main">
                <div className="left">
                <h3 className="place" ><FaLocationDot/> {name.name},{region.region},{country.country}</h3>
                    <img src={condition.condition} alt="" />
                    <h4>{text.text}</h4>
                </div>
                <div className="right">
                    <p className="temp"><WiThermometer />{temp.temp}<WiCelsius /></p>
                    <p><strong><FaWind/> </strong>  {wind.wind} km/h</p>
                    <p className="p" ><strong className="hum"><WiHumidity /></strong>{humidity.humidity}%</p>
                    <p><strong>Feel like :</strong>{feel.feel}<WiCelsius /></p>
                    <p><strong>{day.day === 1 ? <WiDaySunny /> : <GiNightSleep />}{day.day === 1 ? ' day' : ' night'}</strong></p>
                </div>
            </main>
        </>
    )
}