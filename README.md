# New Galactic War Cards

A mod template for use by individuals who want to add new loadouts and tech cards to Galactic War. Requires Galactic War Overhaul to work.

## Requirements

You will be working with JSON and JavaScript files. I recommend the use of [Visual Studio Code](https://code.visualstudio.com/) or similar IDE.

## Preparing the mod

Place the `my_card_mod` folder within the `client_mods` folder of your [data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176). If this folder does not exist you should create it. You can rename `my_card_mod` to something of your choice.

This folder is the root of your mod and all further instructions will proceed from there.

Update the following fields in `modinfo.json`:

1. Update `identifier`
2. Update `display_name`
3. Update `description`
4. Add your name to `author`
5. Update the `gw_start` and `gw_play` URLs to match your `identifier`

Under `/ui/mods/` change the folder found there to match your `identifier`

When you are ready to release you will need to:

## Creating cards

PA's cards can be found under `/media/ui/main/game/galactic_war/cards`

The cards which ship with Galactic War Overhaul, including the updated base game cards, can be found on the [Galactic War Overhaul repository on GitHub](https://github.com/Quitch/GW-AI-Overhaul/tree/develop/ui/main/game/galactic_war/cards).

For your first card you should take a copy of a card which does something similar to what you want to achieve and use it as a base template. Place the card in the mod's `/ui/main/game/galactic_war/cards` folder. Rename it use a unique name. A typical naming strategy is ACRONYM_EFFECT_UNITTYPE.js e.g. `gwc_damage_bots.js`

Edit the card to achieve the desired effect i.e. draw the rest of the owl.

The `deal` function is used for card distribution. The `buff` function is the added of units, mods, and aimods (see GWO cards). The `dull` function is applied after `buff` and is for the removal of units and debuffs.

## Releasing your mod

1.
1. Update the `version` - consider [semantic versioning](https://semver.org/)
1. Update `date`
1. Update `build` to match the contents of the version file at the root of PA
1. Update `forum` to link to a forum thread where user
1. Under /ui/mods/ rename the folder to match the unique ID you've given your mod.
