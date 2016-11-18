var _ = require('lodash')
  , configuration = require('@recipher/configuration');

module.exports = function(finder, users, roles) {
  if (users == null) users = configuration('http:authenticate');
  if (roles == null) roles = configuration('roles');

  var mapToUser = function(user) {
    if (user == null) return;

    if (_.isObject(user) === false) {
      var props = user.split('/');
      user = { name: props[0], pass: props[1], roles: props[2] && props[2].split(',') };
    }

    // Populate roles
    user.roles = user.roles && user.roles.map(function(role) {
      return _.find(roles, { handle: role });
    });

    return user;
  };

  var mapped = _
  .chain(users)
  .map(mapToUser)
  .compact()
  .value();

  if (finder == null) return mapped;

  return _(mapped).find(finder);
};
