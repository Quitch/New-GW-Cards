# Checking and testing your mod

**Who needs this page:** every mod. Come back to it after every change.

## Checking your work

Do this before you start the game. PA is strict: **one typing mistake stops the whole
file**, not only the line that it is on. After a missing comma or an unclosed bracket, your
card simply never appears, and nothing in the game tells you why. The checker finds that
kind of mistake in seconds.

### From a terminal

To check the whole mod at once, for example before you release it, run this in your mod
folder after the `npm install` in
[Installing the checker](setup.md#installing-the-checker-recommended):

```bash
npm run lint:js
```

It prints one line for each problem, with the file and the line number. No output means no
problems.

### What it catches

- **Typing mistakes**: a missing comma, or a bracket or quotation mark that is not closed.
- **Newer JavaScript that PA cannot run.** The browser inside PA is very old. Modern
  JavaScript that you may have seen elsewhere, such as `let`, `=>`, backtick strings and
  `class`, does not even load, and takes the whole file down with it. The checker knows
  exactly what PA supports, and reports the rest.
- **Functions that PA does not have**, such as `Object.assign` and `Array.from`. These are
  worse than a typing mistake, because the file loads and the card fails only when a
  player uses it.

If you are not sure whether you can use something, write it and see whether anything
turns red. `eslint.config.mjs` holds the full list of what PA supports.

## Testing your mod

Run the [checker](#checking-your-work) first. It finds the mistakes that stop a card from
loading at all, which are the hardest to track down from inside the game.

### Setting up

You test with the **Coherent UI Debugger**, a free tool that shows you the messages that
the game's menus print. You set it up once.

1. [Download the debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip)
   and unzip it anywhere.
2. Add `--coherent_port=9999 --devmode` to PA's Steam
   [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955) (in
   Steam, right-click the game → **Properties** → **Launch Options**).
   `--coherent_port=9999` lets the debugger connect to PA, and `--devmode` turns on the
   test panel that you use below.

Then, each time that you test:

1. Launch PA.
2. Open **Community Mods**, find your mod in the INSTALLED list, and enable it.
3. Return to the main menu.
4. Start the Coherent UI Debugger from the folder where you unzipped it. Check that the
   address box says `localhost` and the port is `9999`, and click **GO**.
5. The debugger lists the game's screens. Click **Start Page**, which is the main menu.
6. Switch to the **Console** tab. The game's messages appear here.

Keep the Console open while you test, and watch for red errors.

PA prints these two messages in normal play, up to once for each screen. They are **not**
a problem:

- ERROR: _Uncaught TypeError: undefined is not a function_
- WARN: _Synchronous XMLHttpRequest on the main thread is deprecated because of its
  detrimental effects to the end user's experience. For more help, check
  <http://xhr.spec.whatwg.org/>._

Learn these two:

- ERROR: _GWO card failed to load: SOME_ID_, _Start card failed to load: SOME_ID_, or
  _Uncaught Error: Script error for: cards/SOME_ID_

  You listed `SOME_ID` somewhere, but there is no `SOME_ID.js` in
  `ui/main/game/galactic_war/cards/`, or the file has a typing mistake that stops it from
  loading. The usual cause is a misspelled ID, an example ID that you forgot to delete, or
  a typing mistake that the [checker](#checking-your-work) would find. The first message
  is for a tech card: the game skips that card, and the war continues. The second is for
  a loadout: that loadout cannot be used. Some screens show the third message instead of
  the first two. See the warning under
  [`model.gwoStartingCards`](loadouts.md#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

- WARN: _Warning: File not found in mod {"file":"/pa/units/…",…}_

  A card tried to change a file that the player has no copy of, so the game skipped that
  change. **This message is normal.** Galactic War copies only the files that the
  player's units need, and it deals a card that changes several units to players who own
  only some of them. It drops the changes for the rest, which is exactly what should
  happen. The `file` in the message tells you which file it was.

  It is a problem only when the file is one that the card _should_ have been able to
  change: a unit that the card `requires`, a file reached from one of those, or a file
  that you borrowed from another unit and forgot to list in
  [`model.gwoSpecs`](changing-units.md#modelgwospecs--extra-unit-files-to-change-in-specsjs). A typing
  mistake in the path looks the same, so check the spelling of `file` against the
  [unit IDs](https://github.com/Quitch/GW-AI-Overhaul/blob/master/ui/mods/com.pa.quitch.gwaioverhaul/shared/units.js)
  before you decide that the message is the harmless kind.

### Testing tech cards

1. Start a new Galactic War.
2. Click the **X** in the bottom left-hand corner of the war screen. It opens the test
   panel, which appears only with `--devmode`.
3. Type your card's ID into the panel's text box, and click the **+** to its right. The
   panel finds the cards that you registered in `model.gwoCards`, the cards of the war's
   [deck](decks.md), and GWO's loadouts. A card that is in none of them is not found.
4. Check that the card appears in your hand, and that no new errors appear in the Console.
5. Hover over the card, and check that its name, description, picture and tooltip look
   right.
6. In the debugger, tick the **Preserve log** box, so that the Console keeps its messages
   when the battle loads.
7. Start a fight.
8. Check that no unexpected errors appear in the Console.
9. In the battle, build the units that your card changes, and check that they behave as
   the card says. Cards apply only inside Galactic War, so an ordinary skirmish or sandbox
   game shows the game's normal units, not your changes.

### Testing loadouts

1. Open the Galactic War loadout screen.
2. Check that your loadout is listed, locked (for a locked loadout), and shows its hint.
3. Check that no errors appear in the Console.
4. To unlock the loadout for testing, switch the debugger to the **Resources** tab.
5. Expand **Local Storage**, and click `coui://`.
6. Find the key with the same name as your `LS_KEY`. If there isn't one, right-click the
   empty line at the bottom of the list and create it.
7. Right-click the key, choose to edit its value, and add your loadout ID. The finished
   value should look like this, with your own ID or IDs in it:
   `{"startCards":[{"id":"mym_start_myloadout"}]}`. If the value already lists other
   loadouts, add yours to the list, with a comma between the entries:
   `{"startCards":[{"id":"mym_start_other"},{"id":"mym_start_myloadout"}]}`.
8. Press Enter to save.
9. Press F5 to reload the loadout screen.
10. Check that your loadout is now unlocked and can be selected.
11. Start a war with it, and check that you get the units that it gives.

If something does not work, see [Troubleshooting](troubleshooting.md).

---

[← Previous: Your first card](first-card.md) · [Contents](../README.md#contents)
