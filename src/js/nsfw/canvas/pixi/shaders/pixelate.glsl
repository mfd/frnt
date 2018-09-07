precision highp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform vec2 amount;
uniform vec2 resolution;

vec4 effect(vec2 uv, vec4 col) {
    float dx = amount.x / (0.5 * resolution.x);
    float dy = amount.y / resolution.y;
    uv = vec2(dx*(floor(uv.x/dx) + 0.5), dy*(floor(uv.y/dy) + 0.5));
    return texture2D(uSampler, uv);
}

void main() {
    vec2 uv = vTextureCoord.xy;
    vec4 tex = texture2D(uSampler, uv);
    vec4 col = effect(uv,tex);
    gl_FragColor = col;
}