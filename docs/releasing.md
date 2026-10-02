# Releasing your mod

**Who needs this page:** every mod, when it is ready to share.

When your mod is ready to share, update these entries in `modinfo.json`:

1. `version`: a version number, such as `1.0.0`. Consider
   [semantic versioning](https://semver.org/).
2. `date`: the release date, written as `yyyy-mm-dd`
   ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).
3. `build`: the number in the `version.txt` file at the top of your PA install folder.
4. `forum`: the web address of your mod's discussion thread (a Steam or GitHub Discussions
   thread is fine).
5. `icon`: the web address of a publicly visible PNG image for your mod.

Then decide whether a co-op war that you host must require your mod; see
[Sharing your mod in a co-op war](#sharing-your-mod-in-a-co-op-war--galacticwarmod).

You can delete the example card files and loaders that you did not use, and their lines
in `modinfo.json`. The game loads a card only when a loader registers it, so a leftover
example card does no harm, but deleting it keeps your mod tidy.

Then make sure that your mod is on GitHub as a repository of its own, with `modinfo.json`
at the top level of the repository. Don't upload a ZIP file to a repository.

- If you started from **Use this template** in
  [Preparing the mod](setup.md#preparing-the-mod), commit and push your final changes.
  Your repository is the release. The template's `.gitignore` file already keeps the
  checker's `node_modules` folder out of it.
- If you **downloaded the files**, create an empty repository on GitHub and upload the
  contents of your mod folder into it, so that `modinfo.json` sits at the top level and
  not inside a subfolder. **Don't upload the `node_modules` folder**, if you have one. It
  holds the checker, it is large, and nobody else needs it.

Everything else can stay. The game ignores what it does not recognise, and the next person
who opens your mod gets the checker and this guide with it.

Finally, post the address of your repository in the `#new-mod-submissions` channel on the
[official PA Discord](https://discord.gg/pa), so that your mod can be listed in Community
Mods.

## Sharing your mod in a co-op war — `galacticWarMod`

`modinfo.json` holds a `galacticWarMod` entry, which the template sets to `false`. It
changes nothing in a war that you play alone. In a co-op Galactic War, it decides whether
every player must have your mod.

**Only the host decides.** A co-op war belongs to the player who starts it, the host. The
war uses the host's mods, and the other players join as viewers who play the host's war
with the host's cards. So the game reads `galacticWarMod` only from the mods that the host
has turned on. When you join someone else's war, your own copy of the entry only decides
whether your mods match the host's.

**`false` (the default).** Your mod stays your own. You can host a co-op war, or join one,
and no other player needs your mod. Use `false` for a mod that only you need, such as a
personal loadout.

**`true`.** Every player in a war that you host must have your mod, with the same
`version`. The game refuses a player who:

- does not have your mod. The game tells that player the name of the mod that they must
  install.
- has your mod turned on when you, the host, do not.

Use `true` for a mod that changes the war for everyone, such as new tech cards that all
players receive. To turn it on, change the line in `modinfo.json` to:

```json
  "galacticWarMod": true,
```

Because the `version` must match too, every player in the war must update the mod
together each time that you release a new version.

---

[Contents](../README.md#contents)
