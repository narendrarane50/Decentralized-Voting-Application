import React,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../Ethereum/web3';
import votings from '../Ethereum/Voting';

class RequestRow extends Component {

  onVote = async() => {
    const Voting = votings(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await Voting.methods.Vote(this.props.id).send({
      from: accounts[0]
    });
  };

  // onFinalize = async() => {
  //   const Campaign = campaign(this.props.address);
  //
  //   const accounts = await web3.eth.getAccounts();
  //   await Campaign.methods.finalizerequest(this.props.id).send({
  //     from: accounts[0]
  //   });
  //};

  render(){
    const {Row,Cell} = Table;
    const {id,party,TotalVoters} = this.props;
    const readyForResult = party.voterscount> TotalVoters/2;

    return (
      <Row disabled={party.complete} positive={readyForResult && !party.complete}>
        <Cell>{id+1}</Cell>
        <Cell>{party.PoliticianName}</Cell>
        <Cell>{party.PartyName}</Cell>
        <Cell>{party.voterscount}/{TotalVoters}</Cell>
        <Cell>
          {party.complete ? null : (
            <Button color='green' basic onClick={this.onVote}>Vote</Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
