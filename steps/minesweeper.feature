Feature: Minesweeper

    To define the board daya will use:
    "o" No mine
    "x" Mine

    To define the board display will use:
    "." Hidden cell
    "!" Cell tagger has mined cell by the user
    "1" clean all with 1 adjacent mines
    "2" clean all with 1 adjacent mines
    "3" clean all with 1 adjacent mines
    "4" clean all with 1 adjacent mines
    "5" clean all with 1 adjacent mines
    "6" clean all with 1 adjacent mines
    "7" clean all with 1 adjacent mines
    "8" clean all with 1 adjacent mines

Background: 
Given the user open the app

@done
Scenario: Default reset button status
Then the reset button shows the value "neutral"

@done
Scenario: Default timer value
Then the timer count shows the value "00"

@done
Scenario: Default untag mines counter
Then the flag count shows the value "10"

@done
Scenario: Default cells status
Then all the cells show the value "hidden"

@done
Scenario: Clicking the reset button -> The face is neutral
When the user click the reset button
Then the reset button shows the value "neutral"

@done
Scenario: Clicking the reset button -> The timer count is 0
When the user click the reset button
Then the timer count shows the value "00"

@done
Scenario: Clicking the reset button-> The flag count shows 10
When the user click the reset button
Then the flag count shows the value "10"

@done
Scenario: Clicking the reset button-> The cells are hidden
When the user click the reset button
Then all the cells show the value "hidden"

@done
Scenario: Unleash a cell with a bomb -> You lose 
Given the user load the next layout: "xx-oo"
When the user unleash the cell: "1-1"
Then the game status is lose

@done
Scenario: Unleash a cell with a bomb -> All bombs are shown 
Given the user load the next layout: "xx-oo"
When the user unleash the cell: "1-1"
Then the cell: "1-2" shows a "mine"

@done
Scenario: Game Over -> Disabling buttons and Sad face
Given the game status is over
Then all the cells are disabled

@manual 
Scenario: Game Over -> Time counter stops
Given the game status is over
Then the timer count stops

@done
Scenario: Unleash last cell -> You win
Given the user load the next layout: "x-o"
When the user unleash the cell: "2-1"
Then the game status is win

@done
Scenario: Victory -> Unleashing cells
Given the game status is victory
Then all the non mines cells aren't "hidden"

@manual
Scenario: Victory -> Time counter stops
Given the game status is victory
Then the timer count stops

@done
Scenario Outline: Unleashing a cell without bomb, counting adyacent bombs
Given the user load the next layout: "<layout>"                        
When the user unleash the cell: "2-2"
Then the cell placed at: "2-2" should show the next value: "<number>"

Examples:
    |   layout   | number |
    |ooo-xoo-ooo |   1    |
    |ooo-xox-ooo |   2    |
    |oxo-xox-ooo |   3    |
    |oxo-xox-oxo |   4    |
    |oxo-xox-xxo |   5    |
    |oxo-xox-xxx |   6    |
    |oxx-xox-xxx |   7    |
    |xxx-xox-xxx |   8    |


Scenario Outline: Tagging a cell as mined -> Adding a flag
Given the user load the next layout: "<layout>"
When the user tags the cell: "1-1"
Then the layout should look like "<displayResult>"

Examples:
    |       layout     |    displayResult   | 
    |    ooo-oox-ooo   |     !..-...-...    | 
    |  o!oo-oo!o-!o!x  |   !!..-..!.-!.!.   | 
    |  o!!!-!o!o-!o!x  |   !!!!-!.!.-!.!.   | 
    |  o!!!-!!!!-x!!o  |   !!!!-!!!!-.!!.   | 

@done
Scenario Outline: Tagging a cell as mined -> Decrease the flag counter
Given the user load the next layout: "<layout>"
When the user tags the cell: "1-1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |       layout     |    flagCounter   |
    |    ooo-oox-ooo   |         9        |


Scenario: Untagging a cell as mined -> Erase the flag 
Given the user load the next layout: "xo"
And the user tag the cell: "1-1"
When the user untag the cell: "1-1"
Then the cell: "1-2" shows a "mine"

Scenario Outline: Untagging a cell as mined -> Increase the flag counter
Given the user load the next layout: "<layout>"
When the user untag the cell: "1-1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |      layout      |    flagCounter   | 
    |    !oo-ooo-ooo   |        10        |
    |  !!oo-xo!o-!o!o  |         4        |
    |  !!!!-!oxo-!x!x  |         6        |
    |  !!!!-!!!!-!!!!  |         1        |

@done
Scenario: Revealing a cell with no adjacent mines -> Unleashed the adjacent cells (Recursivity)
Given the user load the next layout: "<layout>"
When the user unleash the cell: "1-1"
Then the layout should look like "<displayResult>"

Examples:
    |       layout     |    displayResult   | 
    |    ooo-oox-ooo   |     o1.-o1.-o1.    |
    |  oooo-oooo-xoox  |    oooo-1111-....  |


Scenario: Using more flags than existing mines
Given the user load the next layout: "<layout>"
When the user tags the cell: "1-1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |         layout          |    flagCounter   | 
    |     o!!!-!!!!-!!!o      |        -1        |
    |     o!!!-!!!!-!!!!      |        -2        |
    |   o!!!-!!!!-!!!!-!!!!   |       -16        |

@done
Scenario: Left-click on the board
Given the user load the next layout: "ox-xx-oo"
When the user left click the cell "1-1"
Then the cell "1-1" should be unleashed

@done
Scenario: Right-click on the board
Given the user load the next layout: "ox-xx-oo"
When the user right click the cell "1-1"
Then a flag should be tagged in cell "1-1"










