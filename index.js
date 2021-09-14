document.addEventListener('DOMContentLoaded', () => {
    view.renderBoard()
})

/*
//NOTES//
- Could remove the "ships" in the parameters if we don't need it

let x, y, value = 0;
let width = 10; // 1 to 10 (1-10)
let height = 9 //a to i (1-9)
let ships = []; //user ships arr

//a test array i did
//filling array with 0s
for(let i =0; i < height; i++) {
    ships[i] = [];
    for(let j = 0; j < width; j++)
    {
        ships[i][j] = 0;
    }
}

*/
//=====================================================================================================
//gets value at given index
function get(x, y, ships) {
    let arr = ships[x][y]
    return(arr);
}
//=====================================================================================================
//sets value at given index
//set(x = the row, y = the column, ships = the array, value = the int value)
function set(x, y, ships, value) {
    ships[x][y] = value;
}
//=====================================================================================================
//passes in int x, int y, and array ships
//checks if the coordinate is empty
/*
//////////////////////////////////

Not sure if this is what you wanted

///////////////////////////////////
*/
function check(x, y, ships) {
    if(ships[x][y] == 0)
    {
        return(true)
    }
    else
    {
        return(false)
    }
}
//=====================================================================================================
//Counts how many times the value exists in the array
function count(value, ships)
{
    countingValue = 0;
    for(let i =0; i < height; i++) {
        for(let j = 0; j < width; j++)
        {
            if(value == ships[i][j]) {
                countingValue++;
            }
        }
    }
    return(countingValue)
}
//=====================================================================================================
//if 0(false), counts all even numbers greater than zero
//if 1(true), counts all odd numbers greater than zero
function countEvenOdd(symmetry)
{
    countingValue = 0;
    if(symmetry == 0)
    {
        for(let i =0; i < height; i++) {
            for(let j = 0; j < width; j++)
            {
                if(ships[i][j] % 2 == 0 && ships[i][j] > 0) {
                    countingValue++;
                }
            }
        }
        return(countingValue)
    }
    if(symmetry == 1)
    {
        for(let i =0; i < height; i++) {
            for(let j = 0; j < width; j++)
            {
                if(ships[i][j] % 2 == 1 && ships[i][j] > 0) {
                    countingValue++;
                }
            }
        }
        return(countingValue)
    }
}