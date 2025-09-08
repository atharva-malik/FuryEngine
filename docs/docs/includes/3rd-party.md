# 3rd Party Stuff

This chess engine uses three 3rd party libraries to actually function and one to train the neural network. So, starting with the main one:

## Chess.hpp

For this chess engine, I used [Max's](https://github.com/Disservin/chess-library) library called chess.hpp. It is a header-only C++ library that provides a simple and extremely efficient way to represent a chess game, as you can see in the [sprint logs](https://github.com/atharva-malik/FuryEngine/blob/master/SprintLogs.md). It provides a simple API to make moves, undo moves, and check the game state and is the backbone of my implementation of a chess engine. I can't thank him enough, as without his easy, efficient, and well-documented library, I would not have been able to make this chess engine.

## JSON for Modern C++

Again, another header-only C++ library, this one is by [Niels Lohmann](https://github.com/nlohmann/json). This library is used to read the opening book that I made. It is a simple and easy-to-use library that provides a simple API to parse and serialize JSON data. I love this library, and can't recommend it any more.

## NNUE Prober
This is a small library that I found on GitHub that allows you to use NNUE networks in your chess engine. Written by [Daniel Shawul](https://github.com/dshawul/nnue-prober), it is a well written library that supporters probing NNUE networks. I just had to write up a quick abstraction layer to use it in my engine and it worked perfectly! And although an NNUE was not essential to the chess engine, I am very thankful to Daniel for making this library, as it made my life a lot easier and made the bot a lot better.