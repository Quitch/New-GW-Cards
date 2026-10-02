// YOUR LOADOUTS
//
// The two lists below start empty.  A mod with no loadouts works correctly, so
// leave them empty if you write only tech cards.
//
// Every ID that you add here must have a card file of exactly that name in
// ui/main/game/galactic_war/cards/, or that loadout cannot be used.  The
// debugger then shows "Start card failed to load:" and the ID.
//
// Change only the lists and the values marked in CAPITALS.  Leave the other
// lines as they are: they wrap the file so that a mistake in it cannot break
// the rest of the game.

(function () {
  try {
    // LOCKED LOADOUTS
    // The player must earn these.  They appear grey on the loadout screen, and
    // a Guardian planet can award them.
    if (!model.gwoNewStartCards) {
      model.gwoNewStartCards = [];
    }
    // An ID matches the card filename without the file extension, for example
    // "mym_start_bots".  A loadout ID must contain "_start_", and it must NOT
    // start with "gwc_start" - that prefix belongs to the loadouts that come
    // with the game.  See "Loadout IDs" in docs/loadouts.md.
    // A loadout belongs in THIS list or in the unlocked list below, never in
    // both.
    // Write your IDs inside the brackets of push( ), with a comma between them
    // and no comma after the last one, for example:
    //   model.gwoNewStartCards.push(
    //     { id: "YOUR_LOCKED_LOADOUT_ID_1" },
    //     { id: "YOUR_LOCKED_LOADOUT_ID_N" }
    //   );
    model.gwoNewStartCards.push();

    // UNLOCKED LOADOUTS
    // These are available from the start.
    if (!model.gwoStartingCards) {
      model.gwoStartingCards = [];
    }
    // An ID matches the card filename without the file extension, for example
    // "mym_start_bots".  A loadout ID must contain "_start_", and it must NOT
    // start with "gwc_start" - that prefix belongs to the loadouts that come
    // with the game.  See "Loadout IDs" in docs/loadouts.md.
    // Use different loadouts from the locked ones above.  Never put the same ID
    // in both lists.
    // Write your IDs in the same way as above, for example:
    //   model.gwoStartingCards.push(
    //     { id: "YOUR_UNLOCKED_LOADOUT_ID_1" },
    //     { id: "YOUR_UNLOCKED_LOADOUT_ID_N" }
    //   );
    model.gwoStartingCards.push();

    // TELL GALACTIC WAR OVERHAUL WHERE YOUR BANK IS
    // A mod with only tech cards can leave this block as it is, or delete it.
    //
    // Your own bank.js records your locked loadouts.  Galactic War Overhaul
    // cannot find that file without help, so you give it the address here.
    // Without this entry a locked loadout can never unlock, and nothing warns
    // you.
    //
    // prefix - the first part of every loadout ID in this mod.  When the player
    //          earns one of your loadouts, Galactic War Overhaul uses the prefix
    //          to see that the loadout is yours.  It then writes the loadout to
    //          your bank instead of its own.  CHANGE YOUR_PREFIX_start_
    //          to the start of your loadout IDs, for example "mym_start_".
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
    // itself, so you must create it before you add to it.  See
    // docs/loadouts.md.  Remove the comment marks (//) from the lines below
    // and edit them if you need this list.
    // if (!model.gwoStarCardsWhichBreakAllies) {
    //   model.gwoStarCardsWhichBreakAllies = [];
    // }
    // model.gwoStarCardsWhichBreakAllies.push("YOUR_UNLOCKED_LOADOUT_ID_1");

    // OPTIONAL: loadouts that a co-op AI player cannot use.
    // If a co-op AI player cannot use the effect of your loadout, for example
    // an ability that works only when a player gives an order, list its ID
    // here.  An AI player then never starts with it.  Galactic War Overhaul
    // never creates this list itself, so you must create it before you add to
    // it.  See docs/loadouts.md.  Remove the comment marks (//) from the lines
    // below and edit them if you need this list.
    // if (!model.gwoLoadoutsAiCannotUse) {
    //   model.gwoLoadoutsAiCannotUse = [];
    // }
    // model.gwoLoadoutsAiCannotUse.push("YOUR_UNLOCKED_LOADOUT_ID_1");
  } catch (e) {
    console.error(e);
    // You can change "New GW Cards" to the name of your mod, so that errors in
    // the debugger say which mod they came from.
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
