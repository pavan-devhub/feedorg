import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

const toOption = (option) => (typeof option === 'string' ? { value: option, label: option } : option);

// Filter dropdown whose list always opens below the box: a native <select> flips its list
// upward when the page runs out of room underneath. The list is rendered into <body> so
// the card's overflow: hidden doesn't clip it.
// options: plain strings, or { value, label } pairs; onChange receives the new value.
const FilterDropdown = ({ id, value, onChange, options }) => {
  const items = [{ value: '', label: 'All' }, ...options.map(toOption)];
  const selectedIndex = Math.max(0, items.findIndex((item) => item.value === value));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const openList = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
    setActive(selectedIndex);
    setOpen(true);
  };
  const choose = (index) => {
    onChange(items[index].value);
    setOpen(false);
  };

  // Close on a click outside, or when a resize would leave the list out of place
  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutside = (event) => {
      if (!buttonRef.current.contains(event.target) && !listRef.current?.contains(event.target)) setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener('mousedown', closeOnOutside);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  // On opening, scroll the page just enough to show the list rather than flipping it upward
  useLayoutEffect(() => {
    if (open) listRef.current.scrollIntoView({ block: 'nearest' });
  }, [open]);

  // Keep the highlighted option visible inside the list
  useLayoutEffect(() => {
    const list = listRef.current;
    const option = list?.children[active];
    if (!option) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
    }
  }, [open, active]);

  const onKeyDown = (event) => {
    const { key } = event;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        openList();
      }
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.min(items.length - 1, Math.max(0, index + (key === 'ArrowDown' ? 1 : -1))));
    } else if (key === 'Home' || key === 'End') {
      event.preventDefault();
      setActive(key === 'Home' ? 0 : items.length - 1);
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      choose(active);
    } else if (key === 'Escape' || key === 'Tab') {
      if (key === 'Escape') event.preventDefault();
      setOpen(false);
    }

    // Typing a letter jumps to the next option starting with it, as a native select does
    if (key.length === 1 && key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const from = open ? active : selectedIndex;
      const letter = key.toLowerCase();
      for (let step = 1; step <= items.length; step += 1) {
        const index = (from + step) % items.length;
        if (items[index].label.toLowerCase().startsWith(letter)) {
          if (open) setActive(index);
          else onChange(items[index].value);
          break;
        }
      }
    }
  };

  return (
    <div className="tf-dropdown">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        // Space activates a button on keyup; it is already handled on keydown
        onKeyUp={(event) => event.key === ' ' && event.preventDefault()}
        className="tf-control tf-dropdown__button"
      >
        <span className="tf-dropdown__value">{items[selectedIndex].label}</span>
      </button>
      <ChevronDown size={16} strokeWidth={1.8} className="tf-dropdown__chevron" />

      {open &&
        createPortal(
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={id}
            style={{ top: position.top, left: position.left, minWidth: position.width, maxWidth: window.innerWidth - position.left - 16 }}
            className="tf-dropdown-list"
          >
            {items.map((item, index) => (
              <li
                key={item.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
                className={`tf-dropdown-list__option${index === active ? ' is-active' : ''}${index === selectedIndex ? ' is-selected' : ''}`}
              >
                {item.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default FilterDropdown;
