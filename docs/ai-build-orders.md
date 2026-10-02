# Change what your Sub Commanders build — `inventory.addAIMods(...)`

**Who needs this page:** only cards that change what the AI builds.

This changes the build orders of the AI that fights for the player: their Sub Commanders
(the allied commanders who join the player's army), and the allied commander that a star
can give. In a co-op war, each player's Sub Commanders get that player's changes, and
each co-op AI player gets its own. On a Guardian star, where the enemy mirrors the
players' tech, the enemy AI gets the changes of every player. It does not change other
enemies.

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

## Loading a ready-made build file — `load`

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
> file that is missing, the AI never gets the builds in it. The battle starts without
> them, and the log says `AI file of a load mod not read, skipped:` followed by the file's
> path.

## Changing one build entry

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

## More AI changes

### The shape of a build entry

You need this before you use `new` or `remove`. Each entry in an AI build file has
`to_build`, `priority`, `builders`, `instance_count` and `build_conditions`. The
`build_conditions` of an entry is a **list of lists**. Each inner list is a group of
tests, and every test in a group must pass. The AI builds the entry if any one group
passes. `remove` needs a `value` that is an exact copy of a whole test.

`matchAll: true` changes every build condition on the entry, instead of only the ones
where `refId` holds `refValue`.

### When your card replaces builds — `treeOnly`

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
loads. `load` doesn't read it. GWO's Rapid Deployment loadout is a full example:
read `gwaio_start_rapid.js` in GWO's `cards` folder.

`silence`, below, is a second way to stop the AI's own builds, and it reads `treeOnly`
too. If your card uses `silence` and also loads replacement entries, put `treeOnly: true`
on the `silence` change, or it stops the loaded entries as well.

### Stop everything else that a builder builds — `silence`

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
nothing and reports nothing. A missing `value` shows an error that starts
`applyAiMods: op threw` in the Console, and the change is skipped.

### `new`, `remove` and `squad`

These change the AI's build files in ways that need a good understanding of them:
`new` adds a build condition to an entry, `remove` takes one away, and `squad` changes the
units in a platoon template. There are no examples here. Read GWO's cards that use them,
in its
[cards folder](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards),
and copy their shape.

---

[Contents](../README.md#contents)
