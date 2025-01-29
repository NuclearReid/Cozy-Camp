import { Sky } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'


// this converts unix time to 24 hr time. I may use this function later. not sure yet so i'm just keeping it in for now
function convertUnixToTime(unixTimestamp) { 
    // Create a new JavaScript Date object based on the Unix timestamp
    const date = new Date((unixTimestamp) * 1000);
  
    // Extract hours and minutes from the Date object
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // Format the time as HH:MM
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

// This is used to figure out if it's night time or day time
// Essentially gets the Unixtime for sunrise/sunset and checks to see if the current unixTime is between those. if it is, daytime, if not, nightime
function isDaytime(currentUnixTime, sunriseUnixTime, sunsetUnixTime) {
    return currentUnixTime >= sunriseUnixTime && currentUnixTime <= sunsetUnixTime
}

export default function Lighting()
{
    // Where I'll add in my openweather API call to pick the sun position
    const { loading, data} = useQuery(QUERY_ME)
    const currentUnixTime = Math.floor(Date.now() / 1000)

    let dayTime = null
    let sunrise = null
    let sunset = null
    let sunSkyPosition = null

    if(!loading){
       sunrise = data?.me?.weatherData?.city?.sunrise
       sunset = data?.me?.weatherData?.city?.sunset
       dayTime = isDaytime(currentUnixTime, sunrise, sunset)
       if(dayTime){
        sunSkyPosition = 20
       } else {
        sunSkyPosition = -20
       }
    }


    return(
        <>
            <directionalLight position={ [ 1, 0.25, 3 ] } intensity={ 1.5 } />

            <ambientLight intensity={ 0.75 } />

            <Sky 
                sunPosition={[100, sunSkyPosition, 100]}
            />
        </>
    )
}