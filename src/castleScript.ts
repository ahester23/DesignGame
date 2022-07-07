console.log('hello world!')
/// <reference types="@workadventure/iframe-api-typings" />



import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// var id = 1
var hint1 = 'hint1'
var hint2 = 'hint2'
var hint3 = 'hint3'
var directions = 'directions'
var introduction = 'Riddle Introduction'
var robotIntro = 'Hello, bla bla bla. I do all these things.'
var robotCom = 'Robot commands here.'

// Waiting for the API to be ready
WA.onInit().then(() => {
    var hintLevel = 1;
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp);

    WA.chat.sendChatMessage(robotIntro, 'Mr. Robot')
    console.log('User introduced to Mr. Robot.')
    WA.chat.sendChatMessage(introduction, 'Mr. Robot')
    console.log('Riddle introduced to user.')
    WA.chat.sendChatMessage(directions, 'Mr.Robot')
    console.log('Directions sent to user.')
    WA.chat.sendChatMessage("How can I help you today?", 'Mr Robot');
    console.log('Asked user what help they need.');
    WA.chat.onChatMessage((message => {
        console.log('User sent :', message);
        switch (message) {
            case 'help':
                WA.chat.sendChatMessage('How can I help you?', 'Mr. Robot')
                break
            case 'instructions':
                WA.chat.sendChatMessage(directions, 'Mr.Robot')
                break
            case 'reprint':
                WA.chat.sendChatMessage(hint1, 'Mr Robot');
                WA.chat.sendChatMessage(hint2, 'Mr Robot');
                WA.chat.sendChatMessage(hint3, 'Mr Robot');
                console.log('All hints reprinted.')
                break

            case "none":
                console.log('User said they do not need help. Wait for next message.');
                WA.chat.sendChatMessage('Okay, I am here if you need me!', 'Mr. Robot')
                break
            
            case "code":
                console.log('User would like to enter code.');
                WA.chat.sendChatMessage('Ok, you may enter your code now.', 'Mr. Robot');
                console.log('Prompted user for code.');
                break;

            case "hint":
                console.log('User asked for a hint.');
                if (hintLevel == 1){
                    WA.chat.sendChatMessage('Here is your first hint:', 'Mr. Robot');
                    WA.chat.sendChatMessage(hint1, 'Mr Robot');
                    console.log('First hint given to user.');
                }

                else if (hintLevel == 2){
                    WA.chat.sendChatMessage('Here is your second hint:', 'Mr. Robot');
                    WA.chat.sendChatMessage(hint2, 'Mr Robot');
                    console.log('Second hint given to user.');
                }


                else if (hintLevel == 3){
                    WA.chat.sendChatMessage('Here is your third hint:', 'Mr. Robot');
                    WA.chat.sendChatMessage(hint3, 'Mr Robot');
                    console.log('Third hint given to user.')
                }

                else{
                    WA.chat.sendChatMessage('You are out of hints. If you would like to see them all again, type reprint.', 'Mr. Robot');
                    console.log('User has used all hints. Asked about re-printing them.')
                }

                hintLevel ++ 
                break;
 
            default: 
            if (isNaN(parseInt(message))){
                // rightCode = false
                console.log('User did not enter a code')
            }
            else{
                console.log('User entered a code.')
                if (parseInt(message) == 1234){
                    console.log('Code is correct.')
                    console.log('Code is entered and correct.')
                    WA.chat.sendChatMessage('You answered the correct code. The passcode is star.', 'Mr. Robot')
                    console.log('Tell user code is correct');
                    break
                    }
                else{
                    console.log('Code is entered but incorrect.')
                    WA.chat.sendChatMessage('You answered the incorrect code.', 'Mr. Robot')
                    console.log('Tell user the code is incorrect.');
                }
            }
            WA.chat.sendChatMessage(robotCom, 'Mr. Robot')
            break
            }

    }))


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
   
}).catch(e => console.error(e));
   

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
