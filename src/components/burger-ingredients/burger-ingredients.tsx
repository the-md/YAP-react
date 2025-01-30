import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientSection } from "./ingredient-section/ingredient-section.tsx";
import { IngredientItem } from "./ingredient-item/ingredient-item.tsx";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: React.FC = () => {
  const { ingredients } = useSelector(getIngredientsState);
  const [currentTab, setCurrentTab] = React.useState('bun')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const itemsBun = ingredients?.filter((product) => product.type === 'bun');
  const itemsSauce = ingredients?.filter((product) => product.type === 'sauce');
  const itemsMain = ingredients?.filter((product) => product.type === 'main');

  const tabsMap = [
    { key: "bun", title: "Булки", items: itemsBun },
    { key: "sauce", title: "Соусы", items: itemsSauce },
    { key: "main", title: "Начинки", items: itemsMain },
  ]

  const updateCurrentTab = useCallback(() => {
    const visibleSection = Object.entries(sectionRefs.current).find(([, ref]) => {
      if (!ref) return false;

      const rect = ref.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
    });

    if (visibleSection?.[0] && visibleSection[0] !== currentTab) {
      setCurrentTab(visibleSection[0]);
    }
  }, [currentTab]);

  useEffect(() => {
    const handleScroll = () => updateCurrentTab();
    const container = document.querySelector(styles.ingredientsScroll);
    container?.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateCurrentTab]);

  const scrollToSection = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth" });
    setCurrentTab(key);
  };

  return (
    <>
      <section className="burgerColumn">
        <div className="mb-10 display-flex">
          {tabsMap.map(({key, title}) => (
            <Tab
              key={key}
              value={key}
              active={currentTab === key}
              onClick={() => scrollToSection(key)}
            >
              {title}
            </Tab>
          ))}
        </div>

        <div className={`custom-scroll ${styles.ingredientsScroll}`}>
          {tabsMap.map(({key, title, items}) => (
            <section
              key={key}
              ref={(el) => (sectionRefs.current[key] = el as HTMLDivElement)}
              id={key}
            >
              <IngredientSection title={title}>
                {items?.map(item => (
                  <IngredientItem
                    key={item._id}
                    item={item}
                  />
                ))}
              </IngredientSection>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
