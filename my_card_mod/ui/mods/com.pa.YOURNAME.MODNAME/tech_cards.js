function addCards() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      function (gwoUnit) {
        // Add cards to deck
        if (!model.gwoDeck) model.gwoDeck = [];
        // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
        var cards = ["YOUR_CARD_ID_1", "YOUR_CARD_ID_2", "YOUR_CARD_ID_N"];
        model.gwoDeck = model.gwoDeck.concat(cards);

        // Setup cards for tooltips
        if (!model.gwoCardsToUnits) model.gwoCardsToUnits = [];
        var cardUnits = [
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
          },
        ];
        model.gwoCardsToUnits = model.gwoCardsToUnits.concat(cardUnits);
      }
    );
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addCards();
