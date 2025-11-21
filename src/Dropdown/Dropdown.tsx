import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Dropdown.module.css';

type DropdownContent = ReactNode | ((onCloseDropdown: () => void) => ReactNode);

interface DropdownProps {
  trigger: ReactNode; // Триггер (кнопка/иконка/др.)
  content: DropdownContent; // Содержимое выпадающего меню
}

export const Dropdown = ({ trigger, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Функция для расчёта позиции выпадающего меню относительно триггера
  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Корректировка позиции, если меню выходит за границы окна
    const menuWidth = 152; // Предполагаемая ширина меню
    const menuHeight = 65; // Предполагаемая высота меню

    // Базовая позиция: справа снизу от триггера
    const left =
      windowWidth - triggerRect.right >= triggerRect.left
        ? triggerRect.right
        : triggerRect.left - menuWidth;
    const top =
      windowHeight - triggerRect.bottom >= triggerRect.top
        ? triggerRect.bottom
        : triggerRect.top - menuHeight;

    setPosition({ left, top });
  };

  // Пересчитываем позицию при открытии меню и при изменении размеров окна
  useEffect(() => {
    if (isOpen) {
      calculatePosition();

      // Добавляем обработчики для пересчёта при изменении размеров окна
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);

      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isOpen]);

  // Закрываем меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Открытие/закрытие меню
  const toggleMenu = () => {
    if (!triggerRef.current) return;

    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownMenu}>
      <div
        ref={triggerRef}
        onClick={toggleMenu}
        className={styles.dropdownTrigger}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={styles.dropdownContent}
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
          {typeof content === 'function' ? content(closeDropdown) : content}
        </div>
      )}
    </div>
  );
};
