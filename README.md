# React Auto Checks
## Automating Commit Checks with Jest and ESLint

Maintaining code quality has become an essential part in application development lifecycle to ensure applications remain robust & maintainable in the long run. However, enforcing consistent code styles, formatting, linting standards can be tedious and error-prone. Same goes with running unit tests manually to ensure the code changes made have not broken any existing functionality or tests. Rules can be enforced by teams to run these tests or lints manually before every code commit but they are easy to get missed in day to day tasks. So, automating these steps becomes an essestial part of the development process to maintain a clean code base with consistent formatting style across project & ensuring existing functionality remains intact. As part of this project we look at how we can define an automated solution that integrates **linting** and **testing** into the development workflow, ensuring that only high-quality code gets committed or pushed.

**React Auto Checks** leverages tools like [Husky](https://github.com/typicode/husky), [Lint-Staged](https://github.com/lint-staged/lint-staged) to enforce **linting rules during git commit** and **run jest unit tests during git push**.

Before getting into the specifcs of the automation setup, let's first go through the the basics of git hooks, husky, & lint-staged that we will be using for the process.

## What are Git hooks?

Git hooks are scripts that git runs automatically before or after specific events (or actions commit, push, merge etc...) in the git version control lifecycle. These hooks are basically implemented to automate repetitive tasks, enforce workflows, and improve code quality by integrating tools into the version control process early in the version control lifecycle. For e.g., the pre-commit and pre-push hooks are specific types of hooks that run before the commit & push actions respectively.

Hooks are scripts or executables residing in the .git/hooks directory of the Git repository written in any scripting language for e.g., shell scripts, python, etc...

## Types of Git Hooks

There exist several types of hooks, each written to serve a specific purpose. Pre-commit hooks can be used to enforce code formatting or run tests before a commit is made. Pre-push hooks can be used to run additional tests before the push operation to a branch. Post-merge hooks execute after a code merge is complete & could serve actions such as updating dependencies or generating documentation. 

Git hooks can be majorly categorized into two types -

1. Client-Side Hooks.
2. Server-Side Hooks.

`Client-side hooks are triggered on local developer machines by actions such as code commit or merge, while server-side hooks are triggerd operate on remote repositories by network operations such as receiving pushed commits.`

**Client-Side Hooks**
   - **pre-commit:** The pre-commit hook runs on the `git commit` command before Git checks for a **commit message** or **generates a commit object**. This can be used to run tests ot code formatting operations to enfore a common styling approach to the files included for commit.
   - **Prepare-Commit-Msg:** The prepare-commit-msg hook runs just after the pre-commit hook to populate the commit message with text coming from a template. 
   - **commit-msg:** The commit-msg hook runs after the prepare-commit-msg hook and after the user completes the commit message. Where the prepare-commit-msg hook prepares the template for the message, this commit-msg hook checks that the message has been properly formatted.
   - **pre-push:** Runs before pushing changes to a remote repository (e.g., to run tests).
   - **post-commit**: The post-commit hook runs immediately after the successful run of the commit-msg hook. This hook does not change the status of the commit. Instead, this hook is used to send out notifications & trigger emails to  relevant stakeholders to inform about the code changed.
   - **pre-push:** The pre-push hook runs just before the `git push` operation, after the **remote refs have been updated** but **before any objects have been transferred**.

**Server-Side Hooks**
  - **pre-receive:** The pre-receive hook runs before a client pushes a commit using `git push` or accepting changes in a repository.
  - **post-receive:** The post-receive hook runs after a push commit runs successfully. This hook is similar to the post-commit hook but ideally this would be a more logical option to send out notifications about the code changes made compared to the post-commit client side hook as this resides on a central server. 

**Reference:** https://git-scm.com/docs/githooks
