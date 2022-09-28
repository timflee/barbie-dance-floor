function Random () {
    while (!(inMenu)) {
        basic.pause(100)
    }
}
input.onButtonPressed(Button.A, function () {
    if (inMenu) {
        if (mode <= 0) {
            mode = modeOptions.length - 1
        } else {
            mode += -1
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (inMenu) {
        if (mode >= modeOptions.length - 1) {
            mode = 0
        } else {
            mode += 1
        }
    }
})
function Solid (num: number, num2: number, num3: number) {
    tileDisplay.showColor(Kitronik_Zip_Tile.rgb(255, 255, 255))
    tileDisplay.show()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    inMenu = !(inMenu)
    if (!(inMenu)) {
        if (modeOptions[mode] == "Random") {
            Random()
        } else if (modeOptions[mode] == "Solid") {
            Solid(125, 125, 0)
        }
    }
})
let inMenu = false
let mode = 0
let modeOptions: string[] = []
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
modeOptions = [
"Random",
"Sweep",
"Circles",
"Solid",
"Demo"
]
mode = 0
inMenu = true
tileDisplay.clear()
tileDisplay.show()
loops.everyInterval(500, function () {
    if (inMenu) {
        tileDisplay.clear()
        tileDisplay.clear()
        tileDisplay.scrollText(
        modeOptions[mode],
        Kitronik_Zip_Tile.TextDirection.Left,
        25,
        Kitronik_Zip_Tile.TextStyle.None,
        Kitronik_Zip_Tile.colors(ZipLedColors.White),
        Kitronik_Zip_Tile.colors(ZipLedColors.White)
        )
    }
})
basic.forever(function () {
	
})
