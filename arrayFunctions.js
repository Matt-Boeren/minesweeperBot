function create2DArray(rows, cols) {
    let array = new Array(rows);
    for (let i = 0; i < rows; i++) {
        array[i] = new Array(cols).fill(undefined);
    }
    return array;
}

function addRow(arr) {
	let newArray = arr;
	let newRow = new Array(newArray[0].length).fill(undefined); // Initialize the new row
  newArray.push(newRow);
  return newArray;
}

function addColumn(arr) {
	let newArray = arr;
	for(let i = 0; i < newArray.length; i++){
		newArray[i][newArray[i].length] = undefined;
	}
	return newArray;
}
