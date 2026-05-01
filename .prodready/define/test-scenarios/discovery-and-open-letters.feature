Feature: Discovery and Open Letters
  As a new user
  I want to discover people and public letters
  So that I can find penpals without bringing existing friends

  Background:
    Given I am authenticated
    And there are users available in the system

  Scenario: [US-005] - Find user by ID
    Given another user has public display ID "anna-letters"
    When I search for "anna-letters"
    Then I see that user's profile in results

  Scenario: [US-006] - Show random discovery list
    Given discovery contains eligible users
    When I open the discovery page
    Then I see a random list of users
    And refreshing discovery can change ordering

  Scenario: [US-007] - Publish open letter and receive reply
    Given I compose an open letter
    When I publish it
    Then it appears in the open-letter feed
    And another user can reply in-thread

  Scenario: [US-007] - Moderate prohibited content in open letters
    Given I attempt to publish an open letter with prohibited content
    When moderation checks run
    Then publication is blocked or hidden
    And a moderation event is recorded

