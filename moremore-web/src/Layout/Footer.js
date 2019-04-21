import React from "react";
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Icon,
  Responsive
} from "semantic-ui-react";

const Footer = () => (
  <div>
    <Responsive maxWidth={800}>
      <Segment style={{ backgroundColor: "#fbb900" }} />
      <Segment vertical style={{ padding: "2em 0em" }}>
        <Container>
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as="h4" content="Follow Us" />
                <List link>
                  <List.Item
                    as="a"
                    href="https://web.facebook.com/tumoresheet/"
                  >
                    <Icon name="facebook" />
                    TU more sheet
                  </List.Item>
                  <List.Item
                    as="a"
                    href="https://www.instagram.com/moresheet.tu/"
                  >
                    <Icon name="instagram" />
                    moresheet.tu
                  </List.Item>
                  <List.Item as="a" href="mailto:moresheet.tu@gmail.com">
                    <Icon name="envelope" />
                    moresheet.tu@gmail.com
                  </List.Item>
                  <List.Item as="a" href="tel:0811473949">
                    <Icon name="phone" />
                    0811473949
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <div
                  class="fb-page"
                  data-href="https://web.facebook.com/tumoresheet/"
                  data-width="340"
                  data-hide-cover="false"
                  data-show-facepile="true"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Responsive>

    <Responsive minWidth={801}>
      <Segment style={{ backgroundColor: "#fbb900" }} />
      <Segment vertical style={{ padding: "2em 0em" }}>
        <Container>
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as="h4" content="Follow Us" />
                <List link>
                  <List.Item
                    as="a"
                    href="https://www.instagram.com/moresheet.tu/"
                  >
                    <Icon name="instagram" />
                    moresheet.tu
                  </List.Item>
                  <List.Item as="a" href="mailto:moresheet.tu@gmail.com">
                    <Icon name="envelope" />
                    moresheet.tu@gmail.com
                  </List.Item>
                  <List.Item as="a" href="tel:0811473949">
                    <Icon name="phone" />
                    0811473949
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column style={{ left: "55%" }} width={7}>
                <div
                  class="fb-page"
                  data-href="https://web.facebook.com/tumoresheet/"
                  data-width="340"
                  data-hide-cover="false"
                  data-show-facepile="true"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Responsive>
  </div>
);

export default Footer;
