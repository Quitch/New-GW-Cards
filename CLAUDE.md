# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in
this repository.

**Authoring vs maintaining.** This file governs changes to the template itself.
`my_card_mod/CLAUDE.md` governs the other job — writing an actual card for a user against
their PA install — and travels with the folder when they copy it into `client_mods`. Read
that one when the user is authoring a card; keep the two in step when GWO's card contract
or op behaviour changes. Both, plus the lint tooling and `.prettierrc`, ship in the
release ZIP (`.gitattributes` no longer `export-ignore`s them), because the audience takes
the ZIP rather than cloning.

## What this is

New-GW-Cards (repo `Quitch/New-GW-Cards`) is a **template / starter kit**, not a
finished mod. It gives third-party authors a copy-and-rename skeleton for shipping
their own new Galactic War loadouts and tech cards for Planetary Annihilation: TITANS.
It is a hard dependency on GW-AI-Overhaul (GWAIO/GWO) — `modinfo.json` declares
`"dependencies": ["com.pa.quitch.gwaioverhaul"]` and every card `require`s GWO's shared
modules (`shared/cards.js`, `shared/units.js`, `shared/unit_groups.js`), so the template
only works with GWO installed. This repo is the sibling of GWO; GWO's own workspace
(`GW-AI-Overhaul`) is the authoritative source for card examples, unit IDs, and the
`referee.js`/AI-mod runtime the cards target.

Like GWO, this ships plain JS/JSON loaded by the game's embedded Chrome 40 — **no build
step, no transpile, no bundler**. The only tooling is ESLint (`package.json` +
`eslint.config.mjs`); unlike GWO there is **no test harness**. Validation is otherwise
manual (see "Testing" below), done in-game against the Coherent UI Debugger.

## The template is full of placeholders — that is by design

The point of the repo is that an author copies `my_card_mod/` into their PA
`client_mods/` folder, renames it, and fills in the blanks. The following are
intentional placeholders that a real mod replaces, **not** bugs to "fix" in this repo:

- `com.pa.YOURNAME.MODNAME` — the mod identifier, appearing in `modinfo.json`, the
  `ui/mods/com.pa.YOURNAME.MODNAME/` directory name, and the `coui://` scene URLs. All
  three must be changed together and kept in sync (`README.md` step "Preparing the mod").
- `YOUR NAME HERE`, `#.#.#`, `yyyy-mm-dd`, empty `forum`/`icon` in `modinfo.json`.
- `your_mod_id` — the `LS_KEY` in `bank.js` (localStorage key for unlocked loadouts).
- `YOUR_CARD_ID_*`, `YOUR_LOADOUT_ID_*`, `YOUR_TECH_ID_*`, `UNIT_PATH`, `PATH_*`,
  `PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, `!LOC:...HERE` strings, and the two example
  card files `start_card_id.js` / `tech_card_id.js` (rename to
  `ACRONYM_EFFECT_UNITTYPE.js`, e.g. `gwc_damage_bots.js`).

When editing this repo itself, only change the template/scaffold; do **not** replace
placeholders with concrete values (that would turn the template into one specific mod).
When the user is authoring an actual card _from_ this template, filling them in is the
whole job.

## Layout

`my_card_mod/` is the mod root that gets copied out. It carries its own `CLAUDE.md` (the
authoring guide, above) so the guidance survives the copy. Two distinct trees inside it:

- `my_card_mod/ui/main/game/galactic_war/cards/*.js` — the **card definitions**. This
  path shadows the base game's card directory. `tech_card_id.js` is the tech-card
  template (dealt during play, appears on the board); `start_card_id.js` is the
  loadout / start-card template (chosen on the pre-game loadout screen, unlockable).
- `my_card_mod/ui/mods/com.pa.YOURNAME.MODNAME/*.js` — the **loader / registration
  scripts** injected per scene via `modinfo.json`'s `scenes` block. These push the
  author's card IDs into GWO's `model.gwo*` arrays so GWO picks them up:
  - `start_cards.js` (`gw_start`, `gw_play`, `gw_coop_per_player_loadout`) →
    `model.gwoNewStartCards` (locked) + `model.gwoStartingCards` (unlocked) +
    `model.gwoLoadoutBanks` (where this mod's `bank.js` lives); optionally
    `model.gwoStarCardsWhichBreakAllies` (loadouts incompatible with an allied
    commander — GWO never creates this array, so the loader must guard-create it).
  - `tech_cards.js` (`gw_play`, `gw_coop_per_player_loadout`) → `model.gwoCards`
    (deck) + `model.gwoCardsToUnits` (tooltip unit associations); optionally
    `model.gwoCardsWithoutTooltip` (tech cards that should have no affected-units tooltip).
  - `specs.js` (`gw_play` scene) → `model.gwoSpecs`, for modding unit specs the base
    game doesn't otherwise load (e.g. unused units).
  - `bank.js` — a `define()` AMD module `require`d by `start_card_id.js`; persists
    unlocked loadouts to a mod-private `localStorage` key so uninstalling the mod
    doesn't 404 the base loadout list.

`modinfo.json`'s `scenes` block is the real entry-point list — only files listed there
load, and every URL must match the mod `identifier`. **`model` is a fresh page per
scene**, so a loader has to be listed under every scene whose data it supplies; that
is why `start_cards.js` appears three times and `tech_cards.js` twice. Registering
loadouts only in `gw_start` leaves them out of the `gw_play` treasure pool (so they
can never be awarded) and out of the co-op loadout picker.

## Card contract

Cards are AMD modules (`define([deps], function(...) {...})`) returning an object with
GWO's fixed card shape. See the GW-AI-Overhaul workspace's CLAUDE.md ("Tech card
contract") for the authoritative list and its validator; the templates here mirror it:

- `visible`, `describe`, `summarize`, `icon`, `deal`, `buff`, `dull` — always present.
  Tech cards also carry `audio` + `getContext`; start cards carry `hint` instead.
- `deal(system, context, inventory, rng)` controls distribution (returns `{ chance }`);
  tech cards compute a chance, start cards delegate to `gwoCard.startCard`. `rng` is the
  card's seeded stream and is optional — GWO's own docs require `gwoCard.uniqueValue(rng)`
  over `Math.random()`, and that `chance` never depend on `rng` (only `params` may), since
  the dealer calls `deal()` speculatively many times per hand.
- `buff(inventory)` applies the card: `inventory.addUnits(...)` (unit paths / GWO unit
  IDs / group IDs), `inventory.addMods(...)` (unit-spec stat mods —
  `{file, path, op, value}`), and `inventory.addAIMods(...)` (AI build-order descriptors
  — `{type, op, toBuild, idToMod, value, refId, refValue, matchAll}`). The op tables and
  field meanings are documented inline in the template comments; GWO applies spec mods in
  `gw_play/referee_game_files.js` and AI mods in `gw_play/referee_ai.js` (`applyAiMods`).
- A spec mod whose `value` is a **file name** needs a second mod, `op: "tag"`, on the same
  `file` and `path`, and the file must be reachable or listed in `model.gwoSpecs`. This is
  the template's most important silent-failure warning and is spelled out three times over
  — `README.md`, `my_card_mod/CLAUDE.md`, and the comments in `tech_card_id.js` and
  `specs.js`. Keep those four in step, and in step with GWO's `docs/specs.md`.
- `dull(inventory)` reverses `buff` — applied after all `buff`s, for unit removal. Start
  cards route removal through `gwoCard.applyDulls(CARD, inventory, units)`.

For fully-worked examples, point at the GWO card directory
(`GW-AI-Overhaul/ui/main/game/galactic_war/cards/`) rather than inventing them.

## Conventions

- Shipped game code targets PA's embedded **Chrome 40**. `ecmaVersion: 6` is a parser
  setting, not the policy — the enforcement is `eslint-plugin-es-x`'s `restrict-to-es5`
  applied to `**/ui/**/*.js` (the `**/` prefix is load-bearing: the shipped tree is at
  `my_card_mod/ui/**` and an author renames the folder again, so a bare `ui/**` matches
  nothing), with the post-ES5 features Chrome 40 genuinely shipped
  switched back on one rule at a time (each annotated with the Chrome version that
  landed it). **That whitelist is the authoritative answer to "may I use X in a card?" —
  absent from it means forbidden.** Being a denylist-of-everything inverted, it also
  catches missing _builtins_ (`Object.assign`, `Array.from`), which fail at call time
  rather than parse time and so slip past a syntax-only check. Notable bans the config
  restates with its reasoning: `let`/`const` (Chrome 41, and its block scoping is
  non-conforming — use `var`), block-scoped function declarations, and
  `String.prototype.startsWith`/`endsWith` (PA's own single-argument polyfill silently
  drops the position argument and returns the wrong answer — use `indexOf`/`slice`).
  Known engine globals are declared in the config (`api`, `model`, `_`, `requireGW`,
  `ko`, plus browser/jquery/amd).
- ESLint flat config, `js/recommended` + `curly: ["error", "all"]`, Prettier config
  applied last to disable conflicting rules. Run it with `npm install` then
  `npm run lint:js`. `package.json` pins the five lint deps (`eslint`, `@eslint/js`,
  `eslint-config-prettier`, `eslint-plugin-es-x`, `globals`) with caret ranges and sets
  `"type": "module"` so Node loads the ESM `eslint.config.mjs` — that config file is the
  only `.js` Node itself executes; the shipped game code is only ever parsed by ESLint
  (as `sourceType: "script"`), never run under Node.
- Loader scripts (`start_cards.js`, `tech_cards.js`, `specs.js`) wrap their body in a
  `try/catch` that `console.error`s failures — keep that pattern; a throw there would
  break the scene silently in-game.
- LICENSE is public-domain (Unlicense).
- The audience of this mod are individuals who may be completely unfamiliar with coding.
  The mod should handhold the user at every step, with far more comments in much more
  detail than would be normal, while keeping everything in plain English.

## Testing (manual, in-game)

There is no automated test suite. Follow `README.md`'s "Testing your mod": launch PA
with `--devmode` and `--coherent_port=9999`, enable the mod, and watch the Coherent UI
Debugger console. `README.md` lists the two errors/warnings PA emits normally (an
`Uncaught TypeError: undefined is not a function` and a synchronous-XHR deprecation
warning, up to once per scene) so they aren't mistaken for real failures. Separate
manual flows are documented there for start cards (loadout screen + the localStorage
key set as `LS_KEY` in `bank.js`) and tech cards (deal via the `X` panel, then spawn
units in sandbox).
