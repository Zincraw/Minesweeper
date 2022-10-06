Feature: Minesweeper

    To define the board daya will use:
    "o" No mine
    "*" Mine

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

@wip
Scenario: Default reset button status
Then the reset button shows the value "neutral"

@wip
Scenario: Default timer value
Then the timer count shows the value "0"

Scenario: Default untag mines counter
Then the flag count shows the value "10"

Scenario: Default cells status
Then all the cells show the value "hidden"

Scenario: Unleash a cell with a bomb -> You lose 
Given the user load the next layout: **-oo
When the user unleash the cell: Row "1" Column "1"
Then the game status is "lose"

Scenario: Game Over -> Disabling buttons and Sad face
Given the game status is over
Then all the cells are disabled

@manual
Scenario: Game Over -> Time counter stops
Given the game status is "over"
Then the timer count stops

Scenario: Unleash last cell -> You win
Given the user load the next layout: *o
When the user unleash the cell: Row "1" Column "2"
Then the game status is "victory"

Scenario: Victory -> Unleashing cells
Given the game status is "victory"
Then all the cells aren't "hidden"

@manual
Scenario: Victory -> Time counter stops
Given the game status is victory
Then the timer count stops

Scenario Outline: Unleashing a cell without bomb, counting adyacent bombs
Given the user load the next layout: "<layout>"                        
When the user unleash the cell: Row "2" Column "2"
Then the cells place at: Row "2" Column "2" should show the next value: "<number>"

Examples:
    |   layout   | number |
    |ooo-*oo-ooo |   1    |
    |ooo-*o*-ooo |   2    |
    |o*o-*o*-ooo |   3    |
    |o*o-*o*-o*o |   4    |
    |o*o-*o*-**o |   5    |
    |o*o-*o*-*** |   6    |
    |o**-*o*-*** |   7    |
    |***-*o*-*** |   8    |

Scenario: Tagging a cell as mined -> Adding a flag
Given the board loads the following data "<layout>"
When the user tags the cell: Row "1" Column "1"
Then the layout should look like "<displayResult>"

Examples:
    |      <layout>    |   <displayResult>  | 
    |   "ooo-oox-ooo"  |    "!..-...-..."   | 
    | "o!oo-oo!o-!o!x" |  "!!..-..!.-!.!."  | 
    | "o!!!-!o!o-!o!x" |  "!!!!-!.!.-!.!."  | 
    | "o!!!-!!!!-x!!o" |  "!!!!-!!!!-.!!."  | 

Scenario: Tagging a cell as mined -> Decrease the flag counter
Given the board loads the following data "<layout>"
When the user tags the cell: Row "1" Column "1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |      <layout>    |   <flagCounter>  |
    |   "ooo-oox-ooo"  |         9        |
    | "o!oo-oo!o-!o!x" |         5        |
    | "o!!!-!o!o-!o!x" |         2        |
    | "o!!!-!!!!-x!!o" |         0        |

Scenario: Untagging a cell as mined -> Erase the flag 
Given the board loads the following data "<layout>"
When the user untag the cell: Row "1" Column "1"
Then the layout should look like "<displayResult>"

Examples:
    |      <layout>    | <displayResult>  | 
    |   "!oo-ooo-ooo"  |   "...-...-..."  |
    | "!!oo-xo!o-!o!o" | ".!..-..!.-!.!." |
    | "!!!!-!oxo-!x!x" | ".!!!-!...-!.!." |
    | "!!!!-!!!!-!!!!" | ".!!!-!!!!-!!!!" |

Scenario: Untagging a cell as mined -> Increase the flag counter
Given the board loads the following data "<layout>"
When the user untag the cell: Row "1" Column "1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |      <layout>    |   <flagCounter>  | 
    |   "!oo-ooo-ooo"  |        10        |
    | "!!oo-xo!o-!o!o" |         4        |
    | "!!!!-!oxo-!x!x" |         6        |
    | "!!!!-!!!!-!!!!" |         1        |

Scenario: Clicking the reset button -> The face is neutral
When the user click the reset button
Then the reset button shows the value "neutral"

Scenario: Clicking the reset button -> The timer count is 0
When the user click the reset button
Then the timer count shows the value "00"

Scenario: Clicking the reset button-> The flag count shows 10
When the user click the reset button
Then the flag count shows the value "10"

Scenario: Clicking the reset button-> The cells are hidden
When the user click the reset button
Then all the cells show the value "hidden"

Scenario: Revealing a cell with no adjacent mines -> Unleashed the adjacent cells (Recursivity)
Given the board loads the following data "<layout>"
When the user unleash the cell: Row "1" Column "1"
Then the layout should look like "<displayResult>"

Examples:
    |      <layout>    |   <displayResult>  | 
    |   "ooo-oox-ooo"  |   "o1.-o1.-o1."    |
    | "oooo-oooo-xoox" |  "oooo-1111-...."  |


Scenario: Using more flags than existing mines
Given the board loads the following data "<layout>"
When the user tags the cell: Row "1" Column "1"
Then the flag counter should have the following values "<flagCounter>"

Examples:
    |        <layout>         |   <flagCounter>  | 
    |    "o!!!-!!!!-!!!o"     |        -1        |
    |    "o!!!-!!!!-!!!!"     |        -2        |
    |  "o!!!-!!!!-!!!!-!!!!"  |       -16        |

Scenario: Left-click on the board
When the user left click a cell
Then the cell is unleashed

Scenario: Right-click on the board
When the user right click a cell
Then a flag is tagged

Scenario: Untag a mined tag with mouse
Given the user tag as mined the cell "1-1"
When the user right click the cell "1-1"
Then the cell "1-1" is untagged






