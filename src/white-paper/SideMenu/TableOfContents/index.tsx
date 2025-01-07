import { getIdFromHeader } from "@/util";
import { Header, SubHeader } from "../Header";
import styles from "./TableOfContents.module.css";

type TableOfContentsProps = {
  sections: string[][];
  activeId: string;
  onSelect?: (id: string) => void;
};

export function TableOfContents({
  sections,
  activeId,
  onSelect,
}: TableOfContentsProps) {
  return (
    <div className={styles.container}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <Header
            key={sectionIndex}
            text={section[0]}
            isActive={activeId === getIdFromHeader(section[0])}
            onClick={() => onSelect?.(getIdFromHeader(section[0]))}
          />
          <div className={styles.h3Container}>
            {section.slice(1).map((item, itemIndex) => (
              <SubHeader
                key={itemIndex}
                text={item}
                isActive={activeId === getIdFromHeader(item)}
                onClick={() => onSelect?.(getIdFromHeader(item))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
