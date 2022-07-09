module.exports = function(plop) {
  plop.setGenerator('wrapper', {
    description: 'wrapper',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'wrapper name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/helpers/wrappers/With{{name}}.jsx',
        templateFile: 'plop-templates/wrapper.hbs',
      },
    ],
  });
  plop.setGenerator('component', {
    description: 'component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}.jsx',
        templateFile: 'plop-templates/component.hbs',
      },
      // {
      //     type: 'add',
      //     path: 'components/__stories__/{{name}}.stories.jsx',
      //     templateFile: 'plop-templates/stories.hbs',
      // },
    ],
  });

  plop.setGenerator('page', {
    description: 'screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'screen name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{name}}.jsx',
        templateFile: 'plop-templates/page.hbs',
      },
    ],
  });
};
