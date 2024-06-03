const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
function create2DArray(rows, cols){
	let array = new Array(rows);
	for(let i=0; i<rows; i++){
		array[i] = new Array(cols);
	}
	return array;
}
let columns = 5;
let rows = 5;
let width = 50;
let bombs = 5;
let grid = create2DArray(rows, columns);
let firstClick = false;
canvas.width = rows*width;
canvas.height = columns*width;
ctx.fillStyle = "grey";
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
for(let i = 0; i < grid.length; i++){
	for(let j=0; j < grid[i].length; j++){
		ctx.fillRect(i*width, j*width, width, width);
		ctx.strokeRect(i*width, j*width, width, width);
	}
}

function makePlayingFeeld(x,y){
	ctx.font = "50px Arial";
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
				grid[i][j] = sum;
				if(sum != 0){
					ctx.fillText(sum, (i*width) + (width/2), (j*width) + (width/2));
				}
			}
		}
	}
}
function reveal(event){
	const rect = canvas.getBoundingClientRect();
	const x = Math.floor((event.clientX - rect.left)/width);
	const y = Math.floor((event.clientY - rect.top)/width);
	if(firstClick === false){
		makePlayingFeeld(x,y);
		firstClick = true;
	}
	else{

	}
}
canvas.addEventListener("click", reveal);
