const view = 
{
    body: document.querySelector("body"),

    boards: document.querySelectorAll(".board"),

    locationString: ['A','B','C','D','E','F','G','H','I','J'],

    boxClicked: -1,

    placementCounter: 0,

    gameState: 0,

    orientSelected: 0,

    promptVar: 0,

    player: 0,

    orientArr: ['N', 'E', 'S', 'W'],

    //needs work
    runGame: function()
    {
        let quit = 1
        view.renderBoard()
        if(quit == 0)
        {
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
                view.boxClicked = temp
                view.clearLeftBoard()
                view.boards[0].querySelector('[data-id] = ${view.boxClicked}').setAttribute('src', 'images/boat.png')
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
                temp.setAttribute('data-id', i)
                temp.setAttribute('class', view.orientArr[i])
                temp.addEventListener('click', ()=>
                {
                    view.orientSelected = 1
                    if(this.getAttribute("data-id") == 0)
                    {
                        //Code for north placement
                    }
                    else if(this.getAttribute("data-id") == 1)
                    {
                        //Code for east placement
                    }
                    else if(this.getAttribute("data-id") == 2)
                    {   
                        //Code for south placement
                    }
                    else(this.getAttribute("data-id") == 3)
                    {
                        //Code for west placement
                    }
                    //add code that displays pieces and updates the array to store information based on the player
                })
                document.querySelector(".orientContainer").appendChild(temp)
            }
        }
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
            }
        } while(correct == 0)
    },

    turnOne: function()
    {
        console.log("Player 1 is placing pieces", view.player)

                //Setting the game state to the correct value
                view.gameState = 1

                //Removing the title and button
                document.querySelector(".Title").remove()
                view.body.querySelector("button").remove()

                //Creating a h3 tag to display instructions for the piece placement event
                let instruct = document.createElement("h3")
                instruct.innerText = "Turn away form your opponent, then place pieces by clicking on the spot you want the ship to start in. After that the orientation will be displayed, then click on the orientation you would prefer, and then hit the submit button"
                
                //Creating a h4 tag to display instructions for 1 length ship
                let shipNum = document.createElement("h4")
                shipNum.innerText = "Please place your 1 length ship"

                //Creating a button to indicate when the 1 length ship has been placed
                let subButton = document.createElement("button")
                subButton.innerText = "Submit"

                //Showing what ship you are placing
                view.placementCounter = 1

                subButton.addEventListener('click', () => 
                {
                    if(view.promptVar > 1 && view.orientSelected == 1)
                    {
                        view.orientSelected = 0
                        view.boxClicked = -1
                        view.clearOrientation()
                        document.querySelector("h4").remove()
                        view.otherTurns(2)
                    }
                    else if(promptVar > 1)
                    {
                        alert("Please select an orientation")
                        view.turnOne()
                    }
                    else
                    {
                        //game phase
                    }
                })
                view.body.appendChild(instruct)
                view.body.appendChild(subButton)
                view.body.appendChild(shipNum)
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

        subButton.addEventListener('click', () => 
        {
            if(view.promptVar > turn && view.orientSelected == 1)
            {
                view.orientSelected = 0
                view.boxClicked = -1
                view.clearOrientation()
                document.querySelector("h4").remove()
                view.otherTurns(turn+1)
            }
            else if(view.promptVar > turn)
            {
                alert("Please select an orientation")
                view.otherTurns(turn)
            }
            else
            {
                //game phase
            }
        })
        view.body.appendChild(subButton)
        view.body.appendChild(shipNum)
    },

    gamePhase: function()
    {
        //game phase code
    }
}