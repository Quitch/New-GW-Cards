# New Galactic War Cards

A mod template for use by individuals who want to add new loadouts and tech cards to Planetary Annihilation: TITANS (PA) Galactic War. Requires Galactic War Overhaul to work.

## Requirements

You will be working with JSON and JavaScript files. I recommend the use of [Visual Studio Code](https://code.visualstudio.com/) or similar IDE.

For testing you will need the [Coherent UI Debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip).

## Preparing the mod

Place the `my_card_mod` folder within the `client_mods` folder of your [PA data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176). If this folder does not exist you should create it. You can rename `my_card_mod` to something of your choice. This `my_card_mod` folder is the root of your mod and all further instructions will proceed from there.

Update the following fields in `modinfo.json`:

1. `identifier`
2. `display_name`
3. `description`
4. `author`
5. `scene` - the `gw_start` and `gw_play` URLs should match your `identifier`.

Under `/ui/mods/` change the folder found there to match your `identifier`.

## Creating cards

PA's cards can be found under `{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/cards`

The cards which ship with Galactic War Overhaul, including the updated base game cards, can be found in the [Galactic War Overhaul repository](https://github.com/Quitch/GW-AI-Overhaul/tree/develop/ui/main/game/galactic_war/cards).

For your first card you should take a copy of a card which does something similar to what you want to achieve and use it as a base template. Place the card in your mod's `/ui/main/game/galactic_war/cards` folder. Rename it using a unique name. A typical naming strategy is ACRONYM_EFFECT_UNITTYPE.js e.g. `gwc_damage_bots.js`

Edit the card to achieve the desired effect i.e. draw the rest of the fucking owl.

The `deal` function is used for card distribution. The `buff` function is the adding of units, mods, and AI mods (see GWO cards). The `dull` function is applied after `buff` and is for the removal of units and application of debuffs.

### Setting up a loadout

Open the mod's `start_cards.js` file. This file provides an example of how to load multiple start cards. Change the loadout IDs to match your card's file name, minus the file extension.

Set the `LS_KEY` variable in `bank.js` to something unique. This is where the locked status of your loadouts will be stored in the local storage database.

### Setting up a tech card

Open the mod's `tech_cards.js` file. This file provides an example of how to load multiple tech cards and setup the tooltips for them.

Change the tech IDs to match your card's file name, minus the file extension. Change unit paths to the file path of the unit's JSON, using the structure `/pa/units/SOME_LAYER/SOME_UNIT_NAME/SOME_UNIT_NAME.json`

## Testing your mod

1. Add `--devmode` to your PA [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955).
2. Launch PA.
3. Under Community Mods enable your mod in the INSTALLED list.
4. Return to the Main Menu.
5. Open the Coherent UI Debugger.
6. Click GO.
7. Click Start Page.
8. Change to the Console tab.

During testing you will be checking the debugger for errors. Note that it is expected for PA to generate the following up to once per scene:

- ERROR: _Uncaught TypeError: undefined is not a function_
- WARN: _Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check <http://xhr.spec.whatwg.org/>._

### Start cards

1. Start PA.
2. Go to the Galactic War Loadout screen.
3. Confirm that your loadout is listed, locked, and its hint displayed.
4. Confirm that your card was dealt to your inventory and no errors show in the debugger.
5. In the debugger switch to the Resources tab.
6. Expand local storage.
7. Click on `coui://`.
8. If the key `gwaio_bank` does not exist then right-click in the empty line at the bottom and create it.
9. Right-click `gwaio_bank` and choose to edit the value, adding your start card ID in the format `{"id":"your_card_id"}` - the final result should look something like `{"startCards":[{"id":"some_card_you_previously_unlocked"},{"id":"your_card_id"}]}`.
10. Press Enter to save your change.
11. Press F5 to refresh the loadout screen.
12. Confirm that your loadout is unlocked and selectable.

### Tech cards

1. Start PA.
2. Start a new Galactic War.
3. Click the X in the bottom left-hand corner.
4. Enter your card ID into the panel.
5. Click the + icon to the right of the text entry box.
6. Confirm that your card was dealt to your inventory and no errors show in the debugger.
7. In the debugger check the `Preserve log` box.
8. Begin a fight.
9. Confirm that no unexpected errors show in the debugger.
10. Use the sandbox to spawn your modified units and check that they operate correctly.

## Releasing your mod

Update the following fields:

1. `version` - consider [semantic versioning](https://semver.org/).
2. `date`
3. `build` - match the contents of the version file at the root of PA.
4. `forum` - URL of the mod's forum thread.
5. `icon` - URL of a publicly accessible png file.
