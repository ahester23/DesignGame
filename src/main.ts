console.log('hello world!')
/// <reference types="@workadventure/iframe-api-typings" />



import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let hintLevel: 1;
let id = 1;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    WA.chat.onChatMessage(((message: string) => {
        if (id == 1){
            // do something
            WA.chat.sendChatMessage('Hello, I am Mr.Robot.', 'Mr Robot');
            id ++;
        } else {
            if (id == 2){
                WA.chat.sendChatMessage('Do you need a hint?', 'Mr Robot');
                WA.chat.onChatMessage((message: string) => {
                    if (message == 'y'){
                        // print hint
                        WA.chat.sendChatMessage('Hint 1', 'Mr Robot');
                        hintLevel ++;
                    } 
                    else {
                        if (message == 'n'){
                            id++
                        }
                    }
                })
            }

            if (id == 3){
                WA.chat.sendChatMessage('Please enter the code.', 'Mr Robot');
                WA.chat.onChatMessage((message: string) => {
                    if (message == '1234'){
                        // print hint
                        WA.chat.sendChatMessage('You entered the right code!', 'Mr Robot');
                        WA.chat.sendChatMessage('The secret password is star. Goodbye.', 'Mr Robot');
                        id ++;
                    } 
                    else {
                        if (message != '1234'){
                            WA.chat.sendChatMessage('You entered the wrong code!', 'Mr Robot'); 
                            id = 1; 
                        }
                    }
                })
            }
        console.log('The user typed a message', message);
        WA.chat.sendChatMessage('Hello world you wrote: ' + message, 'Mr Robot');
    }}));


}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
