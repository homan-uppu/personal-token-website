export enum TokenType {
  PersonalToken = "PersonalToken",
  Company = "Company",
}

export interface PersonalToken {
  name: string;
  profilePicSrc: string;
  valuation: number;
  bio?: string;
  linkInBio?: string;
  walletValue?: number;
  shareholders?: { holder: PersonalToken; equity: number }[];
  portfolio?: Asset[];
}

export interface Company {
  name: string;
  profilePicSrc: string;
  valuation: number;
}

export interface Asset {
  type: TokenType;
  personalToken?: PersonalToken;
  company?: Company;
  equity: number;
}

export const dummyPersonalToken: PersonalToken = {
  profilePicSrc: "/images/amy.png",
  name: "Amy K",
  valuation: 9000000,
  bio: "Researching novel, quick acting, acne treatments.",
  linkInBio: "amyk.xyz",
  shareholders: [
    {
      holder: {
        profilePicSrc: "/images/amy.png",
        name: "Amy K",
        valuation: 300000,
        walletValue: 300000,
      },
      equity: 95,
    },
    {
      holder: {
        profilePicSrc: "/images/jane.png",
        name: "Jane S",
        valuation: 100000,
        walletValue: 100000,
      },
      equity: 5,
    },
  ],
  portfolio: [
    {
      type: TokenType.PersonalToken,
      personalToken: {
        profilePicSrc: "/images/sam.png",
        name: "Sam C",
        valuation: 3000000,
      },
      equity: 0.02,
    },
    {
      type: TokenType.PersonalToken,
      personalToken: {
        profilePicSrc: "/images/maya.png",
        name: "Maya P",
        valuation: 14000000,
      },
      equity: 0.03,
    },
    {
      type: TokenType.Company,
      company: {
        name: "OpenAI",
        profilePicSrc: "/images/openai.png",
        valuation: 30000000,
      },
      equity: 0.013,
    },
    {
      type: TokenType.Company,
      company: {
        name: "Reddit",
        profilePicSrc: "/images/reddit.png",
        valuation: 2000000,
      },
      equity: 0.0042,
    },
    {
      type: TokenType.Company,
      company: {
        name: "Apple",
        profilePicSrc: "/images/apple.png",
        valuation: 300000000,
      },
      equity: 0.0001,
    },
  ],
};
