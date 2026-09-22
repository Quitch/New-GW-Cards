// AN EXAMPLE LOADOUT (START CARD)
//
// The README explains every part of a card in plain English, with worked
// examples.  Keep it open beside this file.  Read "How to read the card files"
// in the README first if you have never edited a file like this before.
//
// 1. Rename this file.  The file name without ".js" is the ID of the loadout.
//    A loadout ID MUST contain "_start_", and it must NOT start with
//    "gwc_start" - that prefix belongs to the loadouts that come with the
//    game.  Use a prefix of your own, for example "mym_start_engineer.js".
// 2. Change the parts marked in CAPITALS below.
// 3. Add the ID to start_cards.js, in the locked list or in the unlocked list.
//    Also set LS_KEY in bank.js - see "The bank and LS_KEY" in the README.
//
// Do not change the define([ ... ]) block or the "function (...) {" line below
// it, except the bank.js address.  They load the tools that the card uses.
define([
  "module",
  "cards/gwc_start",
  // CHANGE com.pa.YOURNAME.MODNAME IN THE LINE BELOW TO YOUR IDENTIFIER
  "coui://ui/mods/com.pa.YOURNAME.MODNAME/bank.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (module, GWCStart, myBank, gwoCard, gwoUnit, gwoGroup) {
  // Leave this line alone.  It reads the ID of the card from the file name.
  var CARD = { id: module.id.substring(module.id.lastIndexOf("/") + 1) };

  // gwoCard.loadout writes the difficult half of a loadout for you.  When the
  // player starts a war with this loadout, it gives them the standard starting
  // units of the game and then runs your `apply` below.  If the same loadout
  // appears again later in the war, it gives an extra card slot instead.  If the
  // player wins a copy on a Guardian planet, it records that copy in your bank,
  // and the loadout then unlocks.  You complete only the parts below.
  var loadout = gwoCard.loadout(CARD, {
    bank: myBank,
    start: GWCStart,
    // `apply` is what your loadout gives the player, on top of the standard
    // start.  You can delete the whole of `apply` if it gives nothing extra.
    apply: function (inventory) {
      // ADD UNITS TO INVENTORY
      // Replace the two examples in the list with the units that your loadout
      // gives.  Delete the two lines below if your loadout unlocks no units.
      var units = [gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.addUnits(units);

      // MODIFY UNITS
      // An example of the list contents.  It gives the Dox 50% more health, and
      // it gives their weapon 20 more range:
      //   var mods = [
      //     { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
      //     { file: gwoUnit.doxWeapon, path: "max_range", op: "add", value: 20 },
      //   ];
      //
      // If the value that you write is the NAME OF ANOTHER FILE - a weapon, a
      // build arm, or something that spawns on death - it needs a second entry
      // directly after it, with op: "tag" and no value.  Without that entry the
      // player's other cards do not apply to what you added, and nothing warns
      // you.  This example gives the Dox a second weapon, borrowed from the Ant:
      //   var mods = [
      //     {
      //       file: gwoUnit.dox,
      //       path: "tools",
      //       op: "push",
      //       value: { spec_id: gwoUnit.antWeapon, aim_bone: "bone_root" },
      //     },
      //     { file: gwoUnit.dox, path: "tools.1.spec_id", op: "tag" },
      //   ];
      // The Dox already has one tool, so the tool that you pushed is number 1.
      // Tools count from 0.  You must also list a borrowed file in specs.js, or
      // the tag points at nothing.  The README section "Whenever your value is a
      // file name, tag it" explains both halves.
      //
      // Delete the two lines below if your loadout changes no unit stats.
      var mods = [];
      inventory.addMods(mods);

      // MODIFY WHAT YOUR SUB COMMANDERS BUILD
      // Most loadouts do not need this.  An example of the list contents.  It
      // lets basic bot factories build something that only advanced bot
      // factories could build before.  "MyUnit" must be replaced with a real
      // to_build name from the game's AI files - see "Change what your Sub
      // Commanders build" in the README:
      //   var aiMods = [
      //     {
      //       type: "factory",
      //       op: "append",
      //       toBuild: "MyUnit",
      //       idToMod: "builders",
      //       value: "BasicBotFactory",
      //       refId: "builders",
      //       refValue: ["AdvancedBotFactory"],
      //     },
      //   ];
      // Delete the two lines below if your loadout does not change what the AI
      // builds.
      var aiMods = [];
      inventory.addAIMods(aiMods);
    },
    // REMOVE UNITS FROM INVENTORY
    // These are the units to take back if the player moves to a different
    // loadout.  List the same units as "ADD UNITS TO INVENTORY" above.
    // Delete the line below if your loadout unlocks no units.
    dulls: [gwoUnit.dox, gwoGroup.botsBasicMobile],
  });

  return {
    visible: _.constant(false),
    // ADD A CARD NAME
    // Keep the "!LOC:" at the start.  It lets the text be translated.
    summarize: _.constant("!LOC:CARD NAME HERE"),
    // Leave the icon as it is.  It shows the medal for the hardest war that the
    // player has won with this loadout, or a red commander before the first
    // win.
    icon: function () {
      return gwoCard.loadoutIcon(CARD.id);
    },
    // ADD A CARD DESCRIPTION
    describe: _.constant("!LOC:YOUR DESCRIPTION HERE."),
    // ADD TEXT TO DISPLAY WHEN THE CARD IS LOCKED
    // For example the loadout name, or a hint about how to earn it.
    hint: gwoCard.lockedHint("!LOC:TEXT TO SHOW WHEN CARD IS LOCKED"),
    deal: gwoCard.startCard,
    buff: loadout.buff,
    dull: loadout.dull,
  };
});
