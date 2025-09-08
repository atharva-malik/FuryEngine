# Bot Helpers
This module provides helper functions used internally by the Bot class to support move ordering, game phase analysis, logging, and board state formatting.

## order_moves
This function orders a list of possible moves based on their strategic value. It prioritises moves that involve captures, checks, castling, and promotions. The scoring system assigns higher scores to more advantageous moves, which helps the engine evaluate the most promising options first during its search allowing it to eliminate less favourable moves quickly, leading to faster decision-making.

```cpp
void Bot::order_moves(Movelist& moves, Board& board){
    std::vector<std::pair<int, Move>> scored_moves;
    int scores[13] = {1, 3, 3, 5, 9, 10, 1, 3, 3, 5, 9, 10, 0};
    for (const auto& move : moves) {
        int score = 0;

        if (move.typeOf() == Move::CASTLING){
            score += 100; // prioritise castling
        } else if (board.isCapture(move)) {
            Square from = move.from();
            Square to = move.to();
            int capturedPiece = board.at(to);
            int aggressivePiece = board.at(from);
            score += 950 + (scores[capturedPiece] - scores[aggressivePiece]) * 100;
        }
        
        if (this->isCheck(move, board)) {
            score += 300; // prioritise checks
        }

        if (move.typeOf() == Move::PROMOTION) {
            score += 500; // prioritise promotions
        }
        scored_moves.push_back({score, move});
    }
    std::sort(scored_moves.begin(), scored_moves.end(), [](const std::pair<int, Move>& a, const std::pair<int, Move>& b) {
        return a.first > b.first;
    });

    moves.clear();
    for (const auto& scored_move : scored_moves) {
        moves.add(scored_move.second);
    }
}
```

## isCheck
This function checks if a given move results in a check against the opponent's king. 
```cpp
bool Bot::isCheck(Move move, Board& board) {
    Color stm = board.sideToMove();
    int square = 0;
    if (stm == Color(0)) {
        square = board.pieces(PieceType("KING"), Color(1)).lsb();
    } else {
        square = board.pieces(PieceType("KING"), Color(0)).lsb();
    }
    Square king(square);
    board.makeMove(move);
    bool is_check = board.isAttacked(king, stm);
    board.unmakeMove(move);
    return is_check;
}
```

## determineDepth
This function determines the search depth for the engine based on the current game state. It considers the number of remaining pieces and pawns to infer the game phase. It returns a deeper search depth in simplified/endgame scenarios as that allows for more complex tactics to be spotted. It also updates internal game_stage indicator when transitioning to endgame.
```cpp
int Bot::determineDepth(const Board& board) {
    int pieceCount = 0;
    int pawnCount = 0;
    Bitboard pawns = board.pieces(PieceType::PAWN);
    pawnCount = pawns.count();
    Bitboard r = board.pieces(PieceType::ROOK);
    Bitboard b = board.pieces(PieceType::BISHOP);
    Bitboard q = board.pieces(PieceType::QUEEN);
    Bitboard k = board.pieces(PieceType::KNIGHT);
    Bitboard K  = board.pieces(PieceType::KING);
    pieceCount = r.count() + b.count() + q.count() + k.count() + K.count() + pawnCount;

    if (this->game_stage == 'e') {
        return 11;
    }

    if (pieceCount > 28 && pawnCount > 12) {
        return 3;
    } else if (pieceCount > 22 && pawnCount > 8) {
        return 5;
    // } else if (pieceCount > 5 && pawnCount > 1) {
    //     return 7; //! Uncomment this if you don't mind slightly longer thinking times
    } else {
        this->game_stage = 'e';
        return 11;
    }
}
```

## LogToFile
This function logs the message provided to a file named "log.txt".
```cpp
void Bot::LogToFile(const std::string& message) {
    std::ofstream outfile("log.txt", std::ios_base::app);
    outfile << message << std::endl;
}
```
## calculate_phase
'Phase' is a numerical representation of the game's progress from opening to endgame. This function calculates the current phase based on the pieces remaining on the board. It uses a weighted material-based phase model where fewer heavy pieces indicate a transition to the endgame. Lastly, it scales the result to a 0–256 range.
```cpp
float Bot::calculate_phase(Board board){
    float phase;
    float PawnPhase = 0;
    float KnightPhase = 1;
    float BishopPhase = 1;
    float RookPhase = 2;
    float QueenPhase = 4;
    float TotalPhase = PawnPhase*16 + KnightPhase*4 + BishopPhase*4 + RookPhase*4 + QueenPhase*2;

    phase = TotalPhase;

    phase -= board.pieces(PieceType::PAWN).count() * PawnPhase;
    phase -= board.pieces(PieceType::KNIGHT).count() * KnightPhase;
    phase -= board.pieces(PieceType::BISHOP).count() * BishopPhase;
    phase -= board.pieces(PieceType::ROOK).count() * RookPhase;
    phase -= board.pieces(PieceType::QUEEN).count() * QueenPhase;

    phase = (phase * 256 + (TotalPhase / 2)) / TotalPhase;
    return phase;
}
```

## convert_fen
This function converts a full FEN string to a simplified version used internally.
```cpp
std::string Bot::convert_fen(std::string fen) {
    std::string converted_fen;
    converted_fen = fen.erase(fen.length() - 4, 4);
    return converted_fen;
}
```

## get_random_index
This function generates a random index from a given vector. It is used for randomised behavior such as picking between equally viable moves.
```cpp
int Bot::get_random_index(const std::vector<std::string>& vec){
    if (vec.empty()) {
        std::cerr << "Warning: Vector is empty. Returning 0." << std::endl;
        return 0;
    }

    static std::random_device rd; // Static for persistent engine
    static std::mt19937 gen(rd());  // Static for persistent engine

    std::uniform_int_distribution<> distrib(0, vec.size() - 1);
    return distrib(gen);
}
```

## print_board
This function prints the current state of the board to the console in a human-readable format.
```cpp
void Bot::print_board(Board board) {
    std::cout << board << std::endl;
    Bot::LogToFile("Board printed: " + board.getFen());
}
```
