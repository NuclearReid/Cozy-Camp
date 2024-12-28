float grassElevation(vec3 position)
{
    // Elevation
    float elevation = 0.0;

    for(float i = 1.0; i <= 4.0; i++)
    {
        elevation -= abs(perlinClassic3D(vec3(position.xz * 50.645 * i, 0.0)) * 0.9 / i);
    }
    
    return elevation;
}
