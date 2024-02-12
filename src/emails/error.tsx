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
} from "@react-email/components";

export const RevPanelNewDeviceEmail = ({
  name = "Michele",
  link = "https://revpanel.io",
  service = "RevPanel",
  error = {
    lines: ["An error occurred while processing your request."],
  },
}: {
  name: string;
  link: string;
  service: string;
  error: {
    lines: string[];
  };
}) => (
  <Html>
    <Head />
    <Preview>A new error occurred in your application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://revpanel.io/logo.png"}
          width="64"
          height="74"
          alt="RevPanel Logo"
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          We logged a new error on the {service} service. Learn more below
        </Text>
        <Text style={paragraph}>
          <b>Lines:</b>
        </Text>
        <ul>
          {error.lines.map((line, i) => (
            <li key={i}>
              <Text style={paragraph}>{line}</Text>
            </li>
          ))}
        </ul>
        <Text style={paragraph}>
          We suggest checking the error to make sure it doesn&apos;t crash your
          application!
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={link}>
            Check service
          </Button>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />
          The RevPanel team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Copyright &copy; RevPanel - 2024</Text>
      </Container>
    </Body>
  </Html>
);

export default RevPanelNewDeviceEmail;

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

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
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
