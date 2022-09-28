function random () {
    while (!(inMenu)) {
        basic.pause(100)
    }
}
input.onButtonPressed(Button.A, function () {
    if (inMenu && mode == 0) {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    inMenu = !(inMenu)
    if (inMenu) {
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
let inMenu = false
let mode = 0
let modeOptions: string[] = []
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
modeOptions = ["Random", "Sweep", "Circles"]
mode = 0
inMenu = true
tileDisplay.clear()
tileDisplay.show()
basic.forever(function () {
	
})
