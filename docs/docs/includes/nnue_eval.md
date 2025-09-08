# NNUE Eval
This is the adaptation of the NNUE library that I wrote for my chess engine.

## init_nnue
This function initialises the NNUE network by loading the weights from a specified file. It only needs to be called once at the start of the program.
```cpp
void init_nnue(char *filename)
{
    // call NNUE probe lib function
    nnue_init(filename);
}
```

## evaluate_nnue
This function evaluates the current board position using the NNUE network. It takes an integer representation of the pieces and the squares and returns an evaluation score. Although I adapted it, I never actually ended up using it in the engine.
```cpp
int evaluate_nnue(int player, int *pieces, int *squares)
{
    // call NNUE probe lib function
    return nnue_evaluate(player, pieces, squares);
}
```

## evaluate_fen_nnue
This function evaluates a position given in FEN (Forsyth-Edwards Notation) format using the NNUE network. It divides the NNUE's output by 100.0f to convert it to centipawns, which is a common unit for chess evaluation scores, and by 2.0f to adjust the scale of the evaluation as it tends to score around twice as high as Stockfish's evaluations.
```cpp
float evaluate_fen_nnue(std::string fen)
{
    return nnue_evaluate_fen((char *)fen.c_str())/200.0f;
}
```