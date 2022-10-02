function Random () {
    while (!(inMenu)) {
        led.toggle(randint(0, 4), randint(0, 4))
        tileDisplay.setMatrixColor(randint(0, 7), randint(0, 7), Kitronik_Zip_Tile.rgb(randint(5, 255), randint(5, 255), randint(5, 255)))
        tileDisplay.show()
        basic.pause(5)
    }
}
function Circles () {
    basic.showIcon(IconNames.Diamond, 10)
}
function IncrementMode () {
    music.playTone(523, music.beat(BeatFraction.Sixteenth))
    if (mode >= modeOptions.length - 1) {
        mode = 0
    } else {
        mode += 1
    }
}
input.onButtonPressed(Button.A, function () {
    if (inMenu) {
        IncrementMode()
    } else {
        Brightness = Brightness + 5
        if (Brightness > 98) {
            Brightness = 98
        }
        tileDisplay.setBrightness(Brightness)
    }
})
input.onButtonPressed(Button.AB, function () {
    music.playTone(988, music.beat(BeatFraction.Sixteenth))
    if (inDemoMode) {
        inDemoMode = false
    }
    if (inMenu) {
        if (modeOptions[mode] == "Demo") {
            inDemoMode = true
            IncrementMode()
        }
    }
    inMenu = !(inMenu)
})
input.onButtonPressed(Button.B, function () {
    if (inMenu) {
        DecrementMode()
    } else {
        Brightness = Brightness - 5
        if (Brightness < 3) {
            Brightness = 3
        }
        tileDisplay.setBrightness(Brightness)
    }
})
function Solid (red: number, green: number, blue: number) {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    while (!(inMenu)) {
        split = randint(1, 360)
        tileDisplay.showRainbow(randint(1, split), randint(split, 360))
        basic.pause(200)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
function DecrementMode () {
    music.playTone(262, music.beat(BeatFraction.Sixteenth))
    if (mode <= 0) {
        mode = modeOptions.length - 1
    } else {
        mode += -1
    }
}
let split = 0
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let Brightness = 0
let inDemoMode = false
let inMenu = false
let modeOptions : string[] = []
let mode = 0
inMenu = true
inDemoMode = false
Brightness = 23
let demoDuration = 10
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
tileDisplay.setBrightness(Brightness)
tileDisplay.clear()
tileDisplay.show()
modeOptions = [
"Rnd",
"Solid",
"Circles",
"Demo"
]
mode = 0
loops.everyInterval(demoDuration * 1000, function () {
    if (inDemoMode) {
        IncrementMode()
        if (modeOptions[mode] == "Demo") {
            IncrementMode()
        }
        inMenu = true
        basic.pause(1000)
        inMenu = false
    }
})
loops.everyInterval(500, function () {
    if (inMenu) {
        basic.clearScreen()
        basic.showString("" + modeOptions[mode], 50)
    }
})
basic.forever(function () {
    while (true) {
        if (!(inMenu)) {
            if (modeOptions[mode] == "Rnd") {
                Random()
            } else if (modeOptions[mode] == "Solid") {
                Solid(125, 125, 0)
            } else if (modeOptions[mode] == "Circles") {
                Circles()
            }
        }
        basic.pause(100)
    }
})
