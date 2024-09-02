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

function compare2DArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
		return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length !== arr2[i].length) {
			return false;
    }

    for (let j = 0; j < arr1[i].length; j++) {
			if (arr1[i][j] !== arr2[i][j]) {
		    return false;
      }
    }
  }

  return true;
}

