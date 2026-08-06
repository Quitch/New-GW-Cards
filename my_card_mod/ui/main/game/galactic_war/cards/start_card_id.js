// Every part of a card is explained in plain English, with worked examples, in the
// "Feature reference" section of the README.  Keep it open beside this file.
//
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
], function (module, GWCStart, myBank, gwoCard, gwoUnit, gwoGroup) {
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
    hint: _.constant({
      icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png",
      // ADD TEXT TO DISPLAY WHEN THE CARD IS LOCKED
      description: "!LOC:TEXT TO SHOW WHEN CARD IS LOCKED",
    }),
    deal: gwoCard.startCard,
    buff: function (inventory) {
      if (inventory.lookupCard(CARD) === 0) {
        var buffCount = inventory.getTag("", "buffCount", 0);
        if (!buffCount) {
          GWCStart.buff(inventory);

          // ADD UNITS TO INVENTORY
          // Delete both lines below if your loadout doesn't unlock any units.
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
          // If the value you write is the NAME OF ANOTHER FILE - a weapon, a build
          // arm, something spawned on death - it needs a second entry right after it
          // with op: "tag" and no value.  Without it the player's other cards will
          // not apply to what you added, and nothing will warn you.  Giving Dox a
          // second weapon borrowed from the Ant:
          //   var mods = [
          //     {
          //       file: gwoUnit.dox,
          //       path: "tools",
          //       op: "push",
          //       value: { spec_id: gwoUnit.antWeapon, aim_bone: "bone_root" },
          //     },
          //     { file: gwoUnit.dox, path: "tools.1.spec_id", op: "tag" },
          //   ];
          // Dox has one tool already, so the one you pushed is number 1 (they count
          // from 0).  A borrowed file also has to be listed in specs.js, or the tag
          // points at nothing.  The README section "Whenever your value is a file
          // name, tag it" walks through both halves.
          //
          // Delete both lines below if your loadout doesn't change any unit's stats.
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
          // Delete both lines below if your loadout doesn't change what the AI builds.
          var aiMods = [];
          inventory.addAIMods(aiMods);
        } else {
          inventory.maxCards(inventory.maxCards() + 1);
        }
        ++buffCount;
        inventory.setTag("", "buffCount", buffCount);
      } else {
        inventory.maxCards(inventory.maxCards() + 1);
        myBank.addStartCard(CARD);
      }
    },
    dull: function (inventory) {
      // REMOVE UNITS FROM INVENTORY
      // If your loadout doesn't unlock any units, delete `units` below and remove it
      // from the gwoCard.applyDulls() call.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
      gwoCard.applyDulls(CARD, inventory, units);
    },
  };
});
