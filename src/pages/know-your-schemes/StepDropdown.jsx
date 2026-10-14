import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const MENU_MAX_HEIGHT = 380;
const MENU_MIN_HEIGHT = 150;
const VIEWPORT_GAP = 12;
const NAVBAR_CLEARANCE = 92; // the fixed navbar covers the top of the viewport
const PAGE_STEP = 8;
const TYPEAHEAD_RESET_MS = 600;

const isPrintableKey = (e) => e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

const byLabel = (a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base', numeric: true });

// Nearly every ministry starts with "Ministry of", so typing also matches the name after it.
const typeaheadKeys = (label) => {
  const name = label.toLowerCase();
  return [name, name.replace(/^ministry of (the )?/, '')];
};

// Select-only combobox (WAI-ARIA APG pattern) drawn like the step cards: each option is a bold
// title over a muted hint, in the step's tone. Focus stays on the trigger; the highlighted option
// is announced through aria-activedescendant.
//
// `options` is [{ value, label, hint? }] and is always listed A-Z. Name the control with
// `labelledBy` (an element id) or `label`. With no options the control shows `placeholder` and
// is disabled.
const StepDropdown = ({ id, labelledBy, label, value, options: unsorted, placeholder, onChange, className = '' }) => {
  const options = [...unsorted].sort(byLabel);
  const disabled = options.length === 0;
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selectedIndex);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ text: '', timer: 0 });

  const listId = `${id}-list`;
  const optionId = (i) => `${id}-opt-${i}`;
  const last = options.length - 1;

  const openMenu = (index = selectedIndex) => {
    setActive(index);
    setOpen(true);
  };

  const commit = (index) => {
    setOpen(false);
    if (options[index].value !== value) onChange(options[index].value);
  };

  // Typed letters jump to the next option starting with them (see typeaheadKeys); repeating one
  // letter cycles through the matches.
  const findByTypeahead = (char, from) => {
    const t = typeahead.current;
    clearTimeout(t.timer);
    t.text += char.toLowerCase();
    t.timer = setTimeout(() => { t.text = ''; }, TYPEAHEAD_RESET_MS);
    const cycling = [...t.text].every((c) => c === t.text[0]);
    const query = cycling ? t.text[0] : t.text;
    const start = cycling ? from + 1 : from;
    for (let k = 0; k < options.length; k++) {
      const i = (start + k) % options.length;
      if (typeaheadKeys(options[i].label).some((key) => key.startsWith(query))) return i;
    }
    return -1;
  };

  useEffect(() => () => clearTimeout(typeahead.current.timer), []);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutside = (e) => {
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    return () => document.removeEventListener('pointerdown', closeOnOutside);
  }, [open]);

  // On open: drop down, or up when the list does not fit below and there is more room above,
  // capped to that room; then centre the selected option in the list.
  useLayoutEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const rect = triggerRef.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom - VIEWPORT_GAP;
    const above = rect.top - NAVBAR_CLEARANCE - VIEWPORT_GAP;
    const up = Math.min(list.scrollHeight, MENU_MAX_HEIGHT) > below && above > below;
    menuRef.current.dataset.placement = up ? 'up' : 'down';
    list.style.maxHeight = `${Math.max(MENU_MIN_HEIGHT, Math.min(MENU_MAX_HEIGHT, up ? above : below))}px`;

    const current = list.querySelector('[aria-selected="true"]');
    if (current) list.scrollTop = current.offsetTop - (list.clientHeight - current.offsetHeight) / 2;
  }, [open]);

  // Keep the highlighted option in view while moving through the list.
  useLayoutEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const el = document.getElementById(optionId(active));
    if (!el) return;
    if (el.offsetTop < list.scrollTop) {
      list.scrollTop = el.offsetTop - VIEWPORT_GAP;
    } else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight + VIEWPORT_GAP;
    }
  }, [open, active]);

  const handleKeyDown = (e) => {
    if (disabled) return;
    const typing = typeahead.current.text !== '';
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) openMenu();
      else if (e.key === 'Home') openMenu(0);
      else if (e.key === 'End') openMenu(last);
      else if (isPrintableKey(e)) {
        const i = findByTypeahead(e.key, selectedIndex);
        if (i >= 0) openMenu(i);
      } else return;
      e.preventDefault();
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        if (e.altKey) commit(active);
        else setActive((i) => Math.min(last, i + 1));
        break;
      case 'ArrowUp':
        if (e.altKey) commit(active);
        else setActive((i) => Math.max(0, i - 1));
        break;
      case 'Home': setActive(0); break;
      case 'End': setActive(last); break;
      case 'PageDown': setActive((i) => Math.min(last, i + PAGE_STEP)); break;
      case 'PageUp': setActive((i) => Math.max(0, i - PAGE_STEP)); break;
      case 'Escape': setOpen(false); break;
      case 'Tab': commit(active); return; // let focus move on
      case 'Enter': commit(active); break;
      case ' ':
        if (!typing) {
          commit(active);
          break;
        }
      // falls through: a space inside a typed search is part of it
      default: {
        if (!isPrintableKey(e)) return;
        const i = findByTypeahead(e.key, active);
        if (i >= 0) setActive(i);
      }
    }
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className={`kys-dd${open ? ' is-open' : ''}${disabled ? ' is-disabled' : ''} ${className}`.trim()}>
      <div
        ref={triggerRef}
        id={id}
        className="kys-dd-trigger"
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelledBy}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-disabled={disabled || undefined}
        onClick={() => !disabled && (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        onBlur={(e) => !rootRef.current.contains(e.relatedTarget) && setOpen(false)}
      >
        <span className="kys-dd-value">{disabled ? placeholder : selected.label}</span>
        <span className="kys-dd-chevron" aria-hidden="true"><ChevronDown strokeWidth={2.6} /></span>
      </div>

      {/* mousedown would move focus off the trigger; keep it there so the keys keep working */}
      <div ref={menuRef} className="kys-dd-menu" hidden={!open} onMouseDown={(e) => e.preventDefault()}>
        <div
          ref={listRef}
          id={listId}
          className="kys-dd-list"
          role="listbox"
          aria-labelledby={labelledBy}
          aria-label={label}
        >
          {options.map((option, i) => {
            const isSelected = i === selectedIndex;
            return (
              <div
                key={option.value}
                id={optionId(i)}
                role="option"
                aria-selected={isSelected}
                className={`kys-dd-option${i === active ? ' is-active' : ''}`}
                onClick={() => commit(i)}
                onMouseMove={() => i !== active && setActive(i)}
              >
                <span className="kys-dd-text">
                  <span className="kys-dd-label">{option.label}</span>
                  {option.hint && <span className="kys-dd-hint">{option.hint}</span>}
                </span>
                {isSelected && (
                  <span className="kys-dd-check" aria-hidden="true"><Check strokeWidth={3.2} /></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepDropdown;
