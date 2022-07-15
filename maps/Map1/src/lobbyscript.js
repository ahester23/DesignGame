/// <reference types="@workadventure/iframe-api-typings" />


console.log('Script started successfully');

let currentPopup = undefined;

// var id = 1
const robot = 'Mr.Robot'
var hint1 = 'Look for a computer.'
var hint2 = 'The office and workshop contain computers.'
var hint3 = 'Go in front of any computer.'
var directions = 'There is a strange noise coming from the computers. You should check it out.'
var introduction = 'Welcome to the Pfaff district.'
var robotIntro = 'Hi, I am Mr. Robot. I am here to assist you today by giving you instructions and providing hints. '
var robotCom = 'Hello, I can assist you by giving hints or repeating directions. Let me know how I can help. '

// Waiting for the API to be ready
WA.onInit().then(() => {
    var hintLevel = 0;
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp);

    WA.chat.sendChatMessage(robotIntro, robot)
    console.log('User introduced to Mr. Robot.')
    WA.chat.sendChatMessage(introduction, robot)
    console.log('Riddle introduced to user.')
    WA.chat.sendChatMessage(directions, robot)
    console.log('Directions sent to user.')
    WA.chat.sendChatMessage("Let me know if you need any help.", robot);
    console.log('Asked user what help they need.');
    WA.chat.onChatMessage((message => {
        console.log('User sent :', message);
        var testmessage = message.toLowerCase()
        switch(true) {
            case testmessage.includes('instructions') || testmessage.includes('directions'):
                WA.chat.sendChatMessage(directions, robot)
                break
            case testmessage.includes('thank you'):
                WA.chat.sendChatMessage("You are welcome.", robot)
                break
            case testmessage.includes('help'):
                WA.chat.sendChatMessage('How can I help you? I could give you a hint or repeat the directions.', robot)
                break
            case testmessage.includes('instructions'):
                WA.chat.sendChatMessage(directions, robot)
                break
            case testmessage.includes('reprint'):
                switch(hintLevel){
                case (hintLevel > 0):
                    WA.chat.sendChatMessage(hint1, robot);
                    console.log('Hint 1 reprinted.')
                case (hintLevel > 1):
                    WA.chat.sendChatMessage(hint2, robot);
                    console.log('Hint 2 reprinted.')
                case (hintLevel > 2):
                    WA.chat.sendChatMessage(hint3, robot);
                    console.log('All hints reprinted.')
                default:

                }
                
                break

            case testmessage.includes("none") || testmessage.includes("no"):
                console.log('User said they do not need help. Wait for next message.');
                WA.chat.sendChatMessage('Okay, I am here if you need me!', robot)
                break
            case testmessage.includes("code"):
                console.log('User would like to enter code.');
                WA.chat.sendChatMessage('Ok, you may enter your code now.', robot);
                console.log('Prompted user for code.');
                break;

            case testmessage.includes("hint"):
                console.log('User asked for a hint.');
                if (hintLevel == 0){
                    hintLevel ++
                    WA.chat.sendChatMessage('Here is your first hint:', robot);
                    WA.chat.sendChatMessage(hint1, robot);
                    console.log('First hint given to user.');
                }

                else if (hintLevel == 2){
                    WA.chat.sendChatMessage('Here is your second hint:', robot);
                    WA.chat.sendChatMessage(hint2, robot);
                    console.log('Second hint given to user.');
                }


                else if (hintLevel == 3){
                    WA.chat.sendChatMessage('Here is your third hint:', robot);
                    WA.chat.sendChatMessage(hint3, robot);
                    console.log('Third hint given to user.')
                }

                else{
                    WA.chat.sendChatMessage('You are out of hints. If you would like to see them all again, type reprint.', robot);
                    console.log('User has used all hints. Asked about re-printing them.')
                }

                hintLevel ++ 
                break;
 
            default: 
            if (isNaN(parseInt(message))){
                console.log('User did not enter a code')
            }
            else{
                console.log('User entered a code.')
                if (parseInt(message) == 1234){
                    console.log('Code is entered and correct.')
                    WA.chat.sendChatMessage('You answered the correct code. The passcode is star.', robot)
                    console.log('Tell user code is correct');
                    break
                    }
                else{
                    console.log('Code is entered but incorrect.')
                    WA.chat.sendChatMessage('You answered the incorrect code.', robot)
                    console.log('Tell user the code is incorrect.');
                }
            }
            WA.chat.sendChatMessage(robotCom, robot)
            break
        }
    }))
}).catch(e => console.error(e));
   

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
