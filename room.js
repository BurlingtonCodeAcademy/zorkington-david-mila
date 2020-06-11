let answer
let allPossibleLocations = ['north', 'south', 'east', 'west']
const readline = require('readline')
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(questionText) {
    return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, resolve);
    });
  };

let player = {
    inv: [],
    health: 100,
    current_room: 'room1',
    current_facing: 'north',
    escape(){
        console.log("You have escaped")
        process.exit()
    }
}

let blue_box = {
    opened: 'false',
    location: ['room1', 'north'],                  // !! How do I make an if statement to check if the box is opened or not within the object?
    describe(){
        console.log("It's a strange, blue box...")
    },
    open(){
        player.inv.push('red key')
        this.open = 'true'
    }

}



let room1 = {
    inventory: [
        cabinet,
        writingDesk,
        paper
      ],
      north_description: "There is a metal door with a keypad. A note on the side that says \'I hope you are familiar with Half-Life...\' ",
      south_description: "There is a wooden chest that is boarded up with not only a metal lock keeping it shut tight but wooden planks nailed into preventing access...",    // Player must remove planks first and THEN unlock the lock to get the note for the keypad
      east_description: "You see a writing desk against the east wall with a note written on top of it and a drawer slightly open",                                           // We want the player to open this box at any time to get the crowbar
      west_description: "There's a closed, cardboard box with a tear on the top",
}

async function move(playerCurrentDirection){
    let playerPossibleDirections = allPossibleDirections.filter(function(direction){
        direction != playerPossibleDirections
    }) // Make array of locations player can go other than current location                                                        
    console.log(playerPossibleLocs)
    answer = await("Choose where to go...")
    // if(answer != valid locations ){
    //     return error
    // }
    
    switch(answer){
        case 'north':
            player.current_facing = 'north'  // Add logic to make sure each of these inputs are valid (you're not trying to go to the same locaation you're already at)
            play()
            break
        
        case 'south':
            player.current_facing = 'south'
            play()
            break

        case 'west':

        default: 
            console.log("Unexpected input, please try again")
            move(playerCurrentDirection)
            break
    }
}

async function play(){
    switch(player.current_room){
        case 'room1':
            switch(player.current_facing){                           // Where is the player facing in room 1?
                case 'north':           
                    console.log(room1.north_description)
                    answer = await ask("Enter action")              // What is the player going to do in room 1 while facing this direction?
                    switch(answer){
                        case 'use keypad':
                            console.log("If you say so...")
                            process.exit()
                            break
                        
                        case 'examine':
                            blue_box.describe()
                            play()
                            break

                        // case 'go south':
                        //     console.log("You head south!")
                        //     player.current_facing = 'south'
                        //     play()
                        //     break
                        
                        case 'secret room':                         // Test visting room 2
                            player.current_room = 'room2'
                            play()
                            break    
                        
                        case 'move':
                            move()
                            break

                        default:
                            console.log("Unexpected answer!")
                            play()
                            break

                    }                
                case 'south':
                    console.log(room1.south_description)
            }
            break
            
        
        
        case 'room2':                                                  // Starting logic for room 2
            console.log("This is a test for room2")
            break
        
        case 'room3':
            console.log("Test")
            break

        default:
            console.log("You weren't supposed to be here")
            process.exit()    
            
    
    }

}
play()