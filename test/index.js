var _ = require('lodash')
  , should = require('chai').should()
  , users = require('../lib');

describe('users', function() {
  
  var suite = this;

  var USERS = [
    'system/password/system'
  , 'guest/secret/guest' 
  ];

  var ROLES = [
    { name: 'Guest', handle: 'guest', claims: [ 
        { entity: 'member', 'right': 1 } 
      , { entity: 'user', 'right': 1 } 
      ] 
    }
  , { name: 'System', handle: 'system', claims: [ 
        { entity: 'member', right: 15 } 
      , { entity: 'user', right: 15 } 
      , { entity: 'system', right: 15 } 
      ]
    }
  ];

  before(function() {
    suite.users = users(null, USERS, ROLES);
  });
  
  it('should generate 2 users', function() {
    suite.users.length.should.equal(2);
  });

  describe('find', function() {
    before(function() {
      suite.system = users({ name: 'system' }, USERS, ROLES);
    });

    it('should find system user', function() {
      suite.system.should.exist;
    });
  });


  describe('find from object', function() {
    before(function() {
      suite.guest = users({ name: 'guest' }, { name: 'guest' });
    });

    it('should find guest user', function() {
      suite.guest.should.exist;
    });
  });
  
});