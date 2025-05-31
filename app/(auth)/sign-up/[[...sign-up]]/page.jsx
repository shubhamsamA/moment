import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUppage = () => {
  return (
    <SignUp
      forceRedirectUrl="/dashboard" // redirect after successful sign up
    />
  );
};

export default SignUppage;
