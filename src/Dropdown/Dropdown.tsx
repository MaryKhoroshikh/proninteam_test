import { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  trigger: ReactNode; // Триггер (кнопка/иконка/др.)
  content: ReactNode; // Содержимое выпадающего меню
}

export const Dropdown = ({ trigger, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрываем при клике вне меню
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

  // Рассчитываем позицию при открытии
  const openMenu = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = triggerRect.right;
    let top = triggerRect.bottom;

    // Корректируем, написать логику выбора стороны открытия

    setPosition({ left, top });
    setIsOpen(true);
  };

  return (
    <div className={styles.dropdownMenu}>
      <div ref={triggerRef} onClick={openMenu} className={styles.dropdownTrigger}>
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
          {content}
        </div>
      )}
    </div>
  );
};