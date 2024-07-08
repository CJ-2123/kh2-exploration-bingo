# Kingdom Hearts Bingo

Bingo generator for various Kingdom Hearts games.

https://cj-2123.github.io/kh2-exploration-bingo/

![Bingo Board](/img/bingo.jpg "Bingo")

# Overview of Features

This board supports multiple Kingdom Hearts games with a variety of board types and features.

## Goals for Various KH Games

- Kingdom Hearts 1 Randomizer
- Kingdom Hearts 2 Randomizer
- Kingdom Hearts 2 Boss Hunter (Boss goals only)
- Kingdom Hearts 1 and 2 Combined

## Bingo Board Types

Standard

- Traditional bingo format that generates a board of random goals.
- Board sizes: 5x5, 4x4, 3x3, 13x13

Exploration

- Generates a board with hidden squares and predetermined visible squares.
- Ability to choose your visible starting squares.
- Ability to also choose goal squares (gold colored squares).
- Board sizes: 5x5, 4x4, 3x3, 13x13

![Bingo Board](/img/exploration.jpg "Exploration Bingo")

Roguelike

- Generates a 20 layered board with a start square at the top and a goal square at the bottom
  - 9 layered board if playing KH2 Boss Hunter.
- Each layer reveals 3 squares. Complete one to move on to the next layer.
- The next layer will reveal the square directly below and the squares to the bottom left and the bottom right.
  - The left and right end squares will only reveal 2 squares.
- Red layers and the gold layer are single forced goals. The next layer will be resumed from the previous layer's position.
- Complete the gold layer to win.

![Bingo Board](/img/roguelike.jpg "Roguelike Bingo")

## Board Features

- Seeded boards for sharing with others.
- Right click to mark squares with stars.
- Popout a specific row or column by clicking on it (Standard Bingo only).
- JSON formatting for standard bingos to use on Bingosync.
- Upload your own bingo .json file for custom goals.

## Custom Bingo Lists

![Bingo Board](/img/custom.jpg "Custom Bingo Lists")

### How to use custom bingo lists:

1. Click "Choose File" and select your .json bingo list
2. Set your settings to whatever you like (seed, bingo mode, and board size)
3. Click the "Custom" button to generate a board from your goal list

The list will stay uploaded to the site until you close the page or browser, or until you upload a different list.

### Requirements

Bingo File:

- The .json bingo file must be formatted as follows:

`[ {"name": "Goal 1"},
{"name": "Goal 2"},
{"name": "Goal 3"},
{"name": "Goal 4"},
...]`

Size Requirements:

- 3x3 needs at least 9 goals
- 4x4 needs at least 16 goals
- 5x5 needs at least 25 goals
- 13x13 needs at least 169 goals
- Roguelike needs at least 260 goals

# Local Use

To use locally, open "index.html".
Instructions and info are on the page and readme.

Goals can be edited in the "kh_goals.js" file.

# Credits

Kingdom Hearts 1 Bingo Goals created by the KH1 Rando Community: https://discord.gg/xPPCNDPdmG

Kingdom Hearts 2 Bingo Goals created by the KH2 Rando Community: https://discord.com/invite/KH2FMRando

Originally developed by lepelog for BotW: https://lepelog.github.io/botw-bingo

Fork originally developed by butchie1331 and the Hollow Knight speedrun community for Hollow Knight: https://butchie1331.github.io/hk-exploration-bingo
