# Bot.cpp
This file contains the abstraction for finding the best move. It also acts as a consolidation point for all the different modules of the engine.

## get_best_move
This function is the entry point for finding the best move. It first check the game stage and then calls the appropriate function to find the best move. If the game is in the opening stage, it calls the `opening_move` function. If the game is in the middle game stage, it calls the `middle_game_x_thread` function with a depth determined by the `determineDepth` function. If the game is in the endgame stage, it calls the `middle_game_x_thread` function with a fixed depth of 11.
```cpp
std::string Bot::get_best_move(Board& board, char colour, int depth=-1) {
    if (this->game_stage == 'o') return Bot::opening_move(board.getFen(), colour);
    else if (this->game_stage == 'm'){
        int d = depth == -1 ? Bot::determineDepth(board) : depth;
        return this->middle_game_x_thread(d, board, colour);
    }else {
        return this->middle_game_x_thread(11, board, colour);
    }
}
```