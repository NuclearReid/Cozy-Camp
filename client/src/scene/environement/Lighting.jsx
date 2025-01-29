import { Sky } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

export default function Lighting()
{
    // Where I'll add in my openweather API call to pick the sun position
    const { loading, data} = useQuery(QUERY_ME)

    if(loading){
        console.log('loading')
    }
    if(!loading){
        console.log(data?.me?.weatherData)
    }


    return(
        <>
            <directionalLight position={ [ 1, 0.25, 3 ] } intensity={ 1.5 } />

            <ambientLight intensity={ 0.75 } />

            <Sky 
                sunPosition={[100, -20, 100]}
            />
        </>
    )
}