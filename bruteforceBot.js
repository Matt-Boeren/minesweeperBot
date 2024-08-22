reveal(0,0);
show();

let botMapping = getMapping();

bruteCalc();

function bruteCalc(){
	let probTiles = getProbTiles();
	console.log(probTiles);	
	for(let i = 0; i < probTiles.length; i++){
		let flagPlausible = getFlagPlausible(probTiles[i][0], probTiles[i][1]);
	}
}

function getProbTiles(){

	let probTiles = [];
	for(let i = 0; i < botMapping.length; i++){
		for(let j = 0; j < botMapping[i].length; j++){
			if(botMapping[i][j] === "H"){
				const aroundIJ = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];

				for(let k = 0; k < aroundIJ.length; k++){	
					const x = aroundIJ[k][0];
					const y = aroundIJ[k][1];
					if(x >= 0 && x < botMapping.length && y >=0 && y < botMapping[0].length){
						if(typeof(botMapping[x][y]) == 'number'){
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

function getFlagPlausible(x, y){
	let numberTiles = getNumberTilesAround(x, y);
	
	for(let i = 0; i < numberTiles.length; i++){
		let X = numberTiles[i][0];
		let Y = numberTiles[i][1];
		let number = botMapping[X][Y];
		const aroundXY = [
			[X-1, Y-1], [X-1, Y], [X-1, Y+1],
			[X, Y-1],  [X, Y+1],
			[X+1, Y-1], [X+1, Y], [X+1, Y+1]
		];
		let flags = 0;
		for(let k = 0; k < aroundXY.length; k++){	
			const newx = aroundXY[k][0];
			const newy = aroundXY[k][1];
			if(newx >= 0 && newx < botMapping.length && newy >=0 && newy < botMapping[i].length){
				if(botMapping[newx][newy] == "F"){
					flags++;
				}
			}
		}
		if(number === flags){
			return false;
		}
	}
	return true;
}

function getNumberTilesAround(x, y){
	let numberTiles = [];
	const aroundXY = [
		[x-1, y-1], [x-1, y], [x-1, y+1],
		[x, y-1],  [x, y+1],
		[x+1, y-1], [x+1, y], [x+1, y+1]
	];

	for(let k = 0; k < aroundXY.length; k++){	
		const newx = aroundXY[k][0];
		const newy = aroundXY[k][1];
		if(newx >= 0 && newx < botMapping.length && newy >=0 && newy < botMapping[0].length){
			if(typeof(botMapping[newx][newy]) == "number"){
				numberTiles.push([newx, newy]);
			}
		}
	}
	return numberTiles;
}
