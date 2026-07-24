function addStartCards() {
  try {
    // Add locked loadouts
    if (!model.gwoNewStartCards) {
      model.gwoNewStartCards = [];
    }
    // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
    model.gwoNewStartCards.push(
      { id: "YOUR_LOADOUT_ID_1" },
      { id: "YOUR_LOADOUT_ID_2" },
      { id: "YOUR_LOADOUT_ID_N" }
    );

    // Add unlocked loadouts
    if (!model.gwoStartingCards) {
      model.gwoStartingCards = [];
    }
    // IDs match the card filename minus file extension e.g. "gwc_start_vehicles"
    model.gwoStartingCards.push(
      { id: "YOUR_LOADOUT_ID_1" },
      { id: "YOUR_LOADOUT_ID_2" },
      { id: "YOUR_LOADOUT_ID_N" }
    );

    // OPTIONAL: loadouts that cannot be used alongside an allied commander.
    // If your loadout's effect would break the allied-commander feature, list
    // its ID here so Galactic War Overhaul turns the ally off when the loadout
    // is chosen. Unlike the lists above, Galactic War Overhaul never creates
    // this one itself, so you must create it before adding to it. See the
    // README's "Feature reference". Uncomment and edit the lines below if needed.
    // if (!model.gwoStarCardsWhichBreakAllies) {
    //   model.gwoStarCardsWhichBreakAllies = [];
    // }
    // model.gwoStarCardsWhichBreakAllies.push("YOUR_LOADOUT_ID_1");
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addStartCards();
