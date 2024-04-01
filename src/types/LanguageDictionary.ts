export interface Link {
  href: string;
  text: string;
}

export interface Header {
  links: Link[];
  signUp: string;
}

export interface Footer {
  legal: string;
  description: string;
  links: string[];
}

export interface CallToAction {
  title: string;
  description: string;
  placeholders: string[];
}

export interface ContentCard {
  title: string;
  description: string;
  button: string;
}

export interface ProductDescription {
  title: string;
  paragraph1: string;
  paragraph2: string;
  link: string;
}

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface Home {
  callToAction: CallToAction;
  content: {
    title: string;
    cards: ContentCard[];
  };
  productDescription: ProductDescription;
  faq: {
    title: string;
    questions: FAQQuestion[];
  };
}

export interface LanguageDictionary {
  header: Header;
  pages: {
    home: Home;
  };
  footer: Footer;
}
