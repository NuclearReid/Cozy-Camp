import useStore from '../../stores/useStore';
import { Sky } from '@react-three/drei'
import LoadingScreen from '../../components/LoadingScreen';


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

export default function Lighting({
    loading,
    data
})
{
    // get the path to see if on /scene or /searchedScene
    let currentPath = window.location.pathname
    let dayTime = null
    let sunrise = null
    let sunset = null
    let sunSkyPosition = null
    const currentUnixTime = Math.floor(Date.now() / 1000)
    // const { loading, data} = useQuery(QUERY_ME)
    if(loading){
        return <LoadingScreen/>
    }

    if(currentPath === '/scene'){
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
    // gets the searched user from the stores, and does the same thing as above for figuring out if it's daytime or nighttime then sets the sun position
    } else if(currentPath === '/searchedScene'){
        const searchedUserWeather = useStore.getState().searchedUser
        sunrise = searchedUserWeather?.weatherData?.city?.sunrise
        sunset = searchedUserWeather?.weatherData?.city?.sunset
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