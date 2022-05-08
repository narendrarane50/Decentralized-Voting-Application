const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledSystem = require('./build/VotingSystem');

const provider = new HDWalletProvider(
  'discover auction glare kidney sunny nasty same wise action scatter abstract provide',
  'https://rinkeby.infura.io/v3/603d2ae8a18b497b8211f6dc0896ceb9'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const Accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy a contract from', Accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledSystem.interface))
  .deploy({data:compiledSystem.bytecode}).send({gas:'1000000', from: Accounts[0]});

  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};

deploy();
