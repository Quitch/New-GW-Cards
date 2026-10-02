# Loadouts

**Who needs this page:** only mods that add loadouts.

A loadout is the starting hand that a player picks before a war begins. Start from the
example `start_card_id.js`.

## Loadout IDs

A loadout ID follows the rules for any card ID in
[Naming and registering your card](tech-cards.md#naming-and-registering-your-card): a
prefix of your own, and never `gwc_` or `gwaio_` at the start. It has two more rules, and
a mistake in either one reports nothing. The ID must contain `_start_`, because that is
how the game recognises a loadout at all. And the ID must **not** start with `gwc_start`,
because that prefix belongs to the game's own loadouts. Write your prefix, then `_start_`,
then a name, as the existing mods do: `gwaio_start_ceo`, `nem_start_nuke`. Write
`mym_start_engineer`, not `gwc_start_engineer`.

A mistake here is hard to spot. An ID without `_start_` still appears on the loadout
screen, and the player can still pick it, so the mod looks fine. The damage is inside
the war: GWO handles the card as ordinary tech, so a copy that the player wins on a
Guardian planet is never recorded in your bank, and a locked loadout never unlocks. The
game treats an ID that starts with `gwc_start` as one of its own, so it writes the
unlock into the game's storage instead of into your bank. That record stays behind
after the player removes your mod, and it points at a card that no longer exists.

## `model.gwoNewStartCards` — locked loadouts (in `start_cards.js`)

These are the loadouts that the player must earn before using them. They appear grey on
the loadout screen, and the game can award them as rewards on Guardian planets. Add one
entry for each loadout, with its ID.

```js
if (!model.gwoNewStartCards) {
  model.gwoNewStartCards = [];
}
model.gwoNewStartCards.push({ id: "mym_start_myloadout" });
```

## `model.gwoStartingCards` — unlocked loadouts (in `start_cards.js`)

These are the loadouts that are available from the start. The shape is the same as above.

```js
if (!model.gwoStartingCards) {
  model.gwoStartingCards = [];
}
model.gwoStartingCards.push({ id: "mym_start_myloadout" });
```

> **Don't add a loadout to both the locked list and the unlocked list.**
>
> **Every ID in these two lists must have a card file with exactly that name.** If one
> does not, the debugger shows `Start card failed to load:` followed by the ID, and that
> loadout cannot be used. A player who picks it gets an error message in place of a new
> war.
>
> The template's lists start empty, with example IDs in the comments above them. A mod
> with no loadouts works correctly.

## Loadouts and `gwoCard.loadout`

A loadout has more to do than a tech card. It must give the player the game's standard
starting units as well as its own. It must notice when the same loadout turns up again
later in the war, and give a card slot instead of the units a second time. And when a
player wins a copy of it on a Guardian planet, it must record that in your bank, so that
the loadout unlocks.

`gwoCard.loadout` does all of that. Give it your card and the four things below, and it
gives back the card's `buff` and `dull`:

```js
var loadout = gwoCard.loadout(CARD, {
  bank: myBank,
  start: GWCStart,
  apply: function (inventory) {
    inventory.addUnits([gwoUnit.dox, gwoGroup.botsBasicMobile]);
  },
  dulls: [gwoUnit.inferno],
});
```

- `bank`: your mod's bank, which the card lists at the top of the file. See
  [The bank and `LS_KEY`](#the-bank-and-ls_key--remembering-unlocked-loadouts).
- `start`: `GWCStart`, the game's standard starting units. Leave this as it is.
- `apply`: what your loadout gives the player. Write it exactly as you would write a tech
  card's [`buff`](tech-cards.md#buff--what-the-card-does). Leave it out if your loadout
  adds nothing to the standard start.
- `dulls`: the units that your loadout forbids for the whole war. The player never has
  them, even when the standard start or a later card gives them. The example above forbids
  the Inferno. Give a list, or a function that receives the inventory and returns a list.
  Never list a unit that `apply` gives, or the player never gets it. Leave `dulls` out if
  your loadout forbids no units, as most loadouts do.

Then use what it gives you as the card's `buff` and `dull`:

```js
buff: loadout.buff,
dull: loadout.dull,
```

The example `start_card_id.js` is already written this way, so you fill in only the four
parts above.

### `hint` — the locked message (loadouts)

The loadout screen shows this while the loadout is still locked, with the
locked-commander picture. `gwoCard.lockedHint` supplies the picture, so you write only the
text.

```js
hint: gwoCard.lockedHint(
  "!LOC:I could be the loadout name or a hint about what this loadout does."
),
```

### `icon` — the medal picture

The example loadout's `icon` uses `gwoCard.loadoutIcon(CARD.id)`, which
shows the medal for the hardest war that the player has won with that loadout. Before
their first win it shows a red commander. Leave that line as it is, unless your loadout
must always show one fixed picture.

### `deal` — always `gwoCard.startCard`

**Loadouts don't use a chance.** The game grants a loadout only when the player picks it on
the loadout screen. A loadout's `deal` is always:

```js
deal: gwoCard.startCard,
```

## The bank and `LS_KEY` — remembering unlocked loadouts

Locked loadouts, the ones that you list in `model.gwoNewStartCards`, need somewhere to
record that the player has unlocked them. `bank.js` is that place. It saves the list in
the game's storage on the player's computer, under a name called `LS_KEY`.

Set `LS_KEY` in your `bank.js` to a value that is unique to your mod, so that it never
clashes with another mod's storage:

```js
var LS_KEY = "myname_mymod_bank";
```

Your loadout cards connect to this bank in three places. The example `start_card_id.js`
already contains the first two, and `start_cards.js` contains the third:

1. At the top of the loadout card, the `define([` block lists your `bank.js` so that the
   card can use it. **Change the identifier in this address to yours:**

   ```js
   "coui://ui/mods/<your identifier>/bank.js",
   ```

2. The card hands that bank to `gwoCard.loadout` as `bank`. When the player earns the
   loadout, it is recorded there:

   ```js
   bank: myBank,
   ```

3. `start_cards.js` tells GWO where the bank is, through
   [`model.gwoLoadoutBanks`](#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs).
   If you miss this step, the loadout stays locked forever.

The loadout screen then reads your bank, with the same `LS_KEY`, to decide whether to show
your loadout as unlocked. Having your own key has two benefits. If the player removes your
mod later, PA's built-in loadout list does not point at missing cards. And the player's
unlocks leave with the mod, instead of staying behind in another mod's storage.

A loadout reaches your bank in two ways. If the player wins a loadout on a Guardian
planet, GWO writes it to the bank itself. Your card's code does not run in that case,
which is why GWO needs the address above. The `bank` that you give to `gwoCard.loadout`
covers the other way.

Your bank also keeps PA's "loadouts unlocked" statistic up to date. `bank.js` already
does that, and there is nothing for you to do.

### `model.gwoLoadoutBanks` — where your bank lives (in `start_cards.js`)

Your own `bank.js` records which of your locked loadouts the player has unlocked. GWO
cannot find that file without help, so you give it the address. **Without this entry a
locked loadout can never unlock**, and nothing warns you.

```js
if (!model.gwoLoadoutBanks) {
  model.gwoLoadoutBanks = [];
}
model.gwoLoadoutBanks.push({
  prefix: "mym_start_",
  path: "coui://ui/mods/<your identifier>/bank.js",
});
```

`prefix` is the first part of every loadout ID in your mod. When the player earns one of
your loadouts, GWO uses the prefix to recognise it as yours, and then writes it to your
bank instead of its own. The prefix must match the start of the loadout IDs that you
chose.

`path` is the address of your `bank.js`. Like every other address in the mod, it contains
your identifier.

You give the address, not the file itself, because GWO builds the loadout list before the
game loads any of your mod's files. An address that GWO can read when it is ready is the
only way for it to reach your bank in time.

## Rarely needed

### `model.gwoStarCardsWhichBreakAllies` — loadouts that disable the ally (in `start_cards.js`)

Optional. In GWO the player can fight beside an allied commander. List your loadout's ID
here if its effect would break that feature. When the player picks that loadout, GWO
turns the allied commander off.

```js
if (!model.gwoStarCardsWhichBreakAllies) {
  model.gwoStarCardsWhichBreakAllies = [];
}
model.gwoStarCardsWhichBreakAllies.push("mym_start_myloadout");
```

### `model.gwoLoadoutsAiCannotUse` — loadouts that a co-op AI player cannot use (in `start_cards.js`)

Optional. An AI player in a co-op war can start with one of your loadouts. List your
loadout's ID here if an AI player cannot use its effect, for example an ability that
works only when a player gives an order. GWO lists its own Warp Commander, because an AI
player never orders a mass teleport. An AI player never starts with a loadout on this
list.

```js
if (!model.gwoLoadoutsAiCannotUse) {
  model.gwoLoadoutsAiCannotUse = [];
}
model.gwoLoadoutsAiCannotUse.push("mym_start_myloadout");
```

---

[Contents](../README.md#contents)
