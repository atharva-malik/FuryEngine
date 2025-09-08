# Helpers
This file contains the helper functions used by the UCI Bot module.

## trim
This function trims the leading and trailing spaces from a string.
```cpp
std::string trim(const std::string& str) {
    auto start = str.find_first_not_of(" \t\n\r");
    auto end = str.find_last_not_of(" \t\n\r");
    if (start == std::string::npos || end == std::string::npos) {
        return "";
    }
    return str.substr(start, end - start + 1);
}
```

## lower
Converts a string to lowercase.
```cpp
std::string lower(std::string s){
    std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c){ return std::tolower(c); });
    return s;
}
```

## split
Splits a string into substrings based on a provided character as a delimiter.
```cpp
std::vector<std::string> split(const std::string& str, char delimiter) {
    std::vector<std::string> tokens;
    std::stringstream ss(str);
    std::string token;

    // Extract substrings separated by the delimiter
    while (std::getline(ss, token, delimiter)) {
        tokens.push_back(token);
    }

    return tokens;
}
```

## Respond
Sends a response to the UCI interface and logs the sent response.
```cpp
void Respond(std::string message) {
    std::cout << message << std::endl;
    Bot::LogToFile("Response sent: " + message);
}
```

## stringContains
Checks if a substring is present in a string.
```cpp
bool stringContains(const std::string& str, const std::string& substring) {
    return str.find(substring) != std::string::npos;
}
```

## TryGetLabelledValue
Tries to extract a value associated with a specific label from a command string.
```cpp
std::string TryGetLabelledValue(const std::string& text, const std::string& label, const std::vector<std::string>& allLabels, const std::string& defaultValue = "") {
    std::string trimmedText = trim(text);

    if (trimmedText.find(label) != std::string::npos) {
        size_t valueStart = trimmedText.find(label) + label.length();
        size_t valueEnd = trimmedText.length();

        for (const std::string& otherID : allLabels) {
            if (otherID != label && trimmedText.find(otherID) != std::string::npos) {
                size_t otherIDStartIndex = trimmedText.find(otherID);
                if (otherIDStartIndex > valueStart && otherIDStartIndex < valueEnd) {
                    valueEnd = otherIDStartIndex;
                }
            }
        }

        return trim(trimmedText.substr(valueStart, valueEnd - valueStart));
    }

    return defaultValue;
}
```

## TryGetLabelledValueInt
Tries to extract an integer value associated with a specific label from a command string as an integer.
```cpp
int TryGetLabelledValueInt(const std::string& text, const std::string& label, const std::vector<std::string>& allLabels, int defaultValue = 0) {
    // Convert the default integer value to a string
    std::string defaultValueStr = std::to_string(defaultValue);
    
    // Call TryGetLabelledValue to extract the potential value string
    std::string valueString = TryGetLabelledValue(text, label, allLabels, defaultValueStr);

    // Find the first value in valueString (before a space if exists)
    std::istringstream valueStream(valueString);
    std::string firstWord;
    valueStream >> firstWord;

    // Convert the extracted word to an integer
    try {
        return std::stoi(firstWord);
    } catch (...) {
        return defaultValue;
    }
}
```

## DisplayOptions
Displays the engine options in UCI format. These are fake options returned to trick the hosting script into thinking that the engine supports all of the UCI options.
```cpp
void DisplayOptions() {
    Respond("id name Fury");
    Respond("id author Atharva\n");

    Respond("option name Move Overhead type spin default 10 min 0 max 5000");
    Respond("option name Debug Log File type string default <empty>");
    Respond("option name NumaPolicy type string default auto");
    Respond("option name Threads type spin default 1 min 1 max 1024");
    Respond("option name Hash type spin default 16 min 1 max 33554432");
    Respond("option name Clear Hash type button");
    Respond("option name Ponder type check default false");
    Respond("option name MultiPV type spin default 1 min 1 max 256");
    Respond("option name Skill Level type spin default 20 min 0 max 20");
    Respond("option name Move Overhead type spin default 10 min 0 max 5000");
    Respond("option name nodestime type spin default 0 min 0 max 10000");
    Respond("option name UCI_Chess960 type check default false");
    Respond("option name UCI_LimitStrength type check default false");
    Respond("option name UCI_Elo type spin default 1320 min 1320 max 3190");
    Respond("option name UCI_ShowWDL type check default false");
    Respond("option name SyzygyPath type string default <empty>");
    Respond("option name SyzygyProbeDepth type spin default 1 min 1 max 100");
    Respond("option name Syzygy50MoveRule type check default true");
    Respond("option name SyzygyProbeLimit type spin default 7 min 0 max 7");
    Respond("option name EvalFile type string default nn-1111cefa1111.nnue");
    Respond("option name EvalFileSmall type string default nn-37f18f62d772.nnue");
    Respond("uciok");
}
```

## ProcessPositionCommand
Processes the "position" command from the UCI interface to set up the board state.
```cpp
void ProcessPositionCommand(std::string message, UciPlayer& player) {
    // FEN
    if (stringContains(lower(message), "startpos")){
        player.SetPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    }
    else if (stringContains(lower(message), "fen")) {
        std::string customFen = TryGetLabelledValue(message, "fen", {"position", "fen", "moves"});
        player.SetPosition(customFen);
    }
    else{
        std::cout << "Invalid position command (expected 'startpos' or 'fen')" << std::endl;
    }

    // Moves
    std::string allMoves = TryGetLabelledValue(message, "moves", {"position", "fen", "moves"});
    if (!allMoves.empty()){
        std::vector<std::string> moveList = split(allMoves, ' ');
        for(auto move : moveList){
            player.MakeMove(move);
        }

        Bot::LogToFile("Make moves after setting position: " + std::to_string(moveList.size()));
    }
}
```

## ProcessGoCommand
Processes the "go" command from the UCI interface to start the engine's move calculation.
```cpp
void ProcessGoCommand(std::string message, UciPlayer& player) {
    Respond("bestmove " + player.getBestMove());
}
```

## clearScreen
Clears the console screen.
```cpp
void clearScreen() {
    #if defined(_WIN32) || defined(_WIN64)
        std::system("cls"); // For Windows
    #else
        std::system("clear"); // For Unix-based systems
    #endif
} 
```

## PrintHelp
Prints the help message for UCI commands.
```cpp
void PrintHelp() {
    Respond("Available commands:");
    Respond("------------------------------------------------");
    Respond("uci               - Display engine identification and options.");
    Respond("isready           - Confirm engine is ready to process commands.");
    Respond("ucinewgame        - Notify engine of a new game start.");
    Respond("eval [-d] <depth> - Evaluate the current position with a specified depth (defaults to 1).");
    Respond("position commands:");
    Respond("   position startpos               - Set up the board with the starting position.");
    Respond("   position startpos moves <moves> - Set up the board with the starting position and apply a sequence of moves.");
    Respond("   position <fen>                  - Set up the board with a specific FEN string.");
    Respond("   position <fen> moves <moves>    - Set up the board with a specific FEN string and apply a sequence of moves.");
    Respond("go commands:");
    Respond("   go movetime [time in ms]                                                               - Calculate the best move based on current position.");
    Respond("   go wtime [time in ms] btime [time in ms]                                               - Calculate the best move based on current position.");
    Respond("   go wtime [time in ms] btime [time in ms] winc [increment in ms] binc [increment in ms] - Calculate the best move based on current position.");
    Respond("perft commands:");
    Respond("   perft [depth]    - Run a perft test at a given depth.");
    Respond("   perft -v [depth] - Run a verbose perft test at a given depth.");
    Respond("quit           - Exit the engine gracefully.");
    Respond("d              - Display the current board state");
    Respond("cls            - Clear the screen.");
    Respond("------------------------------------------------");
}
```

## perft
Runs a perft test to count the number of possible positions from the current board state up to a specified depth.
```cpp
uint64_t perft(int depth, Board board) {
    Movelist moves;
    movegen::legalmoves(moves, board);

    if (depth == 1) {
        return moves.size();
    }

    uint64_t nodes = 0;

    for (const auto& move : moves) {
        board.makeMove<true>(move);
        nodes += perft(depth - 1, board);
        board.unmakeMove(move);
    }

    return nodes;
}
```

## perft_verbose
Runs a verbose perft test to count the number of possible positions from the current board state up to a specified depth, providing detailed output for each move.
```cpp
void perft_verbose(int depth, Board board) {
    Movelist moves;
    movegen::legalmoves(moves, board);
    
    if (depth < 1) {
        Respond("Depth must be at least 1 for perft_verbose.");
        return;
    }
    else if (depth == 1) {
        Respond("nodes: " + std::to_string(moves.size()));
        return;
    }
    uint64_t nodes = 0;
    uint64_t result = 0;
    auto t0 = std::chrono::high_resolution_clock::now();
    for (const auto& move : moves) {
        std::cout << uci::moveToUci(move) << ": ";
        board.makeMove<true>(move);
        result = perft(depth - 1, board);
        std::cout << result << std::endl;
        board.unmakeMove(move);
        nodes += result;
    }
    auto t1 = std::chrono::high_resolution_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(t1 - t0).count();

    Respond("\n\nnodes: " + std::to_string(nodes) + " nps: " + std::to_string((nodes * 1000) / (ms + 1)) + " ms: " + std::to_string(ms));
}
```

## Process Perft Command
Processes the "perft" command from the UCI interface to run a perft test.
```cpp
void ProcessPerftCommand(std::string message, UciPlayer& player) {
    // Extract depth from command
    int depth = TryGetLabelledValueInt(message, "depth", {"perft", "depth"}, 1);
    if (stringContains(lower(message), "-v")) {
        Respond("Running perft with depth " + std::to_string(depth) + " (verbose mode)");
        perft_verbose(depth, player.bot.board);
    } else {
        Respond("Running perft with depth " + std::to_string(depth));
        auto t0 = std::chrono::high_resolution_clock::now();
        auto nodes = perft(depth, player.bot.board);
        auto t1 = std::chrono::high_resolution_clock::now();
        auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(t1 - t0).count();
        Respond("nodes: " + std::to_string(nodes) + " nps: " + std::to_string((nodes * 1000) / (ms + 1)) + " ms: " + std::to_string(ms));
    }
}
```

## ProcessEvalCommand
Processes the "eval" command from the UCI interface to evaluate the current board position.
```cpp
void ProcessEvalCommand(std::string message, UciPlayer& player) {
    int depth = TryGetLabelledValueInt(message, "-d", {"eval", "-d"}, -1);
    int eval = player.bot.stat_eval(player.bot.board, depth);
    if (eval > -9999.0f && eval < 9999.0f) {
        Respond("Eval: " + std::to_string(eval));
    } else {
        // If eval is outside the range, assume it's a mate score
        int mateScore = depth - std::floor(std::abs(eval) / 9999);
        Respond("Eval: #" + std::to_string(mateScore));
    }
}
```