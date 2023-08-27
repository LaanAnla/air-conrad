uniform sampler2D uImage;
uniform sampler2D uTexture2;
varying vec2 vUv;
varying float vNoise;
uniform float uHoverState;

void main()
{
    vec2 newUV = vUv;

    vec2 p = newUV;
	float x = uHoverState;

	x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));

	vec4 f = mix(texture2D(uImage, (p-.5)*(1.-x)+.5), 
    texture2D(uTexture2, (p-.5)*x+.5), x);

    gl_FragColor = f;
    gl_FragColor.rgb += 0.04 * vec3(vNoise);
}