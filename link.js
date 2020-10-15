let registeredCallback = []
let registeredOnIndexChange = []


function createMenu(menuData) {
    SetNuiFocus(true, false)
    SetNuiFocusKeepInput(true)


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
                    } else if (btn.type == "slider"){
                        btn.onIndexChange(data.sliderValue, data.callbackData)
                    }
                });
            }
            menuData.buttons[i].onIndexChangeEvent = btn.onIndexChange.name
        }
    }

    SendNuiMessage(JSON.stringify({
        menuData: menuData
    }))
};


RegisterNuiCallbackType('menu:deleteMenu')
on('__cfx_nui:menu:deleteMenu', (data, cb) => {
    SetNuiFocus(false, false)
});

function deleteMenu() {
    SendNuiMessage(JSON.stringify({
        action: "close"
    }))
};
