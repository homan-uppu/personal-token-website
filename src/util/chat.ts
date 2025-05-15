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
  annotations?: ContentItem[];
  followUps?: string[];
}

// Entire question tree
export type QuestionTree = Node[];

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
                          type: MediaType.Image,
                          value: "/images/track-record.png",
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
                  value: "PersonalToken",
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
];
