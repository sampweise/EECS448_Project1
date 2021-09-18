const model = 
{
    promptVar: 0,

    placementCounter: 0,

    player: 0,

    playerMisses: null,

    missesP1: [],

    missesP2: [],

    playerShips: null,

    shipsP1: [],

    shipsP2: [],

    gameState: 0,

    pushedItems: 0,

    boxClicked: -1,

    boxClickedRight: -1,

    shipType: 0,

    firstGamePhase: 0,

    missCount: 0,

    winnerCount: 0,

    error: 0,

    winner: 0,

    setupPhase: function()
    {
        let button = document.createElement("button")
        button.innerText = "Click here to start placing pieces"
        button.setAttribute('data-button', 0)
        button.addEventListener('click', () =>
        {
            //runs the prompt
            model.runPrompt()
            if(model.player == 0)
            {
                document.querySelector(".Title").remove()
                view.body.querySelector("button").remove()
                model.turnFunc()
            }
        })
        view.body.appendChild(button)
            
        
    },

    turnFunc: function()
    {

        console.log("Player " + model.player + " is placing pieces", model.player)

        //Setting the game state to the correct value
        model.gameState = 1

        //Showing what ship you are placing
        model.placementCounter += 1

        //Sets up the text to be displayed on the UI
        view.setupPhaseText()

        
    },

    runPrompt: function()
    {
        //Creating the prompt that specifies the number of ships
        let correct = 0
        do 
        {
            model.promptVar = prompt("How many ships do you want to play with! (Minimum: 1, Maximum: 6")
            if(model.promptVar >= 1 && model.promptVar <= 6)
            {
                correct = 1 
                for(let i=0; i<model.promptVar; i++)
                {   
                    model.shipsP1.push({location: [], hits: [], shipType: i+1})
                    model.shipsP2.push({location: [], hits: [], shipType: i+1})
                }
                model.playerShips = model.shipsP1
                model.playerMisses = model.missesP1
            }
        } while(correct == 0)
    },

    changeTurn: function ()
    {
        if(model.player == 1)
        {
            model.player = 0
            model.shipsP2 = model.playerShips
            model.playerShips = model.shipsP1
            model.missesP2 = model.playerMisses
            model.playerMisses = model.missesP1
        }
        else
        {
            model.player = 1
            model.shipsP1 = model.playerShips
            model.playerShips = model.shipsP2
            model.missesP1 = model.playerMisses
            model.playerMisses = model.missesP2
        }
    },

    updateLocation: function()
    {
        if(model.placementCounter == 1)
        {
            model.playerShips[model.placementCounter-1].location.push(model.boxClicked)
            console.log(model.playerShips)
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

            for(let i=0; i<model.placementCounter; i++)
            {
                if(model.checkBounds() && model.checkOverlap())
                {
                    model.playerShips[model.placementCounter-1].location.push(model.boxClicked)
                    console.log(model.playerShips)
                    model.pushedItems += 1
                    model.boxClicked = model.boxClicked+tempVar
                }
                else
                {
                    alert("The ship you just tried to place is out of bounds or overlapping with and existing ship, please try again")
                    model.playerShips[model.placementCounter-1].location = []
                    model.pushedItems = 0
                    return false
                }  
            }
            return true

        }
    },

    checkBounds: function()
    {
        if(model.boxClicked < 0 || model.boxClicked > 89)
        {
            return false
        }
        else
        {   
            if(view.userOrientSelected == 0)
            {
                var tempVar = model.boxClicked < 10
            }
            else if(view.userOrientSelected == 1)
            {
                var tempVar = model.boxClicked % 10 == 9
            }
            else if(view.userOrientSelected == 2)
            {
                var tempVar = model.boxClicked > 80
            }
            else
            {
                var tempVar = model.boxClicked % 10 == 0
            }

            if(tempVar)
            {   
                if(model.pushedItems == model.placementCounter-1)
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
        for(let i=0; i<model.promptVar; i++)
        {
            for(let j =0; j<model.promptVar; j++)
            {
                if(model.playerShips[i].location[j] == model.boxClicked)
                {
                    return false
                }
            }
        }
        return true
    },

    gamePhase: function()
    {
        model.changeTurn()
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

    fire: function ()
    {
        if(model.shipType!=-1 && model.checkHitAlready())
        {
            model.playerShips[model.shipType-1].hits.push(model.boxClickedRight)
            model.firstGamePhase = 2
            model.error = 0
        }
        else if(model.shipType != -1)
        {
            alert("You have already hit this location")
            model.firstGamePhase = 1
            model.gameState = 2
            model.error = 1
        }
        else if(model.checkMissAlready())
        {
            //miss
            model.playerMisses.push(model.boxClickedRight)
            model.missCount +=1
            model.firstGamePhase = 2
            model.error = 0
        }
        else
        {
            alert("You have already missed at this location")
            model.firstGamePhase = 1
            model.gameState = 2
            model.error = 1
        }
        model.shipType = -1
    },

    checkHitAlready: function ()
    {
        for(let i = 0; i<model.promptVar; i++)
        {
            for(let j = 0; j< model.promptVar; j++)
            {
                if(model.playerShips[i].hits[j] == model.boxClickedRight)
                {
                    return false
                }
            }
        }
        return true
    },

    checkMissAlready: function ()
    {
        for(let i=0; i < model.missCount; i++)
        {
            if(model.playerMisses[i] == model.boxClickedRight)
            {
                return false
            }
        }
        return true
    },

    extractShipType: function ()
    {
        for(let i = 0; i<model.promptVar; i++)
        {
            for(let j = 0; j< model.promptVar; j++)
            {
                if(model.playerShips[i].location[j]+100 == model.boxClickedRight)
                {
                    model.shipType =  i+1
                    return
                }
                else
                {
                    model.shipType = -1
                }
            }
        }
    },

    checkWinner: function()
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
                        model.winnerCount += 1
                    }  
                }
            }
            view.sunkCount = 0
            view.sunkArr = []
        }
        model.changeTurn()
        if(model.winnerCount == model.promptVar)
        {
            model.winner = model.player
            return true
        }
        model.winnerCount = 0
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
                        if(view.sunkCount == i+1)
                        {
                            model.winnerCount += 1
                        }  
                    }  
                }
            }
            view.sunkCount = 0
            view.sunkArr = []
        }
        model.changeTurn()
        if(model.winnerCount == model.promptVar)
        {
            model.winner = model.player
            return true
        }
        model.winnerCount = 0
        return false
    }

}