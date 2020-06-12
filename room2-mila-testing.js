let answer
let allPossibleDirections = ['north', 'south', 'east', 'west']
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
    escape() {
        console.log("You have escaped")
        process.exit()
    }
}

let blue_box = {
    opened: 'false',
    location: ['room1', 'north'],                  // !! How do I make an if statement to check if the box is opened or not within the object?
    describe() {
        console.log("It's a strange, blue box...")
    },
    open() {
        player.inv.push('red key')
        this.open = 'true'
    }

}


let room1 = {
    inventory: [
        'cabinet',
        'writingDesk',
        'paper'
    ],
    north_description: "There is a metal door with a keypad. A note on the side that says \'I hope you are familiar with Half-Life...\' ",
    south_description: "There is a wooden chest that is boarded up with not only a metal lock keeping it shut tight but wooden planks nailed into preventing access...",    // Player must remove planks first and THEN unlock the lock to get the note for the keypad
    east_description: "You see a writing desk against the east wall with a note written on top of it and a drawer slightly open",                                           // We want the player to open this box at any time to get the crowbar
    west_description: "There's a closed, cardboard box with a tear on the top",
}

// Let room2 = {
//     inventory: [
//         'shelf',
//         'table',
//         'chair,
//         'paper'
//         'door'
//     ],
//     north_description: "There is a wooden door that takes you to the next room but it's locked. You need to find a key.",
//     south_description: "There is a lonely chair against the south wall",   
//     east_description: "You see a fancy table on the east wall with a note written on top of it",                                      
//     west_description: "There's a wooden bookshelf and a bunch of books on it.",
// }

// Player can only take the key if the chair is in his inventory
// let shelf = {
// name: "Wooden Bookshelf",
// desc: "Could I be hiding something?",
// inventory: ["keyOne"],
// takekey() { 
// if (player.inventory.includes('thisChair')) {
//     let keyOne = this.inventory.pop()
//     player.inventory.push(keyOne)
// } else {
//     return console.log("You can't examine the Wooden Bookshelf yet")
// }
// }
// }

// let table = {
// name: "Fancy Table",
// desc: "You see a note on the fancy table. Could it be a clue?"
// }

// let chair = {
// name: "Lonely Chair",
// desc: "You can use this chair to reach the books on the wooden bookshelf",
// takeChair() {
//     let thisChair = player.inventory.push(thisChair)
//     return console.log('Nice job! Now use this chair to reach the books on the wooden bookshelf') // we can use this function when the player use or take chair
// }
// }

// let note = {
// name: "Note",
// desc: "If you read me, you might find out how to unlock the room",
// readNote() {
//     return console.log("You will find the key to unlock the room hidden in one of the books on the wooden bookshelf. You will need to use the chair to reach it.")
// }

// let doorOne = {
//     name: "Door",
//     desc: "This door takes you to the next room, but you must find the key to unlock it first",
//     unlockDoor() {
//         if (player.inventory.includes('keyOne')) {
//             return console.log("Congratulations! You have unlocked the door. You must continue to the next room now!")
//         } else {
//             return console.log("You don't have the key to unlock this door")
//         }
//     }
// }
// }

async function move(playerCurrentDirection) {
    let playerPossibleDirections = allPossibleDirections.filter(direction => direction !== playerCurrentDirection) // Make array of locations player can go other than current location                                                        
    console.log(playerPossibleDirections)
    let moveChoice = await ask("Choose where to go... ")
    if (!playerPossibleDirections.includes(moveChoice)) {
        console.log("Not a possible location to move!")
        move(playerCurrentDirection)
    } else {
        switch (moveChoice) {
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
                console.log("Unexpected input, please try again")
                move(playerCurrentDirection)
                break
        }
    }


}

async function play() {
    console.log("Activated")
    switch (player.current_room) {
        case 'room1':
            switch (player.current_facing) {                           // Where is the player facing in room 1?
                case 'north':
                    console.log(room1.north_description)
                    answer = await ask("Enter action ")              // What is the player going to do in room 1 while facing this direction?
                    switch (answer) {
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
                    switch (answer) {
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