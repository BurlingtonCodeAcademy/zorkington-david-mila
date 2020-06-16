// let answer
// let allPossibleDirections = ['north', 'south', 'east', 'west']
// const readline = require('readline');
// const { userInfo } = require('os');
// const readlineInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// function ask(questionText) {
//     return new Promise((resolve, reject) => {
//         readlineInterface.question(questionText, resolve);
//     });
// };

// function examine(object) {
//     if (object.current_room === player.current_room && object.current_facing === player.current_facing) {
//         console.log(`Object found... attempting to describe... ${object.desc}`)
//     }
// }

// //player object
// let player = {
//     inv: [],
//     health: 100,
//     current_room: 'room1',
//     current_facing: 'north',
//     escape() {
//         console.log("You have escaped")
//         process.exit()
//     },
//     unlock(codeRoomThree) {
//         if (code === '12345') {
//             console.log('Congrats! You can continue to the next room!')
//             return true;
//         } else {
//             console.log('Wrong code! Try again!')
//             return false;
//         }
//     },
//     unlock(codeRoomFive) {
//         if (code === '145454') {
//             console.log('Congrats! You have escaped!!!')
//             return true;
//         } else {
//             console.log('Wrong code! Try again!')
//             return false;
//         }
//     }
// }

// //objects in room one
// let box_key = {
//     opened: false,
//     current_room: 'room1',
//     current_facing: 'east',
//     visible: true,
//     takeable: false,              // The key will only be takeable when it is visible and the chest in front of it has been opened
//     useable: true,
// }

// let boarded_box = {
//     opened: false,
//     current_room: 'room1',
//     current_facing: 'south',
//     visible: true,
//     takeable: false,
//     useable: false,
//     desc: "It's a box with planks nailed into it preventing access... On top of this, there's a metal lock around the chest with a keyhole."
// }


// let cardboard_box = {
//     opened: false,
//     current_room: 'room1',
//     current_facing: 'west',
//     visible: true,
//     takeable: false,
//     useable: true,
//     desc: "It's a cardboard box that appears to be slightly open... On the side there's a strange, three-pronged symbol.",
//     open() {
//         if (this.opened === false) {
//             this.opened = 'true'
//             this.desc = "The box is now open and empty"
//             console.log("\nYou found a crowbar! Current inventory: ")
//             player.inv.push('crowbar')
//             console.log(player.inv)
//             room1.west_description = "\nThere is an opened cardboard box in the west side now..."

//         } else {
//             console.log("\nIt's already open!")        // To make the output look cleaner I want to put new line breaks 
//         }

//     },
//     take() {
//         console.log("\nYou can't take this! ")
//     },

// }

// //objects in room two
// let shelf = {
//     name: "Wooden Bookshelf",
//     desc: "Could I be hiding something?",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room2',
//     current_facing: 'west',
//     inv: ["key"],
//     takekey() {
//         if (player.inv.includes('chairTwo')) {
//             let key = this.inv.pop()
//             player.inv.push(key)
//         } else {
//             return console.log("You can't examine the Wooden Bookshelf yet")
//         }
//     }
// }

// let table = {
//     name: "Fancy Table",
//     desc: "You see a note on the fancy table. Could it be a clue?",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room2',
//     current_facing: 'east',
// }

// let chair = {
//     name: "Lonely Chair",
//     desc: "You can use this chair to reach the books on the wooden bookshelf",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: true,
//     current_room: 'room2',
//     current_facing: 'south',
//     inv: [chairTwo],
//     takeChair() {
//         let chairTwo = this.inv.pop()
//         player.inv.push(chairTwo)
//         return console.log('Nice job! Now use this chair to reach the books on the wooden bookshelf') // we can use this function when the player use or take chair
//     }
// }

// let note = {
//     name: "Note",
//     desc: "If you read me, you might find out how to unlock the room",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room2',
//     current_facing: 'east',
//     readNote() {
//         return console.log("You will find the key to unlock the room hidden in one of the books on the wooden bookshelf. You will need to use the chair to reach it.")
//     }
// }

// let doorTwo = {
//     name: "Door",
//     desc: "This door takes you to the next room, but you must find the key to unlock it first",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room2',
//     current_facing: 'north',
//     unlockDoor() {
//         if (player.inv.includes('key')) {
//             return console.log("Congratulations! You have unlocked the door. You must continue to the next room now!")
//         } else {
//             return console.log("You don't have the key to unlock this door")
//         }
//     }
// }

// //objects in room three
// let hay = {
//     name: "Hayloft",
//     desc: "I am sorry but the hayloft is out of reach!",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room3',
//     current_facing: 'east',
//     inv: ["horseshoe"],
//     reachHay() {
//         if (player.inv.includes('ladder')) {
//             return console.log("You have reached the hayloft and now you see a horseshoe. It must be another clue!")
//         } else {
//             return console.log("You need to reach the hayloft first!")
//         }
//     },
//     takeHorseshoe() {
//         let horseshoe = this.inv.pop()
//         player.inv.push(horseshoe)
//         return console.log("The numbers 12345 are inscribed on the horseshoe")
//     }
// }

// let ladderThree = {
//     name: "Wooden Ladder",
//     desc: "Could this ladder help you somehow? You might have to look around to find out",
//     opened: false,
//     useable: true,
//     visible: true,
//     takeable: true,
//     current_room: 'room3',
//     current_facing: 'west',
//     inv: ["ladder"],
//     takeladderThree() {
//         let ladder = this.inv.pop()
//         player.inv.push(ladder)
//         return console.log("Great job! You are one step closer now!")
//     }
// }

// let paper = {
//     name: "Piece of Paper",
//     desc: "Look inside the wagon to get your first clue!",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room3',
//     current_facing: 'south'
// }

// let wagon = {
//     name: "Old Wagon",
//     desc: "A very old wagon on the south end of the room",
//     opened: true,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room3',
//     current_facing: 'south',
//     lookinside() {
//         return consloge.log("There is an inscription that says: You should start up above. If you look around, you 'll find a way to get there")
//     }
// }

// let doorThree = {
//     name: "Double Dutch Doors",
//     desc: "These doors take you to the next room. There is a keypad on the handle, but it is locked",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room3',
//     current_facing: 'north',
//     unlockDoorThree() {
//         if (player.inv.includes('horseshoe')) {
//             let codeRoomThree = await ask("Please enter the code...")
//             let win = player.unlock(codeRoomThree)
//             return win // check this return function!!!
//         } else {
//             return console.log("You don't know how to unlock this door")
//         }
//     }
// }

// //objects in room four
// let message = {
//     name: "Written Message",
//     desc: "The secret to escape this room is in the wooden box, but you need to find something to open it with",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room4',
//     current_facing: 'south'
// }

// let big_box = {
//     name: "Big Box",
//     desc: "The box is slightly open... What could this be?",
//     opened: true,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room4',
//     current_facing: 'east',
//     inv: ['hammer'],
//     lookinside() {
//         return consloge.log("There is hammer inside the big box... Could it be useful?")
//     },
//     takeHammer() {
//         let hammer = this.inv.pop()
//         player.inv.push(hammer)
//         return console.log("Nice job! This hammer can help you open the wooden box")
//     }
// }

// let wooden_box = {
//     name: "Wooden Box",
//     desc: "The box is sealed. You need a tool to open it",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room4',
//     current_facing: 'west',
//     inv: ['keyFour'],
//     openBox() {
//         if (player.inv.includes('hammer')) {
//             let keyFour = this.inv.pop()
//             player.inv.push(keyFour)
//             return console.log("You have opened the wooden box and found the key to unlock the metal door!")
//         } else {
//             return console.log("You need a tool to open this box first!")
//         }
//     }
// }

// let doorFour = {
//     name: "Metal Door",
//     desc: "This door takes you to the next room, but you must find the key to unlock it first",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room4',
//     current_facing: 'north',
//     unlockDoor() {
//         if (player.inv.includes('keyFour')) {
//             return console.log("Congratulations! You have unlocked the door. You must continue to the next room now!")
//         } else {
//             return console.log("You don't have the key to unlock this door")
//         }
//     }
// }



// //rooms
// let room1 = {
//     inv: [
//         'cabinet',
//         'writingDesk',
//         'paper'
//     ],

//     north_description: "\nThere is a metal door with a keypad. A note on the side that says \'I hope you are familiar with Half-Life...\' ",
//     south_description: "\nThere is a wooden chest that is boarded up with not only a metal lock keeping it shut tight but wooden planks nailed into preventing access...",    // Player must remove planks first and THEN unlock the lock to get the note for the keypad
//     east_description: "\nYou see a writing desk against the east wall with a note written on top of it and a drawer slightly open",                                           // We want the player to open this box at any time to get the crowbar
//     west_description: "\nThere's a closed, cardboard box with a tear on the top",
// }

// //console.log('This is a nice looking office, but... I am locked!')
// let room2 = {
//     inv: [
//         'shelf',
//         'table',
//         'chair',
//         'note',
//         'doorTwo'
//     ],
//     north_description: "There is a wooden door that takes you to the next room but it's locked. You need to find a key.",
//     south_description: "There is a lonely chair against the south wall",
//     east_description: "You see a fancy table on the east wall with a note written on top of it",
//     west_description: "There's a wooden bookshelf and a bunch of books on it.",
// }

// //console.log('Now you find yourself in a barn... this should be fun!')
// let room3 = {
//     inv: [
//         'hay',
//         'ladderThree',
//         'wagon',
//         'paper',
//         'doorThree'
//     ],
//     north_description: "There are double dutch doors. There is a keypad on the handle, but it is locked.",
//     south_description: "There is a old wagon that doesn't seem to be in use anymore. There is a piece of paper next to it.",
//     east_description: "You see a hayloft but no way to get there",
//     west_description: "There's a wooden ladder against the wall."
// }

// //console.log('This room looks like a creepy wharehouse... What kind of place is this?!!')
// let room4 = {
//     inv: [
//         'message',
//         'wooden_box',
//         'big_box',
//         'doorFour'
//     ],
//     north_description: "There is a huge metal door on the north wall that takes you to the next room. The door is locked",
//     south_description: "Somebody left a written message for you on the south wall",
//     east_description: "There is a big box against the east wall. The box is slightly open",
//     west_description: "You see a closed wooden box. It has nails and you have no way to open it...yet",
// }

// //console.log(You are now only a few steps away from escaping! You just need to find the way to escape this ... circus?) 




let answer
let allPossibleDirections = ['north', 'south', 'east', 'west']
let keypad_answer



/// MOST IMPORTANT OBJECTS AND FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        console.log('\n \x1b[36m%s\x1b[0m', `\n${object.desc}`)
    }
}


let player = {
    inv: [],
    health: 100,
    status: 'fine',
    isTrapped: true,
    current_room: 'room1',
    current_facing: 'north',

    check_inventory() {
        if (player.inv.length !== 0) {
            console.log('\n \x1b[36m%s\x1b[0m', `\n Current inventory: ${player.inv}`)
        } else {
            console.log('\n \x1b[36m%s\x1b[0m', `\n You don't have anything!`)
        }

    },
    escape() {
        console.log("You have escaped")
        process.exit()
    },

    damage(damage_num) {
        if ((this.health - damage_num) <= 0) {
            this.health -= damage_num
            this.game_over()
        } else {
            this.health -= damage_num
        }

    },
    status_effect() {
        switch (this.status) {
            case 'hungry':
                this.damage(5)
                console.log('\n \x1b[33m%s\x1b[0m', `Your stomach growls in hunger, you need food fast! You have taken 5 damage and have ${player.health} health left!`)
                break

            case 'fine' && this.health < 100:
                this.health += 5
                console.log('\n \x1b[33m%s\x1b[0m', `Due to feeling fine, you are slowly healing! You've gained 5 health and are now at ${this.health} health!`)
                break

            case 'fine' && this.health === 100:
                break

            default:
                console.log("Error, unusual status detected!")
                break
        }
    },

    game_over() {
        if (this.health <= 0) {
            console.log('\n \x1b[33m%s\x1b[0m', "Health has reached 0. Game over!")
            process.exit()
        }
    }

}


// async function player_action(action){

// }
/// CLASSES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class box {
    constructor(name, locked, boarded, key, loot, desc) {
        this.name
        this.locked = locked
        this.boarded = boarded
        this.key = key
        this.desc = desc
        this.loot = loot
    }
    use_crowbar() {
        if (this.boarded === true && this.locked === false) {
            this.boarded = false
            this.desc = `The ${this.name} no longer has any planks on it. Looks like whatever is inside is free for the taking?`
            console.log('\n \x1b[33m%s\x1b[0m', 'You pull the boards off the box using the crowbar')
        } else if (this.boarded === true && this.locked === true) {
            console.log('\n \x1b[33m%s\x1b[0m', 'You can\'t pull off the boards until the metal lock in the way gets removed!')
        } else {
            console.log('\n \x1b[33m%s\x1b[0m', 'There\'s no boards on here!')
        }
    }

    unlock() {
        if (this.locked === true && player.inv.includes(this.key)) { // Note for me: Refactor this code later to call for the key's object name in the player's inventory. For now it just checks for a string.
            this.locked = false
            this.desc = (`\n It\'s a ${this.name} boarded up now without that pesky metal lock in the way!`)
            room1.south_description = "The box has forgone its relationship with his pal the metal lock."
            console.log('\n \x1b[33m%s\x1b[0m', 'The metal lock falls to the ground upon being unlocked with a loud THUD')
        } else if (this.locked === false) {
            console.log("\n It's already unlocked!")
        } else {
            console.log("You need the right key!")
        }

    }

    open() {
        if (this.locked === false && this.boarded === false) {
            console.log(`\n You open the ${this.name} to get a ${this.loot}!`)
            player.inv.push(this.loot)
        }
    }


}

/// OBJECTS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let room1_drawer_test_object = new box('drawer', false, false, 'none', 'drawer key', 'A wooden drawer slightly open with a note written on top!')
let room1_drawer = {
    opened: false,
    current_room: 'room1',
    current_facing: 'east',
    visible: true,
    takeable: false,              // The key will only be takeable when it is visible and the chest in front of it has been opened
    useable: true,
    desc: "There is a wooden drawer slightly open with a note on top hastily written",
    open() {
        if (this.opened === false) {
            this.opened = true
            this.desc = "The drawer is left opened like someone forgot to close it... looks sloppy."
            console.log("\nYou found the drawer key!")
            player.inv.push('drawer key')
            console.log("Current inventory: ")
            console.log(player.inv)
        } else {
            console.log("It's already open!")
        }
    },
    close() {
        if (this.opened === true) {
            this.opened = false
            this.desc = "The drawer is now shut tight. Good for you keeping the place less tacky without a drawer hanging open awkwardly."
        } else {
            console.log("The drawer is already closed!")
        }

    },
    read() {
        console.log('\n \x1b[36m%s\x1b[0m', `\n The note says \"The first digits are 457\"`)
    },

    take_note() {
        console.log("You've taken the note!")
    }
}


let room1_keypad = {
    current_room: 'room1',
    current_facing: 'north',
    useable: true,
    guesses: 3,
    code: '45730',
    desc: '\n A strange keypad with numbers 1-9. There\'s an LED text box above the numbers that says \"Waiting for input\"',
    async use_keypad() {
        keypad_answer = await ask("Enter code ")
        if (keypad_answer === this.code) {
            console.log("Correct! The door unlocks")
            player.isTrapped = false

        } else if ((keypad_answer != this.code) && this.guesses !== 0) {
            this.guesses -= 1
            console.log(`\x1b[33m%s\x1b[0m: `, `\nWarning, incorrect answer! You have ${this.guesses} guesses left!`)
        } else {
            console.log(`\x1b[33m%s\x1b[0m: `, `\nRoom guesses have reached ${this.guesses}... Self-destruct initiated!`)
            console.log("Game over!")
            process.exit()
        }
    }
}

let room1_box_key = {
    name: 'box key',
    current_room: 'room1',
    current_facing: 'east',
    opened: false,
    visible: true,
    takeable: false,              // The key will only be takeable when it is visible and the chest in front of it has been opened
    useable: true,
    desc: '\nThis is the key you found in the box! It will come in use later...'
}

let room1_boarded_box = {
    current_room: 'room1',
    current_facing: 'south',
    locked: true,
    boarded: true,
    opened: false,
    visible: true,
    takeable: false,
    useable: false,
    desc: "\nIt's a box with planks nailed into it preventing access... On top of this, there's a metal lock around the chest with a keyhole.",
    use_crowbar() {
        if (this.boarded === true && this.locked === false) {
            this.boarded = false
            this.desc = "\n "
            console.log('\n \x1b[33m%s\x1b[0m', 'You pull the boards off the box using the crowbar')
        } else if (this.boarded === true && this.locked === true) {
            console.log('\n \x1b[33m%s\x1b[0m', 'You can\'t pull off the boards until the metal lock in the way gets removed!')
        } else {
            console.log(`Is this boarded: ${this.boarded} Is this locked: ${this.locked}`)
            console.log('\n \x1b[33m%s\x1b[0m', 'You\'ve already removed the boards!')
        }
    },
    unlock() {
        if (this.locked === true && player.inv.includes('drawer key')) {
            this.locked = false
            this.desc = ('\n It\'s a box boarded up now without that pesky metal lock in the way!')
            room1.south_description = "The box has forgone its relationship with his pal the metal lock."
            console.log('\n \x1b[33m%s\x1b[0m', 'The metal lock falls to the ground upon being unlocked with a loud THUD')
        } else if (this.locked === false) {
            console.log("\n It's already unlocked!")
        } else {
            console.log("You need a key!")
        }
    },
    open() {
        if (this.boarded === false && this.locked === false) {
            room1.south_description = "The box only has a note in it now, with broken planks and a metal lock on the ground!"
            this.desc = "\nThe chest you just opened to get the note!"
            console.log('\n \x1b[33m%s\x1b[0m', 'You found a hidden note with that says... \"The last numbers are 730!\"')
        } else {
            console.log("You can't open this yet!")
        }
    }
}


let room1_cardboard_box = {
    opened: false,
    current_room: 'room1',
    current_facing: 'west',
    visible: true,
    // takeable: false,
    useable: true,
    desc: "\nIt's a cardboard box that appears to be slightly open... On the side there's a strange, three-pronged symbol.",
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



// let objBox = []
// player.inv.push(room1_cardboard_box, room1_box_key)

//objects in room three
let room3_box_message = {
    name: "Message on Orange Box",
    desc: "The message on the orange box is the first clue to help you escape",
    opened: false,
    useable: false,
    visible: true,
    takeable: false,
    current_room: 'room5',
    current_facing: 'south',
    readMessage() {
        return console.log("The message says: Only Douglas can help you escape this room! If your are nice to him, he might tell you his secret. P.S: He loves carrots. You might find what you need in this box...")
    }
}

let room3_orange_box = {
    name: "Orange Box",
    desc: "What will you find inside the box?",
    opened: true,
    useable: false,
    visible: true,
    takeable: false,
    current_room: 'room3',
    current_facing: 'south',
    inv: ["carrots"],
    openOrangeBox() {
        return console.log("This box is full of carrots! Douglas would love some carrots!")
    },
    takeCarrots() {
        let carrots = this.inv.pop()
        player.inv.push(carrots)
        return console.log("Nice job! Douglas might tell you his secret in exchange for some carrots!")
    }
}

let room3_douglas = {
    name: "Douglas the Elephant",
    desc: "What a nice and gentle guy he is... he might even share a secret with you!",
    opened: false,
    useable: false,
    visible: true,
    takeable: false,
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

let room3_butter = {
    name: "Bucket of Butter",
    desc: "A bucket full of butter on the west side of the room",
    opened: false,
    useable: true,
    visible: true,
    takeable: true,
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

let room3_arthur = {
    name: "Arthur The Lion",
    desc: "Arthur is usually grumpy and not very frindly",
    opened: false,
    useable: false,
    visible: true,
    takeable: false,
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

//Make this object an apple pie
// let room3_arthur = {
//     name: "Arthur The Lion",
//     desc: "Arthur is usually grumpy and not very frindly",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room5',
//     current_facing: 'east',
//     inv: [red_paper],
//     feedArthur() {
//         if (player.inv.includes('butter')) {
//             let redPaper = this.inv.pop()
//             player.inv.push(redPaper)
//             return console.log("Thank you my friend! I forget about the world when I eat butter")
//         } else {
//             return console.log("You better stay away from me... I am hungry and in a terrible mood!")
//         }
//     },
//     takeRedPaper() {
//         if (player.inv.includes('butter')) {

//             return console.log("You are closer than ever... The red paper says: 454545")
//         } else {
//             return console.log("You better stay away from me... I am hungry and in a terrible mood!")
//         }
//     }
// }

//We might use a keypad instead of door
// let room3_door = {
//     name: "Rusty Door",
//     desc: "These doors take you to the outside world! There is a keypad on the handle, but it is locked",
//     opened: false,
//     useable: false,
//     visible: true,
//     takeable: false,
//     current_room: 'room5',
//     current_facing: 'north',
//     unlockDoorFive() {
//         if (player.inv.includes('redPaper')) {
//             let codeRoomFive = await ask("Please enter the code...")
//             let win = player.unlock(codeRoomFive)
//             return win // check this return function!!!
//         } else {
//             return console.log("You don't know how to unlock this door")
//         }
//     }
// }

let room3_keypad = {
    current_room: 'room3',
    current_facing: 'north',
    useable: true,
    guesses: 3,
    code: '141414',
    desc: '\n There is a strange keypad with numbers 1-9 on the rusty door. There\'s an LED text box above the numbers that says \"Waiting for input\"',
    async use_keypad() {
        keypad_answer = await ask("Enter code ")
        if (keypad_answer === this.code) {
            console.log("Correct! The door unlocks")
            player.isTrapped = false

        } else if ((keypad_answer != this.code) && this.guesses !== 0) {
            this.guesses -= 1
            console.log(`\x1b[33m%s\x1b[0m: `, `\nWarning, incorrect answer! You have ${this.guesses} guesses left!`)
        } else {
            console.log(`\x1b[33m%s\x1b[0m: `, `\nRoom guesses have reached ${this.guesses}... Self-destruct initiated!`)
            console.log("Game over!")
            process.exit()
        }
    }
}

//// FUCNTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function check_stuff(inventory) {
    inventory.forEach(element => console.log(element.desc))
    console.log('checked')
    process.exit()
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

let room2 = {
    inventory: [
        'pizza'
    ],

    north_description: "\n A sign is attatched to the front of the building: \"Caeser's Pizza Shop\". It appears the door to the building is locked, but there's plenty of customers inside. What gives!? ",
    south_description: "\n There's a lingering key with a pizza keyring attatched to it on a nearby trashcan. Surely the owner wouldn't mind if you borrowed it?",
    east_description: "\n There's a busy street over here! Looks dangerous...",
    west_description: "\n Plenty of shops detailing other items you can buy later when this feature gets added!",

    describe(direction) {
        switch (direction) {
            case 'north':
                return this.north_description
                break

            case 'south':
                return this.south_description
                break

            case 'east':
                return this.east_description
                break

            case 'west':
                return this.west_description
                break

            default:
                console.log("Error... Please enter a cardinal direction (north, south, east, west) as the argument")
                break
        }
    }

}

let room3 = {
    inv: [
        'Douglas',
        'Arthur',
        'butter',
        'orange_box',
        'boxMessage',
        'doorFive'
    ],
    north_description: "There is a rusty door on the north side of the tent. There is a keypad on the handle, but it is locked.",
    south_description: "There is an elephant on the south side of the tent, his name is Douglas. Not too far from him, you'll see an orange box with a written message on it... The box is slightly open and the message on the orange box is your first clue",
    east_description: "There is a lion on the east side of the tent, his name is Arthur. Wait a minute... is that a red piece of paper hanging from his neck",
    west_description: "There's a bucket full of butter on the west side of the tent. There is also a delicious apple pie that can definetely help a hungry belly!"
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
//// PLAY FUNCTION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function play() {
    switch (player.current_room) {
        case 'room1':
            switch (player.current_facing) {     // Where is the player facing in room 1?
                case 'north':
                    console.log(room1.north_description)
                    answer = await ask("Enter action (to move say 'move') ")     // What is the player going to do in room 1 while facing this direction?
                    switch (answer) {
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'gargle':    // Requirement for the 'gargle' story.
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'use pad':
                        case 'use keypad':                           // I put await here because I want to 'slow down and don't print anything else until this function returns'   
                            await room1_keypad.use_keypad()          // If the user enters the right code, player.isTrapped === false until the player chooses 'open door' and goes to the next room               
                            play()
                            break

                        case 'use door':
                        case 'open door':
                        case 'walk through door':
                            if (player.isTrapped === false) {         // player.isTrapped is only false when the keypad code is entered correctly
                                console.log("The room has been unlocked and you can proceed to leave!")
                                player.current_room = 'room2'
                                console.log("Upon entering room 2, you begin to realize you are hungrier than usual. You've acquired the HUNGRY status, which damages your health by 5 each time you linger!")
                                player.isTrapped = true
                            } else {
                                console.log('\n \x1b[33m%s\x1b[0m', "The door's handle beeps with the threat of unauthorized access! You have to enter the code first!")
                            }
                            player.isTrapped = true
                            play()
                            break

                        case 'check stuff':
                            check_stuff(player.inv)
                            break

                        case 'examine keypad':
                        case 'examine pad':
                            examine(room1_keypad)
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
                    break // This break is for north, south, east, west parts of the rooms       
                case 'south':
                    console.log(room1.south_description)
                    answer = await ask("Enter action ")
                    switch (answer) {
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'gargle':
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'examine box':
                        case 'examine chest':
                        case 'examine treasure chest':
                            console.log(boarded_box.desc)
                            play()
                            break

                        case 'use crowbar':
                        case 'use crowbar on box':
                        case 'use crowbar on chest':
                            await room1_boarded_box.use_crowbar()
                            play()
                            break

                        case 'use key':
                        case 'use key on box':
                        case 'use key on chest':
                            await room1_boarded_box.unlock()
                            play()
                            break

                        case 'open box':
                        case 'open chest':
                            await room1_boarded_box.open()
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
                            console.log("\nUnexpected answer!")
                            play()
                            break
                    }
                    break

                case 'east':
                    console.log(room1.east_description)      // Room with the drawer
                    answer = await ask("Enter action ")
                    switch (answer) {
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'gargle':
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'open drawer':
                        case 'grab drawer':
                            room1_drawer.open()
                            play()
                            break

                        case 'close drawer':
                        case 'shut drawer':
                            room1_drawer.close()
                            break

                        case 'examine drawer':
                        case 'look at drawer':
                        case 'observe drawer':
                            examine(room1_drawer)
                            play()
                            break

                        case ('read note' || 'examine note'):                         // Test visting room 2
                            room1_drawer.read()
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
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'examine box':
                        case 'examine cardboard box':
                            examine(room1_cardboard_box)
                            play()
                            break

                        case 'gargle':
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'open box':
                        case 'open cardboard box':
                            room1_cardboard_box.open()
                            play()
                            break

                        case 'take box':
                        case 'take cardboard box':
                            room1_cardboard_box.take()
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
            player.status_effect()
            console.log(room2.describe(player.current_facing)) // Got sidetracked working on developing classes, other functions, and other features before the room 2... Will add onto this on Monday.
            switch (player.current_facing) {
                case 'north':
                    answer = await ask("Enter action ")
                    switch (answer) {
                        case 'move':
                            move(player.current_facing)
                            break
                    }
                    play()
                    break



                case 'south':
                    console.log("Welcome to the south")
                    answer = await ask("Enter action ")
                    switch (answer) {
                        case 'move':
                            move(player.current_facing)
                            break

                        case 'loiter':
                            console.log("No loitering!")
                            player.damage(50)
                            break
                    }
                    play()

                    break
                default:
                    break


            }




            break

        case 'room3':
            switch (player.current_facing) {
                case 'noth':
                    console.log(room3.north_description)
                    answer = await ask("Enter action (to move say 'move') ")
                    switch (answer) {
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'gargle':    // Requirement for the 'gargle' story.
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'use pad':
                        case 'use keypad':                           // I put await here because I want to 'slow down and don't print anything else until this function returns'   
                            await room3_keypad.use_keypad()          // If the user enters the right code, player.isTrapped === false until the player chooses 'open door' and goes to the next room               
                            play()
                            break

                        case 'use door':
                        case 'open door':
                        case 'walk through door':
                            if (player.isTrapped === false) {         // player.isTrapped is only false when the keypad code is entered correctly
                                console.log("Congratulations! You have ecaped! The room has been unlocked and you are free!")
                                player.isTrapped = false
                            } else {
                                console.log('\n \x1b[33m%s\x1b[0m', "The door's handle beeps with the threat of unauthorized access! You have to enter the code first!")
                            }
                            player.isTrapped = true
                            play()
                            break

                        case 'check stuff':
                            check_stuff(player.inv)
                            break

                        case 'examine keypad':
                        case 'examine pad':
                            examine(room2_keypad)
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
                    break // This break is for north

                case 'south':
                    console.log(room3.south_description)
                    answer = await ask("Enter action (to move say 'move') ")
                    switch (answer) {
                        case 'i':
                        case 'check inventory':
                        case 'inventory':
                        case 'inv':
                        case 'check inv':
                            player.check_inventory()
                            play()
                            break

                        case 'gargle':
                            console.log("Sorry, I don't know how to gargle!")
                            break

                        case 'examine message':
                        case 'read message':
                            readMessage()
                            play()
                            break

                        case 'examine box':
                        case 'examine orange box':
                        case 'open box':
                        case 'open orange box':
                            openOrangeBox()
                            play()
                            break

                        case 'take carrots':
                        case 'take carrot':
                            takeCarrots()
                            play()
                            break

                        case 'feed douglas':
                        case 'feed elephant':
                            feedDouglas()
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
                    break // This break is for south

                case 'east':
                    console.log(room3.east_description)
                    answer = await ask("Enter action (to move say 'move') ")
                    switch (answer) {
                        case 'feed arthur':
                        case 'feed lion':
                            feedArthur() 
                            play()
                            break

                        case 'read paper':
                        case 'read red paper':
                        case 'take paper':
                        case 'take red paper':
                            takeRedPaper()
                            play()
                            break

                        default:
                            play()
                            break
                    }
                    break // This break is for east

                case 'west':
                    console.log(room3.west_description)
                    answer = await ask("Enter action (to move say 'move') ")
                    switch (answer) {

                    }
                    break // This break is for west
            }
            break // break for room 3
    }

}
play()
