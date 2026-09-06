(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        // Add cards to the deck.  GWO's shared/deal.js reads this list.
        if (!model.gwoCards) {
          model.gwoCards = [];
        }
        // An ID matches the card filename without the file extension, for
        // example "gwc_enable_vehicles_all"
        model.gwoCards.push(
          "YOUR_CARD_ID_1",
          "YOUR_CARD_ID_2",
          "YOUR_CARD_ID_N"
        );

        // Set up the tooltips for the cards.  GWO's gw_play/card_tooltips.js
        // reads this list.
        if (!model.gwoCardsToUnits) {
          model.gwoCardsToUnits = [];
        }
        model.gwoCardsToUnits.push(
          {
            id: "YOUR_TECH_ID_1",
            // Use base_commander for a commander.  Always name the unit itself,
            // never its ammo or another file of it.
            // You can use a path to a unit, or a GWO unit ID.
            // example path: "/pa/units/land/assault_bot/assault_bot.json"
            // example GWO unit ID: gwoUnit.dox
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          },
          {
            id: "YOUR_TECH_ID_2",
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          },
          {
            id: "YOUR_TECH_ID_N",
            units: ["AFFECTED_UNIT_PATH_1", gwoUnit.dox, "AND_SO_ON"],
          }
        );

        // OPTIONAL: tech cards that must NOT show an affected-units tooltip.
        // A card that changes something other than units, for example a card
        // that only enables a feature, belongs here INSTEAD of in
        // model.gwoCardsToUnits above.  If you do not list it here, Galactic War
        // Overhaul warns that the card has no tooltip data.  See "Feature
        // reference" in the README.  Remove the comment marks from the lines
        // below and edit them if you need this list.
        // if (!model.gwoCardsWithoutTooltip) {
        //   model.gwoCardsWithoutTooltip = [];
        // }
        // model.gwoCardsWithoutTooltip.push("YOUR_CARD_ID_1", "YOUR_CARD_ID_N");
      }
    );
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
