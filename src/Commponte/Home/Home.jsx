import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
export default function Home() {
 

  const [date,setDate  ] = useState(null)
  const [city , setCity] = useState("cairo")
    const [location, setLocation] = useState({ latitude: null, longitude: null });

  function getWeather() {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=93ca3eff6ffd4de1aba185822240110&q=${city}&days=3&aqi=yes&alerts=yes`
      )
      .then((res) => {
        setDate(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


 useEffect(() => {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         setLocation({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
         });
         getWeather();
       },
       (error) => {
         console.log("Error getting location: ", error);
       }
     );
   }
 }, []);
  useEffect(() => {
    
    if (city) {
      getWeather();
    }else{
      setCity("Cairo")
    }
  }, [city]);

  
  return (
    <>
    <div className={`${style.weather}`}>
      <div className="flex justify-center items-center py-10 ">
        <div className={style.search_container}>
          <div className={style.search_bar}>
            <input
              type="text"
              onChange={(e)=>{setCity(e.target.value)}}
              className={style.search_input}
              placeholder="Search a Country"
            />
            <div className={style.search_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
          </div>
          <div className={style.glow} />
        </div>
      </div>

      <section>
        <div className="container py-2 mx-auto grid lg:grid-cols-3 md:grid-cols-1 gap-10 text-white font-bold">
          {date?.forecast.forecastday.map((day) => {
            let dates = new Date(day.date);
            let dayName = dates.toLocaleDateString("en-us", { weekday: "long" })             

          return (
            <div className="card rounded-lg shadow-lg bg-slate-400">
              <div className=" bg-slate-600 p-2">
                <div className="flex justify-between mx-5  text-xl">
                  <p>{dayName}</p>
                  <p>{day.date}</p>
                </div>
              </div>
              <div className="relative overflow-hidden  rounded-t-lg h-[400px]">
                <div className="absolute inset-0  bg-opacity-50 flex flex-col  justify-center items-center p-4 text-white">
                  <div className="justify-center items-center flex flex-col">
                    <img src={day.day.condition.icon} alt="" />
                    <p className="text-3xl mb-4">{day.day.condition.text}</p>
                    <p className="text-xl mb-4">
                      {date.location.name} , {date.location.country}{" "}
                    </p>
                    <p className="text-6xl font-bold">{day.day.avgtemp_c}°C</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-center bg-slate-600">
                <div className="flex justify-between mb-3">
                  <p className="text-xl font-normal">Max/Min</p>
                  <p className="text-xl font-normal flex items-center">
                    <i className="fa-solid fa-sun me-1"></i>{" "}
                    <span className="me-3">{day.day.maxtemp_c}°C /</span>
                    <i className="fa-solid fa-moon me-1"></i>{" "}
                    <span>{day.day.mintemp_c}°C</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex w-full justify-between">
                    <div>
                      <i className="fa-solid fa-wind"></i>{" "}
                      <span>{day.day.maxwind_kph} Kph</span>
                    </div>
                    <div>
                      <i class="fa-solid fa-umbrella me-2"></i>
                      <span>{day.day.avghumidity} %</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
})}
        </div>
      </section>
    </div>
    </>
  );
}
