function addCards() {
  try {
    if (!model.gwoDeck) model.gwoDeck = [];
    if (!model.gwoCardsToUnits) model.gwoCardsToUnits = [];
    model.gwoDeck.push("YOUR_TECH_ID_1", "YOUR_TECH_ID_2");
    model.gwoCardsToUnits.push({
      id: "YOUR_TECH_ID_1",
      // Use the base_commander for commander and always the use unit, not the ammo, etc.
      units: ["AFFECTED_UNIT_PATH_1", "AFFECTED_UNIT_PATH_2", "AND_SO_ON"],
    });
    model.gwoCardsToUnits.push({
      id: "YOUR_TECH_ID_2",
      units: ["AFFECTED_UNIT_PATH_1", "AFFECTED_UNIT_PATH_2", "AND_SO_ON"],
    });
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addCards();
