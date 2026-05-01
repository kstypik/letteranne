Feature: Private Letter Exchange
  As a user
  I want to send delayed private letters
  So that conversations are intentional and in-depth

  Background:
    Given two authenticated users exist
    And delivery delay rules are configured

  Scenario: [US-003] - Queue and deliver private letter
    Given I am composing a private letter to another user
    When I submit the letter with valid content
    Then the letter is stored with queued status
    And the recipient cannot read it before scheduled delivery

  Scenario: [US-003] - Reject empty letter body
    Given I am composing a private letter
    When I try to send a letter with empty body
    Then the request is rejected with validation error

  Scenario: [US-004] - View letter history
    Given I have sent and received letters
    When I open letter history
    Then I see letters sorted by recent activity
    And I can open a thread to read full content

  Scenario: [US-004] - Deny access to non-participant
    Given a private letter exists between user A and user B
    When user C requests that letter
    Then access is denied

