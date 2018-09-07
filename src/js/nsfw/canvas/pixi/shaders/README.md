# SHADERS (PIXI.JS)


### About
With Pixi.js you can apply filters. Here is the official Pixi.js v4 list : https://github.com/pixijs/pixi-filters.
You can also create your own using shaders.


### Exemple
```
/* create custom filter */
const shader = new PIXI.Filter(null, require('./pixelate.glsl'));

/* apply custom filter */
container.filters = [this.shader];

/* set uniform values */
shader.uniforms.amount = { x:24, y:24 }; // set pixelate amount
shader.uniforms.resolution = { x:window.innerWidth, y:window.innerHeight }; // set resolution
```