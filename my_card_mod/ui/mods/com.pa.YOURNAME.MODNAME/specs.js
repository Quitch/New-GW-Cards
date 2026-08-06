function addSpecs() {
  try {
    requireGW(
      ["coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js"],
      // gwoUnit is unused until you uncomment the push below
      // eslint-disable-next-line no-unused-vars
      function (gwoUnit) {
        if (!model.gwoSpecs) {
          model.gwoSpecs = [];
        }
        // Every player gets their own copy of the files their units need, and their
        // cards are applied to those copies.  Anything listed here is copied too.
        //
        // List a file here if either of these is true:
        //   1. the game never loads it and you want to change it, e.g. Ares' stomp
        //   2. one of your cards lends it to another unit, e.g. giving Dox the Ant's
        //      weapon - see "Whenever your value is a file name, tag it" in the README
        //
        // uncomment the line below if you want to mod unassigned specs
        // model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
      }
    );
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
}
addSpecs();
