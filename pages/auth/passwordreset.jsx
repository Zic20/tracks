import Head from "next/head";
import ResetCodeForm from "@/components/forms/ResetCodeForm";
import { lazy, useState } from "react";
const ResetPasswordForm = lazy(() =>
  import("@/components/forms/ResetPasswordForm")
);

const VerifyCodeForm = lazy(() => import("@/components/forms/VerifyCodeForm"));

function PasswordReset() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const onResetFormSubmitHandler = (email) => {
    setEmail(email);
    setIsCodeSent(true);
  };

  const onVerifyFormSubmitHandler = (verificationCode) => {
    setCode(verificationCode);
    setIsCodeVerified(true);
  };

  const Content = () => {
    if (!isCodeSent) {
      return <ResetCodeForm onSubmit={onResetFormSubmitHandler} />;
    } else if (!isCodeVerified) {
      return (
        <VerifyCodeForm email={email} onSubmit={onVerifyFormSubmitHandler} />
      );
    } else {
      return <ResetPasswordForm email={email} code={code} />;
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
      </Head>
      <Content />
    </>
  );
}

export default PasswordReset;
