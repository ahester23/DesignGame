console.log('hello world!')
// import { ActionMessage } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ActionMessage";
/// <reference types="@workadventure/iframe-api-typings" />


import  * as apiExtra from "@workadventure/scripting-api-extra";

// import { getVariables, VariableDescriptor } from "@workadventure/scripting-api-extra";

// import { callbackify } from "util";

console.log('Script started successfully');

let currentPopup: any = undefined;

// var id = 1
var hint1 = 'Look around for a place that could contain the time machine.'
var hint2 = 'You may need to go look inside somewhere to locate the machine.'
var hint3 = 'Go to the last door.'
var directions = 'In order to leave this time period you must find the time machine.'
var introduction = 'With a loud zap, you open your eyes to discover you are no longer in the Pfaff district. Everything around you looks old.'
// var robotIntro = 'Hello, bla bla bla. I do all these things.'
var robotCom = 'Robot commands here.'

// Waiting for the API to be ready
WA.onInit().then(() => {
    var hintLevel = 1;
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    WA.room.onEnterLayer('newspaperZone').subscribe(() => {;
        const today = new Date();
        today.setFullYear(1764);
        currentPopup = WA.ui.openPopup("newspaper","The newspaper is dated " + today.toDateString() + '.',[{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                popup.close()
            }
        }]);
    })
    WA.room.onEnterLayer('windowZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("window"," Looking through the window, you see rows of bookshelves in a dimly lit room.",[{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                popup.close()
            }
        }])
    })
    WA.room.onEnterLayer('announcementZone').subscribe(() => {
            currentPopup = WA.ui.openPopup("announcement","",[{
                label: "ENTER NOW",
                className: "disabled",
                callback: () => {
                    // popup.close()
                }
            }]);
    })
    WA.room.onEnterLayer('door_open_zone').subscribe(() => {

    })

    WA.room.onLeaveLayer('newspaperZone').subscribe(closePopUp);
    WA.room.onLeaveLayer('announcementZone').subscribe(closePopUp);
    WA.room.onLeaveLayer('windowZone').subscribe(closePopUp);

    // WA.chat.sendChatMessage(robotIntro, 'Mr. Robot')
    // console.log('User introduced to Mr. Robot.')
    WA.chat.sendChatMessage(introduction, 'Mr.Robot')
    console.log('Riddle introduced to user.')
    WA.chat.sendChatMessage(directions, 'Mr.Robot')
    console.log('Directions sent to user.')
    WA.chat.sendChatMessage("How can I help you today?", 'Mr.Robot');
    console.log('Asked user what help they need.');
    WA.chat.onChatMessage((message => {
        console.log('User sent :', message);
        var testmessage = message.toLowerCase()
        switch(true) {

            case testmessage.includes('thank you'):
                WA.chat.sendChatMessage("You're welcome!", "Mr.Robot")
                break

            case testmessage.includes('help'):
                WA.chat.sendChatMessage('How can I help you?', 'Mr.Robot')
                break

            case testmessage.includes('instructions') || testmessage.includes('directions'):
                WA.chat.sendChatMessage(directions, 'Mr.Robot')
                break

            case testmessage.includes('reprint'):
                WA.chat.sendChatMessage(hint1, 'Mr.Robot');
                WA.chat.sendChatMessage(hint2, 'Mr.Robot');
                WA.chat.sendChatMessage(hint3, 'Mr.Robot');
                console.log('All hints reprinted.')
                break

            case testmessage.includes("no") && testmessage.includes('help'):
                console.log('User said they do not need help. Wait for next message.');
                WA.chat.sendChatMessage('Okay, I am here if you need me!', 'Mr.Robot')
                break

            case testmessage.includes("code"):
                console.log('User would like to enter code.');
                WA.chat.sendChatMessage('Ok, you may enter your code now.', 'Mr.Robot');
                console.log('Prompted user for code.');
                break;

            case testmessage.includes("hint"):
                console.log('User asked for a hint.');
                if (hintLevel == 1){
                    WA.chat.sendChatMessage('Here is your first hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint1, 'Mr Robot');
                    console.log('First hint given to user.');
                }

                else if (hintLevel == 2){
                    WA.chat.sendChatMessage('Here is your second hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint2, 'Mr Robot');
                    console.log('Second hint given to user.');
                }


                else if (hintLevel == 3){
                    WA.chat.sendChatMessage('Here is your third hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint3, 'Mr Robot');
                    console.log('Third hint given to user.')
                }

                else{
                    WA.chat.sendChatMessage('You are out of hints. If you would like to see them all again, type reprint.', 'Mr.Robot');
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
                if (parseInt(message) == 1764){
                    console.log('Code is entered and correct.')
                    WA.chat.sendChatMessage('You answered the correct code. You may now enter.', 'Mr.Robot')
                    console.log('Tell user code is correct');
                    break
                    }
                else{
                    console.log('Code is entered but incorrect.')
                    WA.chat.sendChatMessage('You answered the incorrect code.', 'Mr.Robot')
                    console.log('Tell user the code is incorrect.');
                }
            }
            WA.chat.sendChatMessage(robotCom, 'Mr. Robot')
            break
        }
    }))


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    apiExtra.bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).then(() => {
        apiExtra.initDoors()
    }).catch(e => console.error(e));
    
    WA.state.onVariableChange('door_open_zone').subscribe((data: unknown) => {
        if(data === true){
            setTimeout(() => {
                WA.state.saveVariable('gardenDoor', false);
            }, 10000);
        }
    });
   
}).catch(e => console.error(e));
   

// import { getLayersMap } from "../LayersFlattener";
// import { Properties } from "../Properties";
// import { findLayersBoundaries } from "../LayersExtra";
// import { defaultAssetsUrl } from "./default_assets_url";
// import { ActionMessage } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ActionMessage";
// import { EmbeddedWebsite } from "@workadventure/iframe-api-typings/Api/iframe/Room/EmbeddedWebsite";
// let layersMap: { get: (arg0: any) => any; values: () => any; };
// let playerX = 0;
// let playerY = 0;
// function updateDoorLayers(variable: { name: string | number; properties: { mustGetString: (arg0: string) => any; }; }) {
//     if (WA.state[variable.name]) {
//         let layers = variable.properties.mustGetString("openLayer");
//         for (const layer of layers.split("\n")) {
//             WA.room.showLayer(layer);
//         }
//         layers = variable.properties.mustGetString("closeLayer");
//         for (const layer of layers.split("\n")) {
//             WA.room.hideLayer(layer);
//         }
//     }
//     else {
//         let layers = variable.properties.mustGetString("openLayer");
//         for (const layer of layers.split("\n")) {
//             WA.room.hideLayer(layer);
//         }
//         layers = variable.properties.mustGetString("closeLayer");
//         for (const layer of layers.split("\n")) {
//             WA.room.showLayer(layer);
//         }
//     }
// }
// function playOpenSound(variable: { properties: { getString: (arg0: string) => any; getNumber: (arg0: string) => any; mustGetString: (arg0: string) => string; }; }) {
//     const url = variable.properties.getString("openSound");
//     const radius = variable.properties.getNumber("soundRadius");
//     let volume = 1;
//     if (radius) {
//         const distance = getDistance(variable.properties.mustGetString("openLayer").split("\n"));
//         if (distance > radius) {
//             return;
//         }
//         volume = 1 - distance / radius;
//     }
//     if (url) {
//         WA.sound.loadSound(url).play({
//             volume,
//         });
//     }
// }
// function playCloseSound(variable: { properties: { getString: (arg0: string) => any; getNumber: (arg0: string) => any; mustGetString: (arg0: string) => string; }; }) {
//     const url = variable.properties.getString("closeSound");
//     const radius = variable.properties.getNumber("soundRadius");
//     let volume = 1;
//     if (radius) {
//         const distance = getDistance(variable.properties.mustGetString("closeLayer").split("\n"));
//         if (distance > radius) {
//             return;
//         }
//         volume = 1 - distance / radius;
//     }
//     if (url) {
//         WA.sound.loadSound(url).play({
//             volume,
//         });
//     }
// }
// function getTileLayers(layerNames: any[]) {
//     return layerNames
//         .map((layerName) => layersMap.get(layerName))
//         .filter((layer) => (layer === null || layer === void 0 ? void 0 : layer.type) === "tilelayer");
// }
// function getDistance(layerNames: any[]) {
//     const layers = getTileLayers(layerNames);
//     const boundaries = findLayersBoundaries(layers);
//     const xLayer = ((boundaries.right - boundaries.left) / 2 + boundaries.left) * 32;
//     const yLayer = ((boundaries.bottom - boundaries.top) / 2 + boundaries.top) * 32;
//     return Math.sqrt(Math.pow(playerX - xLayer, 2) + Math.pow(playerY - yLayer, 2));
// }
// function initDoor(variable: apiExtra.VariableDescriptor) {
//     WA.state.onVariableChange(variable.name).subscribe(() => {
//         if (WA.state[variable.name]) {
//             playOpenSound(variable);
//         }
//         else {
//             playCloseSound(variable);
//         }
//         updateDoorLayers(variable);
//     });
//     updateDoorLayers(variable);
// }
// function initDoorstep(layer: { name: any; }, doorVariable: apiExtra.VariableDescriptor, properties: { getString: (arg0: string) => any; getBoolean: (arg0: string) => any; }, assetsUrl: string) {
//     const name = layer.name;
//     let actionMessage: ActionMessage | undefined = undefined;
//     let keypadWebsite: EmbeddedWebsite | undefined = undefined;
//     let inZone = false;
//     const tag = properties.getString("tag");
//     let allowed = true;
//     if (tag && !WA.player.tags.includes(tag)) {
//         allowed = false;
//     }
//     const accessRestricted = !!tag;
//     function displayCloseDoorMessage() {
//         var _a;
//         if (actionMessage) {
//             actionMessage.remove();
//         }
//         actionMessage = WA.ui.displayActionMessage({
//             message: (_a = properties.getString("closeTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to close the door",
//             callback: () => {
//                 WA.state[doorVariable.name] = false;
//                 displayOpenDoorMessage();
//             },
//         });
//     }
//     function displayOpenDoorMessage() {
//         var _a;
//         if (actionMessage) {
//             actionMessage.remove();
//         }
//         actionMessage = WA.ui.displayActionMessage({
//             message: (_a = properties.getString("openTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to open the door",
//             callback: () => {
//                 WA.state[doorVariable.name] = true;
//                 displayCloseDoorMessage();
//             },
//         });
//     }
//     function openKeypad(name) {
//         const boundaries = findLayersBoundaries(getTileLayers(doorVariable.properties.mustGetString("closeLayer").split("\n")));
//         keypadWebsite = WA.room.website.create({
//             name: "doorKeypad" + name,
//             url: assetsUrl + "/keypad.html#" + encodeURIComponent(name),
//             position: {
//                 x: boundaries.right * 32,
//                 y: boundaries.top * 32,
//                 width: 32 * 3,
//                 height: 32 * 4,
//             },
//             allowApi: true,
//         });
//     }
//     function closeKeypad() {
//         if (keypadWebsite) {
//             WA.room.website.delete(keypadWebsite.name);
//             keypadWebsite = undefined;
//         }
//     }
//     WA.room.onEnterLayer(name).subscribe(() => {
//         inZone = true;
//         if (properties.getBoolean("autoOpen") && allowed) {
//             WA.state[doorVariable.name] = true;
//             return;
//         }
//         if (!WA.state[doorVariable.name] &&
//             ((accessRestricted && !allowed) || !accessRestricted) &&
//             (properties.getString("code") || properties.getString("codeVariable"))) {
//             openKeypad(name);
//             return;
//         }
//         if (!allowed) {
//             return;
//         }
//         if (WA.state[doorVariable.name]) {
//             displayCloseDoorMessage();
//         }
//         else {
//             displayOpenDoorMessage();
//         }
//     });
//     WA.room.onLeaveLayer(name).subscribe(() => {
//         inZone = false;
//         if (properties.getBoolean("autoClose")) {
//             WA.state[doorVariable.name] = false;
//         }
//         if (actionMessage) {
//             actionMessage.remove();
//         }
//         closeKeypad();
//     });
//     WA.state.onVariableChange(doorVariable.name).subscribe(() => {
//         if (inZone) {
//             if (!properties.getBoolean("autoClose") && WA.state[doorVariable.name] === true) {
//                 displayCloseDoorMessage();
//             }
//             if (keypadWebsite && WA.state[doorVariable.name] === true) {
//                 closeKeypad();
//             }
//             if (!properties.getBoolean("autoOpen") && WA.state[doorVariable.name] === false) {
//                 displayOpenDoorMessage();
//             }
//         }
//     });
// }
// function playBellSound(variable) {
//     const url = variable.properties.mustGetString("bellSound");
//     const radius = variable.properties.getNumber("soundRadius");
//     let volume = 1;
//     if (radius) {
//         const distance = Math.sqrt(Math.pow(variable.x - playerX, 2) + Math.pow(variable.y - playerY, 2));
//         if (distance > radius) {
//             return;
//         }
//         volume = 1 - distance / radius;
//     }
//     WA.sound.loadSound(url).play({
//         volume,
//     });
// }
// function initBell(variable) {
//     if (WA.state[variable.name] === undefined) {
//         WA.state[variable.name] = 0;
//     }
//     WA.state.onVariableChange(variable.name).subscribe(() => {
//         if (WA.state[variable.name]) {
//             playBellSound(variable);
//         }
//     });
// }
// function initBellLayer(bellVariable, properties, layerName) {
//     let popup = undefined;
//     const bellPopupName = properties.getString("bellPopup");
//     WA.room.onEnterLayer(layerName).subscribe(() => {
//         var _a;
//         if (!bellPopupName) {
//             WA.state[bellVariable] = WA.state[bellVariable] + 1;
//         }
//         else {
//             popup = WA.ui.openPopup(bellPopupName, "", [
//                 {
//                     label: (_a = properties.getString("bellButtonText")) !== null && _a !== void 0 ? _a : "Ring",
//                     callback: () => {
//                         WA.state[bellVariable] = WA.state[bellVariable] + 1;
//                     },
//                 },
//             ]);
//         }
//     });
//     WA.room.onLeaveLayer(layerName).subscribe(() => {
//         if (popup) {
//             popup.close();
//             popup = undefined;
//         }
//     });
// }
// export async function initDoors(assetsUrl) {
//     assetsUrl = assetsUrl !== null && assetsUrl !== void 0 ? assetsUrl : defaultAssetsUrl;
//     const variables = await getVariables();
//     layersMap = await getLayersMap();
//     for (const variable of variables.values()) {
//         if (variable.properties.get("door")) {
//             initDoor(variable);
//         }
//         if (variable.properties.get("bell")) {
//             initBell(variable);
//         }
//     }
//     for (const layer of layersMap.values()) {
//         const properties = new Properties(layer.properties);
//         const doorVariableName = properties.getString("doorVariable");
//         if (doorVariableName && layer.type === "tilelayer") {
//             const doorVariable = variables.get(doorVariableName);
//             if (doorVariable === undefined) {
//                 throw new Error('Cannot find variable "' +
//                     doorVariableName +
//                     '" referred in the "doorVariable" property of layer "' +
//                     layer.name +
//                     '"');
//             }
//             initDoorstep(layer, doorVariable, properties, assetsUrl);
//         }
//         const bellVariable = properties.getString("bellVariable");
//         if (bellVariable) {
//             initBellLayer(bellVariable, properties, layer.name);
//         }
//     }
//     WA.player.onPlayerMove((moveEvent) => {
//         playerX = moveEvent.x;
//         playerY = moveEvent.y;
//     });
// }
// //# sourceMappingURL=doors.js.map

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
