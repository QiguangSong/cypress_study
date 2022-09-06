Feature: Planets search

  Background:
    When The star-wars is open

  Scenario: Search planets with full name
    When Search for planets Kamino
    And Planets have 1 result
    And Planets result is
      | name      | population | climate    | gravity |
      | Kamino | 1000000000   | temperate   | 1 standard     |

  Scenario: Search planets with sub str
    When Search for planets too
    Then Planets have 2 result
    And Planets result is
      | name        | population | climate                   | gravity |
      | Tatooine | 200000    | arid                   | 1 standard |
      | Dantooine       | 1000 | temperate | 1 standard       |
