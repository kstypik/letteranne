Feature: Authentication and Profile
  As a person seeking slower communication
  I want to create an account and manage my profile
  So that I can participate in letter exchange

  Background:
    Given the app is running

  Scenario: [US-001] - Successful sign-up
    Given I am on the sign-up page
    When I register with a unique email and valid password
    Then my account is created
    And I am authenticated

  Scenario: [US-001] - Login failure with invalid credentials
    Given I have an existing account
    When I log in with an incorrect password
    Then authentication is denied
    And I see an error explaining credentials are invalid

  Scenario: [US-002] - Update profile fields
    Given I am authenticated
    When I update my bio and avatar
    Then my profile changes are persisted
    And other users can view the updated profile

