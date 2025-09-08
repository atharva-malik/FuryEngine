# Sprint 8 - v8 - 14.66 hrs

So the codebase has become a bit of a mess. I want to restart, with a simple goal in mind. I want to follow the KISS principle, and keep speed and clarity in mind at every stage.

## v8.1-a - 7.66 hrs

So while trawling through old chess Wikis, I found a lifesaver. The key to speeding the engine up. An NNUE! The plan? Use Stockfish’s NNUE training set to train myself an accurate and strong NNUE! This should hopefully be faster, and more accurate, than my barely passable evaluation code.

4 days of training later, we have this:

- Starting position

| Version | Time 1 (μs) | Time 2 (μs) | Time 3 (μs) | Average (μs) |
| --- | --- | --- | --- | --- |
| Base Eval | 1028 | 605 | 915 | 849.33 |
| Shiny NNUE | 391 | 173 | 292 | 285.33 |

NNUE is about 3 times faster

- Middle game position (displayed below)
![r3kb1r/2p3pp/p1n1p3/1pn1P3/8/1Nq5/P1B2PPP/R1BQ1RK1 b kq - 1 15](https://github.com/atharva-malik/FuryEngine/blob/master/img/pos2.png?raw=true)

| Version | Time 1 (μs) | Time 2 (μs) | Time 3 (μs) | Average (μs) |
| --- | --- | --- | --- | --- |
| Base Eval | 447 | 655 | 708 | 603.33 |
| Shiny NNUE | 154 | 119 | 141 | 138 |

NNUE is about 4 times faster

- Endgame position (displayed below)
![6k1/5p2/6p1/8/7p/8/6PP/6K1 w - - 0 1](https://github.com/atharva-malik/FuryEngine/blob/master/img/pos3.png?raw=true)

| Version | Time 1 (μs) | Time 2 (μs) | Time 3 (μs) | Average (μs) |
| --- | --- | --- | --- | --- |
| Base Eval | 153 | 259 | 237 | 216.33 |
| Shiny NNUE | 124 | 130 | 180 | 144.66 |

Endgame seems pretty close with some unrecorded tests even beating the NNUE but, in the end, NNUE is about 1.5 times faster most of the time.

**CONCLUSION**

After another 8 days of training, I have an even better and accurate NNUE! As you may have noticed, the NNUE seems to be taking about the same time regardless of position! Yes! This is because as an ML model, it doesn’t ‘lose’ or ‘gain’ extra parameters, whereas, the eval function will inherently be faster with fewer pieces because it needs to do fewer calculations.

I am going to let this run a few games against Stockfish and see how it does. I will report back with the results.

Well, it seems to be doing good, [chess.com](https://www.chess.com/analysis?tab=overview) evaluation gave it a rating of about 2300. I would like to get up to 2700 hopefully.

### v8.1 - 7 hrs

I want to speed this up. The approach I have decided on is threading, time to revisit this conundrum. So, there are 3 approaches that I have thought up, 1 of which I immediately discarded. While reading them, just remember: A CPU has a set number of max threads it can work on in a clock cycle (16 in my case).

1. Spawn a new thread to search each new move;
2. Spawn 16 threads, dividing the moves equally among 16 threads;
3. Spawn 16 threads, where each thread searches a move, when it is done working, it will be closed, and a new thread spawned for new move. I discarded this as the other two approaches seem a lot faster and this is unnecessarily hard to implement.

| Version | Time 1 (ms) | Time 2 (ms) | Time 3 (ms) | Average (ms/s) |
| --- | --- | --- | --- | --- |
| Option 1 | 3125 | 2885 | 2903 | 2917/2.9 |
| Option 2 | 3276 | 3243 | 3285 | 3268/3.2 |
| Traditional | 15570 | 16166 | 16223 | 15986.33/16.0 |

Option 1 is about 12% faster than option 2, and about 448% faster than the traditional (about 5 times as fast).

In the end, option one seems to be the best and fastest.

Also note that during this I found the command to compile the fastest version with g++. It is:

```bash
g++ -Ofast -march=native main.cpp -o main
```

# Conclusion
While running this engine and seeing it play, I am extremely happy with how it performs. It is up for development if you want to add it or try host it on Lichess. It has been a fun journey with it's highs and lows and I am extremely happy that I ended up undertaking this project.