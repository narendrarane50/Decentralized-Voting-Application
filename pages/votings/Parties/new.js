import React,{Component} from 'react';
import {Button,Message,Form,Input} from 'semantic-ui-react';
import votings from '../../../Ethereum/Voting';
import web3 from '../../../Ethereum/web3';
import {Link,Router} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {

  state={
    PoliticianName:'',
    PartyName:'',
    errorMessage: '',
    loading: false
  };

  static async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const Voting = votings(this.props.address);
    const {PoliticianName,PartyName} = this.state;

    this.setState({loading: true, errorMessage:''});

    try {
      const accounts = await web3.eth.getAccounts();
      await Voting.methods.addparty(PoliticianName,PartyName).send({from:accounts[0]});

      Router.pushRoute(`/votings/${this.props.address}/parties`);
    } catch (err) {
      this.setState({errorMessage : err.message});
    }
    this.setState({loading: false});
  };

  render(){
    const mystyle = {
      color: "orange",
    };
    return(
      <Layout>
      <Link route={`/votings/${this.props.address}/parties`}>
        <a>
          Back
        </a>
      </Link>
        <h3 style={mystyle}>Create a Party</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label style={mystyle}>Politician Name</label>
            <Input
            value={this.state.PoliticianName}
            onChange={event => this.setState({PoliticianName: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label style={mystyle}>Party Name</label>
            <Input
            value={this.state.PartyName}
            onChange={event => this.setState({PartyName: event.target.value})}
            />
          </Form.Field>
          <Message error header = "Ooops" content = {this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
