console.log('hello world!')
/// <reference types="@workadventure/iframe-api-typings" />



import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
var hintLevel: 1;
let id = 1

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

    WA.chat.sendChatMessage('Hello, I am Mr.Robot.', 'Mr Robot');
    WA.chat.onChatMessage((message) => {;

        // if (message = 'goodbye'){
        //     id = 8 
        // }
        // else{
        console.log('The user typed a message', message);
        });
            do {;
                WA.chat.sendChatMessage('I entered the while loop', 'Mr Robot');
                if (id == 1){;
                    WA.chat.sendChatMessage('Do you need a hint?', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                        console.log('The user typed a message', message);
                        if (message == 'y'){;
                            id = 2;
                        } 
                        else {;
                            id = 3;
                        };
                 
                    });
                }

                else if (id == 2){;
                 // print hint
                    if(hintLevel == 1){;
                        WA.chat.sendChatMessage('Hint 1', 'Mr Robot');
                        hintLevel ++;
                        WA.chat.sendChatMessage('Do you need another hint?', 'Mr Robot');
                        WA.chat.onChatMessage((message: string) => {;
                            console.log('The user typed a message', message);
                            if (message == 'n'){;
                                id = 3;
                            };
                        });
                        console.log('Hint 1 given.');
                    }
                

                    else if(hintLevel == 2){
                        WA.chat.sendChatMessage('Hint 2', 'Mr Robot');
                        hintLevel ++; 
                        WA.chat.sendChatMessage('Do you need another hint?', 'Mr Robot');
                        WA.chat.onChatMessage((message: string) => {
                            console.log('The user typed a message', message);
                            if (message == 'n'){
                                id = 3
                            }
                        })
                        console.log('Hint 2 given.');
                    }

                    else if (hintLevel == 3){
                        WA.chat.sendChatMessage('Hint 3', 'Mr Robot');
                        WA.chat.sendChatMessage('You are now out of hints.', 'Mr Robot');
                        hintLevel ++;
                        id = 3
                        console.log('Hint 3 given.');
                    }

                    else{
                        WA.chat.sendChatMessage('Here are your hints:', 'Mr Robot');
                        WA.chat.sendChatMessage('Hint 1', 'Mr Robot');
                        WA.chat.sendChatMessage('Hint 2', 'Mr Robot');
                        WA.chat.sendChatMessage('Hint 3', 'Mr Robot');
                        WA.chat.sendChatMessage('There are no other hints', 'Mr Robot');
                        id = 3;
                        console.log('All hints reprinted. given.');
                    }
                }

                else if (id == 3){;
                
                    WA.chat.sendChatMessage('Would you like to enter the code?', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                    console.log('The user typed a message', message);
                        if (message == 'y'){;
                            id = 4;
                        }
                        else{;
                            id = 7;
                        };
                    });
                }

                else if (id == 4){;
                    WA.chat.sendChatMessage('Please enter the code.', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                        console.log('The user typed a message', message);
                        if (message == '1234'){;
                            // print hint
                            WA.chat.sendChatMessage('You entered the right code!', 'Mr Robot');
                            WA.chat.sendChatMessage('The secret password is star. ', 'Mr Robot');
                            id = 5;
                        } 

                        else{;
                            WA.chat.sendChatMessage('You entered the wrong code!', 'Mr Robot'); ;
                            id = 5;
                        };
                    })
                }

                else if (id == 5){;
                    WA.chat.sendChatMessage('Would you like to try again?', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                        console.log('The user typed a message', message);
                        if (message == 'y'){;
                            id = 4;
                        }
                        else{;
                            id = 1;
                        };
                    });
                }

                else if (id == 6){;
                    WA.chat.sendChatMessage('What can I help you with?', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                        if (message == 'hint') {;
                            id = 1;
                        }

                        else if ( message == 'enter code'){;
                            id = 3;
                        }

                        else{;
                            WA.chat.sendChatMessage('Okay, Goodbye!', 'Mr Robot');
                        };
                    })
                }

                else if ( id == 7){;
                    WA.chat.sendChatMessage('Do you need anymore help?', 'Mr Robot');
                    WA.chat.onChatMessage((message: string) => {;
                        if (message == 'n'){;
                            WA.chat.sendChatMessage('Okay, Goodbye!','Mr Robot');
                            id = 8;
                        }

                        else{;
                            id = 6;
                        };
                    });
                };

            } while(id <= 7);
        // }

   

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
