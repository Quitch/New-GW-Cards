// AN EXAMPLE CARD THAT IMPROVES ONE UNIT
//
// The README explains every part of a card in plain English, with worked
// examples.  Keep it open beside this file.  Read "How to read the card files"
// in the README first if you have never edited a file like this before.
//
// 1. Rename this file.  The file name without ".js" is the ID of the card, for
//    example "mym_upgrade_dox_health.js" has the ID "mym_upgrade_dox_health".
//    Start it with a prefix of your own.  Never start it with "gwc_" or
//    "gwaio_", because a card with the same name as one of the game's or GWO's
//    replaces that card.
// 2. Change the parts marked in CAPITALS below.
// 3. Add the ID to tech_cards.js, in model.gwoCards and in
//    model.gwoCardsToUnits.  The game never deals a card that is not there.
//
// Do not change the define([ ... ]) block or the "function (...) {" line below
// it.  They load the tools that the card uses.
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
    // Keep the "!LOC:" at the start.  It lets the text be translated.
    name: "!LOC:CARD NAME HERE",
    // ADD A CARD DESCRIPTION
    // The helper adds a line that tells the player about the extra card slot.
    description: "!LOC:YOUR DESCRIPTION HERE.",
    // SET A PATH TO YOUR CHOSEN ICON
    // Replace PNG_FILE_NAME with the name of a picture from the PA install
    // folder, media/ui/main/game/galactic_war/gw_play/img/tech, for example
    // gwc_bot_combat.  The path can also point to a picture inside your own
    // mod, for example "coui://ui/mods/com.pa.YOURNAME.MODNAME/img/my_icon.png"
    icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png",
    // CHOOSE WHAT VOICE LINE TO USE ON DISCOVERY
    // Replace CHOSEN_LINE_HERE with one of the lines listed in tech_card_id.js,
    // for example board_tech_available_armor.
    audio: "/VO/Computer/gw/CHOSEN_LINE_HERE",
    // SET THE UNIT THIS CARD IMPROVES
    // The game never offers the card until the player has this unit.
    requires: gwoUnit.dox,
    buff: function (inventory) {
      // MODIFY THE UNIT
      // An example.  The first line gives the Dox 50% more health, and the
      // second gives its weapon 20 more range.  Change them to what your card
      // does, and delete any line that you do not need.
      //
      // If a value that you write is the NAME OF ANOTHER FILE - a weapon, a build
      // arm, or something that spawns on death - it needs a second entry with
      // op: "tag" and no value.  Without that entry the player's other cards
      // do not apply to what you added, and nothing warns you.  The README
      // section "Whenever your value is a file name, tag it" explains it.
      inventory.addMods(
        gwoCard.mods(gwoUnit.dox, "multiply", { max_health: 1.5 })
      );
      inventory.addMods(
        gwoCard.mods(gwoUnit.doxWeapon, "add", { max_range: 20 })
      );
    },
    // You can add three more parts here.  The "gwoCard.upgradeCard" section of
    // the README explains all three: `unless` (do not offer this card to a player
    // who already holds some other card), `chance` (how often the game offers the
    // card), and `slot: false` (do not give the player an extra card slot).
  });
});
