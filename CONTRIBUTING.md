# CONTRIBUTING ✨

## Table Of Contents

-   [Setup](#setup)
-   [Development](#development)
    -   [Tooling](#tooling)
    -   [Commands](#commands)
-   [Pull Request](#pull-request)
-   [Commit Convention](#commit-convention)
-   [Steps to PR](#steps-to-pr)
-   [PR Required Status Checks](#pr-required-status-checks)
-   [PR Title](#pr-title)
-   [License](#license)

## Setup

1. Fork the repo

2. Clone your fork locally

3. Setup all the dependencies and packages by running `npm install`

```sh
git clone https://github.com/<your_github_username>/vlossom.git
cd vlossom
npm install
cd packages/vlossom
npm run storybook
```

## Development

### Tooling

-   [NPM](https://www.npmjs.com/) to manage packages and dependencies
-   [Vite](https://vitejs.dev/) to run dev server and bundle packages
-   [Vitest](https://vitest.dev/) and [Vue Test Utils](https://test-utils.vuejs.org/) for test
-   [Storybook](https://storybook.js.org/) for UI component development and test
-   [Chromatic](https://www.chromatic.com/) for UI test and review

### Commands

#### in packages/vlossom

**`npm run storybook`**: run storybook

**`npm run test`**: run test

**`npm run dev`**: run playground

#### in packages/docs

**`npm run dev`**: run dev server

## Pull Request

Our protected branch is `main` and we make release from `main` branch.

Pull requests need approvals of two or more collaborators to be merged.

And all required status checks must pass before merging.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

`type(scope or module): message`

Type must be one of the following:

-   `feat`: all changes that introduce completely new code or new features
-   `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
-   `refactor`: any code related change that is not a fix nor a feature
-   `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
-   `build`: all changes regarding the build of the software or dependencies
-   `test`: all changes regarding tests (adding new tests or changing existing ones)
-   `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
-   `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   `perf`: changes that improves performance
-   `chore`: all changes to the repository that do not fit into any of the above categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/vs-button` or `docs/vs-chip`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

2. Make and commit your changes following the
   [commit convention](https://github.com/pubg/vlossom/blob/main/CONTRIBUTING.md#commit-convention).

3. As you develop, you can run `npm run build` and `npm run test` to make sure everything works as expected.

If you are updating features, you must consider updating tests.

```sh
npm run test
```

If you are updating component or style system, you have to consider updating related story in stories folder.

```sh
npm run storybook
```

### PR Required Status Checks

-   `ci/test-vitest`
-   `ci/test-storybook`
-   `ci/lint`
-   `ci/build-vlossom`
-   `ci/build-docs`
-   `stroybook publish`
-   `ui tests`: you have to detect ui changes and accept all changes yourself
-   `ui review`: requires approval of vlossom maintainers

If you added commit after creating PR, the latest commit message must contain `chromatic-build` for updated ui test and review.
It will trigger chromatic build job.

### PR Title

`type(scope or module): short description`

## License

By contributing your code to the [vlossom](https://github.com/pubg/vlossom) GitHub repository,
you agree to license your contribution under the [MIT license](/LICENSE).
