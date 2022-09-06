Feature: Running the star-wars app

  Background:
    When The star-wars is open

  Scenario: Should only present the search form
    And The page title is The Star Wars Search
    Then SearchForm should be shown
    And SearchResult should not be shown

  Scenario: Change search form
    When Check via Backend for planet Hoth
    Then Planets result is
      | name   |population   | climate | gravity    |
      | Hoth   | unknown   | frozen    | 1.1 standard |
    When Check via Backend for people
    Then Not Found page is shown
