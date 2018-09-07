import Vector2 from '../math/Vector2';

/**
 * Mouse Manager
 */

class MouseManager {

	static start(checkMouseDirection = false, checkMouseSpeed = false) {
		MouseManager.checkMouseDirection = checkMouseDirection;

		// speed
		window.mouseSpeed = new Vector2();
		window.mouseLast = new Vector2();

		// direction
		window.mouseDirection = new Vector2();

		// position
		window.mouse = new Vector2();

		if (checkMouseSpeed) window.setInterval( MouseManager.getSpeed, 30 );

		window.addEventListener('mousemove', MouseManager.move );
	}

	static move(e) {
		if (MouseManager.checkMouseDirection) MouseManager.getDirection(e);

		window.mouse.set(e.clientX, e.clientY);
	}

	static getDirection(e) {
		// get mouse direction x
		if (window.mouse.x < e.pageX) {
			window.mouseDirection.x = 1;
		} else if (window.mouse.x > e.pageX) {
			window.mouseDirection.x = -1;
		} else {
			window.mouseDirection.x = 0;
		}

		// get mouse direction y
		if (window.mouse.y < e.pageY) {
			window.mouseDirection.y = 1;
		} else if (window.mouse.y > e.pageY) {
			window.mouseDirection.y = -1;
		} else {
			window.mouseDirection.y = 0;
		}
	}

	static getSpeed() {
		window.mouseSpeed.x = window.mouse.x - window.mouseLast.x;
		window.mouseSpeed.y = window.mouse.y - window.mouseLast.y;

		window.mouseLast.copy(window.mouse);
	}
	
}

export default MouseManager;