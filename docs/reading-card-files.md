# How to read the card files

**Who needs this page:** everyone who has not edited a JavaScript file before.

The files that you edit are small JavaScript programs, but you don't need to learn
JavaScript to edit them. You need to recognise a few marks. This is the whole list.

**Comments.** Text after `//` on a line, or between `/*` and `*/`, is a note for people.
The game ignores it. The template's comments tell you what to change, so read them. "Remove
the comment marks" means that you delete the `//` at the start of each line, which turns
the note into a working line.

```js
// This whole line is a comment.
var chance = 60; // Only the text after the two slashes is a comment.
```

**Text** is written in quotation marks: `"Dox Health"`. You can change the words between
the quotation marks, but both quotation marks must stay.

**Numbers** are written plainly, with no quotation marks: `60`, `1.5`.

**`true` and `false`** mean yes and no. They have no quotation marks.

**Lists** are written between square brackets, with a comma between the entries:

```js
["first", "second", "third"];
```

**Labelled values** are written between curly brackets. Each entry is a label, a colon,
and a value, with a comma after it:

```js
{ file: gwoUnit.dox, path: "max_health", op: "multiply", value: 1.5 }
```

**Names with dots**, such as `gwoUnit.dox` or `gwoCard.upgradeCard`, are ready-made
values and tools that GWO supplies. Type them exactly, with the same capital letters.

**`_.constant("...")`** appears around a lot of text in the card files. It is a wrapper
that the game needs. Change the text inside it, and leave the `_.constant(` and the `)`
in place.

**Leave these parts alone.** Every card file starts with a `define([` block, which lists
the files that the card needs, and a `function (...) {` line after it. Don't change
either of them. The only exception is the `bank.js` address in a loadout card, which you
change to your identifier. The last lines of each file, which are only closing brackets
such as `});`, also stay as they are.

**One mistake stops the whole file.** A missing comma, a missing quotation mark, or a
bracket that is not closed makes the game skip the entire file, not only that line. Every
`(`, `[` and `{` needs its partner `)`, `]` or `}`. In Visual Studio Code, click next to a
bracket and the editor highlights its partner. The
[checker](setup.md#installing-the-checker-recommended) finds these mistakes for you.

---

[← Previous: Setting up your mod](setup.md) · [Contents](../README.md#contents) ·
[Next: Your first card →](first-card.md)
