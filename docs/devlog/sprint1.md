# Sprint 1 - v1 - 1.5 hr

This was the first sprint of the project. Since, as mentioned before, this was my first time working on a project of this scale, I decided to use this sprint to implement the various components separately, and then integrate them in the next sprint.

## Goals
- Implement a basic MiniMax search algorithm.

## Logs
This was just a start to see if I can actually use minimax, because last time I tried to implement the algorithm, it did not work at all and lead to a semi functional project. I ensured to write the code by following the OOP principles to make it easier to use, maintain and expand in the future. First I implemented openings, using a book created by [Sebastian Lague](https://www.youtube.com/c/SebastianLague). Along with that, I also wrote code to convert the book into a JSON file for easier use. 

Finally, with the basic things out of the way, I wrote the minimax alpha-beta pruning algorithm and added an extremely basic evaluation function which worked by adding up the materialistic values of the pieces on the board. 

As expected, the implementation came with it's own host of bugs, but I worked on it until it was making moves.

:::info
The moves seem random and it is recklessly taking pieces? Maybe there is something wrong with the eval?
:::

Ok. So after long hours of debugging, I found that the bot’s bug was due to the fact that it was making the best moves for the other colour, thus sacrificing material.
