# Openings

This files contains code to handle the JSON opening books used by my Engine. The book is stored in `includes/OpeningBook`.

## Load Openings Data
This function loads the opening data from the JSON file and stores it in the `openings_data` member variable.
```cpp
bool Bot::load_openings_data() {
    std::ifstream file(Bot::OpeningBookPath);
    if (!file.is_open()) {
        Bot::LogToFile("Error: Could not open openings.json");
        return false;
    }

    try {
        this->openings_data = json::parse(file);
        return true;
    } catch (json::parse_error& e) {
        Bot::LogToFile("JSON parse error: "); Bot::LogToFile(e.what());
        return false;
    }
}
```

## Opening Move
This function checks if the current position (in FEN format) exists in the openings data. If it does, it selects a random move from the list of possible moves for that position. If the position is not found in the openings data, it switches the game stage to 'm' (middle game) and calls the `get_best_move` function to determine the best move using the engine's evaluation.
```cpp
std::string Bot::opening_move(const std::string& fen, char colour) {
    if (this->openings_data.empty()) { // Check if the JSON data is loaded
        Bot::LogToFile("Error: Openings data not loaded.");
        this->game_stage = 'm';
        return Bot::get_best_move(this->board, colour, -1);
    }
    std::string converted_fen = Bot::convert_fen(fen);
    if (this->openings_data.contains(converted_fen)) {
        std::vector<std::string> moves = this->openings_data[converted_fen].get<std::vector<std::string>>();
        return (moves)[this->get_random_index(moves)];
    } else {
        this->game_stage = 'm';
        return Bot::get_best_move(this->board, colour, -1);
    }
}
```