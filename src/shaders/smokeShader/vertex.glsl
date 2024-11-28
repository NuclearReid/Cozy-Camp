uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

// Where the function is. Keeps the code clean by putting it in it's own file
#include ./includes/rotate2D.glsl

void main()
{
    vec3 newPosition = position;

    // Twist            
    float twistPerlin = texture(
            uPerlinTexture, // This is making the twist based off the perlin texture
            vec2(0.5, uv.y * 0.2 - uTime * 0.005) // sets up the location to be in the center, then adjusts the twist based off the uv.y position, changing the uTime is what then animates it
        ).r; // need to pick the red chanel cause this is a float
    float angle = twistPerlin * 10.0; // angle is set to newPosition.y to make it newPosition.xz change as the Y value goes up
    newPosition.xz = rotate2D(newPosition.xz, angle);


    // Wind (makes the texture move on the x and z axis)
    vec2 windOffset = vec2(  // A vec2 cause we're only adjusting the x & z
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5, // by subtracting 0.5, makes it so the smoke can go either to the right or left
        //          vec2(the location of the perlinTexture to pick form, how we want to animate it)
        texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
    );
    // pow() is used to make it so the bottom doesn't move as much and the top moves more
    windOffset *= pow(uv.y, 2.0) * 10.0; // uv.y is 0 at the bottom which will keep the base of the smoke in the mug (0.0 * 10.0 = 0.0)
    newPosition.xz += windOffset;

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
}



// This is the basic set-up line of code
// gl_Position = projectMatrix * modelViewMatrix * vec4(position, 1.0)