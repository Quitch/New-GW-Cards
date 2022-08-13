function addTechCards() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        // Add cards to deck
        if (!model.gwoDeck) model.gwoDeck = [];
        // IDs match the card filename minus file extension e.g. "gwc_enable_vehicles_all"
        model.gwoDeck.push(
          "YOUR_CARD_ID_1",
          "YOUR_CARD_ID_2",
          "YOUR_CARD_ID_N"
        );

        // Setup tooltips for cards
        if (!model.gwoCardsToUnits) model.gwoCardsToUnits = [];
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
      }
    );
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addTechCards();
