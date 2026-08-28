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
  "shared/gw_common",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (GW, gwoCard, gwoUnit, gwoGroup) {
  return {
    visible: _.constant(true),
    // ADD A CARD DESCRIPTION
    describe: _.constant("!LOC:YOUR DESCRIPTION HERE."),
    // ADD A CARD NAME
    summarize: _.constant("!LOC:CARD NAME HERE"),
    // SET A PATH TO YOUR CHOSEN ICON
    // This path can also point to a custom icon inside your own mod, for example
    // "coui://ui/mods/com.pa.YOURNAME.MODNAME/SOME_FOLDER/PNG_FILE_NAME.png"
    icon: _.constant(
      "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png"
    ),
    /* CHOOSE WHAT VOICE LINE TO USE ON DISCOVERY
     *
     * board_slot_increased
     * board_tech_available_air
     * board_tech_available_ammunition
     * board_tech_available_armor
     * board_tech_available_artillery
     * board_tech_available_bot
     * board_tech_available_combat
     * board_tech_available_cost_reduction
     * board_tech_available_defence
     * board_tech_available_economy
     * board_tech_available_efficiency
     * board_tech_available_orbital
     * board_tech_available_sea
     * board_tech_available_speed
     * board_tech_available_subcommander
     * board_tech_available_super_weapon
     * board_tech_available_titan_cost_reduction
     * board_tech_available_titans_all
     * board_tech_available_vehicle
     * board_tech_available_weapon_upgrade
     */
    audio: _.constant({ found: "/VO/Computer/gw/CHOSEN_LINE_HERE" }),
    getContext: gwoCard.getContext,
    // MODIFY CHANCE OF CARD APPEARING
    // This template uses none of the four arguments below.  You test the first
    // three to decide the chance.  You need the fourth, rng, only if your card
    // makes a random choice.  Use rng instead of Math.random().  With
    // Math.random() the same war deals differently each time you play it, and
    // players in a co-op game see different offers.  The chance itself must never
    // be random.  See "Randomness in `deal`" in the README.
    // eslint-disable-next-line no-unused-vars
    deal: function (system, context, inventory, rng) {
      var chance = 0;
      return { chance: chance };
    },
    buff: function (inventory) {
      // ADD UNITS TO INVENTORY
      // Delete the two lines below if your card unlocks no units.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
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
      // Delete the two lines below if your card changes no unit stats.
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
      // Delete the two lines below if your card does not change what the AI
      // builds.
      var aiMods = [];
      inventory.addAIMods(aiMods);
    },
    dull: function (inventory) {
      // REMOVE UNITS FROM INVENTORY
      // Delete the two lines below if your card unlocks no units.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.removeUnits(units);
    },
  };
});
