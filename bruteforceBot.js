let probMapping = create2DArray(rows, columns);

let botMapping = getMapping();
reveal(5,0);
show();


function bruteCalc(){
	let probTiles = getProbTiles(botMapping);
	let mappings = [];
	probTiles = listFlagPlausible(probTiles);
	for(let i = 0; i < probTiles.length; i++){
		let tempBotMapping = JSON.parse(JSON.stringify(botMapping));
		tempBotMapping[probTiles[i][0]][probTiles[i][1]] = "F";
		let tempProbTiles = getProbTiles(tempBotMapping);
		tempProbTiles = listFlagPlausible(tempProbTiles);
		for(let j = 0; j < tempProbTiles.length; j++){
			
		}
	}
}
function getProbTiles(flagMapping){

	let probTiles = [];
	for(let i = 0; i < flagMapping.length; i++){
		for(let j = 0; j < flagMapping[i].length; j++){
			if(flagMapping[i][j] === "H"){
				const aroundIJ = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];

				for(let k = 0; k < aroundIJ.length; k++){	
					const x = aroundIJ[k][0];
					const y = aroundIJ[k][1];
					if(x >= 0 && x < flagMapping.length && y >=0 && y < flagMapping[0].length){
						if(typeof(flagMapping[x][y]) == 'number'){
							probTiles.push([i, j]);
							break;
						}
					}
				}
			}
		}
	}
	return probTiles;
}

function getFlagPlausible(x, y, flagMapping){
	let numberTiles = getNumberTilesAround(x, y, flagMapping);
	
	for(let i = 0; i < numberTiles.length; i++){
		let X = numberTiles[i][0];
		let Y = numberTiles[i][1];
		let number = flagMapping[X][Y];
		const aroundXY = [
			[X-1, Y-1], [X-1, Y], [X-1, Y+1],
			[X, Y-1],  [X, Y+1],
			[X+1, Y-1], [X+1, Y], [X+1, Y+1]
		];
		let flags = 0;
		let hidden = 0;
		for(let k = 0; k < aroundXY.length; k++){	
			const newx = aroundXY[k][0];
			const newy = aroundXY[k][1];
			if(newx >= 0 && newx < flagMapping.length && newy >=0 && newy < flagMapping[i].length){
				if(flagMapping[newx][newy] === "F"){
					flags++;
				}
				else if(flagMapping[newx][newy] === "H"){
					hidden++;
				}
			}
		}
		if(number === flags || number === hidden){
			return false;
		}
	}
	return true;
}

function getNumberTilesAround(x, y, flagMapping){
	let numberTiles = [];
	const aroundXY = [
		[x-1, y-1], [x-1, y], [x-1, y+1],
		[x, y-1],  [x, y+1],
		[x+1, y-1], [x+1, y], [x+1, y+1]
	];

	for(let k = 0; k < aroundXY.length; k++){	
		const newx = aroundXY[k][0];
		const newy = aroundXY[k][1];
		if(newx >= 0 && newx < flagMapping.length && newy >=0 && newy < flagMapping[0].length){
			if(typeof(flagMapping[newx][newy]) == "number"){
				numberTiles.push([newx, newy]);
			}
		}
	}
	return numberTiles;
}

function listFlagPlausible(probTiles){
	let result = [];
	
	for(let i=0; i < probTiles.length; i++){	
		let flagPlausible = getFlagPlausible(probTiles[i][0], probTiles[i][1], botMapping);

		if(flagPlausible === true){
			result.push(probTiles[i]);
		}
	}

	return result;
}

function validate(flagMapping){
	for(let i = 0; i < flagMapping.length; i++){
		for(let j = 0; j < flagMapping[i].length; j++){
			if(typeof(flagMapping[i][j]) == 'number'){
				let number = flagMapping[i][j];
				const aroundIJ = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];
				let flags = 0;
				for(let k = 0; k < aroundIJ.length; k++){	
					const x = aroundIJ[k][0];
					const y = aroundIJ[k][1];
					if(x >= 0 && x < botMapping.length && y >=0 && y < botMapping[0].length){
							
						if(flagMapping[x][y] === "F"){
							flags++;
						}
					}
				}
				if(number !== flags){
					return false;
				}
			}
		}
	}
	return true;
}

function exists(flagMapping, mappingList){
	for(let i = 0; i < mappingList.length; i++){
		if(compare2DArrays(flagMapping, mappingList[i]) === true){
			return true;
		}
	}
	return false;
}
function calcProb(x, y, mappingList){
	let flags = 0;
	for(let i = 0; i < mappingList.length; i++){
		if(mappingList[i][x][y] == 'F'){
			flags++;
		}
	}

	return flags/mappingList.length;
}
function getProbMapping(){
	return probMapping;
}

