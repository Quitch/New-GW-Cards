// OPTIONAL: EXTRA UNIT FILES
//
// Most mods do not need this file.  Leave it as it is unless one of the two
// cases below applies to you.
//
// Change only the model.gwoSpecs line.  Leave the other lines as they are:
// they wrap the file so that a mistake in it cannot break the rest of the game.
(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      // The next line stops the checker warning that gwoUnit is not used
      // while the line further down is still a comment.  Leave it.
      // eslint-disable-next-line no-unused-vars
      function (gwoUnit) {
        if (!model.gwoSpecs) {
          model.gwoSpecs = [];
        }
        // Every player gets their own copy of the files that their units need,
        // and the game applies their cards to those copies.  It also copies
        // every file that you list here.
        //
        // List a file here if one of these is true:
        //   1. the game never loads it and you want to change it, for example
        //      the stomp of the Ares
        //   2. one of your cards lends it to another unit, for example a card
        //      that gives the Dox the weapon of the Ant - see "Whenever your
        //      value is a file name, tag it" in the README
        //
        // To use this list, remove the comment marks (//) from the start of the
        // line below, and change the example files to your own.
        // model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
      }
    );
  } catch (e) {
    console.error(e);
    // You can change "New GW Cards" to the name of your mod, so that errors in
    // the debugger say which mod they came from.
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
