# Your first card

**Who needs this page:** every mod. Read it before you write a card of your own.

This page shows you how to make one complete, working card. The card gives the Dox 50%
more health. The game offers it only to a player who already has the Dox. The card also
gives the player one more card slot.

Finish [Setting up your mod](setup.md) first.

## 1. Rename the example file

Open `ui/main/game/galactic_war/cards/` in your mod folder. Rename
`unit_upgrade_card_id.js` to `mym_upgrade_dox.js`.

The file name, without the `.js`, is the card's **ID**. Here the ID is `mym_upgrade_dox`.

- `mym` stands for "my mod". Use a short prefix of your own, and start every card in your
  mod with it. Never start an ID with `gwc_` or `gwaio_`: those belong to the game's cards
  and to GWO's cards.
- `_upgrade_` tells GWO that the card is made for one unit of the base game. GWO offers
  such a card only to players of the base game's own army, and not to players of another
  race, such as Legion. [Cards for another race or an add-on](race-cards.md) explains
  races, but you don't need them for this card.

## 2. Fill in the card

Open the renamed file. Replace everything in it with the text below. This is the
complete card:

```js
define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  return gwoCard.upgradeCard({
    name: "!LOC:Dox Health",
    description: "!LOC:Increases the health of the Dox by 50%.",
    icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png",
    audio: "/VO/Computer/gw/board_tech_available_armor",
    requires: gwoUnit.dox,
    buff: function (inventory) {
      inventory.addMods(
        gwoCard.mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
      );
    },
  });
});
```

`gwoCard.upgradeCard` is a tool from GWO that writes most of a card for you. You fill in
six parts, and each one does one job:

- `name` and `description`: the card's name and description. The `!LOC:` at the start
  lets you translate the text later. Always keep it.
- `icon`: the card's picture, one of PA's own tech icons.
- `audio`: the voice line that plays when the player finds the card.
- `requires`: the unit that the card improves. The game never offers the card until the
  player has this unit.
- `buff`: what the card does. Here it multiplies the Dox's `max_health` by `1.5`.

`gwoCard.upgradeCard` does the rest. It shows the card on the board, calculates how often
the game offers it, and gives the player one more card slot. It also adds the sentence
"Adds a new slot for another technology." to the end of your description. Do not write
that sentence yourself.

## 3. Register the card

GWO deals only the cards that you register. Open `ui/mods/<your identifier>/tech_cards.js`.

Find the `model.gwoCards.push(` lines. Replace the three example IDs with your card's ID:

```js
model.gwoCards.push("mym_upgrade_dox");
```

Then find the `model.gwoCardsToUnits.push(` block. It lists, for each card, the units
that the card's tooltip names. Replace the three example entries with one entry for your
card:

```js
model.gwoCardsToUnits.push({
  id: "mym_upgrade_dox",
  units: [gwoUnit.dox],
});
```

Change only the IDs and the entries. Leave the lines around them as they are.

## 4. Check it and try it

If you installed the [checker](setup.md#installing-the-checker-recommended), run it.
Correct everything that it reports. Then follow
[Checking and testing your mod](testing.md), and deal yourself `mym_upgrade_dox` from the
test panel. In a real war, the game offers the card only after the player gets the Dox,
because GWO's standard start has no bots. The test panel gives you the card immediately.

That is a complete mod. To make your next card, copy this one and change its parts, or
start from one of the other example files. [Tech cards](tech-cards.md) explains which
example to start from, and every part that you can change.

---

[← Previous: How to read the card files](reading-card-files.md) ·
[Contents](../README.md#contents) · [Next: Checking and testing your mod →](testing.md)
