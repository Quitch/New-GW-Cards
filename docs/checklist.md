# Minimum required changes

**Who needs this page:** every mod. Go through it before you release.

You don't have to use every feature. This is the shortest path to a working mod. Tick off
each item as you complete it.

**Every mod:**

- [ ] Put your own copy of this template into `client_mods` (see
      [Preparing the mod](setup.md#preparing-the-mod)).
- [ ] In `modinfo.json`, filled in `identifier`, `display_name`, `description`, and
      `author`.
- [ ] In `modinfo.json`, changed the `scenes` addresses so that they contain your
      identifier.
- [ ] Renamed the folder under `ui/mods/` so that it matches your identifier.
- [ ] Renamed the example card file that you use (`tech_card_id.js`,
      `unit_upgrade_card_id.js` or `start_card_id.js`) to a unique name that does not
      start with `gwc_` or `gwaio_`, and noted that name, without `.js`, as the card's ID.
- [ ] Gave the card a name, a description, and a picture.
- [ ] Made the card do something in its `buff`: add units, change unit stats, or change
      the AI.
- [ ] Replaced or deleted every placeholder left in the card, such as `UNIT_PATH`,
      `PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, and the `!LOC:...HERE` text. A placeholder that
      stays breaks the card.
- [ ] Checked the mod with the checker (see
      [Checking your work](testing.md#checking-your-work)) and fixed everything that it
      reported.

**If your card improves one unit (`gwoCard.upgradeCard`), also:**

- [ ] Set `requires` to the unit that the card improves. There is no `deal` to fill in,
      because the helper works out the chance.
- [ ] Added the card's ID to `model.gwoCards`, and listed it in `model.gwoCardsToUnits`, in
      `tech_cards.js`, the same as any other tech card.

**If your card is any other tech card, also:**

- [ ] In the card's `deal`, changed `chance` to a number above `0`. It starts at `0`, and
      the game never offers a card with a chance of `0`.
- [ ] Added the card's ID to `model.gwoCards` in `tech_cards.js`.
- [ ] Listed the card in `model.gwoCardsToUnits` in `tech_cards.js`, or in
      `model.gwoCardsWithoutTooltip` if it changes no units.

**If you make only tech cards:** the `model.gwoLoadoutBanks` block in `start_cards.js`
still holds the placeholder `YOUR_PREFIX_start_`. It does no harm. You can leave it, or
delete the whole block.

**If your card is for another race or an add-on, also:**

- [ ] Named the race or add-on units with `gwoUnit.<table>.<key>`, or with raw paths for a
      race or add-on from another mod.
- [ ] Listed those units in the card's `model.gwoCardsToUnits` entry. For a tech card,
      this is what stops the game from offering the card to other races.
- [ ] In `deal`, used `gwoCard.fieldedUnits(inventory)` in place of `inventory.units()`,
      or set `requires` to the race unit in `gwoCard.upgradeCard`.
- [ ] Tested the card in a war as that race (see
      [Testing a race card](race-cards.md#8-testing-a-race-card)).

**If your card is a loadout, also:**

- [ ] Added the card's ID to `model.gwoStartingCards` (unlocked) or
      `model.gwoNewStartCards` (locked) in `start_cards.js`, and checked that every ID in
      those lists has a card file of exactly that name.
- [ ] Set a unique `LS_KEY` in `bank.js`.
- [ ] Changed the `bank.js` address at the top of the loadout card so that it contains
      your identifier.
- [ ] Set `prefix` and `path` in the `model.gwoLoadoutBanks` entry in `start_cards.js`.
      Without this, a locked loadout can never unlock.

**If you add a deck, also:**

- [ ] Removed the comment marks from the example in `decks.js`, set `id` and `name`, and
      replaced or deleted every placeholder in it (see
      [`model.gwoDecks`](decks.md)).

**If you ship translations, also:**

- [ ] Added `"com.pa.quitch.modtranslations"` to `dependencies` in `modinfo.json`, and
      kept `priority` above `50`.
- [ ] Created `translations.js` in `ui/mods/<your identifier>/`, with your identifier in
      it.
- [ ] Listed `translations.js` under `global_mod_list` in `modinfo.json`, and under no
      other scene.
- [ ] Wrote one `translations/<lang>.json` for each language, with every key copied
      exactly from the text after `!LOC:` (see
      [Translating your mod](translating.md)).

---

[Contents](../README.md#contents)
