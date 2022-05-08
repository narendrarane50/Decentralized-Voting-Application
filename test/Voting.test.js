const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledSystem = require('../ethereum/build/VotingSystem.json');
const compiledVoting = require('../ethereum/build/Voting.json');

let accounts;
let system;
let votingAddress;
let voting;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();

  system = await new web3.eth.Contract(JSON.parse(compiledSystem.interface))
  .deploy({data : compiledSystem.bytecode})
  .send({from : accounts[0], gas: '1000000'});

  await system.methods.VotingAreaWise().send({
    from: accounts[0],
    gas : '1000000'
  });

  [votingAddress] = await system.methods.getDeployedVotingAreaWise().call();
  voting = await new web3.eth.Contract(JSON.parse(compiledVoting.interface), votingAddress);
});

describe('Voting' , () => {
  it('deploys a contract', () => {
    assert.ok(system.options.address);
    assert.ok(voting.options.address);
  });
  it('marks caller as Voting manager',async () => {
    const manager = await voting.methods.manager().call();
    assert.equal(accounts[0] , manager);
  });
  it('allows a manager to add party members area wise', async () => {
    await voting.methods.addparty("modi", "BJP").send({
      from: accounts[0],
      gas: '1000000'
    });

    const partyMember = await voting.methods.Party(0).call();
    assert.equal("modi", partyMember.PoliticianName);
  });
  it('allows people to vote', async () => {
    await voting.methods.addparty("modi", "BJP").send({
      from: accounts[0],
      gas: '1000000'
    });
    await voting.methods.Vote(0).send({
      from: accounts[1],
      gas: '1000000'
    });
    const voterPerParty= await voting.methods.Party(0).call();
    const totalvotes = await voting.methods.TotalVoters().call();
    assert.equal(1,voterPerParty.voterscount);
    assert.equal(1,totalvotes);
  });
  it('checks the result after voting', async () => {
    await voting.methods.addparty("modi", "BJP").send({
      from: accounts[0],
      gas: '1000000'
    });
    await voting.methods.addparty("gandhi", "congress").send({
      from: accounts[0],
      gas: '1000000'
    });
    await voting.methods.Vote(0).send({
      from: accounts[1],
      gas: '1000000'
    });
    await voting.methods.Vote(1).send({
      from: accounts[2],
      gas: '1000000'
    });
    await voting.methods.Vote(1).send({
      from: accounts[3],
      gas: '1000000'
    });
    //const partyName = await voting.methods.Party(0).call();
    const result= await voting.methods.result().call();
    assert.equal("congress",result);
  });
});
