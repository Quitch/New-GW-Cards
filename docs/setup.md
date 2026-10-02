# Setting up your mod

**Who needs this page:** every mod. Do it once, before your first card.

## Two folders that you need to find

The guide refers to two folders on your computer.

- **The PA data folder.** Your mods live here. On Windows it is
  `%LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation`. Paste that into the address
  bar of File Explorer to open it. For other systems, see
  [where is my PA data directory](https://support.planetaryannihilation.com/kb/faq.php?id=176).
- **The PA install folder**, which this guide writes as `{PA_INSTALL_DIRECTORY}`. It holds
  the game's own files, which you read to find unit names, stats and icons. To open it, go
  to Steam, right-click the game, and choose **Manage** → **Browse local files**. **Never
  change anything in this folder.** Steam overwrites it on every update.

## Preparing the mod

1. Open your PA data folder, and then the `client_mods` folder inside it. If
   `client_mods` does not exist, create it.
2. Get your own copy of this template into `client_mods`. There are two ways. Choose one
   now, because it decides how you release the mod later.

   - **Download the files (easiest).** On the template's
     [GitHub page](https://github.com/Quitch/New-GW-Cards), click **Code** and then
     **Download ZIP**. Unpack the ZIP into `client_mods`, and rename the unpacked folder to
     a name of your choice, such as the name of your mod. You publish the mod later by
     uploading the files to GitHub; see [Releasing your mod](releasing.md).
   - **Use this template on GitHub (for people who already use git).** On the
     [GitHub page](https://github.com/Quitch/New-GW-Cards), click **Use this template** and
     then **Create a new repository**. GitHub makes a new repository under your account
     that starts with the contents of this one. You can do this as many times as you like,
     so one account can hold several card mods. Then
     [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
     your new repository into `client_mods`, and commit and push your changes as you go.
     When the mod is ready, it is already published. Don't use the **Fork** button
     instead: GitHub allows only one fork of a repository per account, and a fork stays
     tied to this template in ways that a new repository does not.

   That folder in `client_mods` is now your mod folder. It holds a few files that the game
   ignores, such as `README.md` and the `docs` folder (this guide), `package.json` and
   `eslint.config.mjs`. Leave them where they are. The last two are the checker described
   in [Installing the checker](#installing-the-checker-recommended), and the checker works
   only from inside your mod folder.

3. Choose an **identifier** for your mod: a unique name in the style
   `com.pa.yourname.modname`, in lower case, with no spaces. For example,
   `com.pa.jane.botpack`.
4. Open `modinfo.json`, in your mod folder, and fill in these entries. Change only the text
   between the quotation marks.
   - `identifier`: the identifier that you chose.
   - `display_name`: the name that players see in the mod list.
   - `description`: a short summary of what your mod adds.
   - `author`: your name.
   - `scenes`: each address in this block contains `com.pa.YOURNAME.MODNAME`. Change
     that part of every address to your identifier. Don't delete an entry, and don't
     change the order. Some files appear more than once on purpose;
     [Understanding the pieces](#understanding-the-pieces) explains why.
5. Inside your mod folder, open `ui/mods/`. Rename the folder there, which is called
   `com.pa.YOURNAME.MODNAME`, to your identifier. The name must match exactly.

> **Keep three things the same:** the `identifier` in `modinfo.json`, the `scenes`
> addresses in that same file, and the folder name under `ui/mods/`. All three must use the
> same identifier. If they disagree, the game loads nothing and reports nothing.

`modinfo.json` also holds a `galacticWarMod` entry. Leave it at `false` for now. It
matters only in a co-op war, and
[Sharing your mod in a co-op war](releasing.md#sharing-your-mod-in-a-co-op-war--galacticwarmod)
explains it when you are ready to release.

## Understanding the pieces

Your mod folder has two important areas.

**The cards themselves** are in `ui/main/game/galactic_war/cards/`. Each card is one file.
The template supplies three examples:

- `unit_upgrade_card_id.js`: an example tech card that improves one unit that the player
  already has. It is the shortest kind of card to write.
- `tech_card_id.js`: an example of any other tech card.
- `start_card_id.js`: an example loadout.

**The loader files** are in `ui/mods/<your identifier>/`. These files tell GWO about your
cards. When Galactic War starts, GWO reads them and adds your cards to the game:

- `tech_cards.js`: lists your tech cards and the units that they change.
- `start_cards.js`: lists your loadouts, and tells GWO where your `bank.js` is.
- `bank.js`: records which of your locked loadouts the player has unlocked.
- `specs.js`: lists any extra unit files that you want to change. Most mods don't need it.
- `decks.js`: optional. Offers a whole [deck](decks.md) of your own in the Techs picker.
  Most mods don't need it.

There is one more loader, `translations.js`, which is optional. The template does not
include it, and you create it yourself. See [Translating your mod](translating.md).

Galactic War has three separate screens: the loadout choice, the war itself, and the
loadout choice in a co-op game. Each screen starts empty, and the game loads your loaders
separately for each screen that needs them. That is why `modinfo.json` lists some of them
more than once. If a loader runs on only one screen, your cards are missing from the other
two.

## Installing the checker (recommended)

The template includes a checker that reads your card files and reports mistakes before you
start the game. You don't have to install it, but we recommend it: one typing mistake
stops a whole card file, and the game does not tell you why.

The checker works best as an extension in your editor. This needs
[Visual Studio Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/).

1. Install Node.js. The default choices in its installer are fine.
2. In Visual Studio Code, open the Extensions panel (the blocks icon in the left sidebar),
   search for `ESLint`, and install the one from Microsoft.
3. Open your mod folder in Visual Studio Code with **File** → **Open Folder**. Open the
   folder, not a single file, or the checker cannot find its settings.
4. Open a terminal (**Terminal** → **New Terminal**), type `npm install`, and press Enter.
   This downloads the checker into a `node_modules` folder. You do this once only.

From then on, the editor underlines mistakes in red as you type, and shows an explanation
when you hover the pointer over one. There is nothing to run and nothing to remember.

You don't need to move or set up anything else. `package.json` and `eslint.config.mjs`
came with the template, and they already sit next to your `ui` folder. The game ignores
them.

To check the whole mod from a terminal, see
[Checking your work](testing.md#checking-your-work).

---

[← Previous: Start here](../README.md#start-here) · [Contents](../README.md#contents) ·
[Next: How to read the card files →](reading-card-files.md)
