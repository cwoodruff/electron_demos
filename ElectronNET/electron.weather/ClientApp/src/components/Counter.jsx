import React, { Component } from 'react';
import { useElectron } from './use-electron';

const electron = useElectron();

const listener = (sender, [index, selected]) => {
  let message = 'You selected ';

  if(index === 0) {
      message += 'yes.'
  } else {
      message += 'no.'
  }

  alert(message);
};

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    if (this.state.currentCount % 2 === 0) {
      electron?.ipcRenderer.send("information-dialog");
    }
  }

  componentDidMount() {
    electron?.ipcRenderer.on("information-dialog-reply", listener);
  }

  componentWillUnmount() {
    electron?.ipcRenderer.off("information-dialog-reply", listener);
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}
