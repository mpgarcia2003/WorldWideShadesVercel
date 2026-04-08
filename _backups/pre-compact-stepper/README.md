Backup created before compact stepper + sticky CTA changes.
Date: April 8, 2026
Commit before changes: Use `git log` to find the commit before "compact stepper" changes.

To revert Stepper.tsx:
  git checkout HEAD~1 -- components/Stepper.tsx

Or copy from git:
  git show HEAD~1:components/Stepper.tsx > components/Stepper.tsx
