const view = 
{
    locationString: ['A','B','C','D','E','F','G','H','I','J'],

    clickedBoxes: [],

    placementCounter: 0,

    gameState: 0,

    orientSelected: 0,

    promptVar: 0,

    player: 0,

    renderBoard: function()
    {
        let board = document.querySelectorAll(".board")
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
            temp.addEventListener('click', this.change)
            temp2.addEventListener('click', this.change)
            board[0].appendChild(temp)
            board[1].appendChild(temp2)
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
        
        view.pieceSetting()
    },

    change: function()
    {
        if(view.gameState == 1)
        {
            if(this.getAttribute('data-id') < 100)
            {
                let orientationDisplay = document.createElement("h2")
                let temp = this.getAttribute('data-id')
                console.log(view.clickedBoxes)
                view.clickedBoxes.push(temp)
                displayOrientation()
            }
            else
            {
                alert("Hey click on the correct board please")
            }
        }
    },

    pieceSetting: function()
    {
        let button = document.createElement("button")
        button.innerText = "Click here to start placing pieces"
        button.addEventListener('click', () =>
        {
            //runs the prompt
            view.runPrompt()
            if(view.player == 0)
            {
                console.log("Player 1 is placing pieces", view.player)

                //Setting the game state to the correct value
                view.gameState = 1

                //Removing the title and button
                document.querySelector(".Title").remove()
                button.remove()

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
                    if(promptVar > 1 && orientSelected == 1)
                    {
                        document.querySelector("h4").remove()
                        let shipNum = document.createElement("h4")
                        shipNum.innerText = "Please place your 2 length ship"
                    }
                    else if(promptVar > 1)
                    {

                    }
                    else
                    {
                        //game phase
                    }
                })

                
                document.querySelector("body").appendChild(instruct)
                document.querySelector("body").appendChild(subButton)
                document.querySelector("body").appendChild(shipNum)
            }
        })
        document.querySelector("body").appendChild(button)
            
        
    },

    //Displays the orientation text and contains the click event for the orientation
    displayOrientation: function()
    {
        if(view.placementCounter == 1) 
        {
            let temp = document.querySelector(".oreintContainer")
            temp.innerText = "There is no specific orientation, please click this prompt and hit submit"
            temp.addEventListener('click', ()=>
            {
                view.orientSelected = 1
            })
            document.querySelector("body").appendChild(temp)
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
    }


}