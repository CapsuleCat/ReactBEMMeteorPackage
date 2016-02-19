# ReactBEM for Meteor

[![Build Status](https://travis-ci.org/CapsuleCat/MeteorReactBEM.svg?branch=master)](https://travis-ci.org/CapsuleCat/MeteorReactBEM) [![BSD 3-clause License](https://img.shields.io/badge/license-BSD-blue.svg)](/LICENSE)

BEM class names are systematic. So why write them yourself?

Note, as of Meteor 1.3, this will no longer be supported. Please use the original repo: [react-bem](https://github.com/cuzzo/react-bem).

[See the Original author](https://github.com/cuzzo/react-bem)

## Installation

```sh
meteor add capsulecat:react-bem
```

## BEM Class Nmes

React BEM automatically generates BEM style classes for React components because the very nature of BEM makes them systematic.

# Documenation

The package gives you a ReactBEM 

## Example Code

```js
Todo = React.createClass({
    mixins: [ReactBEM],
    bem_blocks: ["widget"],
    bem_block_modifiers: ["test"],
    bem_render: function () {
        return (
          <div role="introduction">
            <p>Hello</p>
          </div>
        );
    }
});
```

Which will output:

```html
<div class="widget--test__introduction widget__introduction" data-reactid=".0">
    <p class="widget--test__p widget__p" data-reactid=".0.0.0">Hello</p>
</div>
```

## Running Tests

Tests use Mocha. You can run tests completely from the command line:

```sh
VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter --velocity ./
```



