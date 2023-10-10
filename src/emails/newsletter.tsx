import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

export const RevPanelRegisterEmail = ({
  name,
  link,
  news,
}: {
  name: string;
  link: string;
  news: {
    title: string;
  }[];
}) => (
  <Html>
    <Head />
    <Preview>Read everything about our new update</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"../../public/logo.png"}
          width="64"
          height="64"
          alt="RevPanel Logo"
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          We&apos;re happy to share some exciting news and updates with you.
          We&apos;ve introduced some new amazing things that we&apos;re sure you
          will enjoy:
        </Text>
        <ul>
          <li>
            <Text style={paragraph}>{news[0].title}</Text>
          </li>
        </ul>
        <Text style={paragraph}>
          Visit our site and check all these feataures by yourself!
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href={link}>
            Visit RevPanel
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The RevPanel team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Copyright &copy; RevPanel - 2023</Text>
      </Container>
    </Body>
  </Html>
);

export default RevPanelRegisterEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#7967FF",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

const linkStyle = {
  color: "#7967FF",
  textDecoration: "underline",
};
