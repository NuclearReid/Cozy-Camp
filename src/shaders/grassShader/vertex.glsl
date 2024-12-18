varying vec2 vUv;

#include ../includes/perlinClassic3D.glsl
#include ./grassElevation.glsl

void main()
{
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
    vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, - shift);

    float elevation = grassElevation(modelPosition.xyz);
    modelPosition.y += elevation;
    modelPositionA.y += grassElevation(modelPositionA);
    modelPositionB.y += grassElevation(modelPositionB);


    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);

    vec3 computeNormal = cross(toA, toB);


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}