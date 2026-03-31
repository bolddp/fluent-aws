# Changelog

## v0.25.0 - 2026-03-31

- Added `activate()` to `CognitoUser`, which confirms a user's sign-up as an admin without requiring email verification.

## v0.24.0 - 2026-03-29

- Added `findUsersByEmail(email)` to `CognitoUserPool` and `findByEmail(email)` to `CognitoUserCollection`, allowing prefix-filtered Cognito user lookups by email address. Closes #15.
