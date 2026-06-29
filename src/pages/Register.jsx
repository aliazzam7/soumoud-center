import { useState, useEffect, useRef } from "react";
import {
  User, Phone, BookOpen, FileText,
  FlaskConical, BookMarked, CheckCircle2, Plus,
  Send, ChevronDown, AlertCircle, X,
} from "lucide-react";
import "./Register.css";

const SCIENTIFIC = [
  { id: "math",    label: "Math",      ar: "رياضيات" },
  { id: "physics", label: "Physics",   ar: "فيزياء"  },
  { id: "bio",     label: "Biology",   ar: "أحياء"   },
  { id: "chem",    label: "Chemistry", ar: "كيمياء"  },
  { id: "sci",     label: "Science",   ar: "علوم"    },
];

const LITERARY = [
  { id: "arabic",  label: "Arabic",    ar: "عربي"        },
  { id: "english", label: "English",   ar: "إنجليزي"      },
  { id: "french",  label: "French",    ar: "فرنسي"        },
  { id: "history", label: "History",   ar: "تاريخ"        },
  { id: "geo",     label: "Geography", ar: "جغرافيا"      },
  { id: "civic",   label: "Civic Ed",  ar: "تربية وطنية"  },
];

const ALL_SUBJECTS = [...SCIENTIFIC, ...LITERARY];

const GRADES = [
  "KG1","KG2",
  "Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6",
  "Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12",
];

const RECIPIENTS = [
  { id: "Intissar", label: "Intissar", ar: "انتصار", number: "96171240366" },
  { id: "soumaya",  label: "Soumaya",  ar: "سميا",   number: "96103932176" },
];

const EMPTY_FORM = {
  sname: "", sage: "", grade: "", school: "",
  level: 5,
  pname: "", phone: "",
  notes: "",
};

// ── Sanitize: strip any HTML/script tags from a string (XSS protection)
const sanitize = (str) => str.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "");

// ── Validators
const VALIDATORS = {
  // letters, spaces, Arabic, hyphens only — no digits
  nameOnly:  (v) => /^[\u0600-\u06FFa-zA-Z\s\-'.]+$/.test(v.trim()),
  // digits, spaces, +, hyphens only
  phoneOnly: (v) => /^[\d\s+()-]+$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7,
  // age 4–25
  ageValid:  (v) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= 4 && n <= 25;
  },
};

const FIELD_LABELS = {
  sname:  { en: "Student full name (letters only)",  ar: "اسم الطالب (حروف فقط)"       },
  sage:   { en: "Age (4–25)",                        ar: "العمر (٤-٢٥)"                 },
  grade:  { en: "School grade",                      ar: "الصف الدراسي"                 },
  school: { en: "School name (letters only)",        ar: "اسم المدرسة (حروف فقط)"       },
  pname:  { en: "Parent full name (letters only)",   ar: "اسم ولي الأمر (حروف فقط)"    },
  phone:  { en: "Phone number (digits only)",        ar: "رقم التليفون (أرقام فقط)"     },
  subj:   { en: "At least one subject",              ar: "مادة واحدة على الأقل"          },
  recip:  { en: "Please select recipient",           ar: "اختر جهة الإرسال"              },
};

// Error messages per field per error type
const ERR_MSGS = {
  sname:  { empty: "Required / مطلوب", invalid: "Letters only, no numbers / حروف فقط بدون أرقام" },
  sage:   { empty: "Required / مطلوب", invalid: "Must be a number between 4 and 25 / رقم بين ٤ و ٢٥" },
  school: { empty: "Required / مطلوب", invalid: "Letters only, no numbers / حروف فقط بدون أرقام" },
  pname:  { empty: "Required / مطلوب", invalid: "Letters only, no numbers / حروف فقط بدون أرقام" },
  phone:  { empty: "Required / مطلوب", invalid: "Digits only, no letters / أرقام فقط بدون حروف" },
};

/* ── Validation Alert Popup ── */
function ValidationAlert({ fields, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="rg-alert-overlay" onClick={onClose}>
      <div className="rg-alert" onClick={e => e.stopPropagation()}>
        <div className="rg-alert-header">
          <AlertCircle size={18} strokeWidth={2.2} />
          <span>Please fix the following / يرجى تصحيح التالي</span>
          <button className="rg-alert-close" onClick={onClose}>
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
        <ul className="rg-alert-list">
          {fields.map(f => (
            <li key={f}>
              <span className="rg-alert-dot" />
              <span>{FIELD_LABELS[f].en}</span>
              <span className="rg-alert-ar"> / {FIELD_LABELS[f].ar}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Custom Select ── */
function CustomSelect({ value, onChange, options, placeholder, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Only allow grades from the predefined list (prevents injection via select)
  const handleChange = (opt) => {
    if (options.includes(opt)) { onChange(opt); setOpen(false); }
  };

  return (
    <div className="rg-select-wrap" ref={ref}>
      <button
        type="button"
        className={[
          "rg-select-btn",
          open ? "open" : "",
          !value ? "placeholder" : "",
          hasError ? "rg-select-btn--err" : "",
        ].join(" ")}
        onClick={() => setOpen(o => !o)}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={15} strokeWidth={2.2} className="rg-select-chevron" />
      </button>

      {open && (
        <div className="rg-select-dropdown">
          {options.map(opt => (
            <div
              key={opt}
              className={`rg-select-option${opt === value ? " selected" : ""}`}
              onClick={() => handleChange(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm]               = useState(EMPTY_FORM);
  const [selected, setSelected]       = useState(new Set());
  const [allChosen, setAllChosen]     = useState(false);
  const [errors, setErrors]           = useState({});
  const [subjErr, setSubjErr]         = useState(false);
  const [alertFields, setAlertFields] = useState(null);
  const [recipient, setRecipient]     = useState(null);
  const [recipErr, setRecipErr]       = useState(false);

  // Sanitize + set field
  const set = (k, v) => setForm(f => ({ ...f, [k]: sanitize(v) }));

  const toggleSubj = (id) => {
    // Only allow IDs from the predefined list
    if (!ALL_SUBJECTS.find(s => s.id === id)) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      setAllChosen(next.size === ALL_SUBJECTS.length);
      if (next.size > 0) setSubjErr(false);
      return next;
    });
  };

  const toggleAll = () => {
    if (allChosen) {
      setSelected(new Set());
      setAllChosen(false);
    } else {
      setSelected(new Set(ALL_SUBJECTS.map(s => s.id)));
      setAllChosen(true);
      setSubjErr(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setSelected(new Set());
    setAllChosen(false);
    setErrors({});
    setSubjErr(false);
    setAlertFields(null);
    setRecipient(null);
    setRecipErr(false);
  };

  const validate = () => {
    const e = {};
    const missing = [];

    // Student name
    if (!form.sname.trim()) {
      e.sname = ERR_MSGS.sname.empty;
      missing.push("sname");
    } else if (!VALIDATORS.nameOnly(form.sname)) {
      e.sname = ERR_MSGS.sname.invalid;
      missing.push("sname");
    }

    // Age
    if (!form.sage) {
      e.sage = ERR_MSGS.sage.empty;
      missing.push("sage");
    } else if (!VALIDATORS.ageValid(form.sage)) {
      e.sage = ERR_MSGS.sage.invalid;
      missing.push("sage");
    }

    // Grade — must be from predefined list
    if (!form.grade || !GRADES.includes(form.grade)) {
      e.grade = true;
      missing.push("grade");
    }

    // School name
    if (!form.school.trim()) {
      e.school = ERR_MSGS.school.empty;
      missing.push("school");
    } else if (!VALIDATORS.nameOnly(form.school)) {
      e.school = ERR_MSGS.school.invalid;
      missing.push("school");
    }

    // Parent name
    if (!form.pname.trim()) {
      e.pname = ERR_MSGS.pname.empty;
      missing.push("pname");
    } else if (!VALIDATORS.nameOnly(form.pname)) {
      e.pname = ERR_MSGS.pname.invalid;
      missing.push("pname");
    }

    // Phone
    if (!form.phone.trim()) {
      e.phone = ERR_MSGS.phone.empty;
      missing.push("phone");
    } else if (!VALIDATORS.phoneOnly(form.phone)) {
      e.phone = ERR_MSGS.phone.invalid;
      missing.push("phone");
    }

    // Subjects
    if (selected.size === 0) {
      missing.push("subj");
      setSubjErr(true);
    }

    // Recipient
    if (!recipient) {
      missing.push("recip");
      setRecipErr(true);
    }

    setErrors(e);

    if (missing.length > 0) {
      setAlertFields(missing);
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validate()) return;

    const subjList = allChosen
      ? "كل المواد / All subjects"
      : ALL_SUBJECTS.filter(s => selected.has(s.id))
          .map(s => `${s.label} / ${s.ar}`)
          .join("، ");

    // Double-check recipient is valid before using
    const chosenRecip = RECIPIENTS.find(r => r.id === recipient);
    if (!chosenRecip) return;

    const lines = [
      `السلام كيفكم صبايا `,
      `عندكم طالب جديد يرغب بالتسجيل في مركز صمود!`,
      ``,
      `*معلومات الطالب:*`,
      `• الاسم: ${form.sname}`,
      `• العمر: ${form.sage} سنة`,
      `• الصف: ${form.grade}`,
      `• المدرسة: ${form.school}`,
      `• المستوى الأكاديمي: ${form.level}/10`,
      ``,
      `*ولي الأمر:*`,
      `• الاسم: ${form.pname}`,
      `• رقم التليفون: ${form.phone}`,
      ``,
      `*المواد المطلوبة:*`,
      subjList,
      ...(form.notes.trim() ? [``, `*ملاحظات:*`, sanitize(form.notes)] : []),
      ``,
      `- sent this Message from Soumoud Center Website`,
    ];

    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${chosenRecip.number}?text=${msg}`, "_blank");

    resetForm();
  };

  // Returns error class + specific message
  const cls = (k) => `rg-input${errors[k] ? " rg-input--err" : ""}`;
  const errMsg = (k) => errors[k] ? <span className="rg-err-msg">{errors[k]}</span> : null;

  return (
    <main className="rg-page">

      {alertFields && (
        <ValidationAlert
          fields={alertFields}
          onClose={() => setAlertFields(null)}
        />
      )}

      <div className="rg-wrap">

        {/* ── Header ── */}
        <div className="rg-header">
          <div className="rg-logo-row" />
          <h1 className="rg-title">Student Registration</h1>
          <p className="rg-subtitle">
            Fill in the form and we'll send your details directly via WhatsApp.
          </p>
        </div>

        {/* ── Card 1: Student info ── */}
        <div className="rg-card">
          <p className="rg-section-label">
            <User size={14} strokeWidth={2.2} />
            Student info
            <span className="rg-section-ar">/ معلومات الطالب</span>
          </p>

          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">الاسم الكامل</span> Student full name
              </label>
              <input
                className={cls("sname")}
                type="text"
                placeholder="e.g. Ahmad Hassan"
                value={form.sname}
                onChange={e => { set("sname", e.target.value); setErrors(er => ({ ...er, sname: null })); }}
              />
              {errMsg("sname")}
            </div>

            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">العمر</span> Age
              </label>
              <input
                className={cls("sage")}
                type="number"
                min="4" max="25"
                placeholder="e.g. 14"
                value={form.sage}
                onChange={e => { set("sage", e.target.value); setErrors(er => ({ ...er, sage: null })); }}
              />
              {errMsg("sage")}
            </div>
          </div>

          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">الصف الدراسي</span> School grade
              </label>
              <CustomSelect
                value={form.grade}
                onChange={v => { set("grade", v); setErrors(er => ({ ...er, grade: false })); }}
                options={GRADES}
                placeholder="Select / اختر"
                hasError={errors.grade}
              />
              {errors.grade && <span className="rg-err-msg">Required / مطلوب</span>}
            </div>

            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">المدرسة</span> School name
              </label>
              <input
                className={cls("school")}
                type="text"
                placeholder="e.g. School Name"
                value={form.school}
                onChange={e => { set("school", e.target.value); setErrors(er => ({ ...er, school: null })); }}
              />
              {errMsg("school")}
            </div>
          </div>

          <div className="rg-field">
            <label className="rg-label">
              <span className="rg-label-ar">المستوى الأكاديمي</span> Academic level (out of 10)
            </label>
            <div className="rg-slider-row">
              <input
                type="range" min="1" max="10" step="1"
                value={form.level}
                onChange={e => set("level", Number(e.target.value))}
              />
              <div className="rg-slider-val">{form.level}</div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Parent / Contact ── */}
        <div className="rg-card">
          <p className="rg-section-label">
            <Phone size={14} strokeWidth={2.2} />
            Contact info
            <span className="rg-section-ar">/ معلومات التواصل</span>
          </p>

          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">اسم ولي الأمر</span> Parent full name
              </label>
              <input
                className={cls("pname")}
                type="text"
                placeholder="e.g. Hassan Ahmad"
                value={form.pname}
                onChange={e => { set("pname", e.target.value); setErrors(er => ({ ...er, pname: null })); }}
              />
              {errMsg("pname")}
            </div>

            <div className="rg-field">
              <label className="rg-label">
                <span className="rg-label-ar">رقم التليفون</span> Phone number
              </label>
              <input
                className={cls("phone")}
                type="tel"
                placeholder="e.g. 03 123 456"
                value={form.phone}
                onChange={e => { set("phone", e.target.value); setErrors(er => ({ ...er, phone: null })); }}
              />
              {errMsg("phone")}
            </div>
          </div>
        </div>

        {/* ── Card 3: Subjects ── */}
        <div className="rg-card">
          <p className="rg-section-label">
            <BookOpen size={14} strokeWidth={2.2} />
            Subjects needed
            <span className="rg-section-ar">/ المواد المطلوبة</span>
          </p>

          <button
            className={`rg-all-btn${allChosen ? " rg-all-btn--on" : ""}`}
            onClick={toggleAll}
          >
            <span className="rg-all-check">
              {allChosen
                ? <CheckCircle2 size={13} strokeWidth={2.5} />
                : <Plus size={13} strokeWidth={2.5} />}
            </span>
            All subjects / كل المواد
          </button>

          <p className="rg-subcat">
            <FlaskConical size={11} strokeWidth={2} />
            Scientific / مواد علمية
          </p>
          <div className="rg-subjects-grid">
            {SCIENTIFIC.map(s => (
              <button
                key={s.id}
                className={`rg-subj-btn${selected.has(s.id) ? " rg-subj-btn--on" : ""}`}
                onClick={() => toggleSubj(s.id)}
              >
                {s.label} / {s.ar}
              </button>
            ))}
          </div>

          <p className="rg-subcat">
            <BookMarked size={11} strokeWidth={2} />
            Literary / مواد أدبية
          </p>
          <div className="rg-subjects-grid">
            {LITERARY.map(s => (
              <button
                key={s.id}
                className={`rg-subj-btn${selected.has(s.id) ? " rg-subj-btn--on" : ""}`}
                onClick={() => toggleSubj(s.id)}
              >
                {s.label} / {s.ar}
              </button>
            ))}
          </div>

          {subjErr && (
            <p className="rg-err-msg" style={{ marginTop: "8px" }}>
              Select at least one subject / اختر مادة واحدة على الأقل
            </p>
          )}
        </div>

        {/* ── Card 4: Notes ── */}
        <div className="rg-card">
          <p className="rg-section-label">
            <FileText size={14} strokeWidth={2.2} />
            Notes
            <span className="rg-section-ar">/ ملاحظات (اختياري)</span>
          </p>
          <textarea
            className="rg-input rg-textarea"
            placeholder="Any extra info / أي معلومات إضافية..."
            value={form.notes}
            onChange={e => set("notes", e.target.value)}
          />
        </div>

        {/* ── Card 5: Recipient ── */}
        <div className="rg-card">
          <p className="rg-section-label">
            <Send size={14} strokeWidth={2.2} />
            Send to
            <span className="rg-section-ar">/ أرسل إلى</span>
          </p>
          <div className="rg-subjects-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {RECIPIENTS.map(r => (
              <button
                key={r.id}
                className={`rg-subj-btn${recipient === r.id ? " rg-subj-btn--on" : ""}`}
                onClick={() => { setRecipient(r.id); setRecipErr(false); }}
              >
                {r.label} / {r.ar}
              </button>
            ))}
          </div>
          {recipErr && (
            <p className="rg-err-msg" style={{ marginTop: "8px" }}>
              Select a recipient / اختر جهة الإرسال
            </p>
          )}
        </div>

        {/* ── Submit ── */}
        <button className="rg-submit" onClick={submit}>
          <Send size={17} strokeWidth={2.2} />
          Send via WhatsApp / أرسل عبر واتساب
        </button>

        <p className="rg-footnote">
          You'll be redirected to WhatsApp to confirm and send.
          <br />
          سيتم توجيهك لواتساب للتأكيد والإرسال.
        </p>

      </div>
    </main>
  );
}