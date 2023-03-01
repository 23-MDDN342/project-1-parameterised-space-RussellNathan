
function draw_one_frame(cur_frac) {
	//cursor
	strokeCap(PROJECT);
	strokeJoin(MITER);
	fill("white");
	stroke("black");
	strokeWeight(2);
	for(let i = 0; i < 12; i++){
		let ghost_frac = (cur_frac+=1/48)%1
		// (ghost_frac+=1/48)%1
		let cur_x = 200+200*sin(ghost_frac*PI);
		let cur_y = 200+100*sin(ghost_frac*4*PI);

		drawCursor(cur_x,cur_y);
	}

	if (debugView) {
		noFill();
		stroke("red");
		strokeWeight(4);
		drawCursor(200,200);
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