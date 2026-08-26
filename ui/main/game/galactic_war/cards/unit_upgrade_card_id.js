// Every part of a card is explained in plain English, with worked examples, in the
// "Feature reference" section of the README.  Keep it open beside this file.
//
// For examples of what fully implemented cards look like see the GWO repository
// https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards
//
// If this file and the README ever disagree with the game, GWO is the authority:
// its docs/tech-cards.md describes what a card may contain and what each part is
// handed, and its test/modder_api.test.js is what holds that steady.
define([
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  // This is the shortest kind of card to write.  It makes ONE unit the player
  // already has better, and it is only offered once they have that unit.
  // gwoCard.upgradeCard writes the rest of the card for you: the card is shown
  // on the board, it gives the player room for one more card, and it works out
  // how often to offer itself.
  //
  // It cannot take units away again.  If your card hands out units and needs to
  // take them back, use tech_card_id.js instead.
  return gwoCard.upgradeCard({
    // ADD A CARD NAME
    name: "!LOC:CARD NAME HERE",
    // ADD A CARD DESCRIPTION
    // A line telling the player the card also adds a card slot is added for you.
    description: "!LOC:YOUR DESCRIPTION HERE.",
    // SET A PATH TO YOUR CHOSEN ICON
    // this path can also be to a custom icon shipped with your mod e.g.
    // "coui://ui/mods/com.pa.YOURNAME.MODNAME/SOME_FOLDER/PNG_FILE_NAME.png"
    icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png",
    // CHOOSE WHAT VOICE LINE TO USE ON DISCOVERY
    // The lines you can pick from are listed in tech_card_id.js.
    audio: "/VO/Computer/gw/CHOSEN_LINE_HERE",
    // THE UNIT THIS CARD IMPROVES
    // The card is never offered until the player has this unit.
    requires: gwoUnit.dox,
    buff: function (inventory) {
      // MODIFY THE UNIT
      // An example, giving Dox 50% more health and their weapon a little more
      // range.  Change it to whatever your card does.
      //
      // If a value you write is the NAME OF ANOTHER FILE - a weapon, a build
      // arm, something spawned on death - it needs a second entry with
      // op: "tag" and no value, or the player's other cards will not apply to
      // what you added, and nothing will warn you.  The README section
      // "Whenever your value is a file name, tag it" walks through it.
      inventory.addMods(
        gwoCard
          .mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
          .concat(gwoCard.mods(gwoUnit.doxWeapon, "add", { max_range: 20 }))
      );
    },
    // Three more parts you can add here, all explained in the README's
    // "gwoCard.upgradeCard" section: `unless` (don't offer this card to a
    // player who already has some other card), `chance` (how often the card is
    // offered), and `slot: false` (don't give the player an extra card slot).
  });
});
