/**
 * CPU Test
 * ALPHA VERSION
 * ALPHA VERSION
 * ALPHA VERSION
 * ALPHA VERSION
 */

export default class CPUTest {

	constructor () {
		this.callback = null;
		this.onMessage = ::this.onMessage;

		this.worker = new Worker('js/worker.js');
		this.worker.addEventListener("message", this.onMessage);
	}

	onMessage(e) {
		if (this.callback) {
			this.callback(e.data.message.time);
		} else {
			console.log('Time :: ', e.data.message.time, 'ms');
		}
		this.dispose();
	}

	run(callback) {

		if (!window.Worker || typeof window.Worker === "undefined") {
		 	console.info('Web workers are not available');
		 	return;
		}

		this.callback = callback;
		this.worker.postMessage({
			id: Date.now(),
			message: { fn: 'calculate' }
		});
	}

	dispose() {	

		this.worker.removeEventListener("message", this.onMessage);
  		this.worker.terminate();
		this.worker = null;
		this.callback = null;
		this.onMessage = null;
  	}
}
