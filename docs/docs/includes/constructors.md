# Constructors
This module provides the implementations for all of the bot class constructors used in the Fury Engine.

## Bot()
The default constructor for the Bot class. It initializes the bot with default values.

```cpp
Bot::Bot() {
    this->board.setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    this->game_stage = 'o';
    if (!this->load_openings_data()) {
        this->game_stage = 'm';
    }
}
```
## Bot(std::string fen)
This constructor initialises the bot with a specific board position given in FEN notation. It also determines the game stage based on the position.

```cpp
Bot::Bot(std::string fen) {
    this->board.setFen(fen);
    this->game_stage = 'o';
    if (!this->load_openings_data()) {
        this->game_stage = 'm';
    }
}
```

## Bot(std::string fen, char game_stage)
This constructor initialises the bot with a specific board position given in FEN notation and a specified game stage.

```cpp
Bot::Bot(std::string fen, char game_stage) {
    this->board.setFen(fen);
    this->game_stage = game_stage;
    if (game_stage == 'o' && !this->load_openings_data()) {
        this->game_stage = 'm';
    }
}
```