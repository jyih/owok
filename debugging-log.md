# Debugging Log

**[04-13-2022]**

_Issue:_
Could not implement multiple foreign keys in Game referencing User (player_one and player_two)

_Solution:_
Implemented.

**[04-15-2022]**

_Issue:_
Replays were not properly playing the first move, which made the moves play out of order

_Solution:_
Found that the new game moves were storing with curly braces wrapping the coordinates inside
the string. Had to slice first and last character from string to remove curly braces
const movesArr = game?.moves?.slice(1, -1).split(",");

**[04-19-2022]**

_Issue:_
Datetime not saving to database correctly

_Solution:_
Removed invocation of datetime in models

**[04-20-2022]**

_Issue:_
Sockets: not persisting data across clients, and then later emitting information universally

_Solution:_
Added a custom hook useDidMountEffect to ensure that the useEffect does not trigger on page load. Added useState to ensure that the moves persist before setting the board and checking for win. joinRoom(socketRoom) useEffect.

**[04-21-2022]**

_Issue:_
Game would not save/create after completion. "Object not subscriptable"

_Solution:_
Needed to use dot notation (Python issue)
