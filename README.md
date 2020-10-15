# LMenu

# Introduction

A lot of fivem menu builder already exist, but most of them are LUA one, today I release a WIP menu builder in JS and rendered in HTML CSS via NUI.
The style of this is menu is inspired by nativeUI menu, but you can edits mosts of the parameters in the menu config while building it.
I'm a beginner in html/css/js, I probably made a lot of stupid mistake
There is still a lot of work to do

# How to use it

## fxmanifest:
This part will probably change:
```lua
files {
    'pathToLMenuFolder/ui.html',
    'pathToLMenuFolder/main.js',
    'pathToLMenuFolder/link.js',

    'pathToLMenuFolder/static/*.css',
    'pathToLMenuFolder/static/*.png',
    'pathToLMenuFolder/static/*.ttf'
}

ui_page 'pathToLMenuFolder/ui.html'

client_scripts {
    'pathToLMenuFolder/link.js',
}
```

## Exemple:

A doc will explain everything in a near futur

```js
function JeSuisDieu(data) {
    console.log("JeSuisDieu", data)
}

function Notification(message) {
    SetNotificationTextEntry('STRING')
    AddTextComponentString(message)
    DrawNotification(false, false)
}

function indexChanged(Val, Index) {
    Notification("Index changed to " + Val + " " + Index)
}

function onChangeCheckBox(checked, data) {
    console.log(data)
    if (checked) {
        Notification("CheckBox is now checked")
    } else {
        Notification("CheckBox is now unchecked")
    }
}

function onEnterSlider(value, data) {
    Notification("Slider is at : " + value)
}

function onMoveSlider(value, data) {
    Notification("Slider is now at : " + value)
}

let menu = {
    title: "Native UI",
    subtitle: "Test",
    buttons: [
        { text: "Liste", callback: Notification, onIndexChange: indexChanged, description:"My name is Christ Cosmique", type: "list", listData: ["Jésus", "Claude", "Franklin", "Mamadou", 25, "Elene"]},
        { text: "1 Oui", rightText: "200$", callback: JeSuisDieu, callbackData: ["oui"] },
        { text: "2 Non", callback: JeSuisDieu, callbackData: ["Non"] },
        { text: "3 Josef", rightText: "200$", callback: JeSuisDieu, callbackData: ["Josef"] },
        { text: "4 Youri", rightText: "", callback: JeSuisDieu, callbackData: ["Youri"] },
        { text: "5 Oui", rightText: "👍", callback: JeSuisDieu, callbackData: ["oui", "Alfred", { test: "NANANA" }] },
        { text: "6 CheckBox", callback: onChangeCheckBox, type: "checkBox", callbackData: ["check me bb"] },
        { text: "7 Slider", callback: onEnterSlider, onIndexChange: onMoveSlider, type: "slider", range:[-1,1,0.1], callbackData: ["slider oui"] },
        { text: "9 Fermer", close: true, description: "Si t'appui là, ça fait des chokapik, et ouai bb. Bon en vrai jsp quoi écrire pour que sa prenne un max de place et que ça fasse plusieurs lignes", },
        { text: "10 Fermer", close: true },
        { text: "11 Fermer", close: true },
        { text: "12 Fermer", close: true },
        { text: "13 Fermer", close: true },
        { text: "14 <span style='color: red'> Fermer </span>", close: true },
    ]
}



setTick(() => {
    if (IsControlJustPressed(0, 82 /*;*/)) {
        createMenu(menu)
    }
});
```