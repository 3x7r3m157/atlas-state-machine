// the only way out is through

function finiteStateMachine () {
    const workerLink = this;

    const bo = new Worker('bo.js');
    const bz = new Worker('bz.js');

    // myWorker.onmessage = function(e) {
    //     result.textContent = e.data;
    //     console.log('Message received from worker');
    // }

    const team = new Map(Array.from(states, (workerName)=> {
        const workerN = new Worker(`${workerName}.js`);
        workerN.onmessage = this.messageFromStateWorker.bind(workerLink, workerN);
        return [workerName, workerN];
    }));

    console.log({team});

    this.team = team;

    
    document.querySelector('.reset').onclick = this.reset.bind(that);
    document.querySelector('.bz').onclick = this.clickZero.bind(that);
    document.querySelector('.bo').onclick = this.clickOne.bind(that);

    // const action = this.transitions[this.state][actionName];
    
    const map = {
        state: 'R0',
        nextSet: {
            reset () {
                console.log('app reset');
                for(const [workerName, workerN] of this.team.entries()) {
                    workerN.postMessage({button: 'reset'});
            }
        },
        steps: {
            R0: {
                zero: {
                    clickZero () {
                        console.log('zeroClicked', this);
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 0});
                        }
                    }
    
                },
                one: {
                    clickOne () {
                        console.log('oneClicked');
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 1});
                        }
                      }
                },
                transition: {
                    transition(port, nextState) {
                        for(const [workerName, workerN] of this.team.entries()) {
                            workerN.postMessage({transition: nextState});
                        }
                    }
                }
            },
            R1: {
                zero: {
                    clickZero () {
                        console.log('zeroClicked', this);
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 0});
                        }
                    }
    
                },
                one: {
                    clickOne () {
                        console.log('oneClicked');
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 1});
                        }
                      }
                },
                transition: {
                    transition(port, nextState) {
                        for(const [workerName, workerN] of this.team.entries()) {
                            workerN.postMessage({transition: nextState});
                        }
                    }
                }
            },
            R2: {
                zero: {
                    clickZero () {
                        console.log('zeroClicked', this);
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 0});
                        }
                    }
    
                },
                one: {
                    clickOne () {
                        console.log('oneClicked');
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 1});
                        }
                      }
                },
                transition: {
                    transition(port, nextState) {
                        for(const [workerName, workerN] of this.team.entries()) {
                            workerN.postMessage({transition: nextState});
                        }
                    }
                }
            },
            R3: {
                zero: {
                    clickZero () {
                        console.log('zeroClicked', this);
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 0});
                        }
                    }
    
                },
                one: {
                    clickOne () {
                        console.log('oneClicked');
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 1});
                        }
                      }
                },
                transition: {
                    transition(port, nextState) {
                        for(const [workerName, workerN] of this.team.entries()) {
                            workerN.postMessage({transition: nextState});
                        }
                    }
                }
            },
            R4: {
                zero: {
                    clickZero () {
                        console.log('zeroClicked', this);
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 0});
                        }
                    }
    
                },
                one: {
                    clickOne () {
                        console.log('oneClicked');
                        for(const [workerName, workerN] of this.team.entries()) {
                          workerN.postMessage({button: 1});
                        }
                      }
                },
                transition: {
                    transition() {
                        for(const [workerName, workerN] of this.team.entries()) {
                            workerN.postMessage({transition: nextState});
                        }
                    }
                }
            },
        },

        ui_dispatch(actionName) {
            const action = this.transitions[this.state][actionName];
    
            if (action === ) {
                action.call(this);
            } else {
                console.log('invalid action');
            }
        },
    }
};
    
    const flashlight = Object.create(machine);
    
    console.log(flashlight.state); // OFF
    flashlight.dispatch('press'); 
    console.log(flashlight.state); // ON
    flashlight.dispatch('press');
    console.log(flashlight.state); // BLINK
}