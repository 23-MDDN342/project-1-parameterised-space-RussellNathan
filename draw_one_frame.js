let t = 0.1;
let trail = 144;
let errors;
let td = 0;

function preload() {
	errors = loadStrings('console');
}

function draw_one_frame(cur_frac) {
	background('#55abe3');

	strokeWeight(2);
	
	//window
	for(let i = 0; i <= trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		if (i == trail) {td = 1;} else {td = 0;}
		drawWindow(100,100+ sin(ghost_frac*TWO_PI)*100,td);
	}

	// blendMode(OVERLAY);

	//cursor
	strokeCap(PROJECT);
	strokeJoin(MITER);
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
	fill('white');
	textSize(16);
	textFont('Comic Sans MS');
	if (td == 1) {
		text(errors,x+20,y+50,580/2,250/2);
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