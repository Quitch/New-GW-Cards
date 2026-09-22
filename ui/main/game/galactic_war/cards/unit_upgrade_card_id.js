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
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/cards.js",
  "coui://ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js",
], function (gwoCard, gwoUnit) {
  // This is the shortest kind of card to write.  It improves ONE unit that the
  // player already has, and the game offers it only after the player has that
  // unit.  gwoCard.upgradeCard writes the rest of the card for you.  The card is
  // visible on the board, it gives the player room for one more card, and it
  // works out how often to offer itself.
  //
  // It cannot take units away again.  If your card gives units and must take them
  // back, use tech_card_id.js instead.
  return gwoCard.upgradeCard({
    // ADD A CARD NAME
    name: "!LOC:CARD NAME HERE",
    // ADD A CARD DESCRIPTION
    // The helper adds a line that tells the player about the extra card slot.
    description: "!LOC:YOUR DESCRIPTION HERE.",
    // SET A PATH TO YOUR CHOSEN ICON
    // This path can also point to a custom icon inside your own mod, for example
    // "coui://ui/mods/com.pa.YOURNAME.MODNAME/SOME_FOLDER/PNG_FILE_NAME.png"
    icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png",
    // CHOOSE WHAT VOICE LINE TO USE ON DISCOVERY
    // tech_card_id.js lists the lines that you can pick from.
    audio: "/VO/Computer/gw/CHOSEN_LINE_HERE",
    // SET THE UNIT THIS CARD IMPROVES
    // The game never offers the card until the player has this unit.
    requires: gwoUnit.dox,
    buff: function (inventory) {
      // MODIFY THE UNIT
      // An example.  It gives the Dox 50% more health, and it gives their weapon
      // more range.  Change it to what your card does.
      //
      // If a value that you write is the NAME OF ANOTHER FILE - a weapon, a build
      // arm, or something that spawns on death - it needs a second entry with
      // op: "tag" and no value.  Without that entry the other cards of the player
      // do not apply to what you added, and nothing warns you.  The README
      // section "Whenever your value is a file name, tag it" explains it.
      inventory.addMods(
        gwoCard
          .mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
          .concat(gwoCard.mods(gwoUnit.doxWeapon, "add", { max_range: 20 }))
      );
    },
    // You can add three more parts here.  The "gwoCard.upgradeCard" section of
    // the README explains all three: `unless` (do not offer this card to a player
    // who already holds some other card), `chance` (how often the game offers the
    // card), and `slot: false` (do not give the player an extra card slot).
  });
});
