function addCards() {
  try {
    // Add loadouts
    if (!model.gwoNewStartCards) model.gwoNewStartCards = [];
    // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
    model.gwoNewStartCards.push(
      { id: "YOUR_LOADOUT_ID_1" },
      { id: "YOUR_LOADOUT_ID_2" }
    );
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addCards();
