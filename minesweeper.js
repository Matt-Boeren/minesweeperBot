const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

let columns = 16;
let rows = 30;
let width = 40;
let bombs = 99;
let grid = create2DArray(rows, columns);
let mapping = create2DArray(rows, columns);
for(let i = 0; i < mapping.length; i++){
	for(let j = 0; j < mapping[i].length; j++){
		mapping[i][j] = "H";
	}
}
let firstClick = false;
canvas.width = rows*width;
canvas.height = columns*width;

ctx.fillStyle = "lightgrey";
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
for(let i = 0; i < grid.length; i++){
	for(let j=0; j < grid[i].length; j++){
		ctx.fillRect(i*width, j*width, width, width);
		ctx.strokeRect(i*width, j*width, width, width);
	}
}

function makePlayingFeeld(x,y){
	ctx.font = "bold 35px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

  const exclusionZone = [
		[x-1, y-1], [x-1, y], [x-1, y+1],
    [x, y-1],   [x, y],   [x, y+1],
    [x+1, y-1], [x+1, y], [x+1, y+1]
  ];
    
  function isExcluded(row, col) {
		return exclusionZone.some(([exRow, exCol]) => exRow === row && exCol === col);
  }

	for(let i = 0; i < bombs; i++){
		let bombPlaced = false;
		while(bombPlaced === false){
			let randomRowIndex = Math.floor(Math.random() * grid.length);
			let randomColumnIndex = Math.floor(Math.random() * grid[randomRowIndex].length);
			if(grid[randomRowIndex][randomColumnIndex] !== "X" && !isExcluded(randomRowIndex, randomColumnIndex)){
				grid[randomRowIndex][randomColumnIndex] = "X";
				ctx.fillText("X", (randomRowIndex * width) + (width/2), (randomColumnIndex * width) + (width/2));
				bombPlaced = true;
			}
		}
	}


	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[i].length; j++){
		  const aroundXY = [
				[i-1, j-1], [i-1, j], [i-1, j+1],
				[i, j-1],  [i, j+1],
				[i+1, j-1], [i+1, j], [i+1, j+1]
			];
			if(grid[i][j] != "X"){
			let sum = 0;
				for(let k = 0; k < aroundXY.length; k++){
					const x = aroundXY[k][0];
					const y = aroundXY[k][1];
					if(x >= 0 && x < grid.length && y >=0 && y < grid[i].length){
						if(grid[aroundXY[k][0]][aroundXY[k][1]] === "X"){
							sum++;
						}
					}
				}
				if(sum != 0){
					grid[i][j] = sum;
					ctx.fillText(sum, (i*width) + (width/2), (j*width) + (width/2));
				}
			}
		}
	}


	ctx.fillStyle = "grey";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	for(let i = 0; i < grid.length; i++){
		for(let j=0; j < grid[i].length; j++){
			ctx.fillRect(i*width, j*width, width, width);
			ctx.strokeRect(i*width, j*width, width, width);
		}
	}
}

function flood(x,y){

	const revealFload = [
		[x-1, y-1], [x-1, y], [x-1, y+1],		
		[x, y-1],   [x, y+1],
		[x+1, y-1], [x+1, y], [x+1, y+1]
	];
	
	for(let j = 0; j < revealFload.length; j++){
		const newx = revealFload[j][0];
		const newy = revealFload[j][1];
		if(newx >= 0 && newx < grid.length && newy >=0 && newy < grid[newx].length){
			if(mapping[newx][newy] === "H"){
				mapping[newx][newy] = grid[newx][newy];

				if(mapping[newx][newy] === undefined){
					flood(newx,newy);
					mapping[newx][newy] = "";
				}
			}
		}
	}
}

function reveal(x,y){


	if(firstClick === false){
		makePlayingFeeld(x,y);
		firstClick = true;
	}
	if(mapping[x][y] !== "F"){
		if(grid[x][y] === "X"){
			for(let i = 0; i < mapping.length; i++){
				for(let j = 0; j < mapping[i].length; j++){
					mapping[i][j] = grid[i][j];
					if(mapping[i][j] === undefined){
						mapping[i][j] = "";
					}
				}
			}
		}
		else{
			mapping[x][y] = grid[x][y];
			if(mapping[x][y] === undefined){
				mapping[x][y] = "";
				flood(x,y);
			}
		}
	}
}

function flag(x,y){
	if(mapping [x][y] === "H"){
		mapping[x][y] = "F";
	}
	else{
		if(mapping[x][y] === "F"){
			mapping[x][y] = "H";
		}
	}
	bruteCalc();
}

function show(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < mapping.length; i++){
		for(let j = 0; j < mapping[i].length; j++){
			ctx.fillStyle = "lightgrey";
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.fillRect(i*width, j*width, width, width);
			ctx.strokeRect(i*width, j*width, width, width);
			if(mapping[i][j] !== "H"){
				ctx.font = "bold 35px Arial";
				if(mapping[i][j] === "F"){
					ctx.fillStyle = "red";
				}
				else{
					ctx.fillStyle = "black";
				}
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(mapping[i][j], (i * width) + (width/2), (j * width) + (width/2));
			}
			else{
				
				ctx.fillStyle = "grey";
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				ctx.fillRect(i*width, j*width, width, width);
				ctx.strokeRect(i*width, j*width, width, width);

			}
		}
	}

	let bombsFound = 0;
	let flags = 0;
	for(let i = 0; i < mapping.length; i++){
		for(let j = 0; j < mapping[i].length; j++){
			if(mapping[i][j] === "F"){
				flags++;
				if(grid[i][j] === "X"){
					bombsFound++;
				}
			}
		}
	}
	if(bombsFound === flags && flags === bombs){
		setTimeout(() => {
			alert("Congratulations, you finished the game!");
		}, 0);
	}
}

function afterClick(event){
	const rect = canvas.getBoundingClientRect();
	const x = Math.floor((event.clientX - rect.left)/width);
	const y = Math.floor((event.clientY - rect.top)/width);

	if(event.button === 0){
		reveal(x,y);
	}
	else{
		flag(x,y);
	}

	show();
}
canvas.addEventListener("click", afterClick);

canvas.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	afterClick(event);
});

function getMapping(){
	return mapping;
}
