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

function examine(object){
    if(object.current_room === player.current_room && object.current_facing === player.current_facing){
        console.log('\n \x1b[36m%s\x1b[0m', `\n${object.desc}`)
    }
}


let player = {
    inv: [],
    health: 100,
    status: 'hungry',
    isTrapped: true,
    current_room: 'room2',
    current_facing: 'north',

    check_inventory(){
        if(player.inv.length !== 0){
            console.log('\n \x1b[36m%s\x1b[0m', `\n Current inventory: ${player.inv}`)
        } else {
            console.log('\n \x1b[36m%s\x1b[0m', `\n You don't have anything!`)
        }
        
    },
    escape(){
        console.log("You have escaped")
        process.exit()
    },

    damage(damage_num){
        this.health -= damage_num
    },
    status_effect(){
        switch(this.status){
            case 'hungry':
                this.damage(5)
                console.log(`Your stomach growls in hunger, you need food fast! You have taken 5 damage and have ${player.health} left!`)
                break

            case 'fine' && this.health < 100:
                this.health += 5
                console.log(`Due to feeling fine, you are slowly healing! You've gained 5 health and are now at ${this.health}`)
                break

            case 'fine' && this.health === 100:
                break

            default:
                console.log("Error, unusual status detected!")
                break
        }
    },
    
    game_over(){
        if(this.health <= 0){
            console.log("\n Health has reached 0. Game over!")
            process.exit()
        }
    }
    
}


// async function player_action(action){
    
// }
/// CLASSES /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class box {
    constructor(name, locked, boarded, key, loot, desc){
        this.name
        this.locked = locked
        this.boarded = boarded
        this.key = key
        this.desc = desc
        this.loot = loot
    }
    use_crowbar(){
        if(this.boarded === true &&  this.locked === false){
            this.boarded = false
            this.desc = `The ${this.name} no longer has any planks on it. Looks like whatever is inside is free for the taking?`
            console.log('\n \x1b[33m%s\x1b[0m', 'You pull the boards off the box using the crowbar')   
        } else if (this.boarded === true && this.locked === true){
            console.log('\n \x1b[33m%s\x1b[0m', 'You can\'t pull off the boards until the metal lock in the way gets removed!') 
        } else {
            console.log('\n \x1b[33m%s\x1b[0m', 'There\'s no boards on here!')            
        }
    }

    unlock(){
        if(this.locked === true && player.inv.includes(this.key)){ // Note for me: Refactor this code later to call for the key's object name in the player's inventory. For now it just checks for a string.
            this.locked = false
            this.desc = (`\n It\'s a ${this.name} boarded up now without that pesky metal lock in the way!`)
            room1.south_description = "The box has forgone its relationship with his pal the metal lock."
            console.log('\n \x1b[33m%s\x1b[0m', 'The metal lock falls to the ground upon being unlocked with a loud THUD')
        } else if(this.locked === false){
            console.log("\n It's already unlocked!")
        } else {
            console.log("You need the right key!")
        }

    }

    open(){
        if(this.locked === false && this.boarded === false){
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
    open(){
        if(this.opened === false){
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
    close(){
        if(this.opened === true){
            this.opened = false
            this.desc = "The drawer is now shut tight. Good for you keeping the place less tacky without a drawer hanging open awkwardly."
        } else {
            console.log("The drawer is already closed!")
        }
        
    },
    read(){
        console.log('\n \x1b[36m%s\x1b[0m', `\n The note says \"The first digits are 457\"`)
    },

    take_note(){
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
    async use_keypad(){
        keypad_answer = await ask("Enter code ")
        if(keypad_answer === this.code){
            console.log("Correct! The door unlocks")
            player.isTrapped = false

        } else if((keypad_answer != this.code) && this.guesses !== 0){
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
    use_crowbar(){
        if(this.boarded === true &&  this.locked === false){
            this.boarded = false
            this.desc = "\n "
            console.log('\n \x1b[33m%s\x1b[0m', 'You pull the boards off the box using the crowbar')   
        } else if (this.boarded === true && this.locked === true){
            console.log('\n \x1b[33m%s\x1b[0m', 'You can\'t pull off the boards until the metal lock in the way gets removed!') 
        } else {
            console.log(`Is this boarded: ${this.boarded} Is this locked: ${this.locked}`)
            console.log('\n \x1b[33m%s\x1b[0m', 'You\'ve already removed the boards!')            
        }
    },
    unlock(){
        if(this.locked === true && player.inv.includes('drawer key')){
            this.locked = false
            this.desc = ('\n It\'s a box boarded up now without that pesky metal lock in the way!')
            room1.south_description = "The box has forgone its relationship with his pal the metal lock."
            console.log('\n \x1b[33m%s\x1b[0m', 'The metal lock falls to the ground upon being unlocked with a loud THUD')
        } else if(this.locked === false){
            console.log("\n It's already unlocked!")
        } else {
            console.log("You need a key!")
        }
    },
    open(){
        if(this.boarded === false && this.locked === false){
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

//// FUCNTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function check_stuff(inventory){
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
//// PLAY FUNCTION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function play(){
    switch(player.current_room){
        case 'room1':
            switch(player.current_facing){     // Where is the player facing in room 1?
                case 'north':           
                    console.log(room1.north_description)
                    answer = await ask("Enter action (to move say 'move') ")     // What is the player going to do in room 1 while facing this direction?
                    switch(answer){
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
                            if(player.isTrapped === false){         // player.isTrapped is only false when the keypad code is entered correctly
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
                    switch(answer){     
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
                    switch(answer){
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
                        switch(answer){
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
            switch(player.current_facing){
                case 'north':
                    console.log("Try this")
                    play()
                    break
                default:
                    break


            }
                



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
