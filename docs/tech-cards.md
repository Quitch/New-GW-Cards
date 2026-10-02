# Tech cards

**Who needs this page:** every mod that adds tech cards. Use it as a reference.

## Which example do I start from?

The template includes three complete example cards in `ui/main/game/galactic_war/cards/`.
Pick the one that matches what your card does:

| Your card…                                                                         | Start from                |
| ---------------------------------------------------------------------------------- | ------------------------- |
| improves **one unit** that the player already has                                  | `unit_upgrade_card_id.js` |
| does anything else during a war: unlocks units, changes many units, changes the AI | `tech_card_id.js`         |
| is a **loadout**, chosen on the screen before the war starts                       | `start_card_id.js`        |

`unit_upgrade_card_id.js` is the shortest, because
[`gwoCard.upgradeCard`](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
writes most of the card for you. Its `dull` is empty, so it cannot forbid units. A card
that must forbid a unit starts from `tech_card_id.js`.

Every part of each example is already there, with a placeholder value and a comment
beside it. To make more than one card of the same kind, copy the example file first and
rename the copy.

You can also start from a finished card: copy one of GWO's cards from its
[cards folder on GitHub](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards)
into the `ui/main/game/galactic_war/cards` folder of your mod. Rename the copy at once, as
described below. PA's own cards, in
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/cards`, are older and written in a
different style, so they are harder to start from.

## Naming and registering your card

1. **Give the file a unique name.** The file name without `.js` is the card's ID, and you
   use the ID in the loader files. Start every ID with a short prefix of your own, such as
   `mym`, and then:

   - for a card made with `gwoCard.upgradeCard`, write `PREFIX_upgrade_UNIT.js`, for
     example `mym_upgrade_dox.js`. See
     [Which races get an upgrade card](#which-races-get-an-upgrade-card).
   - for any other tech card, write `PREFIX_EFFECT_UNITTYPE.js`, for example
     `mym_damage_bots.js`.
   - for a loadout, follow [Loadout IDs](loadouts.md#loadout-ids).

   **Never start a name with `gwc_` or `gwaio_`.** The game's own cards use `gwc_`, and
   GWO's cards use `gwaio_`. When a card file has the same name as one of theirs, the game
   silently ignores one of the two files. The `priority` of each mod decides which one.
   GWO's copy of a `gwc_` or `gwaio_` card normally wins, so your card is never dealt
   and nothing tells you why. `gwc_damage_bots.js`, for example, already exists in PA and
   in GWO.

2. **Change the parts of the card** to do what you want, with this page and the other
   pages under **Making cards** in the [Contents](../README.md#contents).
3. **Register the card.** Add its ID to `tech_cards.js` for a tech card, including one
   that improves a single unit, or to `start_cards.js` for a loadout. GWO never deals a
   card that you have not registered.

## What a card is made of

Each card file is a set of named parts. Some parts belong only to loadouts, and some only
to tech cards.

You don't always write all of them. Two common kinds of card write most of these parts for
you. See
[a card that improves one unit](#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
below, and [loadouts](loadouts.md#loadouts-and-gwocardloadout).

| Part         | Used by    | What it does                                                                                                       |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `summarize`  | all        | The card's name.                                                                                                   |
| `describe`   | all        | The card's description.                                                                                            |
| `icon`       | all        | The card's picture.                                                                                                |
| `visible`    | all        | Whether the player can see the card on the board and discard it. Tech cards are usually visible. Loadouts are not. |
| `deal`       | all        | How often the game offers the card. See [`deal`](deal.md).                                                         |
| `buff`       | all        | What the card does. See below.                                                                                     |
| `dull`       | all        | The units that the card forbids. Usually empty. See below.                                                         |
| `audio`      | tech cards | The voice line that plays when the player finds the card.                                                          |
| `getContext` | tech cards | Gives the `deal` part information about the galaxy. Always `gwoCard.getContext`.                                   |
| `hint`       | loadouts   | The text shown while the loadout is still locked.                                                                  |

You may also see `keep`, `discard`, and `releaseContext` in a card that you copy. Most
cards never use them. See
[`keep`, `discard` and `releaseContext`](advanced.md#keep-discard-and-releasecontext--rare-parts).

### `summarize`, `describe`, `icon` — name, description, picture

`summarize` is the name, `describe` is the description, and `icon` is the picture. Start
all text that players read with `!LOC:`,
[so that it can be translated](translating.md).

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

### `visible` — whether the card is shown

`_.constant(true)` lets the player see the card and discard it, which is normal for a tech
card. `_.constant(false)` hides the card, which is normal for a loadout.

```js
visible: _.constant(true),
```

### `audio` — the discovery voice line (tech cards)

This is the voice line that plays when the player finds the card. The example file
`tech_card_id.js` lists every line that you can choose, such as
`board_tech_available_bot`. Put your choice at the end of the path:

```js
audio: _.constant({ found: "/VO/Computer/gw/board_tech_available_bot" }),
```

### `getContext` — galaxy information (tech cards)

This part gives the galaxy size to the `deal` part. Every tech card can use the standard
one, and you don't need to change it:

```js
getContext: gwoCard.getContext,
```

## `buff` — what the card does

`buff` holds the card's effect. Inside it you can do any combination of four things:

- [add a card slot](#add-a-card-slot), below.
- [unlock units](changing-units.md#unlock-units--inventoryaddunits).
- [change unit stats](changing-units.md#change-unit-stats--inventoryaddmods).
- [change what your Sub Commanders build](ai-build-orders.md).

**A loadout does not write its own `buff`.** It puts the same code in `apply` and gives
that to `gwoCard.loadout`, which then writes the `buff` and the `dull`. See
[Loadouts and `gwoCard.loadout`](loadouts.md#loadouts-and-gwocardloadout). Everything that
`buff` can do works the same way inside `apply`.

### Add a card slot

Give the player room for one more card in their hand:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

## `dull` — units the card forbids

`dull` removes the units that the card forbids, so that the player cannot have them. Most
cards forbid no units, so their `dull` is empty, but it must still be there.

Each time the game works out the player's units, it runs the `buff` of every card first,
and then the `dull` of every card. So a unit that a `dull` removes is gone whichever card
gave it, this card included, and every copy of it goes. **Never list a unit that the
card's own `buff` gives.** The player then never gets it, and nothing warns you. `dull`
cannot undo a stat change or an AI change.

**Tech cards** remove units directly. This one stops the player from having the Inferno:

```js
dull: function (inventory) {
  inventory.removeUnits([gwoUnit.inferno]);
},
```

**Loadouts** don't write their own `dull`. They use the one that `gwoCard.loadout` gives
them, and list the units that they forbid as its `dulls` (see
[Loadouts and `gwoCard.loadout`](loadouts.md#loadouts-and-gwocardloadout)). A loadout
forbids those units for the whole war, even when the standard start or a later card gives
them. Removing a loadout's units at the right moment is difficult, and the helper does it
for you.

## A shortcut for a card that improves one unit — `gwoCard.upgradeCard`

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
board. It gives the player one more card slot, and adds the sentence "Adds a new slot
for another technology." to the end of the description. It has the standard
`getContext`. Its `deal` calculates a sensible chance, and returns `0` until the player
fields the unit named in `requires`.

- `name`, `description`, `icon`, `audio`: the same as
  [`summarize`, `describe`, `icon`](#summarize-describe-icon--name-description-picture)
  and [`audio`](#audio--the-discovery-voice-line-tech-cards) above, but written as plain
  text, without `_.constant` around them.
- `requires`: the unit that the card improves. The game never offers the card until the
  player has it. A race or add-on unit that the player fields counts too.
- `buff`: what the card does, exactly as in [`buff`](#buff--what-the-card-does) above.
- `unless`: optional. The ID of a card that stops the game from offering this one. Use it
  when two of your cards would fight over the same unit.
- `chance`: optional. How often the game offers the card, when the standard chance is not
  what you want. See [`deal`](deal.md) for what the numbers
  mean. Give a number, or a function that receives the `inventory` and returns a number,
  for example `function (inventory) { return gwoCard.commanderWeight(inventory, 35); }`.
- `slot: false`: optional. Don't give the player an extra card slot. The description
  still ends with "Adds a new slot for another technology." To remove that sentence,
  also give your own `describe` (see below).
- `describe`, `available`, `deal`: optional, and rarely needed. Each one replaces the
  part that the helper writes. `describe` is a whole description, written as
  `_.constant("!LOC:...")`, with no slot sentence added. `available` is a function that
  receives the `inventory` and returns `true` when GWO can offer the card. It replaces
  `requires` and `unless`. `deal` is a whole [`deal`](deal.md).

**It cannot forbid units**, because its `dull` is empty. A card that must forbid a unit is
an ordinary tech card, written from `tech_card_id.js`.

The example `unit_upgrade_card_id.js` is already written this way.

### Which races get an upgrade card

Keep `_upgrade_` in the ID of a card made with `gwoCard.upgradeCard`, as in
`mym_upgrade_dox`. GWO then offers the card only to MLA players, who play the base game's
own army. That is right for most upgrade cards, because each one is tuned to one MLA unit.

Leave `_upgrade_` out only when both of these are true:

- players of other races, such as Legion, should get the card too.
- the card changes only values such as health, speed, cost, or damage. A change to what a
  unit is, such as its weapons or what it can build, stays on the stock unit anyway. See
  [Cards for another race or an add-on](race-cards.md).

Two things in the card's
[`model.gwoCardsToUnits`](#modelgwocardstounits--tech-card-tooltips-in-tech_cardsjs) entry
replace this rule: race or add-on units in `units`, and a `races` list. IDs that contain
`_upgrade_subcommander` or `_upgrade_ubercannon` are exempt from the rule.

## The lists that tell GWO about your cards

GWO keeps several lists, and you add your cards to them. The name of each list starts
with `model.gwo`. The heading of each section below names the file that it goes in.

Your loader can run before GWO makes a list. Always create the list first, as shown.

### `model.gwoCards` — your tech-card deck (in `tech_cards.js`)

This is the main list of tech cards that the game can deal during a war. Add each tech
card's ID, which is its file name without `.js`.

```js
if (!model.gwoCards) {
  model.gwoCards = [];
}
model.gwoCards.push("mym_damage_bots", "mym_faster_air");
```

### `model.gwoCardsToUnits` — tech-card tooltips (in `tech_cards.js`)

This list connects a tech card to the units that it changes, so that the card's tooltip
can name them. It also decides which races the game offers the card to. A player of
another race, such as Legion, is offered it only when a unit in the entry reaches one of
their race's units, or their race fields a race or add-on unit that the entry names (see
[Cards for another race or an add-on](race-cards.md)). For such a
player, a base-game weapon or ammo in the entry doesn't count, which is one more reason to
name units. An MLA player is offered any card whose entry names something from the base
game. Add one entry for each card. The entry holds the card's ID and the units
that it changes, as unit paths or as GWO unit or group IDs. Always name the unit itself,
not its ammo or its weapon, even when the card changes only the weapon. For a card that
changes the commander, name `gwoUnit.commander`.

```js
if (!model.gwoCardsToUnits) {
  model.gwoCardsToUnits = [];
}
model.gwoCardsToUnits.push({
  id: "mym_damage_bots",
  units: ["/pa/units/land/assault_bot/assault_bot.json", gwoUnit.dox],
});
```

A card with no entry, or with an empty `units` list, is offered to players of every race.
A card in
[`model.gwoCardsWithoutTooltip`](#modelgwocardswithouttooltip--tech-cards-with-no-unit-tooltip-in-tech_cardsjs)
is one of those.

To choose the races yourself, add `races` to the entry. GWO then offers the card only to
players of the races in the list, whatever the card's ID. The race IDs are `mla`,
`legion`, `bugs`, and `exiles`, and the ID of a race from another mod. A race in the
list still needs a unit that a unit in the entry reaches.

```js
model.gwoCardsToUnits.push({
  id: "mym_dox_health",
  units: [gwoUnit.dox],
  races: ["mla"],
});
```

### `model.gwoCardsWithoutTooltip` — tech cards with no unit tooltip (in `tech_cards.js`)

List a tech card here when it does **not** change units, for example a card that only
turns on a feature. Use this list **instead of** `model.gwoCardsToUnits`. If you use
neither, GWO warns that the card has no tooltip data.

```js
if (!model.gwoCardsWithoutTooltip) {
  model.gwoCardsWithoutTooltip = [];
}
model.gwoCardsWithoutTooltip.push("mym_enable_bounties");
```

---

[Contents](../README.md#contents)
