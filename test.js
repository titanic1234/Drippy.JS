var liste2 = ["5984", "57695532", "956495624", "542", "54321", "4", "87908609432", "9"]
//var liste2 = [5452,5511,9,651345,4312];
console.log(liste2);

function compareNumbers(a, b) {
    return a - b;
}

liste2.sort(compareNumbers);
console.log(liste2);
liste2.reverse();

console.log(liste2);