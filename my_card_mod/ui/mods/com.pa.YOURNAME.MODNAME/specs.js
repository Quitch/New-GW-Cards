function addSpecs() {
  try {
    if (!model.gwoSpecs) {
      model.gwoSpecs = [];
    }
    // paths to files not used by the game that you wish to mod e.g. Ares' stomp
    // example path: "/pa/units/land/assault_bot/assault_bot.json"
    // remove the line below if you don't want to mod unassigned specs
    model.gwoSpecs.push("PATH_1", "PATH_2", "PATH_3");
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
addSpecs();
