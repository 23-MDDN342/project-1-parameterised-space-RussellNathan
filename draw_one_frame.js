let t = 0.1;
let trail = 144;
let consoletext;
let errors
let td = 0;

function preload() {
	consoletext = loadStrings('console');
	// errors = split(consoletext, 'r');
    // for (var line = 0; line < lines.length; line++) {
	// 	console.log(errors[line]);
	//   }
}

function draw_one_frame(cur_frac) {
	background('#55abe3');

	strokeWeight(2);
	
	//window
	for(let i = 0; i <= trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		if (i == trail) {td = 1;} else {td = 0;}
		drawWindow(150+ sin(1-ghost_frac*TWO_PI)*120,100+ sin(ghost_frac*TWO_PI)*100,td);
	}

	//cursor
	strokeCap(PROJECT);
	strokeJoin(ROUND);
	fill("white");
	stroke("black");
	for(let i = 0; i <= t*trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		let cur_x = 300+200*sin(ghost_frac*TWO_PI);
		let cur_y = 200+100*sin(ghost_frac*4*PI);

		drawCursor(cur_x,cur_y);
	}

	if (debugView) {
		noFill();
		stroke("red");
		strokeWeight(4);
		drawCursor(200,200);
		drawWindow(100,100);
	}
}

function drawWindow(x,y,td){
	fill('#fa2a8b');
	rect(x, y, 640/2, 360/2);
	rect(x+5, y+5, 640/2-10, 36-10);
	fill('white');
	textSize(16);
	textFont('Comic Sans MS');
	if (td == 1) {
		for (let i = 0; i <= consoletext.length; i++){
			text(consoletext[i],x+20,y+50+i*20,580/2,250/2-i*20);
		}
	}
}

function drawCursor(x,y){
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
}