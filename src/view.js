const view = 
{
    body: document.querySelector("body"),

    boards: document.querySelectorAll(".board"),

    locationString: ['A','B','C','D','E','F','G','H','I','J'],

    boxClicked: -1,

    placementCounter: 0,

    gameState: 0,

    shipsP1: [],

    shipsP2: [],

    orientSelected: 0,

    userOrientSelected: -1,

    promptVar: 0,

    pushedItems: 0,

    player: 0,

    playerShips: null,

    orientArr: ['N', 'E', 'S', 'W'],

    //needs work
    runGame: function()
    {
        let quit = 1
        view.renderBoard()
        if(quit == 0)
        {
            quit = 1
            view.runGame()
        }
        
    },

    renderBoard: function()
    {
        let container = document.querySelectorAll(".letterContainer")
        let numContainer = document.querySelectorAll(".numberContainer")

        //Creates each spot on the board
        for (let i=0; i<90; i++)
        {
            let temp = document.createElement("img")
            let temp2 = document.createElement("img")
            temp.setAttribute('src', 'images/blank2.png')
            temp.setAttribute('data-id', i)
            temp2.setAttribute('src', 'images/blank2.png')
            temp2.setAttribute('data-id', 100+i)
            temp.addEventListener('click', view.boxClickEvent)
            temp2.addEventListener('click', view.boxClickEvent)
            view.boards[0].appendChild(temp)
            view.boards[1].appendChild(temp2)
        }
        //displays the letter on the top of the board
        for (let i=0; i<10; i++)
        {
            let temp = document.createElement("div")
            let temp2 = document.createElement("div")
            temp.innerText = this.locationString[i]
            temp2.innerText = this.locationString[i]
            container[0].appendChild(temp)
            container[1].appendChild(temp2)
        }
        //displays the numbers on the columns
        for(let i =0; i<9; i++)
        {
            let temp = document.createElement("div")
            let temp2 = document.createElement("div")
            temp.innerText = i
            temp2.innerText = i
            numContainer[0].appendChild(temp)
            numContainer[1].appendChild(temp2)
        }
        view.setupPhase()
    },

    boxClickEvent: function()
    {
        if(view.gameState == 1)
        {
            if(this.getAttribute('data-id') < 100)
            {
                if(view.boxClicked == -1)
                {
                    view.displayOrientation()
                }
                let temp = this.getAttribute('data-id')
                view.boxClicked = parseInt(temp)
                view.clearLeftBoard()
                view.displayShips()
                view.boards[0].querySelector(`[data-id = "${view.boxClicked}"]`).setAttribute('src', 'images/boat.png')
            }
            else
            {
                alert("Hey click on the correct board please")
            }
        }
    },

    clearLeftBoard: function()
    {
        let temp = view.boards[0].querySelectorAll("img")
        for (let i = 0; i<temp.length; i++)
        {
            temp[i].setAttribute('src','images/blank2.png')
        }
    },   

    //finished
    setupPhase: function()
    {
        let button = document.createElement("button")
        button.innerText = "Click here to start placing pieces"
        button.addEventListener('click', () =>
        {
            //runs the prompt
            view.runPrompt()
            if(view.player == 0)
            {
                view.turnOne()
            }
        })
        view.body.appendChild(button)
            
        
    },

    //Displays the orientation text and contains the click event for the orientation
    displayOrientation: function()
    {
        if(view.placementCounter == 1) 
        {
            let temp = document.createElement("div")
            let temp2 = document.createElement("h2")
            temp.innerText = "There is no specific orientation, please click this prompt and hit submit"
            temp2.innerText = "ORIENTATION"
            temp.addEventListener('click', ()=>
            {
                view.orientSelected = 1
                //add code that displays pieces and updates the array to store infromation based on the player
            })
            document.querySelector(".orientContainer").appendChild(temp)
            view.body.appendChild(temp2)
        }
        else
        {
            for(let i=0 ; i<4; i++)
            {
                let temp = document.createElement("div")
                temp.innerText = view.orientArr[i]
                temp.setAttribute('data-orientation', i)
                temp.setAttribute('class', view.orientArr[i])
                temp.addEventListener('click', view.userOrientation)
                document.querySelector(".orientContainer").appendChild(temp)
            }
        }
    },

    userOrientation: function()
    {
        view.orientSelected = 1
        if(this.getAttribute('data-orientation') == "0")
        {
            //Code for north placement
            view.userOrientSelected = 0
        }
        else if(this.getAttribute('data-orientation') == "1")
        {
            view.userOrientSelected = 1
        }
        else if(this.getAttribute('data-orientation') == "2")
        {   
            view.userOrientSelected = 2
        }
        else if(this.getAttribute('data-orientation') == "3")
        {
            view.userOrientSelected = 3
        }
        //add code that displays pieces and updates the array to store information based on the player
    },

    clearOrientation: function()
    {
        let temp = document.querySelector(".orientContainer")
        temp = temp.querySelectorAll("div")
        for(let i = 0; i<temp.length; i++)
        {
            temp[i].remove()
        }
    },

    runPrompt: function()
    {
        //Creating the prompt that specifies the number of ships
        let correct = 0
        do 
        {
            view.promptVar = prompt("How many ships do you want to play with! (Minimum: 1, Maximum: 6")
            if(view.promptVar >= 1 && view.promptVar <= 6)
            {
                correct = 1 
                for(let i=0; i<view.promptVar; i++)
                {   
                    view.shipsP1.push({location: [], hits: []})
                    view.shipsP2.push({location: [], hits: []})
                }
                view.playerShips = view.shipsP1
            }
        } while(correct == 0)
    },

    turnOne: function()
    {
        console.log("Player " + view.player + " is placing pieces", view.player)

        let playerTag = document.createElement("h5")
        playerTag.innerText = "Player " + (view.player+1) + "'s Turn"
        playerTag.setAttribute('data-player', view.player)

        //Setting the game state to the correct value
        view.gameState = 1
        if(view.player == 0)
        {
            //Removing the title and button
            document.querySelector(".Title").remove()
            view.body.querySelector("button").remove()
            
        }
        else
        {
            view.body.querySelector(`[data-player = "${0}"]`).remove()
            view.body.querySelector(`[data-button = "${1}"]`).remove()
        }
        //Creating a h3 tag to display instructions for the piece placement event
        let instruct = document.createElement("h3")
        instruct.innerText = "Turn away form your opponent, then place pieces by clicking on the spot you want the ship to start in. After that the orientation will be displayed, then click on the orientation you would prefer, and then hit the submit button"
        
        //Creating a h4 tag to display instructions for 1 length ship
        let shipNum = document.createElement("h4")
        shipNum.innerText = "Please place your 1 length ship"

        //Creating a button to indicate when the 1 length ship has been placed
        let subButton = document.createElement("button")
        subButton.innerText = "Submit"

        let turnButton = document.createElement("button")
        turnButton.innerText = "Press here for next turn"
        turnButton.setAttribute('data-button', 1)

        //Showing what ship you are placing
        view.placementCounter = 1

        subButton.addEventListener('click', () => 
        {
            if(view.promptVar > 1 && view.orientSelected == 1)
            {
                view.orientSelected = 0
                view.clearOrientation()
                document.querySelector("h4").remove()
                view.checkTurn()
                if(view.updateLocation())
                {
                    view.boxClicked = -1
                    view.displayShips()
                    view.otherTurns(2)
                }
                else
                {
                    view.boxClicked = -1
                    view.turnOne
                }
            }
            else if(view.promptVar > 1)
            {
                alert("Please select an orientation")
                view.turnOne()
            }
            else
            {
                if(view.player == 0)
                {
                    turnButton.addEventListener('click', () =>
                    {
                        view.updateLocation()
                        view.player = 1
                        view.clearLeftBoard()
                        view.checkTurn()
                        view.turnOne()
                    })
                    view.body.appendChild(turnButton)
                }
                else
                {
                    view.updateLocation()
                    view.gameState = 2 
                    //game phase
                    view.gamePhase()
                }   
            }
        })
        view.body.appendChild(instruct)
        view.body.appendChild(subButton)
        view.body.appendChild(shipNum)
        view.body.appendChild(playerTag)
    },

    otherTurns: function (turn)
    {
        //Creating a h4 tag to display instructions for 1 length ship
        let shipNum = document.createElement("h4")
        shipNum.innerText = "Please place your " + turn + " length ship"

        //Creating a button to indicate when the 1 length ship has been placed
        let subButton = document.createElement("button")
        subButton.innerText = "Submit"

        //Showing what ship you are placing
        view.placementCounter = turn

        let turnButton = document.createElement("button")
        turnButton.innerText = "Press here to place player 2 ships"
        turnButton.setAttribute('data-button', 1)

        subButton.addEventListener('click', () => 
        {
            if(view.promptVar > turn && view.orientSelected == 1)
            {
                view.orientSelected = 0
                view.clearOrientation()
                document.querySelector("h4").remove()
                view.checkTurn()
                if(view.updateLocation())
                {
                    view.boxClicked = -1
                    view.displayShips()
                    view.otherTurns(turn+1)
                }
                else
                {
                    view.boxClicked = -1
                    view.otherTurns(turn)
                }
            }
            else if(view.promptVar > turn)
            {
                alert("Please select an orientation")
                view.otherTurns(turn)
            }
            else
            {
                view.orientSelected = 0
                view.clearOrientation()
                document.querySelector("h4").remove()
                if(view.updateLocation())
                {
                    view.boxClicked = -1
                    view.displayShips()
                }
                else
                {
                    view.boxClicked = -1
                    view.otherTurns(turn)
                }
                if(view.player == 0)
                {
                    turnButton.addEventListener('click', () =>
                    {
                        view.player = 1
                        view.clearLeftBoard()
                        view.checkTurn()
                        view.turnOne()
                    })
                    view.body.appendChild(turnButton)
                }
                else
                {
                    view.gameState = 2 
                    //game phase
                    view.gamePhase()
                }   
            }
        })
        view.body.appendChild(subButton)
        view.body.appendChild(shipNum)
    },

    updateLocation: function()
    {
        if(view.placementCounter == 1)
        {
            view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
            view.playerShips[view.placementCounter-1].hits.push(-1)
            console.log(view.playerShips)
            return true
        }
        else
        {     
            if(view.checkOverlap())
            {
                view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                view.playerShips[view.placementCounter-1].hits.push(-1)
            }
            else
            {
                alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                return false
            }
            view.pushedItems +=1
            if(view.userOrientSelected == 0)
            {
                for(let i=0; i<view.placementCounter-1; i++)
                {
                    view.boxClicked = view.boxClicked-10
                    if(view.checkBounds() && view.checkOverlap())
                    {
                        view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                        view.playerShips[view.placementCounter-1].hits.push(-1)
                        console.log(view.playerShips)
                        view.pushedItems += 1
                    }
                    else
                    {
                        alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                        view.playerShips[view.placementCounter-1].location = []
                        view.playerShips[view.placementCounter-1].hits = []
                        view.pushedItems = 0
                        return false
                    }  
                }
                view.pushedItems = 0
                return true
            }
            else if(view.userOrientSelected == 1)
            {
                for(let i=0; i<view.placementCounter-1; i++)
                {
                    view.boxClicked = view.boxClicked+1
                    if(view.checkBounds() && view.checkOverlap())
                    {
                        //if(ships overlap) give an error
                        view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                        view.playerShips[view.placementCounter-1].hits.push(-1)
                        console.log(view.playerShips)
                        view.pushedItems += 1
                    }
                    else
                    {
                        alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                        view.playerShips[view.placementCounter-1].location = []
                        view.playerShips[view.placementCounter-1].hits = []
                        view.pushedItems = 0
                        return false
                    }  
                }
                view.pushedItems = 0
                return true
            }
            else if(view.userOrientSelected == 2)
            {
                for(let i=0; i<view.placementCounter-1; i++)
                {
                    view.boxClicked = view.boxClicked+10
                    if(view.checkBounds() && view.checkOverlap())
                    {
                        view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                        view.playerShips[view.placementCounter-1].hits.push(-1)
                        view.pushedItems += 1
                        console.log(view.playerShips)
                    }
                    else
                    {
                        alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                        view.playerShips[view.placementCounter-1].location = []
                        view.playerShips[view.placementCounter-1].hits = []
                        view.pushedItems = 0
                        return false
                    }  
                view.pushedItems = 0
                }
                return true
            }
            else if(view.userOrientSelected == 3)
            {
                for(let i=0; i<view.placementCounter-1; i++)
                {
                    view.boxClicked = view.boxClicked-1
                    if(view.checkBounds() && view.checkOverlap())
                    {
                        view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                        view.playerShips[view.placementCounter-1].hits.push(-1)
                        view.pushedItems += 1
                        console.log(view.playerShips)
                    }
                    else
                    {
                        alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                        view.playerShips[view.placementCounter-1].location = []
                        view.playerShips[view.placementCounter-1].hits = []
                        view.pushedItems = 0
                        return false
                    }  
                }
                view.pushedItems = 0
                return true
            }

        }
    },

    checkBounds: function()
    {
        if(view.boxClicked < 0 || view.boxClicked > 89)
        {
            return false
        }
        else
        {   
            if(view.userOrientSelected == 0)
            {
                if(view.boxClicked < 10)
                {   
                    if(view.pushedItems == view.placementCounter-1)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                }
                else
                {
                    return true
                }
            }
            else if(view.userOrientSelected == 1)
            {
                if(view.boxClicked % 10 == 9)
                {
                    if(view.pushedItems == view.placementCounter-1)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                }
                else
                {
                    return true
                }
            }
            else if(view.userOrientSelected == 2)
            {
                if(view.boxClicked > 80)
                {
                    if(view.pushedItems == view.placementCounter-1)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                }
                else
                {
                    return true
                }
            }
            else if(view.userOrientSelected == 3)
            {
                if(view.boxClicked % 10 == 0)
                {
                    if(view.pushedItems == view.placementCounter-1)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                }
                else
                {
                    return true
                }
            }
        }
        
    },

    checkOverlap: function ()
    {
        for(let i=0; i<4; i++)
        {
            for(let j =0; j<4; j++)
            {
                if(view.playerShips[i].location[j] == view.boxClicked)
                {
                    return false
                }
            }
        }
        return true
    },

    displayShips: function ()
    {
        for(let i=0; i<4; i++)
        {
            for(let j =0; j<4; j++)
            {
                let temp = view.playerShips[j].location[i]
                if(temp != null)
                {
                    view.boards[0].querySelector(`[data-id = "${temp}"]`).setAttribute('src', 'images/boat.png')
                }
            }
        }
    },

    checkTurn: function ()
    {
        if(view.player == 0)
        {
            view.playerShips = view.shipsP1
        }
        else
        {
            view.playerShips = view.shipsP2
        }
    },

    gamePhase: function()
    {
        //game phase code
        view.displayGamePhase()
        while(1)
        {
            if(view.winner())
            {
                break
            }
        }
        
    },

    /*
    displayGamePhase: function()
    {
        let gameButton = document.
        view.clearLeftBoard()
        view.body.querySelector("button").remove()
        view.body.querySelector("h5").remove

    }
    */
}