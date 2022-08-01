function addStartCards() {
  try {
    // Add locked loadouts
    if (!model.gwoNewStartCards) model.gwoNewStartCards = [];
    // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
    model.gwoNewStartCards.push(
      { id: "YOUR_LOADOUT_ID_1" },
      { id: "YOUR_LOADOUT_ID_2" },
      { id: "YOUR_LOADOUT_ID_N" }
    );

    // Add unlocked loadouts
    if (!model.gwoStartingCards) model.gwoStartingCards = [];
    // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
    model.gwoStartingCards.push(
      { id: "YOUR_LOADOUT_ID_1" },
      { id: "YOUR_LOADOUT_ID_2" },
      { id: "YOUR_LOADOUT_ID_N" }
    );
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addStartCards();
