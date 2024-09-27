import { useEffect, useState } from "react"


export const Weather = () => {
    //Make the useState hooks 
    const [xvalue, setxvalue] = useState()
    const [yvalue, setyvalue] = useState()
    const [weather, setweather] = useState()
    const [error, seterror] = useState()
    const API_key = `69b61466cef3a1d47a771c71793a18cf`

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setxvalue(position.coords.latitude)
                setyvalue(position.coords.longitude)
            },
                (error) => {
                    seterror("unable to get location")
                })
        } else {
            seterror("geolocation not get from our device")
        }
    }, [])
    useEffect(() => {
        if (xvalue && yvalue) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${xvalue}&lon=${yvalue}&appid=${API_key}`)
                .then((Response) => Response.json())
                .then((data) => setweather(data)).catch((error) => seterror("data not found"))
        }
    }, [xvalue, yvalue, API_key])


    // Show the value when the data not get
    if (error) return <p>{error}</p>;
    if (!xvalue || !yvalue) return <p>Getting your location...</p>;
    if (!weather) return <p>Loading weather data...</p>;
    const visi = weather.visibility

    //Get the  icon of weather 
    const iconcode = weather.weather[0].icon
    const iconurl = `http://openweathermap.org/img/w/${iconcode}.png`

    // Return the ui using TAILWIND CSS and REACT JS
    return (
        <>
            <div className="border rounded border-white h-auto w-64 px-4 py-6 shoadeo" >
                <h1 className="font-bold text-2xl" >Weather</h1>
                <div className="flex justify-center items-center my-2" >
                    <img className="h-12 w-12 " src={iconurl} alt="" />
                </div>
                <p className="my-3 text-base font-serif " ><strong>Location:</strong> {weather.name}</p>
                <p className="my-3 text-base font-serif " ><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                <p className="my-3 text-base font-serif " ><strong>Feel like:</strong> {(weather.main.feels_like - 273.15).toFixed(2)} °C</p>
                <p className="my-3 text-base font-serif " ><strong>Weather: </strong>{weather.weather[0].description}</p>
                <p className="my-3 text-base font-serif " ><strong>Visibility:</strong> {(visi/1000)} km</p>
                <p className="my-3 text-base font-serif " ><strong>Wind speed: </strong>{weather.wind.speed} km/h </p>
            </div>
        </>
    )
}