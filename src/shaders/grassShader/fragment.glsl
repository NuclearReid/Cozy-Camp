varying vec2 vUv;

void main()
{
    vec2 grassUv = vUv;

    gl_FragColor = vec4(grassUv, 1.0, 1.0); 

    // It's good to always add these two includes
    #include <tonemapping_fragment> // adds support to for the tonemapping 
    #include <colorspace_fragment> // adds support for colorspace in three.js 
}