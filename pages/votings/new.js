import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Button,Form,Input,Message} from 'semantic-ui-react';
import factory from '../../Ethereum/factory';
import web3 from '../../Ethereum/web3';
import { Router} from '../../routes';

class VotingNew extends Component {
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
      await factory.methods.VotingAreaWise().send({from : accounts[0]});

      Router.pushRoute('/');
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
        <h3 style={mystyle}>Create new Voting</h3>
        <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
          </Form.Field>
          <Message error header = "Ooops" content = {this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  };
};

export default VotingNew;
