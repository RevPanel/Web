import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const RegisterEmail = ({
  name,
  link,
}: {
  name: string;
  link: string;
}) => (
  <Html>
    <Head />
    <Preview>
      Welcome to RevPanel! Click the link below to activate your account
    </Preview>
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
          Thanks for joining RevPanel, we are happy to see you gave us a chance
          and you won&apos;t regret it! Click the button below to begin this
          awesome adventure
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href={link}>
            Activate Account
          </Button>
        </Section>
        <Text style={paragraph}>
          Remember that for any assistance you can contact us at{" "}
          <Link href={"mailto:support@revpanel.io"} style={linkStyle}>
            support@revpanel.io
          </Link>
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

export default RegisterEmail;

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
