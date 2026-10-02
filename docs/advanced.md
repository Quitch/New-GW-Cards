# Advanced features

**Who needs this page:** few mods. These features solve particular problems in `deal` and in
co-op wars. Most cards never need them.

## Setting your own distances — `gwoCard.farForSize`

If none of the three
[distance checks](deal.md#making-the-chance-depend-on-how-far-the-player-has-travelled)
suits your card, set your own limits with `farForSize`. The last value is a list of nine
distances, one for each galaxy size, from smallest to largest. The check is true when the
star is further from the start than the entry for the galaxy size in play. This example
card is at its best in the middle of the map:

```js
deal: function (system, context) {
  var chance = 33;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 166;
  } else if (
    gwoCard.farForSize(
      system,
      context,
      GW.balance.numberOfSystems,
      [2, 3, 5, 6, 7, 8, 9, 10, 11]
    )
  ) {
    chance = 333;
  }
  return { chance: chance };
},
```

## Randomness in `deal`

Most cards never need this. If your card makes a random choice when the game deals it,
use the fourth value that `deal` receives, `rng` (short for "random number generator"),
instead of `Math.random()`:

```js
deal: function (system, context, inventory, rng) {
  return { chance: 40, params: { unique: gwoCard.uniqueValue(rng) } };
},
```

GWO gives each card its own `rng`, and that `rng` comes from the war's seed. This is what
makes a war repeatable: the same war dealt again offers the same cards, and every player
in a co-op game sees the same cards. `Math.random()` has no link to the seed. A card that
used it would deal differently every time, and players in the same game would disagree
about what the game offered.

`rng` is **optional**. Some ways of dealing a card don't supply one, and `rng` is then
`undefined`. `gwoCard.uniqueValue(rng)` handles that for you. If you take a random value
yourself, fall back to another method when `rng` is missing:

```js
var pick = rng ? rng.pick(list) : _.sample(list);
```

> **Your `chance` must never be random.** Only `params` may be random. GWO asks every card
> in the deck for its chance several times, and keeps only one of the answers. A chance
> that changed between those questions would make the card's real likelihood depend on how
> many times the dealer asked. You cannot predict or balance that.

## Co-op games — `gwoCard.anyPlayerHasCard` and `gwoCard.getAllConnectedPlayerCards`

The `inventory` that your card receives belongs to the local player. In a co-op war every
player has their own hand, so a card that must react to the whole team has to look wider.
Two helpers do that:

- `gwoCard.anyPlayerHasCard(inventory, "some_card_id")`: true when the player _or_ any
  other co-op player in the game holds that card.
- `gwoCard.getAllConnectedPlayerCards(inventory)`: every card held by the player and the
  other co-op players in the game, as one list. Each entry has an `id`.

"The other co-op players" means the connected ones, and the host's AI players too, in a
war where every player has their own tech. See
[How co-op AI players choose your card](#how-co-op-ai-players-choose-your-card).

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.anyPlayerHasCard(inventory, "gwaio_enable_tsunami"),
    60
  );
},
```

Outside a co-op game they answer for the one player, so you can use them anywhere. GWO
uses them for things that the whole war shares, such as whether Tsunami Tech floods the
planets that everyone fights on. No GWO card needs them, so use `inventory.hasCard` first,
and use these two only when your card's effect really covers the whole team.

## How co-op AI players choose your card

The host of a co-op war can put AI players into the empty slots. In a war where every
player has their own tech, each AI player picks its own cards, and your cards are among
them.

An AI player judges a card by trying it. GWO copies the AI player's inventory, runs your
card's `buff` on the copy, and then every card's `dull`, and looks at what changed: the
units it unlocked, the unit stats it changed, what its Sub Commanders build, and the Sub
Commanders and card slots it added. It never reads your card's name or ID, so your card
is judged on what it does.

**So your `buff` runs even when nobody takes the card.** It must:

- **give the same result every time.** For the same inventory, it must make the same
  changes. If your card makes a random choice, make it in `deal`, as
  [Randomness in `deal`](#randomness-in-deal) shows, and read the result in `buff`.
- **be quick.** The AI player tries every card in its hand while the war waits. If that
  takes too long, or the judgement itself fails, GWO stops it. The AI player then takes the
  first card in the hand that is not a loadout, unjudged. If that card does not fit, the
  AI player takes nothing. An AI player that keeps running out of time stops taking cards for the rest of
  the session.
- **change only the `inventory` that it receives.** The copy is thrown away afterwards.
  Anything else that `buff` changes, such as the war, the page, or saved settings,
  changes for real, although nobody took the card.
- **never stop with an error.** A card whose `buff` fails is judged as a card that does
  nothing.

**A card that changes something other than units** is judged by its chance instead: an AI
player values it more the more often your `deal` offers it. That works only while the card
is not listed in `model.gwoCardsToUnits`. An AI player expects a card listed there to
change the units that it names, so it scores such a card that changes nothing it can see
as worth nothing, and never takes it. List that kind of card in
[`model.gwoCardsWithoutTooltip`](tech-cards.md#modelgwocardswithouttooltip--tech-cards-with-no-unit-tooltip-in-tech_cardsjs)
instead, as this guide already asks.

**A loadout that an AI player cannot use** belongs in
[`model.gwoLoadoutsAiCannotUse`](loadouts.md#modelgwoloadoutsaicannotuse--loadouts-that-a-co-op-ai-player-cannot-use-in-start_cardsjs),
so that an AI player never starts with it.

## `keep`, `discard` and `releaseContext` — rare parts

**You almost certainly don't want these.** They are left over from the way that PA's own
cards worked. No GWO card uses `keep` or `discard`, and under GWO they don't do what their
names say. This guide describes them only so that you recognise them in a card that you
copy from PA.

In PA, `keep` ran when the player kept a card, and `discard` ran when the player threw a
card away, which let a card change its own future chance. GWO replaces PA's dealing
completely, and as a result:

- **Nothing ever calls `discard`.** A card that depends on it does nothing, and reports
  nothing.
- **GWO calls `keep` every time it deals the card**, whether the player keeps it or not.
  It gives `keep` the result of your `deal`, which is the `{ chance: … }` that you
  returned, not PA's `params`.

So if you copy a PA card that uses either part, delete that part, and move its logic into
`deal`, where you can read the `inventory` and the `system` directly.

`releaseContext` is the one useful part of this group. If your card writes its own
`getContext` and must clean something up afterwards, GWO calls `releaseContext(context)`
after it has dealt the card:

```js
releaseContext: function (context) {
  // let go of anything getContext set up
},
```

---

[Contents](../README.md#contents)
