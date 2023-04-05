let t = 0.1;			//from 0 to 1, the length of the mouse trail that will remain active during any one frame
let trail = 144;		//how many divisions of the trail will be visible. most accurate when it is a multiple of 24
let consoletext;		//the text that will display in the cosnole window
// let errors;
let td = 0;				//should the text be drawn? 0=false 1=true. saves unnecessary drawing time

function preload() {
	consoletext = loadStrings('console');
	// errors = split(consoletext, 'r');
    // for (var line = 0; line < lines.length; line++) {
	// 	console.log(errors[line]);
	//   }
}

function draw_one_frame(cur_frac) {
	background('#55abe3');

	strokeWeight(height/270);
	
	//window
	fill('#fa2a8b');
	for(let i = 0; i <= trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		if (i == trail) {td = 1;} else {td = 0;}
		//draw the window (x position, y position, is draw text true, text scroll position)
		drawWindow(0.16*width + sin(1-ghost_frac*TWO_PI)*width/8, height/5 + sin(ghost_frac*TWO_PI)*height/6,td,cur_frac);
	}

	//cursor
	strokeWeight(2);
	strokeCap(PROJECT);
	strokeJoin(ROUND);
	fill("white");
	stroke("black");
	for(let i = 0; i <= t*trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		let cur_x = 300+200*sin(ghost_frac*TWO_PI);
		let cur_y = 200+100*sin(ghost_frac*4*PI);

		drawCursor(cur_x,cur_y,width/960);
	}

	if (debugView) {
		noFill();
		stroke("pink");
		strokeWeight(1);
		for(let i = 0.1; i <= 1; i+=1/12){
			drawCursor(300+200*sin(i*TWO_PI),200+100*sin(i*4*PI),width/960);
		}
		for(let i = 0.1; i <= 1; i+=1/12){
			drawWindow(
			0.16*width 	+ 	sin(1-i*TWO_PI)*width/8, 
			height/5 	+	sin(i*TWO_PI)*height/6);
		}
		stroke("darkred");
		strokeWeight(4);
		drawCursor(300+200*sin(TWO_PI),200+100*sin(4*PI),width/960);
		drawWindow(0.16*width + sin(1-TWO_PI)*width/8, height/5 + sin(TWO_PI)*height/6,1,1);
	}

	//glitches
	// stroke('#fa2a8b');
	// line(700, 0, 700, 1500)
}

function drawWindow(x,y,td,l){
	let border = width/216
	rect(x, y, width/3, height/3);
	rect(x+border, y+border, width/3-border*2, height/30);
	push();
	if (td == 1) {
		noStroke();
		fill('darkblue');
		rect(x+border, y+border+height/30, width/3-border*2, height/3.4-border);
		fill('white');
		textSize(width/60);
		textFont('Comic Sans MS');
		textWrap(CHAR);
		for (let i = 0; i <= consoletext.length; i++){
			text(consoletext[i],x+width/48,y+height/10.8+i*height/27,0.3*width,height/4.3-i*height/27);
		}
		if (floor(l%(4/24)*100) == 0) {
			consoletext.push(consoletext[0]);
			consoletext.shift();
		}
		// for (let i = 0; i <= consoletext.length; i++){
		// 	// text(consoletext,x+width/48,y+height/10.8+i*height/27,0.3*width,height/4.3-i*height/27);
		// 	//skip a line for every line the text exceeds the word wrap limit for
		// 	// i += floor(consoletext[i+l].length/38);

		// }
	}
	pop();
}

function drawCursor(x,y,mouseSize){
	scale(mouseSize,mouseSize);
	beginShape();
	vertex(x+0,y+0);
	vertex(x+0,y+49.55);
	vertex(x+11,y+38.3);
	vertex(x+16.3,y+51.3);
	vertex(x+24.3,y+47.3);
	vertex(x+18.9,y+34.1);
	vertex(x+33.8,y+34.1);
	vertex(x+0,y+0);
	endShape();
	scale(1/mouseSize,1/mouseSize);
}