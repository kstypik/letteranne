# Product Requirements Document (PRD)

## 1. Executive Summary

**Product**: Letteranne  
**Problem**: Instant messaging incentivizes speed and shallow interactions, leaving many users mentally exhausted and disconnected from meaningful conversation.  
**Solution**: Letteranne is a mobile-first social app for delayed digital letters, combining thoughtful writing workflows with discovery features that help users find penpals directly in-app.  
**Target Users**: People of all ages who want slower, deeper communication, including younger users seeking thoughtful peer connections and older users who miss classic postal-style exchange.  
**Success Metric**: Day-30 retention, with average letter length as the key quality signal.

## 2. Goals & Non-Goals

### Goals
- Deliver an excellent writing experience for crafting beautiful, long-form letters.
- Enable private delayed letter exchange and persistent letter history.
- Ensure users can find correspondents in-app via user ID lookup and open letters.
- Support postcard collection and postcard-in-letter attachments to reinforce old-school letter feel.

### Non-Goals
- Advanced matching algorithm in MVP.
- Gender/age preference filters in MVP.
- Real-time, quick, "chat-like" communication patterns.

## 3. User Personas

### Persona 1: Burned-Out Messenger User
- **Context**: Uses modern chat apps heavily but feels overwhelmed by notification pressure.
- **Pain Point**: Conversations feel rushed and disposable.
- **Desired Outcome**: A calmer communication channel with room for reflection.

### Persona 2: Retro Letter Enthusiast
- **Context**: Values classic post-mail rituals and personal expression.
- **Pain Point**: Existing digital tools lack emotional depth and craft.
- **Desired Outcome**: A modern platform that preserves the emotional experience of letters.

## 4. Functional Requirements

### FR-1: Account and Profile
- User registration and login are required.
- Auth is implemented via headless django-allauth flows.
- Users can edit and display profile data (bio, avatar).
- **Acceptance**: Successful sign-up/sign-in, protected routes, profile persistence.

### FR-2: Private Delayed Letters
- Users can compose and send private letters to known recipients.
- Delivery is intentionally delayed using scheduled processing.
- Users can browse sent/received history and open thread details.
- **Acceptance**: Queued then delivered status lifecycle, validation on empty letters, authorization for thread access.

### FR-3: Discovery and Open Letters
- Users can find others by unique user ID.
- Users can browse a simple randomized discovery list.
- Users can publish open letters and post replies.
- **Acceptance**: Public feed visibility, reply threading, moderation gating for harmful content.

### FR-4: Postcard Experience
- Users can unlock postcards from events/achievements.
- Users can attach owned postcards to letters.
- Recipients see postcard content with letter body.
- **Acceptance**: Ownership enforcement, no duplicate grants for unique rewards.

## 5. Non-Functional Requirements

- **Performance**: MVP targets ~200 launch users, scaling to ~5,000 users in 6 months on cost-conscious infrastructure.
- **Security**: GDPR-aligned data handling, authenticated APIs, authorization on private content, basic moderation controls in v1.0.
- **Availability**: Reliable core flows (auth, sending, delivery, reading) on a Dockerized VPS deployment.
- **Budget**: Free-tier-first tooling and infrastructure choices.

## 6. Data Model Summary

### Entities
- **User**: Identity, credentials, display ID, lifecycle timestamps.
- **UserProfile**: Bio/avatar presentation data.
- **Letter**: Private/open messages, scheduling, delivery, thread linkage.
- **Postcard**: Template catalog of collectible postcard assets.
- **UserPostcard**: Ownership records for postcards per user.
- **LetterPostcard**: Attachment mapping from letter to owned postcard.
- **ModerationReport**: Basic reporting workflow for open-letter safety.

### Key Relationships
- User to Letter: one-to-many as sender/recipient.
- Letter to Letter: parent-child threading for open-letter replies.
- User to Postcard: many-to-many through UserPostcard.
- Letter to LetterPostcard: one-to-zero/one postcard attachment.

## 7. Scope & Timeline

- **MVP Features**: auth, profile, private delayed letters, history, user ID lookup, random discovery list, open letters + replies, postcard collection, postcard attachments.
- **Future Features**: advanced penpal search, interest-based matching, marketplace, stronger privacy controls, blocking/reporting expansion, location matching.
- **Timeline**: 4 weeks.
- **Team**: Solo developer.

## 8. Open Questions & Risks

- Exact delay model for letters (fixed delay vs rule-based) must be finalized in Design.
- Moderation scope is intentionally basic for v1.0; abuse handling depth may be insufficient under fast growth.
- Free-tier budget plus solo timeline may constrain observability and operations hardening.
- GDPR implementation details (retention/deletion/export workflows) require explicit design acceptance criteria.

## 9. References

- Detailed user stories: `requirements/user-stories.md`
- Data model details: `data-model/entities.md`
- Schema definition: `data-model/schema.sql`
- Test scenarios: `test-scenarios/*.feature`
- Constraints: `constraints.md`

