import React from "react";
import { Header, Segment, Grid, List } from "semantic-ui-react";
import { AddressForm, Map, Sidebar } from "./Components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header as="h1" content="What is my radius" subheader="Where can I go during the Stage 4 lockdown?" />
      <Segment>
        <AddressForm />
      </Segment>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Map />
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Sidebar />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <List divided relaxed>
          <List.Item>
            <List.Content>
              <List.Header>This page is still in development</List.Header>
              <List.Description>More features are still to come</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>A loading spinner</List.Header>
              <List.Description>
                Please be patient when selecting essential services from the sidebar. I promise I will add a loading spinner in
                the next couple of days.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Mobile view</List.Header>
              <List.Description>
                Sorry about the poor performance for mobile. I will add a mobile layout as soon as I can.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Detailed search results</List.Header>
              <List.Description>
                Search result list and clickable map pins for more information on local services.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Latest restrictions from DHHS</List.Header>
              <List.Description>
                Access to up-to-date information from DHHS regarding the current restrictions in Victoria, Australia.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </div>
  );
}

export default App;
