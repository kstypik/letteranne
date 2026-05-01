Feature: Postcard Collection and Letter Attachments
  As a user
  I want to collect postcards and attach them to letters
  So that my writing feels closer to classic postal communication

  Background:
    Given I am authenticated
    And postcard catalog entries exist

  Scenario: [US-008] - Unlock postcard from event
    Given I complete an event that grants a postcard
    When reward processing executes
    Then the postcard appears in my collection

  Scenario: [US-008] - Prevent duplicate postcard grant
    Given I already received a postcard for a unique event reward
    When reward processing runs again for the same event
    Then no duplicate owned postcard is created

  Scenario: [US-009] - Attach owned postcard to letter
    Given I own at least one postcard
    When I attach a postcard while composing a letter
    Then the sent letter stores that postcard attachment
    And recipient can see the postcard with the letter

  Scenario: [US-009] - Reject attachment of unowned postcard
    Given I do not own postcard "spring-2026"
    When I attempt to attach "spring-2026" to a letter
    Then the request is rejected as unauthorized

