(function () {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
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
        // Remove the comment marks from the line below to mod unassigned specs
        // model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
      }
    );
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
