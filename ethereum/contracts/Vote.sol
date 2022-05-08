pragma solidity ^0.4.17;

contract VotingSystem{
    address[] public TotalVotingAreaWise;
    function VotingAreaWise() public{
        address newVotingAreaWise = new Voting(msg.sender);
        TotalVotingAreaWise.push(newVotingAreaWise);
    }
    function getDeployedVotingAreaWise() public view returns(address[]){
        return TotalVotingAreaWise;
    }
}

contract Voting{
    struct PartyDescription{
        string PoliticianName;
        string PartyName;
        uint voterscount;
    }
    PartyDescription[] public Party;
    address public manager;
    mapping (address=>bool) voters;
    uint public TotalVoters;
    uint public TotalParties ;



    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Voting(address creator) public{
        manager=creator;
    }


    function addparty(string PoliticianName,string PartyName) public restricted{
        PartyDescription memory newparty = PartyDescription({
            PoliticianName:PoliticianName,
            PartyName:PartyName,
            voterscount:0
        });


        Party.push(newparty);
        TotalParties++;
    }

    function Vote(uint index) public {
        require(!voters[msg.sender]);
        voters[msg.sender]=true;
        Party[index].voterscount++;
        TotalVoters++;

    }
    function result() public view returns(string,string){

        for (uint i=0;i<TotalParties;i++){
            PartyDescription storage Par = Party[i];
            uint a = (((Par.voterscount*100)/TotalVoters));
            if (a>50){
                string storage FinalParty=Par.PartyName;
                string storage Politician=Par.PoliticianName;
                //b.push(Par.PartyName);
                break;
            }
        }
        return (FinalParty,Politician);
    }

    function getSummary() public view returns (uint, uint, address) {
      return (
        Party.length,
        TotalVoters,
        manager
      );
    }

    function getPartyCount() public view returns (uint) {
        return Party.length;
    }

}
