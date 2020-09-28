import "./Restrictions.css";
import React, { Component } from "react";
import { List } from "semantic-ui-react";

class Restrictions extends Component {
  render() {
    return (
      <List className="restrictions" divided relaxed>
        <List.Item>
          <List.Icon name="calendar" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>Where is Melbourne on the road to COVID-Normal?</List.Header>
            <List.Description>Step 2 easing of restrictions: Sunday 28 September 2020 to 18 October 2020</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="question circle" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>Why can I leave my home?</List.Header>
            <List.Description>
              One of the four reasons: shopping for food and essentials, care and caregiving, outdoor exercise and socialising, and work provided you
              have a work permit.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="clock" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>When can I leave my home?</List.Header>
            <List.Description>
              There is no longer a curfew on outdoor activities; however, they remain limited to 2 hours per day for recreation and exercise.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="map marker" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>How far can I go?</List.Header>
            <List.Description>
              Shopping and outdoor activities must be done within 5km of your home. Some essentials (including shopping) may not be
              available within the 5km radius. In those cases, you may travel to the nearest service provider. Use the map above
              to find the services in your area.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="emergency" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>What about in emergencies?</List.Header>
            <List.Description>
              Do not put your life or wellbeing in danger. The restrictions are in place to keep you safe. If the lockdown rules
              put you in danger, seek assistance. For more information on emergency provisions please see the{" "}
              <a href="https://www.dhhs.vic.gov.au/second-step-restrictions-summary-metropolitan-melbourne-covid-19">
                DHHS FAQ
              </a>
              .
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="plus circle" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>More Information</List.Header>
            <List.Description>
              For the latest information and more detail, visit the{" "}
              <a href="https://www.dhhs.vic.gov.au/second-step-restrictions-summary-metropolitan-melbourne-covid-19">DHHS website</a>.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item></List.Item>
      </List>
    );
  }
}

export default Restrictions;
