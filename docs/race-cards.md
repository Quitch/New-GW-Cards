# Cards for another race or an add-on

**Who needs this page:** only mods whose cards change one particular unit of another race or
of an add-on. A card for the game's own units already reaches the other races. The next
section explains how.

GWO lets a player fight a war as a race from another mod: Legion, Bugs, or Exiles. It
also supports add-ons, which are mods that add more units to the races: Second Wave,
Section 17, and Osmech. A player needs
[GW Server Mods](https://github.com/Quitch/GW-Server-Mods) and the race's or add-on's
server mod for these.

**You don't need a separate card for each race to change ordinary units.** A card that
changes `gwoUnit.dox` or `gwoGroup.botsBasicMobile` also changes the Legion, Bugs, and
Exiles units that those stock units reach, and the add-on units they reach. GWO finds them
for you. Write a race card only when you want to change one particular unit of a race or an
add-on.

GWO matches combat units by kind and by what they do, from the unit's own types:
anti-air, artillery, scout, and so on. A stock unit reaches the race units of its kind that
do its job. For example, a card for the Stinger, an anti-air bot, changes the Legion
Patriot, Legion's anti-air bot. A card for the Dox changes the Legion Peacekeeper and
Investigator. A group card, such as `gwoGroup.botsBasicMobile`, changes every basic Legion
combat bot.

A race unit that has no job, or whose job no stock unit of its kind does, is reached
instead by other stock units of its kind: by every one with no job of its own; when there
are none, by every one whose job the race has no unit for; and when there are none of
those either, by every stock unit of its kind. So a card for the Ant, which has no job,
changes the Legion Shank, which has none either, and the Legion Stoke, an amphibious tank,
since no stock basic tank is amphibious. Bugs has no anti-air bot, and every stock basic
bot has a job, so for a Bugs player a card for the Stinger changes the Ripper, the Stealth
Ripper, and the Runner. With Second Wave, the Legion Almaz, an orbital laser platform,
falls to the last case: a card for the Avenger, the Astraeus, the Hermes, or the Arkyd
changes it. Any other stock unit reaches no race unit: for a Legion player, a card for the
Skitter changes no Legion unit. A stock unit that no commander can build, such as the
Squall's drone (`gwoUnit.squall`), takes no part in this and reaches every race unit of
its kind. Defences, superweapons, and intel structures (radars and jammers) are matched
by kind and by job in the same way. Titans, commanders, fabricators, factories, and the
other buildings are matched by kind alone.
[GWO's documentation](https://github.com/Quitch/GW-AI-Overhaul/blob/master/docs/races.md#jobs)
gives the full rule.

A unit of a kind that the base game has no unit for is the exception: no card for stock
units reaches it. Such units include Section 17's Big Bill, Pineapple, Floater, Horntail,
Poseidon, and gantries, the add-ons' fabrication towers and advanced storages, and the
Bugs research unlocks. To change one of them, name it, such as
`gwoUnit.section17.bigBill`.

This works for changes to values such as health, speed, cost, or damage. A change to
what a unit is stays on the stock unit: its `unit_types`, `buildable_types`, `tools`,
`base_spec`, `command_caps`, `model`, `display_name`, `description`, `si_name`,
`transportable`, `transporter`, or `attachable`. A change marked `exact: true` also stays
on the stock unit. Once any card makes such a change to a unit, no other change to that
unit reaches the race units either. Keep `_upgrade_` in the ID of a card like that, or
give its entry `races: ["mla"]` (see the warning below).

> **Warning:** GWO offers a card whose ID contains `_upgrade_` only to MLA players, unless
> the card's `model.gwoCardsToUnits` entry names race or add-on units. An upgrade card is
> tuned to one MLA unit, so GWO does not pass it on to the other races. If a card that
> changes stock units must reach every race, leave `_upgrade_` out of its ID. A `races`
> list in the entry replaces this rule: GWO offers the card to the races in the list. IDs
> that contain `_upgrade_subcommander` or `_upgrade_ubercannon` are exempt from the rule.

## Keep a change on the stock unit — `stockOnly`

Sometimes one change must stay on the stock unit. For example, a card gives the Dox +50%
health, but the Legion bots must not get it. Add `stockOnly: true` to that change, or
give the changes to `gwoCard.stockOnly`:

```js
inventory.addMods(
  gwoCard
    .stockOnly(gwoCard.mods(gwoUnit.dox, "multiply", { max_health: 1.5 }))
    .concat(gwoCard.mods(gwoUnit.dox, "multiply", { build_metal_cost: 0.8 }))
);
```

The health change stays on the Dox. The cost change, which is not marked, still reaches
the Legion, Bugs, and Exiles bots that the Dox reaches, and the add-on bots it reaches. A
player whose race has no Dox gets nothing from the marked change. For an MLA player with
no add-ons, the mark changes nothing.

## 1. Name the unit

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
base-game unit that uses the file, and, in a war as another race, the race units that
the base-game unit reaches.

> **Warning:** GWO makes these keys from the race mod's own files. A key can change when
> the race mod is updated, so check your card after each update. A misspelled table name,
> such as `gwoUnit.legoin.shank`, causes an error, and the
> [checker](testing.md#checking-your-work) does not find it. In a card file, the error
> stops that card. In `tech_cards.js`, it stops the whole `model.gwoCardsToUnits` list, so
> every card in your mod loses its tooltip, and GWO no longer knows which race a card is
> for. A misspelled key, such as `gwoUnit.legion.shnak`, gives no error when the card
> loads. In a card file, a change to it does nothing (the battle's log shows "File not
> found"), and a `requires` or `deal` check on it is never true, so the game never offers
> the card. The test panel still gives it to you, so test in a war too. In
> `model.gwoCardsToUnits`, GWO no longer knows that the card is for that race: MLA players
> may be offered it, and players of the race may not.

## 2. List the unit in `model.gwoCardsToUnits`

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

List **only** race or add-on units in a race card's entry. If the entry also names
anything from the base game, such as `gwoUnit.commander` or a shared weapon such as
`gwoUnit.gilEBeam`, the game can offer the card to players of other races too: MLA players
always, and other races when they have that kind of unit.

The same entry also works for a card whose ID contains `_upgrade_`, such as
`mym_upgrade_shank`. GWO offers such a card only to MLA players when it names only stock
units (see the warning above). When it names race units, it is written for that race, so
GWO offers it to that race. An entry with a `races` list is offered to the races in the
list and to no others. Each race in the list still needs a unit that a unit in the entry
reaches.

## 3. Check for the unit in `deal`

`inventory.units()` holds the ordinary units, even for a Legion player. It holds a race
or add-on unit only when a card added that unit by name. The player's other race units
are added when the battle starts. So in `deal`, use
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

With [`gwoCard.upgradeCard`](tech-cards.md#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard),
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

## 4. Change the unit in `buff`

`inventory.addMods` and `inventory.addUnits` work with race units exactly as they work
with the game's own units. Write the race unit's ID in `file`, or give it to `gwoCard.mods`,
as in the example above.

## 5. A race or add-on from another mod

GWO's `gwoUnit` tables hold only the races and add-ons that GWO itself supports. Another
mod can add a race or an add-on to GWO. For its units, write the raw unit path. The card
works the same way if that mod gives GWO a list of its units, as a `units` table in the
race or add-on that it registers. Without that table, GWO treats the paths as base-game
units: MLA players may be offered the card, and once GWO has read that race's units, its
players are not. Check the other mod's files, or ask its author.

## 6. Your own groups

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
- **Don't change a stock unit and its race version the same way in one card.** A change
  to `gwoUnit.ant` already reaches the Legion Shank and Stoke. A second change to one of
  those Legion units applies the change twice. Name the stock unit **or** the race unit, not
  both. To give each of them a change of its own, mark the stock unit's change
  `stockOnly` (see
  [Keep a change on the stock unit](#keep-a-change-on-the-stock-unit--stockonly)).

## 7. Finding the value that you want to change

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
[Finding the value that you want to change](changing-units.md#finding-the-value-that-you-want-to-change)
from step 2. A `base_spec` can point to a file in the same zip or in the PA install
folder.

## 8. Testing a race card

1. Enable GW Server Mods, your own mod, and the server mod of the race or add-on. For an
   add-on unit that belongs to Legion or Bugs, enable that race's server mod as well: a
   race is in the **Race** picker only while its own server mod is on.
2. Start a new Galactic War, and choose the race in the **Race** picker on the war setup
   screen. For an add-on unit, choose the race that the unit belongs to. The add-ons are
   not in the picker, and Second Wave has MLA, Legion, and Bugs units.
3. Follow [Testing tech cards](testing.md#testing-tech-cards) from step 2.

The test panel gives you the card whatever your race, so it cannot show which races the
game offers the card to. Only the units in the card's `model.gwoCardsToUnits` entry decide
that. Check that the entry names the race or add-on units, and that each name is spelled
correctly.

---

[Contents](../README.md#contents)
