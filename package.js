Package.describe({
  name: 'capsulecat:react-bem',
  version: '1.0.0',
  summary: 'BEM class names are systematic. So why write them yourself?',
  git: 'https://github.com/CapsuleCat/MeteorReactBEM',
  documentation: 'README.md'
});

function includeFiles(api) {
  api.use('ecmascript');
  api.use('react');
  api.addFiles('src/ClassBuilder.js');
  api.addFiles('src/ReactBEM.js');
}

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  includeFiles(api);
  api.export('ReactBEM');
});

Package.onTest(function(api) {
  api.use('mike:mocha-package');
  includeFiles(api);
  api.addFiles('tests/ReactBEM.test.js', ['client']);
});