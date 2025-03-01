export enum TokenType {
  PersonalToken = "PersonalToken",
  Company = "Company",
}

export interface PersonalToken {
  name: string;
  username: string;
  profilePicSrc: string;
  lastRoundDate?: Date;
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
  profilePicSrc: "/images/jane.png",
  name: "Jane Doe",
  username: "@janedoe",
  valuation: 9000000,
  bio: "Independent nuclear fusion researcher focusing on small-scale tokamak reactor designs.",
  lastRoundDate: new Date("2024-01-01"),
  linkInBio: "janedoe.xyz",
  shareholders: [
    {
      holder: {
        profilePicSrc: "/images/jane.png",
        name: "(self)",
        username: "@janedoe",
        valuation: 200000,
        walletValue: 200000,
      },
      equity: 0.97,
    },
    {
      holder: {
        profilePicSrc: "/images/amy.png",
        name: "Amy K.",
        username: "@amyk",
        valuation: 300000,
        walletValue: 300000,
      },
      equity: 0.01,
    },
    {
      holder: {
        profilePicSrc: "/images/sam.png",
        name: "Sam C.",
        username: "@samc",
        valuation: 150000,
        walletValue: 150000,
      },
      equity: 0.02,
    },
  ],
  portfolio: [
    {
      type: TokenType.PersonalToken,
      personalToken: {
        profilePicSrc: "/images/sam.png",
        name: "Sam C.",
        username: "@samc",
        valuation: 500000,
      },
      equity: 0.01,
    },
    {
      type: TokenType.PersonalToken,
      personalToken: {
        profilePicSrc: "/images/maya.png",
        username: "@mayap",
        name: "Maya",
        valuation: 3000000,
      },
      equity: 0.02,
    },
    {
      type: TokenType.Company,
      company: {
        name: "Tesla",
        profilePicSrc: "/images/tesla.png",
        valuation: 6000,
      },
      equity: 0.08,
    },
    {
      type: TokenType.Company,
      company: {
        name: "Microsoft",
        profilePicSrc: "/images/microsoft.png",
        valuation: 100000,
      },
      equity: 0.05,
    },
    {
      type: TokenType.Company,
      company: {
        name: "Apple",
        profilePicSrc: "/images/apple.png",
        valuation: 80000,
      },
      equity: 0.06,
    },
  ],
};

// export const dummyPersonalToken: PersonalToken = {
//   profilePicSrc: "/images/jane.png",
//   name: "Jane Doe",
//   username: "@janedoe",
//   valuation: 9000000,
//   bio: "Researching novel, quick acting, acne treatments.",
//   lastRoundDate: new Date("2024-01-01"),
//   linkInBio: "amyk.xyz",
//   shareholders: [
//     {
//       holder: {
//         profilePicSrc: "/images/amy.png",
//         name: "Amy K",
//         username: "@amyk",
//         valuation: 300000,
//         walletValue: 300000,
//       },
//       equity: 0.95,
//     },
//     {
//       holder: {
//         profilePicSrc: "/images/jane.png",
//         name: "Jane S",
//         username: "@janes",
//         valuation: 100000,
//         walletValue: 100000,
//       },
//       equity: 0.05,
//     },
//   ],
//   portfolio: [
//     {
//       type: TokenType.PersonalToken,
//       personalToken: {
//         profilePicSrc: "/images/sam.png",
//         name: "Sam C",
//         username: "@samc",
//         valuation: 3000000,
//       },
//       equity: 0.02,
//     },
//     {
//       type: TokenType.PersonalToken,
//       personalToken: {
//         profilePicSrc: "/images/maya.png",
//         username: "@mayap",
//         name: "Maya P",
//         valuation: 14000000,
//       },
//       equity: 0.03,
//     },
//     {
//       type: TokenType.Company,
//       company: {
//         name: "OpenAI",
//         profilePicSrc: "/images/openai.png",
//         valuation: 30000000,
//       },
//       equity: 0.013,
//     },
//     {
//       type: TokenType.Company,
//       company: {
//         name: "Reddit",
//         profilePicSrc: "/images/reddit.png",
//         valuation: 2000000,
//       },
//       equity: 0.0042,
//     },
//     {
//       type: TokenType.Company,
//       company: {
//         name: "Apple",
//         profilePicSrc: "/images/apple.png",
//         valuation: 300000000,
//       },
//       equity: 0.0001,
//     },
//   ],
// };
