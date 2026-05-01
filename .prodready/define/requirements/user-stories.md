# User Stories

## Epic 1: Identity and Profile

### US-001: Create account and sign in
**As a** new user  
**I want to** register and log in securely  
**So that** I can send and receive letters.

**Acceptance Criteria**:
- [ ] Given I am on the sign-up page, when I provide valid credentials, then my account is created and I am signed in.
- [ ] Given I have an account, when I submit correct credentials, then I can log in.
- [ ] Given I submit invalid credentials, when authentication fails, then I see a clear error message.

**Priority**: P0  
**Estimate**: M

---

### US-002: Manage user profile
**As a** signed-in user  
**I want to** edit bio and avatar  
**So that** others can know who I am.

**Acceptance Criteria**:
- [ ] Given I am signed in, when I update bio/avatar, then profile changes are saved.
- [ ] Given another user views me, when profile data exists, then they can see my bio/avatar.
- [ ] Given profile data is missing, when profile is displayed, then defaults are shown gracefully.

**Priority**: P1  
**Estimate**: S

---

## Epic 2: Private Letter Exchange

### US-003: Compose and send a private letter
**As a** user  
**I want to** write and send a letter to a recipient  
**So that** I can have thoughtful, delayed conversations.

**Acceptance Criteria**:
- [ ] Given I am composing a letter, when I submit valid content and recipient, then the letter is queued for delayed delivery.
- [ ] Given a delivery delay rule applies, when the letter is sent, then it is not visible to recipient before the scheduled time.
- [ ] Given letter content is empty, when I attempt to send, then the system blocks submission with validation feedback.

**Priority**: P0  
**Estimate**: L

---

### US-004: Browse letter history
**As a** user  
**I want to** see sent and received letters  
**So that** I can continue long-form conversations over time.

**Acceptance Criteria**:
- [ ] Given I am signed in, when I open history, then I see my letters ordered by most recent activity.
- [ ] Given I click a letter thread, when data loads, then I can read full message content and metadata.
- [ ] Given I am not a participant in a private letter, when I request it, then access is denied.

**Priority**: P0  
**Estimate**: M

---

## Epic 3: Discovery and Open Letters

### US-005: Find user by ID
**As a** user  
**I want to** search for someone by their user ID  
**So that** I can connect with known friends.

**Acceptance Criteria**:
- [ ] Given a valid user ID exists, when I search it, then matching user profile is shown.
- [ ] Given a user ID does not exist, when I search, then I get a clear no-results state.
- [ ] Given I try to search without authentication, when request is made, then it is rejected.

**Priority**: P0  
**Estimate**: S

---

### US-006: Discover people from a simple random list
**As a** new user  
**I want to** browse a simple random list of users  
**So that** I can find someone to write to without advanced matching.

**Acceptance Criteria**:
- [ ] Given I open discovery, when users are available, then I see a randomized list of candidates.
- [ ] Given I refresh discovery, when data is fetched again, then list order changes.
- [ ] Given no users are available, when I open discovery, then I see a friendly empty state.

**Priority**: P1  
**Estimate**: M

---

### US-007: Publish and reply to open letters
**As a** user  
**I want to** post open letters and reply to others  
**So that** I can meet new penpals in-app.

**Acceptance Criteria**:
- [ ] Given I compose an open letter, when I send it, then it appears in the public open-letter feed.
- [ ] Given I can view an open letter, when I reply, then reply is linked to the original letter thread.
- [ ] Given content violates basic moderation rules, when posted, then it is blocked or flagged.

**Priority**: P0  
**Estimate**: L

---

## Epic 4: Postcard Collection and Usage

### US-008: Earn or receive postcards into collection
**As a** user  
**I want to** collect postcards from achievements/events  
**So that** I can enrich my letter-writing experience.

**Acceptance Criteria**:
- [ ] Given I complete a qualifying event or achievement, when reward processing runs, then a postcard is added to my collection.
- [ ] Given I view my collection, when postcards exist, then I can see owned postcard inventory.
- [ ] Given reward processing runs twice for same unique event, when de-duplication applies, then duplicate grant is prevented.

**Priority**: P1  
**Estimate**: M

---

### US-009: Attach owned postcard to letter
**As a** user  
**I want to** include a postcard from my collection in a letter  
**So that** my letters feel more personal and old-school.

**Acceptance Criteria**:
- [ ] Given I own postcards, when composing a letter, then I can select one postcard to attach.
- [ ] Given I do not own a postcard, when I attempt to attach it, then the action is rejected.
- [ ] Given a letter with postcard is delivered, when recipient opens it, then postcard is shown with the letter.

**Priority**: P1  
**Estimate**: M

