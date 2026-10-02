# New Galactic War Cards

This is a mod template. Use it to add new loadouts and tech cards to the Galactic War in
Planetary Annihilation: TITANS (PA). Your cards run on top of the
[Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) mod, which this guide
calls **GWO**. Your mod needs it, and so does every player who uses your mod.

You do **not** need to know how to program. You will edit a few text files by copying the
examples in this guide and changing the labelled parts. The guide assumes that you know
how to play PA. It assumes no knowledge of code, of modding, or of GWO.

## What this template does

Galactic War has two kinds of cards:

- **Loadouts** (also called _start cards_). A loadout is the starting hand that you pick
  before a war begins. Some loadouts are available immediately. Others stay locked until
  you earn them.
- **Tech cards**. These are the upgrades that the game offers you as you fight across the
  galaxy. They can unlock units, change unit stats, and change what your Sub Commanders
  build.

This template gives you a complete mod folder with working examples of both kinds. You
copy the folder, rename it, and fill in the blanks.

> **Note:** A card can use and change the units that come with the game, including the
> TITANS units. It can also change the units of the races and add-ons that GWO supports,
> such as Legion, and of the races that other mods add to GWO. See
> [Cards for another race or an add-on](docs/race-cards.md). A card cannot add a new
> custom unit to Galactic War.

## What you need

- **Planetary Annihilation: TITANS.**
- **Galactic War Overhaul v7.5.0 or later.** To install it, open **Community Mods** from
  the main menu. Find _Galactic War Overhaul_ in the AVAILABLE list, and install it.
  Community Mods updates it for you.
- **A text editor.** Any plain-text editor works, but
  [Visual Studio Code](https://code.visualstudio.com/) (free) is much better. It colours
  the text, and with the [checker](docs/setup.md#installing-the-checker-recommended) it
  underlines your mistakes as you type. This guide assumes Visual Studio Code wherever it
  names a menu.

The pages below tell you when you need other tools. The checker needs Node.js, and
testing needs the free Coherent UI Debugger.

## Start here

Read these four pages in order. Together they take you from an empty folder to a working
card in the game.

1. [Setting up your mod](docs/setup.md): copy the template, give it your own name, and
   install the checker.
2. [How to read the card files](docs/reading-card-files.md): the few marks that you need
   to recognise in a card file.
3. [Your first card](docs/first-card.md): one complete card, from start to finish.
4. [Checking and testing your mod](docs/testing.md): find mistakes, and try your card in
   the game.

## Contents

### Basics

The four pages in [Start here](#start-here).

### Making cards

Use these pages as a reference.

- [Tech cards](docs/tech-cards.md): which example to start from, naming, the parts of a
  card, the `gwoCard.upgradeCard` shortcut, and registering a card.
- [`deal` — how often the card appears](docs/deal.md): chances, conditions, and the
  ready-made weights for naval, commander, Sub Commander, and counter-tech cards.
- [Changing units](docs/changing-units.md): naming units, unlocking them, and changing
  their stats.
- [Loadouts](docs/loadouts.md): loadout IDs, the locked and unlocked lists, and the bank
  that remembers unlocks.
- [Minimum required changes](docs/checklist.md): a checklist to use before you release.
- [Troubleshooting](docs/troubleshooting.md): what to check when something does not
  work.
- [Releasing your mod](docs/releasing.md): publishing, and co-op wars.

### Advanced

Most mods never need these pages.

- [Cards for another race or an add-on](docs/race-cards.md): change one particular unit
  of Legion, Bugs, Exiles, or an add-on.
- [Change what your Sub Commanders build](docs/ai-build-orders.md): AI build orders.
- [Your own deck](docs/decks.md): offer a deck of your own in the Techs picker.
- [Translating your mod](docs/translating.md): show your cards in other languages.
- [Advanced features](docs/advanced.md): your own distances, randomness, co-op helpers,
  how co-op AI players choose cards, and rare card parts.

## Getting help

If something does not work, start with [Troubleshooting](docs/troubleshooting.md). Most
mistakes in a card mod fail without a message. That page lists the usual causes of each
symptom.
