import React,{Component} from 'react';
import {Card,Button,Loader} from 'semantic-ui-react';
import factory from '../Ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';

class VotingIndex extends Component{

  static async getInitialProps(){
    const votings = await factory.methods.getDeployedVotingAreaWise().call();

    return {votings};
  }

  renderVotings() {
    const mystyle = {
      color: "orange",
    };
    const mystyle1 = {
      backgroundColor: "Green",
    };
    const items = this.props.votings.map(address => {

      return{

        header: address,
        description: (
          <Link route = {`/votings/${address}`}>
            <a style={mystyle}>
              View Votings
            </a>
          </Link>
        ),
        fluid:true,
      };
    });

    return <Card.Group items={items} />;
  }

  render(){
    const mystyle = {
      color: "orange",
    };
    const mystyle1 = {
      backgroundColor: "Green",
    };
    return (
      <Layout>
        <div>
          <h3 style={mystyle}>Open Campaigns</h3>
          <Link route = "/votings/new">
            <a>
              <Button
                floated= "right"
                content= "Create Voting"
                icon= "add circle"
                primary
              />
            </a>
          </Link>
          {this.renderVotings()}
        </div>

      </Layout>
    );
  }
}

export default VotingIndex;
