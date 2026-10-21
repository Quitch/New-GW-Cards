# Troubleshooting

**Who needs this page:** any mod whose card does not work as expected.

Most mistakes in a card mod fail without a message. Find your symptom below, and check
each cause in turn. Most causes link to the details.

Before you start, run the [checker](setup.md#installing-the-checker-recommended). Keep
the debugger's Console open, as [Checking and testing your mod](testing.md#setting-up)
describes. That section also lists the messages that PA prints in normal play. Those
messages are not faults.

## Messages you may see

Some mistakes do show a message in the Console. Each message below contains the text
shown. Find yours, and follow the link for the details.

| Message                                                       | Normal? | What it means                                                                                                                                                                                               |
| ------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Uncaught TypeError: undefined is not a function`             | Yes     | PA prints it on every screen. See [Setting up](testing.md#setting-up).                                                                                                                                      |
| `Synchronous XMLHttpRequest on the main thread is deprecated` | Yes     | PA prints it on every screen.                                                                                                                                                                               |
| `Warning: File not found in mod`                              | Usually | A card changed a unit that the player does not own. It is a fault only when the player should own it. See [Setting up](testing.md#setting-up).                                                              |
| `GWO card failed to load:`                                    | No      | A tech-card ID has no card file of that name, or the file has a typing mistake.                                                                                                                             |
| `Start card failed to load:`                                  | No      | The same, for a loadout. See [`model.gwoStartingCards`](loadouts.md#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).                                                                             |
| `Uncaught Error: Script error for: cards/`                    | No      | A card file did not load. It can appear as well as one of the two messages above.                                                                                                                           |
| `is invalid or missing from model.gwoCardsToUnits`            | No      | A tech card is in neither `model.gwoCardsToUnits` nor `model.gwoCardsWithoutTooltip`. See [the tooltip lists](tech-cards.md#modelgwocardstounits--tech-card-tooltips-in-tech_cardsjs).                      |
| `Loadout bank failed to load:`                                | No      | The `path` in `model.gwoLoadoutBanks` does not lead to your `bank.js`. Check the identifier in it. See [`model.gwoLoadoutBanks`](loadouts.md#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs). |
| `New GW Cards:`                                               | No      | One of your loader files stopped with an error. The rest of the message says why.                                                                                                                           |
| An op name and a colon, such as `multiply:` or `tag:`         | No      | A change to a unit stat found the wrong kind of value, or no value. The message names the change. See [Change unit stats](changing-units.md#change-unit-stats--inventoryaddmods).                           |
| `Invalid selector in mod`                                     | No      | A `[layer=…,channel=…]` part of a `path` is written wrongly. See [Change unit stats](changing-units.md#change-unit-stats--inventoryaddmods).                                                                |
| `AI file of a load mod not read, skipped:`                    | No      | A `load` names a file that is missing. See [`load`](ai-build-orders.md#loading-a-ready-made-build-file--load).                                                                                              |
| `Invalid AI file type in load mod`                            | No      | A `load` has no `type`, or a wrong one. See [Change what your Sub Commanders build](ai-build-orders.md).                                                                                                    |
| `Invalid AI mod operation`                                    | No      | An AI change has a misspelled `op`. See [Change what your Sub Commanders build](ai-build-orders.md).                                                                                                        |
| `applyAiMods: op threw`                                       | No      | An AI change is missing a label that it needs, for example a `silence` with no `value`. See [Change what your Sub Commanders build](ai-build-orders.md).                                                    |
| `[ModTranslations]` with `"languages":[]`                     | No      | Your translations were not found. See [Testing your translations](translating.md#testing-your-translations).                                                                                                |
| A red error that names one of your translation files          | No      | That file is not valid JSON. See [Testing your translations](translating.md#testing-your-translations).                                                                                                     |

Most other mistakes show no message at all. The rest of this page lists them by symptom.

## Nothing from the mod appears at all

- The identifier is not the same in all three places: `identifier` in `modinfo.json`,
  the `scenes` addresses in `modinfo.json`, and the folder name under `ui/mods/`. See
  [Preparing the mod](setup.md#preparing-the-mod).
- The mod is not enabled in **Community Mods**, or Galactic War Overhaul is not
  installed. See [What you need](../README.md#what-you-need).

## A war does not start with my loadout

- The loadout's ID is in `start_cards.js`, but there is no card file with exactly that
  name, or the file has a typing mistake. The Console shows
  `Start card failed to load:` and the ID. See
  [`model.gwoStartingCards`](loadouts.md#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

## My card is never found, even by the test panel

- The card's ID is not in `model.gwoCards` in `tech_cards.js`. See
  [`model.gwoCards`](tech-cards.md#modelgwocards--your-tech-card-deck-in-tech_cardsjs).
- The ID in `tech_cards.js` and the file name are different. The ID is the file name
  without `.js`, letter for letter.
- The card file has a typing mistake. The Console shows `GWO card failed to load:` and
  the ID. The [checker](setup.md#installing-the-checker-recommended) finds most of these.
- The ID starts with `gwc_` or `gwaio_`. The game then normally uses GWO's file of that
  name, not yours. See
  [Naming and registering your card](tech-cards.md#naming-and-registering-your-card).

## The test panel gives me the card, but a war never offers it

- `deal` returns a chance of `0`. The example card starts at `0`. See
  [`deal`](deal.md).
- The card needs a unit that the player does not have yet: `requires` in
  `gwoCard.upgradeCard`, or a check in `deal`. Play until the player has that unit, or
  test the check directly.
- The ID contains `_upgrade_`, and you play as a race other than MLA. See
  [Which races get an upgrade card](tech-cards.md#which-races-get-an-upgrade-card).
- The card's `model.gwoCardsToUnits` entry names units that the player's race does not
  have, or a race or add-on unit is misspelled. See
  [Cards for another race or an add-on](race-cards.md).

## The card's picture is blank

- The `icon` names a file that is not in PA's tech icon folder. See
  [`summarize`, `describe`, `icon`](tech-cards.md#summarize-describe-icon--name-description-picture).

## The card's tooltip is missing, or GWO warns about tooltip data

- The card is in neither `model.gwoCardsToUnits` nor `model.gwoCardsWithoutTooltip`. See
  [`model.gwoCardsToUnits`](tech-cards.md#modelgwocardstounits--tech-card-tooltips-in-tech_cardsjs).
- Every card lost its tooltip at the same time. A race table name in `tech_cards.js` is
  misspelled, and the error stops the whole list. See
  [Name the unit](race-cards.md#1-name-the-unit).

## The card is in my hand, but the units do not change

- You tested in a skirmish or a sandbox game. Cards apply only inside Galactic War. See
  [Testing tech cards](testing.md#testing-tech-cards).
- The Console shows `Warning: File not found in mod` for a unit that the player owns. The
  path is misspelled, or a file that you borrowed from another unit is not listed in
  [`model.gwoSpecs`](changing-units.md#modelgwospecs--extra-unit-files-to-change-in-specsjs).
- The value is not in the unit's file, and the op is `multiply`, which does nothing when
  the value is missing. See
  [Change unit stats](changing-units.md#change-unit-stats--inventoryaddmods).
- The change writes a file name, such as a weapon, and has no `tag` after it. The new
  weapon works, but no other card applies to it. See
  [Whenever your value is a file name, `tag` it](changing-units.md#whenever-your-value-is-a-file-name-tag-it).
- The card's `dull` lists a unit that its own `buff` gives. See
  [`dull`](tech-cards.md#dull--units-the-card-forbids).

## My Sub Commanders do not build what my card gives them

- A `load` file is missing. The battle's log shows
  `AI file of a load mod not read, skipped:` and the path. See
  [Loading a ready-made build file](ai-build-orders.md#loading-a-ready-made-build-file--load).
- A `toBuild` or builder name is not in the AI's files, an op is missing a label that it
  needs, or the op does not work with that `type`. See
  [Change what your Sub Commanders build](ai-build-orders.md).
- A change that stops the AI's own builds also stops your loaded ones. See
  [When your card replaces builds](ai-build-orders.md#when-your-card-replaces-builds--treeonly).

## A locked loadout never unlocks

- `model.gwoLoadoutBanks` is missing from `start_cards.js`, still has its comment marks,
  or its `prefix` does not match the start of your loadout IDs. See
  [`model.gwoLoadoutBanks`](loadouts.md#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs).
- The ID does not contain `_start_`, or starts with `gwc_start`. See
  [Loadout IDs](loadouts.md#loadout-ids).

## My text stays in English

- See the checks in [Testing your translations](translating.md#testing-your-translations).

---

[Contents](../README.md#contents)
