/* YOUR LOADOUT BANK

   This file remembers which of your locked loadouts the player has unlocked.
   It saves them in the game's storage on the player's computer, under the
   name in LS_KEY below.  Because your mod keeps its own record, removing the
   mod later does not break the game's loadout screen.

   If your mod has no loadouts, you do not need to change this file.

   CHANGE ONLY LS_KEY.  Everything below it makes the bank work.  Leave it
   alone.  See "The bank and LS_KEY" in the README. */
define(function () {
  // SET THIS TO A VALUE THAT IS UNIQUE TO YOUR MOD, for example
  // "yourname_modname_bank".  Keep the quotation marks.
  var LS_KEY = "your_mod_id";

  var self;

  var loading = false;

  var bank = function () {
    self = this;

    self.startCards = ko.observableArray();
    self.startCards.subscribe(function (value) {
      self.save();

      var unlocked = value.length;

      if (!unlocked) {
        return;
      }

      api.tally.getStatInt("gw_unlocked_loadouts").then(function (stat) {
        if (stat < unlocked) {
          api.tally.setStatInt("gw_unlocked_loadouts", unlocked);
        }
      });
    });

    self.load();
  };

  bank.prototype = {
    load: function () {
      loading = true;
      var bankJson = localStorage[LS_KEY];
      if (!_.isString(bankJson)) {
        self.startCards([]);
        loading = false;
        return;
      }

      var config = JSON.parse(bankJson);
      self.startCards(config.startCards);
      loading = false;
    },

    save: function () {
      if (loading) {
        return;
      }
      localStorage.setItem(LS_KEY, ko.toJSON(self));
    },

    addStartCard: function (card) {
      if (self.hasStartCard(card)) {
        return false;
      }
      self.startCards.push(card);
      return true;
    },
    hasStartCard: function (card) {
      return _.some(self.startCards(), function (element) {
        return card === element || (_.isObject(card) && card.id === element.id);
      });
    },
  };

  return new bank();
});
