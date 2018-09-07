# SIMPLE NOISE (1 DIMENSION)



### `View` class
```
import Simple1DNoise from 'graphics/Simple1DNoise';


class SampleView {
	
	constructor() {

		this.view = document.querySelector('.smaple-view');
		
		this.perlin = {x:0,y:0};
		this.noise = new Simple1DNoise();
	
		this.x = 0;
		this.y = 0;
	}

	render() {

		this.perlin.x += .0020;
		this.perlin.y += .0017;	

		this.x = this.noise.getVal( this.perlin.x );
		this.y = this.noise.getVal( this.perlin.y );

		this.view.style.transform = `translate(${this.x}px,${this.y}px)`;
	

		// raf call
		window.requestAnimationFrame( ::this.render );
	}
}
```


