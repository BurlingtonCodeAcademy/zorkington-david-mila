let answer
let allPossibleDirections = ['north', 'south', 'east', 'west']
const readline = require('readline');
const { userInfo } = require('os');
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(questionText) {
    return new Promise((resolve, reject) => {
      readlineInterface.question(questionText, resolve);
    });
  };

function examine(object){
    if(object.current_room === player.current_room && object.current_facing === player.current_facing){
        console.log(`Object found... attempting to describe... ${object.desc}`)
    }
}


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


let box_key = {
    opened: false,
    current_room: 'room1',
    current_facing: 'east',
    visible: true,                                    
    takeable: false,              // The key will only be takeable when it is visible and the chest in front of it has been opened
    useable: true, 
}

let boarded_box = {
    opened: false,
    current_room: 'room1',
    current_facing: 'south',
    visible: true,
    takeable: false,
    useable: false,
    desc: "It's a box with planks nailed into it preventing access... On top of this, there's a metal lock around the chest with a keyhole."
}


let cardboard_box = {                                 
    opened: false,
    current_room: 'room1',
    current_facing: 'west',
    visible: true,                                    
    takeable: false,
    useable: true,                  
    desc: "It's a cardboard box that appears to be slightly open... On the side there's a strange, three-pronged symbol.",
    open(){
        if(this.opened === false){
            this.opened = 'true'
            this.desc = "The box is now open and empty"
            console.log("\nYou found a crowbar! Current inventory: ")
            player.inv.push('crowbar')
            console.log(player.inv)
            room1.west_description = "\nThere is an opened cardboard box in the west side now..."
            
        } else {
            console.log("\nIt's already open!")        // To make the output look cleaner I want to put new line breaks 
        }
        
    },
    take(){
        console.log("\nYou can't take this! ")
    },

}



let room1 = {
    inventory: [
        'cabinet',
        'writingDesk',
        'paper'
      ],
     
      north_description: "\nThere is a metal door with a keypad. A note on the side that says \'I hope you are familiar with Half-Life...\' ",
      south_description: "\nThere is a wooden chest that is boarded up with not only a metal lock keeping it shut tight but wooden planks nailed into preventing access...",    // Player must remove planks first and THEN unlock the lock to get the note for the keypad
      east_description: "\nYou see a writing desk against the east wall with a note written on top of it and a drawer slightly open",                                           // We want the player to open this box at any time to get the crowbar
      west_description: "\nThere's a closed, cardboard box with a tear on the top",
}

async function move(playerCurrentDirection){
    let playerPossibleDirections = allPossibleDirections.filter(direction => direction !== playerCurrentDirection) // Make array of locations player can go other than current location                                                        
    console.log(playerPossibleDirections)
    let moveChoice = await ask("Choose where to go... ")  

    if(!playerPossibleDirections.includes(moveChoice)){
        console.log("\nNot a possible location to move!")
        move(playerCurrentDirection)
    } else {
        switch(moveChoice){
            case 'north':
                player.current_facing = 'north'  // Add logic to make sure each of these inputs are valid (you're not trying to go to the same locaation you're already at)
                console.log("You have chosen north")
                play()
                break
            
            case 'south':
                player.current_facing = 'south'
                console.log("You have chosen south")
                play()
                break
    
            case 'west':
                console.log("You have chosen west")
                player.current_facing = 'west'
                play()
                break
    
            case 'east':
                player.current_facing = 'east'
                play()
                break
    
            default: 
                console.log("\nUnexpected input, please try again")
                move(playerCurrentDirection)
                break
        }
    }
    
    
}

async function play(){
    switch(player.current_room){
        case 'room1':
            switch(player.current_facing){                           // Where is the player facing in room 1?
                case 'north':           
                    console.log(room1.north_description)
                    answer = await ask("Enter action ")              // What is the player going to do in room 1 while facing this direction?
                    switch(answer){
                        case 'use keypad':
                            console.log("If you say so...")
                            play()
                            break
                        
                        case 'examine':                   // !!! How do we examine objects around us? New function?
                            play()
                            break
                        
                        case 'secret room':                         // Test visting room 2
                            player.current_room = 'room2'
                            play()
                            break    
                        
                        case 'move':
                            move(player.current_facing)
                            break

                        default:
                            console.log("Unexpected answer!")
                            play()
                            break

                    } 
                    break // This break is for individual parts of the rooms       
                case 'south':
                    console.log(room1.south_description)
                    answer = await ask("Enter action ")
                    switch(answer){
                        case 'use keypad':
                            console.log("If you say so...")
                            process.exit()
                            break
                        
                        case ('examine box' || 'examine chest' || 'examine treasure chest'):
                            console.log(boarded_box.desc)
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
                            move(player.current_facing)
                            break

                        default:
                            console.log("\nUnexpected answer!")
                            play()
                            break
                        }
                        break
                
                case 'east':
                    console.log(room1.east_description)      // Room with the drawer
                    answer = await ask("Enter action ")
                    switch(answer){
                        case ('open drawer' || 'grab drawer'):
                            console.log()
                        
                        case ('examine drawer' || 'look at drawer' || 'observe drawer'):
                            writingDesk.describe()
                            play()
                            break
                        
                        case 'secret room':                         // Test visting room 2
                            player.current_room = 'room2'
                            play()
                            break    
                        
                        case 'move':
                            move(player.current_facing)
                            break

                        default:
                            console.log("Unexpected answer!")
                            play()
                            break
                        }
                        
                    break
                
                    case 'west':
                        console.log(room1.west_description)
                        answer = await ask("Enter action ")
                        switch(answer){
                            case ('examine box' || 'examine cardboard box'):
                                examine(cardboard_box)
                                play()
                                break
                            
                            case ('open box' || 'open cardboard box'):                         
                                cardboard_box.open()
                                play()
                                break    
                            
                            case ('take box' || 'take cardboard box'):
                                cardboard_box.take()
                                break

                            case 'move':
                                move(player.current_facing)
                                break
    
                            default:
                                console.log("Unexpected answer!")
                                play()
                                break
                            }
                        break
                            

                               
            }
            break // This break is for the various rooms
            
        
        
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
