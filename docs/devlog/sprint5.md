# Sprint 5 - v5 - 12.33 hrs

Yeah, I must have been high when thinking that it would be easy to re-write it in C++, a language that I have basically no experience in (I decided that I might as well go the whole length rather than just re-writing it into Cython).

P.S. I have decided to split this sprint into two parts, because I ended up using a different approach than I originally intended.

## v5.1 - 7.33 hrs

### Goals
- Re-write the whole library in C++

### Logs
Ok, from my research, I had found that bitboard chess engines are the fastest, so I decided to go with that approach. Initially, I wrote a function to convert a FEN string into usable information. To start with, I wrote some code to generate Rook, Queen, and Bishop moves as they are the simplest. I used switch statements wherever possible because [switch statements are faster than if statements in C++](https://www.youtube.com/watch?v=fjUG_y5ZaL4).

Soon after, I gave up on writing the chess library from scratch due to the complexity of Knight and Pawn movement and how slow it already was. 

It was here that I found [this library](https://github.com/Disservin/chess-library). It was a bitboard chess library written in C++, and it seemed to be blazingly fast:
* from 10-20 times faster than my C++ implementation (Max's (Disservin) library is also used to power Stockfish, one of the strongest chess engines in the world)

## v5.2 - 5 hrs
### Goals
- Same as above, but using Max's library, i.e. remake whatever progress I had.

Before using the chess library, I decided to run some benchmarks (PERFT against the old python library)

* First Test (starting position):
    | Library | Depth | Time (seconds) | Nodes Searched | Nodes per Second (approx) |
    | --- | --- | --- | --- | --- |
    | python-chess | 5 | 30.879215955734253  | 4,865,609 | 157,569 |
    | chess-library | __6__ | 28.7222588  | 119,060,324 | 4,145,223 |

    ::: info
    This is a whole move deeper and is still faster.
    :::

- Second Test (starting position):
    | Library | Depth | Time (seconds) | Nodes Searched | Nodes per Second (approx) |
    | --- | --- | --- | --- | --- |
    | python-chess | 7 | 17484.683883190155 | 3,195,901,860 | 182,783 |
    | chess-library | 7 | 751.4311222 | 3,195,901,860 | 4,253,087 |
    
    Therefore, we can conclude that chess-library is 23.2685 times faster.

Great! Now that the bottleneck is again my code, I spent the rest of this sprint re-writing all of my existing code to work with this library. This took a while, but I got it done.