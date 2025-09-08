# Sprint 4 - v4 - 3 hrs

Ok, going straight into it, this sprint took a lot longer than I expected. Turns out it is a lot harder to make a program faster than I thought.

## Goals
- Make the engine faster

## Logs
To approach this, I did research on how to make programs faster, and came across two solutions for Python.

### Approach 1: Task Priorities
I started by making it so that when the engine runs, it will set its own priority to high, so that the OS will allocate more resources to it. I know that I can set it to real-time, but I don't want to risk breaking my computer if there are too many positions to evaluate. This, at least in my testing, seemed to offer no real performance boost, so I scrapped it.

### Approach 2: Cython
Next, I looked into Cython, which is a way to compile Python code into C code, which can then be compiled into machine code. This is a lot faster than Python, and doesn't really require that many changes to the code. So I did. I re-wrote my program to be Cython compatible, and then compiled it. 

Now this was good. It did not seem to help at all. In fact, it seemed to be about 2-4 seconds slower per move. That really confused me, so I finally decided to do some profiling.

#### Profiling Results
After profiling, I found that the main bottleneck was not in my code, but in the stupid library I had been using this whole time. As you can see below, it was not optimized for speed, and was causing a lot of unnecessary overhead. 

![Profiling1](https://github.com/atharva-malik/FuryEngine/blob/master/img/prof1.png?raw=true)

As you can see, the top 30 functions that are taking up time are from the chess library, with almost no time being taken up my recursive minimax function.

Similarly, when checking out the Python version, the limiting factor is my code:

![Profiling2](https://github.com/atharva-malik/FuryEngine/blob/master/img/prof2.png?raw=true)

Comparing the top 10 function calls between the two:

![Profiling3](https://github.com/atharva-malik/FuryEngine/blob/master/img/prof3.png?raw=true)

My theory is that the latency of calling Python functions from Cython is so high that it is actually slower than just running the Python code. This is a shame, but I guess it is what it is.

So now it seems like I have three reasonable options:

1. I make the `ordermoves` function aggressively stronger, which should result in more pruning and hopefully faster times: __Low Impact__
2. I continue with Python, while making the system more and more efficient, while trying out multiprocessing (which simply won't work as well as it is still analysing around 31^5 positions at a depth of just 5 [[source](https://chess.stackexchange.com/questions/23135/what-is-the-average-number-of-legal-moves-per-turn) second answer] moves). As optimistic as I am, I don't think mine, or any major computer for that matter, will be able to handle that many processes: __Low Impact due to the limitations mentioned above__
3. Re-write the entire chess library in Cython. This should result in a massive speed boost, as the library is the main bottleneck and I can make it as fast as I want: __High Impact__

Ok, since I want to make the best engine that I possibly can, I am going to go with option 3. This will take a while, but I think it will be worth it in the end.