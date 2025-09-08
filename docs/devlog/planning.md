# Planning

Since this was my time making a project that relied on knowledge of efficient programming, not to mention the added complexity of chess, I had to plan out the project in detail before starting to code.

## Research
I spent multiple days researching and learning about the technologies and tools that would be used in this project. This included understanding the basics of chess engine functionality and understanding reinforcement learning concepts. To research, I used the following resources, and can not recommend them enough:
### Reinforcement Learning Resources
- [Reinforcement Learning from Scratch](https://www.youtube.com/watch?v=vXtfdGphr3c)
- [Creating a Chess AI with TensorFlow](https://www.youtube.com/watch?v=ffzvhe97J4Q)
- [Why AI Chess Bots Are Virtually Unbeatable (ft. GothamChess) | WIRED](https://www.youtube.com/watch?v=CdFLEfRr3Qk)
### MiniMax and Chess Engines Resources
- [The Fascinating Programming of a Chess Engine](https://www.youtube.com/watch?v=w4FFX_otR-4)
- [Coding Adventure: building a strong Chess AI | Can it beat me?](https://www.youtube.com/watch?v=OWEcs-zzbho)
- [Coding Adventure: Chess](https://www.youtube.com/watch?v=U4ogK0MIzqk)
- [Coding Adventure: Making a Better Chess Bot](https://www.youtube.com/watch?v=_vqlIPDR2TU)
- [I created an AI to Play Chess](https://www.youtube.com/watch?v=DZfv0YgLJ2Q)
- [Opening Book](https://www.chessprogramming.org/Opening_Book)
- [A Comparative Study of Game Tree Searching Methods](https://www.researchgate.net/publication/262672371_A_Comparative_Study_of_Game_Tree_Searching_Methods)
- [30 Weird Chess Algorithms: Elo World](https://www.youtube.com/watch?v=DpXy041BIlA)

### Ideas Explored and Implemented
Furthermore, throughout the research phase, I explored various ideas and techniques that could be implemented in the chess engine and added them here:

- [x] Board Implementation
- [x]  Opening Tablebase
    - [x]  Format the opening book into JSON so that you can write more elegant code
- [x]  Evaluation
    - [x]  NNUE (read the stockfish code)
    - [x]  Incremental Updates (to make code more efficient)
        - Instead of recalculating the entire evaluation from scratch for each position, maintain incremental evaluation values.
        - This would mean having a evaluation variable that you update rather than recalculating. This means custom move and unmakemove functions that work on top of the originals
        - When a move is made, only update the parts of the evaluation that have changed.
        - LAST STAGE EVALUATION
    - [x]  Piece Values
    - [x]  Piece Square Tables
        - [x]  Separate for middle and endgame (king, pawns)
    - [x]  Quiescence search
    - [ ]  King safety?
    - [ ]  Pawn structure?
    - [ ]  Mopup valuations?
        - Simply, if the game is in endgame, push the opponent king towards the edge of the board, and your king towards the opponent.
    - [x]  Passed pawns (bitboards? protected past pawns?)
        - [ ]  Isolated pawns as well
    - [ ]  Null move pruning
    - [x]  [Coding Adventure: Chess](https://www.youtube.com/watch?v=U4ogK0MIzqk?t=939) Move ordering; attacked square pruning
- [x]  MiniMax
    - [ ]  Search Extension? (i.e. looking deeper when the opponent is in check? Either pawn on the verge of promotion? Mb other ideas?)
    - [x]  Multi-threading
- [x]  Alpha-Beta pruning
    - [x]  Arrange better moves first?
- [x]  Variable Depth
    - [ ]  Middle game: 10
    - [ ]  End game: 20
    - [x]  Iterative Deepening
- [ ]  Hexaly??? ([Hexaly Optimizer](https://www.hexaly.com/hexaly-optimizer))

## Sprints
The project was divided into multiple sprints, each focusing on a specific aspect of the chess engine. Each sprint had its own set of goals and deliverables. The approximate time spent and the goals for each sprint are detailed in their respective devlog entries.
