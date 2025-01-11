"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Geist_Mono } from "next/font/google";
import Image from "next/image";
import styles from "./Greats.module.css";
import { useIsMobile } from "@/white-paper/Content";

const geistMono = Geist_Mono({ subsets: ["latin"] });

type Great = {
  name: string;
  src: string;
  displayName: string;
};

const GridItem = ({
  great,
  width,
  height,
}: {
  great: Great;
  width: number;
  height: number;
}) => {
  return (
    <div className={styles.gridItem} style={{ height, width }}>
      <Image
        src={great.src}
        alt={great.name}
        className={styles.portrait}
        width={width}
        height={height}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
      <span className={`${styles.label} ${geistMono.className}`}>
        {great.displayName}
      </span>
    </div>
  );
};

const GreatsGrid = () => {
  const [greats, setGreats] = useState<Great[]>([
    {
      name: "Albert Einstein",
      src: "/greats/einstein.png",
      displayName: "Einstein",
    },
    { name: "Marie Curie", src: "/greats/curie.png", displayName: "Curie" },
    { name: "Rumi", src: "/greats/rumi.png", displayName: "Rumi" },
    {
      name: "Ada Lovelace",
      src: "/greats/lovelace.png",
      displayName: "Lovelace",
    },
    {
      name: "Srinivasa Ramanujan",
      src: "/greats/ramanujan.png",
      displayName: "Ramanujan",
    },
    { name: "Tu Youyou", src: "/greats/youyou.png", displayName: "Youyou" },
    {
      name: "Emmy Noether",
      src: "/greats/noether.png",
      displayName: "Noether",
    },
    {
      name: "Leonardo Da Vinci",
      src: "/greats/vinci.png",
      displayName: "Da Vinci",
    },
    { name: "Galileo", src: "/greats/galileo.png", displayName: "Galileo" },
    {
      name: "Aryabhatta",
      src: "/greats/aryabhatta.png",
      displayName: "Aryabhatta",
    },
    { name: "Nikola Tesla", src: "/greats/tesla.png", displayName: "Tesla" },
    { name: "Grace Hopper", src: "/greats/hopper.png", displayName: "Hopper" },
    {
      name: "Al-Khwarizmi",
      src: "/greats/al-khwarizmi.png",
      displayName: "Al-Khwarizmi",
    },
    {
      name: "Wolfgang Amadeus Mozart",
      src: "/greats/mozart.png",
      displayName: "Mozart",
    },
    {
      name: "Rabindranath Tagore",
      src: "/greats/tagore.png",
      displayName: "Tagore",
    },
    {
      name: "William Shakespeare",
      src: "/greats/shakespeare.png",
      displayName: "Shakespeare",
    },
    { name: "Mary Astell", src: "/greats/astell.png", displayName: "Astell" },
    {
      name: "Murasaki Shikibu",
      src: "/greats/shikibu.png",
      displayName: "Shikibu",
    },
    {
      name: "Akira Kurosawa",
      src: "/greats/kurosawa.png",
      displayName: "Kurosawa",
    },
    {
      name: "Aristotle",
      src: "/greats/aristotle.png",
      displayName: "Aristotle",
    },
  ]);

  const greatsRef = useRef(greats);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [numRows, setNumRows] = useState(0);
  const [visibleNumPerRow, setVisibleNumPerRow] = useState(4);
  const [visibleNumPerCol, setVisibleNumPerCol] = useState(4);
  const horizontalPadding = 16 + 16 * visibleNumPerRow; // container padding + gap
  const verticalPadding = 16 + 16 * visibleNumPerCol; // container padding + gap

  useEffect(() => {
    const calculateDimensions = () => {
      const isMobile = window.innerWidth < 700;
      const effectiveNumPerRow = isMobile ? 2 : 4;
      const effectiveNumPerCol = isMobile ? 4 : 4;

      const width =
        (window.innerWidth - horizontalPadding) / effectiveNumPerRow;
      const height =
        (window.innerHeight - verticalPadding) / effectiveNumPerCol;
      const rows = effectiveNumPerCol;

      setVisibleNumPerRow(effectiveNumPerRow);
      setVisibleNumPerCol(effectiveNumPerCol);
      setItemWidth(width);
      setItemHeight(height);
      setNumRows(rows);
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => window.removeEventListener("resize", calculateDimensions);
  }, [horizontalPadding, verticalPadding, visibleNumPerRow, visibleNumPerCol]);

  useEffect(() => {
    const shuffleArray = (array: Great[]): Great[] => {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };

    // Create two separate shuffled copies and concatenate
    const firstShuffle = shuffleArray([...greats]);
    const secondShuffle = shuffleArray([...greats]);

    // Ensure no adjacent duplicates at the join point
    if (firstShuffle[firstShuffle.length - 1].name === secondShuffle[0].name) {
      [secondShuffle[0], secondShuffle[1]] = [
        secondShuffle[1],
        secondShuffle[0],
      ];
    }

    const shuffledGreats = [...firstShuffle, ...secondShuffle];
    setGreats(shuffledGreats);
    greatsRef.current = shuffledGreats;
  }, []);

  const getExtraNumPerRow = () => {
    return (
      (greatsRef.current.length - visibleNumPerRow * visibleNumPerCol) /
      visibleNumPerRow
    );
  };

  const getRowItems = (startIdx: number) => {
    const visibleItems = greatsRef.current.slice(
      startIdx,
      startIdx + visibleNumPerRow
    );

    const extraNumPerRow = getExtraNumPerRow();

    const extraItems = [
      ...greatsRef.current.slice(
        startIdx + visibleNumPerRow,
        startIdx + visibleNumPerRow + extraNumPerRow
      ),
      ...visibleItems.slice(0, visibleNumPerRow),
    ];
    return [...visibleItems, ...extraItems];
  };

  const rows = Array.from({ length: numRows }, (_, i) =>
    getRowItems((i * visibleNumPerRow) % greatsRef.current.length)
  );

  const extraNumPerRow = getExtraNumPerRow();

  return (
    <div className={styles.grid}>
      {rows.map((row, idx) => (
        <motion.div
          key={idx}
          className={styles.row}
          initial={{ x: 0 }}
          animate={{
            x:
              -(
                (visibleNumPerRow + extraNumPerRow) * itemWidth +
                16 * (visibleNumPerRow + extraNumPerRow + 1)
              ) - 12,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {row.map((great, index) => (
            <GridItem
              key={index}
              great={great}
              width={itemWidth}
              height={itemHeight}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default GreatsGrid;
