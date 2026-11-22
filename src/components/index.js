import React from "react";

const paths = {
    home: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }),
        React.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }),
        React.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" }),
        React.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1.5" })),
    tasks: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "4", y: "4", width: "16", height: "16", rx: "3" }),
        React.createElement("path", { d: "m8 12 2.5 2.5L16 9" })),
    calendar: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
        React.createElement("path", { d: "M7 3v4M17 3v4M3 10h18" })),
    schedule: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M12 7v6l4 2" })),
    books: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 4h6v16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM13 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6V4ZM8 7v8M16 7v8" })),
    settings: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
        React.createElement("path", { d: "M19.4 15a1.6 1.6 0 0 0 .32 1.76l.07.07-2.16 2.16-.08-.08a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.99 1.47V21h-3.05v-.94A1.6 1.6 0 0 0 10.76 18.6a1.6 1.6 0 0 0-1.76.32l-.07.07-2.16-2.16.08-.08A1.6 1.6 0 0 0 7.16 15a1.6 1.6 0 0 0-1.46-.99H4.8v-3.05h.9a1.6 1.6 0 0 0 1.46-.99 1.6 1.6 0 0 0-.31-1.76l-.08-.07L8.93 6l.07.08a1.6 1.6 0 0 0 1.76.31 1.6 1.6 0 0 0 .99-1.46V4h3.05v.93a1.6 1.6 0 0 0 .99 1.46 1.6 1.6 0 0 0 1.76-.31l.08-.08 2.16 2.15-.07.08a1.6 1.6 0 0 0-.32 1.76 1.6 1.6 0 0 0 1.46.99h.94v3.05h-.94a1.6 1.6 0 0 0-1.46.98Z" })),
    plus: React.createElement("path", { d: "M12 5v14M5 12h14" }),
    arrow: React.createElement("path", { d: "M5 12h14m-6-6 6 6-6 6" }),
    chevron: React.createElement("path", { d: "m9 18 6-6-6-6" }),
    left: React.createElement("path", { d: "m15 18-6-6 6-6" }),
    search: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "11", cy: "11", r: "7" }),
        React.createElement("path", { d: "m16 16 5 5" })),
    bell: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10Z" }),
        React.createElement("path", { d: "M10 21h4" })),
    check: React.createElement("path", { d: "m5 12 4 4L19 6" }),
    x: React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }),
    trash: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" })),
    pencil: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m4 20 4.2-1 11-11a2 2 0 1 0-3-3l-11 11L4 20Z" }),
        React.createElement("path", { d: "m14 7 3 3" })),
    sparkles: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m12 2 2.1 6.1L20 10l-5.9 1.9L12 18l-2.1-6.1L4 10l5.9-1.9L12 2ZM19 18l.8 2.2L22 21l-2.2.8L19 24l-.8-2.2L16 21l2.2-.8L19 18Z" })),
    warning: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m12 3 10 18H2L12 3Z" }),
        React.createElement("path", { d: "M12 10v4m0 3h.01" })),
    book: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M3 6a2 2 0 0 1 2-2h15v16H5a2 2 0 0 1-2-2V6Z" }),
        React.createElement("path", { d: "M3 17a2 2 0 0 1 2-2h15M7 8h9" })),
    flag: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 21V4m0 1c5-4 9 4 14 0v11c-5 4-9-4-14 0" })),
    target: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "5" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "1" })),
    info: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M12 11v6M12 7h.01" })),
    menu: React.createElement("path", { d: "M4 7h16M4 12h16M4 17h16" }),
    clock: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("path", { d: "M12 7v5l3 2" })),
    layers: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" }))
};
function Icon({ name = 'home', size = 20, className = '', ...props }) {
    return React.createElement("svg", { "aria-hidden": "true", className: className, width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", ...props }, paths[name] || paths.home);
}
function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick, type = 'button', icon, wide = false, className = '', ...props }) {
    return React.createElement("button", { className: `ui-button ${variant} ${size} ${wide ? 'wide' : ''} ${className}`, type: type, disabled: disabled, onClick: onClick, ...props },
        icon ? React.createElement(Icon, { name: icon, size: size === 'sm' ? 16 : 18 }) : null,
        React.createElement("span", null, children));
}
function Input({ label, hint, error, required = false, className = '', ...props }) {
    const generatedId = React.useId();
    const fieldId = props.id || generatedId;
    const descriptionId = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;
    return React.createElement("label", { className: `ui-field ${className}` },
        React.createElement("span", { className: "field-label" },
            label,
            required && React.createElement("span", { className: "required", "aria-hidden": "true" }, " *")),
        React.createElement("input", { ...props, id: fieldId, className: `ui-input ${error ? 'invalid' : ''}`,
            "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, required }),
        error && React.createElement("small", { id: `${fieldId}-error`, className: "field-error", role: "alert" }, error),
        !error && hint && React.createElement("small", { id: `${fieldId}-hint`, className: "field-hint" }, hint));
}
function Select({ label, children, required = false, ...props }) {
    const generatedId = React.useId();
    return React.createElement("label", { className: "ui-field" },
        React.createElement("span", { className: "field-label" }, label, required ? ' *' : ''),
        React.createElement("select", { ...props, id: props.id || generatedId, className: "ui-input", required }, children));
}
function Badge({ children, tone = 'neutral', dot = false }) { return React.createElement("span", { className: `ui-badge ${tone}` },
    dot && React.createElement("span", { className: "badge-dot" }),
    children); }
function Card({ children, className = '', ...props }) { return React.createElement("section", { className: `surface-card ${className}`, ...props }, children); }
function NavItem({ icon, label, active = false, count, onClick }) { return React.createElement("button", { type: "button", className: `nav-item ${active ? 'active' : ''}`, "aria-current": active ? "page" : undefined, onClick: onClick },
    React.createElement(Icon, { name: icon, size: 19 }),
    React.createElement("span", null, label),
    count !== undefined && React.createElement("span", { className: "nav-count" }, count)); }
function StatCard({ icon, label, value, accent = 'blue', subtitle }) { return React.createElement(Card, { className: `stat-card accent-${accent}` },
    React.createElement("div", { className: "stat-icon" },
        React.createElement(Icon, { name: icon, size: 23 })),
    React.createElement("div", { className: "stat-value" }, value),
    React.createElement("div", { className: "stat-label" }, label),
    subtitle && React.createElement("small", null, subtitle)); }
function TaskCard({ task, subject, onToggle, onOpen, compact = false }) {
    const isDone = task.status === 'done';
    const date = new Date(task.dueAt);
    const dateText = isNaN(date) ? 'Без дати' : date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
    const priority = task.priority === 'high' ? 'Високий' : task.priority === 'low' ? 'Низький' : 'Середній';
    return React.createElement("div", { className: `task-item ${isDone ? 'done' : ''} ${compact ? 'compact' : ''}` },
        React.createElement("button", { type: "button", className: `task-check ${isDone ? 'checked' : ''}`, "aria-label": isDone ? 'Повернути у роботу' : 'Завершити завдання', onClick: () => onToggle && onToggle(task.id) }, isDone && React.createElement(Icon, { name: "check", size: 14 })),
        React.createElement("button", { type: "button", className: "task-body", onClick: () => onOpen && onOpen(task.id) },
            React.createElement("span", { className: "task-title" }, task.title),
            React.createElement("span", { className: "task-meta" },
                React.createElement("span", { className: "subject-dot", style: { background: (subject === null || subject === void 0 ? void 0 : subject.color) || '#8693ac' } }),
                (subject === null || subject === void 0 ? void 0 : subject.name) || 'Без предмета',
                React.createElement("span", { className: "meta-sep" }, "\u2022"),
                React.createElement(Icon, { name: "calendar", size: 14 }),
                dateText)),
        React.createElement("div", { className: "task-right" },
            React.createElement(Badge, { tone: isDone ? 'success' : task.priority === 'high' ? 'danger' : task.priority === 'low' ? 'neutral' : 'warning' }, isDone ? 'Виконано' : priority),
            !compact && React.createElement("button", { className: "icon-btn", onClick: () => onOpen && onOpen(task.id), "aria-label": "\u0414\u0435\u0442\u0430\u043B\u0456 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F" },
                React.createElement(Icon, { name: "chevron", size: 18 }))));
}
function EmptyState({ icon = 'tasks', title, description, action }) { return React.createElement("div", { className: "empty" },
    React.createElement("div", { className: "empty-icon" },
        React.createElement(Icon, { name: icon, size: 28 })),
    React.createElement("h3", null, title),
    React.createElement("p", null, description),
    action); }

function Modal({ title, children, onClose, wide = false }) {
    const dialogRef = React.useRef(null);
    const onCloseRef = React.useRef(onClose);
    onCloseRef.current = onClose;
    const titleId = React.useId();
    React.useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return undefined;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const selector = 'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusable = () => Array.from(dialog.querySelectorAll(selector)).filter(el => el.getClientRects().length > 0);
        const initial = dialog.querySelector('input:not([type="hidden"]), select, textarea') || focusable()[0] || dialog;
        initial.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onCloseRef.current(); return; }
            if (event.key !== 'Tab') return;
            const items = focusable();
            if (!items.length) { event.preventDefault(); dialog.focus(); return; }
            const first = items[0], last = items[items.length - 1];
            if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
                event.preventDefault(); first.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
            document.body.style.overflow = previousOverflow;
            if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === 'function') previousFocus.focus();
        };
    }, []);
    return React.createElement("div", { className: "modal-backdrop", onMouseDown: e => {
        if (e.target === e.currentTarget) onClose();
    } },
        React.createElement("div", { ref: dialogRef, className: `modal ${wide ? 'modal-wide' : ''}`, role: "dialog",
            tabIndex: -1, "aria-modal": "true", "aria-labelledby": titleId },
            React.createElement("header", { className: "modal-header" },
                React.createElement("div", null,
                    React.createElement("span", { className: "eyebrow" }, "UNIPLAN"),
                    React.createElement("h2", { id: titleId }, title)),
                React.createElement("button", { type: "button", className: "icon-btn", onClick: onClose,
                    "aria-label": "Закрити діалогове вікно" }, React.createElement(Icon, { name: "x" }))),
            React.createElement("div", { className: "modal-content" }, children)));
}

export { Icon, Button, Input, Select, Badge, Card, NavItem, StatCard, TaskCard, EmptyState, Modal };
