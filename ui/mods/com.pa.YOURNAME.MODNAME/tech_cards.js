function addCards() {
  try {
    if (!model.gwoDeck) model.gwoDeck = [];
    if (!model.gwoCardsToUnits) model.gwoCardsToUnits = [];
    model.gwoDeck.push("YOUR_TECH_ID");
    model.gwoCardsToUnits.push({
      id: "YOUR_TECH_ID",
      // Use the base_commander for commander and always the use unit, not the ammo, etc.
      units: ["AFFECTED_UNIT_PATH"],
    });
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addCards();
