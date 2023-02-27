var a=0;

function draw_one_frame() {
  drawCursor();
}

function drawCursor(){
	// scale(1,1);
	strokeCap(PROJECT);
	strokeJoin(MITER);
	fill("white");
	stroke("black");
	strokeWeight(2);

	beginShape();
	vertex(0,0);
	vertex(0,49.55);
	vertex(11,38.3);
	vertex(16.3,51.3);
	vertex(24.3,47.3);
	vertex(18.9,34.1);
	vertex(33.8,34.1);
	vertex(0,0);
	endShape();
}