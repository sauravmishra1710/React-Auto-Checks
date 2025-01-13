# React Auto Checks
## Automating Commit Checks with Jest and ESLint

Maintaining code quality has become an essential part in application development lifecycle to ensure applications remain robust & maintainable in the long run. However, enforcing consistent code styles, formatting, linting standards can be tedious and error-prone. Same goes with running unit tests manually to ensure the code changes made have not broken any existing functionality or tests. Rules can be enforced by teams to run these tests or lints manually before every code commit but they are easy to get missed in day to day tasks. So, automating these steps becomes an essestial part of the development process to maintain a clean code base with consistent formatting style across project & ensuring existing functionality remains intact. As part of this project we look at how we can define an automated solution that integrates **linting** and **testing** into the development workflow, ensuring that only high-quality code gets committed or pushed.

**React Auto Checks** leverages tools like [Husky](https://github.com/typicode/husky), [Lint-Staged](https://github.com/lint-staged/lint-staged) to enforce **linting rules during git commit** and **run jest unit tests during git push**.

Before getting into the specifcs of the automation setup, let's first go through the the basics of git hooks, husky, & lint-staged that we will be using for the process.

## What are Git hooks?

Git hooks are scripts that git runs automatically before or after specific events (or actions commit, push, merge etc...) in the git version control lifecycle. These hooks are basically implemented to automate repetitive tasks, enforce workflows, and improve code quality by integrating tools into the version control process early in the version control lifecycle. For e.g., the pre-commit and pre-push hooks are specific types of hooks that run before the commit & push actions respectively.

## Types of Git Hooks
Git hooks can be categorized into two types:

Client-Side Hooks: Operate on developer machines. Examples include:

   - pre-commit: Runs before a commit is created (e.g., to lint code).
   - pre-push: Runs before pushing changes to a remote repository (e.g., to run tests).
   - commit-msg: Validates the commit message format.

Server-Side Hooks: Operate on remote repositories. Examples include:
  - pre-receive: Runs before accepting changes in a repository.
  - post-receive: Runs after changes are accepted in a repository.

Hooks are scripts or executables residing in the .git/hooks directory of the Git repository written in any scripting or programming language for e.g., shell scripts, python, etc...

**Reference:** https://git-scm.com/docs/githooks
