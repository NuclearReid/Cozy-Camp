import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{

    return{
        /* 
         * Camera props
        */
        startCameraPosition: { x:-2.5, y: 9.2, z: 1.8 }
    
    }
}))