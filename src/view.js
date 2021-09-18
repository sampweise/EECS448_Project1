const view = 
{
    body: document.querySelector("body"),

    boards: document.querySelectorAll(".board"),

    locationString: ['A','B','C','D','E','F','G','H','I','J'],

    orientSelected: 0,

    userOrientSelected: -1,

    sunkArr: [],

    sunkCount: 0,

    gamePhasePlayerTag: document.createElement("h5"),

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
        model.setupPhase()
    },

    boxClickEvent: function()
    {
        if(model.gameState == 1)
        {
            if(this.getAttribute('data-id') < 100)
            {
                if(model.boxClicked == -1)
                {
                    view.displayOrientation()
                }
                let temp = this.getAttribute('data-id')
                model.boxClicked = parseInt(temp)
                view.clearLeftBoard()
                view.displayShips()
                view.boards[0].querySelector(`[data-id = "${model.boxClicked}"]`).setAttribute('src', 'images/boat.png')
            }
            else
            {
                alert("Hey click on the correct board please")
            }
        }
        else if(model.gameState == 2)
        {
            if(model.firstGamePhase != 0)
            {
                console.log("here")
                if(this.getAttribute('data-id') > 99)
                {
                    let temp = this.getAttribute('data-id')
                    model.boxClickedRight = parseInt(temp)
                    view.clearRightBoard()
                    view.boards[1].querySelector(`[data-id = "${model.boxClickedRight}"]`).setAttribute('src', 'images/target.png')
                    if(model.error == 0)
                    {
                        model.changeTurn()
                    }
                    view.displayHits()
                    view.displaySunk()
                    view.displayMisses()
                    if(model.error == 0)
                    {
                        model.changeTurn()
                    }
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


    //Displays the orientation text and contains the click event for the orientation
    displayOrientation: function()
    {
        if(model.placementCounter == 1) 
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
            if(model.player == 0)
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

    setupPhaseText: function ()
    {
        //Creating an h5 tag to inform the user whose turn it is
        let playerTag = document.createElement("h5")
        playerTag.innerText = "Player " + (model.player+1) + "'s Turn"
        playerTag.setAttribute('data-player', model.player)

        //Creating a h3 tag to display instructions for the piece placement event
        let instruct = document.createElement("h3")
        instruct.innerText = "Turn away from your opponent, then place pieces by clicking on the spot you want the ship to start in. After that the orientation will be displayed, then click on the orientation you would prefer, and then hit the submit button"

        //Creating a h4 tag to display instructions for 1 length ship
        let shipNum = document.createElement("h4")
        shipNum.innerText = "Please place your " + model.placementCounter + " length ship"

        //Creating a button to indicate when the 1 length ship has been placed
        let subButton = document.createElement("button")
        subButton.innerText = "Submit"
        subButton.setAttribute('data-button', 2)

        //Event listener for hitting the submit button
        subButton.addEventListener('click', () => 
        {
            console.log(model.placementCounter)
            if(model.boxClicked == -1)
            {
                alert("Please select a box to place the ship")
                //resets the orient selected variable
                view.orientSelected = 0         

                //Restarts the turn
                model.placementCounter -= 1
                view.removeSetupPhaseText()
                model.turnFunc()
            }
            //If statement used for games longer than 1 boat game
            else if(model.promptVar > model.placementCounter && view.orientSelected == 1)
            {

                //Resetting the orient selected counter
                view.orientSelected = 0

                //Running the code to clear the orientation
                view.clearOrientation()

                //checkTurn

                //Checks if the spots where you are placing you ship works and returns true if so
                if(model.updateLocation())
                {
                    //Resets the box clicked variable if order for it to display the orientation when you click on a box
                    model.boxClicked = -1
                    
                    //Displays the ship once the array has been updated
                    view.displayShips()

                    //Remove the setup text
                    view.removeSetupPhaseText()
                    
                    //Runs the next turn
                    model.turnFunc()
                }
                else
                {
                    //Resets the box clicked variable if order for it to display the orientation when you click on a box
                    model.boxClicked = -1

                    //Restarts the turn
                    model.placementCounter -= 1
                    view.removeSetupPhaseText()
                    model.turnFunc()
                }
            }
            //Case if the orientation isn't selected properly
            else if(view.orientSelected == 1)
            {
                view.orientSelected = 0
                if(model.player == 0)
                {
                    if(model.updateLocation())
                    {
                        view.displayShips()
                        view.clearOrientation()
                        model.boxClicked = -1
                        view.removeSetupPhaseText()
                        view.body.appendChild(turnButton)
                    }
                    else
                    {
                        view.clearOrientation()
                        model.boxClicked = -1
                        model.placementCounter -=1
                        view.removeSetupPhaseText()
                        model.turnFunc()
                    }
                }
                else
                {
                    if(model.updateLocation())
                    {
                        view.displayShips()
                        view.clearOrientation()
                        model.boxClicked = -1
                        view.removeSetupPhaseText()
                        model.gameState = 2 
                        //game phase
                        model.gamePhase()
                    }
                    else
                    {
                        view.clearOrientation()
                        model.boxClicked = -1
                        model.placementCounter -=1
                        view.removeSetupPhaseText()
                        model.turnFunc()
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
                    model.placementCounter -= 1
                    view.removeSetupPhaseText()
                    model.turnFunc()
                
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
            model.changeTurn()
            view.clearLeftBoard()
            model.placementCounter = 0
            view.body.querySelector(`[data-button = "${1}"]`).remove()
            model.turnFunc()
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

    displayShips: function ()
    {
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                let temp = model.playerShips[i].location[j]
                if(temp != null)
                {
                    view.boards[0].querySelector(`[data-id = "${temp}"]`).setAttribute('src', 'images/boat.png')
                }
            }
        }
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
            view.gamePhasePlayerTag.innerText = "Player " + (model.player+1) + "'s turn"
            if(model.firstGamePhase == 0)
            {
                model.gameState = 2

                //displays the players board and have the player two board on the right
                if(model.player != 0)
                {
                    view.body.querySelector("h5").remove()
                }
                view.body.appendChild(view.gamePhasePlayerTag)
                
                view.displayShips()
                model.changeTurn()
                view.displayHits()
                view.displaySunk()
                view.displayMisses()
                model.changeTurn()
                model.firstGamePhase = 1
            }
            else if(model.firstGamePhase == 1)
            {
                if(model.boxClickedRight != -1)
                {
                    //displays whether there was a hit or miss after the player choose a spot to hit and check if a box has been clicked
                    if(model.error == 0)
                    {
                        model.changeTurn()
                    }
                    model.firstGamePhase = 2
                    model.extractShipType()
                    model.gameState = 3
                    model.fire()
                    view.displayHits()
                    view.displaySunk()
                    view.displayMisses()
                    model.boxClickedRight = -1
                }
                else
                {
                    alert("Please select a box to hit")
                    model.gameState = 2
                    model.firstGamePhase = 1
                }
            }
            else
            {
                //Creates a wall between the players in order for them to not see the other player ships
                view.clearLeftBoard()
                view.clearRightBoard()
                model.firstGamePhase = 0
            }
        })
        view.body.appendChild(nxtButton)
    },

    displayHits: function ()
    {
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                let temp = model.playerShips[i].hits[j]
                if(temp != null)
                {
                    view.boards[1].querySelector(`[data-id = "${temp}"]`).setAttribute('src', 'images/hit.png')  
                }
            }
        }
        model.changeTurn()
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                let temp = model.playerShips[i].hits[j]
                if(temp != null)
                {
                    view.boards[0].querySelector(`[data-id = "${temp-100}"]`).setAttribute('src', 'images/hit.png')  
                }
            }
        }
        model.changeTurn()
    },

    displaySunk: function ()
    {
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                let temp = model.playerShips[i].hits[j]
                if(temp != null)
                {
                    view.sunkCount += 1
                    view.sunkArr.push(temp)
                    if(view.sunkCount == i+1)
                    {
                        for(let k = 0; k < view.sunkCount; k++)
                        {
                            view.boards[1].querySelector(`[data-id = "${view.sunkArr[k]}"]`).setAttribute('src', 'images/sunk.png')  
                        }   
                    }  
                }
            }
            view.sunkCount = 0
            view.sunkArr = []
        }
        model.changeTurn()
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                let temp = model.playerShips[i].hits[j]
                if(temp != null)
                {
                    view.sunkCount += 1
                    view.sunkArr.push(temp)
                    if(view.sunkCount == i+1)
                    {
                        for(let k = 0; k < view.sunkCount; k++)
                        {
                            view.boards[0].querySelector(`[data-id = "${view.sunkArr[k]-100}"]`).setAttribute('src', 'images/sunk.png')  
                        }   
                    }  
                }
            }
            view.sunkCount = 0
            view.sunkArr = []
        }
        model.changeTurn()
    },

    displayMisses: function ()
    {
        for(i=0; i<model.playerMisses.length; i++)
        {
            view.boards[1].querySelector(`[data-id = "${model.playerMisses[i]}"]`).setAttribute('src', 'images/waves.png')
        }
    },

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
    
    }
}