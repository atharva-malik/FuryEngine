# Search

This file contains the main logic for the move search algorithm, which creates a game tree and explores it to find the best move.

## Search Move
The `search_move` function is the entry point for searching the best move. It takes in a move, the current board state, the search depth, and the player's colour. It makes the move on the board, calls the `negamax` function to evaluate the position, and then undoes the move.

```cpp
float Bot::search_move(Move move, Board board, int depth, int colour){
    float evaluation = 0;
    board.makeMove(move);
    evaluation = this->negamax(depth, -9999, 9999, board) * -colour;
    board.unmakeMove(move);
    return evaluation;
}
```

## Minimax with Alpha-Beta Pruning
The `minimax` function implements the minimax algorithm with alpha-beta pruning. It recursively explores the game tree to a specified depth, evaluating positions using the `eval_mid` function. The function returns the best evaluation score for the maximising or minimising player.

Even though it is no longer used, I left it here for future reference.

```cpp
float Bot::minimax(int depth, float alpha, float beta, bool maximizing_player, Board& board){
    std::pair<GameResultReason, GameResult> isGameOver = board.isGameOver();
    if (isGameOver.first == GameResultReason::CHECKMATE){
        if (board.sideToMove() == Color::WHITE) return -9999.0f;
        else return 9999.0f;
    } else if (!(isGameOver.first == GameResultReason::NONE)){
        return 0.0f;
    }
    else if (depth == 0) return this->eval_mid(board);

    Move move = Move();
    Movelist moves = Movelist();
    movegen::legalmoves(moves, board);
    if (maximizing_player){
        float maxEval = -9999.0f;
        float evaluation = 0;
        order_moves(moves, board);
        for (int i = 0; i < moves.size(); i++){
            move = moves[i];
            board.makeMove(move);
            evaluation = this->minimax(depth - 1, alpha, beta, false, board);
            board.unmakeMove(move);
            maxEval = std::max(maxEval, evaluation);
            alpha = std::max(alpha, evaluation);
            if (beta <= alpha) break;  // Beta cutoff
        }
        return maxEval;
    }
    else{
        float minEval = 9999.0f;
        float evaluation = 0;
        order_moves(moves, board);
        for (int i = 0; i < moves.size(); i++){
            move = moves[i];
            board.makeMove(move);
            evaluation = this->minimax(depth - 1, alpha, beta, true, board);
            board.unmakeMove(move);
            minEval = std::min(minEval, evaluation);
            beta = std::min(beta, evaluation);
            if (beta <= alpha) break;  // Beta cutoff
        }
        return minEval;
    }
}
```

## Negamax with Alpha-Beta Pruning
The `negamax` function is a variant of the minimax algorithm that simplifies the implementation by using a single function for both players. It is also ever so slightly faster than minimax as it doesn't need to check for maximising or minimising player and is simpler to implement with the NNUE.

Similar to minimax, it uses alpha-beta pruning to eliminate branches that won't affect the final decision.

```cpp
float Bot::negamax(int depth, float alpha, float beta, Board& board){
    std::pair<GameResultReason, GameResult> isGameOver = board.isGameOver();
    if (isGameOver.first == GameResultReason::CHECKMATE){
        return -9999.0f * depth; //* Prefer faster checkmates
    } else if (!(isGameOver.first == GameResultReason::NONE)){
        return 0.0f;
    }
    else if (depth == 0) return evaluate_fen_nnue(board.getFen());

    Move move = Move();
    Movelist moves = Movelist();
    movegen::legalmoves(moves, board);
    float best_eval = -999999999999.9f;
    float evaluation = 0;
    order_moves(moves, board);
    for (auto move : moves) {
        // move = moves[i];
        board.makeMove(move);
        evaluation = -this->negamax(depth - 1, -beta, -alpha, board);
        board.unmakeMove(move);
        best_eval = std::max(best_eval, evaluation);
        alpha = std::max(alpha, evaluation);
        if (beta <= alpha) break;  // Beta cutoff
    }
    return best_eval;
}
```