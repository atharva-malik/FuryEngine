# Sprint 3 - v3 - 1 hr

This was now the third sprint of the project, and I was starting to get a hang of how agile sprints work. Now that I had a relatively faster minimax implementation, I wanted to start working on the evaluation function, which is crucial for determining the strength of a position in chess.

## Goals
- Improve evaluation function

## Logs
So in my research, I found that most chess engines do not just consider material when evaluating a position, but also take into account the position of said pieces. For example, a knight in the center of the board is generally more powerful than a knight on the edge. 

So, I implemented [piece-square tables](https://www.chessprogramming.org/Piece-Square_Tables) for each piece type. These tables assign a value to each square on the board for each piece type, indicating how favourable it is for that piece to be on that square.

This should in theory improve the engine's ability to evaluate positions more accurately, as it now considers not just the material balance but also the positional aspects of the pieces. 

To test this theory, I paired the engine against the [Garbo Chess](https://www.mathsisfun.com/games/chess.html) bot. While not the strongest bot out there, it is a decent benchmark for testing the engine's strength.

The results are as follows:
| Game | Result | Notes |
|------|--------|-------|
| Beginner | Win    | Good game, engine played well, easy win |
| Intermediate | Win    | Engine fought hard, but found the win |
| Advanced | Lose    | It was not even close and the engine got destroyed by the Advanced bot |

So looks like the engine is getting stronger, but still has a long way to go. 

Another thing I noticed was that as the game went on, and more complex positions arose, the engine started to take exponentially longer to make a move. This is because the minimax algorithm has a time complexity of O(b^d), and there are more possible moves (b) and deeper searches (d) as the game progresses. So looks like I have a new goal for the next sprint - somehow make the engine faster!
