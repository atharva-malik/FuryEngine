# Bot.h
This header file contains the declarations for the Bot class and its member functions. It also contains the piece tables structure.

## Piece Tables
This structure contains the piece-square tables for each piece type. Each table is an 8x8 array that assigns a value to each square on the board for that piece type. The values are used in the evaluation function to determine the positional value of a piece on a given square. The values for the black pieces are the opposite of the values for the white pieces, as the board is mirrored for black.

### Pawns
The goal with the pawn is twofold: to encourage them to shelter the king, push them for the mid and punish creating holes in the castle and to encourage them to advance and try to promote in the endgame. Since the pawns on the sides are likely to promote, they are given higher values for advancing. 

```cpp
    int w_pawn[8][8] = {
        {100,100,100,100,100,100,100,100}, 
        {150,150,150,150,150,150,150,150}, 
        {100,100,120,130,130,120,100,100}, 
        {100,100,110,125,125,110,100,100}, 
        {100,100,100,120,120,100,100,100}, 
        {105, 95, 90,100,100, 90, 95,105}, 
        {105,110,110, 80, 80,110,110,105}, 
        {100,100,100,100,100,100,100,100}
    };

    int w_pawn_end[8][8] = {
        {100,100,100,100,100,100,100,100}, 
        {160,150,150,150,150,150,150,160}, 
        {140,135,135,135,135,135,135,140}, 
        {125,120,120,120,120,120,120,125}, 
        {115,110,110,110,110,110,110,115}, 
        {107,105,105,105,105,105,105,107}, 
        {100,100,100,100,100,100,100,100}, 
        {100,100,100,100,100,100,100,100}
    };
```
### Knights
The goal with the knights is to try and get them as close to the middle as possible as that is where they can control the most squares. The edges are also punished as they cannot contribute meaningfully to the game. 

```cpp
    int w_knight[8][8] = {
        {250,240,270,270,270,270,260,250},
        {260,280,300,300,300,300,280,260},
        {270,300,310,315,315,310,300,270},
        {270,305,315,320,320,315,305,270},
        {270,300,315,320,320,315,300,270},
        {270,305,310,315,315,310,305,270},
        {260,280,300,305,305,300,280,260},
        {250,260,270,270,270,270,260,250}
    };
```
### Bishops
The goal with the bishops is to try to suggest diagonal lines. This value tables suggests fianchettoing the bishops or placing them near the mid, or on long diagonals.
```cpp
    int w_bishop[8][8] = {
        {280,290,290,290,290,290,290,280},
        {290,300,300,300,300,300,300,290},
        {290,300,305,310,310,305,300,290},
        {290,305,305,310,310,305,305,290},
        {290,300,310,310,310,310,300,290},
        {290,310,310,310,310,310,310,290},
        {290,305,300,300,300,300,305,290},
        {280,290,290,290,290,290,290,280}
    };
```
### Rooks
The goal with the rook is simple. The bot should want them to centralise and attack the seventh rank as that is their most potent rank.
```cpp
    int w_rook[8][8] = {
        {500,500,500,500,500,500,500,500}, 
        {510,515,515,515,515,515,515,510}, 
        {495,500,500,500,500,500,500,495}, 
        {495,500,500,500,500,500,500,495}, 
        {495,500,500,500,500,500,500,495}, 
        {495,500,500,500,500,500,500,495}, 
        {495,500,500,500,500,500,500,495}, 
        {500,500,500,510,510,500,500,500}
    };
```
### Queens
Since the queens is the most powerful piece, there really is not a square where she is not useful. However the bot should try and keep her engaged, therefore the positives in the middle and negatives on the edges.
```cpp
    int w_queen[8][8] = {
        {880,890,890,895,895,890,890,880},
        {890,900,900,900,900,900,900,890},
        {890,900,905,905,905,905,900,890},
        {895,900,905,905,905,905,900,895},
        {900,900,905,905,905,905,900,895},
        {890,905,905,905,905,905,900,890}, 
        {890,900,905,900,900,900,900,890}, 
        {880,890,890,895,895,890,890,880}
    };
```
### Kings
The king is the most interesting piece to evaluate. In the opening the bot should try and keep the king safe, and in the endgame the bot should want him to try and help the pawns promote. I also like king-side castling slightly more, thus the ever so slight bias towards the king-side.
```cpp
    int w_king_mid[8][8] = {
        { 9970, 9960, 9960, 9950, 9950, 9960, 9960, 9970}, 
        { 9970, 9960, 9960, 9950, 9950, 9960, 9960, 9970}, 
        { 9970, 9960, 9960, 9950, 9950, 9960, 9960, 9970}, 
        { 9970, 9960, 9960, 9950, 9950, 9960, 9960, 9970}, 
        { 9980, 9970, 9970, 9960, 9960, 9970, 9970, 9980}, 
        { 9990, 9980, 9980, 9980, 9980, 9980, 9980, 9990}, 
        { 9990, 9980, 9980, 9980, 9980, 9980, 9980, 9990}, 
        {10020,10050,10010, 9980,10000, 9980,10055,10020}
    };

    int w_king_end[8][8] = {
        {9950, 9960,  9970,  9980,  9980,  9970, 9960, 9950},
        {9970, 9980,  9980, 10000, 10000,  9980, 9980, 9970},
        {9970, 9980, 10020, 10030, 10030, 10020, 9980, 9970},
        {9970, 9980, 10030, 10030, 10030, 10030, 9980, 9970},
        {9970, 9980, 10030, 10030, 10030, 10030, 9980, 9970},
        {9970, 9980, 10020, 10030, 10030, 10020, 9980, 9970},
        {9970, 9970, 10000, 10000, 10000, 10000, 9970, 9970},
        {9950, 9970,  9970,  9970,  9970,  9970, 9970, 9950},
    };
```
## Bot Class
This class contains the member functions for the operation of the bot. It is fully self-explanatory so I will not go into detail here.

```cpp
class Bot{
    public:
        Bot();
        Bot(std::string fen, char game_stage);
        Bot(std::string fen);

        Board board;

        static void print_board(Board board);
        
        std::string get_best_move(Board& board, char colour, int depth);
        
        static void LogToFile(const std::string& message);

        float stat_eval(Board board, int depth);

    private:
        json openings_data;
        PieceTables piece_tables;
        char game_stage = 'o';
        int piece_values[13] = {1, 3, 3, 5, 9, 100, 1, 3, 3, 5, 9, 100, 0};
        
        std::string opening_move(const std::string& fen, char colour);
        std::string middle_game_move(int depth, Board& board, char colour);
        std::string middle_game_x_thread(int depth, Board& board, char colour);
        std::string end_game_move(int depth, Board& board, char colour);

        // Helper functions
        float minimax(int depth, float alpha, float beta, bool maximizing_player, Board& board);
        float negamax(int depth, float alpha, float beta, Board& board);
        
        float eval_mid(Board board);
        float eval_end(Board board);
        
        // Helpers for the Helpers
        std::string convert_fen(std::string fen);
        std::string OpeningBookPath = "includes\\OpeningBook\\book.json";
        
        int determineDepth(const Board& board);
        int get_random_index(const std::vector<std::string>& vec);
        
        float search_move(Move move, Board board, int depth, int colour);
        float calculate_phase(Board board);
        
        bool isCheck(Move move, Board& board);
        bool load_openings_data();

        void order_moves(Movelist& moves, Board& board);
};
```