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
  device = {
    name: "Chrome",
    location: "Italy",
    time: "2021-01-01 10:00:00",
  },
}: {
  name: string;
  link: string;
  device: {
    name: string;
    location: string;
    time: string;
  };
}) => (
  <Html>
    <Head />
    <Preview>There is a new device for your account</Preview>
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
          We noticed a recent login to your RevPanel account.
        </Text>
        <Text>
          <b>Device:</b> {device.name}
        </Text>
        <Text>
          <b>Location:</b> {device.location}
        </Text>
        <Text>
          <b>Time:</b> {device.time}
        </Text>
        <Text style={paragraph}>
          If you didn&apos;t recognize this device, click here to disconnect it
          and then change your password
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href={link}>
            Check devices
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
