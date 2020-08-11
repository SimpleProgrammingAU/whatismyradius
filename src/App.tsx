import React from "react";
import { Header, Segment, Container } from "semantic-ui-react";
import { AddressForm, Map, Sidebar, Restrictions, Countdown } from "./Components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header as="h1" content="What is my radius" subheader="Where can I go during the Stage 4 lockdown?" />
      <Countdown />
      <Segment>
        <AddressForm />
      </Segment>
      <Segment>
        <Container className="mapContainer">
              <Map />
              <Segment className="sidebarContainer">
                <Sidebar />
              </Segment>
        </Container>
      </Segment>
      <Segment>
        <Restrictions />
      </Segment>
    </div>
  );
}

export default App;