varying vec2 vUv; 
uniform float uTime; 

void main() 
{ 
    vUv = uv; 
    vec4 mvPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING 
        mvPosition = instanceMatrix * mvPosition; 
    #endif
    float dispPower = 1.0 - cos(uv.y * 3.1416 / 2.0); 
    float displacement = sin(mvPosition.z + (uTime * 0.25) * 10.0) * (0.1 * dispPower); 
    mvPosition.z += displacement; 
    vec4 modelViewPosition = modelViewMatrix * mvPosition; 
    gl_Position = projectionMatrix * modelViewPosition; 

}