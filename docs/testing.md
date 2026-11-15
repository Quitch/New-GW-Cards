# Checking and testing your mod

**Who needs this page:** every mod. Use it again after every change.

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

It prints two lines that start with `>`. If there are problems, it then names each file
that has one, lists its problems below the name with their line numbers, and ends with a
count. Nothing after the two `>` lines means no problems.

### What it catches

- **Typing mistakes**: a missing comma, or a bracket or quotation mark that is not closed.
- **Newer JavaScript that PA cannot run.** PA can still run its menus in a very old
  browser, and some players use it. In that browser, modern JavaScript that you may have
  seen elsewhere, such as `let`, `=>`, backtick strings, and `class`, does not even load,
  and takes the whole file down with it. Your own game may run that code without a
  problem and still break for those players. The checker knows exactly what the old
  browser supports, and reports the rest.
- **Functions that PA does not have**, such as `Object.assign` and `Array.from`. These are
  worse than a typing mistake, because the file loads and the card fails only when a
  player uses it.

If you are not sure whether you can use something, write it and see whether anything
turns red. `eslint.config.mjs` holds the full list of what PA supports.

## Testing your mod

Run the [checker](#checking-your-work) first. It finds the mistakes that stop a card from
loading at all, which are the hardest to track down from inside the game.

### Setting up

You test with **DevTools**, the debugger that is built into Google Chrome and Microsoft
Edge. It shows you the messages that the game's menus print. Edge comes with Windows, so
you probably have one of them already. You set it up once.

1. Add `--webview-port=9999 --devmode` to PA's Steam
   [launch options](https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955) (in
   Steam, right-click the game → **Properties** → **Launch Options**).
   `--webview-port=9999` lets DevTools connect to PA, and `--devmode` turns on the test
   panel that you use below. If your launch options already say `--coherent_port=9999`,
   that also works: it is the old name for the same option.
2. In Chrome, go to `chrome://inspect`. In Edge, go to `edge://inspect`.
3. Next to **Discover network targets**, click **Configure…**, add `localhost:9999`, and
   click **Done**.

Then, each time that you test:

1. Launch PA.
2. Open **Community Mods**, find your mod in the INSTALLED list, and enable it.
3. Return to the main menu.
4. In Chrome or Edge, go to `chrome://inspect` (or `edge://inspect`) again. Under
   **Remote Target**, it lists the game's screens. Find **Start Page**, which is the main
   menu, and click **inspect** below it. A DevTools window opens.
5. Switch to the **Console** tab. The game's messages appear here.
6. Click the gear icon at the top right of the Console, and tick **Preserve log**. Without
   it, the Console empties every time that the game changes screen.

Keep the Console open while you test, and watch for red errors. The DevTools window stays
connected as you move from screen to screen, so you do not need to click **inspect**
again until you restart PA.

PA prints these two messages on the main menu in normal play. They are **not** a problem.
They come from the news and video panels on the main menu, and the numbers at the end can
differ:

- ERROR: _Failed to load resource: the server responded with a status of 503 ()_
- ERROR: _Failed to load resource: the server responded with a status of 404 ()_

> **If you start PA with `--ui-backend=coherent`, do not use Chrome or Edge.** That option
> makes PA use its old browser, and DevTools can break that browser's connection. Use the
> [Coherent UI Debugger](https://cdn.planetaryannihilation.com/downloads/debugger-windows.zip)
> instead. The old browser also prints _Uncaught TypeError: undefined is not a function_
> and a warning about _Synchronous XMLHttpRequest_ on every screen. Those are not a
> problem either.

Learn these:

- ERROR: _GWO card failed to load: SOME_ID_, _Start card failed to load: SOME_ID_, or
  _Uncaught Error: Script error for: cards/SOME_ID_

  You listed `SOME_ID` somewhere, but there is no `SOME_ID.js` in
  `ui/main/game/galactic_war/cards/`, or the file has a typing mistake that stops it from
  loading. The usual cause is a misspelled ID, an example ID that you copied without
  changing it, or a typing mistake that the [checker](#checking-your-work) would find.
  The first message is for a tech card: the game skips that card, and the war continues.
  The second is for a loadout: that loadout cannot be used. The game itself can show the
  third message as well as one of the first two. See the warning under
  [`model.gwoStartingCards`](loadouts.md#modelgwostartingcards--unlocked-loadouts-in-start_cardsjs).

- ERROR: _Loadout bank failed to load: ADDRESS_

  The `path` in `model.gwoLoadoutBanks` in `start_cards.js` does not lead to your
  `bank.js`. Check the identifier in it. See
  [`model.gwoLoadoutBanks`](loadouts.md#modelgwoloadoutbanks--where-your-bank-lives-in-start_cardsjs).

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

Other messages, and what each one means, are in
[Messages you may see](troubleshooting.md#messages-you-may-see).

### Testing tech cards

1. Start a new Galactic War.
2. Click the **X** in the bottom left-hand corner of the war screen. It opens the test
   panel, which appears only with `--devmode`.
3. Type your card's ID into the panel's text box, and click the **+** to its right. The
   panel finds the cards that you registered in `model.gwoCards`, the cards of the war's
   [deck](decks.md), and GWO's loadouts. A card that is in none of them is not found.
4. Check that the card appears in your hand, and that no new errors appear in the Console.
5. Hover over the card, and check that its name, description, picture, and tooltip look
   right.
6. Check that **Preserve log** is still ticked (the gear icon at the top right of the
   Console), so that the Console keeps its messages when the battle loads.
7. Start a fight.
8. Check that no unexpected errors appear in the Console.
9. In the battle, build the units that your card changes, and check that they behave as
   the card says. Cards apply only inside Galactic War, so an ordinary skirmish or sandbox
   game shows the game's normal units, not your changes.

### Testing loadouts

1. Open the Galactic War loadout screen.
2. Check that your loadout is listed, locked (for a locked loadout), and shows its hint.
3. Check that no errors appear in the Console.
4. To unlock the loadout for testing, switch DevTools to the **Application** tab. If you
   cannot see it, click **»** at the end of the tab names.
5. In the list on the left, under **Storage**, expand **Local storage**, and click
   `coui://ui`.
6. Find the key with the same name as your `LS_KEY`. If there isn't one, double-click the
   empty line at the bottom of the list, type the name, and press Enter.
7. Double-click the key's value to edit it, and add your loadout ID. The finished
   value should look like this, with your own ID or IDs in it:
   `{"startCards":[{"id":"mym_start_myloadout"}]}`. If the value already lists other
   loadouts, add yours to the list, with a comma between the entries:
   `{"startCards":[{"id":"mym_start_other"},{"id":"mym_start_myloadout"}]}`.
8. Press Enter to save.
9. Click in the DevTools window, and press F5 to reload the loadout screen.
10. Check that your loadout is now unlocked and can be selected.
11. Start a war with it, and check that you get the units that it gives.

If something does not work, see [Troubleshooting](troubleshooting.md).

---

[← Previous: Your first card](first-card.md) · [Contents](../README.md#contents)
