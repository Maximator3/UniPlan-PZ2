import React from "react";
import { Icon, Button, Input, Select, Badge, Card, NavItem, StatCard, TaskCard, EmptyState, Modal } from "./components";

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const MONTHS = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
const PALETTE = ['#6478ef', '#18a999', '#f5a35d', '#b17ee0', '#f07e99', '#57aee7'];
const uid = () => Math.random().toString(36).slice(2, 10);
const todayAt = (add = 0, hour = 23, minute = 0) => { const d = new Date(); d.setHours(hour, minute, 0, 0); d.setDate(d.getDate() + add); return localDate(d) + 'T' + String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0'); };
function localDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function parseLocal(s) { return new Date((s === null || s === void 0 ? void 0 : s.length) === 10 ? s + 'T12:00:00' : s); }
const timeUntil = (s) => Math.round((parseLocal(s) - new Date()) / 86400000);
const dateLabel = (s, style = 'short') => parseLocal(s).toLocaleDateString('uk-UA', style === 'long' ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'short' });
function monday(date) { const d = new Date(date); d.setDate(d.getDate() - (d.getDay() + 6) % 7); d.setHours(12, 0, 0, 0); return d; }
function seed() {
    const subjects = [{ id: 's1', name: 'Веброзробка', color: PALETTE[0] }, { id: 's2', name: 'Бази даних', color: PALETTE[1] }, { id: 's3', name: 'UX-дизайн', color: PALETTE[2] }, { id: 's4', name: 'Англійська мова', color: PALETTE[3] }];
    const tasks = [
        { id: 't1', title: 'Підготувати інтерактивний прототип', subjectId: 's3', type: 'Проєкт', dueAt: todayAt(1, 20), priority: 'high', note: '5 ключових екранів, компоненти UI-kit', status: 'todo', reminderDays: 1, subtasks: [{ id: 'st1', title: 'Створити sitemap', done: true }, { id: 'st2', title: 'Спроєктувати екрани', done: false }, { id: 'st3', title: 'Перевірити навігацію', done: false }] },
        { id: 't2', title: 'Здати практичну з баз даних', subjectId: 's2', type: 'ДЗ', dueAt: todayAt(2, 18), priority: 'high', note: 'SQL-запити та скріншоти результату', status: 'todo', reminderDays: 3, subtasks: [] },
        { id: 't3', title: 'Повторити теми до модулю', subjectId: 's1', type: 'Іспит', dueAt: todayAt(4, 16), priority: 'medium', note: 'Компоненти React, маршрути та стан', status: 'todo', reminderDays: 3, subtasks: [] },
        { id: 't4', title: 'Скласти словник нових термінів', subjectId: 's4', type: 'ДЗ', dueAt: todayAt(6, 21), priority: 'low', note: '20 слів за темою Education', status: 'todo', reminderDays: 1, subtasks: [] },
        { id: 't5', title: 'Опрацювати wireframes', subjectId: 's3', type: 'ДЗ', dueAt: todayAt(-1, 17), priority: 'medium', note: 'Три альтернативні макети', status: 'done', reminderDays: 0, subtasks: [] }
    ];
    return { semester: { title: 'Осінній семестр 2026', start: localDate(new Date(new Date().getFullYear(), 8, 1)), end: localDate(new Date(new Date().getFullYear() + 1, 0, 31)) }, subjects, tasks, classes: [{ id: 'c1', subjectId: 's1', day: 1, start: '09:00', end: '10:20', type: 'Лекція', room: 'Ауд. 214' }, { id: 'c2', subjectId: 's2', day: 2, start: '11:00', end: '12:20', type: 'Практична', room: 'Ауд. 103' }, { id: 'c3', subjectId: 's3', day: 3, start: '09:00', end: '10:20', type: 'Практична', room: 'Онлайн' }, { id: 'c4', subjectId: 's4', day: 4, start: '13:00', end: '14:20', type: 'Семінар', room: 'Ауд. 306' }] };
}
const STORAGE_KEY = 'uniplan_v2_data';
function loadData() { try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        const d = JSON.parse(raw);
        if ((d === null || d === void 0 ? void 0 : d.subjects) && (d === null || d === void 0 ? void 0 : d.tasks) && (d === null || d === void 0 ? void 0 : d.classes))
            return d;
    }
}
catch (e) { } return seed(); }
class TaskForm extends React.Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.submit = e => { e.preventDefault(); if (!this.state.title.trim()) {
            this.setState({ error: 'Введіть назву завдання' });
            return;
        } if (!this.state.subjectId) {
            this.setState({ error: 'Спочатку додайте предмет' });
            return;
        } const { error, ...form } = this.state; this.props.onSave({ ...form, title: form.title.trim() }); };
        const t = props.task;
        this.state = { title: (t === null || t === void 0 ? void 0 : t.title) || '', subjectId: (t === null || t === void 0 ? void 0 : t.subjectId) || ((_a = props.subjects[0]) === null || _a === void 0 ? void 0 : _a.id) || '', type: (t === null || t === void 0 ? void 0 : t.type) || 'ДЗ', dueAt: (t === null || t === void 0 ? void 0 : t.dueAt) || todayAt(1, 20), priority: (t === null || t === void 0 ? void 0 : t.priority) || 'medium', note: (t === null || t === void 0 ? void 0 : t.note) || '', reminderDays: (_b = t === null || t === void 0 ? void 0 : t.reminderDays) !== null && _b !== void 0 ? _b : 1, error: '' };
    }
    render() { const { subjects, onCancel, task } = this.props; const s = this.state; return React.createElement("form", { onSubmit: this.submit, className: "form-stack" },
        React.createElement(Input, { label: "\u041D\u0430\u0437\u0432\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F", placeholder: "\u041D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u043F\u0456\u0434\u0433\u043E\u0442\u0443\u0432\u0430\u0442\u0438 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0456\u044E", required: true, value: s.title, error: s.error || undefined, onChange: e => this.setState({ title: e.target.value, error: '' }), maxLength: 120 }),
        React.createElement("div", { className: "form-grid" },
            React.createElement(Select, { label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442", value: s.subjectId, onChange: e => this.setState({ subjectId: e.target.value }) }, subjects.map(x => React.createElement("option", { key: x.id, value: x.id }, x.name))),
            React.createElement(Select, { label: "\u0422\u0438\u043F \u0440\u043E\u0431\u043E\u0442\u0438", value: s.type, onChange: e => this.setState({ type: e.target.value }) }, ['ДЗ', 'Проєкт', 'Іспит', 'Інше'].map(x => React.createElement("option", { key: x }, x)))),
        React.createElement(Input, { label: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D", type: "datetime-local", required: true, value: s.dueAt, onChange: e => this.setState({ dueAt: e.target.value }) }),
        React.createElement("div", { className: "form-grid" },
            React.createElement(Select, { label: "\u041F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442", value: s.priority, onChange: e => this.setState({ priority: e.target.value }) },
                React.createElement("option", { value: "low" }, "\u041D\u0438\u0437\u044C\u043A\u0438\u0439"),
                React.createElement("option", { value: "medium" }, "\u0421\u0435\u0440\u0435\u0434\u043D\u0456\u0439"),
                React.createElement("option", { value: "high" }, "\u0412\u0438\u0441\u043E\u043A\u0438\u0439")),
            React.createElement(Select, { label: "\u041D\u0430\u0433\u0430\u0434\u0430\u0442\u0438", value: s.reminderDays, onChange: e => this.setState({ reminderDays: Number(e.target.value) }) },
                React.createElement("option", { value: 0 }, "\u0411\u0435\u0437 \u043D\u0430\u0433\u0430\u0434\u0443\u0432\u0430\u043D\u043D\u044F"),
                React.createElement("option", { value: 1 }, "\u0417\u0430 1 \u0434\u0435\u043D\u044C"),
                React.createElement("option", { value: 3 }, "\u0417\u0430 3 \u0434\u043D\u0456"))),
        React.createElement("label", { className: "ui-field" },
            React.createElement("span", { className: "field-label" }, "\u041F\u0440\u0438\u043C\u0456\u0442\u043A\u0430 (\u043D\u0435\u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E)"),
            React.createElement("textarea", { className: "ui-input ui-textarea", rows: "3", placeholder: "\u0429\u043E \u0432\u0430\u0436\u043B\u0438\u0432\u043E \u043D\u0435 \u0437\u0430\u0431\u0443\u0442\u0438...", value: s.note, onChange: e => this.setState({ note: e.target.value }) })),
        React.createElement("div", { className: "modal-actions" },
            React.createElement(Button, { variant: "secondary", onClick: onCancel }, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"),
            React.createElement(Button, { type: "submit", icon: "check" }, task ? 'Зберегти зміни' : 'Додати завдання'))); }
}
class SubjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = e => { e.preventDefault(); const name = this.state.name.trim(); if (!name) {
            this.setState({ error: 'Введіть назву предмета' });
            return;
        } if (this.props.subjects.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            this.setState({ error: 'Такий предмет уже існує' });
            return;
        } this.props.onSave({ name, color: this.state.color }); };
        this.state = { name: '', color: PALETTE[0], error: '' };
    }
    render() { return React.createElement("form", { className: "form-stack", onSubmit: this.submit },
        React.createElement(Input, { label: "\u041D\u0430\u0437\u0432\u0430 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430", value: this.state.name, error: this.state.error || undefined, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437", maxLength: 60, onChange: e => this.setState({ name: e.target.value, error: '' }), required: true }),
        React.createElement("label", { className: "ui-field" },
            React.createElement("span", { className: "field-label" }, "\u041A\u043E\u043B\u0456\u0440 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430"),
            React.createElement("span", { className: "swatches" }, PALETTE.map(c => React.createElement("button", { key: c, className: `swatch ${this.state.color === c ? 'selected' : ''}`, style: { background: c }, type: "button", onClick: () => this.setState({ color: c }), "aria-label": `Колір ${c}` }, this.state.color === c && React.createElement(Icon, { name: "check", size: 15 }))))),
        React.createElement("div", { className: "modal-actions" },
            React.createElement(Button, { variant: "secondary", onClick: this.props.onCancel }, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"),
            React.createElement(Button, { type: "submit", icon: "plus" }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442"))); }
}
class ClassForm extends React.Component {
    constructor(props) {
        var _a;
        super(props);
        this.submit = e => { e.preventDefault(); if (this.state.end <= this.state.start) {
            this.setState({ error: 'Час завершення має бути пізніше початку' });
            return;
        } const { error, ...data } = this.state; this.props.onSave(data); };
        this.state = { subjectId: ((_a = props.subjects[0]) === null || _a === void 0 ? void 0 : _a.id) || '', day: 1, start: '09:00', end: '10:20', type: 'Лекція', room: '', error: '' };
    }
    render() { const s = this.state; return React.createElement("form", { className: "form-stack", onSubmit: this.submit },
        React.createElement(Select, { label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442", value: s.subjectId, onChange: e => this.setState({ subjectId: e.target.value }) }, this.props.subjects.map(x => React.createElement("option", { value: x.id, key: x.id }, x.name))),
        React.createElement("div", { className: "form-grid" },
            React.createElement(Select, { label: "\u0414\u0435\u043D\u044C \u0442\u0438\u0436\u043D\u044F", value: s.day, onChange: e => this.setState({ day: Number(e.target.value) }) }, DAY_NAMES.map((x, i) => React.createElement("option", { key: x, value: i + 1 }, x))),
            React.createElement(Select, { label: "\u0422\u0438\u043F \u0437\u0430\u043D\u044F\u0442\u0442\u044F", value: s.type, onChange: e => this.setState({ type: e.target.value }) },
                React.createElement("option", null, "\u041B\u0435\u043A\u0446\u0456\u044F"),
                React.createElement("option", null, "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u043D\u0430"),
                React.createElement("option", null, "\u0421\u0435\u043C\u0456\u043D\u0430\u0440"),
                React.createElement("option", null, "\u041B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u0430"))),
        React.createElement("div", { className: "form-grid" },
            React.createElement(Input, { type: "time", label: "\u041F\u043E\u0447\u0430\u0442\u043E\u043A", required: true, value: s.start, onChange: e => this.setState({ start: e.target.value, error: '' }) }),
            React.createElement(Input, { type: "time", label: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F", required: true, value: s.end, onChange: e => this.setState({ end: e.target.value, error: '' }) })),
        React.createElement(Input, { label: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0456\u044F / \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F", value: s.room, placeholder: "\u041D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0410\u0443\u0434. 210 \u0430\u0431\u043E \u043E\u043D\u043B\u0430\u0439\u043D", onChange: e => this.setState({ room: e.target.value }) }),
        s.error && React.createElement("p", { className: "field-error", role: "alert" }, s.error),
        React.createElement("div", { className: "modal-actions" },
            React.createElement(Button, { variant: "secondary", onClick: this.props.onCancel }, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"),
            React.createElement(Button, { icon: "plus", type: "submit" }, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u0430\u043D\u044F\u0442\u0442\u044F"))); }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.openNewTask = () => { if (!this.state.data.subjects.length) {
            this.setState({ dialog: 'subject' });
            this.notify('Спочатку додайте навчальний предмет');
            return;
        } this.setState({ dialog: 'task', editId: null }); };
        this.saveTask = (form) => { const editId = this.state.editId; this.updateData(data => { if (editId) {
            const t = data.tasks.find(t => t.id === editId);
            if (t)
                Object.assign(t, form);
        }
        else {
            data.tasks.unshift({ ...form, id: uid(), status: 'todo', subtasks: [] });
        } }); this.setState({ dialog: null, editId: null, page: 'tasks' }); this.notify(editId ? 'Зміни збережено' : 'Завдання успішно додано'); };
        this.saveSubject = (subject) => { this.updateData(data => data.subjects.push({ ...subject, id: uid() })); this.setState({ dialog: null, page: 'subjects' }); this.notify('Предмет додано'); };
        this.saveClass = (item) => { this.updateData(data => data.classes.push({ ...item, id: uid() })); this.setState({ dialog: null, page: 'schedule' }); this.notify('Заняття додано до розкладу'); };
        this.toggleTask = (id) => { this.updateData(data => { const t = data.tasks.find(t => t.id === id); if (t)
            t.status = t.status === 'done' ? 'todo' : 'done'; }); };
        this.toggleSubtask = (taskId, id) => { this.updateData(data => { const t = data.tasks.find(t => t.id === taskId); if (!t)
            return; const st = t.subtasks.find(x => x.id === id); if (st)
            st.done = !st.done; if (t.subtasks.length)
            t.status = t.subtasks.every(x => x.done) ? 'done' : 'todo'; }); };
        this.addSubtask = (taskId, title) => { if (!title.trim())
            return; this.updateData(data => { const t = data.tasks.find(t => t.id === taskId); if (t) {
            t.subtasks.push({ id: uid(), title: title.trim(), done: false });
            t.status = 'todo';
        } }); };
        this.deleteTask = (id) => { if (!window.confirm('Видалити це завдання?'))
            return; this.updateData(data => { data.tasks = data.tasks.filter(t => t.id !== id); }); this.setState({ detailId: null }); this.notify('Завдання видалено'); };
        this.deleteSubject = (id) => { if (!window.confirm('Видалити предмет, усі його завдання та заняття?'))
            return; this.updateData(d => { d.subjects = d.subjects.filter(x => x.id !== id); d.tasks = d.tasks.filter(x => x.subjectId !== id); d.classes = d.classes.filter(x => x.subjectId !== id); }); this.notify('Предмет і пов’язані дані видалено'); };
        this.deleteClass = (id) => { this.updateData(d => { d.classes = d.classes.filter(c => c.id !== id); }); this.notify('Заняття видалено'); };
        this.getSubject = (id) => this.state.data.subjects.find(s => s.id === id);
        const data = loadData();
        this.state = { data, page: 'dashboard', dialog: null, detailId: null, editId: null, toast: '', query: '', subjectFilter: 'all', statusFilter: 'all', calendarMode: 'month', calendarDate: localDate(new Date()), selectedDate: localDate(new Date()), mobileMenu: false, semesterDraft: data.semester.title };
    }
    componentDidMount() {
        this._mobileKeyHandler = e => {
            if (e.key === 'Escape' && this.state.mobileMenu && !this.state.dialog && !this.state.detailId) {
                this.setState({ mobileMenu: false }, () => document.querySelector('.mobile-menu')?.focus());
            }
        };
        document.addEventListener('keydown', this._mobileKeyHandler);
    }
    componentWillUnmount() { clearTimeout(this._timer); document.removeEventListener('keydown', this._mobileKeyHandler); }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page && !this.state.dialog && !this.state.detailId) {
            const heading = document.querySelector('#content h1');
            if (heading) heading.focus({ preventScroll: true });
        }
    }
    persist(data) { try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    catch (e) {
        this.notify('Не вдалося зберегти дані у браузері');
    } }
    updateData(mutator) { const data = JSON.parse(JSON.stringify(this.state.data)); mutator(data); this.setState({ data }, () => this.persist(data)); }
    notify(text) { this.setState({ toast: text }); clearTimeout(this._timer); this._timer = setTimeout(() => this.setState({ toast: '' }), 3900); }
    navigate(page) { this.setState({ page, dialog: null, detailId: null, mobileMenu: false }); window.scrollTo(0, 0); }
    get filteredTasks() { return this.state.data.tasks.filter(t => { var _a; return (this.state.subjectFilter === 'all' || t.subjectId === this.state.subjectFilter) && (this.state.statusFilter === 'all' || (this.state.statusFilter === 'done' ? t.status === 'done' : t.status !== 'done')) && (!this.state.query || t.title.toLowerCase().includes(this.state.query.toLowerCase()) || (((_a = this.getSubject(t.subjectId)) === null || _a === void 0 ? void 0 : _a.name) || '').toLowerCase().includes(this.state.query.toLowerCase())); }).sort((a, b) => a.dueAt.localeCompare(b.dueAt)); }
    pageHeading(title, subtitle, action) { return React.createElement("header", { className: "content-heading" },
        React.createElement("div", null,
            React.createElement("span", { className: "eyebrow" },
                "\u041D\u0410\u0412\u0427\u0410\u041B\u042C\u041D\u0418\u0419 \u041F\u0420\u041E\u0421\u0422\u0406\u0420 / ",
                title.toUpperCase()),
            React.createElement("h1", { tabIndex: -1 }, title),
            React.createElement("p", null, subtitle)),
        action); }
    renderSidebar() { const nav = [['dashboard', 'home', 'Огляд'], ['tasks', 'tasks', 'Завдання'], ['calendar', 'calendar', 'Календар'], ['schedule', 'schedule', 'Розклад'], ['subjects', 'books', 'Предмети']]; const total = this.state.data.tasks.filter(t => t.status !== 'done').length; return React.createElement("aside", { id: "uniplan-sidebar", className: `sidebar ${this.state.mobileMenu ? 'open' : ''}` },
        React.createElement("button", { type: "button", className: "brand", onClick: () => this.navigate('dashboard'), "aria-label": "UniPlan — перейти на головну" },
            React.createElement("div", { className: "brand-logo" },
                React.createElement(Icon, { name: "layers", size: 24 })),
            React.createElement("div", null,
                React.createElement("strong", null,
                    "UniPlan",
                    React.createElement("span", { className: "brand-dot" }, ".")),
                React.createElement("small", null, "study workspace"))),
        React.createElement("div", { className: "sidebar-label" }, "\u0420\u041E\u0411\u041E\u0427\u0418\u0419 \u041F\u0420\u041E\u0421\u0422\u0406\u0420"),
        React.createElement("nav", { className: "nav-main", "aria-label": "\u0413\u043E\u043B\u043E\u0432\u043D\u0430 \u043D\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u044F" }, nav.map(([key, icon, label]) => React.createElement(NavItem, { key: key, icon: icon, label: label, active: this.state.page === key, count: key === 'tasks' ? total : undefined, onClick: () => this.navigate(key) }))),
        React.createElement("div", { className: "sidebar-bottom" },
            React.createElement("div", { className: "sidebar-tip" },
                React.createElement("div", { className: "tip-icon" },
                    React.createElement(Icon, { name: "sparkles", size: 18 })),
                React.createElement("strong", null, "\u041F\u043B\u0430\u043D\u0443\u0439 \u0431\u0435\u0437 \u0441\u0442\u0440\u0435\u0441\u0443"),
                React.createElement("p", null, "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0456 \u043A\u0440\u043E\u043A\u0438 \u0449\u043E\u0434\u043D\u044F \u043F\u0440\u0438\u0432\u043E\u0434\u044F\u0442\u044C \u0434\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432.")),
            React.createElement(NavItem, { icon: "settings", label: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F", active: this.state.page === 'settings', onClick: () => this.navigate('settings') }),
            React.createElement("div", { className: "sidebar-avatar" },
                React.createElement("span", null, "U"),
                React.createElement("div", null,
                    React.createElement("strong", null, "\u041C\u0456\u0439 \u043F\u0440\u043E\u0441\u0442\u0456\u0440"),
                    React.createElement("small", null, "\u0414\u0430\u043D\u0456 \u0443 \u0446\u044C\u043E\u043C\u0443 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0456"))))); }
    renderTop() { const up = this.state.data.tasks.filter(t => t.status !== 'done' && timeUntil(t.dueAt) <= 2 && timeUntil(t.dueAt) >= -2).length; return React.createElement("header", { className: "topbar" },
        React.createElement("button", { type: "button", className: "mobile-menu icon-btn", "aria-controls": "uniplan-sidebar", "aria-expanded": this.state.mobileMenu, "aria-label": this.state.mobileMenu ? "Закрити меню" : "Відкрити меню", onClick: () => this.setState({ mobileMenu: !this.state.mobileMenu }, () => { if (this.state.mobileMenu) document.querySelector('#uniplan-sidebar .nav-item')?.focus(); }) },
            React.createElement(Icon, { name: "menu" })),
        React.createElement("div", { className: "top-crumb" },
            "UniPlan ",
            React.createElement(Icon, { name: "chevron", size: 14 }),
            " ",
            React.createElement("b", null, { dashboard: 'Огляд', tasks: 'Завдання', calendar: 'Календар', schedule: 'Розклад', subjects: 'Предмети', settings: 'Налаштування' }[this.state.page])),
        React.createElement("div", { className: "top-actions" },
            React.createElement("span", { className: "today-chip" },
                React.createElement(Icon, { name: "calendar", size: 15 }),
                dateLabel(todayAt(0), 'long')),
            React.createElement("button", { className: "notif-button", onClick: () => this.navigate('dashboard'), "aria-label": "\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043D\u0430\u0433\u0430\u0434\u0443\u0432\u0430\u043D\u043D\u044F" },
                React.createElement(Icon, { name: "bell", size: 19 }),
                up > 0 && React.createElement("i", null)),
            React.createElement("div", { className: "user-circle" }, "U"))); }
    renderDashboard() { const all = this.state.data.tasks; const open = all.filter(t => t.status !== 'done'); const now = new Date(); const soon = open.filter(t => { const delta = parseLocal(t.dueAt) - now; return delta >= 0 && delta < 7 * 86400000; }); const overdue = open.filter(t => parseLocal(t.dueAt) < now); const done = all.filter(t => t.status === 'done'); const upcoming = open.slice().sort((a, b) => a.dueAt.localeCompare(b.dueAt)).slice(0, 5); const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i); return { day: DAY_NAMES[(d.getDay() + 6) % 7], date: localDate(d), count: all.filter(t => t.dueAt.slice(0, 10) === localDate(d)).length }; }); const max = Math.max(1, ...week.map(x => x.count)); return React.createElement(React.Fragment, null,
        React.createElement("section", { className: "welcome" },
            React.createElement("div", { className: "welcome-content" },
                React.createElement("span", { className: "welcome-kicker" },
                    React.createElement(Icon, { name: "sparkles", size: 16 }),
                    " \u0422\u0412\u0406\u0419 \u041D\u0410\u0412\u0427\u0410\u041B\u042C\u041D\u0418\u0419 \u041F\u041E\u041C\u0406\u0427\u041D\u0418\u041A"),
                React.createElement("h1", null,
                    "\u0412\u0456\u0442\u0430\u0454\u043C\u043E \u0432 UniPlan ",
                    React.createElement("span", null, "\u270C\uFE0F")),
                React.createElement("p", null, "\u041F\u043B\u0430\u043D\u0443\u0439 \u0434\u0435\u043D\u044C, \u0432\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u0439 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \u0442\u0430 \u0437\u0430\u043B\u0438\u0448\u0430\u0439 \u0447\u0430\u0441 \u043D\u0430 \u0432\u0430\u0436\u043B\u0438\u0432\u0435."),
                React.createElement(Button, { icon: "plus", onClick: this.openNewTask }, "\u041D\u043E\u0432\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F")),
            React.createElement("div", { className: "welcome-visual", "aria-hidden": "true" },
                React.createElement("div", { className: "orbit orbit-one" }),
                React.createElement("div", { className: "orbit orbit-two" }),
                React.createElement("div", { className: "visual-sheet" },
                    React.createElement("div", { className: "sheet-dots" }, "\u25CF \u25CF \u25CF"),
                    React.createElement("div", { className: "sheet-line wide" }),
                    React.createElement("div", { className: "sheet-line" }),
                    React.createElement("div", { className: "sheet-check" },
                        React.createElement(Icon, { name: "check", size: 18 }))),
                React.createElement("div", { className: "floating-star" }, "\u2726"))),
        React.createElement("div", { className: "section-top" },
            React.createElement("div", null,
                React.createElement("h2", null, "\u0422\u0432\u0456\u0439 \u043D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u0438\u0442\u043C"),
                React.createElement("p", null, "\u0423\u0441\u0435 \u0432\u0430\u0436\u043B\u0438\u0432\u0435 \u2014 \u043E\u0434\u043D\u0438\u043C \u043F\u043E\u0433\u043B\u044F\u0434\u043E\u043C"))),
        React.createElement("div", { className: "stats-grid" },
            React.createElement(StatCard, { icon: "tasks", label: "\u0410\u043A\u0442\u0438\u0432\u043D\u0438\u0445 \u0437\u0430\u0432\u0434\u0430\u043D\u044C", value: open.length, accent: "blue", subtitle: "\u041E\u0447\u0456\u043A\u0443\u044E\u0442\u044C \u043D\u0430 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F" }),
            React.createElement(StatCard, { icon: "calendar", label: "\u041D\u0430 \u043D\u0430\u0439\u0431\u043B\u0438\u0436\u0447\u0456 7 \u0434\u043D\u0456\u0432", value: soon.length, accent: "violet", subtitle: "\u041F\u043B\u0430\u043D\u0438 \u043D\u0430 \u0442\u0438\u0436\u0434\u0435\u043D\u044C" }),
            React.createElement(StatCard, { icon: "warning", label: "\u041F\u0440\u043E\u0441\u0442\u0440\u043E\u0447\u0435\u043D\u0438\u0445", value: overdue.length, accent: "orange", subtitle: "\u041F\u043E\u0442\u0440\u0435\u0431\u0443\u044E\u0442\u044C \u0443\u0432\u0430\u0433\u0438" }),
            React.createElement(StatCard, { icon: "target", label: "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E", value: done.length, accent: "green", subtitle: "\u041C\u043E\u043B\u043E\u0434\u0435\u0446\u044C, \u0442\u0430\u043A \u0442\u0440\u0438\u043C\u0430\u0442\u0438!" })),
        React.createElement("div", { className: "dashboard-grid" },
            React.createElement(Card, { className: "panel" },
                React.createElement("div", { className: "panel-head" },
                    React.createElement("div", null,
                        React.createElement("h2", null, "\u041D\u0430\u0439\u0431\u043B\u0438\u0436\u0447\u0456 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0438"),
                        React.createElement("p", null, "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F, \u044F\u043A\u0456 \u0432\u0430\u0440\u0442\u043E \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u043F\u0435\u0440\u0448\u0438\u043C\u0438")),
                    React.createElement("button", { className: "text-link", onClick: () => this.navigate('tasks') },
                        "\u0423\u0441\u0456 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F ",
                        React.createElement(Icon, { name: "arrow", size: 15 }))),
                upcoming.length ? upcoming.map(task => React.createElement(TaskCard, { key: task.id, task: task, subject: this.getSubject(task.subjectId), onToggle: this.toggleTask, onOpen: id => this.setState({ detailId: id }), compact: true })) : React.createElement(EmptyState, { title: "\u0423\u0441\u0435 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043E!", description: "\u041D\u043E\u0432\u0438\u0445 \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u043F\u043E\u043A\u0438 \u043D\u0435\u043C\u0430\u0454.", action: React.createElement(Button, { icon: "plus", onClick: this.openNewTask, size: "sm" }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F") })),
            React.createElement("div", { className: "right-stack" },
                React.createElement(Card, { className: "panel" },
                    React.createElement("div", { className: "panel-head" },
                        React.createElement("div", null,
                            React.createElement("h2", null, "\u041D\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0430 \u0442\u0438\u0436\u0434\u0435\u043D\u044C"),
                            React.createElement("p", null, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \u0437\u0430 \u0434\u043D\u044F\u043C\u0438")),
                        React.createElement("div", { className: "mini-icon" },
                            React.createElement(Icon, { name: "layers", size: 18 }))),
                    React.createElement("div", { className: "chart-plot" }, week.map((x, i) => React.createElement("div", { className: "chart-col", key: x.date },
                        React.createElement("span", { className: "chart-value" }, x.count || ''),
                        React.createElement("div", { className: `chart-bar ${i === 0 ? 'first' : ''}`, style: { height: `${Math.max(13, x.count / max * 125)}px` }, title: `${x.count} завдань` }),
                        React.createElement("span", null, x.day))))),
                React.createElement(Card, { className: "notice-card" },
                    React.createElement("div", { className: "notice-icon" },
                        React.createElement(Icon, { name: "bell", size: 21 })),
                    React.createElement("div", null,
                        React.createElement("h3", null, overdue.length ? 'Є прострочені дедлайни' : soon.length ? 'Слідкуй за дедлайнами' : 'Усе під контролем'),
                        React.createElement("p", null, overdue.length ? `Прострочено: ${overdue.length}. Відкрий список і розстав пріоритети.` : soon.length ? `Протягом тижня заплановано ${soon.length} завдань.` : 'На найближчі дні термінових справ немає.'),
                        React.createElement("button", { className: "text-link", onClick: () => this.navigate('tasks') },
                            "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u044C ",
                            React.createElement(Icon, { name: "arrow", size: 15 }))))))); }
    renderTasks() { const tasks = this.filteredTasks; const all = this.state.data.tasks; return React.createElement(React.Fragment, null,
        this.pageHeading('Мої завдання', 'Організуй домашні роботи, проєкти й підготовку до іспитів.', React.createElement(Button, { onClick: this.openNewTask, icon: "plus" }, "\u041D\u043E\u0432\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F")),
        React.createElement("div", { className: "task-summary" },
            React.createElement("div", null,
                React.createElement("strong", null, all.filter(t => t.status !== 'done').length),
                React.createElement("span", null, "\u0423 \u0440\u043E\u0431\u043E\u0442\u0456")),
            React.createElement("div", null,
                React.createElement("strong", null, all.filter(t => t.status === 'done').length),
                React.createElement("span", null, "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E")),
            React.createElement("div", null,
                React.createElement("strong", null, all.filter(t => t.status !== 'done' && parseLocal(t.dueAt) < new Date()).length),
                React.createElement("span", null, "\u041F\u0440\u043E\u0441\u0442\u0440\u043E\u0447\u0435\u043D\u043E"))),
        React.createElement(Card, { className: "task-workspace" },
            React.createElement("div", { className: "task-filters" },
                React.createElement("div", { className: "search-box" },
                    React.createElement(Icon, { name: "search", size: 18 }),
                    React.createElement("input", { value: this.state.query, onChange: e => this.setState({ query: e.target.value }), placeholder: "\u0417\u043D\u0430\u0439\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0430\u0431\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442...", "aria-label": "\u041F\u043E\u0448\u0443\u043A \u0437\u0430\u0432\u0434\u0430\u043D\u044C" })),
                React.createElement("select", { "aria-label": "\u0424\u0456\u043B\u044C\u0442\u0440 \u0437\u0430 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u043C", value: this.state.subjectFilter, onChange: e => this.setState({ subjectFilter: e.target.value }) },
                    React.createElement("option", { value: "all" }, "\u0423\u0441\u0456 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0438"),
                    this.state.data.subjects.map(s => React.createElement("option", { key: s.id, value: s.id }, s.name))),
                React.createElement("select", { "aria-label": "\u0424\u0456\u043B\u044C\u0442\u0440 \u0437\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u043C", value: this.state.statusFilter, onChange: e => this.setState({ statusFilter: e.target.value }) },
                    React.createElement("option", { value: "all" }, "\u0423\u0441\u0456 \u0441\u0442\u0430\u0442\u0443\u0441\u0438"),
                    React.createElement("option", { value: "todo" }, "\u0414\u043E \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F"),
                    React.createElement("option", { value: "done" }, "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E"))),
            React.createElement("div", { className: "task-list-heading" },
                React.createElement("h2", null,
                    "\u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0432\u0434\u0430\u043D\u044C ",
                    React.createElement("span", null,
                        "(",
                        tasks.length,
                        ")")),
                React.createElement("small", null, "\u041D\u0430\u0442\u0438\u0441\u043D\u0438 \u043D\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F, \u0449\u043E\u0431 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0434\u0435\u0442\u0430\u043B\u0456")),
            tasks.length ? tasks.map(t => React.createElement(TaskCard, { task: t, subject: this.getSubject(t.subjectId), key: t.id, onToggle: this.toggleTask, onOpen: id => this.setState({ detailId: id }) })) : React.createElement(EmptyState, { icon: "search", title: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E", description: "\u0421\u043F\u0440\u043E\u0431\u0443\u0439 \u0456\u043D\u0448\u0438\u0439 \u043F\u043E\u0448\u0443\u043A \u0430\u0431\u043E \u0441\u043A\u0438\u043D\u044C \u0444\u0456\u043B\u044C\u0442\u0440\u0438.", action: React.createElement(Button, { variant: "secondary", size: "sm", onClick: () => this.setState({ query: '', subjectFilter: 'all', statusFilter: 'all' }) }, "\u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u0444\u0456\u043B\u044C\u0442\u0440\u0438") }))); }
    calendarCells() { const base = parseLocal(this.state.calendarDate); const first = new Date(base.getFullYear(), base.getMonth(), 1, 12); const offset = (first.getDay() + 6) % 7; const arr = []; for (let i = 0; i < 42; i++) {
        const d = new Date(first);
        d.setDate(1 - offset + i);
        arr.push(d);
    } return arr; }
    shiftCalendar(dir) { const d = parseLocal(this.state.calendarDate); if (this.state.calendarMode === 'week')
        d.setDate(d.getDate() + 7 * dir);
    else
        d.setMonth(d.getMonth() + dir, 1); this.setState({ calendarDate: localDate(d), selectedDate: localDate(d) }); }
    renderCalendar() { const base = parseLocal(this.state.calendarDate); const monthName = base.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' }); const all = this.state.data.tasks; const selected = this.state.selectedDate; let cells = this.calendarCells(); if (this.state.calendarMode === 'week') {
        const m = monday(parseLocal(this.state.calendarDate));
        cells = Array.from({ length: 7 }, (_, i) => { let d = new Date(m); d.setDate(d.getDate() + i); return d; });
    } const selectedTasks = all.filter(t => t.dueAt.slice(0, 10) === selected); const selectedLessons = this.state.data.classes.filter(c => c.day === ((parseLocal(selected).getDay() + 6) % 7) + 1); return React.createElement(React.Fragment, null,
        this.pageHeading('Календар', 'Усі дедлайни та пари на одному екрані.', React.createElement(Button, { icon: "plus", onClick: this.openNewTask }, "\u041D\u043E\u0432\u0435 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F")),
        React.createElement("div", { className: "calendar-layout" },
            React.createElement(Card, { className: "calendar-panel" },
                React.createElement("div", { className: "calendar-controls" },
                    React.createElement("div", null,
                        React.createElement("h2", null, monthName[0].toUpperCase() + monthName.slice(1)),
                        React.createElement("p", null, "\u041E\u0431\u0435\u0440\u0438 \u0434\u0435\u043D\u044C, \u0449\u043E\u0431 \u043F\u043E\u0431\u0430\u0447\u0438\u0442\u0438 \u0434\u0435\u0442\u0430\u043B\u0456")),
                    React.createElement("div", { className: "calendar-toolbar" },
                        React.createElement("div", { className: "view-switch" },
                            React.createElement("button", { className: this.state.calendarMode === 'month' ? 'selected' : '', "aria-pressed": this.state.calendarMode === 'month', onClick: () => this.setState({ calendarMode: 'month' }) }, "\u041C\u0456\u0441\u044F\u0446\u044C"),
                            React.createElement("button", { className: this.state.calendarMode === 'week' ? 'selected' : '', "aria-pressed": this.state.calendarMode === 'week', onClick: () => this.setState({ calendarMode: 'week' }) }, "\u0422\u0438\u0436\u0434\u0435\u043D\u044C")),
                        React.createElement("button", { className: "square-button", onClick: () => this.shiftCalendar(-1), "aria-label": "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u043F\u0435\u0440\u0456\u043E\u0434" },
                            React.createElement(Icon, { name: "left", size: 18 })),
                        React.createElement("button", { className: "square-button", onClick: () => this.shiftCalendar(1), "aria-label": "\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u043F\u0435\u0440\u0456\u043E\u0434" },
                            React.createElement(Icon, { name: "chevron", size: 18 })))),
                React.createElement("div", { className: "calendar-head" }, DAY_NAMES.map(d => React.createElement("span", { key: d }, d))),
                React.createElement("div", { className: `calendar-days ${this.state.calendarMode === 'week' ? 'weekmode' : ''}` }, cells.map((d, i) => { const key = localDate(d), items = all.filter(t => t.dueAt.slice(0, 10) === key), sessions = this.state.data.classes.filter(c => c.day === ((d.getDay() + 6) % 7) + 1), muted = d.getMonth() !== base.getMonth(), isNow = key === localDate(new Date()); return React.createElement("button", { type: "button", key: key + i, className: `calendar-day ${muted ? 'muted' : ''} ${key === selected ? 'selected' : ''}`, "aria-pressed": key === selected, "aria-label": `${dateLabel(key, 'long')}: ${items.length} завдань, ${sessions.length} занять`, onClick: () => this.setState({ selectedDate: key }) },
                    React.createElement("span", { className: `day-number ${isNow ? 'today' : ''}` }, d.getDate()),
                    React.createElement("span", { className: "day-events" },
                        items.slice(0, 2).map(t => { var _a; return React.createElement("i", { key: t.id, className: "event-chip", style: { background: ((_a = this.getSubject(t.subjectId)) === null || _a === void 0 ? void 0 : _a.color) || '#888' }, title: t.title }); }),
                        sessions.length > 0 && React.createElement("i", { className: "lesson-chip", title: `${sessions.length} заняття` })),
                    items.length > 2 && React.createElement("small", null,
                        "+",
                        items.length - 2)); })),
                React.createElement("div", { className: "calendar-legend" },
                    React.createElement("span", null,
                        React.createElement("i", { className: "legend-dot deadline" }),
                        " \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0438"),
                    React.createElement("span", null,
                        React.createElement("i", { className: "legend-dot lesson" }),
                        " \u0437\u0430\u043D\u044F\u0442\u0442\u044F"))),
            React.createElement(Card, { className: "day-panel" },
                React.createElement("span", { className: "eyebrow" }, "\u041E\u0411\u0420\u0410\u041D\u0418\u0419 \u0414\u0415\u041D\u042C"),
                React.createElement("h2", null, dateLabel(selected, 'long')),
                React.createElement("div", { className: "day-sep" },
                    React.createElement(Icon, { name: "tasks", size: 17 }),
                    " \u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F (",
                    selectedTasks.length,
                    ")"),
                selectedTasks.length ? selectedTasks.map(t => { var _a, _b; return React.createElement("button", { className: "day-task", key: t.id, onClick: () => this.setState({ detailId: t.id }) },
                    React.createElement("span", { style: { background: (_a = this.getSubject(t.subjectId)) === null || _a === void 0 ? void 0 : _a.color } }),
                    React.createElement("div", null,
                        React.createElement("strong", null, t.title),
                        React.createElement("small", null, ((_b = this.getSubject(t.subjectId)) === null || _b === void 0 ? void 0 : _b.name) || 'Без предмета')),
                    React.createElement(Icon, { name: "chevron", size: 17 })); }) : React.createElement("p", { className: "day-empty" }, "\u041D\u0430 \u0446\u044E \u0434\u0430\u0442\u0443 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0456\u0432 \u043D\u0435\u043C\u0430\u0454."),
                React.createElement("div", { className: "day-sep" },
                    React.createElement(Icon, { name: "clock", size: 17 }),
                    " \u0417\u0430\u043D\u044F\u0442\u0442\u044F (",
                    selectedLessons.length,
                    ")"),
                selectedLessons.length ? selectedLessons.map(c => { var _a; return React.createElement("div", { className: "day-class", key: c.id },
                    React.createElement("b", null, c.start),
                    React.createElement("span", null, (_a = this.getSubject(c.subjectId)) === null || _a === void 0 ? void 0 : _a.name)); }) : React.createElement("p", { className: "day-empty" }, "\u0417\u0430\u043D\u044F\u0442\u044C \u043D\u0435 \u0437\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u043E."),
                React.createElement(Button, { variant: "secondary", icon: "plus", wide: true, size: "sm", onClick: this.openNewTask }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F")))); }
    renderSchedule() { const classes = this.state.data.classes; return React.createElement(React.Fragment, null,
        this.pageHeading('Розклад занять', 'Регулярні пари, аудиторії та час початку.', React.createElement(Button, { icon: "plus", onClick: () => this.setState({ dialog: 'class' }) }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u043D\u044F\u0442\u0442\u044F")),
        React.createElement("div", { className: "schedule-intro" },
            React.createElement(Icon, { name: "info", size: 17 }),
            " \u0417\u0430\u043D\u044F\u0442\u0442\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u044E\u0442\u044C\u0441\u044F \u0449\u043E\u0442\u0438\u0436\u043D\u044F. \u041D\u0430\u043A\u043B\u0430\u0434\u0430\u043D\u043D\u044F \u0432 \u0447\u0430\u0441\u0456 \u043F\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0456 \u0437\u043D\u0430\u043A\u043E\u043C \u0443\u0432\u0430\u0433\u0438."),
        React.createElement("div", { className: "schedule-grid" }, DAY_NAMES.map((day, i) => { const entries = classes.filter(c => Number(c.day) === i + 1).sort((a, b) => a.start.localeCompare(b.start)); return React.createElement(Card, { key: day, className: "schedule-day" },
            React.createElement("div", { className: "schedule-day-title" },
                React.createElement("strong", null, day),
                React.createElement("span", null,
                    entries.length,
                    " \u043F\u0430\u0440")),
            entries.length ? entries.map(c => { const s = this.getSubject(c.subjectId); const collision = entries.some(x => x.id !== c.id && x.start < c.end && x.end > c.start); return React.createElement("div", { className: "lesson-card", key: c.id, style: { borderLeftColor: (s === null || s === void 0 ? void 0 : s.color) || PALETTE[0] } },
                React.createElement("div", { className: "lesson-time" },
                    c.start,
                    " \u2013 ",
                    c.end),
                React.createElement("strong", null, (s === null || s === void 0 ? void 0 : s.name) || 'Предмет'),
                React.createElement("small", null,
                    c.type,
                    c.room ? ' • ' + c.room : ''),
                React.createElement("div", { className: "lesson-actions" },
                    collision && React.createElement(Badge, { tone: "warning" }, "\u041F\u0435\u0440\u0435\u0442\u0438\u043D"),
                    React.createElement("button", { onClick: () => this.deleteClass(c.id), title: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043D\u044F\u0442\u0442\u044F", "aria-label": "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043D\u044F\u0442\u0442\u044F" },
                        React.createElement(Icon, { name: "trash", size: 15 })))); }) : React.createElement("span", { className: "schedule-empty" }, "\u0412\u0456\u043B\u044C\u043D\u0438\u0439 \u0434\u0435\u043D\u044C")); }))); }
    renderSubjects() { const data = this.state.data; return React.createElement(React.Fragment, null,
        this.pageHeading('Мої предмети', 'Створи предмети, щоб організувати всі дедлайни й розклад.', React.createElement(Button, { icon: "plus", onClick: () => this.setState({ dialog: 'subject' }) }, "\u041D\u043E\u0432\u0438\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442")),
        React.createElement("div", { className: "subjects-top" },
            React.createElement(Icon, { name: "books", size: 18 }),
            " ",
            data.subjects.length,
            " \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0438 \u2022 ",
            data.semester.title),
        React.createElement("div", { className: "subjects-grid" },
            data.subjects.map(s => { const t = data.tasks.filter(t => t.subjectId === s.id), done = t.filter(x => x.status === 'done').length, pct = t.length ? Math.round(done / t.length * 100) : 0; return React.createElement(Card, { key: s.id, className: "subject-card" },
                React.createElement("div", { className: "subject-head" },
                    React.createElement("span", { className: "subject-hero-icon", style: { background: s.color + '20', color: s.color } },
                        React.createElement(Icon, { name: "book", size: 24 })),
                    React.createElement("button", { className: "icon-btn", title: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442", "aria-label": `Видалити предмет ${s.name}`, onClick: () => this.deleteSubject(s.id) },
                        React.createElement(Icon, { name: "trash", size: 17 }))),
                React.createElement("h3", null, s.name),
                React.createElement("p", null,
                    t.length,
                    " \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u2022 ",
                    data.classes.filter(c => c.subjectId === s.id).length,
                    " \u043F\u0430\u0440"),
                React.createElement("div", { className: "progress-caption" },
                    React.createElement("span", null, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F"),
                    React.createElement("b", null,
                        pct,
                        "%")),
                React.createElement("div", { className: "progress-rail", role: "progressbar", "aria-label": `Прогрес предмета ${s.name}`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct },
                    React.createElement("div", { style: { width: pct + '%', background: s.color } })),
                React.createElement("button", { className: "subject-bottom", onClick: () => this.setState({ page: 'tasks', subjectFilter: s.id, query: '', statusFilter: 'all' }) },
                    "\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F ",
                    React.createElement(Icon, { name: "arrow", size: 16 }))); }),
            React.createElement("button", { className: "add-subject-card", onClick: () => this.setState({ dialog: 'subject' }) },
                React.createElement("div", { className: "add-subject-icon" },
                    React.createElement(Icon, { name: "plus", size: 25 })),
                React.createElement("strong", null, "\u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442"),
                React.createElement("span", null, "\u041E\u0440\u0433\u0430\u043D\u0456\u0437\u0443\u0439 \u0449\u0435 \u043E\u0434\u043D\u0443 \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0456\u043D\u0443")))); }
    renderSettings() { return React.createElement(React.Fragment, null,
        this.pageHeading('Налаштування', 'Керуйте параметрами семестру та локальними даними.'),
        React.createElement("div", { className: "settings-wrap" },
            React.createElement(Card, { className: "settings-card" },
                React.createElement("h2", null, "\u041D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0438\u0439 \u0441\u0435\u043C\u0435\u0441\u0442\u0440"),
                React.createElement("p", null, "\u041D\u0430\u0437\u0432\u0430, \u0449\u043E \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0430\u0454\u0442\u044C\u0441\u044F \u0443 \u0442\u0432\u043E\u0454\u043C\u0443 \u0440\u043E\u0431\u043E\u0447\u043E\u043C\u0443 \u043F\u0440\u043E\u0441\u0442\u043E\u0440\u0456."),
                React.createElement(Input, { label: "\u041D\u0430\u0437\u0432\u0430 \u0441\u0435\u043C\u0435\u0441\u0442\u0440\u0443", value: this.state.semesterDraft, onChange: e => this.setState({ semesterDraft: e.target.value }) }),
                React.createElement("div", null,
                    React.createElement(Button, { size: "sm", onClick: () => { if (!this.state.semesterDraft.trim())
                            return; this.updateData(d => { d.semester.title = this.state.semesterDraft.trim(); }); this.notify('Назву семестру оновлено'); } }, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"))),
            React.createElement(Card, { className: "settings-card" },
                React.createElement("h2", null, "\u041A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u0456\u0441\u0442\u044C \u0434\u0430\u043D\u0438\u0445"),
                React.createElement("p", null, "UniPlan \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u0454 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F, \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0438 \u0442\u0430 \u0440\u043E\u0437\u043A\u043B\u0430\u0434 \u043B\u0438\u0448\u0435 \u0443 localStorage \u0446\u044C\u043E\u0433\u043E \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430. \u0425\u043C\u0430\u0440\u043D\u043E\u0457 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0456\u0437\u0430\u0446\u0456\u0457 \u043D\u0435\u043C\u0430\u0454."),
                React.createElement("div", { className: "settings-note" },
                    React.createElement(Icon, { name: "info", size: 20 }),
                    " \u041E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 \u043C\u043E\u0436\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0442\u0432\u0456\u0439 \u043D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u043B\u0430\u043D."),
                React.createElement(Button, { variant: "danger", size: "sm", icon: "trash", onClick: () => { if (window.confirm('Видалити локальні дані й відновити демонстраційний приклад?')) {
                        const data = seed();
                        this.setState({ data, semesterDraft: data.semester.title });
                        this.persist(data);
                        this.notify('Демонстраційні дані відновлено');
                    } } }, "\u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0456\u0439\u043D\u0456 \u0434\u0430\u043D\u0456")),
            React.createElement(Card, { className: "settings-card" },
                React.createElement("h2", null, "\u041F\u0440\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442"),
                React.createElement("p", null, "UniPlan \u2014 \u043D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F \u0434\u043B\u044F \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u043D\u043E\u0433\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u21162. \u0412\u0435\u0440\u0441\u0456\u044F 0.2 \u00B7 React + Storybook."),
                React.createElement(Badge, { tone: "success", dot: true }, "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0438\u0439 MVP")))); }
    renderDetail() { const t = this.state.data.tasks.find(x => x.id === this.state.detailId); if (!t)
        return null; const s = this.getSubject(t.subjectId); const completed = t.subtasks.filter(x => x.done).length; const pct = t.subtasks.length ? Math.round(completed / t.subtasks.length * 100) : (t.status === 'done' ? 100 : 0); return React.createElement(Modal, { title: "\u0414\u0435\u0442\u0430\u043B\u0456 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F", onClose: () => this.setState({ detailId: null }), wide: true },
        React.createElement("div", { className: "detail-head" },
            React.createElement(Badge, { tone: t.status === 'done' ? 'success' : parseLocal(t.dueAt) < new Date() ? 'danger' : 'warning' }, t.status === 'done' ? 'Виконано' : parseLocal(t.dueAt) < new Date() ? 'Прострочено' : 'До виконання'),
            React.createElement("h2", null, t.title),
            React.createElement("p", null,
                React.createElement("span", { className: "subject-dot", style: { background: s === null || s === void 0 ? void 0 : s.color } }),
                " ",
                (s === null || s === void 0 ? void 0 : s.name) || 'Без предмета',
                " ",
                React.createElement("span", { className: "meta-sep" }, "\u2022"),
                " ",
                t.type)),
        React.createElement("div", { className: "detail-pills" },
            React.createElement("div", null,
                React.createElement(Icon, { name: "calendar", size: 17 }),
                React.createElement("span", null, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D"),
                React.createElement("strong", null, dateLabel(t.dueAt, 'long'))),
            React.createElement("div", null,
                React.createElement(Icon, { name: "flag", size: 17 }),
                React.createElement("span", null, "\u041F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442"),
                React.createElement("strong", null, { low: 'Низький', medium: 'Середній', high: 'Високий' }[t.priority]))),
        t.note && React.createElement("div", { className: "detail-note" },
            React.createElement("strong", null, "\u041F\u0440\u0438\u043C\u0456\u0442\u043A\u0430"),
            React.createElement("p", null, t.note)),
        React.createElement("div", { className: "detail-progress" },
            React.createElement("div", null,
                React.createElement("h3", null,
                    "\u041F\u0456\u0434\u0437\u0430\u0434\u0430\u0447\u0456 (",
                    completed,
                    "/",
                    t.subtasks.length,
                    ")"),
                React.createElement("b", null,
                    pct,
                    "%")),
            React.createElement("div", { className: "progress-rail", role: "progressbar", "aria-label": "Прогрес підзадач", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct },
                React.createElement("div", { style: { width: pct + '%' } }))),
        React.createElement("div", { className: "checklist" }, t.subtasks.map(st => React.createElement("label", { key: st.id, className: "checklist-line" },
            React.createElement("input", { type: "checkbox", checked: st.done, onChange: () => this.toggleSubtask(t.id, st.id) }),
            React.createElement("span", null, st.title)))),
        React.createElement("form", { className: "new-subtask", onSubmit: e => { e.preventDefault(); const input = e.target.elements.subtask; this.addSubtask(t.id, input.value); input.value = ''; } },
            React.createElement("input", { name: "subtask", "aria-label": "\u041D\u043E\u0432\u0430 \u043F\u0456\u0434\u0437\u0430\u0434\u0430\u0447\u0430", placeholder: "\u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0440\u043E\u043A \u0434\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F..." }),
            React.createElement("button", { type: "submit", title: "Додати підзадачу", "aria-label": "Додати підзадачу" },
                React.createElement(Icon, { name: "plus", size: 19 }))),
        React.createElement("div", { className: "modal-actions space-between" },
            React.createElement(Button, { variant: "danger", icon: "trash", onClick: () => this.deleteTask(t.id) }, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438"),
            React.createElement("div", { className: "actions-pair" },
                React.createElement(Button, { variant: "secondary", icon: "pencil", onClick: () => this.setState({ editId: t.id, detailId: null, dialog: 'task' }) }, "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"),
                React.createElement(Button, { icon: "check", onClick: () => { this.toggleTask(t.id); this.setState({ detailId: null }); this.notify(t.status === 'done' ? 'Завдання повернено у роботу' : 'Завдання виконано'); } }, t.status === 'done' ? 'Повернути' : 'Завершити')))); }
    render() { const { dialog, page, toast, mobileMenu } = this.state; return React.createElement("div", { className: "app-shell" },
        React.createElement("a", { className: "skip-link", href: "#content" }, "Перейти до основного вмісту"),
        this.renderSidebar(),
        mobileMenu && React.createElement("button", { className: "mobile-overlay", onClick: () => this.setState({ mobileMenu: false }), "aria-label": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438 \u043C\u0435\u043D\u044E" }),
        React.createElement("div", { className: "main-area" },
            this.renderTop(),
            React.createElement("main", { className: "main-content", id: "content", tabIndex: -1 },
                page === 'dashboard' ? this.renderDashboard() : page === 'tasks' ? this.renderTasks() : page === 'calendar' ? this.renderCalendar() : page === 'schedule' ? this.renderSchedule() : page === 'subjects' ? this.renderSubjects() : this.renderSettings(),
                React.createElement("footer", { className: "page-footer" }, "\u00A9 UniPlan \u00B7 \u043D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0440\u043E\u0454\u043A\u0442 \u00B7 \u0434\u0430\u043D\u0456 \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E"))),
        toast && React.createElement("div", { className: "toast", role: "status" },
            React.createElement(Icon, { name: "check", size: 18 }),
            toast,
            React.createElement("button", { onClick: () => this.setState({ toast: '' }), "aria-label": "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438" },
                React.createElement(Icon, { name: "x", size: 15 }))),
        dialog === 'task' && React.createElement(Modal, { title: this.state.editId ? 'Редагувати завдання' : 'Нове завдання', onClose: () => this.setState({ dialog: null }) },
            React.createElement(TaskForm, { key: this.state.editId || 'new', task: this.state.data.tasks.find(x => x.id === this.state.editId), subjects: this.state.data.subjects, onSave: this.saveTask, onCancel: () => this.setState({ dialog: null }) })),
        dialog === 'subject' && React.createElement(Modal, { title: "\u041D\u043E\u0432\u0438\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442", onClose: () => this.setState({ dialog: null }) },
            React.createElement(SubjectForm, { subjects: this.state.data.subjects, onSave: this.saveSubject, onCancel: () => this.setState({ dialog: null }) })),
        dialog === 'class' && React.createElement(Modal, { title: "\u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u043D\u044F\u0442\u0442\u044F", onClose: () => this.setState({ dialog: null }) },
            React.createElement(ClassForm, { subjects: this.state.data.subjects, onSave: this.saveClass, onCancel: () => this.setState({ dialog: null }) })),
        this.state.detailId && this.renderDetail()); }
}

export default App;
