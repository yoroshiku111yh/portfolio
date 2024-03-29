#define TEXTURED 0
#define WATER_COLOR vec3(0.92, 0.95, 1.0)
///https://www.shadertoy.com/view/3sB3WW

varying vec2 vUv;
uniform vec3 iResolution;
uniform float iTime;
//// COLORS ////

const vec3 ORANGE = vec3(1.0, 0.6, 0.2);
const vec3 PINK = vec3(0.7, 0.1, 0.4);
const vec3 BLUE = vec3(0.0, 0.2, 0.9);
const vec3 BLACK = vec3(0.0, 0.0, 0.2);

///// NOISE /////

float hash(float n) {
    //return fract(sin(n)*43758.5453123);   
    return fract(sin(n) * 75728.5453123);
}

float noise(in vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0;
    return mix(mix(hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}

////// FBM ////// 

mat2 m = mat2(0.6, 0.6, -0.6, 0.8);
float fbm(vec2 p) {

    float f = 0.0;
    f += 0.5000 * noise(p);
    p *= m * 2.02;
    f += 0.2500 * noise(p);
    p *= m * 2.03;
    f += 0.1250 * noise(p);
    p *= m * 2.01;
    f += 0.0625 * noise(p);
    p *= m * 2.04;
    f /= 0.9375;
    return f;
}

void main() {

    // pixel ratio

    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    
    vec2 p = -1. + 2. * uv;
    p.x *= iResolution.x / iResolution.y;

    // domains

    float r = sqrt(dot(p, p));
    float a = cos(p.y * p.x);  

    // distortion

    float f = fbm(5.0 * p);
    a += fbm(vec2(1.9 - p.x, 0.9 * iTime + p.y));
    a += fbm(0.4 * p);
    r += fbm(2.9 * p);

    // colorize

    vec3 col = BLUE;

    float ff = 1.0 - smoothstep(-0.4, 1.1, noise(vec2(0.5 * a, 3.3 * a)));
    col = mix(col, ORANGE, ff);

    ff = 1.0 - smoothstep(.0, 2.8, r);
    col += mix(col, BLACK, ff);

    ff -= 1.0 - smoothstep(0.3, 0.5, fbm(vec2(1.0, 40.0 * a)));
    col = mix(col, PINK, ff);

    ff = 1.0 - smoothstep(2., 2.9, a * 1.5);
    col = mix(col, BLACK, ff);

    gl_FragColor = vec4(col, 1.);
}
