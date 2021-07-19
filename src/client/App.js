import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { physicians: [], selectedPhysician: null, tableContent: [] };

  componentDidMount() {
    fetch('/api/physicians')
      .then(res => res.json())
      .then(jsonRes => this.setState({ physicians: jsonRes.physicians }));
  }

  render() {
    const { physicians, tableContent, selectedPhysician } = this.state;
    return (
      <div style={{'display': 'flex'}}>
        <div style={{'flex': '1'}}>
          <ol>
            {this.renderPhysicians(physicians)}
          </ol>
        </div>
        <div style={{'flex': '1'}}>
          { selectedPhysician ? (
            <>
              <h1>{selectedPhysician}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                {tableContent}
                </tbody>
              </table>
            </>
            ): (<div></div>)
          }
        </div>
      </div>
    );
  }

  renderPhysicians(physicians) {
    return physicians.map(physician =>
      (
        <li key={physician} onClick={() => this.setSelectedPhysician(physician)}>
          {physician}
        </li>
      ));
  }

  setSelectedPhysician(selectedPhysician) {
    this.setState({selectedPhysician: selectedPhysician});
    this.renderSchedule(selectedPhysician);
  }

  renderSchedule(selectedPhysician) {
    const {tableContent} = this.state;
    fetch(`/api/${selectedPhysician}/schedule`)
      .then(res => res.json())
      .then(jsonRes => this.setState({tableContent: jsonRes.schedule.map(sched => 
        <tr>
          <td>{sched.name}</td>
          <td>{sched.time}</td>
          <td>{sched.type}</td>
        </tr>
      )}));
  }
}
