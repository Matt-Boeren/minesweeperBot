let probTable = create2DArray(rows, columns);
let botMaping = getMapping();
reveal(10,5);
show();

function whileCalcProb(){
	let condition = true;
	while(condition === true){
		condition = calcProbability();
	}
}
function calcProbability(){

	botMapping = getMapping();
	let conditionDone = false;
	for(let i = 0; i < botMapping.length; i++){
		for(let j = 0; j < botMapping[i].length; j++){
			let probs = [];

			if(botMapping[i][j] === 'H' && (probTable[i][j] !== 0 && probTable[i][j] !== 1)){
			
				const aroundXY = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];
				for(let k = 0; k < aroundXY.length; k++){

					let x = aroundXY[k][0];
					let y = aroundXY[k][1];
					if(x >= 0 && x < grid.length && y >=0 && y < grid[i].length){
						if(typeof(botMapping[x][y]) === 'number'){
							probs.push(getProbFromXY(x, y));
						}
					}
				}
				if(probs.length == 0){
					probTable[i][j] = undefined;
				}
				else if(contains100(probs) === true){
					probTable[i][j] = 1;
					conditionDone = true;
				}
				else if(contains0(probs) === true){
					probTable[i][j] = 0;
					conditionDone = true;
				}
				else{
					probTable[i][j] = averageOut(probs);
				}
			}
		}
	}
	return conditionDone;
}

function getProbFromXY(x, y){
	let number = botMapping[x][y];
	const aroundXY = [
		[x-1, y-1], [x-1, y], [x-1, y+1],
		[x, y-1],  [x, y+1],
		[x+1, y-1], [x+1, y], [x+1, y+1]
	];
	let flags = 0;
	let unrevealed = 0;
	for(let i = 0; i < aroundXY.length; i++){

			let newX = aroundXY[i][0];
			let newY = aroundXY[i][1];


		if(newX >= 0 && newX < botMapping.length && newY >=0 && newY < botMapping[i].length){
			if(botMapping[newX][newY] == "F" || probTable[newX][newY] === 1){
				flags++;
			}
			if(botMapping[newX][newY] == 'H' && probTable[newX][newY] !== 0 && probTable[newX][newY] !== 1){
				unrevealed++;
			}
		}
	}
	return (number - flags)/unrevealed;
}

function contains100(arr){
	let check = false;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === 1){
			check = true;
		}
	}
	return check;
}
function contains0(arr){
	let check = false;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === 0){
			check = true;
		}
	}
	return check;
}
function averageOut(arr){
	let average = 0;
	for(let i = 0; i < arr.length; i++){
		average += arr[i];
	}
	average = average/arr.length;
	return average;
}
function getProbTable(){
 return probTable;
}
