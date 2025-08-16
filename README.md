# Kingdom Hearts Bingo

Bingo generator for various Kingdom Hearts games.

https://cj-2123.github.io/kh2-exploration-bingo/

![Bingo Board](/img/bingo.jpg "Bingo")

# Instructions

![Instructions](/img/instructions.jpg "Instructions")

1. Select a Game then select Objectives from the drop down menus
2. Choose the settings using the radio buttons under the "Game" and "Objectives" menus.
3. Click "Generate Board" to generate a bingo with your selected settings, game, and objectives list.

- Right clicking a square on the bingo board will mark it with a star
- For standard bingo, click on a Row or Col or Diagonal header to popout those goals.
- If you select "Exploration", a mini bingo board will appear. Use it to set your starting squares, signified with an S, and goal squares if wanted, signified with a G.

![Exploration-Instructions](/img/exploration-instructions.jpg "Exploration")

For using your own list, see the "Custom Bingo Lists" section.

# Overview of Features

This board supports multiple Kingdom Hearts games with a variety of board types and features.

## Goals for Various KH Games

- Kingdom Hearts 1 Randomizer
- Kingdom Hearts 2 Randomizer
- Kingdom Hearts 2 Boss Hunter (Boss goals only)
- Kingdom Hearts 3 Randomizer
- Birth By Sleep Terra, Ventus, and Aqua
- Kingdom Hearts 1 and 2 Combined

Full bingo lists: https://cj-2123.github.io/docs/bingo.html

## Bingo Board Types

**Standard**

- Traditional bingo format that generates a board of random goals.
- Board sizes: 5x5, 4x4, 3x3, 13x13

**Exploration**

- Generates a board with hidden squares and predetermined visible squares.
- Clicking a goal will reveal the squares to the left, right, top, and bottom of it.
- Ability to choose your visible starting squares.
- Ability to also choose goal squares (gold colored squares).
- Board sizes: 5x5, 4x4, 3x3, 13x13

![Bingo Board](/img/exploration.jpg "Exploration Bingo")

**Roguelike**

- Generates a multi-layered board with a start square at the top and a goal square at the bottom
  - 9 layered board if playing KH2 Boss Hunter.
- Each layer reveals 3 squares. Complete one to move on to the next layer.
- The next layer will reveal the square directly below and the squares to the bottom left and the bottom right.
  - The left and right end squares will only reveal 2 squares.
- Red layers and the gold layer are single forced goals. The next layer will be resumed from the previous layer's position.
- Complete the gold layer to win.
- Board sizes: 9 layers, 15 layers, 20 layers

![Bingo Board](/img/roguelike.jpg "Roguelike Bingo")

## Board Features

- Seeded boards for sharing with others.
- Right click to mark squares with stars.
- JSON formatting for standard bingos to use on Bingosync.
- Upload your own bingo .json file for custom goals.
- Popout a specific row or column by clicking on it (Standard Bingo only).

![Bingo Board](/img/popout.jpg "Popout Window")

### Work in Progress

![Bingo Board](/img/bingo-logic-check.jpg "Bingo Logic Check")

- Bingo logic to change lines to purple when getting a bingo

![Bingo Board](/img/bingo-logic.jpg "Bingo Logic")

## Custom Bingo Lists

![Bingo Board](/img/custom.jpg "Custom Bingo Lists")

### How to use custom bingo lists:

1. Select "Custom" for Game. A file chooser will appear below
2. Click "Choose File" and select your .json bingo list
3. Set your settings to whatever you like (seed, bingo mode, and board size)
4. Click the "Generate Board" button to generate a board from your goal list

The list will stay uploaded to the site until you navigate away from the site, or close the browser, or until you upload a different list.

### Requirements

**Bingo File:**

- The .json bingo file must be formatted as follows:

```
[
  {"name": "Goal 1"},
  {"name": "Goal 2"},
  {"name": "Goal 3"},
  {"name": "Goal 4"},
  // more goals here
]
```

<details>
<summary>Sample Custom Json File</summary>
<br>
<pre>
[
	{"name": "Kill a Flux Construct"},
	{"name": "Complete 2 Backpack Koroks"},
	{"name": "Open 10 Chests"},
	{"name": "Obtain all Archaic Armor"},
	{"name": "Open 3 Zonai Outpost Chests"},
	{"name": "Learn 10 Recipes"},
	{"name": "Kill 6 Captain Constructs"},
	{"name": "Die to a Test of Vitality Door"},
	{"name": "Loot 10 ruined Constructs"},
	{"name": "Obtain 100 Arrows"},
	{"name": "Obtain 3 unique Elixirs"},
	{"name": "Obtain 4 Bubbul Gems"},
	{"name": "Obtain 6 Korok Seeds"},	
	{"name": "Obtain 10 Construct Horns"},
	{"name": "Activate 4 Towers"},
	{"name": "Activate 7 Towers"},
	{"name": "Defend Kara Kara Bazaar"},
	{"name": "Free Yunobo"},
	{"name": "Return Tulin's Bow"},
	{"name": "Obtain a Kings Scale"},
	{"name": "Kill a Miniboss Emitter/Cannon only"},
	{"name": "Kill a Miniboss with Seal-Toy Weapon only"},
	{"name": "Kill a White Lynel without Ancient Blades"},
	{"name": "Kill a Phantom Ganon after parrying 4 attacks"},
	{"name": "Kill 3 unique Hinox Types"},
	{"name": "Kill 3 unique Talus Types"},
	{"name": "Kill 3 unique Frox Types"},
	{"name": "Kill a Molduga"},
	{"name": "Kill a Gleeok"},
	{"name": "Kill a King Gleeok"},
	{"name": "Kill 4 Minibosses in the Sky"},
	{"name": "Kill 4 Minibosses in the Depths"},
	{"name": "Kill 4 Minibosses on the Surface"},
	{"name": "Kill an enemy while controlling a vehicle"},
	{"name": "Kill a Keese with an Ancient Blade"},
	{"name": "Cook a Copius Seafood Skewer"},
	{"name": "Cook a Copius Mushroom Skewer"},
	{"name": "Cook a Noble Pursuit"},
	{"name": "Complete the Secret Room"},
	{"name": "Cook a Dark Curry"},
	{"name": "Cook a Cake/Pie"},
	{"name": "Clear 4 Blessing Shrines"},
	{"name": "Clear 8 Shrines in the Sky"},
	{"name": "Dye something Light Blue"},
	{"name": "Clear Eventide Island"},
	{"name": "Clear 4 Shrines on the Surface"},
	{"name": "Clear 3 Proving Grounds"},
	{"name": "Clear 10 Shrines"},
	{"name": "Complete 5 Tree Stump Koroks"},
	{"name": "Complete 'Strongest in the World'"},
	{"name": "Complete 'Gloom-Borne Illness'"},
	{"name": "Complete 'The Ultimate Dish?'"},
	{"name": "Complete 'A New Champion's Tunic'"},
	{"name": "Save Korok Forest"},
	{"name": "Complete 'The High Spring and the Light Rings'"},
	{"name": "Complete 'Ousting the Giants'"},
	{"name": "Complete 2 Bring Peace-Quests"},
	{"name": "Obtain 3.000 Rupees"},
	{"name": "Obtain one of each Gemstone (7)"},
	{"name": "Obtain a Magic Scepter, Rod and Staff"},
	{"name": "Obtain all Mighty Zonaite Weapons + Zonaite Bow"},
	{"name": "Obtain the Full Fierce Deity Set"},
	{"name": "Obtain the Full Barbarian Set"},
	{"name": "Obtain the Full Phantom Set"},
	{"name": "Obtain the Full Ember Set"},
	{"name": "Obtain the Full Frostbite Set"},
	{"name": "Obtain the Full Yiga Clan Set"},
	{"name": "Obtain a Zora, Rito, Gerudo and Goron Equipment"},
	{"name": "Obtain 4 Legendary Equipment"},
	{"name": "Obtain 3 Paraglider Fabrics"},
	{"name": "Obtain 3 Schema Stones"},
	{"name": "Obtain 4 Yiga Schematics"},
	{"name": "Obtain 5 Ancient Blades"},
	{"name": "Obtain 4 Sage's Wills"},
	{"name": "Obtain 300 Poes"},
	{"name": "Obtain all unique Like-Like Stones"},
	{"name": "Obtain 5 Large Zonai Charges"},
	{"name": "Obtain 10 Golden Apples"},
	{"name": "Obtain 15 unique Zonai Devices"},
	{"name": "Obtain 1 Glide armor piece"},
	{"name": "Obtain 2 Coliseum Rewards"},
	{"name": "Obtain 2 Stamina Vessels"},
	{"name": "Obtain 3 Heart Containers"},
	{"name": "Obtain 3 Energy Wells"},
	{"name": "Obtain 5 Old Maps"},
	{"name": "Obtain an Inventory Upgrade"},
	{"name": "Obtain 3 3-Shot Bows"},
	{"name": "Obtain 3 69+ Damage Weapons"},
	{"name": "Obtain Majora's Mask"},
	{"name": "Obtain the Biggoron's Sword"},
	{"name": "Obtain the Fierce Deity Sword"},
	{"name": "Obtain the Tunic of the Depths"},
	{"name": "Obtain Zelda's Torch"},
	{"name": "Obtain 2 Divine Helms"},
	{"name": "Obtain Autobuild"},
	{"name": "Obtain Camera"},
	{"name": "Open 10 Chests in Wells"},
	{"name": "Get Bokoblin Mask"},
	{"name": "Open 5 Chests in the Fire Temple"},
	{"name": "Open 5 Chests in the Wind Temple"},
	{"name": "Open 5 Chests in the Water Temple"},
	{"name": "Win a Ruby from Test of Strength"},
	{"name": "Dye something Crimson"},
	{"name": "Dye something Peach"},
	{"name": "Discard 2 Diamonds in a Chasm"},
	{"name": "Get all 3 Game Over Screens"},
	{"name": "Tame a Giant Horse"},
	{"name": "Tame the Golden Horse"},
]
</pre>>
</details>
<br>

**Size Requirements:**

- 3x3 needs at least 9 goals
- 4x4 needs at least 16 goals
- 5x5 needs at least 25 goals
- 13x13 needs at least 169 goals
- Roguelike 9 layers needs at least 38 goals
- Roguelike 15 layers needs at least 82 goals
- Roguelike 20 layers needs at least 169 goals

# Local Use

To use locally, open "index.html".
Instructions and info are on the page and readme.

Goals can be edited in the "kh_goals.js" file.

# Credits

Icons from https://www.khwiki.com and https://televo.github.io/kingdom-hearts-recollection/

Kingdom Hearts 1 Bingo Goals created by the KH1 Rando Community: https://discord.gg/xPPCNDPdmG with their google sheets based generator: https://docs.google.com/spreadsheets/d/1v44eTIGJwF9aWlIVuuu6S1GxV2LNB39yG8mYXZc9GE8/edit#gid=930275297

Kingdom Hearts 2 Bingo Goals created by the KH2 Rando Community: https://discord.com/invite/KH2FMRando

Originally developed by lepelog for BotW: https://lepelog.github.io/botw-bingo

Fork originally developed by butchie1331 and the Hollow Knight speedrun community for Hollow Knight: https://butchie1331.github.io/hk-exploration-bingo
