# UCI Bot Integration

This file contains a simple implementation of a UCI (Universal Chess Interface) bot class. 

## Class Definition
The `UciPlayer` class has a simple implementation of a UCI bot. It is self-explanatory so I won't add any comments here.

```cpp
class UciPlayer {
    public:
        Bot bot;
        UciPlayer();

        //* Uci Methods
        void NotifyNewGame();
        void SetPosition(std::string fen);
        void ProcessPositionCommand(std::string message);
        void ProcessGoCommand(std::string message);
        void Quit();

        //* Essential Bot Methods
        void MakeMove(std::string move);

        std::string getFen();
        std::string getBestMove();
};
```

### The Constructor
A simple one-liner constructor that initialises the bot.

```cpp
UciPlayer::UciPlayer() {
    this->bot = Bot();
}
```

### Notify New Game
This method is called when a new game starts, or when we need to reset the bot's internal state.

```cpp
void UciPlayer::NotifyNewGame() {
    this->bot = Bot();
}
```

### Quit
This method is called when the bot is quitting. It currently does nothing, but can be used to free up resources if needed.

```cpp
void UciPlayer::Quit() {
    UciPlayer::NotifyNewGame();
}
```

### Set Position
This method sets the position of the bot using a FEN string.

```cpp
void UciPlayer::SetPosition(std::string fen) {
    this->bot = Bot(fen);
}
```

### Make Move
This method makes a move on the bot's internal board.

```cpp
void UciPlayer::MakeMove(std::string move) {
    this->bot.board.makeMove(uci::uciToMove(this->bot.board, move));
}
```

### Get FEN
This method returns the current position of the bot in FEN format.

```cpp
std::string UciPlayer::getFen() {
    return this->bot.board.getFen();
}
```

### Get Best Move
This method returns the best move calculated by the bot.

```cpp
std::string UciPlayer::getBestMove() {
    char colour;
    if (this->bot.board.sideToMove() == Color::WHITE) colour = 'w';
    else colour = 'b';
    return this->bot.get_best_move(this->bot.board, colour);
}
```