# New Galactic War Cards

This is a mod template. Use it to add new loadouts and tech cards to the Galactic War in
Planetary Annihilation: TITANS (PA). You must also install the
[Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) (GWO) mod, because your
cards connect to GWO.

You do **not** need to know how to write programs. You will edit a few text files. Copy
the examples in this guide, then change the labelled parts. This guide assumes that you
know Planetary Annihilation. It assumes no knowledge of code, and none of Galactic War
Overhaul.

## Contents

1. [What this template does](#what-this-template-does)
2. [Requirements](#requirements)
3. [Preparing the mod](#preparing-the-mod)
4. [Understanding the pieces](#understanding-the-pieces)
5. [Creating a card](#creating-a-card)
6. [Feature reference](#feature-reference)
7. [Minimum required changes](#minimum-required-changes)
8. [Checking your work](#checking-your-work)
9. [Testing your mod](#testing-your-mod)
10. [Releasing your mod](#releasing-your-mod)

## What this template does

Galactic War has two kinds of cards:

- **Loadouts** (also called _start cards_) — the starting hand that you pick before a war
  begins. Some loadouts are available immediately. Others stay locked until you earn them.
- **Tech cards** — the upgrades that the game offers you while you fight across the
  galaxy. They can unlock units, change unit stats, and change what the AI subcommanders
  build.

This template gives you a complete mod folder with working examples of both kinds. Copy
the folder, rename it, and complete the blank values.

> **Note:** Galactic War does not support server mods. You can therefore use and change
> only the units that come with the game, including the Titans expansion. You cannot add a
> new custom unit to a Galactic War card, and you cannot use a unit from another server
> mod.

## Requirements

You will edit text files. Any plain-text editor works. A code editor such as
[Visual Studio Code](https://code.visualstudio.com/) is better, because it colours the
text and shows mistakes.

The template also includes a checker. The checker reads your card files and reports
mistakes before you start the game. You do not have to install it, but we recommend that
you do. [Checking your work](#checking-your-work) explains how.

For testing you need the
[Coherent UI Debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip).
It is a free tool, and it shows you what the menus of the game do. To let it connect to
PA, add `--coherent_port=9999` to the Steam launch options for the game.

## Preparing the mod

1. Find your [PA data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176)
   and open the `client_mods` folder inside it. If that folder does not exist, create it.
2. Get your own copy of this template into `client_mods`. There are two ways. Choose one
   now, because it decides how you release the mod later.

   - **Use this template on GitHub (recommended).** This repository is a GitHub template.
     On its [GitHub page](https://github.com/Quitch/New-GW-Cards), click **Use this
     template** and then **Create a new repository**. GitHub makes a new repository under
     your account that starts with the contents of this one. You can do this as many
     times as you like, so one account can hold several card mods. Then
     [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
     your new repository into `client_mods`. Work on the files in that clone, and
     [commit and push](https://docs.github.com/en/get-started/using-git/about-git#example-contribute-to-an-existing-repository)
     your changes to your repository as you go. When the mod is ready, it is already
     published. Do not use the **Fork** button instead: GitHub allows only one fork of a
     repository per account, and a fork is tied to this template in ways that a new
     repository is not.
   - **Download the files.** On the [GitHub page](https://github.com/Quitch/New-GW-Cards),
     click **Code** and then **Download ZIP**. Unpack the ZIP into `client_mods` and
     rename the unpacked folder to a name of your choice. You publish the mod later by
     uploading the files to a repository of your own; see
     [Releasing your mod](#releasing-your-mod).

   Whichever way you chose, that folder in `client_mods` is now the root of your mod. It
   holds a few files that the game ignores, such as `README.md`, `package.json` and
   `eslint.config.mjs`. Leave those files where they are. They are the checker described
   in [Checking your work](#checking-your-work), and the checker works only from inside
   your mod folder.
3. Open `modinfo.json`, in the root folder of your mod, and complete these entries:
   - `identifier` — a unique name for your mod, in the style `com.pa.yourname.modname`.
   - `display_name` — the name that players see in the mod list.
   - `description` — a short summary of what your mod adds.
   - `author` — your name.
   - `scenes` — every web address here contains your identifier. Change that part of each
     address to the `identifier` that you chose above. Do not delete an entry, and do not
     change the order. A loader file appears under more than one scene on purpose, because
     Galactic War Overhaul reads your lists separately in each scene.
4. Inside your mod, open the `ui/mods/` folder. Rename the folder there (at present
   `com.pa.YOURNAME.MODNAME`) so that its name matches your `identifier` exactly.

> **Keep three things the same:** the `identifier` in `modinfo.json`, the `scenes` web
> addresses in that same file, and the folder name under `ui/mods/`. All three must use
> the same identifier. If they disagree, the game loads nothing and reports nothing.

### Sharing your mod in a co-op war — `galacticWarMod`

`modinfo.json` also holds a `galacticWarMod` entry. The template sets it to `false`. The
entry changes nothing in a war that you play alone. It applies only to a co-op Galactic
War. There it decides whether all the players must have your mod.

**Only the host decides.** A co-op war belongs to the player who starts it. That player is
the host. The war uses the host's mods. The other players join the war as viewers. A
viewer plays the host's war and receives the host's cards. The game therefore reads
`galacticWarMod` only from the mods that the host turned on. Your own copy of the entry
changes nothing when you join a war as a viewer. It only decides whether your mods agree
with the host's mods.

**`false` (the default).** Your mod stays your own. You can host a co-op war, or join one,
and no other player needs your mod. Use `false` for a mod that only you need, such as a
personal loadout.

**`true`.** All the players in a war that you host must have your mod. The game adds your
mod to the list of mods that the war requires. Each player who joins must have the same
mod, with the same `version`. The game refuses a player who:

- does not have your mod. The game shows that player the name of the mod that they must
  install.
- has your mod when you, the host, do not have it turned on.

The host's list is the full list, and a viewer must match it exactly. Use `true` for a mod
that changes the war for all the players, such as new tech cards that all players receive.

To turn it on, open `modinfo.json` and change the line to:

```json
  "galacticWarMod": true,
```

The `version` must also agree. Each time that you release a new version of the mod, all
the players in the war must therefore update it together.

## Understanding the pieces

Your mod folder has two important areas.

**The cards themselves** are in `ui/main/game/galactic_war/cards/`. Each card is one file.
The template supplies three examples:

- `tech_card_id.js` — an example tech card.
- `unit_upgrade_card_id.js` — an example tech card that improves one unit that the player
  already has. It is the shortest kind of card to write.
- `start_card_id.js` — an example loadout (start card).

**The loader files** are in `ui/mods/<your identifier>/`. These files tell Galactic War
Overhaul about your cards. When Galactic War loads, it reads them and adds your cards to
the game:

- `tech_cards.js` — lists your tech cards and their tooltips.
- `start_cards.js` — lists your loadouts, and tells Galactic War Overhaul where your
  `bank.js` is.
- `decks.js` — optional: offers a whole deck of your own in the Techs picker.
- `specs.js` — lists any extra unit files that you want to change.
- `bank.js` — records which of your locked loadouts the player has unlocked.

The game loads each of these files once for each screen that needs it. That is why
`modinfo.json` lists some of them more than once. Galactic War has three separate screens:
the loadout choice, the war itself, and the loadout choice in a co-op game. Each screen
starts empty. A loader that runs on only one screen therefore leaves your cards missing
from the other two.

The [Feature reference](#feature-reference) below explains what to put in each file, with
examples.

## Creating a card

There are two ways to start a new card. After you choose one, complete the parts of the
card with the [Feature reference](#feature-reference) below. A short comment in each
example card file labels each part. The Feature reference explains each part in full.

### Option 1: start from the template's example cards (recommended)

The template already includes three complete cards in the
`ui/main/game/galactic_war/cards` folder of your mod, so you do not have to copy a file:

- `unit_upgrade_card_id.js` — improves **one unit that the player already has**, and the
  game offers it only after the player has that unit. Start here if your card does that.
  It is the shortest of the three, because
  [`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
  writes most of the card for you.
- `tech_card_id.js` — a tech card, which the game deals to the player during the war.
  Start here for any other effect during a war: new units for the player, a change to a
  whole family of units, or a change to what the AI builds.
- `start_card_id.js` — a loadout, which the player chooses on the screen before the war
  starts.

Each of the three is a complete card. Every part is already there, holds a placeholder,
and has a comment beside it. Pick the card that you need and rename it, as described
below.

### Option 2: copy an existing card

If you would rather begin from a card that already does something close to what you want,
copy one of PA's own cards from
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/cards`, or one of Galactic War
Overhaul's cards from its
[cards folder on GitHub](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards),
and put your copy in the `ui/main/game/galactic_war/cards` folder of your mod.

### Then, whichever option you chose

1. Give the file a unique name. A common style is `ACRONYM_EFFECT_UNITTYPE.js`, for
   example `gwc_damage_bots.js`. **Remember the name without the `.js`** — that name is
   the ID of the card, and you use it in the loader files.

   **Loadouts have two more rules, and a mistake in either one reports nothing.** The ID
   of a loadout must contain `_start_`, because that is how the game recognises a loadout
   at all. The ID must **not** start with `gwc_start`, because that prefix is reserved for
   the loadouts that come with the game. Choose a short prefix of your own and write
   `_start_` after it, as the existing mods do: `gwaio_start_ceo`, `nem_start_nuke`. Write
   `mym_start_engineer`, not `gwc_start_engineer`.

   The result of a mistake here is difficult to see. The game treats an ID without
   `_start_` as an ordinary tech card, so it never appears on the loadout screen. The game
   treats an ID that starts with `gwc_start` as one of its own, so it writes the unlock
   into the storage of the game instead of into your bank. That record stays there after
   the player removes your mod, and it points at a card that no longer exists.

2. Change the parts of the card to do what you want, with the
   [Feature reference](#feature-reference).
3. Tell Galactic War Overhaul about the card. Add its ID to `tech_cards.js` for a tech
   card, including one that improves a single unit, or to `start_cards.js` for a loadout.

## Feature reference

This section explains every feature that you can use, with a worked example of each. Copy
the shape shown and change the labelled parts.

You will see two short forms everywhere:

- A **GWO unit ID** or **GWO group ID** is a short name that Galactic War Overhaul
  supplies, so that you do not type a full file path. Examples are `gwoUnit.dox` (a single
  unit) and `gwoGroup.botsBasicMobile` (a whole family of units). These names include
  ammos and weapons. The full lists are here:
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  and
  [group IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js).
- A **unit path** is the location of the file of a unit, written as
  `/pa/units/SOME_LAYER/SOME_UNIT/SOME_UNIT.json`. The game files hold Titans (expansion)
  units under `/pa_ex1/`, but the game mounts them into `/pa/`. Always write a `/pa/` path
  for them, never `/pa_ex1/`.

> **Prefer a GWO unit ID or group ID to a path.** When a GWO ID exists for the unit that
> you want, use it in place of a path. Galactic War Overhaul keeps the IDs up to date,
> they prevent path mistakes such as the `/pa_ex1/` trap above, and they make your card
> easier to read. Use a raw path only when no GWO ID exists for the unit.

### The lists that tell GWO about your cards

Galactic War Overhaul keeps several lists, and you add your cards to them. The name of
each list starts with `model.gwo`. The heading of each section below names the file to
write it in.

#### `model.gwoCards` — your tech-card deck (in `tech_cards.js`)

This is the main list of tech cards that the game can deal during a war. Add the ID of
each tech card, which is its file name without `.js`.

```js
model.gwoCards.push("gwc_damage_bots", "gwc_faster_air");
```

#### `model.gwoDecks` — your own deck in the Techs picker (in `decks.js`)

This list is optional. The Techs picker in the war setup normally offers two decks:
**Basic** (the base game's tech cards) and **Galactic War Overhaul** (the full GWO deck).
A deck that you add here appears beside them, and a war started with it deals only that
deck's cards. Cards pushed onto `model.gwoCards` are an addition to **every** deck, so
you do not need a deck to add cards — add one when you want players to choose a different
set of cards, for example a smaller themed deck.

```js
model.gwoDecks.push({
  id: "mym-nomad",
  name: "!LOC:Nomad",
  tooltip: "!LOC:Nomad-only tech.",
  include: ["Basic"],
  cards: ["mym_card_a", "gwc_minion"],
});
```

- `id` — a unique name for the deck. The war save remembers it.
- `name` — shown in the picker and on the war panel. The game already labels these
  places "deck", so do not put the word Deck in the name.
- `tooltip` — optional. One line for the Techs tooltip, describing the deck.
- `include` — optional. The IDs of other decks whose cards this deck contains: `"Basic"`,
  `"Expanded"` (the full GWO deck, which already contains Basic), or another mod's deck.
  To include another mod's deck, list that mod in `dependencies` in your `modinfo.json`
  **and** give your mod a **higher** `priority` number than that mod, so it loads first.
  Leave `include` out for a standalone deck.
- `cards` — optional. Individual card IDs: your own cards, or any stock card, so you can
  cherry-pick without including a whole deck.

A deck needs at least one card between `include` and `cards`. A card appears once however
many times these lists name it. Register the deck in all three scenes — `modinfo.json`
already lists `decks.js` under each. If the player removes your mod, a war started with
your deck deals the Galactic War Overhaul deck instead.

Unlike the other loaders, `decks.js` starts with its example commented out, because an
example deck would appear in the picker as soon as the mod is enabled. Remove the comment
marks and edit the values to use it.

#### `model.gwoCardsToUnits` — tech-card tooltips (in `tech_cards.js`)

This list connects a tech card to the units that it changes, so that the tooltip of the
card can list them. Add one entry for each card. The entry holds the ID of the card, and
the units that it changes as unit paths or as GWO unit or group IDs. Always name the unit
itself, not its ammo file or its weapon file, whatever the card changes.

```js
model.gwoCardsToUnits.push({
  id: "gwc_damage_bots",
  units: ["/pa/units/land/assault_bot/assault_bot.json", gwoUnit.dox],
});
```

#### `model.gwoCardsWithoutTooltip` — tech cards with no unit tooltip (in `tech_cards.js`)

List a tech card here when it does **not** change units, for example a card that only
enables a feature. Use this list **in place of** `model.gwoCardsToUnits`. If you do not,
Galactic War Overhaul warns that the card has no tooltip data. Add the ID of the card.

```js
if (!model.gwoCardsWithoutTooltip) {
  model.gwoCardsWithoutTooltip = [];
}
model.gwoCardsWithoutTooltip.push("gwc_enable_bounties");
```

#### `model.gwoCardsGrantingAdvancedTech` — cards that unlock advanced tech (in `tech_cards.js`)

Cards use this list, through
[`gwoCard.hasT2Access`](#cards-that-react-to-the-players-other-cards), to ask whether the
player has reached advanced (T2) tech. If one of your cards gives that access, add its ID
here, so that those cards can see it. Add the ID of the card.

```js
if (!model.gwoCardsGrantingAdvancedTech) {
  model.gwoCardsGrantingAdvancedTech = [];
}
model.gwoCardsGrantingAdvancedTech.push("gwc_enable_mybots_all");
```

#### `model.gwoNewStartCards` — locked loadouts (in `start_cards.js`)

These are the loadouts that the player must earn before use. They appear grey on the
loadout screen, and the game can award them as rewards on Guardian planets. Add one entry
for each loadout, with its ID.

```js
model.gwoNewStartCards.push({ id: "mym_start_myloadout" });
```

#### `model.gwoStartingCards` — unlocked loadouts (in `start_cards.js`)

These are the loadouts that are available from the start. The shape is the same as above.

```js
model.gwoStartingCards.push({ id: "mym_start_myloadout" });
```

> **Do not add a loadout to both the locked list and the unlocked list.**
>
> **Every ID in these two lists must have a card file with exactly that name. If one does
> not, Galactic War does not start.** This is the worst mistake in the whole template,
> because it breaks the game and not only the card. Galactic War Overhaul loads every
> loadout that you list here while it builds a new war. If one of them has no file,
> Galactic War Overhaul waits for a file that never arrives. The war finishes its
> generation, and the screen then stays as it is. There is no error, no message and
> nothing to click. Only a restart of the game ends it.
>
> The template arrives with four example IDs in these lists
> (`YOUR_LOCKED_LOADOUT_ID_1`, `YOUR_LOCKED_LOADOUT_ID_N`, `YOUR_UNLOCKED_LOADOUT_ID_1`,
> `YOUR_UNLOCKED_LOADOUT_ID_N`) and with no files for them. **The mod therefore does this
> to you the first time that you enable it.** Before you enable the mod, open
> `start_cards.js` and delete every example ID that you have not replaced with a real ID.
> You can delete all of them. A mod with no loadouts works correctly.
>
> Tech cards are safer. A missing tech card file logs an error, the game skips that card,
> and the war continues.

#### `model.gwoStarCardsWhichBreakAllies` — loadouts that disable the ally (in `start_cards.js`)

List the ID of your loadout here if its effect would break the allied-commander feature.
When the player picks that loadout, Galactic War Overhaul disables the allied commander.

Galactic War Overhaul does **not** create this list for you, unlike the other lists.
Create it yourself before you add to it, as shown.

```js
if (!model.gwoStarCardsWhichBreakAllies) {
  model.gwoStarCardsWhichBreakAllies = [];
}
model.gwoStarCardsWhichBreakAllies.push("mym_start_myloadout");
```

#### `model.gwoLoadoutBanks` — where your bank lives (in `start_cards.js`)

Your own `bank.js` records your locked loadouts, under your own `LS_KEY`. Galactic War
Overhaul cannot find that file without help, so you give it the address. **Without this
entry a locked loadout can never unlock**, and nothing warns you.

Galactic War Overhaul does not create this list for you either.

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
your loadouts, Galactic War Overhaul uses the prefix to see that the loadout is yours. It
then writes the loadout to your bank instead of its own. The prefix must match the start
of the loadout IDs that you chose.

`path` is the address of your `bank.js`, and it contains your identifier like every other
address in the mod.

Give the address, not the file itself. The screens that Galactic War Overhaul builds your
loadout list on run before the game loads any file of your mod. An address that Galactic
War Overhaul can read when it is ready is therefore the only way for it to have your bank
in time.

#### `model.gwoSpecs` — extra unit files to change (in `specs.js`)

Galactic War makes a player a copy of only the files that their own units need. If you
list a path here, every player also gets a copy of that file. There are two reasons to do
this.

The game does not normally use some unit files, for example the stomp of the Ares. To
change one of those, list its path here, so that Galactic War Overhaul loads it.

The second reason is to lend one unit a file that belongs to another unit: a weapon, a
build arm, or a unit that spawns on death.
[Whenever your value is a file name, `tag` it](#whenever-your-value-is-a-file-name-tag-it)
explains that. List the borrowed file here, and its ammo comes with it.

```js
model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
```

### What a card is made of

Each card file is a set of named parts, and you can recognise them by name inside the card
file. Every card uses some of the parts. A few parts belong only to loadouts, or only to
tech cards.

You do not always write all of them. Two common kinds of card already have most of these
parts. See
[a card that improves one unit](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
and [loadouts](#loadouts-and-gwocardloadout) below.

| Part             | Used by    | What it does                                                                                                                    |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `visible`        | all        | Whether the player can see the card on the board and discard it. Tech cards are usually visible. Loadouts and hidden cards are not. |
| `summarize`      | all        | The name of the card.                                                                                                           |
| `describe`       | all        | The description text of the card.                                                                                               |
| `icon`           | all        | The picture of the card.                                                                                                        |
| `deal`           | all        | How often the game offers the card. See below.                                                                                  |
| `buff`           | all        | What the card does. See below.                                                                                                  |
| `dull`           | all        | Cleanup. It runs after the `buff` of every card, and it usually removes units.                                                  |
| `audio`          | tech cards | The voice line that plays when the player finds the card.                                                                       |
| `getContext`     | tech cards | Gives the `deal` part information about the galaxy. Use `gwoCard.getContext`.                                                   |
| `hint`           | loadouts   | The picture and text shown while the loadout is still locked.                                                                   |
| `keep`           | rare       | Runs just after the game deals the card. It does not do what its name says. See below.                                          |
| `discard`        | rare       | Left over from PA's own cards. Galactic War Overhaul never calls it.                                                            |
| `releaseContext` | rare       | Runs just after the game deals the card, to release anything that `getContext` made.                                            |

#### `summarize`, `describe`, `icon` — name, description, picture

`summarize` is the name, `describe` is the description, and `icon` is the picture. Write
text that players read with a `!LOC:` prefix, so that it can be translated.

```js
summarize: _.constant("!LOC:Bot Damage"),
describe: _.constant("!LOC:Increases the damage of your basic bots."),
icon: _.constant(
  "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png"
),
```

The picture can be one of PA's own tech icons, as above. It can also be an image inside
your own mod, for example
`coui://ui/mods/<your identifier>/SOME_FOLDER/PNG_FILE_NAME.png`.

To see the icons that PA already has, open
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/gw_play/img/tech` and pick a file
name from that folder. A name that is not in the folder leaves the picture of the card
empty, and no error tells you why.

The example loadout is different. Its `icon` calls `gwoCard.loadoutIcon(CARD.id)`, which
shows the medal for the most difficult war that the player has won with that loadout.
Before their first win it shows a red commander. Leave that line as it is, unless your
loadout must always show one fixed picture.

#### `visible` — whether the card is shown

`_.constant(true)` lets the player see the card and discard it, which is normal for a tech
card. `_.constant(false)` hides the card, which is normal for a loadout.

```js
visible: _.constant(true),
```

#### `audio` — the discovery voice line (tech cards)

This is the voice line that plays when the player finds the card. Choose one of the lines
in the example file `tech_card_id.js`, such as `board_tech_available_bot`.

```js
audio: _.constant({ found: "/VO/Computer/gw/board_tech_available_bot" }),
```

#### `getContext` — galaxy information (tech cards)

This part gives the galaxy size to the `deal` part. Nearly all tech cards use the standard
one:

```js
getContext: gwoCard.getContext,
```

#### `hint` — the locked message (loadouts)

The loadout screen shows this while the loadout is still locked. It is the
locked-commander picture and one line of text. `gwoCard.lockedHint` supplies the picture,
so you write only the text.

```js
hint: gwoCard.lockedHint(
  "!LOC:I could be the loadout name or a hint about what this loadout does."
),
```

#### `deal` — how often the card appears

`deal` returns a **chance** number. A larger number makes the game offer the card more
often. `0` means never. The chances that the cards of Galactic War Overhaul use give a
rough guide: below 30 is a low chance, 30 to 70 is a normal starting chance, and above 120
is high.

The simplest form always uses the same chance:

```js
deal: function () {
  return { chance: 60 };
},
```

The chance can depend on the situation. The game gives the `deal` part four things: the
current `system`, the galaxy `context`, the `inventory` of the player, and an `rng`. The
`rng` is a random number generator. See [Randomness in `deal`](#randomness-in-deal) below,
which you can ignore unless your card makes a random choice. Galactic War Overhaul
supplies helpers for the first three:

- `gwoCard.hasUnit(inventory.units(), X)` — true if the player has **any** of unit(s) X.
- `gwoCard.hasAllUnits(inventory.units(), X)` — true if the player has **all** of unit(s) X.
- `gwoCard.missingUnit(inventory.units(), X)` — true if the player is missing **any** of
  unit(s) X.
- `gwoCard.missingAllUnits(inventory.units(), X)` — true if the player is missing **all**
  of unit(s) X.
- `context.totalSize` — the galaxy size (how many stars it has).
- `system.distance()` — how far the current system is from the start.

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (gwoCard.hasUnit(inventory.units(), gwoUnit.dox)) {
    chance = 120;
  }
  return { chance: chance };
},
```

##### Making the chance depend on how far the player has travelled

Distance is the usual way to hold a card back until later in a war. A plain
`system.distance()` number means different things in different galaxies. Five jumps is the
far edge of a small galaxy, and it is barely a start in a very large one. Galactic War
Overhaul makes that adjustment for you with three ready-made checks. Each check is true
after the player has travelled far enough **for the size of galaxy that they play**. A
card that uses them therefore behaves in the same way at every galaxy size:

- `gwoCard.travelledShort(system, context, GW.balance.numberOfSystems)` — past the
  nearby systems (true once the player is further out than roughly 55% of the galaxy's
  stars).
- `gwoCard.travelledModerate(system, context, GW.balance.numberOfSystems)` — well out
  from the start (true once the player is further out than roughly 70% of the galaxy's
  stars).
- `gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)` — deep into the
  galaxy (true once the player is further out than roughly 82% of the galaxy's stars).

Give all three arguments exactly as written. `GW.balance.numberOfSystems` is the list of
galaxy sizes of the game, and it comes from the `"shared/gw_common"` line that is already
at the top of your card file.

```js
deal: function (system, context) {
  var chance = 30;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 140;
  }
  return { chance: chance };
},
```

If none of the three suits your card, set your own limits with `farForSize`. The last
value is a list of nine distances, one for each galaxy size, from the smallest to the
largest. The check is true when the system is further from the start than the entry for
the size in play. Use `farForSize` only when the three checks above cannot give you the
shape that you want, for example a card that is at its best in the middle of the map
rather than at the edge:

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

You can combine any of these checks. You can also increase or reduce the chance instead of
replacing it:

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

##### Upgrade cards — `gwoCard.upgradeDeal`

An **upgrade card** improves something that the player already owns, and it gives them one
more card slot in return. It pays for its own place in the hand, so the game must offer it
even when the hand is already full. Every upgrade card in Galactic War Overhaul uses one
helper that does this for you, and your card must use it too:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced)
  );
},
```

Give it a true or false answer to the question "does the player have the thing that this
card upgrades?". When the answer is true, the game offers the card with a chance of 60.
When it is false, the chance is 0, so the game never offers an upgrade for something that
the player cannot use. To use a different chance, give that chance as a second value:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced),
    90
  );
},
```

A card dealt in this way must give the extra slot itself, in the first line of its `buff`:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

##### Cards that need something first — `gwoCard.conditionalDeal`

`gwoCard.conditionalDeal` is the simple form of `upgradeDeal`, for a card that gives no
card slot. Give it a true or false answer and a chance. It returns that chance when the
answer is true, and `0` when the answer is false. The card therefore stays out of the deck
until the player can use it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    70
  );
},
```

##### Naval cards — `gwoCard.navalWeight`

A player who owns ships cannot always use them, because most generated systems have little
water or none. Only two cards flood every planet that the player fights on: the naval
loadout and Tsunami Tech. `gwoCard.navalWeight` weighs a naval card by whether the player
holds one of those two. Give it the `inventory` and the chance that you want when there is
water to fight on. If the player holds neither card, it returns 40% of that chance
instead, so the game offers your card less often but does not withhold it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    gwoCard.navalWeight(inventory, 70)
  );
},
```

That pair is the shape of every naval tech card in Galactic War Overhaul. `navalWeight`
decides what the map is likely to be worth. `conditionalDeal` keeps the card out of the
deck until the player can build ships at all.

If your card has no value at all without water, and is not merely weaker, give a third
number. That number replaces the 40% default with a dry-map chance of your own. The
Anti-Ship and Anti-Hover Ammo Techs of Galactic War Overhaul go from 70 to 15 in this way:

```js
gwoCard.navalWeight(inventory, 70, 15);
```

##### Commander cards — `gwoCard.commanderWeight`

Your own commander and every Sub Commander come from the same unit file. A card that
changes commander stats therefore improves all of them together. The value of such a card
depends on the size of the retinue of the player, not on how far they have travelled, and
`gwoCard.commanderWeight` weighs it in that way. Give it the `inventory` and the chance
that you want when the player fights alone. Each Sub Commander that they have adds one
third of that chance, up to a maximum of double the chance:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.commanderWeight(inventory, 70) };
},
```

Both values are necessary. Unlike `upgradeDeal`, this helper has no default chance. Use it
in place of the distance checks above, not with them. A commander card is worth the same
at the edge of the galaxy as next to the start, and it is the retinue that has grown in
the meantime.

If your commander card also gives a card slot, `upgradeDeal` cannot weigh it for you,
because `upgradeDeal` takes a true or false answer and not a chance. Write the `deal` in
full, and keep the `allowOverflow` part yourself. `allowOverflow` is what lets the game
offer a card that pays for its own slot to a full hand:

```js
deal: function (system, context, inventory) {
  return {
    params: { allowOverflow: true },
    chance: gwoCard.commanderWeight(inventory, 35),
  };
},
```

##### Sub Commander cards — `gwoCard.subcommanderWeight`

Some cards improve only the Sub Commanders that fight with the player, and they leave the
commander of the player unchanged. Such a card has no value until the player recruits a
Sub Commander. That is a different question from the one that `commanderWeight` answers,
and `gwoCard.subcommanderWeight` is the helper for it. Give it the `inventory` and the
chance that you want:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.subcommanderWeight(inventory, 55) };
},
```

With no Sub Commander the chance is `0`, so the card stays out of the deck completely.
With one Sub Commander the game offers the card at the full chance that you gave, and not
at a part of it, so a card that has just become useful keeps a real weight. Each further
Sub Commander adds one third of that chance, up to a limit of 90, so that a large retinue
cannot fill the deck. That limit applies from the first Sub Commander, so a chance above
90 has no purpose: the helper reduces it to 90.

Both values are necessary. Use this helper in place of the distance checks, not with them,
as for `commanderWeight`. If your card also gives a card slot, write the `deal` in full
with the `allowOverflow` part, as shown above.

To choose between the two helpers, ask who the card changes. Use `commanderWeight` for a
card that improves every commander that the player fields, including their own. Use
`subcommanderWeight` for a card that helps only their Sub Commanders.

##### Cards that react to the player's other cards

`inventory.hasCard("some_card_id")` is true when the player holds that card. Use it to
build on another card, or to keep away from it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(!inventory.hasCard("gwc_start_orbital"), 60);
},
```

`gwoCard.hasT2Access(inventory)` asks that question for advanced (T2) tech. It is true
after the player holds any card that is listed in `model.gwoCardsGrantingAdvancedTech`.
Use it for a card that would have no value before the player can build advanced units:

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

##### Counter-tech cards — `gwoCard.antiTechDeal`

Galactic War Overhaul supplies a family of "anti" ammo techs: Anti-Air, Anti-Ship,
Anti-Bots and others. Each one doubles your damage against one kind of target and reduces
it against another. `gwoCard.antiTechDeal` is the deal that they share. Give it the
`inventory`, the chance that you want, and the ID of the card that is the opposite of your
card:

```js
deal: function (system, context, inventory) {
  return gwoCard.antiTechDeal(inventory, 70, "gwaio_anti_sea");
},
```

The chance falls to `0` when the player already holds that opposite card, so a pair can
never cancel each other out. The chance also halves after the player holds any
`gwaio_anti_` card of Galactic War Overhaul, so the deck stops offering more of them to a
player who has already committed to the theme. The halving counts only cards whose ID
starts with `gwaio_anti_`, which in practice means the cards of Galactic War Overhaul. It
does not count yours. Do not use the `gwaio_` prefix to make it count them: an ID that
matches one of Galactic War Overhaul's replaces the file of that card.

##### Co-op games — `gwoCard.anyPlayerHasCard` and `gwoCard.getAllConnectedPlayerCards`

The `inventory` that your card receives belongs to the local player. In a co-op war every
player has their own hand, so a card that must react to the whole team has to look wider.
Two helpers do that:

- `gwoCard.anyPlayerHasCard(inventory, "some_card_id")` — true when the player _or_ any
  connected co-op player is holding that card.
- `gwoCard.getAllConnectedPlayerCards(inventory)` — every card held by the player and
  their connected co-op players, as one list. Each entry has an `id`.

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.anyPlayerHasCard(inventory, "gwaio_enable_tsunami"),
    60
  );
},
```

Outside a co-op game they answer for the one player, so you can use them anywhere.
Galactic War Overhaul uses them for the things that a whole war shares, for example
whether Tsunami Tech floods the planets that everyone fights on. No card in Galactic War
Overhaul needs them, so treat them as the advanced option. Use `inventory.hasCard` first,
and use these two only when the effect of your card really covers the whole team.

**Loadouts do not use a chance.** The game grants a loadout only when the player picks it
on the loadout screen. The `deal` of a loadout is always:

```js
deal: gwoCard.startCard,
```

##### Randomness in `deal`

Most cards never need this. If your card makes a random choice while the game deals it,
use the fourth thing that `deal` receives instead of `Math.random()`:

```js
deal: function (system, context, inventory, rng) {
  return { chance: 40, params: { unique: gwoCard.uniqueValue(rng) } };
},
```

Galactic War Overhaul gives each card its own `rng`, and that `rng` comes from the seed of
the war. This is what makes a war repeatable. The same war dealt again offers the same
cards, and every player in a co-op game sees the same cards. `Math.random()` has no
connection to the seed. A card that used it would deal differently every time, and players
in the same game would disagree about what the game offered.

`rng` is **optional**. Some ways of dealing a card do not supply one, and `rng` is then
`undefined`. `gwoCard.uniqueValue(rng)` deals with that for you. If you take a random
value yourself, use a second method when `rng` is absent:

```js
var pick = rng ? rng.pick(list) : _.sample(list);
```

> **Your `chance` must never be random.** Only `params` may be random. Galactic War
> Overhaul asks every card in the deck for its chance several times over, and it keeps
> only one of the answers. A chance that changed between those questions would make the
> real likelihood of the card depend on the number of times that the dealer asked. You
> cannot predict or balance that.

#### `keep` and `discard` — rare chance adjustments

**You almost certainly do not want these.** They remain from the way that PA's own cards
worked. No Galactic War Overhaul card uses either of them, and under Galactic War Overhaul
they do not do what their names say. This guide documents them only so that you recognise
them in a card that you copy from PA.

The names come from PA. There, `keep` ran when the player kept a card, and `discard` ran
when the player threw a card away. That let the card change its own future chance.
Galactic War Overhaul replaces the dealing of PA completely, and as a result:

- **Nothing ever calls `discard`.** A card that depends on it does nothing, and reports
  nothing.
- **Galactic War Overhaul calls `keep` every time it deals the card**, whether the player
  keeps it or not. It gives `keep` the result of your `deal`, which is the
  `{ chance: … }` object that you returned, and not PA's `params`.

So if you copy a PA card that uses either part, delete that part. Move the logic into
`deal` instead, where you can read the `inventory` and the `system` directly.

`releaseContext` is the one genuinely useful part of this group. If your card writes its
own `getContext` and must release something afterwards, Galactic War Overhaul calls
`releaseContext(context)` after it has dealt the card:

```js
releaseContext: function (context) {
  // let go of anything getContext set up
},
```

### `buff` — what the card does

`buff` holds the effect of the card. Inside it you can do any combination of four things.
Each one is described below.

**A loadout does not write its own `buff`.** It gives the same code to `gwoCard.loadout`
as `apply`, and `gwoCard.loadout` then writes its `buff` and its `dull`. See
[Loadouts and `gwoCard.loadout`](#loadouts-and-gwocardloadout) below. Everything in this
section works in the same way inside `apply`.

#### Add a card slot

Give the player room for one more card in their hand:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

#### Unlock units — `inventory.addUnits(...)`

Give the player one unit or more. You can give a single unit or a list, as paths or as GWO
unit or group IDs.

```js
inventory.addUnits([
  "/pa/units/land/assault_bot/assault_bot.json",
  gwoUnit.dox,
  gwoGroup.botsBasicMobile,
]);
```

#### Change unit stats — `inventory.addMods(...)`

Change a number or a value inside the file of a unit. Four labels describe each change:

- `file` — which unit file to change (a path or a GWO unit ID).
- `path` — which value inside that file. A value at the top level is only its name, such
  as `max_health`. A value deeper in the file uses dots, such as
  `events.fired.effect_spec`. If a step along the path is the name of another file rather
  than a value, the game follows that reference into the other file and continues from
  there.
- `op` — the kind of change. The everyday choices are `multiply`, `multiplyOrCreate`,
  `add`, `replace`, `merge`, `push`, `prepend`, `pull`, and `wipe`. There is also `tag`,
  which you need whenever the value you write is the name of another file — see
  "Whenever your value is a file name, tag it" below. Two more, `clone` and `eval`, are
  advanced and best avoided.
- `value` — the amount or value to use.

Use `multiply` when the unit already has the value that you scale, and `multiplyOrCreate`
when it may not. `multiply` makes no change to a missing value, but `multiplyOrCreate`
sets that value to your `value`. `add` behaves like `multiplyOrCreate`: on a missing value
it simply sets the value.

```js
inventory.addMods([
  { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
  { file: gwoUnit.doxWeapon, path: "max_range", op: "replace", value: 120 },
]);
```

Most of the `op` choices do what their name says. `push` adds to the end of a list,
`prepend` adds to the start, `pull` takes something back out of a list, and `merge` folds
your value into an existing set of settings. Four choices are different:

- `wipe` — despite the name, this does not clear the value. It finds and replaces text
  inside a string. `value` is a pair, `[what to find, what to put in its place]`, and a
  single value on its own means "delete every occurrence of this".
- `clone` — writes whatever is at `path` into the file named by `value`.
- `tag` — points the file name at `path` to the player's own copy of that file. It takes
  no `value`. See the next section. This op is not optional when you need it.
- `eval` — runs `value` as raw JavaScript. The game gives you the thing at `path` as
  `attribute`, and you can do what you like with it. If you used a `path`, remember to
  return `attribute` at the end.

> **`clone` and `eval` are advanced. Avoid them.** They are easy to get wrong, and one of
> the everyday ops can nearly always do the same work more safely. `eval` in particular
> runs your own code inside the game, so a mistake there can break the war rather than
> only change a number.

##### Whenever your value is a file name, `tag` it

Galactic War does not change the unit files of the game. It gives each player a **private
copy** of every file that their units need, and it applies the whole hand of that player
to the copies. The player fights with the copies.

The game makes those copies **before** any card runs. A file name that your card writes is
therefore a name that your card invented, and it points at the original file, not at the
copy of the player. Nothing breaks. The weapon still fires and the unit still spawns. They
simply get none of the other tech of the player: no health card, no damage card, nothing.
There is no warning.

The correction is a second entry with the same `file`, the same `path`, `op: "tag"`, and
no `value` at all.

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

**Use the correct number.** Tools start at number `0`, and you must tag the numbering that
exists **after** your change. Every `replace` in every card in the hand runs before any
`push`, `prepend` or `tag`, so count in this way: open the file of the unit in the game
install, count the tools that it already has, and your pushed tool takes that number. The
Dox has one tool, so the pushed tool is number `1`. A `prepend` enters at `0` instead, and
it moves the other tools along by one.

**The file that you borrow must be in play.** A tag on a file that the player has no copy
of leaves the tool with no target, and the tool then disappears completely. That result is
worse than no tag. You are safe when the file already belongs to the unit that you change,
or to a unit that your card requires the player to own. A file borrowed from elsewhere,
such as the weapon of the Ant in the example above, must be listed in `model.gwoSpecs`
(see [`model.gwoSpecs`](#modelgwospecs--extra-unit-files-to-change-in-specsjs)). That list
is what makes a copy of the file exist. List only the weapon itself. The game copies its
ammo, and anything that the ammo spawns, with it.

##### A shorthand for writing changes — `gwoCard.mods`

Most cards change several things in the same file with the same `op`, which is repetitive
to write out in full. `gwoCard.mods(file, op, changes)` writes those entries for you. Give
it the file, the op, and one `path: value` pair for each change.

```js
inventory.addMods(
  gwoCard.mods(gwoUnit.antAmmo, "replace", {
    splash_damage: 63,
    splash_radius: 10,
    full_damage_splash_radius: 2,
  })
);
```

That is exactly the same as three `{ file, path, op, value }` entries written by hand.

To change a whole family of units in the same way, use `gwoCard.flatMapMods`. It does the
same work, but it takes a list of files:

```js
inventory.addMods(
  gwoCard.flatMapMods(gwoGroup.botsBasicMobile, "multiply", { max_health: 1.5 })
);
```

Some changes apply the same amount to several values together. To make a unit faster, you
change its speed, acceleration, braking and turning together. For those changes, give a
**list of paths** and one amount in place of `path: value` pairs. Galactic War Overhaul
names the three sets that cards change most often, so that you do not have to remember the
contents of each one:

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

A list that you write yourself works in the same way, and so does `gwoCard.flatMapMods`.

#### Change how the AI subcommander builds — `inventory.addAIMods(...)`

Change what the enemy, or your own subcommander, chooses to build. These labels describe
each change:

- `type` — which set of AI build files to change: `fabber`, `factory`, `platoon`, or
  `template`.
- `op` — the kind of change: `load`, `append`, `prepend`, `replace`, `remove`, `new`, or
  `squad`. `squad` works only on `template`. `append`, `prepend`, `replace`, `remove` and
  `new` work only on `fabber`, `factory` and `platoon`. A build op aimed at `template`
  does nothing and reports nothing, but `squad` aimed at one of the other three breaks the
  AI setup completely, so check the pair.
- `value` — the value to apply.
- `toBuild` — which thing in the build list of the AI to change (not needed for `load`).
- `idToMod` — which part of that entry to change (for example `builders` or `priority`).
- `refId` and `refValue` — optional. Make the change only when the entry already has
  `refValue` at `refId`.
- `matchAll` — optional. Change every build condition on the entry, instead of only the
  ones where `refId` holds `refValue`.

Each op needs a particular set of these labels. An op without a label that it needs does
nothing at all. There is no error and no change:

| `op`                           | needs, besides `type`         |
| ------------------------------ | ----------------------------- |
| `load`                         | `value`                       |
| `append`, `prepend`, `replace` | `toBuild`, `idToMod`, `value` |
| `remove`, `new`, `squad`       | `toBuild`, `value`            |

`toBuild` must match one of the build entries of the AI exactly. Those names are the
`to_build` values inside the build files of the AI. You can read them in
`{PA_INSTALL_DIRECTORY}/media/pa/ai/`, and in `media/pa_ex1/ai/` and
`media/pa_ex1/ai_queller/` for the Titans and Queller AIs. The role names that you put in
`builders` come from `media/pa/ai/unit_maps/ai_unit_map.json`. A name that is not in those
files changes nothing and reports nothing.

Learn one part of the shape before you use `new` or `remove`. The `build_conditions` of an
entry is a **list of lists**. Each inner list is a group of tests, and every test in that
group must pass. The AI builds the entry if one group passes.

The simplest AI change loads a whole ready-made AI build file. Most upgrade cards teach
the AI to use a new unit in this way. `load` is different from the other ops. It uses only
`type`, `op` and `value`, where `value` is the name of a JSON file that GWO reads from
`/pa/ai_tech/`. The `type` decides which folder inside it the game uses: `fabber_builds/`,
`factory_builds/`, `platoon_builds/`, or `platoon_templates/` for `template`.

```js
inventory.addAIMods([
  { type: "factory", op: "load", value: "my_upgrade_myunit.json" },
]);
```

That file must exist, and you write it. Put it in your own mod at the matching path, for
example `pa/ai_tech/factory_builds/my_upgrade_myunit.json`, beside your `ui` folder. Give
it a name that no other mod is likely to use, because a file with the same name as one of
Galactic War Overhaul's own would replace it. Also remember the `.json` at the end of
`value`.

> **Check that the file really is there before you share the mod.** If a `load` names a
> file that is missing, the battle never starts. The loading screen hangs, and no error
> message points at the cause.

A more exact change follows. It lets basic bot factories build a unit too, but only when
the entry is the one for the advanced bot factory:

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

### A shortcut for a card that improves one unit — `gwoCard.upgradeCard`

Many cards do the same simple thing. They take one unit that the player already has, they
make it better, and the game offers them only after the player has that unit. Every part
of such a card is the same each time, except the unit and the change, so Galactic War
Overhaul writes the rest for you.

`gwoCard.upgradeCard` **is** the card. You return what it gives you, and there is no list
of parts to complete:

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
board. It gives the player room for one more card, and its description gets the usual line
that says so. It has the standard `getContext`. Its `deal` works out a sensible chance,
and returns `0` until the player has the unit named in `requires`.

- `name`, `description`, `icon`, `audio` — the same as
  [`summarize`, `describe`, `icon`](#summarize-describe-icon--name-description-picture)
  and [`audio`](#audio--the-discovery-voice-line-tech-cards) above, written as plain text
  rather than inside `_.constant`.
- `requires` — the unit that the card improves. The game never offers the card until the
  player has it.
- `buff` — what the card does, exactly as [`buff`](#buff--what-the-card-does) above.
- `unless` — optional. The ID of a card that stops the game from offering this one. Use it
  when two of your cards would fight over the same unit.
- `chance` — optional. How often the game offers the card, when the standard chance is not
  what you want. See [`deal`](#deal--how-often-the-card-appears) for the meaning of the
  numbers.
- `slot: false` — optional. Do not give the player an extra card slot.

**It cannot take units away again**, because it writes an empty `dull`. A card that gives
units and must take them back is an ordinary tech card, written the long way.

The example `unit_upgrade_card_id.js` is already written this way.

### Loadouts and `gwoCard.loadout`

A loadout has more to do than a tech card. It must give the player the standard starting
units of the game as well as its own. It must see when the same loadout appears again
later in the war, and then give a card slot in place of the units a second time. When a
player wins a copy of it on a Guardian planet, it must record that in your bank, so that
the loadout unlocks.

`gwoCard.loadout` does all of that. Give it your card and the four things below, and it
gives you back the `buff` and the `dull` of the card:

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

- `bank` — the bank of your mod, which the card lists at the top of the file. See
  [The bank and `LS_KEY`](#the-bank-and-ls_key--remembering-unlocked-loadouts).
- `start` — `GWCStart`, the standard starting units of the game. Leave this as it is.
- `apply` — what your loadout gives the player. Write it exactly the way that you write
  the [`buff`](#buff--what-the-card-does) of a tech card. Omit it if your loadout changes
  nothing beyond the standard start.
- `dulls` — the units to take back if the player moves to a different loadout. Give a
  list, or a function that receives the inventory and returns a list. Omit it if your
  loadout unlocks no units.

Then use what it gives you as the `buff` and the `dull` of the card:

```js
buff: loadout.buff,
dull: loadout.dull,
```

The example `start_card_id.js` is already written this way, so you complete only the four
parts above.

### `dull` — cleanup after all cards

`dull` runs after the `buff` of every card has finished. It mainly removes units.

**Tech cards** remove units directly:

```js
dull: function (inventory) {
  inventory.removeUnits([gwoUnit.dox, gwoGroup.botsBasicMobile]);
},
```

**Loadouts** write no `dull` of their own. They use the one that `gwoCard.loadout` gives
them, and they list the units to remove as its `dulls`, as above. It is difficult to
remove the units of a loadout at the correct moment, and this helper does it for you.

### The bank and `LS_KEY` — remembering unlocked loadouts

Locked loadouts, which are the ones that you list in `model.gwoNewStartCards`, need
somewhere to record that the player has unlocked them. `bank.js` is that place. It saves
the unlocked list into the local storage of the player, under a private key called
`LS_KEY`.

Set `LS_KEY` in your `bank.js` to a value that is unique to your mod, so that it never
conflicts with the storage of another mod:

```js
var LS_KEY = "myname_mymod_bank";
```

Your loadout cards connect to this bank in two steps, and the example `start_card_id.js`
already contains both. A third step, in `start_cards.js`, completes the connection:

1. At the top of the loadout card, it lists your `bank.js` so the card can use it. **Make
   sure this address matches your mod's identifier:**

   ```js
   "coui://ui/mods/<your identifier>/bank.js",
   ```

2. The card hands that bank to `gwoCard.loadout` as `bank`. When the player earns the
   loadout, it is recorded there:

   ```js
   bank: myBank,
   ```

3. `start_cards.js` tells Galactic War Overhaul where the bank is, through
   [`model.gwoLoadoutBanks`](#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs).
   If you miss this step, the loadout stays locked for ever.

The loadout screen then reads your bank, with the same `LS_KEY`, to decide whether to show
your loadout as unlocked. Your own key has two benefits. If the player removes your mod
later, the built-in loadout list of PA does not point at missing cards. The unlocks of the
player also leave with the mod, and they do not stay in the storage of another mod.

A loadout reaches your bank in two ways. If the player wins a loadout on a Guardian
planet, Galactic War Overhaul writes it to the bank itself. The code of your card does not
run in that case, and that is why Galactic War Overhaul needs the address above. The
`bank` that you give to `gwoCard.loadout` covers the other way.

Your bank also keeps the "loadouts unlocked" statistic of PA up to date as it grows.
`bank.js` already does that for you, and there is nothing to do.

## Minimum required changes

You do not have to use every feature above. This is the shortest path to a working mod
with one card. Mark each item as you complete it.

**Every mod:**

- [ ] Put your own copy of this template into `client_mods` (see
      [Preparing the mod](#preparing-the-mod)).
- [ ] In `modinfo.json`, filled in `identifier`, `display_name`, `description`, and
      `author`.
- [ ] In `modinfo.json`, changed the `scenes` addresses so they contain your identifier.
- [ ] Renamed the folder under `ui/mods/` so it matches your identifier.
- [ ] Renamed the example card file you are using (`tech_card_id.js`,
      `unit_upgrade_card_id.js` or `start_card_id.js`) to a unique name, and kept that
      name, without `.js`, as the ID of the card.
- [ ] Gave the card a name (`summarize`), a description (`describe`), and a picture
      (`icon`).
- [ ] Made the card do something in its `buff`: add units, change unit stats, or change
      the AI.
- [ ] Replaced or removed every placeholder left in the card, such as `UNIT_PATH`,
      `PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, and the `!LOC:...HERE` text. A placeholder that
      stays breaks the card.
- [ ] **Deleted from `start_cards.js` every example loadout ID that you do not use**
      (`YOUR_LOCKED_LOADOUT_ID_1`, `YOUR_LOCKED_LOADOUT_ID_N`,
      `YOUR_UNLOCKED_LOADOUT_ID_1`, `YOUR_UNLOCKED_LOADOUT_ID_N`). Do this also when you
      make only a tech card. If they stay, Galactic War does not start at all. See the
      warning under
      [`model.gwoStartingCards`](#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

**If your card is a tech card, also:**

- [ ] In the `deal` of the card, set `chance` to a number above `0`. It starts at `0`, and
      the game then never offers the card.
- [ ] Added the card's ID to `model.gwoCards` in `tech_cards.js`.
- [ ] Listed the card in `model.gwoCardsToUnits` in `tech_cards.js`, or in
      `model.gwoCardsWithoutTooltip` if it changes no units.

**If your card improves one unit (`gwoCard.upgradeCard`), also:**

- [ ] Set `requires` to the unit that the card improves. There is no `deal` to complete,
      because the helper works out the chance.
- [ ] Added the card's ID to `model.gwoCards` and listed it in `model.gwoCardsToUnits`, in
      `tech_cards.js`, the same as any other tech card.

- [ ] Checked the mod with ESLint (see [Checking your work](#checking-your-work)) and
      corrected everything that it reported.

**If your card is a loadout, also:**

- [ ] Added the card's ID to `model.gwoStartingCards` (unlocked) or
      `model.gwoNewStartCards` (locked) in `start_cards.js`.
- [ ] Set a unique `LS_KEY` in `bank.js`.
- [ ] Changed the `bank.js` address at the top of the loadout card so it matches your
      identifier.
- [ ] Set `prefix` and `path` in the `model.gwoLoadoutBanks` entry in `start_cards.js`.
      Without this a locked loadout can never unlock.

**If you add a deck, also:**

- [ ] Removed the comment marks from the example in `decks.js`, set `id` and `name`, and
      replaced or removed every placeholder in it (see
      [`model.gwoDecks`](#modelgwodecks--your-own-deck-in-the-techs-picker-in-decksjs)).

## Checking your work

Do this before you start the game. A card is only text until PA reads it, and PA is
strict: **one typing mistake stops the whole file**, not only the line that it is on.
After a missing comma or a bracket that you did not close, your card simply never appears.
There is no error message, and nothing in the game tells you why. The checker finds that
fault in seconds.

### The editor extension (recommended)

If you use [Visual Studio Code](https://code.visualstudio.com/), install the **ESLint**
extension from Microsoft. Open the Extensions panel with the blocks icon in the sidebar,
search for `ESLint`, and press Install.

You must also install the checker once, and that needs [Node.js](https://nodejs.org/):

1. Open your mod folder in Visual Studio Code.
2. Open a terminal in it (Terminal → New Terminal) and run `npm install`. This downloads
   the checker. You do this once only.

After that, the editor underlines a mistake in red while you type, in the file that you
edit, and it shows an explanation when you put the pointer on the mistake. You run nothing
and you remember nothing. That is the purpose, because the mistakes that this catches are
exactly the ones that stay invisible until the game refuses to load your card.

You move nothing and you configure nothing. `package.json` and `eslint.config.mjs` came
with the template, and they already sit beside your `ui` folder. The game ignores them.

### From a terminal

If you do not use Visual Studio Code, or you want to check the whole mod at once before
you release it, run this in your mod folder after the `npm install` above:

```bash
npm run lint:js
```

It prints one line for each problem, with the file and the line number. No output means no
problems.

### What it catches

- **Typing and syntax mistakes** — a missing comma, or a bracket or quotation mark that
  you did not close.
- **Newer JavaScript that PA cannot run.** The browser inside PA is very old. Modern
  JavaScript that you may have seen elsewhere, such as `let`, `=>`, backtick strings and
  `class`, does not even load, and it takes the whole file down with it. The checker knows
  exactly which features PA supports, and it reports the rest.
- **Functions that do not exist in PA**, such as `Object.assign` and `Array.from`. These
  are worse than a typing mistake. The file loads, and the card fails only at the moment
  when a player uses it.

`eslint.config.mjs` holds the list of what PA supports and what it does not. That file is
the answer when you are not sure whether you can use something. The simple method is to
write the card and to see whether anything turns red.

## Testing your mod

Run the checker first — see [Checking your work](#checking-your-work). It finds the
mistakes that stop a card from loading at all, and those are the most difficult ones to
diagnose from inside the game, where the only symptom is a card that never appears.

1. Add `--devmode` to your PA
   [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955) (keep
   `--coherent_port=9999` there too).
2. Launch PA.
3. Under Community Mods, enable your mod in the INSTALLED list.
4. Return to the Main Menu.
5. Open the Coherent UI Debugger.
6. Click GO.
7. Click Start Page.
8. Change to the Console tab.

During a test you watch the Console for errors. PA prints the following two messages in
normal operation, up to once for each screen, and they are **not** a problem:

- ERROR: _Uncaught TypeError: undefined is not a function_
- WARN: _Synchronous XMLHttpRequest on the main thread is deprecated because of its
  detrimental effects to the end user's experience. For more help, check
  <http://xhr.spec.whatwg.org/>._

Learn these two messages:

- ERROR: _Uncaught Error: Script error for: cards/SOME_ID_

  You listed `SOME_ID` somewhere, but there is no `SOME_ID.js` in
  `ui/main/game/galactic_war/cards/`. The usual cause is a typing mistake, or an example
  ID that you forgot to delete. From a **tech card** list this is harmless, because the
  game skips the card. From a **loadout** list it is fatal: a new war then hangs on a
  blank screen for ever. See the warning under
  [`model.gwoStartingCards`](#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

- WARN: _Warning: File not found in mod Object_

  A card tried to change a file that the player has no copy of, so the game skipped the
  change. **This message is normal.** Galactic War copies only the files that the units of
  a player need, and it deals a card that changes several units to players who own only
  some of them. It drops the entries for the rest, which is exactly what should happen.
  Open the `Object` in the debugger to see which `file` it was.

  It is a problem only when the file is one that the card _should_ have been able to
  change: a unit that the card `requires`, a file reachable from one of those, or a file
  that you borrowed from elsewhere and forgot to list in
  [`model.gwoSpecs`](#modelgwospecs--extra-unit-files-to-change-in-specsjs). A typing
  mistake in the path looks the same, so check the spelling of `file` against the
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  before you decide that the message is the harmless kind.

### Testing loadouts

1. Start PA.
2. Go to the Galactic War Loadout screen.
3. Confirm your loadout is listed, locked, and shows its hint.
4. Confirm no errors appear in the Console.
5. In the debugger, switch to the Resources tab.
6. Expand local storage.
7. Click on `coui://`.
8. If the key matching your `LS_KEY` does not exist, right-click the empty line at the
   bottom and create it.
9. Right-click that key, choose to edit the value, and add your loadout ID in the form
   `{"id":"your_loadout_id"}`. The finished value should look something like
   `{"startCards":[{"id":"some_loadout_you_already_unlocked"},{"id":"your_loadout_id"}]}`.
10. Press Enter to save.
11. Press F5 to refresh the loadout screen.
12. Confirm your loadout is now unlocked and selectable.

### Testing tech cards

1. Start PA.
2. Start a new Galactic War.
3. Click the X in the bottom left-hand corner.
4. Enter your card ID into the panel.
5. Click the + icon to the right of the text box.
6. Confirm your card was dealt to your inventory and no errors appear in the Console.
7. In the debugger, tick the `Preserve log` box.
8. Begin a fight.
9. Confirm no unexpected errors appear in the Console.
10. Use the sandbox to spawn your changed units and check they behave correctly.

## Releasing your mod

When your mod is ready to share, update these entries in `modinfo.json`:

1. `version` — a version number. Consider
   [semantic versioning](https://semver.org/).
2. `date` — the release date, written as `yyyy-mm-dd`
   ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).
3. `build` — match the contents of the `version.txt` file in the root of your PA install.
4. `forum` — the web address of your mod's discussion thread (Steam or GitHub Discussions
   is fine).
5. `icon` — the web address of a publicly visible PNG image for your mod.

Then decide whether a co-op war that you host must
[require your mod](#sharing-your-mod-in-a-co-op-war--galacticwarmod). All the players in
such a war need the same `version`. Keep the two entries in agreement.

Then make sure that your mod is on GitHub as a repository of its own, with `modinfo.json`
in the root of the repository. Do **not** upload a ZIP file to a repository.

- If you started from **Use this template** in [Preparing the mod](#preparing-the-mod),
  commit and push your final changes. Your repository is the release.
- If you **downloaded the files**, create an empty repository on GitHub and upload the
  contents of your mod folder into it, so that `modinfo.json` sits at the top level and
  not inside a subfolder.

If you ran `npm install`, your mod folder now also contains a `node_modules` folder that
holds the checker. It is large, and nobody else needs it, so keep it out of the
repository. The `.gitignore` file in the template already excludes it. Everything else can
stay. The game ignores what it does not recognise, and the next person who opens your mod
gets the checker and this guide with it.

Then post the address of your repository to the `#new-mod-submissions` channel on the
[official PA Discord](https://discord.gg/pa).
