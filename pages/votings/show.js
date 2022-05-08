import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Card, Grid, Button, Header} from 'semantic-ui-react';
import votings from '../../Ethereum/Voting';
import web3 from '../../Ethereum/web3';
//import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class VotingShow extends Component {

  static async getInitialProps(props){
    const Voting = votings(props.query.address);

    const summary = await Voting.methods.getSummary().call();

    return{
      address: props.query.address,
      PartyCount: summary[0],
      TotalVotersCount: summary[1],
      manager: summary[2]
    };
  }

  renderCards(){
    const {
      manager,
      PartyCount,
      TotalVotersCount
    } = this.props;
    const mystyle = {
      color: "orange",
    };

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: PartyCount,
        meta: 'Number of Parties',
        description: 'A Party is the number of People that will get into power to run the country',
      },
      {
        header: TotalVotersCount,
        meta: 'Number of Total Voters',
        description: 'Number of people who have already Voted in this contract',
      },
    ];
    return <Card.Group items = {items} />;
  }

  render(){
    const mystyle = {
      color: "orange",
    };
    return (
      <Layout>
        <h3 style={mystyle}>Voting show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Link route = {`/votings/${this.props.address}/parties`}>
              <a>
                <Button primary>View Parties</Button>
              </a>
            </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default VotingShow;
