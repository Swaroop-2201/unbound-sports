import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EventCode =
  | "BS_U11" | "GS_U11"
  | "BS_U13" | "GS_U13" | "BD_U13" | "GD_U13"
  | "BS_U15" | "GS_U15" | "BD_U15" | "GD_U15" | "XD_U15";

interface EventOption {
  code: EventCode;
  label: string;
  type: "singles" | "doubles";
  gender: "boys" | "girls" | "mixed";
  ageGroup: "U11" | "U13" | "U15";
}

interface Partner {
  name: string;
  age: string;
  school: string;
  phone: string;
}

interface FormData {
  playerName: string;
  dob: string;
  age: string;
  gender: "Male" | "Female" | "";
  school: string;
  playerPhone: string;
  parentName: string;
  parentPhone: string;
  email: string;
  selectedEvents: EventCode[];
  partners: Partial<Record<EventCode, Partner>>;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const EVENTS: EventOption[] = [
  { code: "BS_U11", label: "Boys Singles U11", type: "singles", gender: "boys", ageGroup: "U11" },
  { code: "GS_U11", label: "Girls Singles U11", type: "singles", gender: "girls", ageGroup: "U11" },
  { code: "BS_U13", label: "Boys Singles U13", type: "singles", gender: "boys", ageGroup: "U13" },
  { code: "GS_U13", label: "Girls Singles U13", type: "singles", gender: "girls", ageGroup: "U13" },
  { code: "BD_U13", label: "Boys Doubles U13", type: "doubles", gender: "boys", ageGroup: "U13" },
  { code: "GD_U13", label: "Girls Doubles U13", type: "doubles", gender: "girls", ageGroup: "U13" },
  { code: "BS_U15", label: "Boys Singles U15", type: "singles", gender: "boys", ageGroup: "U15" },
  { code: "GS_U15", label: "Girls Singles U15", type: "singles", gender: "girls", ageGroup: "U15" },
  { code: "BD_U15", label: "Boys Doubles U15", type: "doubles", gender: "boys", ageGroup: "U15" },
  { code: "GD_U15", label: "Girls Doubles U15", type: "doubles", gender: "girls", ageGroup: "U15" },
  { code: "XD_U15", label: "Mixed Doubles U15", type: "doubles", gender: "mixed", ageGroup: "U15" },
];

const SINGLES_FEE = 600;
const DOUBLES_FEE = 900;

// ─── REPLACE THESE WITH YOUR ACTUAL VALUES ───────────────────────────────────
const RAZORPAY_KEY = "rzp_live_SoktAIRMkzPSfy"; // e.g. "rzp_live_xxxxxxxxxxxx"
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5HcznV76xSm6OqErt5BSsO4hYRrSgLgjNhNHMEYI_Etv47CUPxMmhXImBDWefvK8-Bw/exec";
const WHATSAPP_INVITE = "https://chat.whatsapp.com/GKwo9EKKog5AZCCPJvzCOC"; // replace after creating group

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const cutoff = new Date("2025-12-31"); // age as on Dec 31 2025
  let age = cutoff.getFullYear() - birth.getFullYear();
  const m = cutoff.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && cutoff.getDate() < birth.getDate())) age--;
  return age;
}

function isEventEligible(event: EventOption, gender: string, age: number): boolean {
  if (event.ageGroup === "U11" && age >= 11) return false;
  if (event.ageGroup === "U13" && age >= 13) return false;
  if (event.ageGroup === "U15" && age >= 15) return false;
  if (event.gender === "boys" && gender !== "Male") return false;
  if (event.gender === "girls" && gender !== "Female") return false;
  return true;
}

function calcFee(selected: EventCode[]): number {
  return selected.reduce((sum, code) => {
    const ev = EVENTS.find((e) => e.code === code)!;
    return sum + (ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE);
  }, 0);
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Register() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>({
    playerName: "", dob: "", age: "", gender: "",
    school: "", playerPhone: "", parentName: "",
    parentPhone: "", email: "",
    selectedEvents: [], partners: {},
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [paying, setPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Recalculate age when DOB changes
  useEffect(() => {
    if (form.dob) {
      const age = calculateAge(form.dob);
      setForm((f) => ({ ...f, age: String(age), selectedEvents: [], partners: {} }));
    }
  }, [form.dob]);

  const eligible = EVENTS.filter((e) =>
    form.age && form.gender ? isEventEligible(e, form.gender, Number(form.age)) : true
  );

  const totalFee = calcFee(form.selectedEvents);

  // ─── Validation ─────────────────────────────────────────────────────────────
  function validateStep1(): boolean {
    const e: typeof errors = {};
    if (!form.playerName.trim()) e.playerName = "Player name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    else {
      const age = calculateAge(form.dob);
      if (age < 5 || age > 16) e.dob = "Age must be between 5–15 years (as of Dec 31 2025)";
    }
    if (!form.gender) e.gender = "Please select gender";
    if (!form.school.trim()) e.school = "School / Academy name is required";
    if (!/^\d{10}$/.test(form.playerPhone)) e.playerPhone = "Enter valid 10-digit mobile number";
    if (!form.parentName.trim()) e.parentName = "Parent / Guardian name is required";
    if (!/^\d{10}$/.test(form.parentPhone)) e.parentPhone = "Enter valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: typeof errors = {};
    if (form.selectedEvents.length === 0) {
      e.events = "Please select at least one event";
    }
    // Validate partner details for doubles
    form.selectedEvents.forEach((code) => {
      const ev = EVENTS.find((x) => x.code === code)!;
      if (ev.type === "doubles") {
        const p = form.partners[code];
        if (!p?.name?.trim()) e[`${code}_name`] = "Partner name required";
        if (!p?.age?.trim()) e[`${code}_age`] = "Partner age required";
        else if (Number(p.age) < 5 || Number(p.age) > 15) e[`${code}_age`] = "Invalid age";
        if (!p?.school?.trim()) e[`${code}_school`] = "Partner school required";
        if (!/^\d{10}$/.test(p?.phone || "")) e[`${code}_phone`] = "Valid 10-digit number required";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ─── Google Sheets Submit ────────────────────────────────────────────────────
  async function submitToSheets(paymentId: string) {
    const rows = form.selectedEvents.map((code) => {
      const ev = EVENTS.find((x) => x.code === code)!;
      const partner = form.partners[code];
      return {
        timestamp: new Date().toISOString(),
        playerName: form.playerName,
        dob: form.dob,
        age: form.age,
        gender: form.gender,
        school: form.school,
        playerPhone: form.playerPhone,
        parentName: form.parentName,
        parentPhone: form.parentPhone,
        email: form.email,
        event: ev.label,
        eventType: ev.type,
        partnerName: partner?.name || "",
        partnerAge: partner?.age || "",
        partnerSchool: partner?.school || "",
        partnerPhone: partner?.phone || "",
        feePaid: ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE,
        paymentId,
      };
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
  }

  // ─── Razorpay Payment ────────────────────────────────────────────────────────
  function handlePayment() {
    if (!validateStep2()) return;
    if (!window.Razorpay) {
      setSubmitError("Payment gateway not loaded. Please refresh and try again.");
      return;
    }
    setPaying(true);
    setSubmitError("");

    const options = {
      key: RAZORPAY_KEY,
      amount: totalFee * 100, // paise
      currency: "INR",
      name: "Badminton 360 Events",
      description: `VSA-360 Badminton Tournament – ${form.selectedEvents.length} event(s)`,
      image: "https://unboundsports.in/logo.png",
      prefill: {
        name: form.playerName,
        email: form.email,
        contact: form.parentPhone,
      },
      notes: {
        player: form.playerName,
        events: form.selectedEvents.join(", "),
      },
      theme: { color: "#00b4d8" },
      handler: async function (response: { razorpay_payment_id: string }) {
        try {
          await submitToSheets(response.razorpay_payment_id);
          setPaymentDone(true);
          setStep(3);
        } catch {
          setSubmitError("Payment received but data saving failed. Please WhatsApp us with your payment ID: " + response.razorpay_payment_id);
        } finally {
          setPaying(false);
        }
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      setPaying(false);
      setSubmitError(`Payment failed: ${response.error.description}`);
    });
    rzp.open();
  }

  // ─── Field helpers ────────────────────────────────────────────────────────
  const setField = (key: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleEvent = (code: EventCode) => {
    setForm((f) => {
      const has = f.selectedEvents.includes(code);
      return {
        ...f,
        selectedEvents: has
          ? f.selectedEvents.filter((c) => c !== code)
          : [...f.selectedEvents, code],
        partners: has ? (() => { const p = { ...f.partners }; delete p[code]; return p; })() : f.partners,
      };
    });
    setErrors((e) => ({ ...e, events: undefined }));
  };

  const setPartnerField = (code: EventCode, field: keyof Partner, val: string) => {
    setForm((f) => ({
      ...f,
      partners: {
        ...f.partners,
        [code]: { ...f.partners[code], [field]: val },
      },
    }));
    setErrors((e) => ({ ...e, [`${code}_${field}`]: undefined }));
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050a0f] text-white font-['Rajdhani',sans-serif]">
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        input, select { -webkit-appearance: none; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
        .glow { text-shadow: 0 0 20px rgba(0,180,216,0.6); }
        .btn-primary {
          background: linear-gradient(135deg, #00b4d8, #0077b6);
          border: none; color: white; font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px; font-size: 1.1rem; padding: 14px 28px;
          border-radius: 6px; cursor: pointer; width: 100%;
          transition: all 0.2s; box-shadow: 0 4px 20px rgba(0,180,216,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,180,216,0.5); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .field-group { margin-bottom: 18px; }
        .field-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #00b4d8; margin-bottom: 6px; display: block; }
        .field-input {
          width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(0,180,216,0.25);
          border-radius: 6px; padding: 12px 14px; color: white; font-family: 'Rajdhani', sans-serif;
          font-size: 1rem; font-weight: 500; transition: border-color 0.2s;
        }
        .field-input:focus { outline: none; border-color: #00b4d8; background: rgba(0,180,216,0.08); }
        .field-input.error { border-color: #ff4757; }
        .error-msg { color: #ff4757; font-size: 0.75rem; margin-top: 4px; font-weight: 500; }
        .event-card {
          border: 1.5px solid rgba(0,180,216,0.2); border-radius: 8px;
          padding: 12px 14px; cursor: pointer; transition: all 0.2s;
          background: rgba(255,255,255,0.03);
        }
        .event-card.selected {
          border-color: #00b4d8; background: rgba(0,180,216,0.12);
          box-shadow: 0 0 16px rgba(0,180,216,0.2);
        }
        .event-card.disabled { opacity: 0.3; cursor: not-allowed; }
        .step-bar { display: flex; gap: 8px; margin-bottom: 28px; }
        .step-dot {
          flex: 1; height: 4px; border-radius: 2px;
          background: rgba(0,180,216,0.2); transition: background 0.3s;
        }
        .step-dot.active { background: #00b4d8; box-shadow: 0 0 8px rgba(0,180,216,0.5); }
        .section-title { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px;
          font-size: 1.1rem; color: #00b4d8; margin: 22px 0 12px; border-bottom: 1px solid rgba(0,180,216,0.2);
          padding-bottom: 8px; }
        .gender-btn {
          flex: 1; padding: 12px; border-radius: 6px; border: 1.5px solid rgba(0,180,216,0.25);
          background: rgba(255,255,255,0.03); color: white; font-family: 'Rajdhani', sans-serif;
          font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; letter-spacing: 1px;
        }
        .gender-btn.selected { border-color: #00b4d8; background: rgba(0,180,216,0.15); color: #00b4d8; }
        .fee-badge {
          display: inline-block; background: rgba(255,180,0,0.15); border: 1px solid rgba(255,180,0,0.4);
          color: #ffd700; border-radius: 4px; padding: 2px 8px; font-size: 0.78rem; font-weight: 700;
          letter-spacing: 1px;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0a1628 0%, #050a0f 100%)",
        borderBottom: "1px solid rgba(0,180,216,0.2)",
        padding: "20px 16px 16px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "3px", color: "#00b4d8", fontWeight: 700, marginBottom: 4 }}>
          BADMINTON 360 EVENTS PRESENTS
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", letterSpacing: "3px",
          lineHeight: 1.1, margin: 0, color: "white",
        }} className="glow">
          VSA-360 INTERNAL<br />
          <span style={{ color: "#00b4d8" }}>BADMINTON</span> TOURNAMENT
        </h1>
        <p style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: 700, marginTop: 6, letterSpacing: 2 }}>
          ★ FIRST EDITION · 6TH–7TH JUNE ★
        </p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: 1 }}>
          RPUG Badminton Court, NiBM
        </p>
      </div>

      {/* Form Container */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 40px" }}>

        {/* Step Progress */}
        {step < 3 && (
          <div className="step-bar">
            <div className={`step-dot ${step >= 1 ? "active" : ""}`} />
            <div className={`step-dot ${step >= 2 ? "active" : ""}`} />
            <div className="step-dot" style={{ background: "rgba(0,180,216,0.1)" }} />
          </div>
        )}

        {/* ── STEP 1: Player Details ─────────────────────────────── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.6rem", letterSpacing: 2, marginBottom: 20 }}>
              Player Details
            </h2>

            <div className="field-group">
              <label className="field-label">Player Full Name *</label>
              <input className={`field-input ${errors.playerName ? "error" : ""}`}
                placeholder="As per school ID" value={form.playerName}
                onChange={(e) => setField("playerName", e.target.value)} />
              {errors.playerName && <p className="error-msg">⚠ {errors.playerName}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Date of Birth *</label>
              <input type="date" className={`field-input ${errors.dob ? "error" : ""}`}
                value={form.dob} max="2020-12-31" min="2010-01-01"
                onChange={(e) => setField("dob", e.target.value)} />
              {form.age && !errors.dob && (
                <p style={{ color: "#00b4d8", fontSize: "0.78rem", marginTop: 4 }}>
                  ✓ Age as on Dec 31, 2025: <strong>{form.age} years</strong>
                </p>
              )}
              {errors.dob && <p className="error-msg">⚠ {errors.dob}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Gender *</label>
              <div style={{ display: "flex", gap: 10 }}>
                {(["Male", "Female"] as const).map((g) => (
                  <button key={g} className={`gender-btn ${form.gender === g ? "selected" : ""}`}
                    onClick={() => setField("gender", g)}>{g}</button>
                ))}
              </div>
              {errors.gender && <p className="error-msg">⚠ {errors.gender}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">School / Academy *</label>
              <input className={`field-input ${errors.school ? "error" : ""}`}
                placeholder="Your school or coaching academy"
                value={form.school} onChange={(e) => setField("school", e.target.value)} />
              {errors.school && <p className="error-msg">⚠ {errors.school}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Player Mobile Number *</label>
              <input type="tel" className={`field-input ${errors.playerPhone ? "error" : ""}`}
                placeholder="10-digit number" maxLength={10}
                value={form.playerPhone} onChange={(e) => setField("playerPhone", e.target.value.replace(/\D/g, ""))} />
              {errors.playerPhone && <p className="error-msg">⚠ {errors.playerPhone}</p>}
            </div>

            <p className="section-title">Parent / Guardian</p>

            <div className="field-group">
              <label className="field-label">Parent / Guardian Name *</label>
              <input className={`field-input ${errors.parentName ? "error" : ""}`}
                placeholder="Full name" value={form.parentName}
                onChange={(e) => setField("parentName", e.target.value)} />
              {errors.parentName && <p className="error-msg">⚠ {errors.parentName}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Parent Mobile Number *</label>
              <input type="tel" className={`field-input ${errors.parentPhone ? "error" : ""}`}
                placeholder="10-digit number" maxLength={10}
                value={form.parentPhone} onChange={(e) => setField("parentPhone", e.target.value.replace(/\D/g, ""))} />
              {errors.parentPhone && <p className="error-msg">⚠ {errors.parentPhone}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Email Address *</label>
              <input type="email" className={`field-input ${errors.email ? "error" : ""}`}
                placeholder="For payment receipt" value={form.email}
                onChange={(e) => setField("email", e.target.value)} />
              {errors.email && <p className="error-msg">⚠ {errors.email}</p>}
            </div>

            <div style={{ marginTop: 28 }}>
              <button className="btn-primary" onClick={() => { if (validateStep1()) setStep(2); }}>
                NEXT: SELECT EVENTS →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Event Selection + Payment ─────────────────── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.6rem", letterSpacing: 2, marginBottom: 4 }}>
              Select Events
            </h2>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: 20, letterSpacing: 0.5 }}>
              Only events eligible for {form.gender}, age {form.age} are shown
            </p>

            {/* Fee legend */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              <span className="fee-badge">Singles ₹600</span>
              <span className="fee-badge">Doubles ₹900</span>
            </div>

            {errors.events && <p className="error-msg" style={{ marginBottom: 12 }}>⚠ {errors.events}</p>}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {eligible.map((ev) => {
                const selected = form.selectedEvents.includes(ev.code);
                return (
                  <div key={ev.code}>
                    <div className={`event-card ${selected ? "selected" : ""}`}
                      onClick={() => toggleEvent(ev.code)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: 4,
                            border: `2px solid ${selected ? "#00b4d8" : "rgba(255,255,255,0.2)"}`,
                            background: selected ? "#00b4d8" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            {selected && <span style={{ fontSize: 12, color: "white", fontWeight: 700 }}>✓</span>}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{ev.label}</span>
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: 700 }}>
                          ₹{ev.type === "singles" ? 600 : 900}
                        </span>
                      </div>
                    </div>

                    {/* Partner details for doubles */}
                    {selected && ev.type === "doubles" && (
                      <div style={{
                        background: "rgba(0,180,216,0.06)", border: "1px solid rgba(0,180,216,0.2)",
                        borderRadius: "0 0 8px 8px", padding: "14px", marginTop: -2,
                      }}>
                        <p style={{ fontSize: "0.72rem", color: "#00b4d8", fontWeight: 700,
                          letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>
                          Partner Details — {ev.label}
                        </p>
                        {[
                          { field: "name" as keyof Partner, label: "Partner Full Name", placeholder: "Full name" },
                          { field: "age" as keyof Partner, label: "Partner Age", placeholder: "Age in years" },
                          { field: "school" as keyof Partner, label: "Partner School / Academy", placeholder: "School name" },
                          { field: "phone" as keyof Partner, label: "Partner Mobile", placeholder: "10-digit number" },
                        ].map(({ field, label, placeholder }) => (
                          <div key={field} style={{ marginBottom: 10 }}>
                            <label className="field-label">{label} *</label>
                            <input
                              type={field === "phone" ? "tel" : field === "age" ? "number" : "text"}
                              className={`field-input ${errors[`${ev.code}_${field}`] ? "error" : ""}`}
                              placeholder={placeholder}
                              maxLength={field === "phone" ? 10 : undefined}
                              value={form.partners[ev.code]?.[field] || ""}
                              onChange={(e) => setPartnerField(ev.code, field,
                                field === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value)} />
                            {errors[`${ev.code}_${field}`] && (
                              <p className="error-msg">⚠ {errors[`${ev.code}_${field}`]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Fee Summary */}
            {form.selectedEvents.length > 0 && (
              <div style={{
                margin: "24px 0 0",
                background: "rgba(255,215,0,0.07)",
                border: "1px solid rgba(255,215,0,0.25)",
                borderRadius: 8, padding: "16px",
              }}>
                <p style={{ fontSize: "0.72rem", color: "#ffd700", fontWeight: 700,
                  letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Fee Summary</p>
                {form.selectedEvents.map((code) => {
                  const ev = EVENTS.find((x) => x.code === code)!;
                  return (
                    <div key={code} style={{ display: "flex", justifyContent: "space-between",
                      fontSize: "0.88rem", marginBottom: 6 }}>
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>{ev.label}</span>
                      <span style={{ fontWeight: 700 }}>₹{ev.type === "singles" ? 600 : 900}</span>
                    </div>
                  );
                })}
                <div style={{ borderTop: "1px solid rgba(255,215,0,0.2)", marginTop: 10, paddingTop: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue'", letterSpacing: 2, fontSize: "1.1rem" }}>
                    TOTAL PAYABLE
                  </span>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.6rem", color: "#ffd700" }}>
                    ₹{totalFee}
                  </span>
                </div>
              </div>
            )}

            {submitError && (
              <div style={{ background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.4)",
                borderRadius: 8, padding: 14, marginTop: 16, fontSize: "0.85rem", color: "#ff4757" }}>
                ⚠ {submitError}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <button style={{
                flex: "0 0 80px", padding: "14px", borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
                color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.9rem", fontWeight: 600,
              }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" disabled={paying || form.selectedEvents.length === 0}
                onClick={handlePayment}>
                {paying ? "OPENING PAYMENT..." : `PAY ₹${totalFee} & REGISTER`}
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)",
              marginTop: 12, letterSpacing: 0.5 }}>
              🔒 Secured by Razorpay · UPI, Cards, Net Banking accepted
            </p>
          </div>
        )}

        {/* ── STEP 3: Success ───────────────────────────────────── */}
        {step === 3 && paymentDone && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(0,180,216,0.15)", border: "2px solid #00b4d8",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", fontSize: 36,
            }}>🏸</div>

            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "2rem", letterSpacing: 3,
              color: "#00b4d8", marginBottom: 8 }} className="glow">
              Registration Complete!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24 }}>
              Welcome aboard, <strong style={{ color: "white" }}>{form.playerName}</strong>!<br />
              Your entry for <strong style={{ color: "#ffd700" }}>{form.selectedEvents.length} event(s)</strong> is confirmed.<br />
              A receipt has been sent to <strong style={{ color: "white" }}>{form.email}</strong>.
            </p>

            {/* Events registered */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8,
              padding: "14px 18px", marginBottom: 28, textAlign: "left" }}>
              <p style={{ fontSize: "0.72rem", color: "#00b4d8", fontWeight: 700,
                letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Registered Events</p>
              {form.selectedEvents.map((code) => {
                const ev = EVENTS.find((x) => x.code === code)!;
                return (
                  <div key={code} style={{ display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#00b4d8" }}>✓</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{ev.label}</span>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer" style={{
              display: "block", background: "linear-gradient(135deg, #25d366, #128c7e)",
              color: "white", textDecoration: "none", borderRadius: 8, padding: "16px",
              fontFamily: "'Bebas Neue'", fontSize: "1.2rem", letterSpacing: 2,
              boxShadow: "0 4px 24px rgba(37,211,102,0.3)", marginBottom: 16,
            }}>
              📲 JOIN PARTICIPANTS WHATSAPP GROUP
            </a>

            <div style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: 8, padding: "14px", fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              <strong style={{ color: "#ffd700" }}>📅 Dates:</strong> 6th–7th June<br />
              <strong style={{ color: "#ffd700" }}>📍 Venue:</strong> RPUG Badminton Court, NiBM<br />
              <strong style={{ color: "#ffd700" }}>🏆 Prizes:</strong> Cash Prize, Medals & Gifts
            </div>

            <p style={{ marginTop: 20, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)",
              fontFamily: "'Bebas Neue'", letterSpacing: 2 }}>
              PLAY HARD · SMASH LIMITS · BE A CHAMPION
            </p>
          </div>
        )}
      </div>
    </div>
  );
}