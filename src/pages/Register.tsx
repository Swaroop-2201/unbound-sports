// src/pages/Register.tsx
// Drop this file into your src/pages/ folder (create the folder if it doesn't exist)
// Then add the route in your App.tsx (see instructions below)

import { useEffect, useRef, useState } from "react";

// ─── CONFIG — edit these two lines ───────────────────────────
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwih3XTCF94chwYIcdjxXaC8g3YJmiRYkM__VUv551rQg5lp40-ArzRka0HHnUJDCWIow/exec";
const WHATSAPP_LINK = "https://chat.whatsapp.com/GKwo9EKKog5AZCCPJvzCOC";
// ─────────────────────────────────────────────────────────────

const TOURNAMENT_NAME = "Badminton Tournament 2025";
const FEE_SINGLES = 600;
const FEE_DOUBLES = 900;

const SINGLES = [
  { id: "bs_u11", label: "Boys Singles U11" },
  { id: "bs_u13", label: "Boys Singles U13" },
  { id: "bs_u15", label: "Boys Singles U15" },
  { id: "gs_u11", label: "Girls Singles U11" },
  { id: "gs_u13", label: "Girls Singles U13" },
  { id: "gs_u15", label: "Girls Singles U15" },
];

const DOUBLES = [
  { id: "bd_u13", label: "Boys Doubles U13" },
  { id: "bd_u15", label: "Boys Doubles U15" },
  { id: "gd_u13", label: "Girls Doubles U13" },
  { id: "gd_u15", label: "Girls Doubles U15" },
  { id: "mx_u15", label: "Mixed Doubles U15" },
];

const ALL_EVENTS = [...SINGLES, ...DOUBLES];
const DOUBLES_IDS = new Set(DOUBLES.map((e) => e.id));

function getLabel(id: string) {
  return ALL_EVENTS.find((e) => e.id === id)?.label ?? id;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ─── TYPES ───────────────────────────────────────────────────
interface FormState {
  playerName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  academy: string;
}

interface Errors {
  [key: string]: string;
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function Register() {
  const [form, setForm] = useState<FormState>({
    playerName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    academy: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [partners, setPartners] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState<{
    regId: string;
    amount: number;
    waLink: string;
    name: string;
    events: string[];
  } | null>(null);
  const razorpayKey = useRef("");

  // Load Razorpay script + fetch key
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.head.appendChild(script);

    fetch(`${GAS_URL}?action=config`)
    .then((r) => r.text())
    .then((text) => {
      const d = JSON.parse(text);
      razorpayKey.current = d.razorpayKey || "";
    })
    .catch((err) => {
      console.error("Config fetch error:", err);
    });

    return () => { document.head.removeChild(script); };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  // ── field change ──
  const setField = (key: keyof FormState, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  // ── event toggle ──
  const toggleEvent = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (DOUBLES_IDS.has(id)) {
          setPartners((p) => { const n = { ...p }; delete n[id]; return n; });
        }
      } else {
        next.add(id);
      }
      return next;
    });
    setErrors((e) => { const n = { ...e }; delete n["events"]; return n; });
  };

  // ── total ──
  const total = Array.from(selected).reduce(
    (s, id) => s + (DOUBLES_IDS.has(id) ? FEE_DOUBLES : FEE_SINGLES),
    0
  );

  // ── validation ──
  const validate = () => {
    const errs: Errors = {};
    if (form.playerName.trim().length < 2) errs.playerName = "Enter full name (min 2 characters)";
    if (!form.dob) errs.dob = "Select a valid date of birth";
    if (!form.gender) errs.gender = "Select a gender";
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = "Enter valid 10-digit Indian number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (form.academy.trim().length < 2) errs.academy = "Enter academy/school name";
    if (selected.size === 0) errs.events = "Select at least one event";
    selected.forEach((id) => {
      if (DOUBLES_IDS.has(id) && (partners[id] || "").trim().length < 2) {
        errs[`partner_${id}`] = "Partner name required (min 2 characters)";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── submit ──
  const handleSubmit = async () => {
    setGlobalError("");
    if (!validate()) {
      const el = document.querySelector(".field-error");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      const partnersPayload: Record<string, string> = {};
      selected.forEach((id) => {
        if (DOUBLES_IDS.has(id)) partnersPayload[`partner_${id}`] = (partners[id] || "").trim();
      });

      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "submit",
          ...form,
          playerName: form.playerName.trim(),
          email: form.email.trim(),
          academy: form.academy.trim(),
          selectedEvents: Array.from(selected),
          partners: partnersPayload,
        }),
      });
      
      const text = await res.text();
      const data = JSON.parse(text);
      setLoading(false);
      if (!data.success) { setGlobalError(data.error || "Submission failed."); return; }
      openRazorpay(data);
    } catch {
      setLoading(false);
      setGlobalError("Network error. Check your connection and try again.");
    }
  };

  const openRazorpay = (data: any) => {
    const key = data.razorpayKey || razorpayKey.current;
    if (!key || key.includes("XXXX")) { setGlobalError("Payment gateway not configured."); return; }
    new window.Razorpay({
      key,
      amount: data.amount * 100,
      currency: "INR",
      name: TOURNAMENT_NAME,
      description: "Registration " + data.registrationId,
      prefill: { name: data.name, email: data.email, contact: data.phone },
      theme: { color: "#1565C0" },
      modal: {
        ondismiss: () =>
          setGlobalError(`Payment cancelled. Your Reg ID is ${data.registrationId}. Contact organiser to complete.`),
      },
      handler: (r: any) => confirmPayment(data.registrationId, r.razorpay_payment_id, data.amount, data.name),
    }).open();
  };

  const confirmPayment = async (regId: string, paymentId: string, amount: number, name: string) => {
    setLoading(true);
    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "confirm",
          regId,
          paymentId,
        }),
      });
      
      const text = await res.text();
      const data = JSON.parse(text);
      setLoading(false);
      setSuccess({ regId, amount, waLink: data.whatsappLink || WHATSAPP_LINK, name, events: Array.from(selected) });
    } catch {
      setLoading(false);
      setSuccess({ regId, amount, waLink: WHATSAPP_LINK, name, events: Array.from(selected) });
    }
  };

  // ── success screen ──
  if (success) {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 16px", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ fontSize: 72 }}>🎉</div>
        <h2 style={{ color: "#2E7D32", fontSize: 26, fontWeight: 700, margin: "12px 0 8px" }}>Registration Complete!</h2>
        <p style={{ color: "#64748B", fontSize: 14 }}>Payment received successfully.</p>
        <div style={{ background: "#E8F5E9", border: "1.5px solid #A5D6A7", borderRadius: 10, padding: 14, margin: "16px 0" }}>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>Your Registration ID</div>
          <div style={{ fontFamily: "monospace", fontSize: 17, fontWeight: 700, color: "#0D47A1", letterSpacing: 1 }}>{success.regId}</div>
        </div>
        <div style={{ background: "#E8F5E9", border: "1px solid #C8E6C9", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "left", fontSize: 13 }}>
          <strong>{success.name}</strong>, registered for:<br />
          {success.events.map((id) => <div key={id}>• {getLabel(id)}</div>)}
          <br /><strong>Amount Paid: ₹{success.amount}</strong>
        </div>
        <a href={success.waLink} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, background: "#25D366", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Join WhatsApp Group
        </a>
      </div>
    );
  }

  // ── form ──
  const inp = (style?: object) => ({
    width: "100%", padding: "12px 14px", border: "1.5px solid #CBD5E1",
    borderRadius: 10, fontSize: 15, fontFamily: "Inter, sans-serif",
    color: "#1E293B", background: "#fff", outline: "none",
    WebkitAppearance: "none" as const, appearance: "none" as const,
    boxSizing: "border-box" as const, ...style,
  });
  const errStyle = { fontSize: 12, color: "#C62828", marginTop: 5 };
  const labelStyle = { display: "block" as const, fontSize: 13, fontWeight: 600, color: "#1E293B", marginBottom: 6 };
  const fieldStyle = { marginBottom: 16 };
  const cardStyle = { background: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: "0 2px 12px rgba(21,101,192,0.10)", border: "1px solid rgba(203,213,225,0.5)" };

  return (
    <div style={{ background: "#F0F4FF", minHeight: "100vh", paddingBottom: 80, fontFamily: "Inter, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#0D47A1 0%,#1976D2 60%,#FF6F00 100%)", padding: "28px 20px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 26, fontWeight: 700, color: "#fff" }}>🏸 Unbound Sports</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>{TOURNAMENT_NAME} — Registration</div>
        <div style={{ display: "inline-block", background: "#FF6F00", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginTop: 10 }}>OPEN REGISTRATIONS</div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>

        {/* GLOBAL ERROR */}
        {globalError && (
          <div style={{ background: "#FFEBEE", color: "#C62828", border: "1px solid #FFCDD2", borderRadius: 10, padding: "12px 16px", fontSize: 13, margin: "16px 0" }}>
            ⚠️ {globalError}
          </div>
        )}

        {/* PLAYER DETAILS */}
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 17, fontWeight: 700, color: "#0D47A1", marginBottom: 16 }}>👤 Player Details</div>

          {[
            { id: "playerName", label: "Full Name", placeholder: "Enter full name", type: "text" },
            { id: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
            { id: "academy", label: "Academy / School", placeholder: "Your club, academy or school", type: "text" },
          ].map(({ id, label, placeholder, type }) => (
            <div key={id} style={fieldStyle}>
              <label style={labelStyle}>{label} <span style={{ color: "#C62828" }}>*</span></label>
              <input type={type} placeholder={placeholder} value={(form as any)[id]}
                onChange={(e) => setField(id as keyof FormState, e.target.value)}
                style={inp(errors[id] ? { borderColor: "#C62828" } : {})} />
              {errors[id] && <div style={errStyle}>{errors[id]}</div>}
            </div>
          ))}

          <div style={fieldStyle}>
            <label style={labelStyle}>Date of Birth <span style={{ color: "#C62828" }}>*</span></label>
            <input type="date" max={today} value={form.dob}
              onChange={(e) => setField("dob", e.target.value)}
              style={inp(errors.dob ? { borderColor: "#C62828" } : {})} />
            {errors.dob && <div style={errStyle}>{errors.dob}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Mobile Number <span style={{ color: "#C62828" }}>*</span></label>
            <input type="tel" placeholder="10-digit mobile number" maxLength={10}
              inputMode="numeric" value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              style={inp(errors.phone ? { borderColor: "#C62828" } : {})} />
            {errors.phone && <div style={errStyle}>{errors.phone}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Gender <span style={{ color: "#C62828" }}>*</span></label>
            <div style={{ display: "flex", gap: 12 }}>
              {["Male", "Female"].map((g) => (
                <label key={g} onClick={() => setField("gender", g)}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, border: `1.5px solid ${form.gender === g ? "#1565C0" : "#CBD5E1"}`, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: form.gender === g ? 600 : 500, background: form.gender === g ? "#EFF6FF" : "#fff", color: form.gender === g ? "#1565C0" : "#1E293B" }}>
                  {g === "Male" ? "♂" : "♀"} {g}
                </label>
              ))}
            </div>
            {errors.gender && <div style={errStyle}>{errors.gender}</div>}
          </div>
        </div>

        {/* EVENTS */}
        <div style={cardStyle}>
          <div style={{ fontFamily: "sans-serif", fontSize: 17, fontWeight: 700, color: "#0D47A1", marginBottom: 12 }}>🏆 Select Events</div>
          <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "10px 12px", fontSize: 12, marginBottom: 16 }}>
            💡 Singles ₹600 per event &nbsp;|&nbsp; Doubles ₹900 per pair
          </div>

          {[{ title: "🎯 Singles Events", events: SINGLES, isDoubles: false }, { title: "👫 Doubles Events", events: DOUBLES, isDoubles: true }].map(({ title, events, isDoubles }) => (
            <div key={title} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#64748B", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #CBD5E1" }}>{title}</div>
              {isDoubles && (
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "8px 12px", fontSize: 12, marginBottom: 10 }}>
                  ⚠️ Enter your partner's name separately for each doubles event
                </div>
              )}
              {events.map((ev) => {
                const isSel = selected.has(ev.id);
                const fee = isDoubles ? FEE_DOUBLES : FEE_SINGLES;
                return (
                  <div key={ev.id} style={{ border: `1.5px solid ${isSel ? "#1565C0" : "#CBD5E1"}`, borderRadius: 10, marginBottom: 8, overflow: "hidden", background: isSel ? "#EFF6FF" : "#fff" }}>
                    <div onClick={() => toggleEvent(ev.id)}
                      style={{ display: "flex", alignItems: "center", padding: "13px 14px", cursor: "pointer", gap: 12, WebkitTapHighlightColor: "transparent", userSelect: "none" }}>
                      <div style={{ width: 22, height: 22, border: `2px solid ${isSel ? "#1565C0" : "#CBD5E1"}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: isSel ? "#1565C0" : "#fff", flexShrink: 0 }}>
                        {isSel && <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>✓</span>}
                      </div>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{ev.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#FF6F00", background: "#FFF3E0", padding: "3px 8px", borderRadius: 6 }}>₹{fee}</span>
                    </div>
                    {isDoubles && isSel && (
                      <div style={{ padding: "0 14px 14px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#1565C0", marginBottom: 6 }}>🤝 Partner's name for {ev.label} *</div>
                        <input type="text" placeholder="Enter partner's full name"
                          value={partners[ev.id] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPartners((p) => ({ ...p, [ev.id]: val }));
                            setErrors((err) => { const n = { ...err }; delete n[`partner_${ev.id}`]; return n; });
                          }}
                          style={inp(errors[`partner_${ev.id}`] ? { borderColor: "#C62828" } : { borderColor: "#1565C0" })} />
                        {errors[`partner_${ev.id}`] && <div style={errStyle}>{errors[`partner_${ev.id}`]}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          {errors.events && <div className="field-error" style={{ ...errStyle, fontSize: 13 }}>{errors.events}</div>}
        </div>

        {/* FEE SUMMARY */}
        <div style={{ background: "linear-gradient(135deg,#EFF6FF,#FFF3E0)", border: "1.5px solid #BFDBFE", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0D47A1", marginBottom: 10 }}>📋 Fee Summary</div>
          {selected.size === 0
            ? <div style={{ fontSize: 13, color: "#64748B", fontStyle: "italic" }}>No events selected yet</div>
            : Array.from(selected).map((id) => (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748B", marginBottom: 6 }}>
                <span>{getLabel(id)}</span>
                <span>₹{DOUBLES_IDS.has(id) ? FEE_DOUBLES : FEE_SINGLES}</span>
              </div>
            ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 700, color: "#0D47A1", borderTop: "1.5px solid #BFDBFE", paddingTop: 10, marginTop: 4 }}>
            <span>Total</span>
            <span style={{ color: "#FF6F00" }}>₹{total}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", padding: 16, background: "linear-gradient(135deg,#1565C0,#1976D2)", color: "#fff", border: "none", borderRadius: 12, fontSize: 19, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "sans-serif" }}>
          {loading ? (
            <svg style={{ animation: "spin 0.7s linear infinite", width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : "Proceed to Payment →"}
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "#64748B", marginTop: 10 }}>🔒 Secure payment via Razorpay</p>
      </div>

      {/* STICKY TOTAL */}
      {selected.size > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0D47A1", color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Total Payable</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FF6F00" }}>₹{total}</div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{selected.size} event{selected.size !== 1 ? "s" : ""} selected</div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
