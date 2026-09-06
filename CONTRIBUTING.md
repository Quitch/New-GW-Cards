# CONTRIBUTING.md

This file gives guidance to Claude Code (claude.ai/code) and to human contributors who
change the code in this repository.

**Authoring compared with maintaining.** This file covers changes to the template itself.
`CLAUDE.md` covers the other job, which is writing a real card for a user against their PA
install. `CLAUDE.md` travels with the repo when the user copies it into `client_mods`.
Read `CLAUDE.md` when the user writes a card. Keep the two files consistent when GWO
changes its card contract or its op behaviour.

The repo root is also the mod root, so the release ZIP _is_ the folder that the author
copies into `client_mods`. `CLAUDE.md`, `README.md`, the lint tools and `.prettierrc` are
all in that ZIP. The audience takes the ZIP instead of cloning the repo, and the checker
works only because it sits beside `ui/`. This file is the one document that
`.gitattributes` still marks `export-ignore`, because it is about a change to the
template, not about writing a card.

## What this is

New-GW-Cards (repo `Quitch/New-GW-Cards`) is a **template, or starter kit**. It is not a
finished mod. It gives third-party authors a skeleton to copy and rename. They then
release their own new Galactic War loadouts and tech cards for Planetary Annihilation:
TITANS.

GW-AI-Overhaul (GWAIO/GWO) is a required dependency. `modinfo.json` declares
`"dependencies": ["com.pa.quitch.gwaioverhaul"]`, and every card calls `require` on GWO's
shared modules (`shared/cards.js`, `shared/units.js`, `shared/unit_groups.js`). The
template therefore works only when GWO is installed. This repo is the sibling of GWO. The
GWO workspace (`GW-AI-Overhaul`) is the authoritative source for card examples, for unit
IDs, and for the `referee.js` and AI-mod runtime that the cards use.

This repo, like GWO, contains plain JS and JSON that the game's embedded Chrome 40 loads.
There is **no build step, no transpile step and no bundler**. The only tooling is ESLint
(`package.json` and `eslint.config.mjs`). Unlike GWO, this repo has **no test harness**.
You do the other validation by hand, in the game, with the Coherent UI Debugger. See
"Testing" below.

## The template is full of placeholders — that is by design

The purpose of the repo is that an author copies the whole repo into their PA
`client_mods/` folder, renames it, and completes the blank values. Authors normally copy
the release ZIP. The values below are intentional placeholders that a real mod replaces.
They are **not** faults to correct in this repo:

- `com.pa.YOURNAME.MODNAME` — the mod identifier. It appears in `modinfo.json`, in the
  `ui/mods/com.pa.YOURNAME.MODNAME/` directory name, and in the `coui://` scene URLs. The
  author must change all three together and keep them the same. See the `README.md` step
  "Preparing the mod".
- `YOUR NAME HERE`, `#.#.#`, `yyyy-mm-dd`, and the empty `forum` and `icon` values in
  `modinfo.json`.
- `your_mod_id` — the `LS_KEY` in `bank.js`. It is the localStorage key for unlocked
  loadouts.
- `YOUR_CARD_ID_*`, `YOUR_LOCKED_LOADOUT_ID_*`, `YOUR_UNLOCKED_LOADOUT_ID_*`,
  `YOUR_PREFIX_start_`, `YOUR_TECH_ID_*`, `UNIT_PATH`, `PATH_*`, `PNG_FILE_NAME`,
  `CHOSEN_LINE_HERE` and the `!LOC:...HERE` strings. The three example card files
  `start_card_id.js`, `tech_card_id.js` and `unit_upgrade_card_id.js` are also
  placeholders. The author renames them to `ACRONYM_EFFECT_UNITTYPE.js`, for example
  `gwc_damage_bots.js`.

When you edit this repo, change only the template and the scaffold. Do **not** replace a
placeholder with a real value, because that would make the template into one specific mod.
When the user writes a real card _from_ this template, completing the placeholders is the
whole job.

## Layout

The repo root **is** the mod root. `modinfo.json` and `ui/` sit at the top level, and the
author copies the whole folder. The copy therefore carries `CLAUDE.md`, the authoring
guide named above, and the lint tools with it. PA cannot see the other files in the root
(`package.json`, `eslint.config.mjs`, `.prettierrc`, `README.md`, `LICENSE` and this
file). PA reads only `modinfo.json` and the files that its `scenes` block names.

There are two separate trees:

- `ui/main/game/galactic_war/cards/*.js` — the **card definitions**. This path shadows the
  card directory of the base game. `tech_card_id.js` is the tech-card template. The game
  deals a tech card during play, and the card then appears on the board.
  `unit_upgrade_card_id.js` is the same family, written through `gwoCard.upgradeCard`. It
  is the single-unit shape, it improves one unit that the player already holds, and
  `requires` controls it. `start_card_id.js` is the loadout, or start-card, template. The
  player chooses a loadout on the screen before the game, and a loadout can be unlockable.
  GWO's `docs/tech-cards.md` prescribes the two factory shapes for new cards of those
  families. An object literal stays correct for every other card.
- `ui/mods/com.pa.YOURNAME.MODNAME/*.js` — the **loader and registration scripts**. The
  `scenes` block in `modinfo.json` injects them for each scene. They push the card IDs of
  the author into GWO's `model.gwo*` arrays, so that GWO finds them:
  - `start_cards.js` (`gw_start`, `gw_play`, `gw_coop_per_player_loadout`) →
    `model.gwoNewStartCards` (locked), `model.gwoStartingCards` (unlocked) and
    `model.gwoLoadoutBanks` (the location of the `bank.js` of this mod). It can also use
    `model.gwoStarCardsWhichBreakAllies`, for loadouts that an allied commander cannot
    work with. GWO never creates that array, so the loader must create it if it is absent.
  - `tech_cards.js` (`gw_play`, `gw_coop_per_player_loadout`) → `model.gwoCards` (the
    deck) and `model.gwoCardsToUnits` (the unit associations for the tooltip). It can also
    use `model.gwoCardsWithoutTooltip`, for tech cards that must show no affected-units
    tooltip.
  - `specs.js` (the `gw_play` scene) → `model.gwoSpecs`. Use it to mod unit specs that the
    base game does not otherwise load, such as an unused unit.
  - `bank.js` — an AMD module written with `define()`. `start_card_id.js` calls `require`
    on it and gives it to `gwoCard.loadout` as the `bank`. It stores unlocked loadouts
    under a `localStorage` key that is private to the mod, so that removal of the mod does
    not give a 404 for the loadout list of the base game.

The `scenes` block in `modinfo.json` is the real list of entry points. The game loads only
the files listed there, and every URL must match the mod `identifier`. **Each scene gets a
new `model` page.** A loader must therefore appear under every scene that needs its data.
That is why `start_cards.js` appears three times and `tech_cards.js` appears twice. If you
register loadouts only in `gw_start`, they are absent from the `gw_play` treasure pool, so
the game can never award them, and they are also absent from the co-op loadout picker.

## Card contract

Cards are AMD modules (`define([deps], function(...) {...})`). Each returns an object with
GWO's fixed card shape. See the "Tech card contract" section in the CLAUDE.md of the
GW-AI-Overhaul workspace for the authoritative list and its validator. The templates here
follow it:

- `visible`, `describe`, `summarize`, `icon`, `deal`, `buff` and `dull` are always
  present. A tech card also carries `audio` and `getContext`. A start card carries `hint`
  in place of those two. `keep`, `discard` and `releaseContext` are optional and almost
  unused. GWO replaces PA's dealer, so GWO never calls `discard`, and it calls
  `keep(deal, context)` at deal time rather than when the player keeps the card. Only
  `releaseContext` behaves as its name says.
- `deal(system, context, inventory, rng)` controls distribution and returns `{ chance }`.
  A tech card calculates a chance. A start card passes the work to `gwoCard.startCard`.
  `rng` is the seeded stream of the card, and it is optional. GWO's own docs require
  `gwoCard.uniqueValue(rng)` in place of `Math.random()`. They also require that `chance`
  never depends on `rng`, because the dealer calls `deal()` many times for each hand as a
  test. Only `params` may depend on `rng`.
- `buff(inventory)` applies the card. It uses `inventory.addUnits(...)` with unit paths,
  GWO unit IDs or group IDs. It uses `inventory.addMods(...)` for unit-spec stat mods,
  which have the shape `{file, path, op, value}`. It uses `inventory.addAIMods(...)` for
  AI build-order descriptors, which have the shape
  `{type, op, toBuild, idToMod, value, refId, refValue, matchAll}`. The comments in the
  templates document the op tables and the meaning of each field. GWO applies spec mods in
  `gw_play/referee_game_files.js` and AI mods in `gw_play/referee_ai.js` (`applyAiMods`).
- A spec mod whose `value` is a **file name** needs a second mod with `op: "tag"`, on the
  same `file` and the same `path`. The file must also be reachable, or listed in
  `model.gwoSpecs`. This is a silent failure. `README.md`, `CLAUDE.md` and the comments in
  `tech_card_id.js`, `start_card_id.js`, `unit_upgrade_card_id.js` and `specs.js` all warn
  about it. Keep those warnings consistent with each other, and with GWO's
  `docs/specs.md`.
- **A loadout ID that is registered with no card file of that name stops war generation
  completely.** The supplied `start_cards.js` does exactly that with four placeholder IDs.
  An author who enables the template before they edit it therefore gets a Galactic War
  that never starts. This was verified in the game on 2026-08-11 against GWO DEV v6.10.1.
  It is the worst failure mode of the template, because it breaks the game rather than the
  card. Three places state it: `README.md` (the blockquote under `model.gwoStartingCards`,
  and a checklist item), `CLAUDE.md` ("Registering a card"), and the header comment in
  `start_cards.js`. Keep those three consistent. Do not correct the problem by emptying
  the supplied lists. The example IDs show an author the shape, and the warning is the
  correction.
- `dull(inventory)` reverses `buff`, and the game applies it after every `buff`. Use it to
  remove units. A start card writes neither `buff` nor `dull`.
  `gwoCard.loadout(CARD, {bank, start, apply, dulls})` returns both, and the template
  gives them directly to the card.

For complete examples, refer the author to the GWO card directory
(`GW-AI-Overhaul/ui/main/game/galactic_war/cards/`). Do not invent examples.

**GWO is the authority on all of this.** Its `docs/tech-cards.md` documents the card
contract and the third-party interface. Its `test/modder_api.test.js` fixes that
interface: the `model.gwo*` globals, the helper names in `shared/cards.js`, the keys in
`units.js` and `unit_groups.js`, and the arguments of `deal`. When GWO changes any of
them, GWO is expected to update this repo at the same time. Read that test first when the
template and the game disagree.

## Conventions

- The game code in this repo runs in PA's embedded **Chrome 40**. `ecmaVersion: 6` is a
  parser setting, not the policy. The policy comes from the `restrict-to-es5` rule of
  `eslint-plugin-es-x`, applied to `**/ui/**/*.js`. The tree is at `ui/**`, beside the
  config, and the `**/` prefix protects against an author who puts their renamed copy
  inside another folder. The config then permits again, one rule at a time, the post-ES5
  features that Chrome 40 really contains. Each of those rules names the Chrome version
  that added the feature. **That list of permitted features is the authoritative answer to
  "may I use X in a card?". A feature that is absent from it is forbidden.** The config
  forbids everything first and then permits, so it also catches a missing _builtin_, such
  as `Object.assign` or `Array.from`. A missing builtin fails at call time rather than at
  parse time, so a syntax-only check does not find it. The config restates these bans with
  their reasons: `let` and `const` (Chrome 41, and its block scoping does not conform to
  the specification, so use `var`), block-scoped function declarations, and
  `String.prototype.startsWith` and `String.prototype.endsWith` (PA's own polyfill takes
  one argument, drops the position argument without a message, and returns the wrong
  answer, so use `indexOf` or `slice`). The config also declares the known engine globals
  (`api`, `model`, `_`, `requireGW`, `ko`, and the browser, jquery and amd sets).
- The ESLint config is a flat config. It uses `js/recommended` and
  `curly: ["error", "all"]`, and it applies the Prettier config last to disable rules that
  conflict. To run it, use `npm install`, then `npm run lint:js`. `package.json` pins the
  five lint dependencies (`eslint`, `@eslint/js`, `eslint-config-prettier`,
  `eslint-plugin-es-x` and `globals`) with caret ranges. It also sets `"type": "module"`,
  so that Node loads the ESM file `eslint.config.mjs`. That config file is the only `.js`
  file that Node itself runs. ESLint only parses the game code, as
  `sourceType: "script"`, and Node never runs it.
- The loader scripts (`start_cards.js`, `tech_cards.js`, `decks.js`, `specs.js`) are
  each one immediately invoked function, `(function () { ... })();`, so that they declare
  nothing in the shared scene scope. Inside it they put their body in a `try`/`catch`
  block that sends failures to `console.error`. Keep both patterns. A throw in a loader
  would break the scene in the game and show no cause.
- LICENSE is public domain (Unlicense).
- The audience of this mod is people who may know nothing about code. The mod must guide
  the user at every step. Write many more comments, in much more detail, than is normal,
  and write all of them in plain English.

## Testing (manual, in-game)

There is no automated test suite. Follow the "Testing your mod" section of `README.md`.
Start PA with `--devmode` and `--coherent_port=9999`, enable the mod, and watch the
console of the Coherent UI Debugger.

`README.md` lists the two errors and warnings that PA prints in normal operation: an
`Uncaught TypeError: undefined is not a function`, and a deprecation warning about
synchronous XHR. Each can appear once for each scene. `README.md` also lists GWO's
`Warning: File not found in mod Object`, which is expected whenever a card changes a unit
that the player does not own. The list exists so that a reader does not take these
messages for real failures.

`README.md` documents separate manual procedures for the two card types. For start cards,
check the loadout screen and the localStorage key that `LS_KEY` sets in `bank.js`. For
tech cards, deal the card through the `X` panel, then spawn the units in the sandbox.
