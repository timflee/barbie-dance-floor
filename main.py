def random():
    pass

def on_logo_pressed():
    pass
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

tileDisplay = Kitronik_Zip_Tile.create_zip_tile_display(1, 1, Kitronik_Zip_Tile.UBitLocations.HIDDEN)
modeOptions = ["Random", "Sweep", "Circles"]
tileDisplay.clear()

def on_forever():
    pass
basic.forever(on_forever)
