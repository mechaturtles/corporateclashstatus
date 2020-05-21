/** Used to perform a countdown for each item
 * @param duration Duration
 */
 const timer = (duration) => {
	let startTime = new Date();
	const endTime = new Date(startTime);
	endTime.setSeconds( startTime.getSeconds() + 100);

	let h = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
	let m = Math.floor((distance % (60 * 60)) / (60));
	let s = Math.floor(distance % (60));
}