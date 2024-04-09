// For examples of what fully implemented cards look like see the GWO repository
// https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards
define([
  "module",
  "cards/gwc_start",
  // CHANGE THE PATH IN THE LINE BELOW TO MATCH WHAT YOU SET IT TO
  "coui://ui/mods/com.pa.YOURNAME.MODNAME/bank.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (module, GWCStart, gwoBank, gwoCard, gwoUnit, gwoGroup) {
  var CARD = { id: /[^/]+$/.exec(module.id).pop() };
  return {
    visible: _.constant(false),
    // ADD A CARD NAME
    summarize: _.constant("!LOC:CARD NAME HERE"),
    icon: function () {
      return gwoCard.loadoutIcon(CARD.id);
    },
    // ADD A CARD DESCRIPTION
    describe: _.constant("!LOC:YOUR DESCRIPTION HERE."),
    hint: function () {
      return {
        icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png",
        // ADD TEXT TO DISPLAY WHEN THE CARD IS LOCKED
        description: "!LOC:TEXT TO SHOW WHEN CARD IS LOCKED",
      };
    },
    deal: gwoCard.startCard,
    buff: function (inventory) {
      if (inventory.lookupCard(CARD) === 0) {
        var buffCount = inventory.getTag("", "buffCount", 0);
        if (!buffCount) {
          GWCStart.buff(inventory);

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
           *        down the hierarchy.  Strings will be considered dependent
           *        references to other specs.
           * op   - The operation to apply to the attribute.  Currently supports
           *        multiply, add, replace, merge, push, clone, tag, eval, pull, and wipe.
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
           * type     - The AI manager/folder the file is under.
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
        } else {
          inventory.maxCards(inventory.maxCards() + 1);
        }
        ++buffCount;
        inventory.setTag("", "buffCount", buffCount);
      } else {
        inventory.maxCards(inventory.maxCards() + 1);
        gwoBank.addStartCard(CARD);
      }
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
       * If you don't want to remove any units then simply delete
       * `units` and remove its entry from `gwoCard.applyDulls()`
       */
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      gwoCard.applyDulls(CARD, inventory, units);
    },
  };
});
