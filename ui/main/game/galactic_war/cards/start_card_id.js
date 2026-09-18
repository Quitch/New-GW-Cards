// The "Feature reference" section of the README explains every part of a card in
// plain English, with worked examples.  Keep the README open beside this file.
//
// For examples of complete cards, see the GWO repository
// https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards
//
// If this file or the README disagrees with the game, GWO is the authority.  Its
// docs/tech-cards.md says what a card can contain and what the game gives to each
// part.  Its test/modder_api.test.js keeps that stable.
define([
  "module",
  "cards/gwc_start",
  // CHANGE THE PATH IN THE LINE BELOW TO MATCH WHAT YOU SET IT TO
  "coui://ui/mods/com.pa.YOURNAME.MODNAME/bank.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (module, GWCStart, myBank, gwoCard, gwoUnit, gwoGroup) {
  var CARD = { id: module.id.substring(module.id.lastIndexOf("/") + 1) };

  // gwoCard.loadout writes the difficult half of a loadout for you.  When the
  // player starts a war with this loadout, it gives them the standard starting
  // units of the game and then runs your `apply` below.  If the same loadout
  // appears again later in the war, it gives an extra card slot instead.  If the
  // player wins a copy on a Guardian planet, it records that copy in your bank,
  // and the loadout then unlocks.  You complete only the parts below.
  var loadout = gwoCard.loadout(CARD, {
    // YOUR BANK - THE FILE YOU NAMED AT THE TOP OF THIS FILE
    bank: myBank,
    // THE GAME'S STANDARD STARTING UNITS - LEAVE THIS LINE AS IT IS
    start: GWCStart,
    apply: function (inventory) {
      // ADD UNITS TO INVENTORY
      // Delete the two lines below if your loadout unlocks no units.
      var units = [gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.addUnits(units);

      // MODIFY UNITS
      // An example of the list contents.  It gives the Dox 50% more health, and
      // it gives their weapon more range:
      //   var mods = [
      //     { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
      //     { file: gwoUnit.doxWeapon, path: "max_range", op: "add", value: 20 },
      //   ];
      //
      // If the value that you write is the NAME OF ANOTHER FILE - a weapon, a
      // build arm, or something that spawns on death - it needs a second entry
      // directly after it, with op: "tag" and no value.  Without that entry the
      // other cards of the player do not apply to what you added, and nothing
      // warns you.  This example gives the Dox a second weapon, borrowed from the
      // Ant:
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

      // MODIFY SUB COMMANDER BEHAVIOUR
      // An example of the list contents.  It lets basic bot factories build
      // something that only advanced bot factories could build before:
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
    // loadout.  Delete the line below if your loadout unlocks no units.
    dulls: [gwoUnit.dox, gwoGroup.botsBasicMobile],
  });

  return {
    visible: _.constant(false),
    // ADD A CARD NAME
    summarize: _.constant("!LOC:CARD NAME HERE"),
    icon: function () {
      return gwoCard.loadoutIcon(CARD.id);
    },
    // ADD A CARD DESCRIPTION
    describe: _.constant("!LOC:YOUR DESCRIPTION HERE."),
    // ADD TEXT TO DISPLAY WHEN THE CARD IS LOCKED
    hint: gwoCard.lockedHint("!LOC:TEXT TO SHOW WHEN CARD IS LOCKED"),
    deal: gwoCard.startCard,
    buff: loadout.buff,
    dull: loadout.dull,
  };
});
