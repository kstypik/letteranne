# Data Model

## Entities

### User
- id: UUID
- email: String (unique)
- passwordHash: String
- displayId: String (unique, user-facing identifier)
- isActive: Boolean
- createdAt: DateTime
- updatedAt: DateTime

### UserProfile
- id: UUID
- userId: UUID (unique, FK -> User.id)
- bio: Text (nullable)
- avatarUrl: String (nullable)
- createdAt: DateTime
- updatedAt: DateTime

### Letter
- id: UUID
- senderId: UUID (FK -> User.id)
- recipientId: UUID (nullable, FK -> User.id)
- parentLetterId: UUID (nullable, FK -> Letter.id)
- visibility: Enum (private, open)
- status: Enum (queued, delivered, hidden_moderation)
- subject: String (nullable)
- body: Text
- scheduledFor: DateTime
- deliveredAt: DateTime (nullable)
- createdAt: DateTime
- updatedAt: DateTime

### Postcard
- id: UUID
- code: String (unique)
- title: String
- imageUrl: String
- sourceType: Enum (achievement, event)
- isActive: Boolean
- createdAt: DateTime
- updatedAt: DateTime

### UserPostcard
- id: UUID
- userId: UUID (FK -> User.id)
- postcardId: UUID (FK -> Postcard.id)
- unlockedBy: Enum (achievement, event, admin_grant)
- unlockedAt: DateTime

### LetterPostcard
- id: UUID
- letterId: UUID (unique, FK -> Letter.id)
- userPostcardId: UUID (FK -> UserPostcard.id)
- attachedAt: DateTime

### ModerationReport
- id: UUID
- reporterUserId: UUID (FK -> User.id)
- letterId: UUID (FK -> Letter.id)
- reason: String
- status: Enum (open, reviewed, dismissed, actioned)
- createdAt: DateTime
- reviewedAt: DateTime (nullable)

## Relationships
- User 1:1 UserProfile
- User 1:N Letter (as sender)
- User 1:N Letter (as recipient, for private letters)
- Letter 1:N Letter (open letter with replies via parentLetterId)
- User N:M Postcard (through UserPostcard)
- Letter 1:0..1 LetterPostcard
- User 1:N ModerationReport
- Letter 1:N ModerationReport

## Indexes
- User.email (unique)
- User.displayId (unique)
- Letter.senderId, Letter.createdAt (history queries)
- Letter.recipientId, Letter.createdAt (inbox queries)
- Letter.visibility, Letter.createdAt (open feed queries)
- Letter.parentLetterId (reply thread queries)
- UserPostcard.userId, UserPostcard.unlockedAt
- ModerationReport.status, ModerationReport.createdAt

