let botMapping = getMapping();

let probMapping = create2DArray(botMapping.length, botMapping[0].length);

let probTable = create2DArray(2,2);

reveal(5,10);
show();
calcProbability();
function calcProbability(){
	for(let i = 0; i < botMapping.length; i++){
		for(let j = 0; j < botMapping[i].length; j++){
			if(Number.isInteger(botMapping[i][j])){
				const aroundXY = [
					[i-1, j-1], [i-1, j], [i-1, j+1],
					[i, j-1],  [i, j+1],
					[i+1, j-1], [i+1, j], [i+1, j+1]
				];

				let hiddenTiles = 0;

				for(let k = 0; k < aroundXY.length; k++){
					const x = aroundXY[k][0];
					const y = aroundXY[k][1];
					if(x >= 0 && x < grid.length && y >=0 && y < grid[i].length){
						if(botMapping[aroundXY[k][0]][aroundXY[k][1]] === "H"){
							hiddenTiles++;
						}
					}
				}

				if(hiddenTiles > 0){
					if(probTable[0][probTable[0].length - 1] !== undefined){
						probTable = addColumn(probTable);
					}
					probTable[0][probTable[0].length - 1] = i + "," + j;


					let flags = 0;

					for(let k = 0; k < aroundXY.length; k++){
						const x = aroundXY[k][0];
						const y = aroundXY[k][1];
						if(x >= 0 && x < grid.length && y >=0 && y < grid[i].length){
							if(botMapping[aroundXY[k][0]][aroundXY[k][1]] === "F"){
								flags++;
							}
						}
					}

				
					for(let k = 0; k < aroundXY.length; k++){
						const x = aroundXY[k][0];
						const y = aroundXY[k][1];
						if(x >= 0 && x < grid.length && y >=0 && y < grid[i].length){
							if(botMapping[aroundXY[k][0]][aroundXY[k][1]] === "H"){
								const posString = x + "," + y;
								let posStringFound = false;
								for(let l = 0; l < probTable.length; l++){
									if(probTable[l][0] === posString){
										posStringFound = true;
										probTable[l][probTable[l].length - 1] = (botMapping[i][j] - flags) / hiddenTiles;
									}
								}
								if(posStringFound === false){
									if(probTable[probTable.length - 1][0] !== undefined){
										probTable = addRow(probTable);
									}
									probTable[probTable.length - 1][0] = posString;
									probTable[probTable.length - 1][probTable[probTable.length - 1].length -1] = (botMapping[i][j] - flags) / hiddenTiles;
								}
							}
						}
					}
				}
			}
		}
	}
}
