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

export const NewServerEmail = ({
  name = "Michele",
  link = "https://revpanel.io",
  service = "RevPanel",
}: {
  name: string;
  link: string;
  service: string;
}) => (
  <Html>
    <Head />
    <Preview>You have been added to a new service</Preview>
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
          You&apos;ve been added to a new service on RevPanel called {service}.
          Click the button below to check it out
        </Text>

        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href={link}>
            Check service
          </Button>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />
          The RevPanel team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Copyright &copy; RevPanel - 2023</Text>
      </Container>
    </Body>
  </Html>
);

export default NewServerEmail;

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
