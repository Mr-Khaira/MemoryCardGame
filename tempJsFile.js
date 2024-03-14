function shuffle(theArr) {
  for (let i = theArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = theArr[i];
    theArr[i] = theArr[j];
    theArr[j] = temp;
  }
  return theArr;
}

let myArr = [1, 2, 3, 4, 5];
console.log("The arr passed = ", myArr);
console.log("The shuffled arr is ", shuffle(myArr));
