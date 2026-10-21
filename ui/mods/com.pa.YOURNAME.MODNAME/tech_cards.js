// YOUR TECH CARDS
//
// This file tells Galactic War Overhaul (GWO) about your tech cards, including
// cards made with gwoCard.upgradeCard.  GWO never deals a card that is not
// listed here or in a deck's cards list in decks.js.  A card listed here
// joins every deck, so list a card only in decks.js if it belongs to one
// deck alone.
//
// The lists below start empty, with examples in the comments above them.
// Write the ID of each of your cards in them: its file name without ".js".
// Every ID that you add must have a card file of exactly that name in
// ui/main/game/galactic_war/cards/.  If it does not, the debugger shows
// "GWO card failed to load:" and the ID, and the war carries on without that
// card.
//
// Change only the lists, and delete the three lines marked below once a list
// uses gwoUnit.  Leave the other lines as they are: they wrap the file so
// that a mistake in it cannot break the rest of the game.
(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      // The checker reports gwoUnit as unused while the lists are empty.  These
      // three lines silence that.  Delete all three when a list uses gwoUnit.
      // eslint-disable-next-line no-unused-vars
      function (gwoUnit) {
        // THE CARDS THAT THE GAME CAN DEAL
        if (!model.gwoCards) {
          model.gwoCards = [];
        }
        // Write your IDs inside the brackets of push( ), with a comma between
        // them and no comma after the last one, for example:
        //   model.gwoCards.push("mym_damage_bots", "mym_faster_air");
        model.gwoCards.push();

        // THE UNITS THAT EACH CARD'S TOOLTIP NAMES
        // One entry for each card listed above.  Use the same IDs.
        if (!model.gwoCardsToUnits) {
          model.gwoCardsToUnits = [];
        }
        // Always name the unit itself, never its ammo or its weapon, even when
        // the card changes only the weapon.  For a card that changes the
        // commander, use gwoUnit.commander.  You can use a path to a unit, or
        // a GWO unit ID:
        //   example path: "/pa/units/land/assault_bot/assault_bot.json"
        //   example GWO unit ID: gwoUnit.dox
        // Write your entries inside the brackets of push( ), with a comma
        // between them and no comma after the last one, for example:
        //   model.gwoCardsToUnits.push(
        //     {
        //       id: "YOUR_CARD_ID_1",
        //       units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
        //     },
        //     {
        //       id: "YOUR_CARD_ID_N",
        //       units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
        //     }
        //   );
        model.gwoCardsToUnits.push();

        // OPTIONAL: tech cards that must NOT show an affected-units tooltip.
        // A card that changes something other than units, for example a card
        // that only turns on a feature, belongs here INSTEAD of in
        // model.gwoCardsToUnits above.  If you do not list it here, GWO warns
        // that the card has no tooltip data.  See docs/tech-cards.md.  Remove the
        // comment marks (//) from the lines below and edit them if you need
        // this list.
        // if (!model.gwoCardsWithoutTooltip) {
        //   model.gwoCardsWithoutTooltip = [];
        // }
        // model.gwoCardsWithoutTooltip.push("YOUR_CARD_ID_1", "YOUR_CARD_ID_N");
      }
    );
  } catch (e) {
    console.error(e);
    // You can change "New GW Cards" to the name of your mod, so that errors in
    // the debugger say which mod they came from.
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
