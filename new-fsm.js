const fs = require('fs');

/*
const fsmA = {
    "A": {
        "start": true,
        "final": false,
        "0": [
            "B"
        ],
        "1": [
            "C"
        ]
    },

    "B": {
        "start": false,
        "final": false,
        "0": [
            "B"
        ],
        "1": [
            "D"
        ]
    },

    "C": {
        "start": false,
        "final": false,
        "0": [
            "B"
        ],
        "1": [
            "C"
        ]
    },

    "D": {
        "start": false,
        "final": false,
        "0": [
            "B"
        ],
        "1": [
            "E"
        ]
    },

    "E": {
        "start": false,
        "final": true,
        "0": [
            "B"
        ],
        "1": [
            "C"
        ]
    },
};

fs.writeFileSync('fsm-alpha.json', JSON.stringify(fsmA, null, 2));
*/

// const fsmA = JSON.parse(fs.readFileSync('fsm-alpha.json', 'utf8'));

function run_me(states_path, input) {
    const states = JSON.parse(fs.readFileSync(states_path, 'utf8'));
    const active = new Set();

    //init
    active.clear();
    for(const [state_name, {start}] of Object.entries(states)) {
        if(start) { active.add(state_name); } else {active.delete(state_name); }
    }

    function each_round(char) {
        console.log({char, active});
        const currentActiveStates = Array.from(active.values());
        active.clear();
        for(const active_state_name of currentActiveStates) {
            const states_to_add = states[active_state_name][char];
            for(const state_to_add of states_to_add) {
                active.add(state_to_add);
            }
        }
    }

    //each round
    for(const char of Array.from(input)) {
        each_round(char);
    }
    console.log('done', active);
    const activeStatesInfo = Array.from(active.values(), active_state_name=> { return {active_state_name, final: states[active_state_name].final}}).filter(({final})=>final);
    console.log(activeStatesInfo);
}

run_me('fsm-alpha.json', "011");