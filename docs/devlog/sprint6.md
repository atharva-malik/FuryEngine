# Sprint 6 - v6 - 5 hrs

From now on, most of my sprints are going to have multiple sub-sprints, as I want to tackle multiple goals in each big sprint.

## v6.1 - 3 hrs

### Goals
- Making the evaluation function more efficient and increasing it's speed in general.

### Logs
Now that I had a fast chess library, I wanted to make the evaluation function faster. I had to try multiple approaches to this, as I was not sure what would work best. All of the results below are comparing v5.2 to v6.1 in a complex middle game position (displayed below).

![8/7p/5kp1/p1b1r3/P1P5/1P3B1P/4p2K/4B3 w - - 2 45](https://github.com/atharva-malik/FuryEngine/blob/master/img/pos1.png?raw=true)

#### Approach 1: Inside the evaluation function, multiplying boolean values by piece values

| Version | Time 1 (ns) | Time 2 (ns) | Time 3 (ns) | Average (ns/s) |
| --- | --- | --- | --- | --- |
| v5.2 | 7000 | 8600 | 8100 | 7900/0.0000079 |
| v6.1.1 | 6700 | 8000 | 7800 | 7500/0.0000075 |

This resulted in a **MASSIVE** 5.33% improvement. (This was a lot smaller of an improvement than I expected, but it was still an improvement nonetheless)

#### Approach number 2: For loop unrolling.

| Version | Time 1 (ns) | Time 2 (ns) | Time 3 (ns) | Average (ns/s) |
| --- | --- | --- | --- | --- |
| v5.2 | 7200 | 11700 | 7400 | 8767/0.000008767 |
| v6.1.1 | 7100 | 6800 | 7000 | 6967/0.000006967 |
| v6.1.2 | 11700 | 14000 | 13000 | 12900/0.0000129 |

Well … This was quite an improvement … of -46% over v6.1.1. Turns out g++ is a very smart compiler and it is optimised for this already, and instead explicit for loop unrolling just makes it worse.

#### Approach number 3: Trying to use switches instead of boolean multiplication

| Version | Time 1 (ns) | Time 2 (ns) | Time 3 (ns) | Average (ns/s) |
| --- | --- | --- | --- | --- |
| v5.2 | 7400 | 11700 | 7800 | 8966/0.000008966 |
| v6.1.1 | 2900 | 3000 | 3100 | 3000/0.000003 |
| v6.1.3 | 3100 | 2300 | 2300 | 2,567/0.000002 |

Now this is good: A **massive** 249.3% improvement over v5.2 and a respectable 16.9% improvement over v6.1.1

#### Approach number 4: Incremental evaluation deepening. 
For these tests, we are running the find best move algorithm on the position above at a depth of 5 to see if this helped or hindered.

- While working on this, I found a bug that led to the evaluation being an integer instead of a float. It was promptly fixed.

| Version | Move Found | Time 1 (ms) | Time 2 (ms) | Time 3 (ms) | Average (ms/s) |
| --- | --- | --- | --- | --- | --- |
| v5.2 | e1a5 | 7272 | 7655 | 7507 | 7478/7.478 |
| v6.1.1 | e1a5 | 7375 | 7288 | 7201 | 7288/7.288 |
| v6.1.3 | e1a5 | 5840 | 5807 | 5880 | 5842/5.842 |
| v6.1.4 | f3d5 |  |  |  |  |

Results are irrelevant as it doesn’t find the best move, probably because there was some bug in my implementation.

### v6.1.5 - 1 hr

Alongside of all of these fancy optimisations, in v6.1.5 I added different depth based on game state but I did not test it as it would not have been an accurate comparison as v6.1.5 would look through fewer nodes, but it does find the best move and is significantly faster.

## v6.2 - 1 hr
### Goals
- Implement quiescence search

It really was not that hard to implement and I got it done quite fast as it is just a second MiniMax function.
