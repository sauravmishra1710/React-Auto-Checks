# React Auto Checks
## Automate Lint, Jests with Husky & Lint-Staged

ESLint & Jest unit tests are an integral part of almost every frontend project. ESlint help the development teams to maintain consistent code formatting & styles across projects. Jest ensures unit tests are well written & maintain the code coverage with every bit of code tested via unit tests, the new changes do not break any existing functionality. However, running lints & jests manually every time a code change is ready to be committed can be a tedious task. Rules can be enforced by teams to run these tests or lints manually before every code commits but they are easy to get missed in day to day tasks. Therefore, automating these steps becomes an essential part of the development process to maintain a clean code base with consistent formatting style across project & ensuring existing functionality remains intact. 

As part of this project we look at how we can define an automated solution that integrates **linting** and **testing** into the development workflow, ensuring that only high-quality code gets committed or pushed.

**React Auto Checks** leverages tools like [Husky](https://github.com/typicode/husky), [Lint-Staged](https://github.com/lint-staged/lint-staged) to enforce **linting rules during git commit** and **run jest unit tests during git push**.

Before getting into the specifics of the automation setup, let's first go through the basics of git hooks, husky, & lint-staged that we will be using for the process.

## Git Hooks

Git hooks are scripts that git runs automatically before or after specific events (or actions like commit, push, merge etc...) in the git version control lifecycle. These hooks are basically implemented to automate repetitive tasks, enforce workflows, and improve code quality by integrating tools into the version control process early in the version control lifecycle. For e.g., the pre-commit and pre-push hooks are specific types of hooks that run before the commit & push actions respectively.

Hooks are scripts or executables residing in the .git/hooks directory of the Git repository written in any scripting language for e.g., shell scripts, python, etc...

## Types of Git Hooks

There exist several types of hooks, each written to serve a specific purpose. Pre-commit hooks can be used to enforce code formatting or run tests before a commit is made. Pre-push hooks can be used to run additional tests before the push operation to a branch. Post-merge hooks execute after a code merge is complete & could serve actions such as updating dependencies or generating documentation. 

Git hooks can be majorly categorized into two types -

1. Client-Side Hooks.
2. Server-Side Hooks.

`Client-side hooks are triggered on local developer machines by actions such as code commit or merge, while server-side hooks are triggered to operate on remote repositories by network operations such as receiving pushed commits.`

**Client-Side Hooks**
   - **pre-commit:** This hook runs on the `git commit` command before Git checks for a **commit message** or **generates a commit object**. This can be used to run tests or code formatting operations to enfore a common styling approach to the files included for commit.
   - **Prepare-Commit-Msg:** This hook runs just after the pre-commit hook to populate the commit message with text coming from a template. 
   - **commit-msg:** This hook runs after the prepare-commit-msg hook and after the user completes the commit message. Where the prepare-commit-msg hook prepares the template for the message, this commit-msg hook checks that the message has been properly formatted.
   - **pre-push:** This hook runs before pushing changes to a remote repository (e.g., to run tests).
   - **post-commit**: This hook runs immediately after the successful run of the commit-msg hook. This hook does not change the status of the commit. Instead, this hook is used to send out notifications & trigger emails to  relevant stakeholders to inform about the code changed.
   - **pre-push:** This hook runs just before the `git push` operation, after the **remote refs have been updated** but **before any objects have been transferred**.

**Server-Side Hooks**
  - **pre-receive:** This hook runs before a client pushes a commit using `git push` or accepting changes in a repository.
  - **post-receive:** This hook runs after a push commit runs successfully. This hook is similar to the post-commit hook but ideally this would be a more logical option to send out notifications about the code changes made compared to the post-commit client side hook as this resides on a central server. 

**Reference:** https://git-scm.com/docs/githooks

## Husky

[Husky](https://typicode.github.io/husky/) is a tool that allows us to automate the Git hook setup and execution in the node environment.

### How Husky Works?

- **Automatic Hook Setup:** Husky configures Git hooks automatically during project setup.
- **Integration with npm scripts:** Allows to integrate custom npm scripts written as part of package.json to manage the husky installation, initialization & complete lifecycle. Hooks can execute commands or scripts defined in the package.json file.
- **Centralized Hook Management:** Husky uses the `.husky` directory to manage client side hooks, making them version-controlled and shareable across teams.

Husky ensures these hooks run automatically during Git operations. **`If a hook’s command fails, the associated Git operation is aborted`**.

## Lint-Staged
[Lint-staged](https://github.com/lint-staged/lint-staged) executes the lint checks against the **`staged git files`** and basically gates the files being committed. It ensures code formatting/style remains consistent & there are no issues in the files staged files. These gate keeping checks are made efficient by including only the staged files. Optionally, list-staged can be run with the **`--fix`** option to ensure all auto-fixable errors are fixed automatically. The **commit is aborted** if any errors are reported.

### How Lint-Staged Works?
- Extract the files in the Git staging area & ready for commit (uses `git diff --name-only --staged/--cached` -- [getStagedFiles](https://github.com/lint-staged/lint-staged/blob/master/lib/getStagedFiles.js#L13), [diff utilizing --staged](https://github.com/lint-staged/lint-staged/blob/master/lib/getDiffCommand.js#L9)).
- Triggers ESlint commands on the above extracted files.
- Applies fixes to any all auto-fixable errors if **`--fix`** option was provided (e.g., via eslint --fix).
- Adds the modified files back into the staging area.

## How Husky Hooks and Lint-Staged Work Together?
Husky and Lint-Staged complement each other to enforce code quality standards during commits.

1. Husky triggers the pre-commit hook on git commit & the hook executed the command for Lint-Staged.
2. Lint-Staged triggers ESlint checks on the the staged files.
3. The staged files are given a green light to proceed with commit for successful lint execution.
4. The commit is blocked & aborted if any of the lint check fails (not auto-fixable/warnings), prompting the developer to fix the issues before retrying to commit again.

The above process/steps will remain same for the pre-push hook to execute the jest unit tests before any commit in pushed to the remote branch. If any of the unit tests fails, then the **push operation is aborted, prompting the developer to fix the failing tests** before retrying to push again.

## Benefits of Combining Git Hooks, Husky, Lint-Staged & Jest Test Suite

1. Always ensures clean code is committed/pushed.
2. As Lint-staged focuses on staged files, allows for a faster lint execution time. However, for executing the unit tests as part of the pre-push hook, the entire jest suite should be run to ensure functionality is not broken.
3. Ensures consistent standards are followed by every contributor & are forced to fix any issues/failures before making a commit.
4. Reduces manual efforts by automating the workflow for executing tests or applying code formatting/styling.
   
These tools & automation allow to create a robust, automated workflow for promoting clean, maintainable code while minimizing errors/failures in production.

## Installation & Setup

### Install Husky

```
npm install --save-dev husky
```

### Initialize Husky
The init/install command sets up husky configuration in a project. It creates a **pre-commit** script within the .husky/ directory and updates the **prepare** script in package.json

```
npx husky init
```
OR 
```
npx husky install
```
### Add the Pre-Commit Hook
This will add the pre-commit hook script file & add the command to execute lint on the staged files.
```
npx husky add .husky/pre-commit && echo npx lint-staged > .husky/pre-commit
```

### Add the Pre-Push Hook
This will add the pre-push hook script file & add the command to execute the jest test suite on the project.

```
npx husky add .husky/pre-push && echo npm run test:jest > .husky/pre-push
```

### Configure Package.json

Update the package.json to add configurations for the husky hooks & lint-staged executions - 

#### Husky

```
  "husky": {
    "hooks": {
      "pre-commit": "eslint --fix",
      "pre-push": "npm run test:jest"
    }
  },

```
#### Lint-Staged

```  
  "lint-staged": {
    "*.(js|jsx)": [
      "eslint --fix"
    ]
  }
```
During the hook execution lint-staged will identify the *.js/.jsx files staged for commit & run the `eslint --fix` to automatically fix issues.

#### Custom npm scripts

To completely automate the lifecycle management of husky hooks & get the configuration complete as part of `npm install` itself, we will introduce the following custom scripts in package.json - 

1. **clean** - this will clean the complete project (husky, package-lock & node_modules) & allow for re-installation.
2. **clean:install** - this will run the clean script & trigger the installation of project.
3. **clean:husky** - this will clean the husky configuration files & hook files. It will leave the empty .husky folder.
4. **husky-init** - this will initialize the husky configuration, add the pre-commit hook script file with the command to execute lint on the staged files, add the pre-push hook script file & add the command to execute the jest test suite on the project.
5. **prepare** - this will run as part of the post npm install command to initialize husky.

```
    "clean": "npm run clean:husky && rimraf ./package-lock.json && rimraf ./node_modules",
    "clean:install": "npm run clean && npm install",
    "clean:husky": "rimraf ./.husky/_ && rimraf ./.husky/pre-commit && rimraf ./.husky/pre-push",
    "husky-init": "husky install && npx husky add .husky/pre-commit && echo npx lint-staged > .husky/pre-commit && npx husky add .husky/pre-push && echo npm run test:jest > .husky/pre-push",
    "prepare": "npm run build && npm run husky-init"
```
**NOTE:** <br>
1. The hooks can be bypassed with the `-n` or `--no-verify` option.
2. The above configurations are good to be executed from the git command line as well as any Git GUI like the Git desktop or VS Code Git UI.

## Hook Execution in Action
### pre-commit
<img width="1239" alt="lint-staged-pre-commit-hook" src="https://github.com/user-attachments/assets/35224597-a3e7-4529-be32-2cbf0cfbbfd9" />
<img width="1239" alt="lint-staged-pre-commit-hook-complete" src="https://github.com/user-attachments/assets/7e8deb20-459c-42ca-9268-bd013f7db186" />

### pre-push
<img width="1239" alt="jest-pre-push-hook" src="https://github.com/user-attachments/assets/1835e9f0-7f89-4336-8cb3-d292d3585a46" />

### Complete Workflow
<img width="1328" alt="git_hook_workflow" src="https://github.com/user-attachments/assets/9ced9711-b59e-496a-a566-eac1d46ba2f8" />

## Potential Issues & Solutions

You might land into the following issues when executing the hooks.

1. **No tests found related to files changed since last commit**<br>
   When executing Jest as part of the pre-push hook, it is possible to land on this error.
   
   ![no_tests_found_after_last_commit_jest](https://github.com/user-attachments/assets/4d8935b1-ac78-47ad-b6b0-a3781b63e2b9)

   The resolution is to modify the test script in package.json as - `"test": "react-scripts test --watchAll=false"`
   Reference: https://stackoverflow.com/questions/76743844/react-18-with-husky-pre-commit-and-jest-no-tests-found-exiting-with-code-1
   
2. **Hook was ignored because it's not set as executable**<br>
   This is a problem where **husky wasn't created taking into account the file permissions of Linux** during initialization.
   ```
   chmod ug+x .husky/*
   ```
   Reference: https://github.com/typicode/husky/issues/1177#issuecomment-1212831091

3. `npx: command not found` - in Git GUI tools
   
   <img width="433" alt="npx_not_found_git_desktop" src="https://github.com/user-attachments/assets/cc9f3720-cae4-4bd0-8d6f-c622ca8d646c" />
   
   Resolution: Restart Git desktop or VS Code IDE and this should get resolved. However, if you still face issues after restarting, refer - [vscode-github-desktop-pre-commit-hook-npx-command-not-found](https://stackoverflow.com/questions/67115897/vscode-github-desktop-pre-commit-hook-npx-command-not-found).
   
## Conclusion

Automating ESLint & Jest using git hooks is a very powerful way to enhance the daily workflow & activities for development. Tools like Husky and Lint-Staged enable seamless integration of Git hooks with any project and ensures that issues are caught and resolved early, maintain consistent code quality, and prevent broken builds & functionality. These tools allow to be proactive & catch issues early in the lifecycle rather than reacting to a broken build or production failure.
