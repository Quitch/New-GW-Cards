# New Galactic War Cards

This is a mod template. Use it to add new loadouts and tech cards to the Galactic War in
Planetary Annihilation: TITANS (PA). Your cards run on top of the
[Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) mod, which this guide
calls **GWO**. Your mod needs it, and so does every player who uses your mod.

You do **not** need to know how to program. You will edit a few text files by copying the
examples in this guide and changing the labelled parts. The guide assumes that you know
how to play PA. It assumes no knowledge of code, of modding, or of GWO.

**New here? Read these sections in order:**

1. [Requirements](#requirements)
2. [Preparing the mod](#preparing-the-mod)
3. [How to read the card files](#how-to-read-the-card-files)
4. [Your first card](#your-first-card)
5. [Testing your mod](#testing-your-mod)

Use the rest of the guide as a reference. Look things up in it when you need them.

## Contents

1. [What this template does](#what-this-template-does)
2. [Requirements](#requirements)
3. [Preparing the mod](#preparing-the-mod)
4. [How to read the card files](#how-to-read-the-card-files)
5. [Understanding the pieces](#understanding-the-pieces)
6. [Your first card](#your-first-card)
7. [Creating a card](#creating-a-card)
8. [Minimum required changes](#minimum-required-changes)
9. [Feature reference](#feature-reference)
10. [Advanced features](#advanced-features)
11. [Checking your work](#checking-your-work)
12. [Testing your mod](#testing-your-mod)
13. [Translating your mod](#translating-your-mod)
14. [Releasing your mod](#releasing-your-mod)

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
> [Cards for another race or an add-on](#cards-for-another-race-or-an-add-on). A card
> cannot add a new custom unit to Galactic War.

## Requirements

- **Planetary Annihilation: TITANS.**
- **Galactic War Overhaul.** Install it in the game: open **Community Mods** from the main
  menu, find _Galactic War Overhaul_ in the AVAILABLE list, and install it.
- **A text editor.** Any plain-text editor works, but
  [Visual Studio Code](https://code.visualstudio.com/) (free) is much better. It colours
  the text, and with the checker described below it underlines your mistakes as you type.
  This guide assumes Visual Studio Code wherever it names a menu.
- **The Coherent UI Debugger**, for testing. It is a free tool that shows you the messages
  that the game's menus print.
  [Download the debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip)
  and unzip it anywhere. To let it connect to PA, add `--coherent_port=9999` to the game's Steam
  launch options (in Steam, right-click the game → **Properties** → **Launch Options**).
- **Optional: [Node.js](https://nodejs.org/).** The template includes a checker that reads
  your card files and reports mistakes before you start the game. The checker needs
  Node.js. You don't have to install it, but we recommend it.
  [Checking your work](#checking-your-work) explains how.

### Two folders that you need to find

The guide refers to two folders on your computer.

- **The PA data folder.** Your mods live here. On Windows it is
  `%LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation`. Paste that into the address
  bar of File Explorer to open it. For other systems, see
  [where is my PA data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176).
- **The PA install folder**, which this guide writes as `{PA_INSTALL_DIRECTORY}`. It holds
  the game's own files, which you read to find unit names, stats and icons. To open it, go
  to Steam, right-click the game, and choose **Manage** → **Browse local files**. **Never
  change anything in this folder.** Steam overwrites it on every update.

## Preparing the mod

1. Open your PA data folder, and then the `client_mods` folder inside it. If
   `client_mods` does not exist, create it.
2. Get your own copy of this template into `client_mods`. There are two ways. Choose one
   now, because it decides how you release the mod later.

   - **Download the files (easiest).** On the template's
     [GitHub page](https://github.com/Quitch/New-GW-Cards), click **Code** and then
     **Download ZIP**. Unpack the ZIP into `client_mods`, and rename the unpacked folder to
     a name of your choice, such as the name of your mod. You publish the mod later by
     uploading the files to GitHub; see [Releasing your mod](#releasing-your-mod).
   - **Use this template on GitHub (for people who already use git).** On the
     [GitHub page](https://github.com/Quitch/New-GW-Cards), click **Use this template** and
     then **Create a new repository**. GitHub makes a new repository under your account
     that starts with the contents of this one. You can do this as many times as you like,
     so one account can hold several card mods. Then
     [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
     your new repository into `client_mods`, and commit and push your changes as you go.
     When the mod is ready, it is already published. Don't use the **Fork** button
     instead: GitHub allows only one fork of a repository per account, and a fork stays
     tied to this template in ways that a new repository does not.

   That folder in `client_mods` is now your mod folder. It holds a few files that the game
   ignores, such as `README.md` (this guide), `package.json` and `eslint.config.mjs`.
   Leave them where they are. The last two are the checker described in
   [Checking your work](#checking-your-work), and the checker works only from inside your
   mod folder.

3. Choose an **identifier** for your mod: a unique name in the style
   `com.pa.yourname.modname`, in lower case, with no spaces. For example,
   `com.pa.jane.botpack`.
4. Open `modinfo.json`, in your mod folder, and fill in these entries. Change only the text
   between the quotation marks.
   - `identifier`: the identifier that you chose.
   - `display_name`: the name that players see in the mod list.
   - `description`: a short summary of what your mod adds.
   - `author`: your name.
   - `scenes`: each address in this block contains `com.pa.YOURNAME.MODNAME`. Change
     that part of every address to your identifier. Don't delete an entry, and don't
     change the order. Some files appear more than once on purpose;
     [Understanding the pieces](#understanding-the-pieces) explains why.
5. Inside your mod folder, open `ui/mods/`. Rename the folder there, which is called
   `com.pa.YOURNAME.MODNAME`, to your identifier. The name must match exactly.
6. **Before you enable the mod for the first time**, open
   `ui/mods/<your identifier>/start_cards.js` and delete the four example loadout lines,
   the ones that contain `YOUR_LOCKED_LOADOUT_ID_1`, `YOUR_LOCKED_LOADOUT_ID_N`,
   `YOUR_UNLOCKED_LOADOUT_ID_1`, and `YOUR_UNLOCKED_LOADOUT_ID_N`. Those IDs have no card
   files. **If they stay, Galactic War never starts**: the screen freezes after the war is
   generated, with no error message. You add your own loadout IDs back later, when you
   have written the cards. See the warning under
   [`model.gwoStartingCards`](#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

   When you delete them, keep the lines around them. For example, change this:

   ```js
   model.gwoNewStartCards.push(
     { id: "YOUR_LOCKED_LOADOUT_ID_1" },
     { id: "YOUR_LOCKED_LOADOUT_ID_N" }
   );
   ```

   to this:

   ```js
   model.gwoNewStartCards.push();
   ```

   Do the same for `model.gwoStartingCards.push(...)` further down the file.

> **Keep three things the same:** the `identifier` in `modinfo.json`, the `scenes`
> addresses in that same file, and the folder name under `ui/mods/`. All three must use the
> same identifier. If they disagree, the game loads nothing and reports nothing.

`modinfo.json` also holds a `galacticWarMod` entry. Leave it at `false` for now. It matters
only in a co-op war, and
[Sharing your mod in a co-op war](#sharing-your-mod-in-a-co-op-war--galacticwarmod)
explains it when you are ready to release.

## How to read the card files

The files that you edit are small JavaScript programs, but you don't need to learn
JavaScript to edit them. You need to recognise a few marks. This is the whole list.

**Comments.** Text after `//` on a line, or between `/*` and `*/`, is a note for people.
The game ignores it. The template's comments tell you what to change, so read them. "Remove
the comment marks" means that you delete the `//` at the start of each line, which turns
the note into a working line.

```js
// This whole line is a comment.
var chance = 60; // Only the text after the two slashes is a comment.
```

**Text** is written in quotation marks: `"Dox Health"`. You can change the words between
the quotation marks, but both quotation marks must stay.

**Numbers** are written plainly, with no quotation marks: `60`, `1.5`.

**`true` and `false`** mean yes and no. They have no quotation marks.

**Lists** are written between square brackets, with a comma between the entries:

```js
["first", "second", "third"];
```

**Labelled values** are written between curly brackets. Each entry is a label, a colon,
and a value, with a comma after it:

```js
{ file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 }
```

**Names with dots**, such as `gwoUnit.dox` or `gwoCard.upgradeCard`, are ready-made
values and tools that GWO supplies. Type them exactly, with the same capital letters.

**`_.constant("...")`** appears around a lot of text in the card files. It is a wrapper
that the game needs. Change the text inside it, and leave the `_.constant(` and the `)`
in place.

**Leave these parts alone.** Every card file starts with a `define([` block, which lists
the files that the card needs, and a `function (...) {` line after it. Don't change
either of them. The only exception is the `bank.js` address in a loadout card, which you
change to your identifier. The last lines of each file, which are only closing brackets
such as `});`, also stay as they are.

**One mistake stops the whole file.** A missing comma, a missing quotation mark, or a
bracket that is not closed makes the game skip the entire file, not only that line. Every
`(`, `[` and `{` needs its partner `)`, `]` or `}`. In Visual Studio Code, click next to a
bracket and the editor highlights its partner. The [checker](#checking-your-work) finds
these mistakes for you.

## Understanding the pieces

Your mod folder has two important areas.

**The cards themselves** are in `ui/main/game/galactic_war/cards/`. Each card is one file.
The template supplies three examples:

- `unit_upgrade_card_id.js`: an example tech card that improves one unit that the player
  already has. It is the shortest kind of card to write.
- `tech_card_id.js`: an example of any other tech card.
- `start_card_id.js`: an example loadout.

**The loader files** are in `ui/mods/<your identifier>/`. These files tell GWO about your
cards. When Galactic War starts, GWO reads them and adds your cards to the game:

- `tech_cards.js`: lists your tech cards and the units that they change.
- `start_cards.js`: lists your loadouts, and tells GWO where your `bank.js` is.
- `bank.js`: records which of your locked loadouts the player has unlocked.
- `specs.js`: lists any extra unit files that you want to change. Most mods don't need it.
- `decks.js`: optional. Offers a whole deck of your own in the Techs picker. Most mods
  don't need it.

There is one more loader, `translations.js`, which is optional. The template does not
include it, and you create it yourself. See [Translating your mod](#translating-your-mod).

Galactic War has three separate screens: the loadout choice, the war itself, and the
loadout choice in a co-op game. Each screen starts empty, and the game loads your loaders
separately for each screen that needs them. That is why `modinfo.json` lists some of them
more than once. If a loader runs on only one screen, your cards are missing from the other
two.

## Your first card

This section takes you through one complete, working card from start to finish. The card
gives the Dox 50% more health. The game offers it only to a player who already has the
Dox.

Finish [Preparing the mod](#preparing-the-mod) first.

### 1. Rename the example file

Open `ui/main/game/galactic_war/cards/` in your mod folder. Rename `tech_card_id.js` to
`mym_dox_health.js`.

The file name, without the `.js`, is the card's **ID**. Here the ID is `mym_dox_health`.
`mym` stands for "my mod". Use a short prefix of your own, and start every card in your
mod with it. [Creating a card](#creating-a-card) explains the naming rules.

### 2. Fill in the card

Open the renamed file. Replace everything in it with the text below. This is the
complete card:

```js
define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return {
    visible: _.constant(true),
    summarize: _.constant("!LOC:Dox Health"),
    describe: _.constant("!LOC:Increases the health of the Dox by 50%."),
    icon: _.constant(
      "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png"
    ),
    audio: _.constant({ found: "/VO/Computer/gw/board_tech_available_armor" }),
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      return gwoCard.conditionalDeal(
        gwoCard.hasUnit(inventory.units(), gwoUnit.dox),
        60
      );
    },
    buff: function (inventory) {
      inventory.addMods(
        gwoCard.mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
      );
    },
    dull: function () {},
  };
});
```

Every GWO tech card has these same nine parts. Each one does one job:

- `visible`: `true` shows the card on the board, where the player can discard it.
- `summarize` and `describe`: the card's name and description. The `!LOC:` at the start
  lets the text be [translated](#translating-your-mod) later. Always keep it.
- `icon`: the card's picture, one of PA's own tech icons.
- `audio`: the voice line that plays when the player finds the card.
- `getContext`: gives `deal` information about the galaxy. Every tech card uses this same
  line.
- `deal`: how often the game offers the card. `gwoCard.conditionalDeal` gives a chance of
  `60` when the player has the Dox, and `0` (never) when they don't.
- `buff`: what the card does. Here it multiplies the Dox's `max_health` by `1.5`.
- `dull`: the cleanup after every card, which usually takes units away again. This card
  gives no units, so its `dull` is empty, but it must still be there.

A card like this one, which improves one unit that the player already has, can also be
written much more briefly with
[`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard).
That shortcut writes all nine parts for you, and also gives the player an extra card slot.

### 3. Register the card

GWO deals only the cards that you register. Open `ui/mods/<your identifier>/tech_cards.js`.

Find the `model.gwoCards.push(` lines, and replace the three example IDs with your card's
ID:

```js
model.gwoCards.push("mym_dox_health");
```

Then find the `model.gwoCardsToUnits.push(` block. It lists, for each card, the units
that the card's tooltip names. Replace the three example entries with one entry for your
card:

```js
model.gwoCardsToUnits.push({
  id: "mym_dox_health",
  units: [gwoUnit.dox],
});
```

### 4. Check it and try it

Run the [checker](#checking-your-work) if you installed it, and fix anything that it
reports. Then follow [Testing your mod](#testing-your-mod) and deal yourself
`mym_dox_health` from the test panel. In a real war the game offers it only after the
player gets the Dox, because GWO's standard start has no bots. The test panel gives you
the card straight away.

That is a complete mod. To make your next card, copy this one and change its parts, or
start from one of the other example files. The rest of this guide explains every part
that you can change.

## Creating a card

### Which example do I start from?

The template includes three complete example cards in `ui/main/game/galactic_war/cards/`.
Pick the one that matches what your card does:

| Your card…                                                                         | Start from                |
| ---------------------------------------------------------------------------------- | ------------------------- |
| improves **one unit** that the player already has                                  | `unit_upgrade_card_id.js` |
| does anything else during a war: unlocks units, changes many units, changes the AI | `tech_card_id.js`         |
| is a **loadout**, chosen on the screen before the war starts                       | `start_card_id.js`        |

`unit_upgrade_card_id.js` is the shortest, because
[`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
writes most of the card for you. It cannot take units away again, so a card that must do
that starts from `tech_card_id.js`.

Every part of each example is already there, with a placeholder value and a comment
beside it. To make more than one card of the same kind, copy the example file first and
rename the copy.

You can also start from a finished card: copy one of GWO's cards from its
[cards folder on GitHub](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards)
into the `ui/main/game/galactic_war/cards` folder of your mod. Rename the copy at once,
as described below. PA's own cards, in
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/cards`, are older and written in
a different style, so they are harder to start from.

### Then, whichever file you started from

1. **Give the file a unique name.** The file name without `.js` is the card's ID, and you
   use the ID in the loader files. A good style is `PREFIX_EFFECT_UNITTYPE.js`, where
   `PREFIX` is a short prefix of your own. For example, `mym_damage_bots.js`.

   **Never start a name with `gwc_` or `gwaio_`.** The game's own cards use `gwc_`, and
   GWO's cards use `gwaio_`. When a card file has the same name as one of theirs, the game
   silently ignores one of the two files, and which one depends on the `priority` of each
   mod. GWO's copy of a `gwc_` or `gwaio_` card normally wins, so your card is never dealt
   and nothing tells you why. `gwc_damage_bots.js`, for example, already exists in PA and
   in GWO.

   **Loadouts have two more rules, and a mistake in either one reports nothing.** The ID
   of a loadout must contain `_start_`, because that is how the game recognises a loadout
   at all. And the ID must **not** start with `gwc_start`, because that prefix belongs to
   the game's own loadouts. Write your prefix, then `_start_`, then a name, as the
   existing mods do: `gwaio_start_ceo`, `nem_start_nuke`. Write `mym_start_engineer`, not
   `gwc_start_engineer`.

   A mistake here is hard to spot. An ID without `_start_` still appears on the loadout
   screen, and the player can still pick it, so the mod looks fine. The damage is inside
   the war: GWO handles the card as ordinary tech, so a copy that the player wins on a
   Guardian planet is never recorded in your bank, and a locked loadout never unlocks. The
   game treats an ID that starts with `gwc_start` as one of its own, so it writes the
   unlock into the game's storage instead of into your bank. That record stays behind
   after the player removes your mod, and it points at a card that no longer exists.

2. **Change the parts of the card** to do what you want, with the
   [Feature reference](#feature-reference).
3. **Register the card.** Add its ID to `tech_cards.js` for a tech card, including one
   that improves a single unit, or to `start_cards.js` for a loadout. GWO never deals a
   card that you have not registered.

## Minimum required changes

You don't have to use every feature. This is the shortest path to a working mod. Tick off
each item as you complete it.

**Every mod:**

- [ ] Put your own copy of this template into `client_mods` (see
      [Preparing the mod](#preparing-the-mod)).
- [ ] In `modinfo.json`, filled in `identifier`, `display_name`, `description`, and
      `author`.
- [ ] In `modinfo.json`, changed the `scenes` addresses so that they contain your
      identifier.
- [ ] Renamed the folder under `ui/mods/` so that it matches your identifier.
- [ ] **Deleted from `start_cards.js` every example loadout ID that you don't use**
      (`YOUR_LOCKED_LOADOUT_ID_1`, `YOUR_LOCKED_LOADOUT_ID_N`,
      `YOUR_UNLOCKED_LOADOUT_ID_1`, and `YOUR_UNLOCKED_LOADOUT_ID_N`). Do this even when you
      make only tech cards. If they stay, Galactic War does not start at all.
- [ ] Renamed the example card file that you use (`tech_card_id.js`,
      `unit_upgrade_card_id.js` or `start_card_id.js`) to a unique name that does not
      start with `gwc_` or `gwaio_`, and noted that name, without `.js`, as the card's ID.
- [ ] Gave the card a name, a description, and a picture.
- [ ] Made the card do something in its `buff`: add units, change unit stats, or change
      the AI.
- [ ] Replaced or deleted every placeholder left in the card, such as `UNIT_PATH`,
      `PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, and the `!LOC:...HERE` text. A placeholder that
      stays breaks the card.
- [ ] Checked the mod with the checker (see [Checking your work](#checking-your-work)) and
      fixed everything that it reported.

**If your card improves one unit (`gwoCard.upgradeCard`), also:**

- [ ] Set `requires` to the unit that the card improves. There is no `deal` to fill in,
      because the helper works out the chance.
- [ ] Added the card's ID to `model.gwoCards`, and listed it in `model.gwoCardsToUnits`, in
      `tech_cards.js`, the same as any other tech card.

**If your card is any other tech card, also:**

- [ ] In the card's `deal`, changed `chance` to a number above `0`. It starts at `0`, and
      the game never offers a card with a chance of `0`.
- [ ] Added the card's ID to `model.gwoCards` in `tech_cards.js`.
- [ ] Listed the card in `model.gwoCardsToUnits` in `tech_cards.js`, or in
      `model.gwoCardsWithoutTooltip` if it changes no units.

**If you make only tech cards:** the `model.gwoLoadoutBanks` block in `start_cards.js`
still holds the placeholder `YOUR_PREFIX_start_`. It does no harm. You can leave it, or
delete the whole block.

**If your card is for another race or an add-on, also:**

- [ ] Named the race or add-on units with `gwoUnit.<table>.<key>`, or with raw paths for a
      race or add-on from another mod.
- [ ] Listed those units in the card's `model.gwoCardsToUnits` entry. For a tech card,
      this is what stops the game from offering the card to other races.
- [ ] In `deal`, used `gwoCard.fieldedUnits(inventory)` in place of `inventory.units()`,
      or set `requires` to the race unit in `gwoCard.upgradeCard`.
- [ ] Tested the card in a war as that race (see
      [Testing a race card](#8-testing-a-race-card)).

**If your card is a loadout, also:**

- [ ] Added the card's ID to `model.gwoStartingCards` (unlocked) or
      `model.gwoNewStartCards` (locked) in `start_cards.js`.
- [ ] Set a unique `LS_KEY` in `bank.js`.
- [ ] Changed the `bank.js` address at the top of the loadout card so that it contains
      your identifier.
- [ ] Set `prefix` and `path` in the `model.gwoLoadoutBanks` entry in `start_cards.js`.
      Without this, a locked loadout can never unlock.

**If you add a deck, also:**

- [ ] Removed the comment marks from the example in `decks.js`, set `id` and `name`, and
      replaced or deleted every placeholder in it (see
      [`model.gwoDecks`](#modelgwodecks--your-own-deck-in-the-techs-picker-in-decksjs)).

**If you ship translations, also:**

- [ ] Added `"com.pa.quitch.modtranslations"` to `dependencies` in `modinfo.json`, and
      kept `priority` above `50`.
- [ ] Created `translations.js` in `ui/mods/<your identifier>/`, with your identifier in
      it.
- [ ] Listed `translations.js` under `global_mod_list` in `modinfo.json`, and under no
      other scene.
- [ ] Wrote one `translations/<lang>.json` for each language, with every key copied
      exactly from the text after `!LOC:` (see
      [Translating your mod](#translating-your-mod)).

## Feature reference

This section explains every everyday feature, with a worked example of each. Copy the
shape shown, and change the labelled parts. Features that most cards never need are in
[Advanced features](#advanced-features).

### Naming units: GWO IDs and unit paths

Many parts of a card name a unit. There are two ways to do it.

- A **GWO unit ID** or **GWO group ID** is a short name that GWO supplies, so that you
  don't have to type a full file path. `gwoUnit.dox` is a single unit, and
  `gwoGroup.botsBasicMobile` is a whole family of units. There are also IDs for weapons
  and ammo, such as `gwoUnit.doxWeapon`. The full lists are here:
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  and
  [group IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js).
  In those files, each line reads `name: "path"`. You write `gwoUnit.` followed by the
  name. For example, the line `dox: "/pa/units/land/assault_bot/assault_bot.json"` means
  that you write `gwoUnit.dox`.
- A **unit path** is the location of a unit's file, such as
  `/pa/units/land/assault_bot/assault_bot.json`. The TITANS units are stored under
  `pa_ex1` in the install folder, but the game treats them as if they were under `/pa/`.
  Always write `/pa/` for them, never `/pa_ex1/`.
- A **race or add-on unit ID** names a unit of another race, or of an add-on, in two
  parts: `gwoUnit.legion.shank` is the Legion Shank. The six tables are `legion`, `bugs`,
  `exiles`, `secondWave`, `section17`, and `osmech`. GWO makes their keys from the race
  mod's files, so a key can change when the race mod is updated. See
  [Cards for another race or an add-on](#cards-for-another-race-or-an-add-on).

> **Use a GWO ID whenever one exists.** GWO keeps its IDs up to date, and they prevent
> path mistakes such as the `/pa_ex1/` trap above. Use a raw path only when there is no
> GWO ID for the unit.

### The lists that tell GWO about your cards

GWO keeps several lists, and you add your cards to them. The name of each list starts
with `model.gwo`. The heading of each section below names the file that it goes in.

#### `model.gwoCards` — your tech-card deck (in `tech_cards.js`)

This is the main list of tech cards that the game can deal during a war. Add each tech
card's ID, which is its file name without `.js`.

```js
model.gwoCards.push("mym_damage_bots", "mym_faster_air");
```

#### `model.gwoCardsToUnits` — tech-card tooltips (in `tech_cards.js`)

This list connects a tech card to the units that it changes, so that the card's tooltip
can name them. When the entry names the units of another race or an add-on, it also
decides which players the game offers the card to (see
[Cards for another race or an add-on](#cards-for-another-race-or-an-add-on)). Add one
entry for each card. The entry holds the card's ID and the units
that it changes, as unit paths or as GWO unit or group IDs. Always name the unit itself,
not its ammo or its weapon, even when the card changes only the weapon. For a card that
changes the commander, name `gwoUnit.commander`.

```js
model.gwoCardsToUnits.push({
  id: "mym_damage_bots",
  units: ["/pa/units/land/assault_bot/assault_bot.json", gwoUnit.dox],
});
```

#### `model.gwoCardsWithoutTooltip` — tech cards with no unit tooltip (in `tech_cards.js`)

List a tech card here when it does **not** change units, for example a card that only
turns on a feature. Use this list **instead of** `model.gwoCardsToUnits`. If you use
neither, GWO warns that the card has no tooltip data.

```js
if (!model.gwoCardsWithoutTooltip) {
  model.gwoCardsWithoutTooltip = [];
}
model.gwoCardsWithoutTooltip.push("mym_enable_bounties");
```

#### `model.gwoNewStartCards` — locked loadouts (in `start_cards.js`)

These are the loadouts that the player must earn before using them. They appear grey on
the loadout screen, and the game can award them as rewards on Guardian planets. Add one
entry for each loadout, with its ID.

```js
model.gwoNewStartCards.push({ id: "mym_start_myloadout" });
```

#### `model.gwoStartingCards` — unlocked loadouts (in `start_cards.js`)

These are the loadouts that are available from the start. The shape is the same as above.

```js
model.gwoStartingCards.push({ id: "mym_start_myloadout" });
```

> **Don't add a loadout to both the locked list and the unlocked list.**
>
> **Every ID in these two lists must have a card file with exactly that name. If one does
> not, Galactic War does not start.** This is the worst mistake in the whole template,
> because it breaks the game, not only the card. GWO loads every loadout that you list here
> while it builds a new war. If one of them has no file, GWO waits for a file that never
> arrives. The war finishes generating, and then the screen stays as it is. There is no
> error, no message, and nothing to click. Only restarting the game ends it.
>
> The template arrives with four example IDs in these lists (`YOUR_LOCKED_LOADOUT_ID_1`,
> `YOUR_LOCKED_LOADOUT_ID_N`, `YOUR_UNLOCKED_LOADOUT_ID_1`, and
> `YOUR_UNLOCKED_LOADOUT_ID_N`) and with no files for them. **So the mod does this to you
> the first time that you enable it**, unless you followed step 6 of
> [Preparing the mod](#preparing-the-mod). Before you enable the mod, open
> `start_cards.js` and delete every example ID that you have not replaced with a real ID.
> You can delete all of them. A mod with no loadouts works correctly.
>
> Tech cards are safer. A missing tech card file logs an error, the game skips that card,
> and the war continues.

#### `model.gwoLoadoutBanks` — where your bank lives (in `start_cards.js`)

Your own `bank.js` records which of your locked loadouts the player has unlocked. GWO
cannot find that file without help, so you give it the address. **Without this entry a
locked loadout can never unlock**, and nothing warns you.

GWO does not create this list for you, so the example creates it first.

```js
if (!model.gwoLoadoutBanks) {
  model.gwoLoadoutBanks = [];
}
model.gwoLoadoutBanks.push({
  prefix: "mym_start_",
  path: "coui://ui/mods/<your identifier>/bank.js",
});
```

`prefix` is the first part of every loadout ID in your mod. When the player earns one of
your loadouts, GWO uses the prefix to recognise it as yours, and then writes it to your
bank instead of its own. The prefix must match the start of the loadout IDs that you
chose.

`path` is the address of your `bank.js`. Like every other address in the mod, it contains
your identifier.

You give the address, not the file itself, because GWO builds the loadout list before the
game loads any of your mod's files. An address that GWO can read when it is ready is the
only way for it to reach your bank in time.

#### `model.gwoStarCardsWhichBreakAllies` — loadouts that disable the ally (in `start_cards.js`)

Optional. In GWO the player can fight beside an allied commander. List your loadout's ID
here if its effect would break that feature. When the player picks that loadout, GWO
turns the allied commander off.

GWO does **not** create this list for you. Create it before you add to it, as shown.

```js
if (!model.gwoStarCardsWhichBreakAllies) {
  model.gwoStarCardsWhichBreakAllies = [];
}
model.gwoStarCardsWhichBreakAllies.push("mym_start_myloadout");
```

#### `model.gwoSpecs` — extra unit files to change (in `specs.js`)

Optional. Galactic War gives each player a private copy of only the files that their own
units need. If you list a path here, every player also gets a copy of that file. There are
two reasons to do this.

- The game doesn't normally use some unit files, for example the Ares' stomp. To change
  one of those, list its path here so that GWO loads it.
- You lend one unit a file that belongs to another unit: a weapon, a build arm, or a unit
  that spawns on death.
  [Whenever your value is a file name, `tag` it](#whenever-your-value-is-a-file-name-tag-it)
  explains that. List the borrowed file here, and its ammo comes with it.

```js
model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
```

#### `model.gwoCardsGrantingAdvancedTech` — cards that unlock advanced tech (in `tech_cards.js`)

Optional. Some cards ask, through
[`gwoCard.hasT2Access`](#cards-that-react-to-the-players-other-cards), whether the player
has reached advanced (T2) tech. If one of your cards gives that access, add its ID here so
that those cards can see it.

```js
if (!model.gwoCardsGrantingAdvancedTech) {
  model.gwoCardsGrantingAdvancedTech = [];
}
model.gwoCardsGrantingAdvancedTech.push("mym_enable_mybots_all");
```

#### `model.gwoDecks` — your own deck in the Techs picker (in `decks.js`)

Optional. The Techs picker in the war setup normally offers two decks: **Basic** (the base
game's tech cards) and **Galactic War Overhaul** (the full GWO deck). A deck that you add
here appears beside them, and a war started with it deals only that deck's cards.

You don't need a deck to add cards. Cards that you add to `model.gwoCards` join **every**
deck. Add a deck only when you want players to be able to choose a different set of
cards, for example a smaller themed deck.

```js
model.gwoDecks.push({
  id: "mym-nomad",
  name: "!LOC:Nomad",
  tooltip: "!LOC:Nomad-only tech.",
  include: ["Basic"],
  cards: ["mym_card_a", "gwc_minion"],
});
```

- `id`: a unique name for the deck. The war save remembers it.
- `name`: shown in the picker and on the war panel. The game already labels these places
  "deck", so don't put the word Deck in the name.
- `tooltip`: optional. One line for the Techs tooltip, describing the deck.
- `include`: optional. The IDs of other decks whose cards this deck contains: `"Basic"`,
  `"Expanded"` (the full GWO deck, which already contains Basic), or another mod's deck.
  To include another mod's deck, list that mod in `dependencies` in your `modinfo.json`
  **and** give your mod a **higher** `priority` number than that mod, so that the other
  mod loads first. Leave `include` out for a standalone deck.
- `cards`: optional. Individual card IDs, either your own cards or any stock card, so that
  you can pick single cards without including a whole deck.

A deck needs at least one card between `include` and `cards`. A card appears only once,
however many times these lists name it. `modinfo.json` already lists `decks.js` on all
three screens. If the player removes your mod, a war started with your deck deals the GWO
deck instead.

Unlike the other loaders, `decks.js` starts with its example turned off (commented out),
because an example deck would appear in the picker as soon as the mod is enabled. Remove
the comment marks and edit the values to use it. If you don't want a deck, you can delete
`decks.js` and its three lines in `modinfo.json`.

### What a card is made of

Each card file is a set of named parts. Some parts belong only to loadouts, and some only
to tech cards.

You don't always write all of them. Two common kinds of card write most of these parts
for you. See
[a card that improves one unit](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
and [loadouts](#loadouts-and-gwocardloadout) below.

| Part         | Used by    | What it does                                                                                                       |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `summarize`  | all        | The card's name.                                                                                                   |
| `describe`   | all        | The card's description.                                                                                            |
| `icon`       | all        | The card's picture.                                                                                                |
| `visible`    | all        | Whether the player can see the card on the board and discard it. Tech cards are usually visible. Loadouts are not. |
| `deal`       | all        | How often the game offers the card. See below.                                                                     |
| `buff`       | all        | What the card does. See below.                                                                                     |
| `dull`       | all        | Cleanup. It runs after every card's `buff`, and it usually removes units.                                          |
| `audio`      | tech cards | The voice line that plays when the player finds the card.                                                          |
| `getContext` | tech cards | Gives the `deal` part information about the galaxy. Always `gwoCard.getContext`.                                   |
| `hint`       | loadouts   | The text shown while the loadout is still locked.                                                                  |

You may also see `keep`, `discard`, and `releaseContext` in a card that you copy. Most
cards never use them. See
[`keep`, `discard` and `releaseContext`](#keep-discard-and-releasecontext--rare-parts).

#### `summarize`, `describe`, `icon` — name, description, picture

`summarize` is the name, `describe` is the description, and `icon` is the picture. Start
all text that players read with `!LOC:`,
[so that it can be translated](#translating-your-mod).

```js
summarize: _.constant("!LOC:Bot Damage"),
describe: _.constant("!LOC:Increases the damage of your basic bots."),
icon: _.constant(
  "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png"
),
```

The picture can be one of PA's own tech icons, as above. To see them, open
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/gw_play/img/tech` and pick a file
name from that folder, for example `gwc_bot_combat.png`. A name that is not in the folder
leaves the card's picture blank, and no error tells you why.

The picture can also be an image inside your own mod, for example
`coui://ui/mods/<your identifier>/img/my_icon.png`.

The example loadout is different. Its `icon` uses `gwoCard.loadoutIcon(CARD.id)`, which
shows the medal for the hardest war that the player has won with that loadout. Before
their first win it shows a red commander. Leave that line as it is, unless your loadout
must always show one fixed picture.

#### `visible` — whether the card is shown

`_.constant(true)` lets the player see the card and discard it, which is normal for a tech
card. `_.constant(false)` hides the card, which is normal for a loadout.

```js
visible: _.constant(true),
```

#### `audio` — the discovery voice line (tech cards)

This is the voice line that plays when the player finds the card. The example file
`tech_card_id.js` lists every line that you can choose, such as
`board_tech_available_bot`. Put your choice at the end of the path:

```js
audio: _.constant({ found: "/VO/Computer/gw/board_tech_available_bot" }),
```

#### `getContext` — galaxy information (tech cards)

This part gives the galaxy size to the `deal` part. Every tech card can use the standard
one, and you don't need to change it:

```js
getContext: gwoCard.getContext,
```

#### `hint` — the locked message (loadouts)

The loadout screen shows this while the loadout is still locked, with the
locked-commander picture. `gwoCard.lockedHint` supplies the picture, so you write only the
text.

```js
hint: gwoCard.lockedHint(
  "!LOC:I could be the loadout name or a hint about what this loadout does."
),
```

#### `deal` — how often the card appears

`deal` gives back ("returns") a **chance** number. A larger number makes the game offer
the card more often, and `0` means never. As a rough guide, from GWO's own cards: below 30
is a low chance, 30 to 70 is a normal chance, and above 120 is high.

The simplest form always uses the same chance. Change `60` to the number that you want:

```js
deal: function () {
  return { chance: 60 };
},
```

The chance can also depend on the situation. The game gives `deal` three things to look
at, which it calls `system` (the star that the player is at), `context` (the galaxy), and
`inventory` (the player's cards and units). GWO supplies checks that use them:

- `gwoCard.hasUnit(inventory.units(), X)`: true if the player has **any** of unit(s) X.
- `gwoCard.hasAllUnits(inventory.units(), X)`: true if the player has **all** of unit(s)
  X.
- `gwoCard.missingUnit(inventory.units(), X)`: true if the player is missing **any** of
  unit(s) X.
- `gwoCard.missingAllUnits(inventory.units(), X)`: true if the player is missing **all**
  of unit(s) X.
- `gwoCard.fieldedUnits(inventory)`: use it in place of `inventory.units()` to include the
  race or add-on units that the player fields. See
  [Cards for another race or an add-on](#cards-for-another-race-or-an-add-on).
- `context.totalSize`: the size of the galaxy (how many stars it has).
- `system.distance()`: how far the current star is from the start.

In this example, the chance is 25, but it becomes 120 when the player has the Dox. The
`if (...) { ... }` means "if this is true, do what is inside the curly brackets":

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (gwoCard.hasUnit(inventory.units(), gwoUnit.dox)) {
    chance = 120;
  }
  return { chance: chance };
},
```

`!` in front of a check reverses it ("not"), `&&` means "and", and `||` means "or".

##### Making the chance depend on how far the player has travelled

Distance is the usual way to hold a card back until later in a war. But a plain
`system.distance()` means different things in different galaxies: five jumps is the far
edge of a small galaxy, and barely a start in a very large one. GWO adjusts for that with
three ready-made checks. Each is true after the player has travelled far enough **for the
size of galaxy that they are playing**, so a card that uses them behaves the same at every
galaxy size:

- `gwoCard.travelledShort(system, context, GW.balance.numberOfSystems)`: past the nearby
  stars (further out than roughly 55% of the galaxy's stars).
- `gwoCard.travelledModerate(system, context, GW.balance.numberOfSystems)`: well out from
  the start (further out than roughly 70% of the galaxy's stars).
- `gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)`: deep into the
  galaxy (further out than roughly 82% of the galaxy's stars).

Copy all three values in the brackets exactly as written. `GW.balance.numberOfSystems`
comes from the `"shared/gw_common"` line that is already at the top of the example tech
card.

```js
deal: function (system, context) {
  var chance = 30;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 140;
  }
  return { chance: chance };
},
```

You can combine any of these checks. You can also increase or reduce the chance instead of
replacing it. `chance *= 3` multiplies the chance by three:

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (
    gwoCard.travelledFar(system, context, GW.balance.numberOfSystems) &&
    gwoCard.hasUnit(inventory.units(), gwoUnit.boom) &&
    gwoCard.missingUnit(inventory.units(), gwoGroup.botsBasicMobile)
  ) {
    chance = 200;
  }
  if (!gwoCard.hasUnit(inventory.units(), gwoGroup.factoriesAdvanced)) {
    chance *= 3;
  }
  return { chance: chance };
},
```

For a card that is at its best in the middle of the map rather than at the edge, see
[Setting your own distances](#setting-your-own-distances--gwocardfarforsize).

##### Upgrade cards — `gwoCard.upgradeDeal`

An **upgrade card** improves something that the player already owns, and gives them one
more card slot in return. Because it pays for its own place in the hand, the game must
offer it even when the hand is full. Every upgrade card in GWO uses one helper that does
this, and your card must use it too:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced)
  );
},
```

Give it a true-or-false answer to the question "does the player have the thing that this
card upgrades?". When the answer is true, the game offers the card with a chance of 60.
When it is false, the chance is 0, so the game never offers an upgrade for something that
the player cannot use. To use a different chance, add it as a second value:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced),
    90
  );
},
```

A card dealt in this way must give the extra slot itself, as the first line of its `buff`:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

If your upgrade card improves just one unit,
[`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
does all of this for you.

##### Cards that need something first — `gwoCard.conditionalDeal`

`gwoCard.conditionalDeal` is the same idea without the card slot. Give it a true-or-false
answer and a chance. It returns that chance when the answer is true, and `0` when it is
false, so the card stays out of the deck until the player can use it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    70
  );
},
```

##### Cards that react to the player's other cards

`inventory.hasCard("some_card_id")` is true when the player holds that card. Use it to
build on another card, or to stay away from it. Here the card is offered only to a player
who does **not** hold `gwc_start_orbital`:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(!inventory.hasCard("gwc_start_orbital"), 60);
},
```

`gwoCard.hasT2Access(inventory)` is true once the player holds any card listed in
[`model.gwoCardsGrantingAdvancedTech`](#modelgwocardsgrantingadvancedtech--cards-that-unlock-advanced-tech-in-tech_cardsjs),
which means that they can build advanced (T2) units. Use it for a card that is useless
before then:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.missingUnit(
      inventory.units(),
      gwoGroup.structuresDefencesAdvanced
    ) && gwoCard.hasT2Access(inventory),
    100
  );
},
```

##### Naval cards — `gwoCard.navalWeight`

A player who owns ships cannot always use them, because most generated systems have
little water or none. Only two cards flood every planet that the player fights on: the
naval loadout and Tsunami Tech. `gwoCard.navalWeight` weighs a naval card by whether the
player holds one of them. Give it the `inventory` and the chance that you want when there
is water to fight on. If the player holds neither card, it returns 40% of that chance
instead, so the game offers your card less often but does not hold it back completely:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    gwoCard.navalWeight(inventory, 70)
  );
},
```

Every naval tech card in GWO has that shape. `navalWeight` judges what the map is likely
to be worth, and `conditionalDeal` keeps the card out of the deck until the player can
build ships at all.

If your card is worthless without water, not merely weaker, add a third number. It
replaces the 40% default with a dry-map chance of your own. GWO's Anti-Ship and
Anti-Hover Ammo Techs go from 70 to 15 in this way:

```js
gwoCard.navalWeight(inventory, 70, 15);
```

##### Commander cards — `gwoCard.commanderWeight`

Your own commander and every Sub Commander come from the same unit file, so a card that
changes commander stats improves all of them together. Such a card is worth more the more
Sub Commanders the player has, whatever the distance travelled, and
`gwoCard.commanderWeight` weighs it in that way. Give it the `inventory` and the chance
that you want when the player fights alone. Each Sub Commander adds one third of that
chance, up to a maximum of double the chance:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.commanderWeight(inventory, 70) };
},
```

Both values are required: unlike `upgradeDeal`, this helper has no default chance. Use it
instead of the distance checks above, not together with them.

If your commander card also gives a card slot, `upgradeDeal` cannot weigh it for you,
because `upgradeDeal` takes a true-or-false answer, not a chance. Write the `deal` in
full, and add the `allowOverflow` part yourself. `allowOverflow` is what lets the game
offer a card that pays for its own slot to a player whose hand is full:

```js
deal: function (system, context, inventory) {
  return {
    params: { allowOverflow: true },
    chance: gwoCard.commanderWeight(inventory, 35),
  };
},
```

##### Sub Commander cards — `gwoCard.subcommanderWeight`

Some cards improve only the player's Sub Commanders, and leave the player's own commander
unchanged. Such a card has no value until the player recruits a Sub Commander, and
`gwoCard.subcommanderWeight` is the helper for it. Give it the `inventory` and the chance
that you want:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.subcommanderWeight(inventory, 55) };
},
```

With no Sub Commander the chance is `0`, so the card stays out of the deck. With one Sub
Commander the game offers the card at the full chance that you gave. Each further Sub
Commander adds one third of that chance, up to a limit of 90, so that a large retinue
cannot flood the deck. The limit applies from the first Sub Commander, so a chance above
90 is pointless: the helper reduces it to 90.

Both values are required. Use this helper instead of the distance checks, as for
`commanderWeight`. If your card also gives a card slot, write the `deal` in full with the
`allowOverflow` part, as shown above.

To choose between the two helpers, ask who the card changes. Use `commanderWeight` for a
card that improves every commander that the player fields, including their own. Use
`subcommanderWeight` for a card that helps only their Sub Commanders.

##### Counter-tech cards — `gwoCard.antiTechDeal`

GWO has a family of "anti" ammo techs: Anti-Air, Anti-Ship, Anti-Bots, and others. Each
one doubles your damage against one kind of target and reduces it against another.
`gwoCard.antiTechDeal` is the `deal` that they share. Give it the `inventory`, the chance
that you want, and the ID of the card that is the opposite of yours:

```js
deal: function (system, context, inventory) {
  return gwoCard.antiTechDeal(inventory, 70, "gwaio_anti_sea");
},
```

The chance falls to `0` when the player already holds the opposite card, so that a pair
can never cancel each other out. The chance also halves once the player holds any
`gwaio_anti_` card, so that the deck stops pushing the theme on a player who already has
it. Only IDs that start with `gwaio_anti_` count, which in practice means GWO's own cards,
not yours. Don't give your card a `gwaio_` ID to make it count: when an ID matches one of
GWO's, the game silently ignores one of the two cards, and normally that is yours.

##### Loadouts

**Loadouts don't use a chance.** The game grants a loadout only when the player picks it on
the loadout screen. A loadout's `deal` is always:

```js
deal: gwoCard.startCard,
```

### `buff` — what the card does

`buff` holds the card's effect. Inside it you can do any combination of four things, each
described below.

**A loadout does not write its own `buff`.** It puts the same code in `apply` and gives
that to `gwoCard.loadout`, which then writes the `buff` and the `dull`. See
[Loadouts and `gwoCard.loadout`](#loadouts-and-gwocardloadout) below. Everything in this
section works the same way inside `apply`.

#### Add a card slot

Give the player room for one more card in their hand:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

#### Unlock units — `inventory.addUnits(...)`

Give the player one or more units. Give a single unit or a list, as paths or as GWO unit
or group IDs.

```js
inventory.addUnits([
  "/pa/units/land/assault_bot/assault_bot.json",
  gwoUnit.dox,
  gwoGroup.botsBasicMobile,
]);
```

#### Change unit stats — `inventory.addMods(...)`

Change a number or other value inside a unit's file. Each change is written as four
labels:

- `file`: which unit file to change, as a path or a GWO unit ID.
- `path`: which value inside that file. A value at the top level of the file is just its
  name, such as `max_health`. A value deeper in the file uses dots, such as
  `events.fired.effect_spec`. If a step along the way is the name of another file rather
  than a value, the game follows it into that file and carries on from there.
- `op`: the kind of change. See below.
- `value`: the amount or value to use.

```js
inventory.addMods([
  { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
  { file: gwoUnit.doxWeapon, path: "max_range", op: "replace", value: 120 },
]);
```

The everyday `op` choices:

| `op`               | What it does                                                         | Example `value`                      |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------ |
| `multiply`         | Multiplies an existing number. Does nothing if the value is missing. | `1.5` (+50%), `0.8` (−20%), `2` (×2) |
| `multiplyOrCreate` | Like `multiply`, but if the value is missing, sets it to `value`.    | `1.5`                                |
| `add`              | Adds to a number. If the value is missing, sets it to `value`.       | `20`, or `-5` to subtract            |
| `replace`          | Replaces the value with `value`.                                     | `120`                                |
| `push`             | Adds `value` to the end of a list.                                   | a new list entry                     |
| `prepend`          | Adds `value` to the start of a list.                                 | a new list entry                     |
| `pull`             | Takes `value` out of a list.                                         | the entry to remove                  |
| `merge`            | Folds your labelled values into an existing set of labelled values.  | `{ some_label: 5 }`                  |
| `tag`              | Required after writing a file name. Takes no `value`. See below.     | none                                 |

There are three more: `wipe`, `clone` and `eval`. See
[More unit-stat ops](#more-unit-stat-ops--wipe-clone-and-eval).

> **The order in which you write changes does not matter.** Across every card in the
> player's hand, the game makes every `replace` first, then every `multiplyOrCreate`, then
> every `multiply`, then every `add`, and all the other ops after those. Never write two
> changes that only work in a particular order.

##### Finding the value that you want to change

The names in `path`, such as `max_health`, come from the unit's own file in the game.

1. Open `{PA_INSTALL_DIRECTORY}/media/pa_ex1/units/`. Look for the unit's folder there
   first, and then in `{PA_INSTALL_DIRECTORY}/media/pa/units/` (there are folders for
   `land`, `air`, `sea`, `orbital`, and `commanders`). The unit's path in the GWO
   [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
   list tells you which folder to open.
2. Open the unit's `.json` file in Visual Studio Code. The whole file is one long line. To
   make it readable, right-click inside it and choose **Format Document**. **Don't save
   the file.** Close it without saving when you finish.
3. Find the value, such as `"max_health": 200`. Its name is what you write in `path`.
4. If the value is not in the file, look for a `base_spec` line. It names a parent file
   that the unit takes its other values from. Open that file and look there. A unit's
   weapon and ammo are separate files, named in its `tools` list and in the weapon's
   `ammo_id`.

A race or add-on unit's file is in the race's server mod, not in the install folder. See
[Finding the value that you want to change](#7-finding-the-value-that-you-want-to-change)
under the race cards.

##### Whenever your value is a file name, `tag` it

Galactic War does not change the game's unit files. It gives each player a **private
copy** of every file that their units need, and applies that player's whole hand to the
copies. The player fights with the copies.

The game makes those copies **before** any card runs. So a file name that your card
writes points at the original file, not at the player's copy. Nothing seems broken: the
weapon still fires, and the unit still spawns. But none of the player's other cards apply
to it: no health card, no damage card, nothing. There is no warning.

The fix is a second entry with the same `file`, the same `path`, `op: "tag"`, and no
`value` at all.

```js
inventory.addMods([
  // Give the Dox a second weapon, borrowed from the Ant.
  {
    file: gwoUnit.dox,
    path: "tools",
    op: "push",
    value: { spec_id: gwoUnit.antWeapon, aim_bone: "bone_root" },
  },
  // ...and point it at the player's copy of that weapon.
  { file: gwoUnit.dox, path: "tools.1.spec_id", op: "tag" },
]);
```

**Which values are file names.** Only these, and only when your card writes one:

| Where                                                                      | What it is                                |
| -------------------------------------------------------------------------- | ----------------------------------------- |
| `tools.<number>.spec_id`                                                   | a weapon or build arm                     |
| `ammo_id`                                                                  | what a weapon fires                       |
| `spawn_unit_on_death`                                                      | a unit left behind when this is destroyed |
| `death_weapon.ground_ammo_spec`, `death_weapon.air_ammo_spec`              | the explosion on death                    |
| `base_spec`                                                                | the file this one inherits from           |
| `replaceable_units`, `buildable_projectiles`, `factory.initial_build_spec` | rarer, same rule                          |

**Use the correct number.** Tools are numbered from `0`, and you tag the numbering as it
is **after** your change. Every `replace` runs before any `push`, `prepend` or `tag`, so
count like this: open the unit's file in the game install, count the tools that it
already has, and your pushed tool takes the next number. The Dox has one tool (number
`0`), so the pushed tool is number `1`. A `prepend` goes in at `0` instead, and moves the
other tools along by one.

**The file that you borrow must be in play.** A tag on a file that the player has no copy
of leaves the tool with no target, and the tool then disappears completely. That is worse
than no tag. You are safe when the file already belongs to the unit that you change, or to
a unit that your card requires the player to own. A file borrowed from anywhere else, such
as the Ant's weapon in the example above, must be listed in
[`model.gwoSpecs`](#modelgwospecs--extra-unit-files-to-change-in-specsjs). That list is
what makes a copy of the file exist. List only the weapon itself; the game copies its
ammo, and anything that the ammo spawns, along with it.

##### A shorthand for writing changes — `gwoCard.mods`

Most cards change several values in the same file with the same `op`, which is
repetitive to write out in full. `gwoCard.mods(file, op, changes)` writes those entries
for you. Give it the file, the op, and one `path: value` pair for each change:

```js
inventory.addMods(
  gwoCard.mods(gwoUnit.antAmmo, "replace", {
    splash_damage: 63,
    splash_radius: 10,
    full_damage_splash_radius: 2,
  })
);
```

That does exactly the same as three `{ file, path, op, value }` entries written by hand.

To change a whole family of units in the same way, use `gwoCard.flatMapMods`. It works
the same way, but takes a list or group of files:

```js
inventory.addMods(
  gwoCard.flatMapMods(gwoGroup.botsBasicMobile, "multiply", { max_health: 1.5 })
);
```

Some changes need the same amount applied to several values together. To make a unit
faster, for example, you change its speed, acceleration, braking and turning together. For
those, give a **list of paths** and one amount instead of `path: value` pairs. GWO names
the three sets that cards change most often:

| Set                          | What it covers                                             |
| ---------------------------- | ---------------------------------------------------------- |
| `gwoCard.paths.navigation`   | how a unit moves: speed, braking, acceleration and turning |
| `gwoCard.paths.damage`       | a weapon's direct damage and its splash damage             |
| `gwoCard.paths.energyWeapon` | an energy weapon's ammo capacity, demand and cost per shot |

```js
inventory.addMods(
  gwoCard.mods(gwoUnit.dox, "multiply", gwoCard.paths.navigation, 1.25)
);
```

A list of paths that you write yourself works in the same way, and so does
`gwoCard.flatMapMods`.

#### Change what your Sub Commanders build — `inventory.addAIMods(...)`

This changes the build orders of the AI that fights for the player: their Sub Commanders
(the allied commanders who join the player's army). On a Guardian star, where the enemy
mirrors the player's tech, it changes the enemy AI's build orders too. It does not change
other enemies.

**Most cards don't need this.** Use it when your card gives units that the Sub Commanders
would otherwise never build, or changes what a factory can build.

Each change is written with these labels:

- `type`: which set of AI build files to change: `fabber` (what builders build),
  `factory` (what factories build), `platoon` (how units are grouped), or `template`
  (the shape of those groups).
- `op`: the kind of change: `load`, `append`, `prepend`, `replace`, `unset`, `remove`,
  `new`, `silence`, or `squad`. `squad` works only on `template`. All the others except
  `load` work only on `fabber`, `factory`, and `platoon`. An op aimed at the wrong `type`
  does nothing and reports nothing, so check the pair.
- `value`: the value to apply. `unset` takes no `value`.
- `toBuild`: which entry in the AI's build list to change (not needed for `load` or
  `silence`).
- `idToMod`: which part of that entry to change, for example `builders` or `priority`.
- `refId` and `refValue`: optional. Make the change only when the entry already has
  `refValue` at `refId`.
- `matchAll`, `treeOnly`: optional and advanced. See
  [More AI changes](#more-ai-changes).

Each op needs a particular set of these labels. An op that is missing a label that it
needs does nothing at all, with no error:

| `op`                           | needs, besides `type`         |
| ------------------------------ | ----------------------------- |
| `load`, `silence`              | `value`                       |
| `append`, `prepend`, `replace` | `toBuild`, `idToMod`, `value` |
| `unset`                        | `toBuild`, `idToMod`          |
| `remove`, `new`, `squad`       | `toBuild`, `value`            |

`unset` is the opposite of `replace`: it removes the `idToMod` part from the entry, so it
has no `value`.

**Where the names come from.** `toBuild` must match one of the AI's build entries exactly.
Those names are the `to_build` values inside the AI's build files, which you can read in
`{PA_INSTALL_DIRECTORY}/media/pa/ai/`, and in `media/pa_ex1/ai/` and
`media/pa_ex1/ai_queller/` for the TITANS and Queller AIs. The builder names that you put
in `builders`, such as `BasicBotFactory`, come from
`{PA_INSTALL_DIRECTORY}/media/pa/ai/unit_maps/ai_unit_map.json`. A name that is not in
those files changes nothing and reports nothing. The AI files are one long line; use
**Format Document** in Visual Studio Code to read them, and don't save them.

##### Loading a ready-made build file — `load`

The simplest AI change loads a whole AI build file that you write. Most of GWO's upgrade
cards teach the AI to use a new unit in this way. `load` uses only `type`, `op` and
`value`, where `value` is the name of a JSON file that GWO reads from `/pa/ai_tech/`. The
`type` decides which folder inside it: `fabber_builds/`, `factory_builds/`,
`platoon_builds/`, or `platoon_templates/` for `template`.

```js
inventory.addAIMods([
  { type: "factory", op: "load", value: "mym_upgrade_myunit.json" },
]);
```

You write that file yourself. Put it in your own mod at the matching path, for example
`pa/ai_tech/factory_builds/mym_upgrade_myunit.json`, next to your `ui` folder. Copy the
shape from one of the game's build files in `{PA_INSTALL_DIRECTORY}/media/pa/ai/`. Name it
after your card, because a file with the same name as one in GWO or another mod would
replace it. Remember the `.json` at the end of `value`.

> **Check that the file really is there before you share the mod.** If a `load` names a
> file that is missing, the battle never starts. The loading screen hangs, and no error
> message points at the cause.

##### Changing one build entry

This example lets basic bot factories build a unit too, but only in the entry that
advanced bot factories already use:

```js
inventory.addAIMods([
  {
    type: "factory",
    op: "append",
    toBuild: "MyUnit",
    idToMod: "builders",
    value: "BasicBotFactory",
    refId: "builders",
    refValue: ["AdvancedBotFactory"],
  },
]);
```

Replace `MyUnit` with a real `to_build` name from the AI files.

### A shortcut for a card that improves one unit — `gwoCard.upgradeCard`

Many cards do the same simple thing. They take one unit that the player already has, make
it better, and are offered only after the player has that unit. Everything about such a
card is the same each time except the unit and the change, so GWO writes the rest for
you.

`gwoCard.upgradeCard` **is** the card. You return what it gives you, and there is no list
of parts to fill in.

```js
return gwoCard.upgradeCard({
  name: "!LOC:Dox Health",
  description: "!LOC:Increases the health of the basic infantry bot.",
  icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png",
  audio: "/VO/Computer/gw/board_tech_available_armor",
  requires: gwoUnit.dox,
  buff: function (inventory) {
    inventory.addMods(
      gwoCard.mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
    );
  },
});
```

It writes the parts that you would otherwise write yourself. The card is visible on the
board. It gives the player room for one more card, and adds the usual line that says so
to the description. It has the standard `getContext`. Its `deal` works out a sensible
chance, and returns `0` until the player has the unit named in `requires`.

- `name`, `description`, `icon`, `audio`: the same as
  [`summarize`, `describe`, `icon`](#summarize-describe-icon--name-description-picture)
  and [`audio`](#audio--the-discovery-voice-line-tech-cards) above, but written as plain
  text, without `_.constant` around them.
- `requires`: the unit that the card improves. The game never offers the card until the
  player has it.
- `buff`: what the card does, exactly as in [`buff`](#buff--what-the-card-does) above.
- `unless`: optional. The ID of a card that stops the game from offering this one. Use it
  when two of your cards would fight over the same unit.
- `chance`: optional. How often the game offers the card, when the standard chance is not
  what you want. See [`deal`](#deal--how-often-the-card-appears) for what the numbers
  mean.
- `slot: false`: optional. Don't give the player an extra card slot.

**It cannot take units away again**, because its `dull` is empty. A card that gives units
and must take them back is an ordinary tech card, written from `tech_card_id.js`.

The example `unit_upgrade_card_id.js` is already written this way.

**Don't put `_upgrade_` in the card's ID** if players of other races must get it. GWO
offers a card with `_upgrade_` in its ID only to MLA players, unless the card's
`model.gwoCardsToUnits` entry names race units. See
[Cards for another race or an add-on](#cards-for-another-race-or-an-add-on).

### Loadouts and `gwoCard.loadout`

A loadout has more to do than a tech card. It must give the player the game's standard
starting units as well as its own. It must notice when the same loadout turns up again
later in the war, and give a card slot instead of the units a second time. And when a
player wins a copy of it on a Guardian planet, it must record that in your bank, so that
the loadout unlocks.

`gwoCard.loadout` does all of that. Give it your card and the four things below, and it
gives back the card's `buff` and `dull`:

```js
var loadout = gwoCard.loadout(CARD, {
  bank: myBank,
  start: GWCStart,
  apply: function (inventory) {
    inventory.addUnits([gwoUnit.dox, gwoGroup.botsBasicMobile]);
  },
  dulls: [gwoUnit.dox, gwoGroup.botsBasicMobile],
});
```

- `bank`: your mod's bank, which the card lists at the top of the file. See
  [The bank and `LS_KEY`](#the-bank-and-ls_key--remembering-unlocked-loadouts).
- `start`: `GWCStart`, the game's standard starting units. Leave this as it is.
- `apply`: what your loadout gives the player. Write it exactly as you would write a tech
  card's [`buff`](#buff--what-the-card-does). Leave it out if your loadout adds nothing to
  the standard start.
- `dulls`: the units to take back if the player switches to a different loadout. Give a
  list, or a function that receives the inventory and returns a list. Leave it out if your
  loadout unlocks no units.

Then use what it gives you as the card's `buff` and `dull`:

```js
buff: loadout.buff,
dull: loadout.dull,
```

The example `start_card_id.js` is already written this way, so you fill in only the four
parts above.

### `dull` — cleanup after all cards

`dull` runs after every card's `buff` has finished. It mainly removes units, and it
usually lists the same units that the card's `buff` added. It cannot undo a stat change or
an AI change.

**Tech cards** remove units directly:

```js
dull: function (inventory) {
  inventory.removeUnits([gwoUnit.dox, gwoGroup.botsBasicMobile]);
},
```

**Loadouts** don't write their own `dull`. They use the one that `gwoCard.loadout` gives
them, and list the units to remove as its `dulls`, as above. Removing a loadout's units at
the right moment is difficult, and the helper does it for you.

### The bank and `LS_KEY` — remembering unlocked loadouts

Locked loadouts, the ones that you list in `model.gwoNewStartCards`, need somewhere to
record that the player has unlocked them. `bank.js` is that place. It saves the list in
the game's storage on the player's computer, under a name called `LS_KEY`.

Set `LS_KEY` in your `bank.js` to a value that is unique to your mod, so that it never
clashes with another mod's storage:

```js
var LS_KEY = "myname_mymod_bank";
```

Your loadout cards connect to this bank in three places. The example `start_card_id.js`
already contains the first two, and `start_cards.js` contains the third:

1. At the top of the loadout card, the `define([` block lists your `bank.js` so that the
   card can use it. **Change the identifier in this address to yours:**

   ```js
   "coui://ui/mods/<your identifier>/bank.js",
   ```

2. The card hands that bank to `gwoCard.loadout` as `bank`. When the player earns the
   loadout, it is recorded there:

   ```js
   bank: myBank,
   ```

3. `start_cards.js` tells GWO where the bank is, through
   [`model.gwoLoadoutBanks`](#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs).
   If you miss this step, the loadout stays locked forever.

The loadout screen then reads your bank, with the same `LS_KEY`, to decide whether to show
your loadout as unlocked. Having your own key has two benefits. If the player removes your
mod later, PA's built-in loadout list does not point at missing cards. And the player's
unlocks leave with the mod, instead of staying behind in another mod's storage.

A loadout reaches your bank in two ways. If the player wins a loadout on a Guardian
planet, GWO writes it to the bank itself. Your card's code does not run in that case,
which is why GWO needs the address above. The `bank` that you give to `gwoCard.loadout`
covers the other way.

Your bank also keeps PA's "loadouts unlocked" statistic up to date. `bank.js` already
does that, and there is nothing for you to do.

### Sharing your mod in a co-op war — `galacticWarMod`

`modinfo.json` holds a `galacticWarMod` entry, which the template sets to `false`. It
changes nothing in a war that you play alone. In a co-op Galactic War, it decides whether
every player must have your mod.

**Only the host decides.** A co-op war belongs to the player who starts it, the host. The
war uses the host's mods, and the other players join as viewers who play the host's war
with the host's cards. So the game reads `galacticWarMod` only from the mods that the host
has turned on. When you join someone else's war, your own copy of the entry only decides
whether your mods match the host's.

**`false` (the default).** Your mod stays your own. You can host a co-op war, or join one,
and no other player needs your mod. Use `false` for a mod that only you need, such as a
personal loadout.

**`true`.** Every player in a war that you host must have your mod, with the same
`version`. The game refuses a player who:

- does not have your mod. The game tells that player the name of the mod that they must
  install.
- has your mod turned on when you, the host, do not.

Use `true` for a mod that changes the war for everyone, such as new tech cards that all
players receive. To turn it on, change the line in `modinfo.json` to:

```json
  "galacticWarMod": true,
```

Because the `version` must match too, every player in the war must update the mod
together each time that you release a new version.

### Cards for another race or an add-on

GWO lets a player fight a war as a race from another mod: Legion, Bugs, or Exiles. It
also supports add-ons, which are mods that add more units to the races: Second Wave,
Section 17, and Osmech. A player needs
[GW Server Mods](https://github.com/Quitch/GW-Server-Mods) and the race's or add-on's
server mod for these.

**You don't need a separate card for each race to change ordinary units.** A card that
changes `gwoUnit.dox` or `gwoGroup.botsBasicMobile` also changes the Legion, Bugs, and
Exiles units of the same kind, and the add-on units of that kind. For example, a card for
the Dox changes every basic Legion combat bot. GWO finds them for you. Write a race card
only when you want to change one particular unit of a race or an add-on.

A unit of a kind that the base game has no unit for is the exception: no card for stock
units reaches it. Such units include Section 17's Big Bill, Pineapple, Floater, Horntail,
Poseidon, and gantries, the add-ons' fabrication towers and advanced storages, and the
Bugs research unlocks. To change one of them, name it, such as
`gwoUnit.section17.bigBill`.

This works for changes to values such as health, speed, cost, or damage. A change to
what a unit is stays on the stock unit: its `unit_types`, `buildable_types`, `tools`,
`base_spec`, `command_caps`, `model`, `display_name`, `description`, `si_name`,
`transportable`, `transporter`, or `attachable`. Once any card makes such a change to a
unit, no other change to that unit reaches the race units either. Keep `_upgrade_` in the
ID of a card like that (see the warning below).

> **Warning:** GWO offers a card whose ID contains `_upgrade_` only to MLA players, unless
> the card's `model.gwoCardsToUnits` entry names race or add-on units. An upgrade card is tuned to one MLA unit, so GWO
> does not pass it on to the other races. If a card that changes stock units must reach
> every race, leave `_upgrade_` out of its ID.

#### 1. Name the unit

A race or add-on unit has a GWO unit ID in two parts: the name of its table, then the
unit's key. For example, `gwoUnit.legion.shank` is the Legion Shank. The six tables are:

| Table                | Units of                                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `gwoUnit.legion`     | [Legion](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/race/legion.js)            |
| `gwoUnit.bugs`       | [Bugs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/race/bugs.js)                |
| `gwoUnit.exiles`     | [Exiles](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/race/exiles.js)            |
| `gwoUnit.secondWave` | [Second Wave](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/addon/second_wave.js) |
| `gwoUnit.section17`  | [Section 17](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/addon/section17.js)    |
| `gwoUnit.osmech`     | [Osmech](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/addon/osmech.js)           |

Each link opens a file. Find its `units` block. Each line in it reads `key: "path"`. You
write the table name, a dot, and the key. For example, the line
`shank: "/pa/units/land/l_tank_shank/l_tank_shank.json"` in the Legion file means that you
write `gwoUnit.legion.shank`.

Always write a key after the table name. `gwoUnit.legion` on its own is the whole table,
not a unit or a list of units, and the game ignores it.

A race unit can share a file with the base game, such as a weapon or its ammo. That file
has no race key. Some race files still show a line for it, with a base-game path such as
`havocBeamWeapon: "/pa/units/land/bot_sniper/bot_sniper_beam_tool_weapon.json"`, but that
key is not in `gwoUnit`: `gwoUnit.legion.havocBeamWeapon` names nothing, and the card
changes nothing. Use the file's own GWO unit ID if it has one, such as `gwoUnit.gilEBeam`,
or else its path. A change to it is a change to a base-game file. It also changes the
base-game unit that uses the file, and, in a war as another race, that race's units of the
same kind.

> **Warning:** GWO makes these keys from the race mod's own files. A key can change when
> the race mod is updated, so check your card after each update. A misspelled table name,
> such as `gwoUnit.legoin.shank`, causes an error, and the
> [checker](#checking-your-work) does not find it. In a card file, the error stops that
> card. In `tech_cards.js`, it stops the whole `model.gwoCardsToUnits` list, so every
> card in your mod loses its tooltip, and GWO no longer knows which race a card is for. A
> misspelled key, such as `gwoUnit.legion.shnak`, gives no error. In a card file, the card
> changes nothing. In `model.gwoCardsToUnits`, GWO no longer knows that the card is for
> that race: MLA players may be offered it, and players of the race may not.

#### 2. List the unit in `model.gwoCardsToUnits`

This is the step that makes the card a race card. Add the race or add-on units to the
card's entry in `tech_cards.js`:

```js
model.gwoCardsToUnits.push({
  id: "mym_upgrade_shank",
  units: [gwoUnit.legion.shank],
});
```

When an entry names a race or add-on unit, GWO offers the card **only** to a player who
can field one of the units in the entry. A Legion card is not offered to an MLA, Bugs, or
Exiles player. You need nothing else: no new list, and no new dependency in
`modinfo.json`.

This is for tech cards, which the game deals. Players pick loadouts themselves, so an entry
does not limit who can pick a loadout. A loadout that gives only Legion units gives
players of other races nothing.

List **only** race or add-on units in a race card's entry. If the entry also names a stock
unit, such as `gwoUnit.commander`, the game offers the card to every player who has that
kind of unit, whatever their race.

The same entry also works for a card whose ID contains `_upgrade_`, such as
`mym_upgrade_shank`. GWO offers such a card only to MLA players when it names only stock
units (see the warning above). When it names race units, it is written for that race, so
GWO offers it to that race.

#### 3. Check for the unit in `deal`

`inventory.units()` names only the ordinary units, even for a Legion player. The player's
race units are added when the battle starts. So in `deal`, use
`gwoCard.fieldedUnits(inventory)` in place of `inventory.units()`. It gives the units that
the player has, plus the race or add-on units that those units bring:

```js
deal: function (system, context, inventory) {
  var chance = 0;
  if (gwoCard.hasUnit(gwoCard.fieldedUnits(inventory), gwoUnit.legion.shank)) {
    chance = 60;
  }
  return { chance: chance };
},
```

With [`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard),
set `requires` to the race unit. Nothing else changes. This is a complete card:

```js
define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return gwoCard.upgradeCard({
    name: "!LOC:Shank Armor",
    description: "!LOC:Increases the health of the Legion Shank.",
    icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png",
    audio: "/VO/Computer/gw/board_tech_available_armor",
    requires: gwoUnit.legion.shank,
    buff: function (inventory) {
      inventory.addMods(
        gwoCard.mods(gwoUnit.legion.shank, "multiply", { max_health: 1.5 })
      );
    },
  });
});
```

#### 4. Change the unit in `buff`

`inventory.addMods` and `inventory.addUnits` work with race units exactly as they work
with the game's own units. Write the race unit's ID in `file`, or give it to `gwoCard.mods`,
as in the example above.

#### 5. A race or add-on from another mod

GWO's `gwoUnit` tables hold only the races and add-ons that GWO itself supports. Another
mod can add a race or an add-on to GWO. For its units, write the raw unit path. The card
works the same way if that mod gives GWO a list of its units, as a `units` table in the
race or add-on that it registers. Without that table, GWO treats the paths as base-game
units: MLA players may be offered the card, and once GWO has read that race's units, its
players are not. Check the other mod's files, or ask its author.

#### 6. Your own groups

You can make your own list of units, and use its name in place of a list of units. Write
it once in the card, inside the `function (...) {` that `define` opens, just above
`return`. `gwoUnit` exists only inside that function:

```js
var legionTanks = [gwoUnit.legion.shank, gwoUnit.legion.scorpion];
```

Then use it in `deal` and in `buff`:

```js
gwoCard.hasUnit(gwoCard.fieldedUnits(inventory), legionTanks);
inventory.addMods(
  gwoCard.flatMapMods(legionTanks, "multiply", { max_health: 1.25 })
);
inventory.addUnits(legionTanks);
```

`tech_cards.js` cannot see a list inside a card file, so write the same list again there,
inside the `function (gwoUnit) {` that `requireGW` opens, above
`model.gwoCardsToUnits.push`. Outside that function the line stops the whole file, and
the game deals none of your cards.

A list can sit inside a longer list, wherever a card takes a list of units:

```js
units: [legionTanks, gwoUnit.legion.earthshaker],
```

The one exception is a place that takes one file: the `file` of a change, and the first
value that you give `gwoCard.mods`. For a list, use `gwoCard.flatMapMods`.

Rules for groups:

- **A group can mix races.** A card that names Legion and Bugs tanks is offered to Legion
  players and to Bugs players. `inventory.addMods` and `inventory.addUnits` reach only the
  units of each player's own race.
- **Don't change a stock unit and its race version in the same card.** A change to
  `gwoUnit.ant` already reaches the Legion unit of the same kind. A second change to that
  Legion unit applies the change twice. Name the stock unit **or** the race unit, not
  both.

#### 7. Finding the value that you want to change

A race unit's file is not in the PA install folder. It is in the race's **server mod**.
The mod is a zip file in `download` in the PA data folder, or a folder in
`server_mods` in the PA data folder. The zip file names are:

- Legion: `com.pa.legion-expansion-server.zip`
- Bugs: `com.pa.ferretmaster.bugs.zip`
- Exiles: `com.pa.nik.exiles.zip`
- Second Wave: `pa.mla.unit.addon.zip`
- Section 17: `com.pa.daedelus.experimentals.zip`
- Osmech: `com.pa.loloares.thorosmen.zip`

Open the zip and find the unit's path from its `gwoUnit` table. Then follow
[Finding the value that you want to change](#finding-the-value-that-you-want-to-change)
from step 2. A `base_spec` can point to a file in the same zip or in the PA install
folder.

#### 8. Testing a race card

1. Enable GW Server Mods, your own mod, and the server mod of the race or add-on. For an
   add-on unit that belongs to Legion or Bugs, enable that race's server mod as well: a
   race is in the **Race** picker only while its own server mod is on.
2. Start a new Galactic War, and choose the race in the **Race** picker on the war setup
   screen. For an add-on unit, choose the race that the unit belongs to. The add-ons are
   not in the picker, and Second Wave has MLA, Legion, and Bugs units.
3. Follow [Testing tech cards](#testing-tech-cards) from step 2.

The test panel gives you the card whatever your race, so it cannot show which races the
game offers the card to. Only the units in the card's `model.gwoCardsToUnits` entry decide
that. Check that the entry names the race or add-on units, and that each name is spelled
correctly.

## Advanced features

**You can skip this whole section on your first card.** These features solve particular
problems, and most cards never need them.

### Setting your own distances — `gwoCard.farForSize`

If none of the three [distance checks](#making-the-chance-depend-on-how-far-the-player-has-travelled)
suits your card, set your own limits with `farForSize`. The last value is a list of nine
distances, one for each galaxy size, from smallest to largest. The check is true when the
star is further from the start than the entry for the galaxy size in play. This example
card is at its best in the middle of the map:

```js
deal: function (system, context) {
  var chance = 33;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 166;
  } else if (
    gwoCard.farForSize(
      system,
      context,
      GW.balance.numberOfSystems,
      [2, 3, 5, 6, 7, 8, 9, 10, 11]
    )
  ) {
    chance = 333;
  }
  return { chance: chance };
},
```

### Randomness in `deal`

Most cards never need this. If your card makes a random choice when the game deals it,
use the fourth value that `deal` receives, `rng` (short for "random number generator"),
instead of `Math.random()`:

```js
deal: function (system, context, inventory, rng) {
  return { chance: 40, params: { unique: gwoCard.uniqueValue(rng) } };
},
```

GWO gives each card its own `rng`, and that `rng` comes from the war's seed. This is what
makes a war repeatable: the same war dealt again offers the same cards, and every player
in a co-op game sees the same cards. `Math.random()` has no link to the seed. A card that
used it would deal differently every time, and players in the same game would disagree
about what the game offered.

`rng` is **optional**. Some ways of dealing a card don't supply one, and `rng` is then
`undefined`. `gwoCard.uniqueValue(rng)` handles that for you. If you take a random value
yourself, fall back to another method when `rng` is missing:

```js
var pick = rng ? rng.pick(list) : _.sample(list);
```

> **Your `chance` must never be random.** Only `params` may be random. GWO asks every card
> in the deck for its chance several times, and keeps only one of the answers. A chance
> that changed between those questions would make the card's real likelihood depend on how
> many times the dealer asked. You cannot predict or balance that.

### Co-op games — `gwoCard.anyPlayerHasCard` and `gwoCard.getAllConnectedPlayerCards`

The `inventory` that your card receives belongs to the local player. In a co-op war every
player has their own hand, so a card that must react to the whole team has to look wider.
Two helpers do that:

- `gwoCard.anyPlayerHasCard(inventory, "some_card_id")`: true when the player _or_ any
  connected co-op player holds that card.
- `gwoCard.getAllConnectedPlayerCards(inventory)`: every card held by the player and
  their connected co-op players, as one list. Each entry has an `id`.

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.anyPlayerHasCard(inventory, "gwaio_enable_tsunami"),
    60
  );
},
```

Outside a co-op game they answer for the one player, so you can use them anywhere. GWO
uses them for things that the whole war shares, such as whether Tsunami Tech floods the
planets that everyone fights on. No GWO card needs them, so use `inventory.hasCard` first,
and use these two only when your card's effect really covers the whole team.

### `keep`, `discard` and `releaseContext` — rare parts

**You almost certainly don't want these.** They are left over from the way that PA's own
cards worked. No GWO card uses `keep` or `discard`, and under GWO they don't do what their
names say. This guide describes them only so that you recognise them in a card that you
copy from PA.

In PA, `keep` ran when the player kept a card, and `discard` ran when the player threw a
card away, which let a card change its own future chance. GWO replaces PA's dealing
completely, and as a result:

- **Nothing ever calls `discard`.** A card that depends on it does nothing, and reports
  nothing.
- **GWO calls `keep` every time it deals the card**, whether the player keeps it or not.
  It gives `keep` the result of your `deal`, which is the `{ chance: … }` that you
  returned, not PA's `params`.

So if you copy a PA card that uses either part, delete that part, and move its logic into
`deal`, where you can read the `inventory` and the `system` directly.

`releaseContext` is the one useful part of this group. If your card writes its own
`getContext` and must clean something up afterwards, GWO calls `releaseContext(context)`
after it has dealt the card:

```js
releaseContext: function (context) {
  // let go of anything getContext set up
},
```

### More unit-stat ops — `wipe`, `clone` and `eval`

- `wipe`: despite its name, this does not clear the value. It finds and replaces text
  inside a text value. `value` is a pair, `[what to find, what to put in its place]`. A
  single value on its own means "delete every occurrence of this".
- `clone`: copies whatever is at `path` into the file named by `value`.
- `eval`: runs `value` as raw JavaScript. The game gives you the thing at `path` as
  `attribute`, and you can do what you like with it. If you used a `path`, remember to
  return `attribute` at the end.

> **`clone` and `eval` are advanced. Avoid them.** They are easy to get wrong, and one of
> the everyday ops can nearly always do the same work more safely. `eval` in particular
> runs your own code inside the game, so a mistake there can break the war rather than
> only change a number.

### More AI changes

#### The shape of a build entry

You need this before you use `new` or `remove`. Each entry in an AI build file has
`to_build`, `priority`, `builders`, `instance_count` and `build_conditions`. The
`build_conditions` of an entry is a **list of lists**. Each inner list is a group of
tests, and every test in a group must pass. The AI builds the entry if any one group
passes. `remove` needs a `value` that is an exact copy of a whole test.

`matchAll: true` changes every build condition on the entry, instead of only the ones
where `refId` holds `refValue`.

#### When your card replaces builds — `treeOnly`

A file that you [load](#loading-a-ready-made-build-file--load) joins the AI's build files.
So every other AI change of the same `type` also applies to that file: your card's other
changes, and the changes of every other card that the player holds. Usually that is what
you want, because an upgrade card then improves your new entries too.

But there is a trap. Some cards stop the AI's own builds and supply their own instead.
Such a card sets the `priority` of an entry to `0`, and its `load` file has a replacement
entry with the same `toBuild` name. The first change then sets the replacement to `0`
too. The AI builds nothing, and nothing reports it.

To prevent this, put `treeOnly: true` on each change that must not apply to a loaded file:

```js
inventory.addAIMods([
  // Stop the AI's own bot factory builds...
  {
    type: "fabber",
    op: "replace",
    toBuild: "BasicBotFactory",
    idToMod: "priority",
    value: 0,
    treeOnly: true,
  },
  // ...and supply your own from this file.
  { type: "fabber", op: "load", value: "mym_start_myloadout.json" },
]);
```

`treeOnly` keeps the change away from every loaded file, not only the file that your card
loads. `load` and `squad` don't read it. GWO's Rapid Deployment loadout is a full example:
read `gwaio_start_rapid.js` in GWO's `cards` folder.

`silence`, below, is a second way to stop the AI's own builds, and it reads `treeOnly`
too. If your card uses `silence` and also loads replacement entries, put `treeOnly: true`
on the `silence` change, or it stops the loaded entries as well.

#### Stop everything else that a builder builds — `silence`

Some cards change what a builder can build. For example, the factories of the Rapid
Deployment loadout build only fabricators. The AI must then stop ordering everything else
from that builder. One `replace` for each entry makes a long list, and it misses the
entries that other mods add. `silence` does the work with one change:

```js
inventory.addAIMods([
  {
    type: "factory", // fabber, factory, or platoon
    op: "silence",
    value: {
      builders: ["BasicBotFactory", "AdvancedBotFactory"],
      except: ["BasicBotFabber", "AdvancedBotFabber"],
    },
    treeOnly: true, // optional
  },
]);
```

`silence` sets the `priority` to `0` on every entry whose `builders` are **all** in
`value.builders`. It does not change an entry whose `to_build` name is in `value.except`.
It also leaves alone an entry that has any builder outside `value.builders`, or that has
no `builders`.

`silence` uses only `type`, `op`, `value`, and `treeOnly`. It ignores `toBuild`,
`idToMod`, `refId`, `refValue`, and `matchAll`. `builders` and `except` must both be lists
of names, but `except` can be an empty list. A `value` with the wrong shape changes
nothing and reports nothing.

> **`silence` needs a version of GWO newer than v7.3.1.** Older versions don't know the
> op, and the change does nothing.

#### `new`, `remove` and `squad`

These change the AI's build files in ways that need a good understanding of them:
`new` adds a build condition to an entry, `remove` takes one away, and `squad` changes the
units in a platoon template. There are no examples here. Read GWO's cards that use them,
in its
[cards folder](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards),
and copy their shape.

## Checking your work

Do this before you start the game. PA is strict: **one typing mistake stops the whole
file**, not only the line that it is on. After a missing comma or an unclosed bracket, your
card simply never appears, and nothing in the game tells you why. The checker finds that
kind of mistake in seconds.

### The editor extension (recommended)

This needs [Visual Studio Code](https://code.visualstudio.com/) and
[Node.js](https://nodejs.org/).

1. Install Node.js. The default choices in its installer are fine.
2. In Visual Studio Code, open the Extensions panel (the blocks icon in the left sidebar),
   search for `ESLint`, and install the one from Microsoft.
3. Open your mod folder in Visual Studio Code with **File** → **Open Folder**. Open the
   folder, not a single file, or the checker cannot find its settings.
4. Open a terminal (**Terminal** → **New Terminal**), type `npm install`, and press Enter.
   This downloads the checker into a `node_modules` folder. You do this once only.

From then on, the editor underlines mistakes in red as you type, and shows an explanation
when you hover the pointer over one. There is nothing to run and nothing to remember.

You don't need to move or set up anything else. `package.json` and `eslint.config.mjs`
came with the template, and they already sit next to your `ui` folder. The game ignores
them.

### From a terminal

To check the whole mod at once, for example before you release it, run this in your mod
folder after the `npm install` above:

```bash
npm run lint:js
```

It prints one line for each problem, with the file and the line number. No output means no
problems.

### What it catches

- **Typing mistakes**: a missing comma, or a bracket or quotation mark that is not closed.
- **Newer JavaScript that PA cannot run.** The browser inside PA is very old. Modern
  JavaScript that you may have seen elsewhere, such as `let`, `=>`, backtick strings and
  `class`, does not even load, and takes the whole file down with it. The checker knows
  exactly what PA supports, and reports the rest.
- **Functions that PA does not have**, such as `Object.assign` and `Array.from`. These are
  worse than a typing mistake, because the file loads and the card fails only when a
  player uses it.

If you are not sure whether you can use something, write it and see whether anything
turns red. `eslint.config.mjs` holds the full list of what PA supports.

## Testing your mod

Run the [checker](#checking-your-work) first. It finds the mistakes that stop a card from
loading at all, which are the hardest to track down from inside the game.

### Setting up

1. Add `--devmode` to PA's Steam
   [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955), next to
   `--coherent_port=9999` from [Requirements](#requirements). `--devmode` turns on the
   test panel that you use below.
2. Launch PA.
3. Open **Community Mods**, find your mod in the INSTALLED list, and enable it.
4. Return to the main menu.
5. Start the Coherent UI Debugger from the folder where you unzipped it. Check that the
   address box says `localhost` and the port is `9999`, and click **GO**.
6. The debugger lists the game's screens. Click **Start Page**, which is the main menu.
7. Switch to the **Console** tab. The game's messages appear here.

Keep the Console open while you test, and watch for red errors.

PA prints these two messages in normal play, up to once for each screen. They are **not**
a problem:

- ERROR: _Uncaught TypeError: undefined is not a function_
- WARN: _Synchronous XMLHttpRequest on the main thread is deprecated because of its
  detrimental effects to the end user's experience. For more help, check
  <http://xhr.spec.whatwg.org/>._

Learn these two:

- ERROR: _Uncaught Error: Script error for: cards/SOME_ID_

  You listed `SOME_ID` somewhere, but there is no `SOME_ID.js` in
  `ui/main/game/galactic_war/cards/`, or the file has a typing mistake that stops it from
  loading. The usual cause is a misspelled ID, an example ID that you forgot to delete, or
  a typing mistake that the [checker](#checking-your-work) would find. From a **tech
  card** list this is harmless, because the game skips the card. From a **loadout** list
  it is fatal: a new war then hangs forever. See the warning under
  [`model.gwoStartingCards`](#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

- WARN: _Warning: File not found in mod Object_

  A card tried to change a file that the player has no copy of, so the game skipped that
  change. **This message is normal.** Galactic War copies only the files that the
  player's units need, and it deals a card that changes several units to players who own
  only some of them. It drops the changes for the rest, which is exactly what should
  happen. Click the `Object` in the debugger to see which `file` it was.

  It is a problem only when the file is one that the card _should_ have been able to
  change: a unit that the card `requires`, a file reached from one of those, or a file
  that you borrowed from another unit and forgot to list in
  [`model.gwoSpecs`](#modelgwospecs--extra-unit-files-to-change-in-specsjs). A typing
  mistake in the path looks the same, so check the spelling of `file` against the
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  before you decide that the message is the harmless kind.

### Testing tech cards

1. Start a new Galactic War.
2. Click the **X** in the bottom left-hand corner of the war screen. It opens the test
   panel, which appears only with `--devmode`.
3. Type your card's ID into the panel's text box, and click the **+** to its right. The
   panel finds only the cards that you registered in `model.gwoCards`, so an unregistered
   card is not found.
4. Check that the card appears in your hand, and that no new errors appear in the Console.
5. Hover over the card, and check that its name, description, picture and tooltip look
   right.
6. In the debugger, tick the **Preserve log** box, so that the Console keeps its messages
   when the battle loads.
7. Start a fight.
8. Check that no unexpected errors appear in the Console.
9. In the battle, build the units that your card changes, and check that they behave as
   the card says. Cards apply only inside Galactic War, so an ordinary skirmish or sandbox
   game shows the game's normal units, not your changes.

### Testing loadouts

1. Open the Galactic War loadout screen.
2. Check that your loadout is listed, locked (for a locked loadout), and shows its hint.
3. Check that no errors appear in the Console.
4. To unlock the loadout for testing, switch the debugger to the **Resources** tab.
5. Expand **Local Storage**, and click `coui://`.
6. Find the key with the same name as your `LS_KEY`. If there isn't one, right-click the
   empty line at the bottom of the list and create it.
7. Right-click the key, choose to edit its value, and add your loadout ID. The finished
   value should look like this, with your own ID or IDs in it:
   `{"startCards":[{"id":"mym_start_myloadout"}]}`. If the value already lists other
   loadouts, add yours to the list, with a comma between the entries:
   `{"startCards":[{"id":"mym_start_other"},{"id":"mym_start_myloadout"}]}`.
8. Press Enter to save.
9. Press F5 to reload the loadout screen.
10. Check that your loadout is now unlocked and can be selected.
11. Start a war with it, and check that you get the units that it gives.

## Translating your mod

**This section is optional.** Your mod works in English without it. Do it only if you want
players to read your cards in their own language.

The game cannot load translations from a mod by itself. The
[Mod Translations](https://github.com/Quitch/Mod-Translations) mod adds that ability, and
GWO already uses it. A player who does not have Mod Translations sees your text in English.
A player whose language you have no file for also sees English. Nothing breaks in either
case.

There are four steps. Each one fails without a message if you get it wrong, so do them in
order, and then do the [test](#testing-your-translations) at the end.

### Step 1: add the dependency in `modinfo.json`

Open `modinfo.json` and add `"com.pa.quitch.modtranslations"` to `dependencies`, next to
GWO. Community Mods then installs Mod Translations together with your mod.

```json
  "dependencies": ["com.pa.quitch.gwaioverhaul", "com.pa.quitch.modtranslations"]
```

In the same file, keep `priority` above `50`. The template sets it to `100`, which is
correct. The game loads mods from the lowest `priority` number to the highest, and Mod
Translations uses `50`. A mod at `50` or below can run before Mod Translations exists.
Your text then stays English, and no error tells you why.

### Step 2: create the register script

Create a new file, `translations.js`, in `ui/mods/<your identifier>/`, next to
`tech_cards.js`. Put this in it, and change `<your identifier>` to your mod's
`identifier`:

```js
(function () {
  try {
    // Mod Translations supplies window.ModTranslations.  If the player does
    // not have that mod, this script does nothing and your text stays English.
    if (window.ModTranslations) {
      window.ModTranslations.register("<your identifier>");
    }
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
```

> **This is a fourth place for your identifier.** [Preparing the mod](#preparing-the-mod)
> names three places that must agree. The identifier in this script must agree with them
> too. Mod Translations uses it to find your files, so a different identifier finds
> nothing and reports nothing.

### Step 3: list the script under `global_mod_list`, and nowhere else

Open `modinfo.json` again and add a `global_mod_list` entry to `scenes`, next to the three
entries that are already there:

```json
  "scenes": {
    "global_mod_list": ["coui://ui/mods/<your identifier>/translations.js"],
    "gw_play": [
```

Don't add `translations.js` to `gw_play`, `gw_start` or `gw_coop_per_player_loadout`.
This is the one exception to the rule in
[Understanding the pieces](#understanding-the-pieces) that a loader goes on every screen
that needs it.

The reason is timing. The game translates the text of its own screens, and remembers the
result, before it runs any one screen's list. A script under `gw_play` or `gw_start`
therefore registers your translations too late, and some of your text stays English until
the player leaves that screen. A script under `global_mod_list` runs on every screen, and
runs before that first translation.

### Step 4: write the translation files

Create a folder named `translations` in `ui/mods/<your identifier>/`. Put one file in it
for each language, named `<lang>.json`.

`<lang>` must be the name of a folder in
`{PA_INSTALL_DIRECTORY}/media/ui/main/_i18n/locales/`, for example `de`, `fr`, `es-ES`,
`ru` or `zh-CN`. Copy the name exactly. A name that is not in that folder never loads.

A regional language also reads its base language's file. A player who uses `de-AT`
(Austrian German) gets `de-AT.json` first and then `de.json`, so one `de.json` serves
both.

Each file is a list of your English texts, and each text has its translation as
`message`:

```json
{
  "Bot Damage": { "message": "Bot-Schaden" },
  "Increases the damage of your basic bots.": {
    "message": "Erhöht den Schaden deiner einfachen Bots."
  }
}
```

You can also keep an `en-US.json` that lists every key, with a `description` of each one
for your translators. The game never loads that file. It is only a catalogue.

#### The key must be your English text, exactly

The key is the English text exactly as you wrote it after `!LOC:` in the card. Every
character counts, including capital letters, punctuation, numbers and `<br>`. Only spaces
at the very start and the very end don't count. For `"!LOC:Bot Damage"` the key is
`"Bot Damage"`.

**A key that does not match leaves that one text in English, and no message tells you.**
Copy each key out of the card file. Don't type it again.

These rules follow from that:

- If you change the English wording in a card, you change the key. Update that key in
  every language file at the same time.
- `message` must not be empty. Mod Translations ignores an empty `message`.
- A key that contains `;;` or `::` can never work. Change the English text in the card so
  that it contains neither.
- Keep numbers and `<br>` the same in the translation as in the English text.

Text that needs a key:

- `summarize`, `describe` and `hint` in a card.
- `name` and `description` in a `gwoCard.upgradeCard` card.
- `name` and `tooltip` in a deck.

Text that needs no key: the line "Adds a new slot for another technology." that
`gwoCard.upgradeCard` adds to a description. That line belongs to GWO, which already
translates it.

**Put only your own text in your files.** When two mods translate the same key, the mod
with the higher `priority` number wins everywhere that the key appears. GWO's `priority`
is `200`, so it wins against the template's `100`.

#### Unit names

A unit's name in your text is a special case, and the unit's own file decides it. Open
the unit's `.json` file in the PA install, and read its `display_name` entry:

- **Without `!LOC:`**, for example `"Dox"`, `"Ant"`, `"Colonel"`, and most of the units
  that TITANS added. The game shows that name unchanged in every language. Write the name
  unchanged in your translated text. A `"Dox"` key of your own does nothing, because the
  game never looks that name up.
- **With `!LOC:`**, for example `"!LOC:Bot Factory"`. The game translates that name. Use
  the game's own wording for that language, so that your card agrees with the rest of the
  screen. The game's translation files are in
  `{PA_INSTALL_DIRECTORY}/media/ui/main/_i18n/locales/<lang>/`.

### Testing your translations

1. Do the steps in [Testing your mod](#testing-your-mod), so that the Console is open.
2. In the game, open Settings and change the language to one that you have a file for.
3. Open Galactic War again, and read your cards' text.
4. In the Console, find a line that starts with `[ModTranslations]`, followed by your
   identifier and the language:

   ```text
   [ModTranslations] com.pa.yourname.modname de {"languages":["de"],"added":2,"replaced":0,"invalid":0}
   ```

   `languages` lists the files that the game found. `added` is the number of texts that it
   took from them. `invalid` counts the entries that it ignored.

If something is wrong, the result tells you where to look:

- **No `[ModTranslations]` line with your identifier.** `translations.js` is not under
  `global_mod_list`, the address there does not contain your identifier, Mod Translations
  is not enabled, or your `priority` is `50` or below.
- **`languages` is empty, or `added` is `0`.** The game did not find your file. Check the
  name of the `translations` folder, the file's name against the `locales` folder, and the
  identifier in `translations.js`.
- **A red error that names your file.** The file is not valid JSON. The usual cause is a
  missing comma or quotation mark.
- **`invalid` is above `0`.** An entry has an empty `message`, or its key contains `;;`
  or `::`.
- **One text is still English.** Its key does not match the English text in the card.
  Copy the text from the card again.

## Releasing your mod

When your mod is ready to share, update these entries in `modinfo.json`:

1. `version`: a version number, such as `1.0.0`. Consider
   [semantic versioning](https://semver.org/).
2. `date`: the release date, written as `yyyy-mm-dd`
   ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).
3. `build`: the number in the `version.txt` file at the top of your PA install folder.
4. `forum`: the web address of your mod's discussion thread (a Steam or GitHub Discussions
   thread is fine).
5. `icon`: the web address of a publicly visible PNG image for your mod.

Then decide whether a co-op war that you host must require your mod; see
[Sharing your mod in a co-op war](#sharing-your-mod-in-a-co-op-war--galacticwarmod).

You can delete the example card files and loaders that you did not use, and their lines
in `modinfo.json`. The game loads a card only when a loader registers it, so a leftover
example card does no harm, but deleting it keeps your mod tidy.

Then make sure that your mod is on GitHub as a repository of its own, with `modinfo.json`
at the top level of the repository. Don't upload a ZIP file to a repository.

- If you started from **Use this template** in [Preparing the mod](#preparing-the-mod),
  commit and push your final changes. Your repository is the release. The template's
  `.gitignore` file already keeps the checker's `node_modules` folder out of it.
- If you **downloaded the files**, create an empty repository on GitHub and upload the
  contents of your mod folder into it, so that `modinfo.json` sits at the top level and
  not inside a subfolder. **Don't upload the `node_modules` folder**, if you have one. It
  holds the checker, it is large, and nobody else needs it.

Everything else can stay. The game ignores what it does not recognise, and the next person
who opens your mod gets the checker and this guide with it.

Finally, post the address of your repository in the `#new-mod-submissions` channel on the
[official PA Discord](https://discord.gg/pa), so that your mod can be listed in Community
Mods.
