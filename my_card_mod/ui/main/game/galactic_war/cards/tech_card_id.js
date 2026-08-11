// Every part of a card is explained in plain English, with worked examples, in the
// "Feature reference" section of the README.  Keep it open beside this file.
//
// For examples of what fully implemented cards look like see the GWO repository
// https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards
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
    // this path can also be to a custom icon shipped with your mod e.g.
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
    // The four things below are unused in this template.  The first three are what
    // you test to decide the chance.  The fourth, rng, is only needed if your card
    // makes a random choice - use it instead of Math.random(), or the same war will
    // deal differently each time it is played and players in a co-op game will
    // disagree about what was offered.  Whatever you do here, the chance itself must
    // never be random.  See the README's "Randomness in `deal`".
    // eslint-disable-next-line no-unused-vars
    deal: function (system, context, inventory, rng) {
      var chance = 0;
      return { chance: chance };
    },
    buff: function (inventory) {
      // ADD UNITS TO INVENTORY
      // Delete both lines below if your card doesn't unlock any units.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.addUnits(units);

      // MODIFY UNITS
      // An example of what goes in the list, giving Dox 50% more health and
      // their weapon a little more range:
      //   var mods = [
      //     { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
      //     { file: gwoUnit.doxWeapon, path: "max_range", op: "add", value: 20 },
      //   ];
      //
      // If the value you write is the NAME OF ANOTHER FILE - a weapon, a build arm,
      // something spawned on death - it needs a second entry right after it with
      // op: "tag" and no value.  Without it the player's other cards will not apply
      // to what you added, and nothing will warn you.  Giving Dox a second weapon
      // borrowed from the Ant:
      //   var mods = [
      //     {
      //       file: gwoUnit.dox,
      //       path: "tools",
      //       op: "push",
      //       value: { spec_id: gwoUnit.antWeapon, aim_bone: "bone_root" },
      //     },
      //     { file: gwoUnit.dox, path: "tools.1.spec_id", op: "tag" },
      //   ];
      // Dox has one tool already, so the one you pushed is number 1 (they count from
      // 0).  A borrowed file also has to be listed in specs.js, or the tag points at
      // nothing.  The README section "Whenever your value is a file name, tag it"
      // walks through both halves.
      //
      // Delete both lines below if your card doesn't change any unit's stats.
      var mods = [];
      inventory.addMods(mods);

      // MODIFY SUB COMMANDER BEHAVIOUR
      // An example of what goes in the list, letting basic bot factories build
      // something only advanced bot factories could build before:
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
      // Delete both lines below if your card doesn't change what the AI builds.
      var aiMods = [];
      inventory.addAIMods(aiMods);
    },
    dull: function (inventory) {
      // REMOVE UNITS FROM INVENTORY
      // Delete both lines below if your card doesn't unlock any units.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.removeUnits(units);
    },
  };
});
