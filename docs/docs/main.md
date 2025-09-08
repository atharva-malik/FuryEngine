# Main

This is the main file of the engine. It is a pretty bland file that simply has the implementation of the `ReceiveCommand` function and the `main` function.

## ReceiveCommand

The receive command function is a collation of if-else statements that check what command has been sent to the engine and then calls the appropriate function to handle that command. It handles most of the common UCI commands and also some custom commands that I felt were essential. Where appropriate, I have tried to use abstraction to move the actual processing of the command to another function. This keeps the `ReceiveCommand` function clean and easy to read and follows the SOLID design principles.

```cpp
void ReceiveCommand(std::string message, UciPlayer& player){
    Bot::LogToFile("Command received: " + message);
    message = trim(message);
	std::string messageType = lower(split(message, ' ')[0]);
    
    if (messageType == "uci") DisplayOptions();
    else if (messageType == "isready") Respond("readyok");
    else if (messageType == "ucinewgame") player.NotifyNewGame();
    else if (messageType == "position") ProcessPositionCommand(message, player);
    else if (messageType == "go") ProcessGoCommand(message, player);
    else if (messageType == "quit" || messageType == "exit" || messageType == "q") player.Quit();
    else if (messageType == "d") Bot::print_board(player.bot.board);
    else if (messageType == "h" || messageType == "help") PrintHelp();
    else if (messageType == "perft") ProcessPerftCommand(message, player);
    else if (messageType == "eval") ProcessEvalCommand(message, player);
    else if (messageType == "cls") clearScreen();
    else Respond("Unrecognised command: " + messageType + " | " + message);
}
```

## main

Another relatively straightforward function that initialises the neural network, creates a UciPlayer object and then enters a loop to continuously receive commands from standard input until a quit command is received. 

```cpp
int main () {
    init_nnue("includes\\NNUE\\v4.nnue");
    
    UciPlayer player;
    std::string command = "";
    while (lower(command) != "quit" && lower(command) != "exit" && lower(command) != "q")
    {
        std::getline(std::cin, command);
        ReceiveCommand(command, player);
    }
    Bot::LogToFile("CLOSING UCI bot");
    return 0;
}
```

# Conclusion
As you can see, this is a pretty barebones file that simply serves as the entry point to the engine and a command parser. The actual functionality of the engine has been abstracted over to a multitude of other files and classes to keep things clean and easy to read.