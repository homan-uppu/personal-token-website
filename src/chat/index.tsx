"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  data as chatData,
  Node,
  ContentItem,
  Pill,
  MediaType,
  ExpansionPosition,
  Sender,
  startingNodes,
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

// Group bubbles into sequences of the same author
type BubbleGroup = {
  author: Sender;
  bubbles: Node[];
  startIdx: number; // index in the original bubbles array
};

function useBubbleGroups(bubbles: Node[]) {
  return React.useMemo(() => {
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
  }, [bubbles]);
}

// Custom hook to manage chat state and pill expansion logic
function useChatState(initialBubbles: Node[], scrollToBottom: () => void) {
  const [bubbles, setBubbles] = useState<Node[]>(initialBubbles);
  const [expandedPills, setExpandedPills] = useState<
    Record<string, number | null>
  >({});
  const [hasEverClickedOnPill, setHasEverClickedOnPill] = useState(false);

  // Helper to sequentially add nodes with loading
  const sequentiallyAddNodes = useCallback(
    (
      pillKey: string,
      nodes: Node[],
      idx = 0,
      ms: number = 500 // Optional param for setTimeout delay
    ) => {
      if (idx >= nodes.length) return;
      // Add node with empty content (isLoading)
      setBubbles((prev) => [
        ...prev,
        {
          ...nodes[idx],
          content: [],
        },
      ]);
      // After ms, fill in the content
      setTimeout(() => {
        setBubbles((prev) => {
          // Find the last node with empty content and fill it in
          const newBubbles = [...prev];
          // Find the index of the node we just added (should be at the end)
          const lastIdx =
            newBubbles.length - (prev.length - bubbles.length) - 1;
          // Defensive: fallback to last
          const nodeIdx = newBubbles.findIndex(
            (b, i) =>
              b.id === nodes[idx].id &&
              b.author === nodes[idx].author &&
              b.content.length === 0
          );
          const updateIdx = nodeIdx !== -1 ? nodeIdx : lastIdx;
          newBubbles[updateIdx] = {
            ...newBubbles[updateIdx],
            content: nodes[idx].content,
          };
          return newBubbles;
        });
        // Next node after previous is loaded
        sequentiallyAddNodes(pillKey, nodes, idx + 1, ms);
        scrollToBottom();
      }, ms);
    },
    [setBubbles, bubbles.length]
  );

  // Handler for pill click
  const handlePillClick = useCallback(
    (bubbleIdx: number, contentIdx: number, pill: Pill) => {
      const pillKey = `${bubbleIdx}-${contentIdx}`;
      if (expandedPills[pillKey] != null) return;

      if (!hasEverClickedOnPill) setHasEverClickedOnPill(true);

      // Gather all node expansions
      const nodeExpansions =
        pill.expanded
          .filter(
            (expansion) =>
              expansion.position === ExpansionPosition.Node && expansion.node
          )
          .map((expansion) => expansion.node!) || [];

      // Handle in-line and annotation expansions immediately
      pill.expanded.forEach((expansion) => {
        if (
          expansion.position === ExpansionPosition.InLine &&
          expansion.content
        ) {
          setBubbles((prev) => {
            const newBubbles = [...prev];
            const bubble = { ...newBubbles[bubbleIdx] };
            const newContent = [...bubble.content];
            newContent.splice(contentIdx + 1, 0, ...expansion.content!);
            bubble.content = newContent;
            newBubbles[bubbleIdx] = bubble;
            return newBubbles;
          });
        }
        if (expansion.position === ExpansionPosition.Annotation) {
          setBubbles((prev) => {
            const newBubbles = [...prev];
            newBubbles[bubbleIdx].annotations = {
              content: expansion.content as ContentItem[],
              pillId: pillKey,
            };
            return newBubbles;
          });
        }
      });

      // Sequentially add node expansions with loading
      if (nodeExpansions.length > 0) {
        sequentiallyAddNodes(pillKey, nodeExpansions, 0);
      }

      setExpandedPills((prev) => ({ ...prev, [pillKey]: 0 }));
    },
    [
      expandedPills,
      hasEverClickedOnPill,
      setBubbles,
      setExpandedPills,
      setHasEverClickedOnPill,
      sequentiallyAddNodes,
    ]
  );

  // Handler for follow up click
  const handleFollowUpClick = React.useCallback(
    (label: string) => {
      const foundNode = chatData.find((node) => node.id === label);

      const bubbleWithUserMessage = {
        id: label + "poop",
        author: Sender.User,
        content: [{ type: MediaType.Text, value: label }],
      };

      // first set the user message:
      setBubbles((prevBubbles) => [...prevBubbles, bubbleWithUserMessage]);

      if (foundNode) {
        // first set the content to loading, and after 500ms set the content to the foundNode

        const foundNodeWithEmptyContent = {
          ...foundNode,
          content: [],
        };

        setBubbles((prevBubbles) => [
          ...prevBubbles,
          foundNodeWithEmptyContent,
        ]);

        setTimeout(() => {
          setBubbles((prevBubbles) => {
            const newBubbles = [...prevBubbles];
            newBubbles[newBubbles.length - 1] = foundNode;
            return newBubbles;
          });
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }, 500);
      } else {
        // TODO - actually hit the LLM.
      }
    },
    [scrollToBottom]
  );

  return {
    bubbles,
    setBubbles,
    expandedPills,
    setExpandedPills,
    hasEverClickedOnPill,
    setHasEverClickedOnPill,
    handlePillClick,
    handleFollowUpClick,
    sequentiallyAddNodes,
  };
}

// Main Chat component
const Chat: React.FC = () => {
  // Ref for scrolling to bottom
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Helper to scroll to bottom smoothly
  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const {
    bubbles,
    expandedPills,
    handlePillClick,
    handleFollowUpClick,
    sequentiallyAddNodes,
  } = useChatState([], scrollToBottom);

  const bubbleGroups = useBubbleGroups(bubbles);

  useEffect(() => {
    sequentiallyAddNodes("poop", startingNodes, 0, 300);
  }, []);

  // Helper to get the global bubble index for a group and local index
  const getGlobalBubbleIdx = (group: BubbleGroup, localIdx: number) =>
    group.startIdx + localIdx;

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
        if (item.type === MediaType.Video) {
          return (
            <video
              key={idx}
              src={item.value}
              loop={item.isLooped}
              autoPlay
              style={{
                maxWidth: "320px",
                maxHeight: "200px",
                borderRadius: "8px",
                margin: "8px 0",
                display: "block",
                background: "#000",
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
              onClick={() => handlePillClick(bubbleIdx, idx, item)}
            />
          </React.Fragment>
        );
      }
      return null;
    });
  };

  // Render followups for the last bubble
  // Now takes the bubble as an argument to check if it's loading
  const renderFollowUps = (bubble: Node) => {
    if (
      !bubble.followUps ||
      bubble.followUps.length === 0 ||
      bubble.content.length === 0 // Do not show followups if bubble is loading
    )
      return null;
    return (
      <div className={styles.followUpsContainer}>
        <FollowUpPane
          followUps={bubble.followUps}
          onClick={handleFollowUpClick}
        />
      </div>
    );
  };

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
                    isLoading={bubble.content.length === 0}
                    {...(showFooter ? { showFooter: true } : {})}
                  >
                    <div className={styles.bubbleContent}>
                      {renderContent(bubble.content, globalIdx)}
                    </div>
                  </Bubble>
                  {/* Only render followups for the last bubble */}
                  {bubble.annotations &&
                    bubble.annotations.content.length > 0 && (
                      <div className={styles.annotationsContainer}>
                        {bubble.annotations.content.map((annotation, idx) => (
                          <div key={idx} className={styles.annotation}>
                            {renderContent([annotation], idx)}
                          </div>
                        ))}
                      </div>
                    )}
                  {globalIdx === bubbles.length - 1 && renderFollowUps(bubble)}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* Scroll anchor for auto-scroll to bottom */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Chat;
