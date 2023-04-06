let t = 0.1;			//from 0 to 1, the length of the mouse trail that will remain active during any one frame
let trail = 144;		//how many divisions of the trail will be visible. most accurate when it is a multiple of 24
let consoletext;		//the text that will display in the cosnole window
let td = 0;				//should the text be drawn? 0=false 1=true. saves unnecessary drawing time
let emit = 1;			//how bright each pixel is, decimal value 0 to 1.
let LCD = false;		//draws the LCD screen texture if true (very slow)

function preload() {
	// load text to appear on the command window
	consoletext = loadStrings('console');
}

function draw_one_frame(cur_frac) {
	let upscale = width/960;

	background('#fcfc79');
	strokeWeight(height/270);
	
	// bottom dock
	fill('#fa2a8b');
	rect(width/1000,height-height/20,width-width/2000,height/20-width/1000);

	// command window
	fill('#fa2a8b');
	for(let i = 0; i <= trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		if (i == trail) {td = 1;} else {td = 0;}
		// draw the window (x position, y position, is draw text true, text scroll position)
		drawWindow(sin(2*ghost_frac*PI)*width/50+0.4*width -sin(0-ghost_frac*TWO_PI*2)*width/4, height/4 + sin(ghost_frac*TWO_PI)*height/5.25,td,cur_frac);
	}


	// smileys
	for(let i = 0; i < 20; i++){
		if (i/20 <= cur_frac-1 & i/20 > (cur_frac-1.4) || i/20 > (cur_frac-0.4))
		{
			// draw the animation on the dock (not related to the faces, but they use the same technique so they both draw from the same for loop)
			fill(240,lerp(0, 256, i/5)*lerp(1, 0, i/20));
			noStroke();	
			circle(i*width/20+width/40,height*0.975,width/90);
			// draw the smileys			
			drawSmile(960*noise(i),540*noise(i+1),upscale+0.5*noise(0.01,i));
		}
	}

	// cursor
	strokeWeight(2);
	strokeCap(PROJECT);
	strokeJoin(ROUND);
	fill(240);
	stroke(20);
	for(let i = 0; i <= t*trail; i++){
		let ghost_frac = (cur_frac+=1/trail)%1;
		let cur_x = 250+220*sin(ghost_frac*TWO_PI);
		let cur_y = 320+120*sin(ghost_frac*4*PI);

		drawCursor(cur_x,cur_y,width/960);
	}


	// LCD screen texture
	if (LCD) {
		blendMode(MULTIPLY);
		noStroke();
		let pixelSize = 5;
		for(let lcdy = 0; lcdy <= 540/pixelSize; lcdy++){
			for(let lcdx = 0; lcdx <= 960/pixelSize; lcdx++){
				// emit=(lcdx+lcdy)/60;
				let emitSeed = abs(cur_frac-1.5)*2;
				emit = noise(lcdx/pixelSize*8, lcdy/pixelSize*8,emitSeed)*2;
				// red pixel
				fill(emit*120+120,0,0,200);
				rect(upscale*(0.5*pixelSize+pixelSize*lcdx),upscale*pixelSize*lcdy,0.7*pixelSize*width/960);
				//green pixel
				fill(0,emit*120+120,0,200);
				rect(upscale*(0.5*pixelSize+pixelSize*lcdx),upscale*(0.5*pixelSize+pixelSize*lcdy),0.7*pixelSize*width/960);
				//blue pixel
				fill(0,0,emit*120+120,200);
				rect(upscale*pixelSize*lcdx,upscale*(0.5*pixelSize+pixelSize*lcdy),0.7*pixelSize*width/960);
				// dark pixel border
				fill(emit*150+60);
				rect(upscale*pixelSize*lcdx,upscale*pixelSize*lcdy,0.75*pixelSize*width/960);
				
			}
		}
		blendMode(NORMAL);
	}
}

/* Draw Window function
	x 		=	x position of the window
	y 		=	y position of the window
	td 		=	text drawing? 0 = false, 1 = true
	l 		=	line position, basically just cur_frame
*/
function drawWindow(x,y,td,l){
	let border = width/216
	// draw the window box
	rect(x, y, width/3, height/3);
	// draw the title bar
	rect(x+border, y+border, width/3-border*2, height/30);
	push();
	fill('#55abe3');
	// draw the text box
	rect(x+border, y+border+height/30, width/3-border*2, height/3.4-border);
	
	// Draw Text
	if (td == 1) {
		// noStroke();
		fill(240);
		textSize(width/60);
		textFont('Comic Sans MS');
		textWrap(CHAR);
		for (let i = 0; i <= consoletext.length; i++){
			text(consoletext[i],x+width/48,y+height/16.8+i*height/27,0.3*width,height/4.3-i*height/27);
		}
		if (floor(l%(4/24)*100) == 0) {
			consoletext.push(consoletext[0]);
			consoletext.shift();
		}
		noStroke();
		if (l%(0.5) > 0.25) {
			rect(x+width/48,y+height*0.28,width/88,height/30);
		}
	}
	pop();
}

/* Draw Cursor function
	x 			= 	x position of the cursor
	y 			= 	y position of the cursor
	mouseSize	=	size of the mouse, 1 being the normal size, 2 being twice that size.
*/
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

/* Draw Smile function
	x 			= 	x position of the smile
	y 			= 	y position of the smile
	upscale		=	size of the mouse, 1 being the normal size, 2 being twice that size.
*/
function drawSmile(x,y,upscale){
	ellipseMode(CENTER);
	strokeWeight(upscale*2.5);
	stroke(20);
	fill('yellow');
	circle(x*upscale,y*upscale,upscale*30);
	//eyes
	fill(20);
	ellipse((x-5)*upscale,(y-4)*upscale,upscale*3,upscale*5);
	ellipse((x+5)*upscale,(y-4)*upscale,upscale*3,upscale*5);
	noFill();
	arc(x*upscale,(y-6)*upscale,upscale*22,upscale*30,0.25*PI,PI*0.75);
}