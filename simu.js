indexChanged = function() {} 
JeSuisDieu = function() {}
onChangeCheckBox = function() {}
onEnterSlider = function() {}
onMoveSlider = function() {}


let menu = {
    title: "Native UI",
    subtitle: "Test",
    style: { margin: 4 },
    mouse: true,
    buttons: [
        { text: "Liste", callback: Notification, onIndexChange: indexChanged, description: "My name is Christ Cosmique", type: "list", listData: ["Jésus", "Claude", "Franklin", "Mamadou", 25, "Elene"] },
        { text: "1 Oui", rightText: "200$", callback: JeSuisDieu, callbackData: ["oui"] },
        { text: "2 Non", callback: JeSuisDieu, callbackData: ["Non"] },
        { text: "3 Josef", rightText: "200$", callback: JeSuisDieu, callbackData: ["Josef"] },
        { text: "4 Youri", rightText: "", callback: JeSuisDieu, callbackData: ["Youri"] },
        { text: "5 Oui", rightText: "👍", callback: JeSuisDieu, callbackData: ["oui", "Alfred", { test: "NANANA" }] },
        { text: "6 CheckBox", callback: onChangeCheckBox, type: "checkBox", callbackData: ["check me bb"] },
        { text: "7 Slider", callback: onEnterSlider, onIndexChange: onMoveSlider, type: "slider", range: [-1, 1, 0.1], callbackData: ["slider oui"] },
        { text: "9 Fermer", close: true, description: "Si t'appui là, ça fait des chokapik, et ouai bb. Bon en vrai jsp quoi écrire pour que sa prenne un max de place et que ça fasse plusieurs lignes", },
        { text: "10 Fermer", close: true },
        { text: "11 Fermer", close: true },
        { text: "12 Fermer", close: true },
        { text: "13 Fermer", close: true },
        { text: "14 <span style='color: red'> Fermer </span>", close: true },
    ]
}

renderMenu(menu)