# Translating your mod

**Who needs this page:** only mods that ship translations. Your mod works in English without
them. Translate your mod only if you want players to read your cards in their own
language.

The game cannot load translations from a mod by itself. The
[Mod Translations](https://github.com/Quitch/Mod-Translations) mod adds that ability, and
GWO already uses it. A player who does not have Mod Translations sees your text in English.
A player whose language you have no file for also sees English. Nothing breaks in either
case.

There are four steps. Each one fails without a message if you get it wrong, so do them in
order, and then do the [test](#testing-your-translations) at the end.

## Step 1: add the dependency in `modinfo.json`

Open `modinfo.json` and add `"com.pa.quitch.modtranslations"` to `dependencies`, next to
GWO. Community Mods then installs Mod Translations together with your mod.

```json
  "dependencies": ["com.pa.quitch.gwaioverhaul", "com.pa.quitch.modtranslations"]
```

In the same file, keep `priority` above `50`. The template sets it to `100`, which is
correct. The game loads mods from the lowest `priority` number to the highest, and Mod
Translations uses `50`. A mod at `50` or below can run before Mod Translations exists.
Your text then stays English, and no error tells you why.

## Step 2: create the register script

Create a new file, `translations.js`, in `ui/mods/<your identifier>/`, next to
`tech_cards.js`. Put this in it, and change `<your identifier>` to your mod's
`identifier`:

```js
(function () {
  try {
    // Mod Translations supplies window.ModTranslations.  If the player does
    // not have that mod, this script does nothing and your text stays English.
    if (window.ModTranslations) {
      window.ModTranslations.register("<your identifier>");
    }
  } catch (e) {
    console.error(e);
    console.error("New GW Cards: " + (e.stack || e.message || e));
  }
})();
```

> **This is a fourth place for your identifier.**
> [Preparing the mod](setup.md#preparing-the-mod) names three places that must agree. The
> identifier in this script must agree with them too. Mod Translations uses it to find
> your files, so a different identifier finds nothing and reports nothing.

## Step 3: list the script under `global_mod_list`, and nowhere else

Open `modinfo.json` again and add a `global_mod_list` entry to `scenes`, next to the three
entries that are already there:

```json
  "scenes": {
    "global_mod_list": ["coui://ui/mods/<your identifier>/translations.js"],
    "gw_play": [
```

Don't add `translations.js` to `gw_play`, `gw_start` or `gw_coop_per_player_loadout`. This
is the one exception to the rule in
[Understanding the pieces](setup.md#understanding-the-pieces) that a loader goes on every
screen that needs it.

The reason is timing. The game translates the text of its own screens, and remembers the
result, before it runs any one screen's list. A script under `gw_play` or `gw_start`
therefore registers your translations too late, and some of your text stays English until
the player leaves that screen. A script under `global_mod_list` runs on every screen, and
runs before that first translation.

## Step 4: write the translation files

Create a folder named `translations` in `ui/mods/<your identifier>/`. Put one file in it
for each language, named `<lang>.json`.

`<lang>` must be the name of a folder in
`{PA_INSTALL_DIRECTORY}/media/ui/main/_i18n/locales/`, for example `de`, `fr`, `es-ES`,
`ru` or `zh-CN`. Copy the name exactly. A name that is not in that folder never loads.

A regional language also reads its base language's file. A player who uses `de-AT`
(Austrian German) gets `de-AT.json` first and then `de.json`, so one `de.json` serves
both.

Each file is a list of your English texts, and each text has its translation as
`message`:

```json
{
  "Bot Damage": { "message": "Bot-Schaden" },
  "Increases the damage of your basic bots.": {
    "message": "Erhöht den Schaden deiner einfachen Bots."
  }
}
```

You can also keep an `en-US.json` that lists every key, with a `description` of each one
for your translators. The game never loads that file. It is only a catalogue.

### The key must be your English text, exactly

The key is the English text exactly as you wrote it after `!LOC:` in the card. Every
character counts, including capital letters, punctuation, numbers and `<br>`. Only spaces
at the very start and the very end don't count. For `"!LOC:Bot Damage"` the key is
`"Bot Damage"`.

**A key that does not match leaves that one text in English, and no message tells you.**
Copy each key out of the card file. Don't type it again.

These rules follow from that:

- If you change the English wording in a card, you change the key. Update that key in
  every language file at the same time.
- `message` must not be empty. Mod Translations ignores an empty `message`.
- A key that contains `;;` or `::` can never work. Change the English text in the card so
  that it contains neither.
- Keep numbers and `<br>` the same in the translation as in the English text.

Text that needs a key:

- `summarize`, `describe` and `hint` in a card.
- `name` and `description` in a `gwoCard.upgradeCard` card.
- `name` and `tooltip` in a deck.

Text that needs no key: the line "Adds a new slot for another technology." that
`gwoCard.upgradeCard` adds to a description. That line belongs to GWO, which already
translates it.

**Put only your own text in your files.** When two mods translate the same key, the mod
with the higher `priority` number wins everywhere that the key appears. GWO's `priority`
is `200`, so it wins against the template's `100`.

### Unit names

A unit's name in your text is a special case, and the unit's own file decides it. Open
the unit's `.json` file in the PA install, and read its `display_name` entry:

- **Without `!LOC:`**, for example `"Dox"`, `"Ant"`, `"Colonel"`, and most of the units
  that TITANS added. The game shows that name unchanged in every language. Write the name
  unchanged in your translated text. A `"Dox"` key of your own does nothing, because the
  game never looks that name up.
- **With `!LOC:`**, for example `"!LOC:Bot Factory"`. The game translates that name. Use
  the game's own wording for that language, so that your card agrees with the rest of the
  screen. The game's translation files are in
  `{PA_INSTALL_DIRECTORY}/media/ui/main/_i18n/locales/<lang>/`.

## Testing your translations

1. Do the steps in [Testing your mod](testing.md#testing-your-mod), so that the Console is
   open.
2. In the game, open Settings and change the language to one that you have a file for.
3. Open Galactic War again, and read your cards' text.
4. In the Console, find a line that starts with `[ModTranslations]`, followed by your
   identifier and the language:

   ```text
   [ModTranslations] com.pa.yourname.modname de {"languages":["de"],"added":2,"replaced":0,"invalid":0}
   ```

   `languages` lists the files that the game found. `added` is the number of texts that it
   took from them. `invalid` counts the entries that it ignored.

If something is wrong, the result tells you where to look:

- **No `[ModTranslations]` line with your identifier.** `translations.js` is not under
  `global_mod_list`, the address there does not contain your identifier, Mod Translations
  is not enabled, or your `priority` is `50` or below.
- **`languages` is empty, or `added` is `0`.** The game did not find your file. Check the
  name of the `translations` folder, the file's name against the `locales` folder, and the
  identifier in `translations.js`.
- **A red error that names your file.** The file is not valid JSON. The usual cause is a
  missing comma or quotation mark.
- **`invalid` is above `0`.** An entry has an empty `message`, or its key contains `;;`
  or `::`.
- **One text is still English.** Its key does not match the English text in the card.
  Copy the text from the card again.

---

[Contents](../README.md#contents)
