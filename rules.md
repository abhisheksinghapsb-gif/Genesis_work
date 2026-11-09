# Contribution & Git Workflow Rules

This document outlines the mandatory Git and collaboration rules for developing in this repository.

---

## 1. Repository Roles

- **Forked Repository (`origin`):**  
  `https://github.com/abhisheksinghapsb-gif/Genesis_work`  
  This is the primary working repository. All active development, staging, and direct pushes happen here.

- **Main Upstream Repository (`upstream`):**  
  `https://github.com/vaman-dev/Genesis`  
  This is the upstream target repository. Direct pushes are not permitted here; changes are merged strictly through Pull Requests (PRs).

---

## 2. Core Development Rules

> [!IMPORTANT]
> **Push to Fork First, Then PR to Upstream:**  
> All changes MUST first be committed and pushed to the `main` branch of this forked repository (`abhisheksinghapsb-gif/Genesis_work`). Only after the changes are safely landed on the fork should a Pull Request be created targeting the upstream repository (`vaman-dev/Genesis:main`).

### Summary of Rules:
1. **Never push directly to `upstream`**. Always push to `origin` (this fork).
2. **First push to the fork (`origin/main`)**: Verify the implementation and ensure the build passes.
3. **Create a Pull Request to `upstream/main`**: Submit a PR from `abhisheksinghapsb-gif/Genesis_work:main` to `vaman-dev/Genesis:main`.
4. **Keep Fork Synchronized**: Regularly fetch and merge upstream changes to avoid merge conflicts.
5. **Verify Before Pushing**: Run local lint and build checks (`npm run lint`, `npm run build`) before pushing code.

---

## 3. Step-by-Step Git Workflow

### Step 1: Keep Local Fork in Sync with Upstream
Before starting work, ensure your local copy is up to date with the upstream repository:
```bash
# Fetch latest changes from upstream
git fetch upstream

# Ensure you are on the main branch
git checkout main

# Merge latest upstream changes into local main
git merge upstream/main

# Update your remote fork
git push origin main
```

---

### Step 2: Make Changes & Test Locally
Develop your features or bug fixes. Before staging, verify code quality:
```bash
# Run lint checks
npm run lint

# Verify build passes
npm run build
```

---

### Step 3: Commit and Push to Forked Repository (`origin/main`)
Stage, commit, and push your changes to this fork's `main` branch:
```bash
# Stage changes
git add .

# Commit with a clear, descriptive message
git commit -m "feat/fix: describe the changes made"

# Push to the forked repo's main branch
git push origin main
```

---

### Step 4: Create a Pull Request (PR) for Main Repository
Once your changes are pushed to `origin/main`:

1. Navigate to the forked repository on GitHub:  
   👉 [https://github.com/abhisheksinghapsb-gif/Genesis_work](https://github.com/abhisheksinghapsb-gif/Genesis_work)
2. Click **Contribute** > **Open pull request** (or click **New Pull Request**).
3. Set the target branches:
   - **Base repository:** `vaman-dev/Genesis` (branch: `main`)
   - **Head repository:** `abhisheksinghapsb-gif/Genesis_work` (branch: `main`)
4. Fill in the PR description:
   - Summary of changes
   - Motivation and context
   - Verification steps taken
5. Submit the Pull Request for review.

---

## 4. Pre-Flight Checklist Before Submitting PR

- [ ] All code changes are committed and pushed to `origin/main`.
- [ ] No build errors (`npm run build` succeeds).
- [ ] No lint errors or warnings (`npm run lint`).
- [ ] No accidental secrets, `.env` files, or unintended files committed.
- [ ] PR title is descriptive and follows standard conventions (`feat:`, `fix:`, `docs:`, etc.).

