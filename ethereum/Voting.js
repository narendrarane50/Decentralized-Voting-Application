import web3 from './web3';
import Voting from './build/Voting.json';

const votings = (address) => {
  return new web3.eth.Contract(JSON.parse(Voting.interface),address);
};

export default votings;
