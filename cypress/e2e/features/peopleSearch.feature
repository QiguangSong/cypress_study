Feature: People search

  Background:
    When The star-wars is open

  Scenario: Loading status
    When Delay backend call for 3000 ms
    And Search for people art
    Then Loading page is shown

  Scenario: Search people with full name
    When Search for people C-3PO
    And People have 1 result
    And People result is
      | name      | gender | birtYear | eyeColor | skinColor |
      | C-3PO | n/a   | 112BBY   | yellow     | gold   |

  Scenario: Search people with sub string
    When Search for people art
    Then People have 2 result
    And People result is
      | name                  | gender        | birtYear | eyeColor | skinColor        |
      | Darth Vader | male | 41.9BBY   | yellow   | white |
      | Darth Maul      | male          | 54BBY    | yellow    | red             |

  Scenario: No result found
    When Search for people noname1234
    Then Not Found page is shown

  Scenario: Generate result with more than 10 results
    When Search for people ar
    Then People have 19 result

  Scenario: Clear results
    When Search for people art
    Then People have 2 result
    When Clear the search
    And Press key Enter
    Then People result is not shown
