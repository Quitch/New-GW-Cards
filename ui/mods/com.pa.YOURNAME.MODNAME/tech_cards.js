function addTechCards() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        // Add cards to deck.  GWO's shared/deal.js reads this list.
        if (!model.gwoCards) {
          model.gwoCards = [];
        }
        // IDs match the card filename minus file extension e.g. "gwc_enable_vehicles_all"
        model.gwoCards.push(
          "YOUR_CARD_ID_1",
          "YOUR_CARD_ID_2",
          "YOUR_CARD_ID_N"
        );

        // Setup tooltips for cards.  GWO's gw_play/card_tooltips.js reads this.
        if (!model.gwoCardsToUnits) {
          model.gwoCardsToUnits = [];
        }
        model.gwoCardsToUnits.push(
          {
            id: "YOUR_TECH_ID_1",
            // Use the base_commander for commander and always the use unit, not the ammo, etc.
            // You can either use paths to units or GWO unit IDs
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

        // OPTIONAL: tech cards that should NOT show an affected-units tooltip.
        // A card that changes something other than units (for example one that
        // only switches a feature on) belongs here INSTEAD of in
        // model.gwoCardsToUnits above, otherwise Galactic War Overhaul warns that
        // the card is missing its tooltip data. See the README's "Feature
        // reference". Uncomment and edit the lines below if you need this.
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
}
addTechCards();
