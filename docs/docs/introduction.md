# Fury Engine
To use this engine, you need to either host it on Lichess or run it locally. To run it locally, you need a GUI that supports UCI (Universal Chess Interface). For more information, check out the [Quick Start](/quickstart/quickstart.md) page.

## Hierarchy
This bot has been separated into a main `bot.h` header file and multiple source files as shown below. Each file in the folder is responsible for a specific part of the engine. The `bot.h` file contains the main class and the main function, while the other files contain the implementation of various features. You can find the following folder structure under `Engine\includes`:
```
└── 📁includes
    └── 📁3rdparty
        └── chess.hpp
        └── json.hpp
    └── 📁NNUE
        └── misc.cpp
        └── misc.h
        └── nnue.cpp
        └── nnue.h
        └── v4.nnue
    └── 📁OpeningBook
        └── book.json
    └── bot.cpp
    └── bot.h
    └── bothelpers.cpp
    └── constructors.cpp
    └── evaluate.cpp
    └── exceptions.cpp
    └── findmove.cpp
    └── helpers.cpp
    └── nnue_eval.cpp
    └── openings.cpp
    └── search.cpp
    └── ucibot.cpp
```
## Approach
Each file is explained in detail in the following pages. The main approach of the engine is to use a combination of different techniques to achieve a high level of performance. The engine uses a combination of alpha-beta pruning, transposition tables, and a custom evaluation function to achieve this. The engine also uses a custom opening book to improve its performance in the opening phase of the game.

The files themselves are thoroughly commented, so you can easily understand what each file does. 

The intent is that each file document's itself, so along with reading the docs, you can also read the code itself. The code is written in a clean and simple manner, so you can easily understand what each file does. The code is also well-structured, so you can easily find what you are looking for.

With that said, let's delve into each file and function in detail.
