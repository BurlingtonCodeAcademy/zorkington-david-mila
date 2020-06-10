let answer
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
    location: 'north',
    escape(){
        console.log("You have escaped")
        process.exit()
    }
}

let blue_box = {
    opened: 'false',
    location: ['room1', 'north'],
    describe(){
        console.log("It's a strange, blue box...")
    },
    open(){
        player.inv.push('red key')
        this.open = 'true'
    }

}

async function play(){
    switch(player.location){
        case 'north':
            answer = await ask("What will you do in the north?")
            switch(answer){
                case 'die':
                    console.log("If you say so...")
                    process.exit()
                    break
                
                case 'examine':
                    blue_box.describe()
                    break

                case 'go south':
                    console.log("You head south!")
                    player.location = 'south'
                    play()
                    break
                
                default:
                    console.log("Unexpected answer!")
                    break

            }
            break
        
        case 'south':
            if(blue_box.opened === 'false'){
                console.log("You see an unopened box!")
            }
            answer = await ask("What will you do in the south?")
            switch(answer){
                case 'go back':
                    player.location = 'north'
                    break

                default:
                    console.log("I think I found the error")
                    break
            }
            break
        
        default:
            console.log("You have entered an unexpected location")
            break
    }

}
play()