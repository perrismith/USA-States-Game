
var stateMap = new Map([
    ["Alabama", "01"],
    ["Alaska", "02"],
    ["Arizona", "04"],
    ["Arkansas", "05"],
    ["California", "06"],
    ["Colorado", "08"],
    ["Connecticut", "09"],
    ["Delaware", "10"],
    //["District Of Columbia", "11"],
    ["Florida", "12"],
    ["Georgia", "13"],
    ["Hawaii", "15"],
    ["Idaho", "16"],
    ["Illinois", "17"],
    ["Indiana", "18"],
    ["Iowa", "19"],
    ["Kansas", "20"],
    ["Kentucky", "21"],
    ["Louisiana", "22"],
    ["Maine", "23"],
    ["Maryland", "24"],
    ["Massachusetts", "25"],
    ["Michigan", "26"],
    ["Minnesota", "27"],
    ["Mississippi", "28"],
    ["Missouri", "29"],
    ["Montana", "30"],
    ["Nebraska", "31"],
    ["Nevada", "32"],
    ["New Hampshire", "33"],
    ["New Jersey", "34"],
    ["New Mexico", "35"],
    ["New York", "36"],
    ["North Carolina", "37"],
    ["North Dakota", "38"],
    ["Ohio", "39"],
    ["Oklahoma", "40"],
    ["Oregon", "41"],
    ["Pennsylvania", "42"],
    ["Rhode Island", "44"],
    ["South Carolina", "45"],
    ["South Dakota", "46"],
    ["Tennessee", "47"],
    ["Texas", "48"],
    ["Utah", "49"],
    ["Vermont", "50"],
    ["Virginia", "51"],
    ["Washington", "53"],
    ["West Virginia", "54"],
    ["Wisconsin", "55"],
    ["Wyoming", "56"]
]);


var states = Array.from(stateMap.keys());

var statesSet = new Set(states); 

var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
   // "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}




//Input bar hidden in beginning
toggleInputBar();
restartGame();
var score = 0;
var timer = 120; //timer in seconds

//Starts game and timer
$("#start_button").on("click", function(){
    toggleInputBar();
    toggleStartButton();
    restartGame();
    var timeleft = timer;
    var downloadTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;

    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "You found " + score + "/50 States"
        showMissingStates();
        toggleInputBar();
        toggleStartButton();
    } 

    if (statesSet.size === 0) {
        timeLeft = -1;
        document.getElementById('countdown').innerHTML = "YOU WIN!";
    }
    }, 1000);    
    

})

// Handles when a state is typed correctly
$('#state_field').on('keyup', function() {
    var state = this.value;
    if (states.includes(state) && statesSet.has(state)) {
       document.getElementById(state).innerHTML = this.value;
       document.getElementById("state_field").value = "";
       statesSet.delete(state);
       score = score + 1;
    }
    
})

//Handles on hover API call and displays at bottom of page
$(".tg-5qzi").on('mouseover', function(abvMap){

        const state = this.innerHTML;
        var id = stateMap.get(state);

        if(id != undefined){
            const url = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:" + id + "&LAN=625";
            $.get( url, function(data){
                $("#spanish_container").empty();
                $("#spanish_container").append("Number of Spanish Speakers in " + state + ": " + numberWithCommas(data[1][0]));
            })
        }
    
})

function showMissingStates() {

    var statesList = document.getElementsByClassName('tg-5qzi');
    for (var i = 0; i < statesList.length; i++) {
        if (statesSet.has(statesList[i].id)){
            statesList[i].innerHTML = statesList[i].id;
            statesList[i].style.color = "red";
        }
    }
}

function toggleInputBar(){
    var x = document.getElementById("game_start");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleStartButton(){
    var x = document.getElementById("game_default");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function restartGame(){
    document.getElementById('countdown').innerHTML = "------------------------------------------";
    endGame = false;
    //reset states
    var statesList = document.getElementsByClassName('tg-5qzi');
    for (var i = 0; i < statesList.length; i++) {        
        if(states.includes(statesList[i].id)){
            statesList[i].innerHTML = "";
            statesList[i].style.color = "black";
        }                 
    }

    //reset score
    score = 0;
    
    //add all states back to set
    for(var i = 0; i < states.length; i++){
        statesSet.add(states[i]);
    }
}

function win() {
    document.getElementById('countdown').innerHTML = "YOU WIN!";   
    toggleInputBar();
    toggleStartButton(); 
}

function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

