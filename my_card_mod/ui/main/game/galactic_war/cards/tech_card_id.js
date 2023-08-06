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
     * board_tech_available_combat
     */
    audio: function () {
      return {
        found: "/VO/Computer/gw/CHOSEN_LINE_HERE",
      };
    },
    getContext: gwoCard.getContext,
    deal: function (system, context, inventory) {
      var chance = 0;
      /* MODIFY CHANCE OF CARD APPEARING
       *
       * gwoCard.hasUnit() - has ALL units
       *                     accepts an array of paths and gwoUnit, or gwoGroup
       * !gwoCard.hasUnit() - missing ALL units
       * gwoCard.missingUnit() - missing ANY unit
       *                         accepts an array of paths and gwoUnit, or gwoGroup
       * !gwoCard.missingUnit() - has ANY unit
       * context.totalSize - galaxy size
       * GW.balance.numberOfSystems - array of galaxy sizes from 0 to 4
       *                              Small, Medium, Large, Epic, Uber
       * system.distance() - distance from origin (starting) system
       * chance = integer from 0 to infinity
       *          Rough way to consider number:
       *            < 30 is a low chance
       *            60-70 is a regular chance
       *            > 140 is a high chance
       *
       * Example of possible implementation:
       *
       * if (
       *   context.totalSize <= GW.balance.numberOfSystems[0] &&
       *   system.distance() > 2 &&
       *   gwoCard.hasUnit(inventory.units(), gwoUnit.boom) &&
       *   gwoCard.missingUnit(inventory.units(), gwoGroup.botsBasicMobile)
       * ) {
       *   chance = 200;
       * } else {
       *   chance = 25;
       * }
       * if (!gwoCard.hasUnit(inventory.units(), gwoGroup.factoriesAdvanced)) {
       *   chance *= 3;
       * }
       */
      return { chance: chance };
    },
    buff: function (inventory) {
      /* ADD UNITS TO INVENTORY
       * Comma separated list of paths to units, or GWO unit IDs, or GWO group IDs
       * example path: "/pa/units/land/assault_bot/assault_bot.json"
       * example GWO unit ID: gwoUnit.dox
       * example GWO unit group: gwoGroup.botsBasicMobile
       *
       * Full list of GWO unit IDs
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js
       *
       * Full list of GWO group IDs
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js
       *
       * If you don't want to add any units then delete the two lines below
       */
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.addUnits(units);

      /* MODIFY UNITS
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/gw_play/referee.js
       * See modSpecs()
       *
       * Each mod is in the following format:
       * {
       *   file: '/pa/units/some_unit/some_unit.json',
       *   path: 'attribute.child.dependent.value',
       *   op: 'multiply',
       *   value: 2.0
       * }
       *
       * file - The un-tagged spec ID to modify.
       * path - A "." separated list of attributes.  Objects will traverse
       *      down the hierarchy.  Strings will be considered dependent
       *      references to other specs.
       * op - The operation to apply to the attribute.  Currently supports
       *      multiply, add, replace, merge, push, clone, tag, eval, pull, and wipe.
       *          clone - Write to the value file with whatever is in the
       *                  attribute.
       *          eval - Execute value as raw javascript in a context with
       *                  attribute defined.  Do whatever you want. (Be
       *                  sure to return the attribute if using a path.)
       *          tag - Append specTag to the attribute.
       * value - The value to use with the operation.
       *
       * Important Note:
       * Base specs will be flattened on any specs that get mod'ed.
       *
       * If you don't want to apply any mods then delete the two lines below
       */
      var mods = [];
      inventory.addMods(mods);

      /* MODIFY SUB COMMANDER BEHAVIOUR
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/gw_play/referee.js
       * See addTechToAI()
       *
       * Each mod is in the following format:
       * {
       *   type: "fabber",
       *   op: "replace",
       *   toBuild: "BasicAirFactory",
       *   idToMod: "priority",
       *   value: 0,
       *   refId: "priority",
       *   refValue: 376,
       * }
       *
       * type - The AI manager/folder the file is under.
       * op       - The operation to apply to the idToMod.  Currently supports
       *            append, prepend, replace, remove, new, and squad.
       *              load - Only uses type, op, and value. Allows the loading of
       *                     an AI JSON file from /pa/ai_tech/`type`_builds/`value`
       * toBuild  - The `to_build` value to look for in the AI files.
       * idToMod  - The ID of the value we want to change.
       * value    - The value to apply at idToMod.
       * refId    - The ID of the reference value that must be present. Optional.
       * refValue - Only apply value if this refValue is present at refId.
       *
       * If you don't want to apply any AI mods then delete the two lines below
       */
      var aiMods = [];
      inventory.addAIMods(aiMods);
    },
    dull: function (inventory) {
      /* REMOVE UNITS FROM INVENTORY
       * Comma separated list of paths to units, or GWO unit IDs, or GWO group IDs
       * example path: "/pa/units/land/assault_bot/assault_bot.json"
       * example GWO unit ID: gwoUnit.dox
       * example GWO unit group: gwoGroup.botsBasicMobile
       *
       * Full list of GWO unit IDs
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js
       *
       * Full list of GWO group IDs
       * https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js
       *
       * If you don't want to remove any units then delete the two lines below
       */
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      inventory.removeUnits(units);
    },
  };
});
