# Sprint 7 - v7 - 16 hrs

## v7.1 - 2 hrs

### Goals
- Adding Depth limit to Quiescence Search

### Logs
Quiescence search was taking up too much time, so I added a depth limit to it. I add the concept of volatility, which is a simple measure of how many captures there are in a position to limit the depth of the quiescence search. After playing a match, I analysed the game through [chess.com](https://www.chess.com/analysis?tab=overview) and was pleasantly surprised. The engine got an estimated rating of __1550__!

While manually looking through the game, I noticed that the engine was making some truly horrible blunders, so I have decided to remove quiescence search. This has brought the average move time per move, in a game of 50 moves a side down to a mere 3 seconds per move!

WOW! THERE WAS SOMEHOW A BLIND SPOT FOR MATE IN 1S! I fixed this. New estimated rating: __1700__!

## v7.2 - 2 hrs
### Goals
- A simple UCI interface

### Logs
Again, this was not that hard to implement. I just had to write a simple UCI interface CLI, and it worked perfectly first try.

## v7.3 - 6 hrs
### Goals

- Threading

### Logs
Threading is a headache because of lack of automatic memory management in C++, but the results are in. In the Kiwipete position, at a depth of 5:

| Version | Time 1 (ms) | Time 2 (ms) | Time 2 (ms) | Average Time (ms/s) |
| --- | --- | --- | --- | --- |
| 7.2.1 | 49896 | 49144 | 45507 | 48182.33/48 |
| 7.3.1 | 32530 | 36706 | 38876 | 36037.33/36 |

Therefore the newer version is on average 33.70% faster.

After integration testing, I realised that this is a lost venture as it makes random moves. I decided to come back to it later.

## v7.4 - 4 hrs

### Goals
- Optimisations (Docs optimisation, move ordering better, move ordering optimisation, endgame optimisation, transposition tables)

1. Docs Optimisation

    In the library docs ([Getting Started | C++ Chess Library](https://disservin.github.io/chess-library/pages/getting-started.html#board-isgameover-api)), it suggest a better approach instead of using `board.isGameOver()`, and I am going to try it out. 

    This does not work, as I can not get the MiniMax algorithm to use the suggested optimisation.

2. Move ordering optimisations

    Added in the following move ordering optimisations:
   - MVV-LVA: Most Valuable Victim, Least Valuable Aggressor
   - Killer Moves
  
3. Endgame optimisations

    I added in various endgame optimisations along with a tapered eval function.

4. Transposition table

    Before adding the transposition table, to decide what to use as a key, I did a little test:

    ![Profiling 4](https://github.com/atharva-malik/FuryEngine/blob/master/img/prof4.png?raw=true)

    As is apparent from the picture, FENs are the fastest, but my function to remove the last few digits from them is not, so zobrist hashing it is.

## v7.5 - 2 hrs

### Goals
- Time limited searches

### Logs
I wrote up a function to implement Time Limited Searches

I added these in a day. I am now going to let it play a few matches against Stockfish and see how it does.

It is horrible! It is making random moves and it is not even playing the opening book. I will have to fix this in the next sprint.
