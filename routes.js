const routes = require('next-routes')();

routes
  .add('/votings/new','/votings/new')
  .add('/votings/:address','/votings/show')
  .add('/votings/:address/parties','/votings/Parties/index')
  .add('/votings/:address/parties/new','/votings/Parties/new')
  .add('/votings/:address/parties/result','/votings/Parties/result');

module.exports = routes;
