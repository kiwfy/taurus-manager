const _ = require('lodash');
const Handlebars = require('handlebars');

function replacer(key, value) {
  if (_.isObject(value)) {
    return _.transform(value, (result, v, k) => {
      result[Handlebars.Utils.escapeExpression(k)] = v;
    });
  }
  if (_.isString(value)) {
    return Handlebars.Utils.escapeExpression(value);
  }
  return value;
};

function registerHelpers(hbs) {
  hbs.registerHelper('link', (text, options) => {
    const attrs = [];

    for (let prop in options.hash) {
      attrs.push(`${prop}="${options.hash[prop]}"`);
    }

    return new hbs.SafeString(
      `<a ${attrs.join(' ')}>${text}</a>`
    );
  });

  hbs.registerHelper('json', (obj, pretty = false) => {
    const args = [obj, replacer];
    if (pretty) {
      args.push(2);
    }
    return new hbs.SafeString(JSON.stringify(...args));
  });

  hbs.registerHelper('ifEquals', (valueA, valueB, options) => {
    if (valueA == valueB) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
}

module.exports = registerHelpers;