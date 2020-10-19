let currentMenu = null

let basicMenuStyle = {
    margin: 2, //(in %)
    width: 25, //(in %)
    buttonHeight: 4, //(in %)
    banner: { img: "./static/interaction_bgd.png", ratio : 4/1, r: 20, g: 20, b: 255, a: 0.9, titleColor : "white"},
    subtitle: { ratio: 13 / 1, r1: 5, g1: 5, b1: 5, a1: 1, r2: 5, g2: 5, b2: 5, a2: 0.9, textR:93, textG:182, textB: 229 },
    backgroundColor: { r1: 5, g1: 5, b1: 5, a1: 0.7, r2: 5, g2: 5, b2: 5, a2: 0.3},
    buttons : {
        selected: { r1: 230, g1: 230, b1: 230, a1: 1.0, r2: 230, g2: 230, b2: 230, a2: 0.75, textColor : "rgb(10,10,10)"},
        unselected: { r1: 230, g1: 230, b1: 230, a1: 0.0, r2: 230, g2: 230, b2: 230, a2: 0.0, textColor: "white"}
    },
    sliderStyle: { r1: 4, g1: 32, b1: 57, a1: 1.0, r2: 56, g2: 116, b2: 200, a2: 1.0, textColor: "rgb(10,10,10)" },
    navBar: { display: true, margin : 2 /*in %*/, r1: 5, g1: 5, b1: 5, a1: 0.75, r2: 5, g2: 5, b2: 5, a2: 0.73},
    sound: {

    },
    maxElement: 10
}



function renderMenu(menuData) {
    let menuStyle = Object.assign({}, basicMenuStyle, menuData.style);
    let root = document.getElementById("root")

    $("#root").css({
        "display": "block",
    }); 

    $("#root").css({"margin":menuStyle.margin+"%"});

    menuData.style = menuStyle
    currentMenu = menuData

    if (menuStyle.banner && menuStyle.banner.a) {
        var banner = document.createElement("div");
        banner.setAttribute("id", "banner");
        root.appendChild(banner);

        let width = window.screen.width * (menuStyle.width / 100)
        let height = width / menuStyle.banner.ratio

        $("#banner").css({ 
            "width": width + "px", 
            "height": height + "px",
            "background-color": "rgba(" + menuStyle.banner.r + "," + menuStyle.banner.g + "," + menuStyle.banner.b + "," + menuStyle.banner.a+")",
        });

        if (menuStyle.banner.img) {
            $("#banner").css({ "background-color": "rgba(" + menuStyle.banner.r + "," + menuStyle.banner.g + "," + menuStyle.banner.b + ",0.0)"});
            var elem = document.createElement("img");
            elem.setAttribute("src", menuStyle.banner.img);
            elem.setAttribute("width", width + "px");
            elem.setAttribute("height", height + "px");
            elem.setAttribute("height", height + "px");
            elem.style.opacity = menuStyle.banner.a;
            banner.appendChild(elem);
        }

        var title = document.createElement("h1");
        title.setAttribute("id", "title");
        title.append(menuData.title);
        banner.appendChild(title);

        
        let deltaHeight = window.screen.width * (menuStyle.margin / 100)
        $("#title").css({
            'position': 'absolute',
            'top': deltaHeight +"px",
            'width': width + "px",
            'line-height': height + "px",
            'text-align': 'center',
            'color': menuStyle.banner.titleColor,
            'font-size': height/1.5 + "px",
        });
    }

    if (menuStyle.subtitle) {
        var subtitle = document.createElement("div");
        subtitle.setAttribute("id", "subtitle");
        
        root.appendChild(subtitle);

        let width = window.screen.width * (menuStyle.width / 100)
        let height = width / menuStyle.subtitle.ratio

        let color = menuStyle.subtitle
        $("#subtitle").css({
            "width": width + "px",
            "height": height + "px",
            "background-image": "linear-gradient(90deg, rgba(" + color.r1 + "," + color.g1 + "," + color.b1 + "," + color.a1 + "), rgba(" + color.r2 + "," + color.g2 + "," + color.b2 + "," + color.a2 +"))",
        });

        var subtitleText = document.createElement("h2");
        subtitleText.setAttribute("id", "subtitleText");
        subtitleText.append(menuData.subtitle);
        subtitle.appendChild(subtitleText);

        $("#subtitleText").css({
            'top': menuStyle.margin+ "%",
            'margin-left' : "2%",
            'width': width + "px",
            'line-height': height + "px",
            'color': "rgb(" + color.textR + "," + color.textG + "," + color.textB + ")",
            'font-size': height/2 + "px",
        });
    }

    let width = window.screen.width * (menuStyle.width / 100)

    let top = window.screen.width * (menuStyle.margin / 100)

    if (menuStyle.banner && menuStyle.banner.a) {
        top += width / menuStyle.banner.ratio
    }
    if (menuStyle.subtitle) {
        top += width / menuStyle.subtitle.ratio
    }
    let buttonBackgroundSize = menuStyle.buttonHeight * currentMenu.buttons.length
    if (currentMenu.buttons.length > menuStyle.maxElement) {
        buttonBackgroundSize = menuStyle.buttonHeight * menuStyle.maxElement
    }
    top += window.screen.height * (buttonBackgroundSize / 100)

    if (menuStyle.navBar.display) {
        top += window.screen.height * (menuStyle.buttonHeight / 100)
    }

    top += 2 //to have a little margin
    
    var descriptionArea = document.createElement("div");
    descriptionArea.setAttribute("id", "description");

    root.appendChild(descriptionArea);

    width = window.screen.width * (menuStyle.width / 100)

    let color = menuStyle.backgroundColor
    $("#description").css({
        "display": "none",
        "position": "absolute",
        "top": top+ "px",
        "width": width + "px",
        "background-image": "linear-gradient(180deg, rgba(" + color.r1 + "," + color.g1 + "," + color.b1 + "," + color.a1 + "), rgba(" + color.r2 + "," + color.g2 + "," + color.b2 + "," + color.a2 + "))",
    });

    var descriptionText = document.createElement("h4");
    descriptionText.setAttribute("id", "descriptionText");
    descriptionArea.appendChild(descriptionText);

    let buttonColor = menuStyle.buttons.unselected
    $("#descriptionText").css({
        "margin": "1%",
        "color": buttonColor.textColor,
        "opacity" : 0.8,
        "text-align": "justify",
        'font-size': (window.screen.height * (menuStyle.buttonHeight/ 100))  / 2.5 + "px",
    });


    if (menuData.buttons) {
        renderButton()
    }
}



function renderButton() {
    if (!currentMenu) {
        return
    }
    let menuStyle = currentMenu.style
    let menuData = currentMenu

    $('#elements').remove();

    let buttonBackgroundSize = menuStyle.buttonHeight * currentMenu.buttons.length
    if (currentMenu.buttons.length > menuStyle.maxElement) {
        buttonBackgroundSize = menuStyle.buttonHeight * menuStyle.maxElement
    }

    var elementsArea = document.createElement("div");
    elementsArea.setAttribute("id", "elements");

    root.appendChild(elementsArea);

    let width = window.screen.width * (menuStyle.width / 100)
    let height = window.screen.height * (buttonBackgroundSize / 100)

    let color = menuStyle.backgroundColor
    $("#elements").css({
        "width": width + "px",
        "height": height + "px",
        "background-image": "linear-gradient(180deg, rgba(" + color.r1 + "," + color.g1 + "," + color.b1 + "," + color.a1 + "), rgba(" + color.r2 + "," + color.g2 + "," + color.b2 + "," + color.a2 + "))",
    });

    for (let k in menuData.buttons) {
        menuData.selectedButton = menuData.selectedButton || 0
        let i = parseInt(k)
        let minPos = menuData.selectedButton - menuStyle.maxElement + 1
        if (minPos < 0) {
            minPos = 0
        }
        let maxPos = menuStyle.maxElement
        if (menuData.selectedButton > menuStyle.maxElement - 2) {
            maxPos = menuData.selectedButton + 1
        }
        if (menuData.selectedButton == menuData.buttons.length - 1) {
            minPos = menuData.selectedButton - menuStyle.maxElement + 1
        }

        if (i >= minPos && i < maxPos) {
            let button = currentMenu.buttons[k]

            var buttonElement = document.createElement("div");
            buttonElement.setAttribute("class", "element");
            buttonElement.setAttribute("id", "button" + i);

            elementsArea.appendChild(buttonElement);

            let width = window.screen.width * (menuStyle.width / 100)
            let height = window.screen.height * (menuStyle.buttonHeight / 100)


            let buttonColor = menuStyle.buttons.unselected
            if (currentMenu.selectedButton == k) {
                buttonColor = menuStyle.buttons.selected
            }


            $("#button" + i).css({
                "display": "flex",
                "width": width*0.97 + "px",
                "height": height + "px",
                "color": buttonColor.textColor,
                "paddingLeft": '1.5%',
                "paddingRight": '1.5%',
                "background-image": "linear-gradient(90deg, rgba(" + buttonColor.r1 + "," + buttonColor.g1 + "," + buttonColor.b1 + "," + buttonColor.a1 + "), rgba(" + buttonColor.r2 + "," + buttonColor.g2 + "," + buttonColor.b2 + "," + buttonColor.a2 + "))",
            });


            var buttonTextElement = document.createElement("h3");
            buttonTextElement.setAttribute("id", "buttonText" + i);

            buttonElement.appendChild(buttonTextElement);

            $("#buttonText" + i).html(button.text)

            $("#buttonText" + i).css({
                "display": "block",
                "height": height + "px",
                "color": buttonColor.textColor,
                "width": width*0.75 + "px", //max as 75% of the button
                'line-height': height + "px",
                'font-size': height / 2 + "px",
            });


            if (button.type == "checkBox") {
                var buttonRightTextElement = document.createElement("h3");
                buttonRightTextElement.setAttribute("id", "buttonRightText" + i);

                buttonElement.appendChild(buttonRightTextElement);

                if (button.checked) {
                    buttonRightTextElement.append("🗹")
                } else {
                    buttonRightTextElement.append("☐")
                }
                    
                $("#buttonRightText" + i).css({
                    "position": "relative",
                    "display": "block",
                    "width": width * 0.97 + "px",
                    "top": "0 px",
                    "height": height + "px",
                    "color": buttonColor.textColor,
                    'line-height': height + "px",
                    'font-size': height/1.5 + "px",
                    'text-align': 'right'
                });
            } else if (button.type == "list") {
                var buttonRightTextElement = document.createElement("h3");
                buttonRightTextElement.setAttribute("id", "buttonRightText" + i);

                buttonElement.appendChild(buttonRightTextElement);

                button.listIndex = button.listIndex || 0
                button.selectedInList = button.listData[button.listIndex]

                buttonRightTextElement.append("<  " + button.selectedInList+"  >")
                $("#buttonRightText" + i).css({
                    "position": "relative",
                    "display": "block",
                    "width": width * 0.97 + "px",
                    "top": "0 px",
                    "height": height + "px",
                    "color": buttonColor.textColor,
                    'line-height': height + "px",
                    'font-size': height / 2 + "px",
                    'text-align': 'right'
                });
            } else if (button.type == "slider") {
                var buttonRightElement = document.createElement("div");
                buttonRightElement.setAttribute("id", "slider" + i);
                buttonElement.appendChild(buttonRightElement);


                button.sliderValue = button.sliderValue || (button.range[0] + button.range[1]) / 2
                var SliderElement = document.createElement("input");
                SliderElement.setAttribute("id", "sliderBar"+i);
                SliderElement.setAttribute("type", "range");
                SliderElement.setAttribute("min", button.range[0]);
                SliderElement.setAttribute("max", button.range[1]);
                SliderElement.setAttribute("step", button.range[2]);
                SliderElement.setAttribute("value", button.sliderValue);
                buttonElement.appendChild(SliderElement);

                let color = menuStyle.sliderStyle

                document.styleSheets[1].addRule("::-webkit-slider-runnable-track", "background : rgba(" + color.r1 + "," + color.g1 + "," + color.b1 + "," + color.a1 + ");");
                document.styleSheets[1].addRule("::-webkit-slider-runnable-track", "height : 30%");
                document.styleSheets[1].addRule("::-webkit-slider-thumb", "background : rgba(" + color.r2 + "," + color.g2 + "," + color.b2 + "," + color.a2 + ");");
                document.styleSheets[1].addRule("::-webkit-slider-thumb", "margin-top: -2.1%;"); 
                

                $("#slider" + i).css({
                    "position": "relative",
                    "display": "block",
                    "width": width * 0.97 + "px",
                    "top": "0 px",
                    "height": height + "px",
                    "color": buttonColor.textColor,
                    'line-height': height + "px",
                    'font-size': height / 2 + "px",
                    'text-align': 'right'
                });
            } else if (button.rightText) {
                var buttonRightTextElement = document.createElement("h3");
                buttonRightTextElement.setAttribute("id", "buttonRightText" + i);

                buttonElement.appendChild(buttonRightTextElement);

                buttonRightTextElement.append(button.rightText)
                $("#buttonRightText" + i).css({
                    "position": "relative",
                    "display": "block",
                    "width": width * 0.97 + "px",
                    "top": "0 px",
                    "height": height + "px",
                    "color": buttonColor.textColor,
                    'line-height': height + "px",
                    'font-size': height / 2 + "px",
                    'text-align': 'right'
                });
            } 

            if (currentMenu.selectedButton == k) {
                if (button.description) {
                    $("#descriptionText").html(button.description)
                    $("#description").css({
                        "display": "block",
                    });
                } else {
                    $("#description").css({
                        "display": "none",
                    });
                }
            }
        }    
    }

    if (menuStyle.navBar.display) {
        var navbarElement = document.createElement("div");
        navbarElement.setAttribute("class", "element");
        navbarElement.setAttribute("id", "navbar");

        elementsArea.appendChild(navbarElement);

        let width = window.screen.width * (menuStyle.width / 100)
        let height = window.screen.height * (menuStyle.buttonHeight / 100)

        let color = menuStyle.navBar
        $("#navbar").css({
            "width": width + "px",
            "height": height + "px",
            "background-image": "linear-gradient(180deg, rgba(" + color.r1 + "," + color.g1 + "," + color.b1 + "," + color.a1 + "), rgba(" + color.r2 + "," + color.g2 + "," + color.b2 + "," + color.a2 + "))",
        }); 

        var navbarImage = document.createElement("img");
        navbarImage.setAttribute("id", "navbarImage");
        navbarImage.setAttribute("src", "./static/shop_arrows_upanddown.png");

        navbarElement.appendChild(navbarImage);

        $("#navbarImage").css({
            "display": "block",
            "width": height + "px",
            "margin-left": "auto",
            "margin-right": "auto",
        }); 
    }
}

function playAudio(src) {
    $('#menu-sound').attr("src", src);
    $('#menu-sound').trigger('play')
}


document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
    if (currentMenu) {
        let currentTs = new Date().getTime()
        if (e.key == "ArrowUp") {
            currentMenu.lastInput = currentTs
            currentMenu.selectedButton = currentMenu.selectedButton - 1
            if (currentMenu.selectedButton < 0) {
                currentMenu.selectedButton = currentMenu.buttons.length - 1
            }
            
        } else if (e.key == "ArrowDown") {
            currentMenu.lastInput = currentTs

            currentMenu.selectedButton = currentMenu.selectedButton + 1
            if (currentMenu.selectedButton > currentMenu.buttons.length - 1) {
                currentMenu.selectedButton = 0
            }

        } else if (e.key == "Enter") {
            let button = currentMenu.buttons[currentMenu.selectedButton]
            currentMenu.lastInput = currentTs

            if (button.type == "checkBox") {
                button.checked = !button.checked
            }
            if (button.callbackEvent) {
                fetch(`https://${GetParentResourceName()}/callback:${button.callbackEvent}`, { "method": "POST", "body": JSON.stringify(button)});
            }
            if (button.close) {
                closeMenu()
            } 
            
        } else if (e.key == "ArrowRight") {
            let button = currentMenu.buttons[currentMenu.selectedButton]
            if (button.type == "list" ) {
                currentMenu.lastInput = currentTs
                if (button.listData) {
                    let posInList = button.listIndex
                    let list = button.listData
                    posInList = posInList + 1
                    if (posInList > list.length-1) {
                        posInList = 0
                    }
                    button.listIndex = posInList
                    button.selectedInList = button.listData[button.listIndex]

                    if (button.onIndexChangeEvent) {
                        fetch(`https://${GetParentResourceName()}/onIndexChange:${button.onIndexChangeEvent}`, { "method": "POST", "body": JSON.stringify(button) });
                    }
                }
            } else if (button.type == "slider") {
                currentMenu.lastInput = currentTs
                let value = currentMenu.buttons[currentMenu.selectedButton].sliderValue
                let range = currentMenu.buttons[currentMenu.selectedButton].range
                value += range[2]
                if (value>range[1]) {
                    value = range[1]
                }
                currentMenu.buttons[currentMenu.selectedButton].sliderValue = value

                if (button.onIndexChangeEvent) {
                    fetch(`https://${GetParentResourceName()}/onIndexChange:${button.onIndexChangeEvent}`, { "method": "POST", "body": JSON.stringify(button) });
                }
            }
        } else if (e.key == "ArrowLeft") {
            let button = currentMenu.buttons[currentMenu.selectedButton]
            if (button.type == "list") {
                currentMenu.lastInput = currentTs

                if (button.listData) {
                    let posInList = button.listIndex
                    let list = button.listData
                    posInList = posInList - 1
                    if (posInList < 0) {
                        posInList = list.length-1
                    }
                    button.listIndex = posInList
                }
                button.selectedInList = button.listData[button.listIndex]

                if (button.onIndexChangeEvent) {
                    fetch(`https://${GetParentResourceName()}/onIndexChange:${button.onIndexChangeEvent}`, { "method": "POST", "body": JSON.stringify(button) });
                }
            } else if (button.type == "slider") {
                currentMenu.lastInput = currentTs
                let value = currentMenu.buttons[currentMenu.selectedButton].sliderValue
                let range = currentMenu.buttons[currentMenu.selectedButton].range
                value -= range[2]
                if (value < range[0]) {
                    value = range[0]
                }
                currentMenu.buttons[currentMenu.selectedButton].sliderValue = value
            
                if (button.onIndexChangeEvent) {
                    fetch(`https://${GetParentResourceName()}/onIndexChange:${button.onIndexChangeEvent}`, { "method": "POST", "body": JSON.stringify(button) });
                }
            }
        }
        renderButton()
    }
}

function closeMenu() {
    fetch(`https://${GetParentResourceName()}/menu:deletedMenu`, { "method": "POST", "body": JSON.stringify(currentMenu) });

    currentMenu = null
    $("#root").css({
        "display": "none",
    }); 
    $('#root').empty();
}

// --- THIS IS TO MAKE THE BRIDGE --- //


$(document).ready(function () {
    // Listen for NUI Events
    window.addEventListener('message', function (event) {
        if (event.data.action == "closeMenu") {
            closeMenu()
        }
        if (event.data.menuData) {
            if (currentMenu) {
                closeMenu()
            }
            renderMenu(event.data.menuData)
            fetch(`https://${GetParentResourceName()}/menu:openedMenu`, { "method": "POST", "body": JSON.stringify(currentMenu) });
        }
    });
});