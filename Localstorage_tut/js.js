Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
      if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
  }
  
  Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.push(arrayItem);
    this.setItem(arrayName,JSON.stringify(existingArray));
  }
  
  Storage.prototype.popArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
      arrayItem = existingArray.pop();
      this.setItem(arrayName,JSON.stringify(existingArray));
    }
    return arrayItem;
  }
  
  Storage.prototype.shiftArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
      arrayItem = existingArray.shift();
      this.setItem(arrayName,JSON.stringify(existingArray));
    }
    return arrayItem;
  }
  
  Storage.prototype.unshiftArrayItem = function(arrayName,arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.unshift(arrayItem);
    this.setItem(arrayName,JSON.stringify(existingArray));
  }
  
  Storage.prototype.deleteArray = function(arrayName) {
    this.removeItem(arrayName);
  }

  //example usage - storing simple strings in localStorage array:
  
  localStorage.pushArrayItem('myArray','item one');
  localStorage.pushArrayItem('myArray','item two');

  //example usage - storing objects in sessionStorage array:
  
  var item1 = {}; item1.name = 'fred'; item1.age = 48;
  sessionStorage.pushArrayItem('myArray',item1);
  
  var item2 = {}; item2.name = 'dave'; item2.age = 22;
  sessionStorage.pushArrayItem('myArray',item2);

  //common methods to manipulate arrays:
  
//   .pushArrayItem(arrayName,arrayItem); -> adds an element onto end of named array
//   .unshiftArrayItem(arrayName,arrayItem); -> adds an element onto front of named array
//   .popArrayItem(arrayName); -> removes & returns last array element
//   .shiftArrayItem(arrayName); -> removes & returns first array element
//   .getArray(arrayName); -> returns entire array
//   .deleteArray(arrayName); -> removes entire array from storage