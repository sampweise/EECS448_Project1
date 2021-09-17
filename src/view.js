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

    boxClickedRight: -1,

    player: 0,

    playerShips: null,

    firstGamePhase: 0,

    shipType: 0,

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
        else
        {
            if(view.firstGamePhase != 0)
            {
                if(this.getAttribute('data-id') > 99)
                {
                    let temp = this.getAttribute('data-id')
                    view.boxClickedRight = parseInt(temp)
                    view.clearRightBoard()
                    //display hits
                    view.boards[1].querySelector(`[data-id = "${view.boxClickedRight}"]`).setAttribute('src', 'images/target.png')
                }
                else
                {
                    alert("Hey click on the correct board please")
                }
            }
            else
            {
                alert("Please hand the computer over to the player and hit next turn when ready")
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

    clearRightBoard: function ()
    {
        let temp = view.boards[1].querySelectorAll("img")
        for(let i = 0; i<temp.length; i++)
        {
            temp[i].setAttribute('src', 'images/blank2.png')
        }
    },

    //finished
    setupPhase: function()
    {
        let button = document.createElement("button")
        button.innerText = "Click here to start placing pieces"
        button.setAttribute('data-button', 0)
        button.addEventListener('click', () =>
        {
            //runs the prompt
            view.runPrompt()
            if(view.player == 0)
            {
                document.querySelector(".Title").remove()
                view.body.querySelector("button").remove()
                view.turnFunc()
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
            if(view.player == 0)
            {
                view.body.appendChild(temp2)
            }
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

    setupPhaseText: function ()
    {
        //Creating an h5 tag to inform the user whose turn it is
        let playerTag = document.createElement("h5")
        playerTag.innerText = "Player " + (view.player+1) + "'s Turn"
        playerTag.setAttribute('data-player', view.player)

        //Creating a h3 tag to display instructions for the piece placement event
        let instruct = document.createElement("h3")
        instruct.innerText = "Turn away form your opponent, then place pieces by clicking on the spot you want the ship to start in. After that the orientation will be displayed, then click on the orientation you would prefer, and then hit the submit button"

        //Creating a h4 tag to display instructions for 1 length ship
        let shipNum = document.createElement("h4")
        shipNum.innerText = "Please place your " + view.placementCounter + " length ship"

        //Creating a button to indicate when the 1 length ship has been placed
        let subButton = document.createElement("button")
        subButton.innerText = "Submit"
        subButton.setAttribute('data-button', 2)

        //Event listener for hitting the submit button
        subButton.addEventListener('click', () => 
        {
            console.log(view.placementCounter)
            if(view.boxClicked == -1)
            {
                alert("Please select a box to place the ship")
                //resets the orient selected variable
                view.orientSelected = 0         

                //Restarts the turn
                view.placementCounter -= 1
                view.removeSetupPhaseText()
                view.turnFunc()
            }
            //If statement used for games longer than 1 boat game
            else if(view.promptVar > view.placementCounter && view.orientSelected == 1)
            {

                //Resetting the orient selected counter
                view.orientSelected = 0

                //Running the code to clear the orientation
                view.clearOrientation()

                //updating the array for the player for location and hits
                view.checkTurn()

                //Checks if the spots where you are placing you ship works and returns true if so
                if(view.updateLocation())
                {
                    //Resets the box clicked variable if order for it to display the orientation when you click on a box
                    view.boxClicked = -1
                    
                    //Displays the ship once the array has been updated
                    view.displayShips()

                    //Remove the setup text
                    view.removeSetupPhaseText()
                    
                    //Runs the next turn
                    view.turnFunc()
                }
                else
                {
                    //Resets the box clicked variable if order for it to display the orientation when you click on a box
                    view.boxClicked = -1

                    //Restarts the turn
                    view.placementCounter -= 1
                    view.removeSetupPhaseText()
                    view.turnFunc()
                }
            }
            //Case if the orientation isn't selected properly
            else if(view.orientSelected == 1)
            {
                view.orientSelected = 0
                if(view.player == 0)
                {
                    if(view.updateLocation())
                    {
                        view.displayShips()
                        view.clearOrientation()
                        view.boxClicked = -1
                        view.removeSetupPhaseText()
                        view.body.appendChild(turnButton)
                    }
                    else
                    {
                        view.clearOrientation()
                        view.boxClicked = -1
                        view.placementCounter -=1
                        view.removeSetupPhaseText()
                        view.turnFunc()
                    }
                }
                else
                {
                    if(view.updateLocation())
                    {
                        view.displayShips()
                        view.clearOrientation()
                        view.boxClicked = -1
                        view.removeSetupPhaseText()
                        view.gameState = 2 
                        //game phase
                        view.gamePhase()
                    }
                    else
                    {
                        view.clearOrientation()
                        view.boxClicked = -1
                        view.placementCounter -=1
                        view.removeSetupPhaseText()
                        view.turnFunc()
                    }
                }   
            }
            //For when the set up ends for a particular player
            else
            {
                    //Alerts if an orientation isn't selected
                    alert("Please select an orientation")

                    //resets the orient selected variable
                    view.orientSelected = 0
    
                    //Restarts the turn
                    view.placementCounter -= 1
                    view.removeSetupPhaseText()
                    view.turnFunc()
                
            }
            view.body.querySelector(`[data-button = "${2}"]`).remove()
        })

        //Creating a button to indicate when to switch turns
        let turnButton = document.createElement("button")
        turnButton.innerText = "Press here for next turn"
        turnButton.setAttribute('data-button', 1)

        //Adding event lister for the turn button
        turnButton.addEventListener('click', () =>
        {
            view.player = 1
            view.clearLeftBoard()
            view.checkTurn()
            view.placementCounter = 0
            view.body.querySelector(`[data-button = "${1}"]`).remove()
            view.turnFunc()
        })

        //add the tags to the body of the html file to be displayed
        view.body.appendChild(instruct)
        view.body.appendChild(subButton)
        view.body.appendChild(shipNum)
        view.body.appendChild(playerTag)

    },

    removeSetupPhaseText: function()
    {
        //removing the player turn tag
        view.body.querySelector("h5").remove()

        //removing the piece placement tag
        view.body.querySelector("h3").remove()

        //removing the ship length tag
        view.body.querySelector("h4").remove()
    },

    turnFunc: function()
    {

        console.log("Player " + view.player + " is placing pieces", view.player)

        //Setting the game state to the correct value
        view.gameState = 1

        //Showing what ship you are placing
        view.placementCounter += 1

        //Sets up the text to be displayed on the UI
        view.setupPhaseText()

        
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
            if(view.userOrientSelected == 0)
            {
                var tempVar  = -10
            }
            else if(view.userOrientSelected == 1)
            {
                var tempVar = 1
            }
            else if(view.userOrientSelected == 2)
            {
                var tempVar = 10
            }
            else if(view.userOrientSelected == 3)
            {
                var tempVar = -1
            }

            for(let i=0; i<view.placementCounter; i++)
            {
                if(view.checkBounds() && view.checkOverlap())
                {
                    view.playerShips[view.placementCounter-1].location.push(view.boxClicked)
                    view.playerShips[view.placementCounter-1].hits.push(-1)
                    console.log(view.playerShips)
                    view.pushedItems += 1
                    view.boxClicked = view.boxClicked+tempVar
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
            return true

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
                var tempVar = view.boxClicked < 10
            }
            else if(view.userOrientSelected == 1)
            {
                var tempVar = view.boxClicked % 10 == 9
            }
            else if(view.userOrientSelected == 2)
            {
                var tempVar = view.boxClicked > 80
            }
            else
            {
                var tempVar = view.boxClicked % 10 == 0
            }

            if(tempVar)
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
        
    },

    checkOverlap: function ()
    {
        for(let i=0; i<view.promptVar; i++)
        {
            for(let j =0; j<view.promptVar; j++)
            {
                if(view.playerShips[j].location[i] == view.boxClicked)
                {
                    return false
                }
            }
        }
        return true
    },

    displayShips: function ()
    {
        for(let i=0; i<view.promptVar; i++)
        {
            for(let j =0; j<view.promptVar; j++)
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
        view.player = 0
        view.checkTurn()
        //game phase code
        view.displayGamePhase()
        /*
        while(1)
        {
            if(view.winner())
            {
                break
            }
        }
        */
        
    },

    gamePhaseText: function ()
    {
        let title  = document.createElement("h3")
        title.setAttribute('class', 0)
        title.innerText = "In this part of the game you will start by again handing the computer to Player 1. Player 1 will then click on the 'Next Turn' button to reveal their pieces on the left board. The player will then make their guess on the right side of the board and then hit the 'Next Turn' button once after the button is clicked the left side of the board will go blank and you will hand it over to the other player. Then the other player will hit the 'Next Turn' button again and their pieces will be display on the left board"
        view.body.appendChild(title)

        let nxtButton = document.createElement("button")
        nxtButton.innerText = "Next Turn"
        nxtButton.addEventListener('click', () =>
        {
            if(view.firstGamePhase == 0)
            {
                //displays the players board and have the player two board on the right
                view.displayShips()
                view.firstGamePhase = 1
            }
            else if(view.firstGamePhase == 1)
            {
                if(view.boxClickedRight != -1)
                {
                    //displays whether there was a hit or miss after the player choose a spot to hit and check if a box has been clicked
                    view.player = !view.player
                    view.checkTurn()
                    view.boxClickedRight = -1
                    view.firstGamePhase = 2
                    console.log("HIT")
                    //view.extractShipType()
                    //view.fire()
                }
                else
                {
                    alert("Please select a box to hit")
                    view.firstGamePhase = 1
                }
            }
            else
            {
                //Creates a wall between the players in order for them to not see the other player ships
                view.clearLeftBoard()
                view.clearRightBoard()
                view.firstGamePhase = 0
            }
        })
        view.body.appendChild(nxtButton)
    },

        /*
    fire: function ()
    {
        if(view.checkHitAlready() && view.checkHit())
        {
            console.log(view.shipType)
            view.playerShips[view.shipType-1].hits.push(view.boxClickedRight)
            console.log(view.playerShips[view.shipType-1])
            view.firstGamePhase += 1
        }
        else if(view.checkHit())
        {
            alert("You have already hit this location")
            view.firstGamePhase -= 1
        }
        else
        {
            //miss
            view.firstGamePhase += 1
        }
    },

    checkHitAlready: function ()
    {
        for(let i = 0; i<view.promptVar; i++)
        {
            for(let j = 0; j< view.promptVar; j++)
            {
                if(view.playerShips[i].hits[j] == view.boxClickedRight)
                {
                    return false
                }
            }
        }
        return true
    },

    checkHit: function ()
    {
        for(let i = 0; i<view.promptVar; i++)
        {
            for(let j = 0; j< view.promptVar; j++)
            {
                if(view.playerShips[i].locations[j] == view.boxClickedRight)
                {
                    return true
                }
            }
        }
        return false
    },

    extractShipType: function ()
    {
        for(let i = 0; i<view.promptVar; i++)
        {
            for(let j = 0; j< view.promptVar; j++)
            {
                if(view.playerShips[i].location[j] == view.boxClickedRight)
                {
                    view.shipType = view.playerShips[i].location.length
                }
            }
        }
    },
    */

    removeGamePhaseText: function ()
    {

    },


    displayGamePhase: function()
    {
        let gameButton = document.createElement("button")
        gameButton.innerText = "Click here to start the game phase"
        gameButton.setAttribute('data-button', 3)
        gameButton.addEventListener('click', () => {
            view.clearOrientation()
            view.clearLeftBoard()
            view.gamePhaseText()
            view.body.querySelector(`[data-button = "${3}"]`).remove()
        })
        view.body.querySelector("h2").remove()
        //view.body.querySelector(`[data-button = "${2}"]`).remove()
        view.body.appendChild(gameButton)
        console.log("here")
    
    }
}