/* This mod writes its start cards to its own localStorage key.  If the player
   removes the mod, the gw_start loadout list then keeps working, because it
   does not point at cards that have gone. */
define(function () {
  // SET THIS VARIABLE TO A VALUE THAT IS UNIQUE TO YOUR MOD
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
