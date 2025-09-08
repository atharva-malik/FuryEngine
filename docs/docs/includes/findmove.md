# Find Move
This module is responsible for finding the best move for the current position. It has functions for searching the game tree with and without threads. Threading is obviously faster and is therefore the default method. The non-threaded version is there if you want to use it in a single-threaded environment.

## middle_game_x_thread
This function is the entry point for finding the best move in the middle game using multiple threads. It creates a thread for each legal move and searches the game tree to a specified depth. It uses the `negamax` function to perform the search and returns the best move found.
```cpp
std::string Bot::middle_game_x_thread(int depth, Board& board, char colour){
    Movelist moves = Movelist();
    movegen::legalmoves(moves, board);
    order_moves(moves, board);
    
    float evaluation;
    Move move = Move();

    //? If there are significant slowdowns, consider using a fixed number of threads instead of one per move.
    const int num_iterations = moves.size(); 
    std::vector<std::thread> threads;
    std::vector<std::pair<double, std::string>> data(num_iterations); // Vector to store results and moves
    std::mutex results_mutex; // Mutex to protect access to the results vector. //!IMPORTANT!

    // Create and start a thread for each iteration.
    for (int i = 0; i < num_iterations; ++i) {
        threads.emplace_back(
            // Use a lambda function to capture 'i' by value and handle the result.
            [&, i]() {
                float result = this->search_move(moves[i], board, depth, 1); // Calculate the result
                // Use a lock_guard to ensure thread-safe access to the results vector.
                std::lock_guard<std::mutex> guard(results_mutex);
                data[i].first = result; // Store the result in the correct position.
                data[i].second = uci::moveToUci(moves[i]); // Store the move in the correct position.
            }
        );
    }

    for (auto& thread : threads) {
        if (thread.joinable())
            thread.join();
    }

    std::sort(data.begin(), data.end(), [](auto &a, auto &b) {
        return a.first > b.first;
    });

    return data[0].second;
}
```

## middle_game_move
This function is the entry point for finding the best move in the middle game without using threads. It generates all legal moves, orders them, and then searches the game tree to a specified depth using the `negamax` function. It returns the best move found.
```cpp
std::string Bot::middle_game_move(int depth, Board& board, char colour){
    float best_eval;
    Move best_move = Move();
    Movelist moves = Movelist();
    movegen::legalmoves(moves, board);
    float evaluation;
    Move move = Move();

    if (colour == 'w') {
        best_eval = -99999999999.0f;
        order_moves(moves, board);
        for (int i = 0; i < moves.size(); i++) {
            move = moves[i];
            board.makeMove(move);
            evaluation = this->minimax(depth, -9999, 9999, false, board);
            board.unmakeMove(move);
            if (evaluation > best_eval) {
                best_eval = evaluation;
                best_move = move;
                if (best_eval == 9999.0f) break; //* Break if mate
            }
        }
    }
    else {
        best_eval = 99999999999.0f;
        order_moves(moves, board);
        for (int i = 0; i < moves.size(); i++){
            Move move = moves[i];
            board.makeMove(move);
            evaluation = this->minimax(depth, -9999, 9999, true, board);
            board.unmakeMove(move);
            if (evaluation < best_eval){
                best_eval = evaluation;
                best_move = move;
                if (best_eval == -9999.0f) break; //* Break if mate
            }
        }
    }
    return uci::moveToUci(best_move);
}
```