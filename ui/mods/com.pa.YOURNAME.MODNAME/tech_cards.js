// YOUR TECH CARDS
//
// This file tells Galactic War Overhaul (GWO) about your tech cards, including
// cards made with gwoCard.upgradeCard.  GWO never deals a card that is not
// listed here.
//
// Replace every example ID below with the ID of one of your cards: its file
// name without ".js".  Delete the entries that you do not need.  An example ID
// that stays logs a harmless "Script error for: cards/YOUR_CARD_ID_1" in the
// debugger, and the war carries on.
//
// Change only the lists.  Leave the other lines as they are: they wrap the
// file so that a mistake in it cannot break the rest of the game.
(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        // THE CARDS THAT THE GAME CAN DEAL
        if (!model.gwoCards) {
          model.gwoCards = [];
        }
        // Put a comma between IDs, for example
        // model.gwoCards.push("mym_damage_bots", "mym_faster_air");
        model.gwoCards.push(
          "YOUR_CARD_ID_1",
          "YOUR_CARD_ID_2",
          "YOUR_CARD_ID_N"
        );

        // THE UNITS THAT EACH CARD'S TOOLTIP NAMES
        // One entry for each card listed above.  Use the same IDs.
        if (!model.gwoCardsToUnits) {
          model.gwoCardsToUnits = [];
        }
        model.gwoCardsToUnits.push(
          {
            id: "YOUR_CARD_ID_1",
            // Always name the unit itself, never its ammo or its weapon, even
            // when the card changes only the weapon.  For a card that changes
            // the commander, use gwoUnit.commander.
            // You can use a path to a unit, or a GWO unit ID.
            // example path: "/pa/units/land/assault_bot/assault_bot.json"
            // example GWO unit ID: gwoUnit.dox
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          },
          {
            id: "YOUR_CARD_ID_2",
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          },
          {
            id: "YOUR_CARD_ID_N",
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          }
        );

        // OPTIONAL: tech cards that must NOT show an affected-units tooltip.
        // A card that changes something other than units, for example a card
        // that only turns on a feature, belongs here INSTEAD of in
        // model.gwoCardsToUnits above.  If you do not list it here, GWO warns
        // that the card has no tooltip data.  See "Feature reference" in the
        // README.  Remove the comment marks (//) from the lines below and edit
        // them if you need this list.
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
