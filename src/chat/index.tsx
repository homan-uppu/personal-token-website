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
import { dummyPersonalToken } from "@/util/models";
import { PersonalTokenComp } from "@/components/PersonalToken";
import Caption from "@/components/Caption";
import FollowUpPane from "./FollowUpPane";

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
  // State: track if user has ever clicked on a pill
  const [hasEverClickedOnPill, setHasEverClickedOnPill] = useState(false);

  // Handler for pill click
  const handlePillClick = (
    bubbleIdx: number,
    contentIdx: number,
    pill: Pill
  ) => {
    // Only expand if not already expanded
    const pillKey = `${bubbleIdx}-${contentIdx}`;
    if (expandedPills[pillKey] != null) return;

    // Mark that user has clicked a pill at least once
    if (!hasEverClickedOnPill) setHasEverClickedOnPill(true);

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
      if (expansion.position === ExpansionPosition.Annotation) {
        // Add the annotation to the bubble
        setBubbles((prev) => {
          const newBubbles = [...prev];
          newBubbles[bubbleIdx].annotations =
            expansion.content as ContentItem[];
          console.log("newbubbles: ", newBubbles);
          return newBubbles;
        });
      }
    });

    // Mark as expanded (using 0 for compatibility, but could be changed)
    setExpandedPills((prev) => ({ ...prev, [pillKey]: 0 }));
  };

  const clickMeLabel = <Caption label="(click me)" />;

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
          item.value === "PersonalTokenComponent"
        ) {
          // Placeholder for PersonalToken component
          return (
            <div key={idx} className={styles.component}>
              <PersonalTokenComp token={dummyPersonalToken} />
              {clickMeLabel}
            </div>
          );
        }

        // Add support for Image/Video if needed
        if (item.type === MediaType.Image) {
          return (
            <img
              key={idx}
              src={item.value}
              alt=""
              style={{
                maxWidth: "320px",
                maxHeight: "200px",
                borderRadius: "8px",
                margin: "8px 0",
                display: "block",
              }}
            />
          );
        }
        return null;
      } else if (isPill(item)) {
        const pillKey = `${bubbleIdx}-${idx}`;
        const isExpanded = expandedPills[pillKey] != null;
        return (
          <React.Fragment key={idx}>
            <PillComponent
              isExpanded={isExpanded}
              text={item.text}
              caption={!hasEverClickedOnPill ? "(click me)" : undefined}
              onClick={() => handlePillClick(bubbleIdx, idx, item)}
            />
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
        <FollowUpPane
          followUps={followUps}
          onClick={(label: string) => {
            setBubbles((prevBubbles) => [
              ...prevBubbles,
              {
                id: label + "poop",
                author: Sender.User,
                content: [{ type: MediaType.Text, value: label }],
              },
              // Find the node in data for which id === label, and add it as well
              ...(chatData.find((node) => node.id === label)
                ? [chatData.find((node) => node.id === label)!]
                : []),
            ]);
          }}
        />
      </div>
    );
  };

  // Group bubbles into sequences of the same author
  type BubbleGroup = {
    author: Sender;
    bubbles: Node[];
    startIdx: number; // index in the original bubbles array
  };

  const groupBubblesByAuthor = (bubbles: Node[]): BubbleGroup[] => {
    if (bubbles.length === 0) return [];
    const groups: BubbleGroup[] = [];
    let currentAuthor = bubbles[0].author;
    let currentGroup: Node[] = [];
    let groupStartIdx = 0;
    bubbles.forEach((bubble, idx) => {
      if (bubble.author === currentAuthor) {
        currentGroup.push(bubble);
      } else {
        groups.push({
          author: currentAuthor,
          bubbles: currentGroup,
          startIdx: groupStartIdx,
        });
        currentAuthor = bubble.author;
        currentGroup = [bubble];
        groupStartIdx = idx;
      }
    });
    // Push the last group
    if (currentGroup.length > 0) {
      groups.push({
        author: currentAuthor,
        bubbles: currentGroup,
        startIdx: groupStartIdx,
      });
    }
    return groups;
  };

  // Group bubbles by author sequence
  const bubbleGroups = groupBubblesByAuthor(bubbles);

  // Helper to get the global bubble index for a group and local index
  const getGlobalBubbleIdx = (group: BubbleGroup, localIdx: number) =>
    group.startIdx + localIdx;

  return (
    <div className={styles.chatContainer}>
      {bubbleGroups.map((group, groupIdx) => {
        return (
          <div className={styles.bubbleSequence} key={`group-${groupIdx}`}>
            {group.bubbles.map((bubble, localIdx) => {
              const globalIdx = getGlobalBubbleIdx(group, localIdx);
              // Show the homan label on the last bubble of EACH homan sequence
              let showFooter = false;
              if (
                group.author === Sender.Homan &&
                localIdx === group.bubbles.length - 1
              ) {
                showFooter = true;
              }
              return (
                <div
                  key={bubble.id || globalIdx}
                  className={styles.bubbleWrapper}
                >
                  <Bubble
                    sender={bubble.author}
                    footer={{
                      label: bubble.author === Sender.Homan ? "homan" : "",
                      link:
                        bubble.author === Sender.Homan
                          ? "https://x.com/homanafterall"
                          : "",
                    }}
                    {...(showFooter ? { showFooter: true } : {})}
                  >
                    <div className={styles.bubbleContent}>
                      {renderContent(bubble.content, globalIdx)}
                    </div>
                  </Bubble>
                  {/* Only render followups for the last bubble */}
                  {bubble.annotations && bubble.annotations.length > 0 && (
                    <div className={styles.annotationsContainer}>
                      {bubble.annotations.map((annotation, idx) => (
                        <div key={idx} className={styles.annotation}>
                          {renderContent([annotation], idx)}
                        </div>
                      ))}
                    </div>
                  )}
                  {globalIdx === bubbles.length - 1 &&
                    renderFollowUps(bubble.followUps)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
