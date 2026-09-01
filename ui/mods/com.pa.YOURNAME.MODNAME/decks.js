// OPTIONAL: offer a whole deck of your own in the Techs picker during war
// setup.  A deck decides which tech cards the war can deal.  Cards pushed in
// tech_cards.js reach every deck already, so most mods do not need this file -
// if yours does not, delete it and its lines in modinfo.json.
//
// To add a deck, remove the comment marks from the lines below and edit them.
// Unlike the other loaders, this one starts inactive: an example deck would
// appear in the picker, named "YOUR NAME HERE", the moment the mod is enabled.
function addDecks() {
  try {
    // Add decks to the picker.  GWO's shared/deck_mods.js reads this list.
    // The fields of a deck:
    // - id: a unique ID for the deck.  The war save remembers it, so changing
    //   it later disconnects old wars from the deck.
    // - name: shown in the Techs picker and on the war panel.  The game
    //   already labels these places "deck", so do NOT put the word Deck in
    //   the name itself.
    // - tooltip (OPTIONAL): one line describing the deck, added to the Techs
    //   tooltip.  Remove the line if you do not want one.
    // - include (OPTIONAL): the IDs of other decks to include, cards and all.
    //   "Basic" is the base game's deck and "Expanded" is the full Galactic
    //   War Overhaul deck (which already contains Basic).  You can also
    //   include another mod's deck: list that mod in `dependencies` in
    //   modinfo.json AND give your mod a HIGHER `priority` number than it, so
    //   it loads first.  Remove the line for a standalone deck.
    // - cards (OPTIONAL): individual card IDs.  Your own cards, or any stock
    //   card - for example "gwc_minion" or "gwaio_upgrade_ant" - so you can
    //   cherry-pick cards without including a whole deck.  A card appears in
    //   the deck once however many times these lists name it.
    //
    // if (!model.gwoDecks) {
    //   model.gwoDecks = [];
    // }
    // model.gwoDecks.push({
    //   id: "YOUR-DECK-ID",
    //   name: "!LOC:YOUR NAME HERE",
    //   tooltip: "!LOC:ONE LINE DESCRIBING THE DECK.",
    //   include: ["Basic"],
    //   cards: ["YOUR_CARD_ID_1", "YOUR_CARD_ID_N"],
    // });
  } catch (e) {
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
}
addDecks();
