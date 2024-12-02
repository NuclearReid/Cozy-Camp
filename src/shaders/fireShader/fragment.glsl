uniform float uTime;
uniform sampler2D uFirePng;


varying vec2 vUv;

void main()
{
    vec2 fireUv = vUv;
    fireUv.x *= 0.8;
    fireUv.y *= 0.8;
    fireUv.y -= uTime * 0.2;

    float fire = texture(uFirePng, fireUv).r;

    fire = smoothstep(0.1, 0.8, fire);
    fire *= smoothstep(0.0, 0.2, vUv.x);
    fire *= 1.0 - smoothstep(0.5, 1.0, vUv.x);

    fire *= smoothstep(0.0, 0.1, vUv.y);
    fire *= smoothstep(1.0, 0.4, vUv.y);

    fire = pow(fire, 0.6);
    fire *= 3.0;

    float alpha = fire * 0.5;

    gl_FragColor = vec4(0.886, 0.345, 0.133, alpha);

    // It's good to always add these two includes
    #include <tonemapping_fragment> // adds support to for the tonemapping 
    #include <colorspace_fragment> // adds support for colorspace in three.js 
}


/*

Sure! Let's break down the code line by line:

1. **`uniform float uTime;`**
   - Declares a uniform float variable `uTime` that will be passed from the CPU to the GPU. This variable typically represents the elapsed time and is used to create animations.

2. **`uniform sampler2D uFirePng;`**
   - Declares a uniform sampler2D variable `uFirePng` that represents a 2D texture. This texture will be used to sample color values in the shader.

3. **`varying vec2 vUv;`**
   - Declares a varying vec2 variable `vUv` that will be interpolated across the surface of the geometry. This variable typically represents the UV coordinates of the fragment.

4. **`void main()`**
   - The main function of the fragment shader, where the shader code is executed for each fragment.

5. **`vec2 fireUv = vUv;`**
   - Initializes a vec2 variable `fireUv` with the value of `vUv`. This variable will be used to manipulate the UV coordinates for the fire texture.

6. **`fireUv.x *= 0.5;`**
   - Scales the x-coordinate of `fireUv` by 0.5, effectively reducing its horizontal size.

7. **`fireUv.y *= 0.3;`**
   - Scales the y-coordinate of `fireUv` by 0.3, effectively reducing its vertical size.

8. **`fireUv.y -= uTime * 0.2;`**
   - Animates the y-coordinate of `fireUv` by subtracting a value proportional to `uTime`. This creates a scrolling effect over time.

9. **`float fire = texture(uFirePng, fireUv).r;`**
   - Samples the red channel of the texture `uFirePng` at the coordinates `fireUv` and stores the result in the float variable `fire`.

10. **`fire = smoothstep(0.1, 0.8, fire);`**
    - Applies a smoothstep function to the `fire` value, which smooths the transition between 0.1 and 0.8.

11. **`fire *= smoothstep(0.0, 0.2, vUv.x);`**
    - Multiplies `fire` by a smoothstep function based on the x-coordinate of `vUv`, creating a gradient effect.

12. **`fire *= 1.0 - smoothstep(0.5, 1.0, vUv.x);`**
    - Further modifies `fire` by multiplying it with an inverted smoothstep function, creating another gradient effect.

13. **`fire *= smoothstep(0.0, 0.1, vUv.y);`**
    - Multiplies `fire` by a smoothstep function based on the y-coordinate of `vUv`, creating a vertical gradient effect.

14. **`fire *= smoothstep(1.0, 0.4, vUv.y);`**
    - Further modifies `fire` by multiplying it with another smoothstep function, creating a more complex vertical gradient effect.

15. **`gl_FragColor = vec4(0.886, 0.345, 0.133, fire);`**
    - Sets the fragment color to a vec4 with the RGB values (0.886, 0.345, 0.133) and the alpha value `fire`. This determines the final color and transparency of the fragment.

16. **`#include <tonemapping_fragment>`**
    - Includes the tonemapping fragment shader code, which adds support for tonemapping in Three.js.

17. **`#include <colorspace_fragment>`**
    - Includes the colorspace fragment shader code, which adds support for colorspace conversion in Three.js.

I hope this helps! Let me know if you have any more questions or need further clarification.

*/