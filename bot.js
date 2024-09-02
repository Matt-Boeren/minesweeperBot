let probTable = create2DArray(rows, columns);
let botMaping = getMapping();
reveal(0,0);
show();

function whileCalcProb(){
	let condition = true;
	while(condition === true){
		condition = calcProbability();
	}
	overlapping();
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
					if(x >= 0 && x < botMapping.length && y >=0 && y < botMapping[i].length){
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


function getProbFromXYNumber(x, y, number){
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
function overlapping(){
	let numberTiles = [];
	for(let i = 0; i < botMapping.length; i++){
		for(let j = 0; j < botMapping[i].length; j++){
			if(typeof(botMapping[i][j]) == 'number'){

				const aroundIJ = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];

				for(let k = 0; k < aroundIJ.length; k++){	
					const x = aroundIJ[k][0];
					const y = aroundIJ[k][1];
					if(x >= 0 && x < botMapping.length && y >=0 && y < botMapping[0].length){
						if(botMapping[x][y] == "H"){
							numberTiles.push([i, j]);
							break;
						}
					}
				}
			}
		}
	}

	for(let i = 0; i < numberTiles.length; i++){
		
		let ix = numberTiles[i][0];
		let iy = numberTiles[i][1];
		const aroundXYI = [
			[ix-1, iy-1], [ix-1, iy], [ix-1, iy+1],
			[ix, iy-1],  [ix, iy+1],
			[ix+1, iy-1], [ix+1, iy], [ix+1, iy+1]
		];
		let aroundI = [];
		for(let k = 0; k < aroundXYI.length; k++){	
			const newx = aroundXYI[k][0];
			const newy = aroundXYI[k][1];
			if(newx >= 0 && newx < botMapping.length && newy >=0 && newy < botMapping[0].length){
				if(botMapping[newx][newy] === "H"){
					aroundI.push([newx, newy]);
				}
			}
		}
		for(let j = 0; j < numberTiles.length; j++){
			if(i !== j){
				let X = numberTiles[j][0];
				let Y = numberTiles[j][1];
				const aroundXY = [
					[X-1, Y-1], [X-1, Y], [X-1, Y+1],
					[X, Y-1],  [X, Y+1],
					[X+1, Y-1], [X+1, Y], [X+1, Y+1]
				];
				let aroundJ = [];
				for(let k = 0; k < aroundXY.length; k++){	
					const newx = aroundXY[k][0];
					const newy = aroundXY[k][1];
					if(newx >= 0 && newx < botMapping.length && newy >=0 && newy < botMapping[0].length){
						if(botMapping[newx][newy] === "H"){
							aroundJ.push([newx, newy]);
						}
					}
				}
				if(aroundI.length > aroundJ.length){
					if(arrayInOther(aroundI, aroundJ) === true){
						console.log("break");
						console.log(aroundI);
						console.log(aroundJ);	
					}
				}
			}
		}
	}
}

function arrayInOther(longArray, shortArray){
	if(shortArray.length > longArray.length){
		return false;
	}
	for(let i = 0; i < shortArray.length; i++){
		let inArray = false;
		for(let j = 0; j < longArray.length; j++){
			if(compareArrays(shortArray[i], longArray[j]) === true){
				inArray = true;
				break;
			}
		}
		if(inArray === false){
			return false;
		}
	}
	return true;
}

function compareArrays(array1, array2){
	if(array1.length !== array2.length){
		return false;
	}
	for(let i = 0; i < array1.length; i++){
		if(array1[i] !== array2[i]){
			return false;
		}
	}
	return true;
}
function getProbMapping(){
	return probTable;
}
