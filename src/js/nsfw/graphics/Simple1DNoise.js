/**
 * SIMPLE NOISE
 * 
 * http://www.michaelbromley.co.uk/blog/90/simple-1d-noise-in-javascript
 */

class Simple1DNoise {

	constructor ( max = 256 ) {

		// params
		this.MAX_VERTICES = max;
		this.MAX_VERTICES_MASK = this.MAX_VERTICES -1;
		this.amplitude = 1;
		this.scale = 1;

		this.min = 0;
		this.max = 0;

		this.scaledValue = 0;
		this.floorValue = 0;

		this.t = 0;
		this.tRemapSmoothstep = 0;

		// build
		this.r = [];

		for ( let i = 0; i < this.MAX_VERTICES; ++i ) {
			this.r[i] = Math.random();
		}

	}

	getVal ( value ) {
		
		this.scaledValue = value * this.scale;
		this.floorValue = Math.floor(this.scaledValue);
		this.t = this.scaledValue - this.floorValue;
		this.tRemapSmoothstep = this.t * this.t * ( 3 - 2 * this.t );

		/// Modulo using &
		this.min = this.floorValue & this.MAX_VERTICES_MASK;
		this.max = ( this.min + 1 ) & this.MAX_VERTICES_MASK;

		const noise = this.lerp( this.r[ this.min ], this.r[ this.max ], this.tRemapSmoothstep );

		return noise * this.amplitude;
	}

	lerp (a, b, t ) {
		return a * ( 1 - t ) + b * t;
	}

	dispose(){
		this.r = null;
	}

}

export default Simple1DNoise;