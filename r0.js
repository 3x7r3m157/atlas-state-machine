// even zeros, odd ones

//when i see zero, i go to oo.js

//when i see a one, i go to ee.js

const workerName = self.location.pathname.slice(1,-3);
const selectWorker = `.${workerName}`;

let currentState = false;

function activate() {
  currentState = true;
  self.postMessage({func: 'activate', args: [selectWorker]});
}

function deactivate() {
  currentState = false;
  self.postMessage({func: 'deactivate', args: [selectWorker]});
}

function transition(nextState) {
  self.postMessage({func: 'transition', args: [nextState]});
}

console.log({mySelector});

self.onmessage = ({data}) => {
  if(data.transition === workerName) {
    activate();
    return;
  }
  switch(data.button) {
    case 1:
      if(currentState) {
        deactivate();
        transition('r0');
      }
      break;
    case 0:
      if(currentState) {
        deactivate();
        transition('r1');
      }
      break;
    case 'reset':
      deactivate();
      break;
    default:
      // code block
  }
}
