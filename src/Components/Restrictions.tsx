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
            <List.Header>What is the current lockdown period?</List.Header>
            <List.Description>Sunday 2 August 2020 to Sunday 13 September 2020</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="question circle" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>Why can I leave my home?</List.Header>
            <List.Description>
              One of the four reasons: shopping for food and essentials, care and caregiving, exercise, and work provided you
              have a work permit.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="clock" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>When can I leave my home?</List.Header>
            <List.Description>
              You must do shopping and exercise between the hours of 5am and 8pm. Shopping must be completed in one trip per day
              and may only be completed by one member of your household on any given day. Exercise outside the home must not
              exceed one hour per day and must be alone or with one other person.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="map marker" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>How far can I go?</List.Header>
            <List.Description>
              Shopping and exercise must be done within 5km of your home. Some essentials (including shopping) may not be
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
              <a href="https://www.dhhs.vic.gov.au/stage-4-restrictions-summary-covid-19#are-there-any-other-special-reasons-that-allow-me-to-leave-my-home">
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
              <a href="https://www.dhhs.vic.gov.au/stage-4-restrictions-summary-covid-19">DHHS website</a>.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item></List.Item>
      </List>
    );
  }
}

export default Restrictions;
