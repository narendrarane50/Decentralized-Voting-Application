import web3 from './web3';
import VotingSystem from './build/VotingSystem.json';

const instance = new web3.eth.Contract(
  JSON.parse(VotingSystem.interface),
  '0x706152CbFc2c6c2e4435B3E599A22ff61B6d136b'
);

export default instance;
