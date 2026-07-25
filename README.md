# New Galactic War Cards

A mod template for people who want to add new loadouts and tech cards to the Galactic
War in Planetary Annihilation: TITANS (PA). It requires the
[Galactic War Overhaul](https://github.com/Quitch/GW-AI-Overhaul) (GWO) mod to be
installed, because your cards plug into GWO.

You do **not** need to know how to program to use this template. You will be editing a
few text files by copying the examples shown here and changing the labelled parts. This
guide assumes you know Planetary Annihilation but nothing about coding or about Galactic
War Overhaul.

## Contents

1. [What this template does](#what-this-template-does)
2. [Requirements](#requirements)
3. [Preparing the mod](#preparing-the-mod)
4. [Understanding the pieces](#understanding-the-pieces)
5. [Creating a card](#creating-a-card)
6. [Feature reference](#feature-reference)
7. [Minimum required changes](#minimum-required-changes)
8. [Testing your mod](#testing-your-mod)
9. [Releasing your mod](#releasing-your-mod)

## What this template does

Galactic War has two kinds of cards:

- **Loadouts** (also called _start cards_) — the starting hand you pick before a war
  begins. Some are available immediately, others are locked until you earn them.
- **Tech cards** — the upgrades you are offered as you fight your way across the galaxy.
  They can unlock units, change unit stats, and change how the AI subcommanders build.

This template gives you a ready-made mod folder with working examples of both. You copy
the folder, rename it, and fill in the blanks.

> **Note:** Galactic War does not support server mods. That means you can only use and
> modify units that ship with the game (including the Titans expansion) — you cannot add
> brand-new custom units, or use units from other server mods, in a Galactic War card.

## Requirements

You will be editing text files. Any plain-text editor works, but a code editor such as
[Visual Studio Code](https://code.visualstudio.com/) is recommended because it colours
the text and highlights mistakes.

For testing you will need the
[Coherent UI Debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip).
This is a free tool that lets you see what the game's menus are doing. To let it connect
to PA, add `--coherent_port=9999` to your Steam launch options for the game.

## Preparing the mod

1. Find your [PA data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176)
   and open the `client_mods` folder inside it. If that folder does not exist, create it.
2. Copy the `my_card_mod` folder from this template into `client_mods`. Rename it to
   something of your choice. From here on, this renamed folder is the root of your mod.
3. Open `modinfo.json` (in your mod's root folder) and fill in these entries:
   - `identifier` — a unique name for your mod, using the style
     `com.pa.yourname.modname`.
   - `display_name` — the name players see in the mod list.
   - `description` — a short summary of what your mod adds.
   - `author` — your name.
   - `scenes` — the three web addresses listed here (one under `gw_start`, two under
     `gw_play`) each contain your identifier. Change that part so it matches the
     `identifier` you chose above.
4. Inside your mod, open the `ui/mods/` folder. Rename the folder found there (currently
   `com.pa.YOURNAME.MODNAME`) so its name exactly matches your `identifier`.

> **Keep three things in step:** the `identifier` in `modinfo.json`, the `scenes` web
> addresses in that same file, and the folder name under `ui/mods/` must all use the same
> identifier. If they disagree, the game silently loads nothing.

## Understanding the pieces

Inside `my_card_mod` there are two important areas.

**The cards themselves** live in `ui/main/game/galactic_war/cards/`. Each card is one
file. The template ships two examples:

- `tech_card_id.js` — an example tech card.
- `start_card_id.js` — an example loadout (start card).

**The loader files** live in `ui/mods/<your identifier>/`. These are the files that tell
Galactic War Overhaul about your cards. When Galactic War loads, it reads these and adds
your cards to the game:

- `tech_cards.js` — lists your tech cards and their tooltips.
- `start_cards.js` — lists your loadouts.
- `specs.js` — lists any extra unit files you want to change.
- `bank.js` — remembers which of your locked loadouts the player has unlocked.

The [Feature reference](#feature-reference) below explains exactly what to put in each
file, with examples.

## Creating a card

There are two ways to start a new card. Whichever you choose, you then fill in the card's
parts using the [Feature reference](#feature-reference) below. A short comment inside the
example card files labels each part; the Feature reference is where each one is explained
in full.

### Option 1: start from the template's example cards (recommended)

The template already includes two ready-made cards in your mod's
`ui/main/game/galactic_war/cards` folder, so you do not have to copy anything:

- `tech_card_id.js` — an example tech card.
- `start_card_id.js` — an example loadout (start card).

Each one is a complete card with every part already in place, filled with a placeholder
and labelled by a comment right next to it. Just pick the one you need and rename it (see
below).

### Option 2: copy an existing card

If you would rather begin from a card that already does something close to what you want,
copy one of PA's own cards from
`{PA_INSTALL_DIRECTORY}/media/ui/main/game/galactic_war/cards`, or one of Galactic War
Overhaul's cards from its
[cards folder on GitHub](https://github.com/Quitch/GW-AI-Overhaul/tree/master/ui/main/game/galactic_war/cards),
and put your copy in your mod's `ui/main/game/galactic_war/cards` folder.

### Then, whichever option you chose

1. Give the file a unique name. A common style is `ACRONYM_EFFECT_UNITTYPE.js`, for
   example `gwc_damage_bots.js`. **Remember the name without the `.js`** — this is the
   card's ID, and you will use it in the loader files.
2. Change the parts of the card to do what you want, using the
   [Feature reference](#feature-reference).
3. Tell Galactic War Overhaul about the card by adding its ID to `tech_cards.js` (for a
   tech card) or `start_cards.js` (for a loadout).

## Feature reference

This section explains every feature you can use, with a worked example of each. Copy the
shape shown and change the labelled parts.

Two shorthands you will see everywhere:

- A **GWO unit ID** or **GWO group ID** is a nickname Galactic War Overhaul provides so
  you don't have to type a full file path, for example `gwoUnit.dox` (a single unit) or
  `gwoGroup.botsBasicMobile` (a whole family of units). These include ammos and weapons.
  The full lists are here:
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  and
  [group IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/unit_groups.js).
- A **unit path** is where a unit's file lives, written as
  `/pa/units/SOME_LAYER/SOME_UNIT/SOME_UNIT.json`. Titans (expansion) units live under
  `/pa_ex1/` in the game files, but the game mounts them into `/pa/`, so always write them
  with a `/pa/` path, never `/pa_ex1/`.

> **Prefer GWO unit and group IDs over paths.** Whenever a GWO ID exists for the unit you
> want, use it instead of a path: the IDs are kept up to date by Galactic War Overhaul,
> they spare you path mistakes (such as the `/pa_ex1/` trap above), and they make your
> card easier to read. Only fall back to a raw path when no GWO ID exists for the unit.

### The lists that tell GWO about your cards

Galactic War Overhaul keeps several lists that you add your cards to. Each list has a name
beginning with `model.gwo`, and the heading for each one below tells you which file to add
it in.

#### `model.gwoCards` — your tech-card deck (in `tech_cards.js`)

The master list of tech cards that can be dealt during a war. Add each tech card's ID
(its file name without `.js`).

```js
model.gwoCards.push("gwc_damage_bots", "gwc_faster_air");
```

#### `model.gwoCardsToUnits` — tech-card tooltips (in `tech_cards.js`)

Links a tech card to the units it affects, so the card's tooltip can list them. Add one
entry per card: its ID, and the units it changes (as unit paths or GWO unit/group IDs).
Always use the unit itself, not its ammo or weapon file, regardless of what the card
touches.

```js
model.gwoCardsToUnits.push({
  id: "gwc_damage_bots",
  units: ["/pa/units/land/assault_bot/assault_bot.json", gwoUnit.dox],
});
```

#### `model.gwoCardsWithoutTooltip` — tech cards with no unit tooltip (in `tech_cards.js`)

A tech card that does **not** change units (for example one that only switches a feature
on) should be listed here **instead of** in `model.gwoCardsToUnits`. If you don't,
Galactic War Overhaul warns that the card is missing its tooltip data. Add the card's ID.

```js
if (!model.gwoCardsWithoutTooltip) {
  model.gwoCardsWithoutTooltip = [];
}
model.gwoCardsWithoutTooltip.push("gwc_enable_bounties");
```

#### `model.gwoCardsGrantingAdvancedTech` — cards that unlock advanced tech (in `tech_cards.js`)

Cards ask this list whether the player has reached advanced (T2) tech yet, through
[`gwoCard.hasT2Access`](#cards-that-react-to-the-players-other-cards). If one of your cards
is what grants that access, add its ID here so those cards can see it. Add the card's ID.

```js
if (!model.gwoCardsGrantingAdvancedTech) {
  model.gwoCardsGrantingAdvancedTech = [];
}
model.gwoCardsGrantingAdvancedTech.push("gwc_enable_mybots_all");
```

#### `model.gwoNewStartCards` — locked loadouts (in `start_cards.js`)

Loadouts the player must earn before they can use them. They appear greyed-out on the
loadout screen and can be handed out as rewards on Guardian planets. Add one entry per
loadout, giving its ID.

```js
model.gwoNewStartCards.push({ id: "gwc_start_myloadout" });
```

#### `model.gwoStartingCards` — unlocked loadouts (in `start_cards.js`)

Loadouts available from the very start. Same shape as above.

```js
model.gwoStartingCards.push({ id: "gwc_start_myloadout" });
```

#### `model.gwoStarCardsWhichBreakAllies` — loadouts that disable the ally (in `start_cards.js`)

If your loadout's effect would break the allied-commander feature, list its ID here.
When the player picks that loadout, Galactic War Overhaul turns the allied commander off.

Unlike the other lists, Galactic War Overhaul does **not** create this one for you, so you
must create it before adding to it (as shown).

```js
if (!model.gwoStarCardsWhichBreakAllies) {
  model.gwoStarCardsWhichBreakAllies = [];
}
model.gwoStarCardsWhichBreakAllies.push("gwc_start_myloadout");
```

#### `model.gwoSpecs` — extra unit files to change (in `specs.js`)

Some unit files are not used by the game normally (for example Ares' stomp). If you want
to change one of those, list its path here so Galactic War Overhaul loads it. Add the
path(s).

```js
model.gwoSpecs.push(gwoUnit.aresStomp, gwoUnit.aresStompAmmo);
```

### What a card is made of

Each card file is a set of named parts. You will recognise them by name inside the card
file. Some parts are used by every card; a few are only used by loadouts or only by tech
cards.

| Part         | Used by    | What it does                                                                                                                     |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `visible`    | all        | Whether the player can see and discard the card on the board. Tech cards are usually visible; loadouts and hidden cards are not. |
| `summarize`  | all        | The card's name.                                                                                                                 |
| `describe`   | all        | The card's description text.                                                                                                     |
| `icon`       | all        | The card's picture.                                                                                                              |
| `deal`       | all        | How likely the card is to be offered. See below.                                                                                 |
| `buff`       | all        | What the card actually does. See below.                                                                                          |
| `dull`       | all        | Cleanup, run after every card's `buff`. Usually removes units.                                                                   |
| `audio`      | tech cards | The voice line played when the card is discovered.                                                                               |
| `getContext` | tech cards | Gives the `deal` part information about the galaxy. Use `gwoCard.getContext`.                                                    |
| `hint`       | loadouts   | The picture and text shown while the loadout is still locked.                                                                    |
| `keep`       | rare       | Adjusts the card's chance when the player keeps it.                                                                              |
| `discard`    | rare       | Adjusts the card's chance when the player discards it.                                                                           |

#### `summarize`, `describe`, `icon` — name, description, picture

`summarize` is the name, `describe` is the description, `icon` is the picture. Text that
players read is written with a `!LOC:` prefix so it can be translated.

```js
summarize: _.constant("!LOC:Bot Damage"),
describe: _.constant("!LOC:Increases the damage of your basic bots."),
icon: _.constant(
  "coui://ui/main/game/galactic_war/gw_play/img/tech/PNG_FILE_NAME.png"
),
```

The picture can be one of PA's existing tech icons (as above) or an image you ship inside
your own mod, for example
`coui://ui/mods/<your identifier>/SOME_FOLDER/PNG_FILE_NAME.png`.

The example loadout does something different: its `icon` calls
`gwoCard.loadoutIcon(CARD.id)`, which shows the medal for the hardest difficulty the
player has ever won a war with using that loadout, and a red commander until they win
their first. Leave that line as it is unless you want your loadout to always show one
fixed picture.

#### `visible` — whether the card is shown

`_.constant(true)` means the player can see and discard the card (normal for tech cards);
`_.constant(false)` hides it (normal for loadouts).

```js
visible: _.constant(true),
```

#### `audio` — the discovery voice line (tech cards)

The voice line played when the card is found. Choose one of the lines listed in the
example `tech_card_id.js` file, such as `board_tech_available_bot`.

```js
audio: _.constant({ found: "/VO/Computer/gw/board_tech_available_bot" }),
```

#### `getContext` — galaxy information (tech cards)

Provides the galaxy size to the `deal` part. Nearly all tech cards use the standard one:

```js
getContext: gwoCard.getContext,
```

#### `hint` — the locked message (loadouts)

Shown on the loadout screen while the loadout is still locked: a picture and a line of
text.

```js
hint: _.constant({
  icon: "coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png",
  description: "!LOC:I could be the loadout name or a hint about what this loadout does.",
}),
```

#### `deal` — how often the card appears

`deal` returns a **chance** number. The bigger the number, the more likely the card is
offered. `0` means never. As a rough guide, going by the chances Galactic War Overhaul's
own cards use: under 30 is a low chance, 30–70 is a normal starting chance, and anything
over 120 is high.

The simplest version always uses the same chance:

```js
deal: function () {
  return { chance: 60 };
},
```

You can make the chance depend on the situation. The `deal` part is given the current
`system`, some galaxy `context`, and the player's `inventory`, and Galactic War Overhaul
gives you helpers to check them:

- `gwoCard.hasUnit(inventory.units(), X)` — true if the player has **any** of unit(s) X.
- `gwoCard.hasAllUnits(inventory.units(), X)` — true if the player has **all** of unit(s) X.
- `gwoCard.missingUnit(inventory.units(), X)` — true if the player is missing **any** of
  unit(s) X.
- `gwoCard.missingAllUnits(inventory.units(), X)` — true if the player is missing **all**
  of unit(s) X.
- `context.totalSize` — the galaxy size (how many stars it has).
- `system.distance()` — how far the current system is from the start.

```js
deal: function (system, context, inventory) {
  var chance = 25;
  if (gwoCard.hasUnit(inventory.units(), gwoUnit.dox)) {
    chance = 120;
  }
  return { chance: chance };
},
```

##### Making the chance depend on how far the player has travelled

Distance is the usual way to hold a card back until later in a war, but a plain
`system.distance()` number means different things in different galaxies: five jumps is the
far edge of a small galaxy and barely a start in a huge one. Galactic War Overhaul does
that adjustment for you with three ready-made checks. Each one is true once the player has
come far enough **for the size of galaxy they are playing**, so a card using them behaves
the same way at every galaxy size:

- `gwoCard.travelledShort(system, context, GW.balance.numberOfSystems)` — past the
  nearby systems (true once the player is further out than roughly 55% of the galaxy's
  stars).
- `gwoCard.travelledModerate(system, context, GW.balance.numberOfSystems)` — well out
  from the start (true once the player is further out than roughly 70% of the galaxy's
  stars).
- `gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)` — deep into the
  galaxy (true once the player is further out than roughly 82% of the galaxy's stars).

Pass all three arguments exactly as written. `GW.balance.numberOfSystems` is the game's
list of galaxy sizes, and it comes from the `"shared/gw_common"` line already at the top
of your card file.

```js
deal: function (system, context) {
  var chance = 30;
  if (gwoCard.travelledFar(system, context, GW.balance.numberOfSystems)) {
    chance = 140;
  }
  return { chance: chance };
},
```

If none of the three suits your card, you can set your own cutoffs with `farForSize`. The
last value is a list of nine distances, one per galaxy size from smallest to largest, and
the check is true when the system is further from the start than the entry for the size
being played. Only reach for this if the three checks above can't give you the shape you
want — for example a card that peaks in the middle of the map rather than at the edge:

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

Any of these checks can be combined, and the chance can be nudged up or down rather than
replaced outright:

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

##### Upgrade cards — `gwoCard.upgradeDeal`

An **upgrade card** improves something the player already owns, and gives them an extra
card slot in return. Because it pays for its own place in the hand, it must still be
offered when the hand is already full. Galactic War Overhaul's own upgrade cards all use
one helper that handles this for you, and yours should too:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced)
  );
},
```

Pass it a true/false answer to "does the player have the thing this card upgrades?". When
that is true the card is offered with a chance of 60; when it is false the chance is 0, so
an upgrade is never offered for something the player cannot use. To use a different chance,
pass it as a second value:

```js
deal: function (system, context, inventory) {
  return gwoCard.upgradeDeal(
    gwoCard.hasUnit(inventory.units(), gwoUnit.botFactoryAdvanced),
    90
  );
},
```

A card dealt this way must hand out the extra slot itself, as the first line of its `buff`:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

##### Cards that need something first — `gwoCard.conditionalDeal`

`gwoCard.conditionalDeal` is the plain version of `upgradeDeal`, for cards that don't hand
out a card slot. Give it a true/false answer and a chance, and it returns that chance when
the answer is true and `0` when it is false — so the card stays out of the deck until the
player can make use of it:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    70
  );
},
```

##### Naval cards — `gwoCard.navalWeight`

Owning ships is not the same as being able to use them: most generated systems have little
or no water. Only two cards flood every planet the player fights on — the naval loadout
and Tsunami Tech — and `gwoCard.navalWeight` weighs a naval card by whether the player
holds one of them. Pass it the `inventory` and the chance you want when there is water to
fight on; with neither card in hand it returns 40% of that chance instead, so your card is
offered less often rather than withheld outright:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.hasUnit(inventory.units(), gwoGroup.navalMobile),
    gwoCard.navalWeight(inventory, 70)
  );
},
```

That pairing is the shape of every naval tech card in Galactic War Overhaul: `navalWeight`
decides what the map is likely to be worth, and `conditionalDeal` keeps the card out of
the deck until the player can build ships at all.

If your card is worthless without water rather than merely weaker, pass a third number to
replace the 40% fallback with a dry-map chance of your own. Galactic War Overhaul's
Anti-Ship and Anti-Hover Ammo Techs drop from 70 to 15 this way:

```js
gwoCard.navalWeight(inventory, 70, 15);
```

##### Commander cards — `gwoCard.commanderWeight`

Your own commander and every Sub Commander are built from the same unit file, so a card
that changes commander stats improves all of them at once. That makes the size of the
player's retinue — not how far they have travelled — the thing that decides what the
card is worth, and `gwoCard.commanderWeight` weighs it that way. Pass it the `inventory`
and the chance you want when the player is fighting alone; each Sub Commander they have
adds a third of that chance on top, up to a maximum of double:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.commanderWeight(inventory, 70) };
},
```

Both values are required — unlike `upgradeDeal` there is no default chance. Use this
instead of the distance checks above rather than alongside them: a commander card is
worth the same at the edge of the galaxy as it is next door, and it is the retinue that
has grown in the meantime.

If your commander card also hands out a card slot, `upgradeDeal` cannot weigh it for you
(it takes a true/false answer, not a chance), so write the `deal` out in full and keep
the `allowOverflow` part yourself — that is what lets a card which pays for its own slot
still be offered to a full hand:

```js
deal: function (system, context, inventory) {
  return {
    params: { allowOverflow: true },
    chance: gwoCard.commanderWeight(inventory, 35),
  };
},
```

##### Sub Commander cards — `gwoCard.subcommanderWeight`

Some cards improve only the Sub Commanders fighting alongside the player and leave the
player's own commander untouched. A card like that is worth nothing at all until the
player has recruited a Sub Commander, which is a different question to the one
`commanderWeight` answers, and `gwoCard.subcommanderWeight` is the helper for it. Pass it
the `inventory` and the chance you want:

```js
deal: function (system, context, inventory) {
  return { chance: gwoCard.subcommanderWeight(inventory, 55) };
},
```

With no Sub Commanders the chance is `0`, so the card stays out of the deck entirely. With
one it is offered at the full chance you gave — not a fraction of it, so a card that has
only just become useful isn't buried at a throwaway weight. Each further Sub Commander
adds a third of that chance on top, up to a ceiling of 90 so a large retinue cannot crowd
out the deck. That ceiling applies from the first Sub Commander onwards, so there is no
point passing a chance above 90: it is capped straight back down to 90.

Both values are required. As with `commanderWeight`, use this instead of the distance
checks rather than alongside them, and if your card also hands out a card slot, write the
`deal` out in full with the `allowOverflow` part as shown above.

Choose between the two by asking who the card actually changes: `commanderWeight` for one
that improves every commander the player fields, their own included, and
`subcommanderWeight` for one that only helps their Sub Commanders.

##### Cards that react to the player's other cards

`inventory.hasCard("some_card_id")` is true when the player is holding that card. Use it
to lean on another card, or to stay out of its way:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(!inventory.hasCard("gwc_start_orbital"), 60);
},
```

`gwoCard.hasT2Access(inventory)` is a ready-made version of that question for advanced
(T2) tech: it is true once the player holds any card listed in
`model.gwoCardsGrantingAdvancedTech`. Use it for a card that would be wasted before the
player can build advanced units:

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.missingUnit(
      inventory.units(),
      gwoGroup.structuresDefencesAdvanced
    ) && gwoCard.hasT2Access(inventory),
    100
  );
},
```

##### Counter-tech cards — `gwoCard.antiTechDeal`

Galactic War Overhaul ships a family of "anti" ammo techs — Anti-Air, Anti-Ship,
Anti-Bots and so on — which each double your damage against one kind of target at the
expense of another. `gwoCard.antiTechDeal` is the deal they share. Give it the
`inventory`, the chance you want, and the ID of the card that is your card's opposite:

```js
deal: function (system, context, inventory) {
  return gwoCard.antiTechDeal(inventory, 70, "gwaio_anti_sea");
},
```

The chance drops to `0` when the player already holds that opposite card, so a pair can
never cancel each other out, and halves once the player holds any of Galactic War
Overhaul's `gwaio_anti_` cards, so the deck stops pushing more of them at a player who has
already committed to the theme. The halving counts only cards whose ID begins with
`gwaio_anti_`, which in practice means Galactic War Overhaul's own: yours will not be
counted, and you should not borrow the `gwaio_` prefix to make it so — an ID that matches
one of GWO's replaces that card's file.

##### Co-op games — `gwoCard.anyPlayerHasCard` and `gwoCard.getAllConnectedPlayerCards`

The `inventory` your card is given is the local player's own. In a co-op war every player
has their own hand, so a card that ought to react to the team as a whole has to look
wider. Two helpers do that:

- `gwoCard.anyPlayerHasCard(inventory, "some_card_id")` — true when the player _or_ any
  connected co-op player is holding that card.
- `gwoCard.getAllConnectedPlayerCards(inventory)` — every card held by the player and
  their connected co-op players, as one list. Each entry has an `id`.

```js
deal: function (system, context, inventory) {
  return gwoCard.conditionalDeal(
    gwoCard.anyPlayerHasCard(inventory, "gwaio_enable_tsunami"),
    60
  );
},
```

Outside co-op they simply answer for the one player, so they are safe to use anywhere.
Galactic War Overhaul uses them for the things a whole war shares — whether Tsunami Tech
floods the planets everyone fights on, for instance — but no card in GWO needs them, so
treat them as the advanced option. Reach for `inventory.hasCard` first, and these only
when your card's effect really is team-wide.

**Loadouts do not use a chance** — they are only granted when the player picks them on the
loadout screen. A loadout's `deal` is always just:

```js
deal: gwoCard.startCard,
```

#### `keep` and `discard` — rare chance adjustments

These are only needed for special cards. Very few use them, and no Galactic War Overhaul
card does. `keep` runs when the player keeps the card and `discard` runs when they throw
it away, and both are handed the card's own `context` — the same object `getContext`
made, which the game keeps for the rest of the deal. Writing into it is all they can do,
so they are only worth having if your card also writes its own `getContext` supplying the
value and its `deal` reads that value back. The standard `gwoCard.getContext` provides
only `totalSize`, and nothing else in the game looks at what `keep` or `discard` write.

PA's own "Additional Data Bank" card is the worked example. Its `getContext` starts a
`chance` value off at 300 and its `deal` returns whatever that value has become. The two
parts below then settle the card down to a flat 100 once the player has taken one, and
rescale it by the size of the galaxy each time one is thrown away — growing it in a large
galaxy, shrinking it in a small one:

```js
getContext: function (galaxy) {
  return { chance: 300, totalSize: galaxy.stars().length };
},
keep: function (params, context) {
  context.chance = 100;
},
discard: function (params, context) {
  context.chance *= Math.log(context.totalSize) * 0.4;
},
```

### `buff` — what the card does

`buff` is where the card's effect happens. Inside it you can do any combination of four
things. Each is described below.

#### Add a card slot

Give the player room for one more card in their hand:

```js
inventory.maxCards(inventory.maxCards() + 1);
```

#### Unlock units — `inventory.addUnits(...)`

Give the player one or more units. You can pass a single unit or a list, using paths or
GWO unit/group IDs.

```js
inventory.addUnits([
  "/pa/units/land/assault_bot/assault_bot.json",
  gwoUnit.dox,
  gwoGroup.botsBasicMobile,
]);
```

#### Change unit stats — `inventory.addMods(...)`

Change numbers or values inside a unit's file. Each change is described by four labels:

- `file` — which unit file to change (a path or GWO unit ID).
- `path` — which value inside that file. A single value is just its name, such as
  `max_health`; a value nested deeper is written with dots, such as
  `events.fired.effect_spec`. If a step along the path is the name of another file rather
  than a value, the game follows that reference into the other file and carries on from
  there.
- `op` — the kind of change. The everyday choices are `multiply`, `multiplyOrCreate`,
  `add`, `replace`, `merge`, `push`, `prepend`, `pull`, and `wipe`. There are three
  more — `clone`, `tag`, and `eval` — which are advanced and best avoided (see below).
- `value` — the amount or value to use.

```js
inventory.addMods([
  { file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 },
  { file: gwoUnit.doxWeapon, path: "max_range", op: "replace", value: 120 },
]);
```

Most of the `op` choices do what their name suggests (`push` adds to the end of a list,
`prepend` to the start). The remaining three do not:

- `clone` — writes whatever is at `path` into the file named by `value`.
- `tag` — adds your card's spec tag onto the end of the value at `path`.
- `eval` — runs `value` as raw JavaScript. The thing at `path` is handed to you as
  `attribute`, and you can do whatever you like with it; if you used a `path`, remember to
  return `attribute` at the end.

> **`clone`, `tag`, and `eval` are advanced — avoid them.** They are easy to get wrong,
> and anything you can do with them you can nearly always do more safely with one of the
> everyday ops. `eval` in particular runs your own code inside the game, so a mistake
> there can break the war rather than just change a number.

##### A shorthand for one file — `gwoCard.mods`

Most cards change several things on the same file using the same `op`, which is repetitive
to write out in full. `gwoCard.mods(file, op, changes)` writes those entries for you: give
it the file, the op, and one `path: value` pair per change.

```js
inventory.addMods(
  gwoCard.mods(gwoUnit.antAmmo, "replace", {
    splash_damage: 63,
    splash_radius: 10,
    full_damage_splash_radius: 2,
  })
);
```

That is exactly the same as writing out three `{ file, path, op, value }` entries by hand.
It handles one file at a time, so to apply the same change to a whole family of units,
build a list for each and join them into one:

```js
inventory.addMods(
  _.flatten(
    _.map(gwoGroup.botsBasicMobile, function (unit) {
      return gwoCard.mods(unit, "multiply", { max_health: 1.5 });
    })
  )
);
```

#### Change how the AI subcommander builds — `inventory.addAIMods(...)`

Change what the enemy (or your subcommander) chooses to build. Each change is described by
these labels:

- `type` — which set of AI build files to change: `fabber`, `factory`, `platoon`, or
  `template`.
- `op` — the kind of change: `load`, `append`, `prepend`, `replace`, `remove`, `new`, or
  `squad`. `squad` only works on `template`, and `append`, `prepend`, `replace`, `remove`
  and `new` only work on `fabber`, `factory`, and `platoon`. Pairing an op with the wrong
  `type` changes nothing and reports no error.
- `value` — the value to apply.
- `toBuild` — which thing in the AI's build list to target (not needed for `load`).
- `idToMod` — which part of that entry to change (for example `builders` or `priority`).
- `refId` and `refValue` — optional. Only make the change when the entry already has
  `refValue` at `refId`.
- `matchAll` — optional. Change every build condition on the entry, instead of only the
  ones where `refId` holds `refValue`.

The simplest AI change loads a whole ready-made AI build file (this is how most upgrade
cards teach the AI to use a new unit). `load` is the odd one out: it uses only `type`,
`op`, and `value`, where `value` is the name of a JSON file GWO reads from `/pa/ai_tech/`.
The `type` decides which folder inside it is used: `fabber_builds/`, `factory_builds/`,
`platoon_builds/`, or — for `template` — `platoon_templates/`.

```js
inventory.addAIMods([
  { type: "factory", op: "load", value: "my_upgrade_myunit.json" },
]);
```

That file has to exist, and it is yours to write: ship it in your own mod at the matching
path, for example `pa/ai_tech/factory_builds/my_upgrade_myunit.json`, alongside your `ui`
folder. Give it a name no other mod is likely to use — a file with the same name as one of
Galactic War Overhaul's own would replace it.

A more targeted change — here, letting basic bot factories also build a unit, but only
when the entry is for the advanced bot factory:

```js
inventory.addAIMods([
  {
    type: "factory",
    op: "append",
    toBuild: "MyUnit",
    idToMod: "builders",
    value: "BasicBotFactory",
    refId: "builders",
    refValue: ["AdvancedBotFactory"],
  },
]);
```

### `dull` — cleanup after all cards

`dull` runs after every card's `buff` has finished. It is mainly used to remove units. The
way you remove units differs between tech cards and loadouts.

**Tech cards** remove units directly:

```js
dull: function (inventory) {
  inventory.removeUnits([gwoUnit.dox, gwoGroup.botsBasicMobile]);
},
```

**Loadouts** must remove their units through the helper `gwoCard.applyDulls`, which makes
sure the removal happens once and only for the right copy of the loadout. Pass the card,
the inventory, and the units to remove:

```js
dull: function (inventory) {
  var units = [gwoUnit.dox, gwoGroup.botsBasicMobile];
  gwoCard.applyDulls(CARD, inventory, units);
},
```

If a loadout has no units to remove, you can leave the units out:
`gwoCard.applyDulls(CARD, inventory);`.

### The bank and `LS_KEY` — remembering unlocked loadouts

Locked loadouts (the ones you list in `model.gwoNewStartCards`) need somewhere to record
that the player has unlocked them. That is what `bank.js` is for. It saves the unlocked
list into the player's local storage under a private key called `LS_KEY`.

Set `LS_KEY` in your `bank.js` to something unique to your mod, so it never clashes with
another mod's storage:

```js
var LS_KEY = "myname_mymod_bank";
```

Your loadout cards connect to this bank in two steps, both already wired up in the example
`start_card_id.js`:

1. At the top of the loadout card, it lists your `bank.js` so the card can use it. **Make
   sure this address matches your mod's identifier:**

   ```js
   "coui://ui/mods/<your identifier>/bank.js",
   ```

2. When the loadout is earned, the card records it in the bank:

   ```js
   gwoBank.addStartCard(CARD);
   ```

The loadout screen then checks the bank (using the same `LS_KEY`) to decide whether to
show your loadout as unlocked. Using your own key means that if the player later removes
your mod, PA's built-in loadout list is not left pointing at missing cards.

## Minimum required changes

You don't have to use every feature above. This is the shortest path to a working mod with
one card. Tick each item off as you go.

**Every mod:**

- [ ] Copied `my_card_mod` into `client_mods` and renamed it.
- [ ] In `modinfo.json`, filled in `identifier`, `display_name`, `description`, and
      `author`.
- [ ] In `modinfo.json`, changed the `scenes` addresses so they contain your identifier.
- [ ] Renamed the folder under `ui/mods/` so it matches your identifier.
- [ ] Renamed the example card file you are using (`tech_card_id.js` or
      `start_card_id.js`) to a unique name, and remembered that name (without `.js`) as the
      card's ID.
- [ ] Gave the card a name (`summarize`), a description (`describe`), and a picture
      (`icon`).
- [ ] Made the card actually do something in its `buff` (add units, change unit stats, or
      change the AI).
- [ ] Replaced or removed every leftover placeholder in the card, such as `UNIT_PATH`,
      `PNG_FILE_NAME`, `CHOSEN_LINE_HERE`, and the `!LOC:...HERE` text. A leftover
      placeholder will break the card.

**If your card is a tech card, also:**

- [ ] In the card's `deal`, set `chance` to a number above `0`. It starts at `0`, which
      means the card is never offered.
- [ ] Added the card's ID to `model.gwoCards` in `tech_cards.js`.
- [ ] Listed the card in `model.gwoCardsToUnits` in `tech_cards.js` (or, if it changes no
      units, in `model.gwoCardsWithoutTooltip`).

**If your card is a loadout, also:**

- [ ] Added the card's ID to `model.gwoStartingCards` (unlocked) or
      `model.gwoNewStartCards` (locked) in `start_cards.js`.
- [ ] Set a unique `LS_KEY` in `bank.js`.
- [ ] Changed the `bank.js` address at the top of the loadout card so it matches your
      identifier.

## Testing your mod

1. Add `--devmode` to your PA
   [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955) (keep
   `--coherent_port=9999` there too).
2. Launch PA.
3. Under Community Mods, enable your mod in the INSTALLED list.
4. Return to the Main Menu.
5. Open the Coherent UI Debugger.
6. Click GO.
7. Click Start Page.
8. Change to the Console tab.

During testing you will watch the Console for errors. Note that PA normally produces the
following two messages, up to once per screen, and they are **not** a problem:

- ERROR: _Uncaught TypeError: undefined is not a function_
- WARN: _Synchronous XMLHttpRequest on the main thread is deprecated because of its
  detrimental effects to the end user's experience. For more help, check
  <http://xhr.spec.whatwg.org/>._

### Testing loadouts

1. Start PA.
2. Go to the Galactic War Loadout screen.
3. Confirm your loadout is listed, locked, and shows its hint.
4. Confirm no errors appear in the Console.
5. In the debugger, switch to the Resources tab.
6. Expand local storage.
7. Click on `coui://`.
8. If the key matching your `LS_KEY` does not exist, right-click the empty line at the
   bottom and create it.
9. Right-click that key, choose to edit the value, and add your loadout ID in the form
   `{"id":"your_loadout_id"}`. The finished value should look something like
   `{"startCards":[{"id":"some_loadout_you_already_unlocked"},{"id":"your_loadout_id"}]}`.
10. Press Enter to save.
11. Press F5 to refresh the loadout screen.
12. Confirm your loadout is now unlocked and selectable.

### Testing tech cards

1. Start PA.
2. Start a new Galactic War.
3. Click the X in the bottom left-hand corner.
4. Enter your card ID into the panel.
5. Click the + icon to the right of the text box.
6. Confirm your card was dealt to your inventory and no errors appear in the Console.
7. In the debugger, tick the `Preserve log` box.
8. Begin a fight.
9. Confirm no unexpected errors appear in the Console.
10. Use the sandbox to spawn your changed units and check they behave correctly.

## Releasing your mod

When your mod is ready to share, update these entries in `modinfo.json`:

1. `version` — a version number. Consider
   [semantic versioning](https://semver.org/).
2. `date` — the release date, written as `yyyy-mm-dd`
   ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).
3. `build` — match the contents of the `version.txt` file in the root of your PA install.
4. `forum` — the web address of your mod's discussion thread (Steam or GitHub Discussions
   is fine).
5. `icon` — the web address of a publicly visible PNG image for your mod.

Put your mod's ZIP file somewhere anyone can download it (GitHub is preferred). Then post
the download location to the `#new-mod-submissions` channel on the
[official PA Discord](https://discord.gg/pa).
