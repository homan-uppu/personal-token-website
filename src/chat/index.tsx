"use client";

import React, { useState } from "react";
import {
  data as chatData,
  Node,
  ContentItem,
  Pill,
  MediaType,
  ExpansionPosition,
  Sender,
} from "@/util/chat";
import Bubble from "./Bubble";
import PillComponent from "./Pill";
import styles from "./Chat.module.css";

// Helper to check if an object is a Pill
function isPill(item: any): item is Pill {
  return typeof item === "object" && "text" in item && "expanded" in item;
}

// Helper to check if an object is a ContentItem
function isContentItem(item: any): item is ContentItem {
  return typeof item === "object" && "type" in item && "value" in item;
}

// Main Chat component
const Chat: React.FC = () => {
  // State: array of nodes (bubbles)
  const [bubbles, setBubbles] = useState<Node[]>([chatData[0]]);
  // State: track which pills are expanded, by a unique key (bubbleIdx-contentIdx)
  const [expandedPills, setExpandedPills] = useState<
    Record<string, number | null>
  >({});

  // Handler for pill click
  const handlePillClick = (
    bubbleIdx: number,
    contentIdx: number,
    pill: Pill
  ) => {
    // Only expand if not already expanded
    const pillKey = `${bubbleIdx}-${contentIdx}`;
    if (expandedPills[pillKey] != null) return;

    // Expand ALL expansions in the expanded array
    pill.expanded.forEach((expansion, expansionIdx) => {
      if (expansion.position === ExpansionPosition.Node && expansion.node) {
        // Add the new node as a new bubble
        setBubbles((prev) => [...prev, expansion.node!]);
      } else if (
        expansion.position === ExpansionPosition.InLine &&
        expansion.content
      ) {
        // Inline expansion: insert the expanded content after the pill, but keep the pill itself
        setBubbles((prev) => {
          const newBubbles = [...prev];
          const bubble = { ...newBubbles[bubbleIdx] };
          const newContent = [...bubble.content];
          // Insert the expanded content right after the pill, keeping the pill itself
          newContent.splice(contentIdx + 1, 0, ...expansion.content!);
          bubble.content = newContent;
          newBubbles[bubbleIdx] = bubble;
          return newBubbles;
        });
      }
      // Annotation and other positions can be handled here if needed
    });

    // Mark as expanded (using 0 for compatibility, but could be changed)
    setExpandedPills((prev) => ({ ...prev, [pillKey]: 0 }));
  };

  // Render a single bubble's content
  const renderContent = (
    content: (ContentItem | Pill)[],
    bubbleIdx: number
  ) => {
    return content.map((item, idx) => {
      if (isContentItem(item)) {
        if (item.type === MediaType.Text) {
          return (
            <span key={idx} className={styles.text}>
              {item.value}{" "}
            </span>
          );
        }
        if (
          item.type === MediaType.Component &&
          item.value === "PersonalToken"
        ) {
          // Placeholder for PersonalToken component
          return (
            <span key={idx} className={styles.component}>
              [PersonalToken Component]
            </span>
          );
        }
        // Add support for Image/Video if needed
        return null;
      } else if (isPill(item)) {
        const pillKey = `${bubbleIdx}-${idx}`;
        const isExpanded = expandedPills[pillKey] != null;
        return (
          <React.Fragment key={idx}>
            <PillComponent
              isExpanded={isExpanded}
              text={item.text}
              onClick={() => handlePillClick(bubbleIdx, idx, item)}
            />{" "}
          </React.Fragment>
        );
      }
      return null;
    });
  };

  // Render followups for the last bubble
  const renderFollowUps = (followUps?: string[]) => {
    if (!followUps || followUps.length === 0) return null;
    return (
      <div className={styles.followUpsContainer}>
        {followUps.map((f, i) => (
          <div key={i} className={styles.followUp}>
            {f}
          </div>
        ))}
      </div>
    );
  };

  // Find the last index in the sequence of consecutive bubbles for which sender is homan
  let lastHomanIdx: number | null = null;
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].author === Sender.Homan) {
      lastHomanIdx = i;
      // Now check if previous bubble is also homan, keep going back
      let j = i - 1;
      while (j >= 0 && bubbles[j].author === Sender.Homan) {
        lastHomanIdx = j;
        j--;
      }
      // The last in the sequence is i, so break
      lastHomanIdx = i;
      break;
    }
  }

  // Now, find the start and end of the last consecutive homan sequence
  let lastHomanSeqStart: number | null = null;
  let lastHomanSeqEnd: number | null = null;
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].author === Sender.Homan) {
      lastHomanSeqEnd = i;
      let j = i;
      while (j >= 0 && bubbles[j].author === Sender.Homan) {
        lastHomanSeqStart = j;
        j--;
      }
      break;
    }
  }

  return (
    <div className={styles.chatContainer}>
      {bubbles.map((bubble, idx) => {
        // Determine if this is the last bubble in the last sequence of consecutive homan bubbles
        let showFooter = false;
        if (
          bubble.author === Sender.Homan &&
          lastHomanSeqEnd !== null &&
          idx === lastHomanSeqEnd
        ) {
          showFooter = true;
        }
        return (
          <div key={bubble.id || idx} className={styles.bubbleWrapper}>
            <Bubble
              sender={bubble.author}
              footer={{
                label: bubble.author === Sender.Homan ? "homan" : "",
              }}
              {...(showFooter ? { showFooter: true } : {})}
            >
              <div className={styles.bubbleContent}>
                {renderContent(bubble.content, idx)}
              </div>
            </Bubble>
            {/* Only render followups for the last bubble */}
            {idx === bubbles.length - 1 && renderFollowUps(bubble.followUps)}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
