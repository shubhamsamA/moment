import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInpage = () => {
  return (
    <SignIn
      forceRedirectUrl="/dashboard" // Automatically redirect here after successful sign-in
    />
  );
};

export default SignInpage;
