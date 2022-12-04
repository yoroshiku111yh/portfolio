varying vec2 vUv;
uniform float zVertex;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, zVertex);
}