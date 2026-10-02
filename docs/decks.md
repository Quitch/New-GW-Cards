# `model.gwoDecks` — your own deck in the Techs picker (in `decks.js`)

**Who needs this page:** only mods that offer a deck of their own. Most mods don't.

The Techs picker in the war setup normally offers two decks: **Basic** (the base
game's tech cards) and **Galactic War Overhaul** (the full GWO deck). A deck that you add
here appears beside them, and a war started with it deals only that deck's cards.

You don't need a deck to add cards. Cards that you add to `model.gwoCards` join **every**
deck. Add a deck only when you want players to be able to choose a different set of
cards, for example a smaller themed deck.

```js
if (!model.gwoDecks) {
  model.gwoDecks = [];
}
model.gwoDecks.push({
  id: "mym-nomad",
  name: "!LOC:Nomad",
  tooltip: "!LOC:Nomad-only tech.",
  include: ["Basic"],
  cards: ["mym_card_a", "gwc_minion"],
});
```

- `id`: a unique name for the deck. The war save remembers it.
- `name`: shown in the picker and on the war panel. The game already labels these places
  "deck", so don't put the word Deck in the name.
- `tooltip`: optional. One line for the Techs tooltip, describing the deck.
- `include`: optional. The IDs of other decks whose cards this deck contains: `"Basic"`,
  `"Expanded"` (the full GWO deck, which already contains Basic), or another mod's deck.
  To include another mod's deck, list that mod in `dependencies` in your `modinfo.json`
  **and** give your mod a **higher** `priority` number than that mod, so that the other
  mod loads first. Leave `include` out for a standalone deck.
- `cards`: optional. Individual card IDs, either your own cards or any stock card, so that
  you can pick single cards without including a whole deck.

A deck needs at least one card between `include` and `cards`. A card appears only once,
however many times these lists name it. `modinfo.json` already lists `decks.js` on all
three screens. If the player removes your mod, a war started with your deck deals the GWO
deck instead.

Unlike the other loaders, `decks.js` starts with its example turned off (commented out),
because an example deck would appear in the picker as soon as the mod is enabled. Remove
the comment marks and edit the values to use it. If you don't want a deck, you can delete
`decks.js` and its three lines in `modinfo.json`.

---

[Contents](../README.md#contents)
