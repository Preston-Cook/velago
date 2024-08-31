export interface UserSignInDic {
  title: string;
  description: string;
  labels: string[];
  login: {
    standard: string;
    google: string;
  };
  phone: {
    label: string;
  };
  orgAccount: {
    text: string;
    link: string;
  };
  noAccount: {
    text: string;
    link: string;
  };
  account: {
    error: {
      notFound: {
        title: string;
        description: string;
      };
      generic: {
        title: string;
        description: string;
      };
    };
  };
  code: {
    button: {
      resend: string;
      sendCode: string;
    };
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
    invalid: {
      title: string;
      description: string;
    };
  };
  button: {
    text: string;
  };
  validation: {
    phone: {
      refine: string;
    };
    otp: {
      refine: string;
    };
  };
}

export interface OrgSignInDic {
  title: string;
  description: string;
  labels: string[];
  noAccount: {
    text: string;
    link: string;
  };
  userAccount: {
    text: string;
    link: string;
  };
  button: {
    text: string;
  };
  validation: {
    email: {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      invalid: string;
    };
  };
}

export interface ContactDic {
  title: string;
  description: string;
  labels: string[];
  messagePlaceholder: string;
  toast: {
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
  };
  submit: string;
  validation: {
    firstName: {
      min: string;
      max: string;
    };
    lastName: {
      min: string;
      max: string;
    };
    phone: {
      refine: string;
    };
    email: {
      email: string;
    };
    message: {
      min: string;
      max: string;
    };
  };
}

export interface UserSignUpDic {
  title: string;
  description: string;
  labels: string[];
  account: {
    existsEmail: {
      title: string;
      description: string;
    };
    existsPhone: {
      title: string;
      description: string;
    };
    generic: {
      title: string;
      description: string;
    };
  };
  code: {
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
    invalid: {
      title: string;
      description: string;
    };
  };
  phone: {
    verify: string;
  };
  signup: {
    standard: string;
    google: string;
  };
  accountExists: {
    text: string;
    link: string;
  };
  button: {
    text: string;
  };
  validation: {
    firstName: {
      min: string;
      max: string;
    };
    lastName: {
      min: string;
      max: string;
    };
    phone: {
      refine: string;
    };
    email: {
      email: string;
    };
  };
}
