# Security Specification for Gursha Heritage

## Data Invariants
- **User Ownership**: Users can only access and manage their own profile and orders.
- **Relational Integrity**: Orders must be linked to a valid User ID that matches the authenticated requester.
- **Immutability**: Essential fields like `createdAt` and `userId` cannot be changed after creation.
- **Type Safety**: All fields must strictly conform to expected types (string, number, list, timestamp).
- **Size Limits**: String and list fields have strict size boundaries to prevent resource exhaustion.

## The Dirty Dozen Payloads

1. **Identity Spoofing (User)**: Authenticated User A tries to create/update `/users/UserB`.
2. **Identity Spoofing (Order)**: User A tries to create an order at `/orders/order123` but sets `userId: "UserB"`.
3. **Ghost Field Injection**: Adding `isAdmin: true` to a user profile payload.
4. **ID Poisoning**: Using a 1.5KB junk string as a `userId` or `orderId`.
5. **Timestamp Spoofing**: Attempting to set `createdAt` manually to a past/future date instead of `request.time`.
6. **Negative Pricing**: Creating an order with a subtotal or total less than zero.
7. **Bulk Resource Attack**: Creating an order with 10,000 items in a single document.
8. **Unauthorized Peeking**: User A tries to `get` or `list` orders belonging to User B.
9. **Update Shortcut**: Attempting to change an order's status directly to `completed` without going through the server process (if applicable).
10. **State Corruption**: Changing the `userId` of an existing order to transfer ownership.
11. **Orphan Writing**: Writing an order with a `userId` that doesn't exist in the `/users/` collection.
12. **Blanket Querying**: Attempting a collection group query or list without a `where` clause on `userId`.

## Red Team Audit Criteria
- [ ] No `allow read: if isSignedIn()` without resource filtering.
- [ ] Every `create` and `update` uses `isValid[Entity]()`.
- [ ] All IDs are validated with `isValidId()`.
- [ ] Terminal states (if any) are locked.
- [ ] Affected keys are strictly gated on updates.
