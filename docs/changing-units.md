# Changing units

**Who needs this page:** only cards that unlock units or change unit stats.

## Naming units: GWO IDs and unit paths

Many parts of a card name a unit. There are three ways to do it.

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
  [Cards for another race or an add-on](race-cards.md).

> **Use a GWO ID whenever one exists.** GWO keeps its IDs up to date, and they prevent
> path mistakes such as the `/pa_ex1/` trap above. Use a raw path only when there is no
> GWO ID for the unit.

**The fabricator groups.** `gwoGroup.fabbersBasic` and `gwoGroup.fabbersAdvanced` hold
only the fabricators whose job is building. The combat fabricators have groups of their
own: the Stitch and the Barnacle are in `gwoGroup.fabbersCombatBasic`, the Mend and the
Angel are in `gwoGroup.fabbersCombatAdvanced`, and `gwoGroup.fabbersCombat` holds all
four. `gwoGroup.fabbers` still holds every fabricator. For a card that changes the basic
fabricators and the combat ones too, name both groups:
`[gwoGroup.fabbersBasic, gwoGroup.fabbersCombatBasic]`.

## Unlock units — `inventory.addUnits(...)`

Give the player one or more units. Give a single unit or a list, as paths or as GWO unit
or group IDs.

```js
inventory.addUnits([
  "/pa/units/land/assault_bot/assault_bot.json",
  gwoUnit.dox,
  gwoGroup.botsBasicMobile,
]);
```

## Change unit stats — `inventory.addMods(...)`

Change a number or other value inside a unit's file. Each change is written as four
labels:

- `file`: which unit file to change, as a path or a GWO unit ID.
- `path`: which value inside that file. A value at the top level of the file is just its
  name, such as `max_health`. A value deeper in the file uses dots, such as
  `events.fired.effect_spec`. If a step along the way is the name of another file rather
  than a value, the game follows it into that file and carries on from there.
  To pick one item from a list of vision, radar and jammer ranges by what it is rather
  than where it sits, write `[layer=…,channel=…]` as a step (see
  [Vision, radar and jammer ranges](#vision-radar-and-jammer-ranges--gwocardobserverpath)).
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

When the `value` of `push`, `prepend` or `pull` is itself a list, the game adds or removes
its entries one by one. It does not add the list as one entry.

There are three more: `wipe`, `clone` and `eval`. See
[More unit-stat ops](#more-unit-stat-ops--wipe-clone-and-eval).

> **The order in which you write changes does not matter.** Across every card in the
> player's hand, the game makes every `clone` first, then every `replace`, then every
> `multiplyOrCreate`, then every `multiply`, then every `add`, and all the other ops after
> those. Never write two changes that only work in a particular order.

### Finding the value that you want to change

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
[Finding the value that you want to change](race-cards.md#7-finding-the-value-that-you-want-to-change)
under the race cards.

### Whenever your value is a file name, `tag` it

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
| `ammo_id`, or `ammo_id.<number>.id` when `ammo_id` is a list               | what a weapon fires                       |
| `spawn_unit_on_death`                                                      | a unit left behind when this is destroyed |
| `death_weapon.ground_ammo_spec`, `death_weapon.air_ammo_spec`              | the explosion on death                    |
| `base_spec`                                                                | the file this one inherits from           |
| `replaceable_units`, `buildable_projectiles`, `factory.initial_build_spec` | rarer, same rule                          |

`tag` works only on a single file name. `replaceable_units` and `buildable_projectiles`
are lists, so tag each entry that you wrote by its number, for example
`buildable_projectiles.0`. `factory.initial_build_spec` counts only when it is a single
file name.

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

### `model.gwoSpecs` — extra unit files to change (in `specs.js`)

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
if (!model.gwoSpecs) {
  model.gwoSpecs = [];
}
model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
```

### A shorthand for writing changes — `gwoCard.mods`

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

## Rarely needed

### Vision, radar and jammer ranges — `gwoCard.observerPath`

A unit's sight, radar and jammer ranges are a list of items in its file, under
`recon.observer.items`. Each item has a `layer` (such as `surface_and_air` or
`underwater`), a `channel` (such as `sight`, `radar` or `radar_jammer`) and a `radius`.
The order of the items is different from unit to unit. The stock Radar Jamming Station
keeps its jammer third in the list, but Legion's jamming station keeps underwater sight
there. If you name an item by its number in the list, a race or add-on unit that stands
in for the stock unit gets the change on the wrong item.

To change one of these ranges, name the item by its layer and channel with
`gwoCard.observerPath(layer, channel, "radius")`. Do not use its number in the list.
Then race and add-on units get the same change:

```js
inventory.addMods(
  gwoCard.mods(
    gwoUnit.radarJammingStation,
    "multiply",
    [gwoCard.observerPath("surface_and_air", "radar_jammer", "radius")],
    2
  )
);
```

A unit that has no item of that layer and channel gets no change. GWO never adds an item
for you.

### More unit-stat ops — `wipe`, `clone` and `eval`

- `wipe`: despite its name, this does not clear the value. It finds and replaces text
  inside a text value. `value` is a pair, `[what to find, what to put in its place]`. A
  single value on its own means "delete every occurrence of this".
- `clone`: copies whatever is at `path` into the file named by `value`. If nothing is at
  `path`, it copies nothing, and the Console shows `clone: attribute is missing or null`.
- `eval`: runs `value` as raw JavaScript. The game gives you the thing at `path` as
  `attribute`, and you can do what you like with it. If you used a `path`, remember to
  return `attribute` at the end.

> **`clone` and `eval` are advanced. Avoid them.** They are easy to get wrong, and one of
> the everyday ops can nearly always do the same work more safely. `eval` in particular
> runs your own code inside the game, so a mistake there can break the war rather than
> only change a number.

---

[Contents](../README.md#contents)
