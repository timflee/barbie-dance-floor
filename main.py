def Random():
    while not (inMenu):
        led.toggle(randint(0, 4), randint(0, 4))
        tileDisplay.set_matrix_color(randint(0, 7),
            randint(0, 7),
            Kitronik_Zip_Tile.rgb(randint(5, 255), randint(5, 255), randint(5, 255)))
        tileDisplay.show()
        basic.pause(200)
def Circles():
    basic.show_icon(IconNames.DIAMOND, 10)
def IncrementMode():
    global mode
    if inMenu or inDemoMode:
        music.play_tone(523, music.beat(BeatFraction.SIXTEENTH))
        if mode >= len(modeOptions) - 1:
            mode = 0
        else:
            mode += 1

def on_button_pressed_a():
    DecrementMode()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    IncrementMode()
input.on_button_pressed(Button.B, on_button_pressed_b)

def Solid(red: number, green: number, blue: number):
    basic.show_leds("""
        # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
    """)
    tileDisplay.show_rainbow(1, 360)
    while not (inMenu):
        basic.pause(50)

def on_logo_pressed():
    global inDemoMode, inMenu
    music.play_tone(988, music.beat(BeatFraction.SIXTEENTH))
    if inDemoMode:
        inDemoMode = False
    if inMenu:
        if modeOptions[mode] == "Demo":
            inDemoMode = True
            IncrementMode()
    inMenu = not (inMenu)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def DecrementMode():
    global mode
    if inMenu or inDemoMode:
        music.play_tone(262, music.beat(BeatFraction.SIXTEENTH))
        if mode <= 0:
            mode = len(modeOptions) - 1
        else:
            mode += -1
tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = None
inDemoMode = False
inMenu = False
modeOptions: List[str] = []
mode = 0
inMenu = True
inDemoMode = False
demoDuration = 5
tileDisplay = Kitronik_Zip_Tile.create_zip_tile_display(1, 1, Kitronik_Zip_Tile.UBitLocations.HIDDEN)
tileDisplay.set_brightness(20)
tileDisplay.clear()
tileDisplay.show()
modeOptions = ["Rnd", "Solid", "Circles", "Demo"]
mode = 0

def on_every_interval():
    global inMenu
    if inDemoMode:
        IncrementMode()
        if modeOptions[mode] == "Demo":
            IncrementMode()
        inMenu = True
        basic.pause(1000)
        inMenu = False
loops.every_interval(demoDuration * 1000, on_every_interval)

def on_every_interval2():
    if inMenu:
        basic.clear_screen()
        basic.show_string("" + modeOptions[mode], 50)
loops.every_interval(500, on_every_interval2)

def on_forever():
    while True:
        if not (inMenu):
            if modeOptions[mode] == "Rnd":
                Random()
            elif modeOptions[mode] == "Solid":
                Solid(125, 125, 0)
            elif modeOptions[mode] == "Circles":
                Circles()
        basic.pause(100)
basic.forever(on_forever)
