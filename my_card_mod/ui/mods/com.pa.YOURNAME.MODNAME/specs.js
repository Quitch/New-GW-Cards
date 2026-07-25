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
        // paths to files not used by the game that you wish to mod e.g. Ares' stomp
        // uncomment the line below if you want to mod unassigned specs
        // model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
      }
    );
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addSpecs();
