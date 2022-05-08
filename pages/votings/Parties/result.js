import React,{Component} from 'react';
import votings from '../../../Ethereum/Voting';
import Layout from '../../../components/Layout';
import {Segment,Grid,Header} from 'semantic-ui-react';
import { motion } from 'framer-motion';


class Result extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const Voting = votings(address);
    const Result = await Voting.methods.result().call();

    return {Politician:Result[1], PartyName: Result[0]};
  }
  render(){
    const mystyle = {
      color: "Orange",
      fontSize:90,
      lineHeight: 6,
      textAlign:'center'
    };
    const mystyle1 = {
      backgroundColor: "Green",
    };

    return (
      <Layout>
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {
          scale: .8,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: .4
          }
        },
      }}>
        <Header as='h1' style={mystyle}>Winner is {this.props.Politician} ({this.props.PartyName}) </Header>
      </motion.div>
      </Layout>
    );
  }
}


//{this.props.Result}

export default Result;
