function addStartCards() {
  try {
    // Add locked loadouts.  GWO's shared/loadouts.js reads this to build the
    // loadout screen, and its gw_play/treasure_loadouts.js to decide what a
    // Guardian planet can award.
    if (!model.gwoNewStartCards) {
      model.gwoNewStartCards = [];
    }
    // IDs match the card filename minus file extension e.g. "mym_start_bots".
    // A loadout ID must contain "_start_" and must NOT begin "gwc_start" -
    // that prefix belongs to the loadouts that come with the game.  See the
    // README's "Creating a card".
    // A loadout belongs in THIS list or the unlocked one below, never in both.
    model.gwoNewStartCards.push(
      { id: "YOUR_LOCKED_LOADOUT_ID_1" },
      { id: "YOUR_LOCKED_LOADOUT_ID_N" }
    );

    // Add unlocked loadouts.  GWO's shared/loadouts.js reads this.
    if (!model.gwoStartingCards) {
      model.gwoStartingCards = [];
    }
    // IDs match the card filename minus file extension e.g. "mym_start_bots".
    // A loadout ID must contain "_start_" and must NOT begin "gwc_start" -
    // that prefix belongs to the loadouts that come with the game.  See the
    // README's "Creating a card".
    // Different loadouts to the locked ones above - never the same ID in both.
    model.gwoStartingCards.push(
      { id: "YOUR_UNLOCKED_LOADOUT_ID_1" },
      { id: "YOUR_UNLOCKED_LOADOUT_ID_N" }
    );

    // TELL GALACTIC WAR OVERHAUL WHERE YOUR BANK IS
    // Your locked loadouts are recorded in your own bank.js.  Galactic War
    // Overhaul cannot guess where that is, so you point it at the file here.
    // Without this, a locked loadout can never become unlocked, and nothing
    // warns you.
    //
    // prefix - the start of every loadout ID in this mod.  When the player earns
    //          one of your loadouts, this is how Galactic War Overhaul knows the
    //          loadout is yours and writes it to your bank instead of its own.
    // path   - the address of your bank.js.  CHANGE THE IDENTIFIER TO MATCH YOURS.
    if (!model.gwoLoadoutBanks) {
      model.gwoLoadoutBanks = [];
    }
    model.gwoLoadoutBanks.push({
      prefix: "YOUR_PREFIX_start_",
      path: "coui://ui/mods/com.pa.YOURNAME.MODNAME/bank.js",
    });

    // OPTIONAL: loadouts that cannot be used alongside an allied commander.
    // If your loadout's effect would break the allied-commander feature, list
    // its ID here so Galactic War Overhaul turns the ally off when the loadout
    // is chosen. Unlike the lists above, Galactic War Overhaul never creates
    // this one itself, so you must create it before adding to it. See the
    // README's "Feature reference". Uncomment and edit the lines below if needed.
    // if (!model.gwoStarCardsWhichBreakAllies) {
    //   model.gwoStarCardsWhichBreakAllies = [];
    // }
    // model.gwoStarCardsWhichBreakAllies.push("YOUR_UNLOCKED_LOADOUT_ID_1");
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
}
addStartCards();
