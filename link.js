let registeredCallback = []
let registeredOnIndexChange = []

let menus = {}
let currentlyOpened = null


// -------------------------------------------- required function for lib usage --------------------------------------- //

function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// -------------------------------------------- Lib function --------------------------------------- //

function createMenu(menuData) {
    for (i in menuData.buttons){
        let btn = menuData.buttons[i]
        if (btn.callback) {
            if (registeredCallback.indexOf('callback:' + btn.callback.name) == -1) {
                registeredCallback.push('callback:' + btn.callback.name)
                RegisterNuiCallbackType('callback:' + btn.callback.name)
                on('__cfx_nui:callback:' + btn.callback.name, (data, cb) => {
                    if (data.type == "list") {
                        btn.callback(data.selectedInList, data.listIndex, data.callbackData)
                    } else if (data.type == "checkBox") {
                        btn.callback(data.checked, data.callbackData)
                    } else if (data.type == "slider") {
                        btn.callback(data.sliderValue, data.callbackData)
                    } else {
                        btn.callback(data.callbackData)
                    }
                });
            }  
            menuData.buttons[i].callbackEvent = btn.callback.name
        }
        if (btn.onIndexChange) {
            if (registeredOnIndexChange.indexOf('onIndexChange:' + btn.onIndexChange.name) == -1) {
                registeredOnIndexChange.push('onIndexChange:' + btn.onIndexChange.name)
                RegisterNuiCallbackType('onIndexChange:' + btn.onIndexChange.name)
                on('__cfx_nui:onIndexChange:' + btn.onIndexChange.name, (data, cb) => {
                    if (btn.type == "list") {
                        btn.onIndexChange(data.selectedInList, data.listIndex, data.callbackData)
                    } else if (btn.type == "colors") {
                        btn.onIndexChange(data.color, data.colorIndex, data.callbackData)
                    } else if (btn.type == "slider"){
                        btn.onIndexChange(data.sliderValue, data.callbackData)
                    }
                });
            }
            menuData.buttons[i].onIndexChangeEvent = btn.onIndexChange.name
        }
    }

    if (!menuData.id) {
        menuData.id = randomString(20)
    } 
    menus[menuData.id] = menuData

    return menuData
};



function openMenu(menuId) {
    SendNuiMessage(JSON.stringify({
        menuData: menus[menuId]
    }))
}

function closeMenu() {
    SendNuiMessage(JSON.stringify({
        action: "close"
    }))
};


function deleteMenu(id) {
    if (menus[id].opened) {
        closeMenu()
    }
    delete menus[id]
};


function getCurrentMenuData() { // warning this function will return the old state of the menu (state of the menu only synced on close)
    if (!currentlyOpened) {
        return null
    }
    return menus[currentlyOpened]
};


// --------------------------------------------  STATIC CALLBACK --------------------------------------- //

RegisterNuiCallbackType('menu:deletedMenu')
on('__cfx_nui:menu:deletedMenu', (data, cb) => {
    SetNuiFocus(false, false)
    console.log("Closing "+data.id)
    menus[data.id] = data
    menus[data.id].opened = false
});

SetNuiFocus(false, false)
RegisterNuiCallbackType('menu:openedMenu')
on('__cfx_nui:menu:openedMenu', (data, cb) => {
    SetNuiFocus(true, data.mouse)
    SetNuiFocusKeepInput(!data.mouse)
    console.log("Opened " + data.id)
    menus[data.id] = data
    menus[data.id].opened = true
    currentlyOpened = data.id
});