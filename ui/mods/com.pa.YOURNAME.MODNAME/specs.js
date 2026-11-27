// OPTIONAL: EXTRA UNIT FILES
//
// Most mods do not need this file.  Leave it as it is unless the case below
// applies to you.
//
// Change only the model.gwoSpecs line.  Leave the other lines as they are:
// they wrap the file so that a mistake in it cannot break the rest of the game.
(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      // The checker reports gwoUnit as unused while the line below is still a
      // comment.  These three lines silence that.  Delete them when you use it.
      // eslint-disable-next-line no-unused-vars
      function (gwoUnit) {
        // The game runs the lines inside this function later, after the rest
        // of the file has finished, so the try at the bottom of the file
        // cannot catch a mistake in them.  This second try does that.
        try {
          if (!model.gwoSpecs) {
            model.gwoSpecs = [];
          }
          // Every player gets their own copy of the files that their units
          // need, and the game applies their cards to those copies.  It also
          // copies every file that you list here.
          //
          // List a file here when one of your cards gives it to a unit that
          // does not already use it: for example a weapon borrowed from
          // another unit, such as the weapon of the Ant given to the Dox, or a
          // file that no unit uses, such as the stomp of the Ares.  Without
          // the copy, the "tag" that such a card needs points at nothing - see
          // "Whenever your value is a file name, tag it" in
          // docs/changing-units.md
          //
          // To use this list, remove the comment marks (//) from the start of
          // the line below, and change the example files to your own.
          // model.gwoSpecs.push(gwoUnit.aresStomp);
        } catch (e) {
          console.error(e);
          // If you change "New GW Cards" at the bottom of the file, change it
          // here too.
          console.error("New GW Cards: " + (e.stack || e.message || e));
        }
      }
    );
  } catch (e) {
    console.error(e);
    // You can change "New GW Cards" to the name of your mod, so that errors in
    // the debugger say which mod they came from.
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
