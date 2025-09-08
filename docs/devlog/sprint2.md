# Sprint 2 - v2 - 1.2 hr

This was the second sprint of the project. Ok, now that I have a basic minimax implementation, I want to start fixing the main issue with it, it's speed, or lack thereof.

## Goals
- Improve speed with move ordering

## Logs
Since alpha-beta pruning's efficiency is highly dependent on the order in which moves are evaluated, with better moves being evaluated first leading to more pruning and thus faster search times, I decided to implement move ordering. 

In this (pictured below) position, it takes around 390 seconds to make a move without move ordering. With move ordering this is cut down to around 55-65 seconds. This is a 600% improvement (considering the worst time) or a 710% improvement (considering the best time)!
![8/7p/5kp1/p1b1r3/P1P5/1P3B1P/4p2K/4B3 w - - 2 45](https://github.com/atharva-malik/FuryEngine/blob/master/img/pos1.png?raw=true)