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

export const ResetPasswordEmail = ({
  name,
  link,
}: {
  name: string;
  link: string;
}) => (
  <Html>
    <Head />
    <Preview>Click the link below to reset your password</Preview>
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
          We&apos;ve received your password reset request. Click the button
          below to create a new one
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href={link}>
            Change Password
          </Button>
        </Section>
        <Text style={paragraph}>
          If you didn&apos;t request the reset, delete this mail and don&apos;t
          click the link above
        </Text>
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

export default ResetPasswordEmail;

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
