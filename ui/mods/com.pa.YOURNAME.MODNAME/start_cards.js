// READ THIS BEFORE YOU ENABLE THE MOD
//
// Every ID in the two lists below must have a card file of exactly that name in
// ui/main/game/galactic_war/cards/.  If one of them does not, GALACTIC WAR DOES
// NOT START.  GWO loads every loadout that you list here while it builds a new
// war, and it waits for ever for a file that is missing.  The war finishes its
// generation and the screen then stays as it is, with no error and nothing to
// click.  A restart of the game is the only way out.
//
// The example IDs below have no files, so this happens the first time that you
// enable the mod.  DELETE THE IDS THAT YOU HAVE NOT REPLACED, even if you write
// only tech cards.  You can delete all of them - a mod with no loadouts works
// correctly.
//
// Tech cards (tech_cards.js) are safer.  The game logs a missing file there,
// skips that card, and the war continues.

function addStartCards() {
  try {
    // Add locked loadouts.  GWO's shared/loadouts.js reads this list to build
    // the loadout screen, and its gw_play/treasure_loadouts.js reads it to
    // decide what a Guardian planet can award.
    if (!model.gwoNewStartCards) {
      model.gwoNewStartCards = [];
    }
    // An ID matches the card filename without the file extension, for example
    // "mym_start_bots".  A loadout ID must contain "_start_", and it must NOT
    // start with "gwc_start" - that prefix belongs to the loadouts that come
    // with the game.  See "Creating a card" in the README.
    // A loadout belongs in THIS list or in the unlocked list below, never in
    // both.
    model.gwoNewStartCards.push(
      { id: "YOUR_LOCKED_LOADOUT_ID_1" },
      { id: "YOUR_LOCKED_LOADOUT_ID_N" }
    );

    // Add unlocked loadouts.  GWO's shared/loadouts.js reads this list.
    if (!model.gwoStartingCards) {
      model.gwoStartingCards = [];
    }
    // An ID matches the card filename without the file extension, for example
    // "mym_start_bots".  A loadout ID must contain "_start_", and it must NOT
    // start with "gwc_start" - that prefix belongs to the loadouts that come
    // with the game.  See "Creating a card" in the README.
    // Use different loadouts from the locked ones above.  Never put the same ID
    // in both lists.
    model.gwoStartingCards.push(
      { id: "YOUR_UNLOCKED_LOADOUT_ID_1" },
      { id: "YOUR_UNLOCKED_LOADOUT_ID_N" }
    );

    // TELL GALACTIC WAR OVERHAUL WHERE YOUR BANK IS
    // Your own bank.js records your locked loadouts.  Galactic War Overhaul
    // cannot find that file without help, so you give it the address here.
    // Without this entry a locked loadout can never unlock, and nothing warns
    // you.
    //
    // prefix - the first part of every loadout ID in this mod.  When the player
    //          earns one of your loadouts, Galactic War Overhaul uses the prefix
    //          to see that the loadout is yours.  It then writes the loadout to
    //          your bank instead of its own.
    // path   - the address of your bank.js.  CHANGE THE IDENTIFIER TO MATCH
    //          YOURS.
    if (!model.gwoLoadoutBanks) {
      model.gwoLoadoutBanks = [];
    }
    model.gwoLoadoutBanks.push({
      prefix: "YOUR_PREFIX_start_",
      path: "coui://ui/mods/com.pa.YOURNAME.MODNAME/bank.js",
    });

    // OPTIONAL: loadouts that an allied commander cannot work with.
    // If the effect of your loadout would break the allied-commander feature,
    // list its ID here.  Galactic War Overhaul then disables the ally when the
    // player picks the loadout.  Galactic War Overhaul never creates this list
    // itself, unlike the lists above, so you must create it before you add to
    // it.  See "Feature reference" in the README.  Remove the comment marks from
    // the lines below and edit them if you need this list.
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
