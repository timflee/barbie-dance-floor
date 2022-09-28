function Random () {
    while (!(inMenu)) {
        led.toggle(randint(0, 4), randint(0, 4))
        basic.pause(10)
    }
}
function Circles () {
    basic.showIcon(IconNames.Diamond, 10)
}
function IncrementMode () {
    if (inMenu || inDemoMode) {
        music.playTone(523, music.beat(BeatFraction.Sixteenth))
        if (mode >= modeOptions.length - 1) {
            mode = 0
        } else {
            mode += 1
        }
    }
}
input.onButtonPressed(Button.A, function () {
    DecrementMode()
})
input.onButtonPressed(Button.B, function () {
    IncrementMode()
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
        basic.pause(10)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
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
function DecrementMode () {
    if (inMenu || inDemoMode) {
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
        if (mode <= 0) {
            mode = modeOptions.length - 1
        } else {
            mode += -1
        }
    }
}
let inDemoMode = false
let inMenu = false
let mode = 0
let modeOptions : string[] = []
inMenu = true
inDemoMode = false
let demoDuration = 5
let tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
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
