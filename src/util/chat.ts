// ================================
// Chat
// ================================

export enum ExpansionPosition {
  InLine = "in-line",
  Node = "node",
  Annotation = "annotation",
}

export enum MediaType {
  Text = "text",
  Image = "image",
  Video = "video",
  Component = "component",
}

export type ContentItem = {
  type: MediaType;
  value: string;
  isLooped?: boolean; // for video.
};

export type PillExpandedItem = {
  position: ExpansionPosition;
  node?: Node; // in case expanded position is newnode.
  content?: (ContentItem | Pill)[];
};

export type Pill = {
  text: string;
  expanded: PillExpandedItem[];
};

export enum Sender {
  Homan = "homan",
  User = "user",
}

export interface Node {
  id: string; // The question itself as the ID
  author: Sender;
  content: (ContentItem | Pill)[];
  annotations?: { content: ContentItem[]; pillId: string };
  followUps?: string[];
}

// Entire question tree
export type QuestionTree = Node[];

// UI STATE:

export const startingNodes: Node[] = [
  {
    id: "",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Text,
        value:
          "hey! personalTokenNet is a place where people invest in each other through their personal tokens.",
      },
    ],
  },
  {
    id: "about-personal-token",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Text,
        value: "your personal token represents your potential.",
      },
      {
        type: MediaType.Text,
        value: "its value is grounded in reality:",
      },
      {
        text: "companies",
        expanded: [
          {
            position: ExpansionPosition.InLine,
            content: [
              {
                type: MediaType.Text,
                value: " (the ones you start, work for, or invest in)",
              },
            ],
          },
        ],
      },
      {
        type: MediaType.Text,
        value: " and other personal tokens.",
      },
    ],
  },
  {
    id: "personal-token-comp",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Component,
        value: "PersonalTokenComponent",
      },
    ],
  },
  {
    id: "personal-token-buy-sell",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Text,
        value:
          "you can raise capital by selling equity in your personal token. you can also invest in other's personal tokens by buying equity in them.",
      },
    ],
    followUps: [
      "Why would I want to invest in personal tokens?",
      "Why would I want to sell equity in my personal token?",
    ],
  },
];

export const data: Node[] = [
  {
    id: "",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Text,
        value:
          "personalTokenNet is a place where members invest in each other through their",
      },
      {
        text: "personal tokens",
        expanded: [
          {
            position: ExpansionPosition.Node,
            node: {
              id: "about-personal-token",
              author: Sender.Homan,
              content: [
                {
                  type: MediaType.Text,
                  value: "your personal token represents your",
                },
                {
                  text: "potential",
                  expanded: [
                    {
                      position: ExpansionPosition.Annotation,
                      content: [
                        {
                          type: MediaType.Video,
                          value: "/videos/blossom.mp4",
                          isLooped: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: MediaType.Text,
                  value: ". its value is grounded in",
                },
                {
                  text: "reality",
                  expanded: [
                    {
                      position: ExpansionPosition.InLine,
                      content: [
                        {
                          type: MediaType.Text,
                          value:
                            "your equities in companies and other personal tokens",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: MediaType.Text,
                  value: ".",
                },
              ],
            },
          },
          {
            position: ExpansionPosition.Node,
            node: {
              id: "personal-token-comp",
              author: Sender.Homan,
              content: [
                {
                  type: MediaType.Component,
                  value: "PersonalTokenComponent",
                },
              ],
            },
          },
          {
            position: ExpansionPosition.Node,
            node: {
              id: "personal-token-buy-sell",
              author: Sender.Homan,
              content: [
                {
                  type: MediaType.Text,
                  value:
                    "you can raise capital by selling equity in your personal token. you can also invest in other's personal tokens by buying equity in them.",
                },
              ],
              followUps: [
                "Why would I want to invest in personal tokens?",
                "Why would I want to sell equity in my personal token?",
              ],
            },
          },
        ],
      },
      {
        type: MediaType.Text,
        value: ".",
      },
    ],
    followUps: [],
  },
  {
    id: "Why would I want to sell equity in my personal token?",
    author: Sender.Homan,
    content: [
      {
        type: MediaType.Text,
        value:
          "Selling equity in your personal token allows you to access capital from supporters, fans, or investors who believe in your future potential. By offering a stake in your token, you can fund personal projects, education, or entrepreneurial ventures, while also building a community of people who are invested in your success.",
      },
      {
        type: MediaType.Text,
        value:
          "Additionally, selling equity can help you signal your confidence in your own growth and create new opportunities for collaboration and networking. It's a way to align incentives between you and your supporters, as they benefit when you achieve your goals.",
      },
    ],
    followUps: [
      "What are the risks of selling equity in my personal token?",
      "How do I decide how much equity to sell?",
    ],
  },
];
