ClassBuilder = function () {
  var _chainedString = '';

  var block = function(b) {
    _chainedString += b;
    return this;
  }

  var element = function (e) {
    if (e) {
      _chainedString += '__' + e;
    }

    return this;
  }

  var modifier = function (m) {
    if (m) {
      _chainedString += '--' + m;
    }

    return this;
  }

  var build = function () {
    return _chainedString;
  }

  return {
    block: block,
    element: element,
    modifier: modifier,
    build: build
  };
}