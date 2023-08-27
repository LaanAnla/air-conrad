varying vec2 vUv;
varying float vNoise;

uniform vec2 uHover;
uniform float uHoverState;
uniform float uTime;

void main()
{
  vec3 newposition = position;

  float dist = distance(uv, uHover);

  newposition.z += uHoverState * 10.*(sin(dist*5. - uTime));

  vNoise = uHoverState * sin(dist*5. - uTime);
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newposition, 1.0);
}