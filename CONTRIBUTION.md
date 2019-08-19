# Contributing

This document outlines the contribution guidelines for NRL Engineering’s Frontend/JS.

- [Style](#Style)
  * [Code](#Code)
    + [Project Setup](#Project-Setup)
	+ [Third-Party Libraries](#Third-Party-Libraries)
	+ [React Guide](#React-Guide)
	+ [Next.js Guide](#Nextjs-Guide)
	+ [CSS Guide](#CSS-Guide)
- [Pull Requests](#Pull-Requests)
  * [Merging](#Merging)
  * [Commits](#Commits)
  * [Commit Message](#Commit-Message)
- [CI/CD: Netlify](#CICD-Netlify)
- [Tests](#Tests)
- [Release](#Release)
- [Licenses and Attribution](#Licenses-and-Attribution)

## Style
Define and follow eslint rules specified in `.eslintrc.js`. Set up your IDE to show lint errors and warnings.
Before every commit, check for issues with `npm run lint`. Check with the team before adding or removing lint rules.

### Code
Below are some stylistic choices not covered by the linter. In general, try to follow style examples from existing code.

#### Project Setup
- React.js: You are welcome to use boilerplates such as `create-react-app`, but please make sure all configurations can be cleanly modified. CRA can result in messy configurations after ejecting.
- Next.js: // To be written by @vlad
- React-based projects should use `.env` files to encourage environment variables to be used throughout the project.

#### Third-Party Libraries
All libraries should be approved by each project’s engineering manager.

## React Guide

### Project Structure/Hierarchy
For large projects, define at least the following three directories for components, containers, and layouts like the example below.

    awesome-react-project/
    └── src/
       ├── components/
       ├── containers/
       └── layouts/

  Each of these directories have special types of components:
  - ### components/
    * Stateless components. Shouldn't store state. Most components in this directory will be function-based components. Stuff like buttons, inputs, labels and all presentational components goes here. This components can also accept functions as props and dispatch events, but no state should be held inside.

  - ### containers/
    * Container components can store state. Containers are built mostly from the composition of presentational components with some styles to layout them together. Containers can also store internal state and access refs to provide additional logic, but all actions should be accepted as component callbacks.

  - ### layouts/
    * Layout (or Page) components can store state, receive route parameters and dispatch Redux actions when applicable. Pages are the highest level of application's components. They represent the application routes and most times are displayed by a router. Pages are also responsible for handling container components callbacks and flowing data into children containers.

### Lifecycle Methods and Hook APIs
**IMPORTANT**: Do not use deprecated (These are supported until React 17, and will be deprecated) methods such as `componentWillMount` or `componentWillReceiveProps`. Please refer to [this documentation](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount) for more details.

We strongly recommend to use hook apis and functional components instead of lifecycle methods and class/HOC components, since it adds more complexity as well as performance issue. See the discussion [here](https://reactjs.org/docs/hooks-intro.html#motivation).

If there are some cases that must use lifecycle methods please follow the **Method Hierarchy** below:

- **Method Hierarchy**: All components should use the following ordering for method hierarchy:
  1. optional static methods
  2. `constructor`
  3. `componentDidMount`
  4. `componentDidUpdate`
  5. clickHandlers or eventHandlers like `onClickSubmit()`
  6. getter methods for render e.g. `getDropdownOptions()` (For API calls)
  7. optional render methods e.g. `renderNavigation()` or `renderProfilePicture()` (Render only)
  8. `render`

#### Hook API Usage:
**`useState` Example**
```js
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <button onClick={decrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>    
    </div>
  );
};

export default Counter;
```

**`useEffect` Example**
```js
import React, { useEffect, useState } from 'react';

/**
 * IMPORTANT:
 * Make sure to pass empty array in second param, if you want the callback called at first rendering.
 * It's the same effect as calling in `componentDidMount`, otherwise it will be called every time component updated.
 */
const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(results => results.json())
      .then((data) => {
        setUser(data.results[0]);
      });
  }, []);

  return (
    <div className="me">
      <span>My random name: {user ? `${user.name.first} ${user.name.last}` : ''}</span>
    </div>
  );
};

export default Me;

```
Please see the [React official document](https://reactjs.org/docs/hooks-intro.html) for more information about hook APIs.

### Type Checking
Options include [Flow](https://flow.org/), [TypeScript](https://www.typescriptlang.org/), and [PropTypes](https://www.npmjs.com/package/prop-types). For larger projects, Flow and TypeScript [is recommended over PropTypes](https://reactjs.org/docs/static-type-checking.html).

### Packages and Import Order
#### dependences
Install the latest version of react packages higher than `16.8.6`. Whether to use redux or not is project choice.
```json=
{
    "history": "^4.9.0",
    "node-sass": "^4.12.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-redux": "^7.1.0",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1",
    "redux": "^4.0.4",
    "redux-saga": "^1.0.5"
}
```
#### devDependences
```json=
{
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "17.1.1",
    "eslint-config-prettier": "^6.0.0",
    "eslint-plugin-import": "^2.18.0",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-prettier": "^3.1.0",
    "eslint-plugin-react": "^7.14.2",
    "prettier": "^1.18.2",
    "stylelint": "^10.1.0",
    "stylelint-config-standard": "^18.3.0",
    "stylelint-scss": "^3.9.2"
}
```

#### Import Order
Module imports must be ordered as following to make sure that main libraries and absolute paths are imported first. Absolute imports are preferred than relative imports.
1. react
2. prop-types
3. redux, redux-saga
4. react-router-dom
5. other npm libraries
6. custom redux modules (i.e. actions, selectors)
7. components (larger/parent first)
8. utility functions
9. static resources (css, images, icons, json)

### Testing
Jest or Mocha is recommended for unit testing and Cypress for end-to-end testing. See the instructions for [environment setup](https://reactjs.org/docs/testing-environments.html) and [examples](https://reactjs.org/docs/testing-recipes.html) and please provide the command in `package.json` file to use with npm run command (i.e. `npm run test`).

Test cases are preferred to be located in the same folder of the corresponding component, named as `ComponentName.test.js`

## Next.js Guide
// To be written by @vlad

## CSS Guide
### Theming/Variables
Define files to contain commonly used variables such as colors and font definitions.

### Layout Libraries
Unless specified by the designer, most column-based grid systems are not necessary and result in inability to fulfill the designer’s exact requirements for padding/margins for various resolutions. Almost all layout styling should be able to be completed using basic [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and/or [grid layout](https://css-tricks.com/snippets/css/complete-guide-grid/) from CSS3.

### CSS-in-JS
If you prefer CSS-in-JS, please consult with the main engineering manager of the project to decide on the library. Commonly used libraries include [styled-components 💅](https://www.styled-components.com/), [emotion](https://emotion.sh/docs/introduction), and more.

### SASS vs. LESS
Since React 16.x supports SASS now, please use the [node-sass](https://github.com/sass/node-sass) package [as instructed by React here](https://create-react-app.dev/docs/adding-a-sass-stylesheet). If you really prefer to use LESS, please consult with your project's engineering manager.

- The viewport meta tag is also needed to instruct a mobile device to keep the viewport to the amount of pixels it has on the screen i.e. prevent it from zooming out like a desktop version.

```htmlmixed=
<meta name="viewport" content="initial-scale=1.0, width=device-width">
```

### Style Guide
Please refer to [this page](https://codeguide.co/#css) for a general guideline.

### CSS vendor prefixes
Vendor extension for style rules should not be necessary with SASS/LESS + Webpack.

## Dev Dependencies
// To be written by @charn

## Testing Frameworks
// To be written by @charn and @vlad
// Please write two separate sections for React (@charn) & Next.js (@vlad)

## Pull Requests
Pull requests (PRs) represent a feature branch that is currently in progress, or ready to merge to `master`
There may be multiple PRs per issue, but each PR should only cover a single issue.

Please follow these steps to ensure a smooth process:
- Link to the corresponding issue in the description (e.g. `#117`) and/or provide a description of a general changelog that summarizes the commit messages.
  - If the PR is for a hotfix, mention it in the description
- Use applicable labels (such as `DO NOT MERGE` or `in progress`)
- Follow the below style guide on commits
- Verify that status checks are passing
- Remove trivial commits and poorly worded messages where possible with [interactive rebase](https://thoughtbot.com/blog/git-interactive-rebase-squash-amend-rewriting-history#interactive-rebase)

### Merging
There should never be any merge commits in `master`. All PRs must be rebased on `master` if they cannot be fast-forwarded (e.g. if there are conflicts).

### Commits
- Follow the commit message guidelines below
  - Use present tense and tag the issue number if it applies ("Fix bug" or Fix #{number}" or "Fixes #{number}", not "Fixed bug")
- No merge commits, PRs must be rebased on master before merging
  - If there are conflicts, this must be done locally. A force push is necessary (`git push -f`) for resolving rebase merge conflicts.
- One task/subtask per commit
- Push feature branches at least once per day
  - Delete after PR is merged
- Push as often as possible, but avoid pushing broken code
- `master` branch deploys to a staging server

### Commit Message
Header line: explain the commit in one line

Body is a few lines of text explaining things in more detail,
possibly giving some background about the issue or feature.

The body of the commit message can be several paragraphs, with
manual word-wrap and columns limited to roughly 70 characters.
That way "git log" will show things nicely even when it's indented.

Explain your solution and why you're doing what you're doing,
as opposed to describing what you're doing. Reviewers and your
future self can read the patch, but might not understand why a
particular solution was implemented.

The header line must be limited to 70 characters, preferably 60. If the commit is related to a Github issue or pull request, reference it using the GH-X method (or `"Issue #{number}"`) at the end of the message, where X is the issue/PR number. If there is no commit message body, place it at the beginning of the header line.

## CI/CD: Netlify
To be written by @vlad or @charn

## Testing
To be written by @vlad or @charn

## Credits
Thanks [@sampullman](github.com/sampullman) from Pledgecamp for providing a template for this document.

## Release

## Licenses and Attribution

