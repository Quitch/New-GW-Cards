function addCards() {
  try {
    if (!model.gwoNewStartCards) model.gwoNewStartCards = [];
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
