// AN EXAMPLE TECH CARD
//
// The README explains every part of a card in plain English, with worked
// examples.  Keep it open beside this file.  Read "How to read the card files"
// in the README first if you have never edited a file like this before.
//
// 1. Rename this file.  The file name without ".js" is the ID of the card, for
//    example "mym_damage_bots.js" has the ID "mym_damage_bots".  Start it with a
//    prefix of your own.  Never start it with "gwc_" or "gwaio_".  If a card has
//    the same name as one of the game's or GWO's, the game silently ignores one
//    of the two files, and which one depends on which mod loads last.
// 2. Change the parts marked in CAPITALS below.
// 3. Add the ID to tech_cards.js, in model.gwoCards.  Also list it in
//    model.gwoCardsToUnits if it changes units, or in
//    model.gwoCardsWithoutTooltip INSTEAD if it changes no units.  The game
//    never deals a card that is not in model.gwoCards or in a deck's cards
//    list in decks.js.
//
// Do not change the define([ ... ]) block or the "function (...) {" line below
// it.  They load the tools that the card uses.
define([
  "shared/gw_common",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js",
], function (GW, gwoCard, gwoUnit, gwoGroup) {
  return {
    visible: _.constant(true),
    // ADD A CARD NAME
    // Keep the "!LOC:" at the start.  It lets the text be translated.
    summarize: _.constant("!LOC:CARD NAME HERE"),
    // ADD A CARD DESCRIPTION
    describe: _.constant("!LOC:YOUR DESCRIPTION HERE."),
    // SET A PATH TO YOUR CHOSEN ICON
    // Replace PNG_FILE_NAME with the name of a picture from the PA install
    // folder, media/ui/main/game/galactic_war/gw_play/img/tech, for example
    // gwc_bot_combat.  The path can also point to a picture inside your own
    // mod, for example
    // "coui://ui/mods/com.pa.YOURNAME.MODNAME/img/my_icon.png"
    icon: _.constant(
      "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png"
    ),
    /* CHOOSE WHAT VOICE LINE TO USE ON DISCOVERY
     * Replace CHOSEN_LINE_HERE, further down, with one of these:
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
    // SET THE CHANCE OF THE CARD APPEARING
    // CHANGE THE 0 BELOW TO A NUMBER.  0 means that the game never offers the
    // card.  60 is a normal chance, and a bigger number means more often.
    //
    // The chance can also depend on what the player has, or on how far they
    // have travelled.  The README section "deal" shows how, with ready-made
    // checks such as gwoCard.conditionalDeal and gwoCard.upgradeDeal.
    //
    // You need the fourth value, rng, only if your card makes a random
    // choice.  See "Randomness in `deal`" in the README.  The chance itself
    // must never be random.
    // The next line stops the checker warning that the four values are not
    // used yet.  Leave it.
    // eslint-disable-next-line no-unused-vars
    deal: function (system, context, inventory, rng) {
      var chance = 0;
      return { chance: chance };
    },
    buff: function (inventory) {
      // ADD UNITS TO INVENTORY
      // Replace the three examples in the list with the units that your card
      // gives: a unit path in quotation marks, a GWO unit ID such as
      // gwoUnit.dox, or a GWO group ID such as gwoGroup.botsBasicMobile.
      // Delete the two lines below if your card unlocks no units.
      var units = ["UNIT_PATH", gwoUnit.dox, gwoGroup.botsBasicMobile];
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
      // Delete the two lines below if your card changes no unit stats.
      var mods = [];
      inventory.addMods(mods);

      // MODIFY WHAT YOUR SUB COMMANDERS BUILD
      // Most cards do not need this.  An example of the list contents.  It lets
      // basic bot factories build something that only advanced bot factories
      // could build before.  "MyUnit" must be replaced with a real to_build
      // name from the game's AI files - see "Change what your Sub Commanders
      // build" in the README:
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
      // FORBID UNITS
      // Most cards leave this list empty.  It is for the units that your card
      // forbids: the player cannot have them, even when another card gives
      // them.
      //
      // Each time the game works out the player's units, it runs the "buff" of
      // every card first, and then the "dull" of every card.  So a unit in
      // this list is gone whichever card gave it, this card included.  Never
      // list a unit that "ADD UNITS TO INVENTORY" above gives, or the player
      // never gets it.  This cannot undo a stat change or an AI change.
      //
      // An example of the list contents.  It stops the player from having the
      // Inferno:
      //   var units = [gwoUnit.inferno];
      // Leave the list empty if your card forbids no units.
      var units = [];
      inventory.removeUnits(units);
    },
  };
});
