# CLAUDE.md — authoring a Galactic War card

This file provides guidance to Claude Code (claude.ai/code) when writing cards **for a
user** from the New-GW-Cards template. The template's repo root is the mod root, and this
file sits in it, so it applies both in the template repo and in the copy the author
renames into their `client_mods`. `CONTRIBUTING.md` governs the other job — changing the
template itself — and does not travel with the copy.

`README.md`, which does travel, is the author-facing guide, written in plain English for
someone who does not code. It is the reference for what every part of a card does, and
you should follow it. This file adds what the README deliberately leaves out: where to
find the real values on the user's own machine, and the runtime behaviour that fails
**silently** when you get it wrong.

The user may know nothing about coding. Explain what you changed in plain language, keep
the heavy comment style the template uses, and never leave a placeholder behind.

## Find these three things first

Ask the user for anything you cannot locate.

- **`<PA>` — the game install.** Ends in
  `steamapps/common/Planetary Annihilation Titans/media`. **Read-only. Never edit it.**
- **`<data>` — the PA user data directory.** `%LOCALAPPDATA%\Uber Entertainment\Planetary
Annihilation` on Windows. The author's mod is a copy of this folder under
  `<data>/client_mods/<their identifier>/`. **It may not exist yet** — creating
  `client_mods/`, copying the folder, renaming it, and syncing the identifier is part of
  the job (see "Setting the mod up" below).
- **`<GWO>` — Galactic War Overhaul.** A hard dependency: cards do nothing without it.
  Normally it is a zip the game reads directly, at
  `<data>/download/com.pa.quitch.gwaioverhaul.zip` — read files straight out of it
  (`unzip -p`, or Python's `zipfile`), do not unpack it into the user's mod folders. If
  the zip is missing, have the user install GWO rather than guessing at its contents.

Prefer these local copies to anything on GitHub: they are what the user is actually
running. The two exceptions are GWO's `docs/` and `scripts/`, which the zip does not
contain — read those from a `GW-AI-Overhaul` checkout if the user has one, otherwise from
the repo's **`master`** branch (what releases are built from). Never read `develop`; it
can be ahead of what is live.

## Never invent an identifier — read it from a file

Every one of these fails quietly when wrong: a bad icon name renders blank, a bad
`toBuild` changes nothing, a bad unit path warns once in a console the user is not
watching. Look each one up.

| What you need                                           | Where it is                                                                                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit paths, and the stat names you put in `path`        | `<PA>/pa_ex1/units/**` first, then `<PA>/pa/units/**`; follow the `base_spec` chain for inherited stats. Ammo and tools live under `<PA>/pa/ammo/`, `<PA>/pa/tools/`      |
| GWO unit IDs (`gwoUnit.*`) and group IDs (`gwoGroup.*`) | `<GWO>` → `ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js` and `shared/unit_groups.js`                                                                                |
| `gwoCard` helpers and exactly what they return          | `<GWO>` → `ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js`                                                                                                            |
| Worked examples of finished cards                       | `<GWO>` → `ui/main/game/galactic_war/cards/*.js` (hundreds of them); stock ones at `<PA>/ui/main/game/galactic_war/cards/*.js`                                            |
| Tech icon file names for `icon`                         | `<PA>/ui/main/game/galactic_war/gw_play/img/tech/` — that directory listing is the complete set of stock names                                                            |
| Discovery voice lines for `audio`                       | the list in the comment in `ui/main/game/galactic_war/cards/tech_card_id.js`                                                                                              |
| AI `toBuild` names                                      | `to_build` values in `<PA>/pa/ai/{fabber,factory,platoon}_builds/*.json`, `<PA>/pa_ex1/ai/**`, `<PA>/pa_ex1/ai_queller/q_*/**`, and `<GWO>` → `pa/ai_penchant/**`         |
| AI `builders` roles and platoon template names          | keys of `<PA>/pa/ai/unit_maps/ai_unit_map.json` and `<GWO>` → `pa/ai_penchant/unit_maps/ai_unit_map.json`                                                                 |
| Legal `test_type` values for AI build conditions        | the harvested list in GWO's `scripts/validate/schemas.js` (checkout or `master` only), otherwise the `test_type` values used in the stock build files above               |
| What an op or helper _actually_ does                    | `<GWO>` → `ui/mods/com.pa.quitch.gwaioverhaul/shared/specs.js` (unit-spec mods) and `gw_play/referee_ai.js` (AI mods). These are in the zip, so they are always available |

Two path rules that catch everyone:

- Titans units are stored under `pa_ex1/` but the game mounts them into `/pa/`. **Always
  write `/pa/…`, never `/pa_ex1/…`.** Use `pa_ex1/` only to find the file on disk.
- Prefer a `gwoUnit`/`gwoGroup` ID to a raw path wherever one exists. GWO keeps them
  current, and they cannot fall foul of the rule above.

## Setting the mod up

If the user has no mod folder yet, create one before writing any card:

1. Copy this whole folder into `<data>/client_mods/` and rename it (the folder name is
   free-form; convention is to match the identifier). Copy it entire — the lint tooling
   (`package.json`, `eslint.config.mjs`, `.prettierrc`) and the guides are meant to travel
   with it, and the checker only works from inside the mod folder. PA reads `modinfo.json`
   and the files its `scenes` block names, and ignores the rest.
2. In `modinfo.json`, fill in `identifier` (style `com.pa.yourname.modname`),
   `display_name`, `description` and `author`.
3. Change every `coui://` address under `scenes` so it contains that identifier.
   Some loaders are listed under more than one scene; keep all of them.
4. Rename `ui/mods/com.pa.YOURNAME.MODNAME/` to exactly that identifier.
5. If the mod ships loadouts, set a unique `LS_KEY` in `bank.js`, update the
   `coui://ui/mods/<identifier>/bank.js` line at the top of each loadout card, and set
   `prefix`/`path` on the `model.gwoLoadoutBanks` entry in `start_cards.js`. GWO reads
   that entry to find the mod's bank; without it a locked loadout never unlocks.

The identifier in `modinfo.json`, the `scenes` addresses and the `ui/mods/` folder name
must agree. If they disagree the game loads nothing and reports nothing.

Work in the user's copy. The template repo's own tree is the pristine skeleton — do not
fill its placeholders in.

## Registering a card

A card that is not registered is never dealt. The card's ID is its file name without
`.js`. See the README's "Feature reference" for the full list of `model.gwo*` arrays.

- Tech card → push the ID to `model.gwoCards` in `tech_cards.js`, **and** describe its
  affected units in `model.gwoCardsToUnits`. A card that changes no units goes in
  `model.gwoCardsWithoutTooltip` instead, or GWO warns about missing tooltip data.
- Loadout → push `{ id: "…" }` to `model.gwoStartingCards` (available immediately) or
  `model.gwoNewStartCards` (must be earned) in `start_cards.js`, never both. A loadout
  ID **must contain `_start_`** (GWO's `isStartLoadoutCardId` test) and **must not begin
  `gwc_start`** (reserved for base-game loadouts, and routed to the base game's bank).
  Use a mod-specific prefix matching the one registered in `model.gwoLoadoutBanks`.
- A unit file the game does not otherwise load (an unused spec such as Ares' stomp) must
  be listed in `model.gwoSpecs` in `specs.js`, or mods to it are dropped. So must a file
  one unit borrows from another — see "Writing a file name into a spec" below.

**A registered loadout with no card file hangs the game, and it is the template's default
state.** GWO resolves every ID in `gwoStartingCards`/`gwoNewStartCards` through requirejs
while generating a war; a missing file throws `Script error for: cards/<id>` and the
generation promise never settles, so the client sits on `gw_start` forever with
`makeGameBusy()` true and no visible error. The log line `War created using Galactic War
Overhaul v…` appears anyway, so it is not evidence of success — the navigation to
`gw_play` is. The shipped `start_cards.js` registers four placeholder IDs and ships no
files for them, so **clear the lists of any example ID before the user enables the mod**,
including when the job is only tech cards. Verified live 2026-08-11: removing just those
two `push` calls took the same war from a permanent hang to `gw_play` in seconds.
Placeholder IDs in `model.gwoCards` are not equivalent — those 404 non-fatally and the
war plays.

## `inventory.addMods` — changing unit stats

The README documents the shape. This is the behaviour that is not obvious from it. Line
references are into `<GWO>` `ui/mods/com.pa.quitch.gwaioverhaul/shared/specs.js`.

- **`multiply` does not create.** If the stat is missing or is not a number it warns and
  leaves it alone (`:139-149`). `multiplyOrCreate` sets it to `value` when it is absent
  (`:259-268`). `add` also creates when absent, and concatenates when the value is a
  string (`:150-165`).
- **Ops do not run in the order you write them.** Across every card in the hand, all
  `replace` run first, then `multiplyOrCreate`, then `multiply`, then `add`; everything
  else follows afterwards (`:7, 20-33`). So another card's `replace` still lands before
  your `multiply`. Never write two ops that depend on running in sequence.
- **`wipe` is a string substitution, not a delete.** `value` is `[from, to]`; a bare value
  means "delete every occurrence of it" (`:238-246`).
- **Path walking** (`:278-399`): segments are separated by dots, so a segment cannot
  itself contain one. A number indexes into an array, and `+` appends a new object to one.
  Missing intermediate levels are created for you. If an intermediate segment is a
  **string**, it is treated as another spec file and followed — which means your change
  lands in that shared file and affects **every unit that references it**. The final
  segment is never followed (that is what `op: "tag"` exists for).
- **`file` is one path string.** Never an array. To change several units, build one
  descriptor per file — `gwoCard.mods(file, op, {path: value, …})` writes the entries
  for one file, and `_.flatten(_.map(group, …))` covers a whole group.
- **The file must be in play.** It has to be a unit the player was granted, or reachable
  from one, or listed in `model.gwoSpecs`. Otherwise GWO logs
  `Warning: File not found in mod` and nothing happens.
- **`path` is required** except for `clone` and `eval`. There is no whole-file replace.
- **A value that is a file name must be followed by `op: "tag"`** on the same `file` and
  `path`. See the section below — this is the failure that is hardest to spot.
- **`clone` and `eval` are advanced — avoid them**, as the README says.
- **`dull` removes units only.** It cannot undo a stat change or an AI change; only what
  `buff` never added stays un-added.

### Writing a file name into a spec — `op: "tag"`

GW gives each army private copies of its specs, keyed `<path>.json<tag>`
(`.player`, `.ai0`, …), and applies that army's mods to those copies. The copies are
generated **before** mods run (`<GWO>` `gw_play/referee_game_files.js`, then
`shared/spec_cache.js:tagSpec`), so a path a mod writes arrives untagged. Untagged paths
still resolve — to the stock file — so the weapon fires and the unit spawns, and the
player's entire hand misses it. Nothing is logged. This has shipped broken in GWO itself
more than once.

Every mod whose `value` is a spec reference needs a second mod, `op: "tag"`, on the same
`file` and `path` and with no `value`. The reference fields are the ones `tagSpec`
renames: `base_spec`, `tools[].spec_id`, `ammo_id`, `replaceable_units`,
`buildable_projectiles`, `factory.initial_build_spec`, `death_weapon.ground_ammo_spec`,
`death_weapon.air_ammo_spec`, `spawn_unit_on_death`.

Two things follow.

- **Index after the fact.** `replace` runs before `push`/`prepend`/`tag`, so a tool pushed
  onto a two-tool unit is tagged at `tools.2.spec_id`. Read the count from the unit's own
  spec under `<PA>`, not from the card.
- **The target must exist tagged**, or the tag points at nothing and the tool is lost
  outright — a worse outcome than leaving it untagged. A file the unit already references
  is covered. A file borrowed from another unit is not, and needs listing in
  `model.gwoSpecs`. Tagging cascades from there: a tagged weapon brings its `ammo_id`, and
  any `spawn_unit_on_death` on that ammo, with it.

Worked examples in `<GWO>`: `cards/gwaio_upgrade_firefly.js` (replace then tag),
`gwaio_upgrade_wyrm.js` (borrowed weapon), `gwaio_upgrade_sheller.js`
(`spawn_unit_on_death`). GWO's own `docs/specs.md` carries the same rule.

## `inventory.addAIMods` — changing what the AI builds

Line references are into `<GWO>` `ui/mods/com.pa.quitch.gwaioverhaul/gw_play/referee_ai.js`.

**Fields each op needs.** All need `type`. Missing any of these makes the descriptor do
nothing:

| op                             | also needs                    |
| ------------------------------ | ----------------------------- |
| `load`                         | `value`                       |
| `append`, `prepend`, `replace` | `toBuild`, `idToMod`, `value` |
| `remove`, `new`                | `toBuild`, `value`            |
| `squad`                        | `toBuild`, `value`            |

`squad` works only with `type: "template"`; the other five work only with `fabber`,
`factory` and `platoon`. Getting that pairing wrong is not always harmless: a build op
aimed at a template file quietly does nothing, but `squad` aimed at a build list
**throws** and takes the AI setup down with it (`:154-159`).

**What the files look like.** `fabber`/`factory`/`platoon` files are
`{ "build_list": [ … ] }`, where each entry has `to_build`, `priority`, `builders`,
`instance_count` and `build_conditions`. `build_conditions` is a **list of lists** — the
inner lists are groups of tests that must all pass, and the entry builds if any one group
passes. You need that shape to use `new` or `remove`. `template` files are
`{ "platoon_templates": { "<Name>": { "units": [ … ] } } }`.

**How matching works.** `toBuild` must equal an entry's `to_build` exactly — no wildcards,
no partial matches. `idToMod` is the field on that entry you are changing (`builders`,
`priority`, …). `refId`/`refValue` restrict the change to entries that already hold that
value, which is the usual way to tell apart the same `to_build` in the TITANS, Queller and
Penchant AI trees — `refId: "priority"` with the priority that tree uses.

**Things that silently do nothing:** a `toBuild` no file contains; `append`/`prepend`/
`replace` with no `idToMod`; `replace` against a field the entry does not already have (it
cannot create one); `remove` whose `value` is not an exact copy of a whole test object;
`squad` naming a template that does not exist.

**`op: "load"`.** It reads `/pa/ai_tech/<folder>/<value>` from your own mod, where the
folder follows from `type` (`fabber_builds/`, `factory_builds/`, `platoon_builds/`,
`platoon_templates/`). So `{ type: "factory", op: "load", value: "my_card.json" }` needs
`pa/ai_tech/factory_builds/my_card.json` shipped alongside your `ui` folder.

- `value` must include the `.json`.
- **If that file is missing the battle never starts.** Nothing errors; loading just hangs.
  Confirm the file exists on disk before shipping a `load`.
- Name it after your card ID. A name another mod also uses replaces that mod's file.
- Your other AI mods of the same `type` also apply to the file you loaded.

## Code rules

This code runs in PA's embedded **Chrome 40**, and a parse error takes out the entire
screen, not just the card. Use `var`; no `let`/`const`, arrow functions, template
literals or `class`. Do not use `String.prototype.startsWith`/`endsWith` — PA's own
polyfill ignores the position argument and returns the wrong answer; use `indexOf` or
`slice`. `_` (lodash), `ko`, jQuery, `api` and `model` are globals.

`eslint.config.mjs` is the authoritative answer to "may I use X?": it forbids everything
after ES5 and then switches back on, one at a time, the features Chrome 40 genuinely
shipped. Anything not on that list is not allowed. It came with the template and sits in
the mod folder alongside `package.json`, so checking a card is `npm install` once in that
folder, then `npm run lint:js`.

The loader files (`tech_cards.js`, `start_cards.js`, `specs.js`) wrap their body in
`try`/`catch` and `console.error` the failure. Keep that: a throw there breaks the whole
scene with no visible cause.

## When something here disagrees with the game

GWO is the authority, not this file and not the README. Its `docs/tech-cards.md` holds
the card contract, the `model.gwo*` list, and the loadout bank rules; its
`test/modder_api.test.js` pins the surface a card is written against — the helper names
in `shared/cards.js`, the unit and group keys, `deal`'s arguments. If a card behaves
unexpectedly, read that test before assuming the template is wrong: it says what GWO
actually guarantees today.

## Checking the work

There is no test suite — validation is in-game, and the README's "Testing your mod"
section is the procedure (launch with `--devmode` and `--coherent_port=9999`, watch the
Coherent UI Debugger console, deal the card from the `X` panel, spawn the units in
sandbox). The README also lists the two messages PA prints normally, so they are not
mistaken for a fault.

Before handing back, check: no placeholder left anywhere (`YOUR_…`, `UNIT_PATH`,
`PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, `!LOC:…HERE`); a tech card's `deal` returns a chance
above `0` that does not depend on its optional fourth argument `rng` (only `params` may be
random, and a card drawing at all should use `rng`, not `Math.random()`); the card ID is registered in the right list; and the identifier is the same in
all three places.
