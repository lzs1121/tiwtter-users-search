import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rets: [],
    };
  }

  componentDidMount() {
    const headers = new Headers();
    const init = {
      headers,
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch(`http://localhost:8000/users/test`, init)
      .then(
        response => {
          console.log('response:', response);
          return response.json();
        }
      ).then(data => {
          console.log('data:', data);
          let ret = data.response.map((r, i) => {
            return (
              <div key={i}>
                <div>{r.name}</div>
              </div>
            )
          });
          this.setState({ rets: ret }); 
        }).catch(error => {
          console.log(JSON.stringify(error));
        });

  }

  render() {
    return (
       <div>
        <h1>show test results</h1>
        {this.state.rets}
       </div>
    );
  }
}

export default App;