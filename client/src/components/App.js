import React, { Component } from "react";

import SockJS from "sockjs-client";

import Form from "./Form";
import { httpHost, port } from "../urls";

const FORM_TYPES = ["time_range", "target_place"];

class App extends Component {
  state = {
    name: "kek"
  };
  socket;
  postUrl = `${httpHost}:${port}`;

  postRequest = type => text => {
    console.log(type);
    console.log(text);
    fetch(this.postUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ [type]: text })
    }).then(response => console.log(response));
  };
  wsRequest = type => text => {
    this.socket.send(JSON.stringify({ [type]: text }));
  };

  componentDidMount() {
    this.socket = new SockJS(`${httpHost}:${port}/ws/app`);
    
    this.socket.onopen = function(event) {
      this.socket.send("Hello Server!");
    };

    // Listen for messages
    this.socket.onmessage = function(event) {
      console.log("Message from server ", event.data);
    };
  }

  componentWillUnmount() {
    this.socket.close(1000);
  }

  render() {
    return (
      <div className="App">
        {FORM_TYPES.map(type => (
          <Form
            key={type}
            name={type.split("_").join(" ")}
            postRequest={this.postRequest(type)}
            wsRequest={this.wsRequest(type)}
          />
        ))}
      </div>
    );
  }
}

export default App;
