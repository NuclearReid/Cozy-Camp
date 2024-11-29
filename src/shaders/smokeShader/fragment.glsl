uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{

    // Scale and animate
    vec2 smokeUv = vUv; // copys the vUv to a new variable that I can then motify
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;

    // Smoke 
    float smoke = texture(uPerlinTexture, smokeUv).r; // need to use the .r chanel cause it's a float

    // Remap
    smoke = smoothstep(0.1, 0.8, smoke); // smoothstep does the step() but it's 'softer' at the two points
    
    // Edges
    // smoke = 1.0;
    smoke *= smoothstep(0.0, 0.2, vUv.x);
    smoke *= 1.0 - smoothstep(0.5, 1.0, vUv.x);
    // Can also do it this way
    // smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);




    // Final color
    gl_FragColor = vec4( 1, 1, 1, smoke);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

    // It's good to always add these two includes
    #include <tonemapping_fragment> // adds support to for the tonemapping 
    #include <colorspace_fragment> // adds support for colorspace in three.js 
}