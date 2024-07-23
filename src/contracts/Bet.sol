//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Bet is Ownable(msg.sender){
    address public admin;
    uint public predictionCount;

    struct Prediction{
        uint id;
        string description;
        uint endTime;
        uint totalYesBets;
        uint totalNoBets;
        mapping(address => uint) yesBets;
        mapping(address => uint) noBets;
        bool isResolved;
        bool outcome;
    }

    event PredictionCreated(uint id, string description, uint endTime);
    event BetPlaced(uint id, address indexed user, uint amount, bool betOnYes);
    event PredictionResolved(uint id, bool outcome);

    mapping(uint => Prediction) public predictions;

    function createPrediction(string memory _description, uint _duration) external onlyOwner{
        require(_duration > 0, "Duration should be greater than 0");
        require(bytes(_description).length > 0, "Description should not be empty");

        predictionCount++;
        Prediction storage p = predictions[predictionCount];
        p.id = predictionCount;
        p.description = _description;
        p.endTime = block.timestamp + _duration;
        p.totalYesBets = 0;
        p.totalNoBets = 0;
        p.isResolved = false;
        p.outcome = false;
        
        emit PredictionCreated(predictionCount, _description, p.endTime);
    }

    function betPrediction(uint _id, bool _betOnYes) external payable{
        Prediction storage p = predictions[_id];
        require(!p.isResolved, "This prediction already closed.");
        require(block.timestamp < p.endTime, "This prediction already closed.");
        require(msg.value > 0, "Bet amount should be greater than zero.");
        
        if(_betOnYes){
            p.yesBets[msg.sender] += msg.value;
            p.totalYesBets += msg.value;
        }else{
            p.noBets[msg.sender] += msg.value;
            p.totalNoBets += msg.value;
        }

        emit BetPlaced(_id, msg.sender, msg.value, _betOnYes);
    }

    function resolvePrediction(uint _id, bool _outcome) public onlyOwner{
        Prediction storage p = predictions[_id];
        require(block.timestamp >= p.endTime, "Prediction period is not over.");
        require(!p.isResolved, "Prediction already resolved.");

        p.isResolved = true;
        p.outcome = _outcome;

        emit PredictionResolved(_id, _outcome);
    }

    function claimReward(uint _id) public{
        Prediction storage p = predictions[_id];
        require(p.isResolved, "Prediction is not resolved yet.");
        
        uint reward = 0;

        if(p.outcome){
            reward = p.yesBets[msg.sender] * (p.totalNoBets + p.totalYesBets) / p.totalYesBets;
        }else{
            reward = p.noBets[msg.sender] * (p.totalNoBets + p.totalYesBets) / p.totalNoBets;
        }

        require(reward > 0, "No reward to claim.");
        payable(msg.sender).transfer(reward);
    }
}