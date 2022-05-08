import React,{Component} from 'react';
import {Button,Table,Form,Message} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import votings from '../../../Ethereum/Voting';
import RequestRow from '../../../components/RequestRow';
import web3 from '../../../Ethereum/web3';
import factory from '../../../Ethereum/factory';


class PartyIndex extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const Voting = votings(address);
    const partyCount = await Voting.methods.getPartyCount().call();
    const TotalVoters = await Voting.methods.TotalVoters().call();

    const parties = await Promise.all(
      Array(parseInt(partyCount)).fill().map((element,index) => {
        return Voting.methods.Party(index).call()
      })
    );

    return {address,parties,partyCount,TotalVoters};
  }

  state = {
    //minimumContribution : '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading: true, errorMessage:''});
    try {
      const accounts = await web3.eth.getAccounts();
      const Voting = votings(this.props.address);
      await Voting.methods.result().call();
      //Router.pushRoute(`/votings/${this.props.address}/parties/result`);

      //Router.pushRoute('/');
    } catch (err) {
      this.setState({errorMessage : err.message});
    }
    this.setState({loading: false});
  };

  renderRow(){
    return this.props.parties.map((party,index) => {
      return (
      <RequestRow
        key = {index}
        id = {index}
        party = {party}
        address = {this.props.address}
        TotalVoters = {this.props.TotalVoters}
      />
    );
    });
  }

  render(){

    const {Header,Row,HeaderCell,Body} = Table;
    const mystyle = {
      color: "orange",
    };
    

    return(
      <Layout>
        <h3 style={mystyle}>Parties</h3>
        <Link route={`/votings/${this.props.address}/parties/new`}>
          <a>
            <Button primary floated='right' style={{marginBottom: 10}}>Add Party</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell style={mystyle}>ID</HeaderCell>
              <HeaderCell style={mystyle}>Politician Name</HeaderCell>
              <HeaderCell style={mystyle}>Party Name</HeaderCell>
              <HeaderCell style={mystyle}>Voters Count</HeaderCell>
              <HeaderCell style={mystyle}>Vote</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div style={mystyle}>Found {this.props.partyCount} parties</div>
        <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
          </Form.Field>
          <Message error header = "Ooops" content = {this.state.errorMessage} />
          <Link route={`/votings/${this.props.address}/parties/result`}>
            <a>
              <Button loading={this.state.loading} primary>Result</Button>
            </a>
          </Link>
        </Form>
      </Layout>
    );
  }
}

export default PartyIndex;
