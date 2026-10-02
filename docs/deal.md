# `deal` — how often the card appears

**Who needs this page:** every tech card that is not made with `gwoCard.upgradeCard`.

`deal` gives back ("returns") a **chance** number. A larger number makes the game offer
the card more often, and `0` means never. As a rough guide, from GWO's own cards: below 30
is a low chance, 30 to 70 is a normal chance, and above 120 is high.

The simplest form always uses the same chance. Change `60` to the number that you want:

```js
deal: function () {
  return { chance: 60 };
},
```

The chance can also depend on the situation. The game gives `deal` three things to look
at, which it calls `system` (the star that the player is at), `context` (the galaxy), and
`inventory` (the player's cards and units). GWO supplies checks that use them:

- `gwoCard.hasUnit(inventory.units(), X)`: true if the player has **any** of unit(s) X.
- `gwoCard.hasAllUnits(inventory.units(), X)`: true if the player has **all** of unit(s)
  X.
- `gwoCard.missingUnit(inventory.units(), X)`: true if the player is missing **any** of
  unit(s) X.
- `gwoCard.missingAllUnits(inventory.units(), X)`: true if the player is missing **all**
  of unit(s) X.
- `gwoCard.fieldedUnits(inventory)`: use it in place of `inventory.units()` to include the
  race or add-on units that the player fields. See
  [Cards for another race or an add-on](race-cards.md).
- `context.totalSize`: the size of the galaxy (how many stars it has).
- `system.distance()`: how far the current star is from the start.

In this example, the chance is 25, but it becomes 120 when the player has the Dox. The
`if (...) { ... }` means "if this is true, do what is inside the curly brackets":

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (gwoCard.hasUnit(inventory.units(), gwoUnit.dox)) {
    chance = 120;
  }
  return { chance: chance };
},
```

`!` in front of a check reverses it ("not"), `&&` means "and", and `||` means "or".

## Making the chance depend on how far the player has travelled

Distance is the usual way to hold a card back until later in a war. But a plain
`system.distance()` means different things in different galaxies: five jumps is the far
edge of a small galaxy, and barely a start in a very large one. GWO adjusts for that with
three ready-made checks. Each is true after the player has travelled far enough **for the
size of galaxy that they are playing**, so a card that uses them behaves the same at every
galaxy size:

- `gwoCard.travelledShort(system, context, GW.balance.numberOfSystems)`: past the nearby
  stars (further out than roughly 55% of the galaxy's stars).
- `gwoCard.travelledModerate(system, context, GW.balance.numberOfSystems)`: well out from
  the start (further out than roughly 70% of the galaxy's stars).
- `gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)`: deep into the
  galaxy (further out than roughly 82% of the galaxy's stars).

Copy all three values in the brackets exactly as written. `GW.balance.numberOfSystems`
comes from the `"shared/gw_common"` line that is already at the top of the example tech
card.

```js
deal: function (system, context) {
  var chance = 30;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 140;
  }
  return { chance: chance };
},
```

You can combine any of these checks. You can also increase or reduce the chance instead of
replacing it. `chance *= 3` multiplies the chance by three:

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (
    gwoCard.travelledFar(system, context, GW.balance.numberOfSystems) &&
    gwoCard.hasUnit(inventory.units(), gwoUnit.boom) &&
    gwoCard.missingUnit(inventory.units(), gwoGroup.botsBasicMobile)
  ) {
    chance = 200;
  }
  if (!gwoCard.hasUnit(inventory.units(), gwoGroup.factoriesAdvanced)) {
    chance *= 3;
  }
  return { chance: chance };
},
```

For a card that is at its best in the middle of the map rather than at the edge, see
[Setting your own distances](advanced.md#setting-your-own-distances--gwocardfarforsize).

## Upgrade cards — `gwoCard.upgradeDeal`

An **upgrade card** improves something that the player already owns, and gives them one
more card slot in return. Because it pays for its own place in the hand, the game must
offer it even when the hand is full. Every upgrade card in GWO uses one helper that does
this, and your card must use it too:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced)
  );
},
```

Give it a true-or-false answer to the question "does the player have the thing that this
card upgrades?". When the answer is true, the game offers the card with a chance of 60.
When it is false, the chance is 0, so the game never offers an upgrade for something that
the player cannot use. To use a different chance, add it as a second value:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced),
    90
  );
},
```

A card dealt in this way must give the extra slot itself, as the first line of its `buff`:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

If your upgrade card improves just one unit,
[`gwoCard.upgradeCard`](tech-cards.md#a-shortcut-for-a-card-that-improves-one-unit--gwocardupgradecard)
does all of this for you.

## Cards that need something first — `gwoCard.conditionalDeal`

`gwoCard.conditionalDeal` is the same idea without the card slot. Give it a true-or-false
answer and a chance. It returns that chance when the answer is true, and `0` when it is
false, so the card stays out of the deck until the player can use it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    70
  );
},
```

## Cards that react to the player's other cards

`inventory.hasCard("some_card_id")` is true when the player holds that card. Use it to
build on another card, or to stay away from it. Here the card is offered only to a player
who does **not** hold `gwc_start_orbital`:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(!inventory.hasCard("gwc_start_orbital"), 60);
},
```

`gwoCard.hasT2Access(inventory)` is true once the player holds any card listed in
[`model.gwoCardsGrantingAdvancedTech`](#modelgwocardsgrantingadvancedtech--cards-that-unlock-advanced-tech-in-tech_cardsjs),
which means that they can build advanced (T2) units.
`gwoCard.hasAdvancedFabber(inventory)` is true when the player holds an advanced
fabricator from `gwoGroup.fabbersAdvanced`. A Cluster player's Colonel does not count,
because Cluster makes it a Sub Commander that builds only what a commander builds. A
player can reach advanced structures either way, so a card that is useless before then
asks both:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.missingUnit(
      inventory.units(),
      gwoGroup.structuresDefencesAdvanced
    ) &&
      (gwoCard.hasAdvancedFabber(inventory) ||
        gwoCard.hasT2Access(inventory)),
    100
  );
},
```

### `model.gwoCardsGrantingAdvancedTech` — cards that unlock advanced tech (in `tech_cards.js`)

Optional. Some cards ask, through
[`gwoCard.hasT2Access`](#cards-that-react-to-the-players-other-cards), whether the player
has reached advanced (T2) tech. If one of your cards gives that access, add its ID here so
that those cards can see it. GWO's Advanced Defense Technology, Titan Tech, and Planetary
Radar Tech take an advanced fabricator or any card on this list as that access. Titan
Tech also takes an orbital factory together with an orbital fabricator.

```js
if (!model.gwoCardsGrantingAdvancedTech) {
  model.gwoCardsGrantingAdvancedTech = [];
}
model.gwoCardsGrantingAdvancedTech.push("mym_enable_mybots_all");
```

## Ready-made weights

GWO weighs some families of card in a standard way. Use the helper for your card's family,
so that it is offered as often as GWO's own cards of that family.

### Naval cards — `gwoCard.navalWeight`

A player who owns ships cannot always use them, because most generated systems have
little water or none. Only two cards flood every planet that the player fights on: the
naval loadout and Tsunami Tech. `gwoCard.navalWeight` weighs a naval card by whether the
player holds one of them. Give it the `inventory` and the chance that you want when there
is water to fight on. If the player holds neither card, it returns 40% of that chance
instead, so the game offers your card less often but does not hold it back completely:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    gwoCard.navalWeight(inventory, 70)
  );
},
```

Every naval tech card in GWO has that shape. `navalWeight` judges what the map is likely
to be worth, and `conditionalDeal` keeps the card out of the deck until the player can
build ships at all.

If your card is worthless without water, not merely weaker, add a third number. It
replaces the 40% default with a dry-map chance of your own. GWO's Anti-Ship and
Anti-Hover Ammo Techs go from 40 to 15 in this way:

```js
gwoCard.navalWeight(inventory, 40, 15);
```

### Commander cards — `gwoCard.commanderWeight`

Your own commander and every Sub Commander come from the same unit file, so a card that
changes commander stats improves all of them together. Such a card is worth more the more
Sub Commanders the player has, whatever the distance travelled, and
`gwoCard.commanderWeight` weighs it in that way. Give it the `inventory` and the chance
that you want when the player fights alone. Each Sub Commander adds one third of that
chance, rounded to a whole number, up to a maximum of double the chance. A Cluster player
always gets the chance that you gave, because Cluster's Sub Commanders are not
commanders:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.commanderWeight(inventory, 70) };
},
```

Both values are required: unlike `upgradeDeal`, this helper has no default chance. Use it
instead of the distance checks above, not together with them.

If your commander card also gives a card slot, give the weight to
[`upgradeDeal`](#upgrade-cards--gwocardupgradedeal) as its chance. Every player has a
commander, so the first value is `true`:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(true, gwoCard.commanderWeight(inventory, 35));
},
```

`upgradeDeal` lets the game offer the card to a player whose hand is full, because the
card pays for its own slot. The card's `buff` must still add the slot.

### Sub Commander cards — `gwoCard.subcommanderWeight`

Some cards improve only the player's Sub Commanders, and leave the player's own commander
unchanged. Such a card has no value until the player recruits a Sub Commander, and
`gwoCard.subcommanderWeight` is the helper for it. Give it the `inventory` and the chance
that you want:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.subcommanderWeight(inventory, 55) };
},
```

With no Sub Commander the chance is `0`, so the card stays out of the deck. With one Sub
Commander the game offers the card at the full chance that you gave. Each further Sub
Commander adds one third of that chance, up to a limit of 90, so that a large retinue
cannot flood the deck. The limit applies from the first Sub Commander, so a chance above
90 is pointless: the helper reduces it to 90.

Both values are required. Use this helper instead of the distance checks, as for
`commanderWeight`. If your card also gives a card slot, give the weight to `upgradeDeal`
with `true` as its first value, as shown above.

To choose between the two helpers, ask who the card changes. Use `commanderWeight` for a
card that improves every commander that the player fields, including their own. Use
`subcommanderWeight` for a card that helps only their Sub Commanders.

### Counter-tech cards — `gwoCard.antiTechDeal`

GWO has a family of "anti" ammo techs: Anti-Air, Anti-Ship, Anti-Bots, and others. Each
one doubles your damage against one kind of target and reduces it against another.
`gwoCard.antiTechDeal` is the `deal` that they share. Give it the `inventory`, the chance
that you want, and the ID of the card that is the opposite of yours:

```js
deal: function (system, context, inventory) {
  return gwoCard.antiTechDeal(inventory, 70, "gwaio_anti_sea");
},
```

The chance falls to `0` when the player already holds the opposite card, so that a pair
can never cancel each other out. The chance also halves once the player holds any
`gwaio_anti_` card, so that the deck stops pushing the theme on a player who already has
it. Only IDs that start with `gwaio_anti_` count, which in practice means GWO's own cards,
not yours. Don't give your card a `gwaio_` ID to make it count: when an ID matches one of
GWO's, the game silently ignores one of the two cards, and normally that is yours.

---

[Contents](../README.md#contents)
