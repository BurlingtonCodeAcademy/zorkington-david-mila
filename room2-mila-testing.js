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

function examine(object) {
    if (object.current_room === player.current_room && object.current_facing === player.current_facing) {
        console.log(`Object found... attempting to describe... ${object.desc}`)
    }
}

//player object
let player = {
    inv: [],
    health: 100,
    current_room: 'room1',
    current_facing: 'north',
    escape() {
        console.log("You have escaped")
        process.exit()
    },
    unlock(codeRoomThree) {
        if (code === '12345') {
            console.log('Congrats! You can continue to the next room!')
            return true;
        } else {
            console.log('Wrong code! Try again!')
            return false;
        }
    },
    unlock(codeRoomFive) {
        if (code === '145454') {
            console.log('Congrats! You have escaped!!!')
            return true;
        } else {
            console.log('Wrong code! Try again!')
            return false;
        }
    }
}

//objects in room one
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
    open() {
        if (this.opened === false) {
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
    take() {
        console.log("\nYou can't take this! ")
    },

}

//objects in room two
let shelf = {
    name: "Wooden Bookshelf",
    desc: "Could I be hiding something?",
    current_room: 'room2',
    current_facing: 'west',
    inv: ["key"],
    takekey() {
        if (player.inv.includes('chairTwo')) {
            let key = this.inv.pop()
            player.inv.push(key)
        } else {
            return console.log("You can't examine the Wooden Bookshelf yet")
        }
    }
}

let table = {
    name: "Fancy Table",
    desc: "You see a note on the fancy table. Could it be a clue?",
    current_room: 'room2',
    current_facing: 'east',
}

let chair = {
    name: "Lonely Chair",
    desc: "You can use this chair to reach the books on the wooden bookshelf",
    current_room: 'room2',
    current_facing: 'south',
    inv: [chairTwo],
    takeChair() {
        let chairTwo = this.inv.pop()
        player.inv.push(chairTwo)
        return console.log('Nice job! Now use this chair to reach the books on the wooden bookshelf') // we can use this function when the player use or take chair
    }
}

let note = {
    name: "Note",
    desc: "If you read me, you might find out how to unlock the room",
    current_room: 'room2',
    current_facing: 'east',
    readNote() {
        return console.log("You will find the key to unlock the room hidden in one of the books on the wooden bookshelf. You will need to use the chair to reach it.")
    }
}

let doorTwo = {
    name: "Door",
    desc: "This door takes you to the next room, but you must find the key to unlock it first",
    current_room: 'room2',
    current_facing: 'north',
    unlockDoor() {
        if (player.inv.includes('key')) {
            return console.log("Congratulations! You have unlocked the door. You must continue to the next room now!")
        } else {
            return console.log("You don't have the key to unlock this door")
        }
    }
}

//objects in room three
let hay = {
    name: "Hayloft",
    desc: "I am sorry but the hayloft is out of reach!",
    current_room: 'room3',
    current_facing: 'east',
    inv: ["horseshoe"],
    reachHay() {
        if (player.inv.includes('ladder')) {
            return console.log("You have reached the hayloft and now you see a horseshoe. It must be another clue!")
        } else {
            return console.log("You need to reach the hayloft first!")
        }
    },
    takeHorseshoe() {
        let horseshoe = this.inv.pop()
        player.inv.push(horseshoe)
        return console.log("The numbers 12345 are inscribed on the horseshoe")
    }
}

let ladderThree = {
    name: "Wooden Ladder",
    desc: "Could this ladder help you somehow? You might have to look around to find out",
    current_room: 'room3',
    current_facing: 'west',
    inv: ["ladder"],
    takeladderThree() {
        let ladder = this.inv.pop()
        player.inv.push(ladder)
        return console.log("Great job! You are one step closer now!")
    }
}

let paper = {
    name: "Piece of Paper",
    desc: "Look inside the wagon to get your first clue!",
    current_room: 'room3',
    current_facing: 'south'
}

let wagon = {
    name: "Old Wagon",
    desc: "A very old wagon on the south end of the room",
    current_room: 'room3',
    current_facing: 'south',
    lookinside() {
        return consloge.log("There is an inscription that says: You should start up above. If you look around, you 'll find a way to get there")
    }
}

let doorThree = {
    name: "Double Dutch Doors",
    desc: "These doors take you to the next room. There is a keypad on the handle, but it is locked",
    current_room: 'room3',
    current_facing: 'north',
    unlockDoorThree() {
        if (player.inv.includes('horseshoe')) {
            let codeRoomThree = await ask("Please enter the code...")
            let win = player.unlock(codeRoomThree)
            return win // check this return function!!!
        } else {
            return console.log("You don't know how to unlock this door")
        }
    }
}

//objects in room four
let message = {
    name: "Written Message",
    desc: "The secret to escape this room is in the wooden box, but you need to find something to open it with",
    current_room: 'room4',
    current_facing: 'south'
}

let big_box = {
    name: "Big Box",
    desc: "The box is slightly open... What could this be?",
    current_room: 'room4',
    current_facing: 'east',
    inv: ['hammer'],
    lookinside() {
        return consloge.log("There is hammer inside the big box... Could it be useful?")
    },
    takeHammer() {
        let hammer = this.inv.pop()
        player.inv.push(hammer)
        return console.log("Nice job! This hammer can help you open the wooden box")
    }
}

let wooden_box = {
    name: "Wooden Box",
    desc: "The box is sealed. You need a tool to open it",
    current_room: 'room4',
    current_facing: 'west',
    inv: ['keyFour'],
    openBox() {
        if (player.inv.includes('hammer')) {
            let keyFour = this.inv.pop()
            player.inv.push(keyFour)
            return console.log("You have opened the wooden box and found the key to unlock the metal door!")
        } else {
            return console.log("You need a tool to open this box first!")
        }
    }
}

let doorFour = {
    name: "Metal Door",
    desc: "This door takes you to the next room, but you must find the key to unlock it first",
    current_room: 'room4',
    current_facing: 'north',
    unlockDoor() {
        if (player.inv.includes('keyFour')) {
            return console.log("Congratulations! You have unlocked the door. You must continue to the next room now!")
        } else {
            return console.log("You don't have the key to unlock this door")
        }
    }
}
//objects in room five



//rooms
let room1 = {
    inv: [
        'cabinet',
        'writingDesk',
        'paper'
    ],

    north_description: "\nThere is a metal door with a keypad. A note on the side that says \'I hope you are familiar with Half-Life...\' ",
    south_description: "\nThere is a wooden chest that is boarded up with not only a metal lock keeping it shut tight but wooden planks nailed into preventing access...",    // Player must remove planks first and THEN unlock the lock to get the note for the keypad
    east_description: "\nYou see a writing desk against the east wall with a note written on top of it and a drawer slightly open",                                           // We want the player to open this box at any time to get the crowbar
    west_description: "\nThere's a closed, cardboard box with a tear on the top",
}

//console.log('This is a nice looking office, but... I am locked!')
let room2 = {
    inv: [
        'shelf',
        'table',
        'chair',
        'note',
        'doorTwo'
    ],
    north_description: "There is a wooden door that takes you to the next room but it's locked. You need to find a key.",
    south_description: "There is a lonely chair against the south wall",
    east_description: "You see a fancy table on the east wall with a note written on top of it",
    west_description: "There's a wooden bookshelf and a bunch of books on it.",
}

//console.log('Now you find yourself in a barn... this should be fun!')
let room3 = {
    inv: [
        'hay',
        'ladderThree',
        'wagon',
        'paper',
        'doorThree'
    ],
    north_description: "There are double dutch doors. There is a keypad on the handle, but it is locked.",
    south_description: "There is a old wagon that doesn't seem to be in use anymore. There is a piece of paper next to it.",
    east_description: "You see a hayloft but no way to get there",
    west_description: "There's a wooden ladder against the wall."
}

//console.log('This room looks like a creepy wharehouse... What kind of place is this?!!')
let room4 = {
    inv: [
        'message',
        'wooden_box',
        'big_box',
        'doorFour'
    ],
    north_description: "There is a huge metal door on the north wall that takes you to the next room. The door is locked",
    south_description: "Somebody left a written message for you on the south wall",
    east_description: "There is a big box against the east wall. The box is slightly open",
    west_description: "You see a closed wooden box. It has nails and you have no way to open it...yet",
}

//console.log(You are now only a few steps away from escaping! You just need to find the way to escape this ... circus?) 
let boxMessage = {
    name: "Message on Orange Box",
    desc: "The message on the orange box can help you escape",
    current_room: 'room5',
    current_facing: 'south',
    readMessage() {
        return console.log("Only Douglas can help you escape this room! If your are nice to him, he might tell you his secret. P.S: He loves carrots. You might find what you need in this box...")
    }
}

let OrangeBox = {
    name: "Orange Box",
    desc: "What will yo find inside the box?",
    current_room: 'room5',
    current_facing: 'south',
    inv: ["carrots"],
    openOrangeBox() {
        return console.log("Douglas would love some carrots!")
    },
    takeCarrots() {
        let carrots = this.inv.pop()
        player.inv.push(carrots)
        return console.log("Nice job! Douglas might tell you his secret in exchange for some carrots!")
    }
}

let douglas = {
    name: "Douglas the Elephant",
    desc: "What a nice and gentle guy he is... he might even share a secret with you!",
    current_room: 'room5',
    current_facing: 'south',
    feedDouglas() {
        if (player.inv.includes('carrots')) {
            return console.log("Thank you my dear friend! carrots are my favorite thing in the world! Now... if you want to escape this strange room, you need to take the red paper hanging from Arthur's neck. He is not always in a very good mood and if I were you, I would try to give him a treat too! By the way... he loves butter!")
        } else {
            return console.log("Douglas would like some treats indeed, but you need to find them first!")
        }
    }
}

let butter = {
    name: "Bucket of Butter",
    desc: "A bucket full of butter on the west side of the room",
    current_room: 'room5',
    current_facing: 'west',
    takeButter() {
        if (player.inv.includes('carrots')) {
            return console.log("Let's hope that you can distract Arthur with his fvorite trick and take the red paper hanging from his neck")
        } else {
            return console.log("Why are you taking the butter? You don't know what to do with it")
        }
    }
}

let arthur = {
    name: "Arthur The Lion",
    desc: "Arthur is usually grumpy and not very frindly",
    current_room: 'room5',
    current_facing: 'east',
    inv: [red_paper],
    feedArthur() {
        if (player.inv.includes('butter')) {
            let redPaper = this.inv.pop()
            player.inv.push(redPaper)
            return console.log("Thank you my friend! I forget about the world when I eat butter")
        } else {
            return console.log("You better stay away from me... I am hungry and in a terrible mood!")
        }
    },
    takeRedPaper() {
        if (player.inv.includes('butter')) {

            return console.log("You are closer than ever... The red paper says: 454545")
        } else {
            return console.log("You better stay away from me... I am hungry and in a terrible mood!")
        }
    }
}

let doorFive = {
    name: "Rusty Door",
    desc: "These doors take you to the outside world! There is a keypad on the handle, but it is locked",
    current_room: 'room5',
    current_facing: 'north',
    unlockDoorFive() {
        if (player.inv.includes('redPaper')) {
            let codeRoomFive = await ask("Please enter the code...")
            let win = player.unlock(codeRoomFive)
            return win // check this return function!!!
        } else {
            return console.log("You don't know how to unlock this door")
        }
    }
}

let room5 = {
    inv: [
        'Douglas',
        'Arthur',
        'butter',
        'orange_box',
        'boxMessage',
        'doorFive'
    ],
    north_description: "There is a rusty door on the north side of the tent. There is a keypad on the handle, but it is locked.",
    south_description: "There is an elephant on the south side of the tent, his name is Douglas. Not too far from him, you'll see an orange box with a written message on it... The box is slightly open.",
    east_description: "There is a lion on the east side of the tent, his name is Arthur. Wait a minute... is that a red piece of paper hanging from his neck",
    west_description: "There's a bucket full of butter on the west side of the tent."
}

async function move(playerCurrentDirection) {
    let playerPossibleDirections = allPossibleDirections.filter(direction => direction !== playerCurrentDirection) // Make array of locations player can go other than current location                                                        
    console.log(playerPossibleDirections)
    let moveChoice = await ask("Choose where to go... ")

    if (!playerPossibleDirections.includes(moveChoice)) {
        console.log("\nNot a possible location to move!")
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
                console.log("\nUnexpected input, please try again")
                move(playerCurrentDirection)
                break
        }
    }


}

async function play() {
    switch (player.current_room) {
        case 'room1':
            switch (player.current_facing) {                           // Where is the player facing in room 1?
                case 'north':
                    console.log(room1.north_description)
                    answer = await ask("Enter action ")              // What is the player going to do in room 1 while facing this direction?
                    switch (answer) {
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
                    switch (answer) {
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
                    switch (answer) {
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
                    switch (answer) {
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