contract Greetings {
    
    string public greeting;
    
    event GotGreeting(string);
    
    function setGreeting(string newGreeting) public {
        greeting = newGreeting;
        emit GotGreeting(newGreeting);
    }
    
    function getGreeting() public view returns (string g) {
        g = greeting;
    }
}