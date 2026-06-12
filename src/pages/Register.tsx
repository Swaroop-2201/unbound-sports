// import { useState, useEffect } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type EventCode =
//   | "BS_U11" | "GS_U11"
//   | "BS_U13" | "GS_U13" | "BD_U13" | "GD_U13"
//   | "BS_U15" | "GS_U15" | "BD_U15" | "GD_U15" | "XD_U15";

// interface EventOption {
//   code: EventCode;
//   label: string;
//   type: "singles" | "doubles";
//   gender: "boys" | "girls" | "mixed";
//   ageGroup: "U11" | "U13" | "U15";
// }

// interface Partner {
//   name: string;
//   dob: string;
// }

// interface FormData {
//   playerName: string;
//   dob: string;
//   age: string;
//   gender: "Male" | "Female" | "";
//   whatsapp: string;
//   email: string;
//   selectedEvents: EventCode[];
//   partners: Partial<Record<EventCode, Partner>>;
// }

// // ─── Constants ────────────────────────────────────────────────────────────────
// const EVENTS: EventOption[] = [
//   { code: "BS_U11", label: "Boys Singles U11", type: "singles", gender: "boys", ageGroup: "U11" },
//   { code: "GS_U11", label: "Girls Singles U11", type: "singles", gender: "girls", ageGroup: "U11" },
//   { code: "BS_U13", label: "Boys Singles U13", type: "singles", gender: "boys", ageGroup: "U13" },
//   { code: "GS_U13", label: "Girls Singles U13", type: "singles", gender: "girls", ageGroup: "U13" },
//   { code: "BD_U13", label: "Boys Doubles U13", type: "doubles", gender: "boys", ageGroup: "U13" },
//   { code: "GD_U13", label: "Girls Doubles U13", type: "doubles", gender: "girls", ageGroup: "U13" },
//   { code: "BS_U15", label: "Boys Singles U15", type: "singles", gender: "boys", ageGroup: "U15" },
//   { code: "GS_U15", label: "Girls Singles U15", type: "singles", gender: "girls", ageGroup: "U15" },
//   { code: "BD_U15", label: "Boys Doubles U15", type: "doubles", gender: "boys", ageGroup: "U15" },
//   { code: "GD_U15", label: "Girls Doubles U15", type: "doubles", gender: "girls", ageGroup: "U15" },
//   { code: "XD_U15", label: "Mixed Doubles U15", type: "doubles", gender: "mixed", ageGroup: "U15" },
// ];

// const SINGLES_FEE = 600;
// const DOUBLES_FEE = 900;

// // ── Replace these three values before going live ──────────────────────────────
// const RAZORPAY_KEY = "rzp_live_SoktAIRMkzPSfy";
// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5HcznV76xSm6OqErt5BSsO4hYRrSgLgjNhNHMEYI_Etv47CUPxMmhXImBDWefvK8-Bw/exec";
// const WHATSAPP_INVITE = "https://chat.whatsapp.com/GKwo9EKKog5AZCCPJvzCOC";

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function calculateAge(dob: string): number {
//   const birth = new Date(dob);
//   const cutoff = new Date("2026-05-01");
//   let age = cutoff.getFullYear() - birth.getFullYear();
//   const m = cutoff.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && cutoff.getDate() < birth.getDate())) age--;
//   return age;
// }
 
// function isEventEligible(event: EventOption, gender: string, age: number): boolean {
//   if (event.ageGroup === "U11" && age >= 11) return false;
//   if (event.ageGroup === "U13" && age >= 13) return false;
//   if (event.ageGroup === "U15" && age >= 15) return false;
//   if (event.gender === "boys" && gender !== "Male") return false;
//   if (event.gender === "girls" && gender !== "Female") return false;
//   return true;
// }
 
// function calcFee(selected: EventCode[]): number {
//   return selected.reduce((sum, code) => {
//     const ev = EVENTS.find((e) => e.code === code)!;
//     return sum + (ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE);
//   }, 0);
// }
 
// declare global {
//   interface Window { Razorpay: any; }
// }
 
// // ─── Component ────────────────────────────────────────────────────────────────
// export default function Register() {
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [form, setForm] = useState<FormData>({
//     playerName: "", dob: "", age: "", gender: "",
//     whatsapp: "", email: "",
//     selectedEvents: [], partners: {},
//   });
//   const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
//   const [paying, setPaying] = useState(false);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [submitError, setSubmitError] = useState("");
 
//   useEffect(() => {
//     const s = document.createElement("script");
//     s.src = "https://checkout.razorpay.com/v1/checkout.js";
//     s.async = true;
//     document.body.appendChild(s);
//     return () => { document.body.removeChild(s); };
//   }, []);
 
//   useEffect(() => {
//     if (form.dob) {
//       const age = calculateAge(form.dob);
//       setForm((f) => ({ ...f, age: String(age), selectedEvents: [], partners: {} }));
//     }
//   }, [form.dob]);
 
//   const eligible = EVENTS.filter((e) =>
//     form.age && form.gender ? isEventEligible(e, form.gender, Number(form.age)) : true
//   );
//   const totalFee = calcFee(form.selectedEvents);
 
//   function validateStep1() {
//     const e: typeof errors = {};
//     if (!form.playerName.trim()) e.playerName = "Required";
//     if (!form.dob) e.dob = "Required";
//     else { const a = calculateAge(form.dob); if (a < 5 || a > 16) e.dob = "Age must be 5–15 years as of Dec 31, 2025"; }
//     if (!form.gender) e.gender = "Required";
//     if (!/^\d{10}$/.test(form.whatsapp)) e.whatsapp = "Enter a valid 10-digit number";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }
 
//   function validateStep2() {
//     const e: typeof errors = {};
//     if (form.selectedEvents.length === 0) e.events = "Please select at least one event";
//     form.selectedEvents.forEach((code) => {
//       const ev = EVENTS.find((x) => x.code === code)!;
//       if (ev.type === "doubles") {
//         const p = form.partners[code];
//         if (!p?.name?.trim()) e[`${code}_name`] = "Required";
//         if (!p?.dob) e[`${code}_dob`] = "Required";
//         else { const a = calculateAge(p.dob); if (a < 5 || a > 16) e[`${code}_dob`] = "Age must be 5–15 years as of Dec 31, 2025"; }
//       }
//     });
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }
 
//   async function submitToSheets(paymentId: string) {
//     const rows = form.selectedEvents.map((code) => {
//       const ev = EVENTS.find((x) => x.code === code)!;
//       const partner = form.partners[code];
//       return {
//         timestamp: new Date().toISOString(),
//         playerName: form.playerName, dob: form.dob, age: form.age, gender: form.gender,
//         whatsapp: form.whatsapp, email: form.email,
//         event: ev.label, eventType: ev.type,
//         partnerName: partner?.name || "",
//         partnerDob: partner?.dob || "",
//         partnerAge: partner?.dob ? String(calculateAge(partner.dob)) : "",
//         feePaid: ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE,
//         paymentId,
//       };
//     });
//     await fetch(GOOGLE_SCRIPT_URL, {
//       method: "POST", mode: "no-cors",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ rows }),
//     });
//   }
 
//   function handlePayment() {
//     if (!validateStep2()) return;
//     if (!window.Razorpay) { setSubmitError("Payment gateway failed to load. Please refresh."); return; }
//     setPaying(true); setSubmitError("");
//     const options = {
//       key: RAZORPAY_KEY, amount: totalFee * 100, currency: "INR",
//       name: "Badminton 360 Events",
//       description: `VSA-360 Tournament — ${form.selectedEvents.length} event(s)`,
//       prefill: { name: form.playerName, email: form.email, contact: form.whatsapp },
//       notes: { player: form.playerName, events: form.selectedEvents.join(", ") },
//       theme: { color: "#1c1c1e" },
//       handler: async (response: { razorpay_payment_id: string }) => {
//         try {
//           await submitToSheets(response.razorpay_payment_id);
//           setPaymentDone(true); setStep(3);
//         } catch {
//           setSubmitError("Payment confirmed but data save failed. Payment ID: " + response.razorpay_payment_id);
//         } finally { setPaying(false); }
//       },
//       modal: { ondismiss: () => setPaying(false) },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.on("payment.failed", (r: any) => { setPaying(false); setSubmitError(`Payment failed: ${r.error.description}`); });
//     rzp.open();
//   }
 
//   const setField = (key: keyof FormData, val: string) => {
//     setForm((f) => ({ ...f, [key]: val }));
//     setErrors((e) => ({ ...e, [key]: undefined }));
//   };
 
//   const toggleEvent = (code: EventCode) => {
//     setForm((f) => {
//       const has = f.selectedEvents.includes(code);
//       return {
//         ...f,
//         selectedEvents: has ? f.selectedEvents.filter((c) => c !== code) : [...f.selectedEvents, code],
//         partners: has ? (() => { const p = { ...f.partners }; delete p[code]; return p; })() : f.partners,
//       };
//     });
//     setErrors((e) => ({ ...e, events: undefined }));
//   };
 
//   const setPartnerField = (code: EventCode, field: keyof Partner, val: string) => {
//     setForm((f) => ({
//       ...f,
//       partners: { ...f.partners, [code]: { ...f.partners[code], [field]: val } },
//     }));
//     setErrors((e) => ({ ...e, [`${code}_${field}`]: undefined }));
//   };
 
//   return (
//     <div style={{ minHeight: "100vh", background: "#f4f2ef", fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.35; cursor: pointer; }
//         .fi { width:100%; background:#fff; border:1px solid #e0dbd4; border-radius:9px; padding:13px 15px; font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:400; color:#1a1a1a; transition:border-color .18s,box-shadow .18s; -webkit-appearance:none; }
//         .fi::placeholder{color:#c2bdb6;}
//         .fi:focus{outline:none;border-color:#1a1a1a;box-shadow:0 0 0 3px rgba(26,26,26,.07);}
//         .fi.err{border-color:#c0392b;}
//         .bp{width:100%;background:#1a1a1a;color:#fff;border:none;border-radius:9px;padding:15px 24px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;cursor:pointer;transition:background .18s;}
//         .bp:hover{background:#2c2c2c;}
//         .bp:disabled{opacity:.38;cursor:not-allowed;}
//         .bk{background:none;border:1.5px solid #e0dbd4;border-radius:9px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#999;cursor:pointer;transition:border-color .18s,color .18s;flex-shrink:0;}
//         .bk:hover{border-color:#999;color:#555;}
//         .fl{margin-bottom:20px;}
//         .flabel{display:flex;justify-content:space-between;align-items:baseline;font-size:.67rem;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:#888;margin-bottom:7px;}
//         .flabel .fe{color:#c0392b;font-weight:500;text-transform:none;letter-spacing:0;font-size:.69rem;}
//         .nt{background:#f9f8f5;border-left:2.5px solid #d4c9b8;border-radius:0 6px 6px 0;padding:9px 12px;font-size:.74rem;color:#999;margin-top:8px;line-height:1.55;}
//         .ab{display:inline-flex;align-items:center;gap:5px;background:#f0ece5;border:1px solid #ddd8d0;border-radius:20px;padding:4px 11px;font-size:.71rem;font-weight:500;color:#6b6350;margin-top:8px;}
//         .abd{width:5px;height:5px;border-radius:50%;background:#a0896a;}
//         .gb{flex:1;padding:13px;border-radius:9px;border:1.5px solid #e0dbd4;background:#fff;color:#888;font-family:'DM Sans',sans-serif;font-size:.87rem;font-weight:500;cursor:pointer;transition:all .18s;}
//         .gb.on{border-color:#1a1a1a;background:#1a1a1a;color:#fff;}
//         .ec{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e0dbd4;border-radius:9px;padding:14px 15px;cursor:pointer;transition:all .18s;user-select:none;margin-bottom:8px;}
//         .ec:hover{border-color:#c0b9b0;}
//         .ec.on{border-color:#1a1a1a;background:#fafaf8;}
//         .ebox{width:19px;height:19px;flex-shrink:0;border-radius:5px;border:1.5px solid #ddd;background:#fff;display:flex;align-items:center;justify-content:center;transition:all .18s;}
//         .ec.on .ebox{background:#1a1a1a;border-color:#1a1a1a;}
//         .etick{width:9px;height:5px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(-45deg) translateY(-1px);opacity:0;transition:opacity .12s;}
//         .ec.on .etick{opacity:1;}
//         .en{flex:1;font-size:.87rem;font-weight:500;color:#1a1a1a;}
//         .ef{font-size:.78rem;font-weight:600;color:#aaa;}
//         .ec.on .ef{color:#a0896a;}
//         .pb{background:#f9f7f4;border:1px solid #ece7e0;border-radius:9px;padding:18px;margin-top:2px;margin-bottom:10px;}
//         .pbl{font-size:.63rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#a0896a;margin-bottom:14px;}
//         .fb{background:#fff;border:1px solid #e0dbd4;border-radius:9px;padding:20px;margin-bottom:20px;}
//         .fbt{font-size:.63rem;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#bbb;margin-bottom:14px;}
//         .fr{display:flex;justify-content:space-between;align-items:center;font-size:.84rem;color:#666;padding:7px 0;border-bottom:1px solid #f2ede6;}
//         .fr:last-of-type{border-bottom:none;}
//         .ftot{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:14px;border-top:1.5px solid #1a1a1a;}
//         .ftotl{font-size:.67rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#1a1a1a;}
//         .ftota{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:600;color:#1a1a1a;line-height:1;}
//         .eb{background:#fef5f5;border:1px solid #f5c6c6;border-radius:9px;padding:13px 15px;font-size:.81rem;color:#c0392b;margin-bottom:14px;line-height:1.5;}
//         .div{height:1px;background:#ece7e0;margin:26px 0;}
//         .lc{font-size:.67rem;font-weight:500;letter-spacing:.5px;background:#fff;border:1px solid #e0dbd4;border-radius:20px;padding:4px 12px;color:#888;}
//         .si{width:60px;height:60px;border-radius:50%;background:#f0ece5;border:1.5px solid #d4c9b8;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:1.7rem;}
//         .ser{display:flex;align-items:center;gap:9px;padding:12px 16px;border-bottom:1px solid #f2ede6;font-size:.85rem;color:#555;}
//         .ser:last-child{border-bottom:none;}
//         .sd{width:5px;height:5px;border-radius:50%;background:#a0896a;flex-shrink:0;}
//         .wb{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;background:#25d366;color:#fff;border:none;border-radius:9px;padding:15px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;text-decoration:none;margin-bottom:14px;}
//         .is{background:#fff;border:1px solid #e0dbd4;border-radius:9px;padding:18px;font-size:.81rem;color:#888;line-height:2.1;}
//         .is strong{color:#1a1a1a;font-weight:600;}
//         .sn{text-align:center;font-size:.67rem;color:#c2bdb6;letter-spacing:.5px;margin-top:12px;}
//       `}</style>
 
//       {/* ── Header ───────────────────────────────────────────── */}
//       <div style={{
//         background: "#1a1a1a",
//         padding: "36px 24px 30px",
//         textAlign: "center",
//         position: "relative",
//         overflow: "hidden",
//       }}>
//         {/* subtle texture lines */}
//         <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.025) 39px,rgba(255,255,255,.025) 40px)",pointerEvents:"none" }} />
//         <p style={{ fontSize:".63rem",fontWeight:600,letterSpacing:"4px",textTransform:"uppercase",color:"rgba(212,175,97,.7)",marginBottom:10,position:"relative" }}>
//           Badminton 360 Events · Presents
//         </p>
//         <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2.3rem",fontWeight:600,color:"#f5f0e8",lineHeight:1.15,letterSpacing:".3px",position:"relative" }}>
//           VSA-360 <span style={{ fontStyle:"italic",fontWeight:400,color:"rgba(212,175,97,.85)" }}>Internal</span>
//           <br />Badminton Tournament
//         </h1>
//         <div style={{ display:"flex",justifyContent:"center",gap:"18px",marginTop:"18px",position:"relative" }}>
//           {["First Edition","6–7 June","RPUG Court, NiBM"].map((t) => (
//             <span key={t} style={{ fontSize:".63rem",fontWeight:500,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)" }}>{t}</span>
//           ))}
//         </div>
//         {/* gold rule */}
//         <div style={{ height:"1px",background:"linear-gradient(90deg,transparent,rgba(212,175,97,.35),transparent)",marginTop:"26px",position:"relative" }} />
//       </div>
 
//       {/* ── Form ─────────────────────────────────────────────── */}
//       <div style={{ maxWidth:460,margin:"0 auto",padding:"32px 18px 60px" }}>
 
//         {/* Step bar */}
//         {step < 3 && (
//           <div style={{ display:"flex",alignItems:"flex-start",gap:0,marginBottom:"32px" }}>
//             {[{n:1,label:"Details"},{n:2,label:"Events"},{n:3,label:"Payment"}].map(({n,label},i,arr) => (
//               <div key={n} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative" }}>
//                 {i < arr.length-1 && (
//                   <div style={{ position:"absolute",top:13,left:"50%",width:"100%",height:"1px",background:step>n?"#a0896a":"#e0dbd4",transition:"background .3s",zIndex:0 }} />
//                 )}
//                 <div style={{
//                   width:27,height:27,borderRadius:"50%",
//                   border:`1.5px solid ${step===n?"#1a1a1a":step>n?"#a0896a":"#ddd"}`,
//                   background:step===n?"#1a1a1a":step>n?"#a0896a":"#f4f2ef",
//                   color:step>=n?"#fff":"#bbb",
//                   fontSize:".7rem",fontWeight:600,
//                   display:"flex",alignItems:"center",justifyContent:"center",
//                   position:"relative",zIndex:1,transition:"all .25s",
//                 }}>
//                   {step>n?"✓":n}
//                 </div>
//                 <span style={{ fontSize:".59rem",letterSpacing:"1.5px",textTransform:"uppercase",color:step===n?"#1a1a1a":"#bbb",marginTop:5,fontWeight:600,transition:"color .25s" }}>
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
 
//         {/* ══ STEP 1 ══════════════════════════════════════════ */}
//         {step === 1 && (
//           <>
//             <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:600,color:"#1a1a1a",marginBottom:4 }}>
//               Your Details
//             </h2>
//             <p style={{ fontSize:".78rem",color:"#aaa",marginBottom:28,lineHeight:1.5 }}>
//               Just the essentials — takes under a minute.
//             </p>
 
//             <div className="fl">
//               <div className="flabel"><span>Full Name</span>{errors.playerName&&<span className="fe">{errors.playerName}</span>}</div>
//               <input className={`fi${errors.playerName?" err":""}`} placeholder="As per school ID card"
//                 value={form.playerName} onChange={(e)=>setField("playerName",e.target.value)} />
//             </div>
 
//             <div className="fl">
//               <div className="flabel"><span>Date of Birth</span>{errors.dob&&<span className="fe">{errors.dob}</span>}</div>
//               <input type="date" className={`fi${errors.dob?" err":""}`}
//                 value={form.dob} min="2010-01-01" max="2020-12-31"
//                 onChange={(e)=>setField("dob",e.target.value)} />
//               {form.age&&!errors.dob&&(
//                 <div className="ab"><span className="abd"/><span>Age — <strong>{form.age} yrs</strong></span></div>
//               )}
 
//             </div>
 
//             <div className="fl">
//               <div className="flabel"><span>Gender</span>{errors.gender&&<span className="fe">{errors.gender}</span>}</div>
//               <div style={{ display:"flex",gap:10 }}>
//                 {(["Male","Female"] as const).map((g)=>(
//                   <button key={g} className={`gb${form.gender===g?" on":""}`}
//                     onClick={()=>setField("gender",g)}>{g}</button>
//                 ))}
//               </div>
//             </div>
 
//             <div className="div"/>
 
//             <div className="fl">
//               <div className="flabel"><span>WhatsApp Number</span>{errors.whatsapp&&<span className="fe">{errors.whatsapp}</span>}</div>
//               <input type="tel" className={`fi${errors.whatsapp?" err":""}`}
//                 placeholder="10-digit mobile number" maxLength={10}
//                 value={form.whatsapp} onChange={(e)=>setField("whatsapp",e.target.value.replace(/\D/g,""))} />
//               <div className="nt">You'll be added to the participants WhatsApp group post-registration.</div>
//             </div>
 
//             <div className="fl">
//               <div className="flabel"><span>Email Address</span>{errors.email&&<span className="fe">{errors.email}</span>}</div>
//               <input type="email" className={`fi${errors.email?" err":""}`}
//                 placeholder="For payment receipt"
//                 value={form.email} onChange={(e)=>setField("email",e.target.value)} />
//             </div>
 
//             <button className="bp" style={{ marginTop:4 }} onClick={()=>{ if(validateStep1()) setStep(2); }}>
//               Continue to Events
//             </button>
//           </>
//         )}
 
//         {/* ══ STEP 2 ══════════════════════════════════════════ */}
//         {step === 2 && (
//           <>
//             <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:600,color:"#1a1a1a",marginBottom:4 }}>
//               Select Events
//             </h2>
//             <p style={{ fontSize:".78rem",color:"#aaa",marginBottom:20,lineHeight:1.5 }}>
//               Eligible for {form.gender==="Male"?"boys":"girls"}, age {form.age} — tap to select.
//             </p>
 
//             <div style={{ display:"flex",gap:8,marginBottom:20 }}>
//               <span className="lc">Singles — ₹600</span>
//               <span className="lc">Doubles — ₹900</span>
//             </div>
 
//             {errors.events&&<div className="eb">{errors.events}</div>}
 
//             <div>
//               {eligible.map((ev)=>{
//                 const sel = form.selectedEvents.includes(ev.code);
//                 return (
//                   <div key={ev.code}>
//                     <div className={`ec${sel?" on":""}`} onClick={()=>toggleEvent(ev.code)}>
//                       <div className="ebox"><div className="etick"/></div>
//                       <span className="en">{ev.label}</span>
//                       <span className="ef">₹{ev.type==="singles"?600:900}</span>
//                     </div>
//                     {sel&&ev.type==="doubles"&&(
//                       <div className="pb">
//                         <p className="pbl">Partner — {ev.label}</p>
//                         <div className="fl">
//                           <div className="flabel"><span>Partner Name</span>{errors[`${ev.code}_name`]&&<span className="fe">{errors[`${ev.code}_name`]}</span>}</div>
//                           <input className={`fi${errors[`${ev.code}_name`]?" err":""}`} placeholder="Full name"
//                             value={form.partners[ev.code]?.name||""}
//                             onChange={(e)=>setPartnerField(ev.code,"name",e.target.value)} />
//                         </div>
//                         <div className="fl" style={{ marginBottom:0 }}>
//                           <div className="flabel"><span>Partner Date of Birth</span>{errors[`${ev.code}_dob`]&&<span className="fe">{errors[`${ev.code}_dob`]}</span>}</div>
//                           <input type="date" className={`fi${errors[`${ev.code}_dob`]?" err":""}`}
//                             value={form.partners[ev.code]?.dob||""} min="2010-01-01" max="2020-12-31"
//                             onChange={(e)=>setPartnerField(ev.code,"dob",e.target.value)} />
//                           {form.partners[ev.code]?.dob&&!errors[`${ev.code}_dob`]&&(
//                             <div className="ab" style={{ marginTop:8 }}>
//                               <span className="abd"/>
//                               <span>Age — <strong>{calculateAge(form.partners[ev.code]!.dob)} yrs</strong></span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
 
//             {form.selectedEvents.length>0&&(
//               <div className="fb">
//                 <p className="fbt">Fee Summary</p>
//                 {form.selectedEvents.map((code)=>{
//                   const ev=EVENTS.find((x)=>x.code===code)!;
//                   return (
//                     <div key={code} className="fr">
//                       <span>{ev.label}</span>
//                       <span style={{ fontWeight:500 }}>₹{ev.type==="singles"?600:900}</span>
//                     </div>
//                   );
//                 })}
//                 <div className="ftot">
//                   <span className="ftotl">Total Payable</span>
//                   <span className="ftota">₹{totalFee}</span>
//                 </div>
//               </div>
//             )}
 
//             {submitError&&<div className="eb">{submitError}</div>}
 
//             <div style={{ display:"flex",gap:10,marginTop:4 }}>
//               <button className="bk" onClick={()=>setStep(1)}>← Back</button>
//               <button className="bp" style={{ flex:1,marginTop:0 }}
//                 disabled={paying||form.selectedEvents.length===0} onClick={handlePayment}>
//                 {paying?"Opening payment…":`Pay ₹${totalFee}`}
//               </button>
//             </div>
//             <p className="sn" style={{ marginTop:13 }}>🔒 Secured by Razorpay · UPI · Cards · Net Banking</p>
//           </>
//         )}
 
//         {/* ══ STEP 3 ══════════════════════════════════════════ */}
//         {step===3&&paymentDone&&(
//           <>
//             <div style={{ textAlign:"center",paddingTop:8 }}>
//               <div className="si">🏸</div>
//               <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.65rem",fontWeight:600,color:"#1a1a1a",marginBottom:6 }}>
//                 You're registered.
//               </h2>
//               <p style={{ fontSize:".82rem",color:"#999",lineHeight:1.7 }}>
//                 Welcome, <strong style={{ color:"#1a1a1a" }}>{form.playerName}</strong>.<br/>
//                 Receipt sent to <span style={{ color:"#1a1a1a" }}>{form.email}</span>.
//               </p>
//             </div>
 
//             <div style={{ background:"#fff",border:"1px solid #e0dbd4",borderRadius:9,overflow:"hidden",margin:"22px 0" }}>
//               <div style={{ padding:"12px 16px",borderBottom:"1px solid #f2ede6" }}>
//                 <span style={{ fontSize:".63rem",fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#bbb" }}>Registered Events</span>
//               </div>
//               {form.selectedEvents.map((code)=>{
//                 const ev=EVENTS.find((x)=>x.code===code)!;
//                 return (
//                   <div key={code} className="ser">
//                     <span className="sd"/>
//                     {ev.label}
//                   </div>
//                 );
//               })}
//             </div>
 
//             <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer" className="wb">
//               <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//               </svg>
//               Join Participants Group
//             </a>
 
//             <div className="is">
//               <strong>📅 Dates</strong> — 6th &amp; 7th June<br/>
//               <strong>📍 Venue</strong> — RPUG Badminton Court, NiBM<br/>
//               <strong>🏆 Prizes</strong> — Cash, Medals &amp; Gifts for winner &amp; runner-up
//             </div>
 
//             <p style={{ textAlign:"center",marginTop:24,fontSize:".68rem",color:"#ccc",fontStyle:"italic",letterSpacing:".5px" }}>
//               Play hard. Smash limits. Be a champion.
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EventCode =
  | "MS" | "WS" | "MD" | "WD" | "XD"
  | "MS40" | "WS40" | "MD40" | "WD40" | "XD40";

interface EventOption {
  code: EventCode;
  label: string;
  type: "singles" | "doubles";
}

interface FormData {
  playerName: string;
  mobile: string;
  email: string;
  selectedEvents: EventCode[];
  partners: Partial<Record<EventCode, string>>;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const EVENTS: EventOption[] = [
  { code: "MS",   label: "Men's Singles",        type: "singles" },
  { code: "WS",   label: "Women's Singles",       type: "singles" },
  { code: "MD",   label: "Men's Doubles",         type: "doubles" },
  { code: "WD",   label: "Women's Doubles",       type: "doubles" },
  { code: "XD",   label: "Mixed Doubles",         type: "doubles" },
  { code: "MS40", label: "Men's Singles 40+",     type: "singles" },
  { code: "WS40", label: "Women's Singles 40+",   type: "singles" },
  { code: "MD40", label: "Men's Doubles 40+",     type: "doubles" },
  { code: "WD40", label: "Women's Doubles 40+",   type: "doubles" },
  { code: "XD40", label: "Mixed Doubles 40+",     type: "doubles" },
];

const SINGLES_FEE = 900;
const DOUBLES_FEE = 1600;

// ── Replace these values before going live ────────────────────────────────────
const RAZORPAY_KEY = "rzp_test_Soj1b6PIOdorl7";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzvFw9vZlvR0TmBKWP-Zbg5OFbkxpOtrv99fCfgQJAFT1smYg5MPbPEkTlK0Zhk03s1Sg/exec";
const WHATSAPP_INVITE = "https://chat.whatsapp.com/BnATDgJY1e91uOAF4eMFv4";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcFee(selected: EventCode[]): number {
  return selected.reduce((sum, code) => {
    const ev = EVENTS.find((e) => e.code === code)!;
    return sum + (ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE);
  }, 0);
}

declare global {
  interface Window { Razorpay: any; }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Register() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>({
    playerName: "",
    mobile: "",
    email: "",
    selectedEvents: [],
    partners: {},
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [paying, setPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  const totalFee = calcFee(form.selectedEvents);

  function validateStep1() {
    const e: typeof errors = {};
    if (!form.playerName.trim()) e.playerName = "Required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: typeof errors = {};
    if (form.selectedEvents.length === 0) e.events = "Please select at least one event";
    form.selectedEvents.forEach((code) => {
      const ev = EVENTS.find((x) => x.code === code)!;
      if (ev.type === "doubles") {
        const partnerName = form.partners[code];
        if (!partnerName?.trim()) e[`${code}_name`] = "Required";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Google Sheets submission ──────────────────────────────────────────────
  // Each event goes to its own sheet (sheetName = event code).
  // For doubles the partner is sent as a separate row immediately below the
  // player row. The Apps Script should:
  //   1. Route each row to the sheet matching row.sheetName
  //   2. Auto-increment Sr No. (count existing data rows + 1)
  //   3. Write: Sr No. | Name | Event | Mobile Number | Email
  //   4. For partner rows (isPartner: true) write name in the Name column,
  //      leave Mobile Number and Email blank.
  async function submitToSheets(paymentId: string) {
    const rows = form.selectedEvents.flatMap((code) => {
      const ev = EVENTS.find((x) => x.code === code)!;
      const partnerName = form.partners[code] || "";
      const playerRow = {
        sheetName: code,
        name: form.playerName,
        event: ev.label,
        mobile: form.mobile,
        email: form.email,
        isPartner: false,
        paymentId,
      };
      if (ev.type === "doubles" && partnerName) {
        const partnerRow = {
          sheetName: code,
          name: partnerName,
          event: ev.label,
          mobile: "",
          email: "",
          isPartner: true,
          paymentId,
        };
        return [playerRow, partnerRow];
      }
      return [playerRow];
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
  }

  function handlePayment() {
    if (!validateStep2()) return;
    if (!window.Razorpay) { setSubmitError("Payment gateway failed to load. Please refresh."); return; }
    setPaying(true); setSubmitError("");
    const options = {
      key: RAZORPAY_KEY,
      amount: totalFee * 100,
      currency: "INR",
      name: "Badminton 360 Events",
      description: `Tournament — ${form.selectedEvents.length} event(s)`,
      prefill: { name: form.playerName, email: form.email, contact: form.mobile },
      notes: { player: form.playerName, events: form.selectedEvents.join(", ") },
      theme: { color: "#1c1c1e" },
      handler: async (response: { razorpay_payment_id: string }) => {
        try {
          await submitToSheets(response.razorpay_payment_id);
          setPaymentDone(true); setStep(3);
        } catch {
          setSubmitError("Payment confirmed but data save failed. Payment ID: " + response.razorpay_payment_id);
        } finally { setPaying(false); }
      },
      modal: { ondismiss: () => setPaying(false) },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (r: any) => { setPaying(false); setSubmitError(`Payment failed: ${r.error.description}`); });
    rzp.open();
  }

  const setField = (key: keyof Omit<FormData, "selectedEvents" | "partners">, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleEvent = (code: EventCode) => {
    setForm((f) => {
      const has = f.selectedEvents.includes(code);
      return {
        ...f,
        selectedEvents: has ? f.selectedEvents.filter((c) => c !== code) : [...f.selectedEvents, code],
        partners: has
          ? (() => { const p = { ...f.partners }; delete p[code]; return p; })()
          : f.partners,
      };
    });
    setErrors((e) => ({ ...e, events: undefined }));
  };

  const setPartnerName = (code: EventCode, val: string) => {
    setForm((f) => ({ ...f, partners: { ...f.partners, [code]: val } }));
    setErrors((e) => ({ ...e, [`${code}_name`]: undefined }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ef", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .fi { width:100%; background:#fff; border:1px solid #e0dbd4; border-radius:9px; padding:13px 15px; font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:400; color:#1a1a1a; transition:border-color .18s,box-shadow .18s; -webkit-appearance:none; }
        .fi::placeholder{color:#c2bdb6;}
        .fi:focus{outline:none;border-color:#1a1a1a;box-shadow:0 0 0 3px rgba(26,26,26,.07);}
        .fi.err{border-color:#c0392b;}
        .bp{width:100%;background:#1a1a1a;color:#fff;border:none;border-radius:9px;padding:15px 24px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;cursor:pointer;transition:background .18s;}
        .bp:hover{background:#2c2c2c;}
        .bp:disabled{opacity:.38;cursor:not-allowed;}
        .bk{background:none;border:1.5px solid #e0dbd4;border-radius:9px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#999;cursor:pointer;transition:border-color .18s,color .18s;flex-shrink:0;}
        .bk:hover{border-color:#999;color:#555;}
        .fl{margin-bottom:20px;}
        .flabel{display:flex;justify-content:space-between;align-items:baseline;font-size:.67rem;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:#888;margin-bottom:7px;}
        .flabel .fe{color:#c0392b;font-weight:500;text-transform:none;letter-spacing:0;font-size:.69rem;}
        .nt{background:#f9f8f5;border-left:2.5px solid #d4c9b8;border-radius:0 6px 6px 0;padding:9px 12px;font-size:.74rem;color:#999;margin-top:8px;line-height:1.55;}
        .ec{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e0dbd4;border-radius:9px;padding:14px 15px;cursor:pointer;transition:all .18s;user-select:none;margin-bottom:8px;}
        .ec:hover{border-color:#c0b9b0;}
        .ec.on{border-color:#1a1a1a;background:#fafaf8;}
        .ebox{width:19px;height:19px;flex-shrink:0;border-radius:5px;border:1.5px solid #ddd;background:#fff;display:flex;align-items:center;justify-content:center;transition:all .18s;}
        .ec.on .ebox{background:#1a1a1a;border-color:#1a1a1a;}
        .etick{width:9px;height:5px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(-45deg) translateY(-1px);opacity:0;transition:opacity .12s;}
        .ec.on .etick{opacity:1;}
        .en{flex:1;font-size:.87rem;font-weight:500;color:#1a1a1a;}
        .ef{font-size:.78rem;font-weight:600;color:#aaa;}
        .ec.on .ef{color:#a0896a;}
        .pb{background:#f9f7f4;border:1px solid #ece7e0;border-radius:9px;padding:18px;margin-top:2px;margin-bottom:10px;}
        .pbl{font-size:.63rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#a0896a;margin-bottom:14px;}
        .fb{background:#fff;border:1px solid #e0dbd4;border-radius:9px;padding:20px;margin-bottom:20px;}
        .fbt{font-size:.63rem;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#bbb;margin-bottom:14px;}
        .fr{display:flex;justify-content:space-between;align-items:center;font-size:.84rem;color:#666;padding:7px 0;border-bottom:1px solid #f2ede6;}
        .fr:last-of-type{border-bottom:none;}
        .ftot{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:14px;border-top:1.5px solid #1a1a1a;}
        .ftotl{font-size:.67rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#1a1a1a;}
        .ftota{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:600;color:#1a1a1a;line-height:1;}
        .eb{background:#fef5f5;border:1px solid #f5c6c6;border-radius:9px;padding:13px 15px;font-size:.81rem;color:#c0392b;margin-bottom:14px;line-height:1.5;}
        .div{height:1px;background:#ece7e0;margin:26px 0;}
        .lc{font-size:.67rem;font-weight:500;letter-spacing:.5px;background:#fff;border:1px solid #e0dbd4;border-radius:20px;padding:4px 12px;color:#888;}
        .si{width:60px;height:60px;border-radius:50%;background:#f0ece5;border:1.5px solid #d4c9b8;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;font-size:1.7rem;}
        .ser{display:flex;align-items:center;gap:9px;padding:12px 16px;border-bottom:1px solid #f2ede6;font-size:.85rem;color:#555;}
        .ser:last-child{border-bottom:none;}
        .sd{width:5px;height:5px;border-radius:50%;background:#a0896a;flex-shrink:0;}
        .wb{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;background:#25d366;color:#fff;border:none;border-radius:9px;padding:15px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;text-decoration:none;margin-bottom:14px;}
        .is{background:#fff;border:1px solid #e0dbd4;border-radius:9px;padding:18px;font-size:.81rem;color:#888;line-height:2.1;}
        .is strong{color:#1a1a1a;font-weight:600;}
        .sn{text-align:center;font-size:.67rem;color:#c2bdb6;letter-spacing:.5px;margin-top:12px;}
        .egroup-label{font-size:.6rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#bbb;margin:18px 0 8px;padding-left:2px;}
      `}</style>

      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{
        background: "#1a1a1a",
        padding: "36px 24px 30px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.025) 39px,rgba(255,255,255,.025) 40px)",pointerEvents:"none" }} />
        <p style={{ fontSize:".63rem",fontWeight:600,letterSpacing:"4px",textTransform:"uppercase",color:"rgba(212,175,97,.7)",marginBottom:10,position:"relative" }}>
          Badminton 360 Events · Presents
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2.3rem",fontWeight:600,color:"#f5f0e8",lineHeight:1.15,letterSpacing:".3px",position:"relative" }}>
          VSA-360 <span style={{ fontStyle:"italic",fontWeight:400,color:"rgba(212,175,97,.85)" }}>Internal</span>
          <br />Badminton Tournament
        </h1>
        <div style={{ display:"flex",justifyContent:"center",gap:"18px",marginTop:"18px",position:"relative",flexWrap:"wrap" }}>
          {["First Edition","6–7 June","RPUG Court, NiBM"].map((t) => (
            <span key={t} style={{ fontSize:".63rem",fontWeight:500,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)" }}>{t}</span>
          ))}
        </div>
        <div style={{ height:"1px",background:"linear-gradient(90deg,transparent,rgba(212,175,97,.35),transparent)",marginTop:"26px",position:"relative" }} />
      </div>

      {/* ── Form ─────────────────────────────────────────────── */}
      <div style={{ maxWidth:460,margin:"0 auto",padding:"32px 18px 60px" }}>

        {/* Step bar */}
        {step < 3 && (
          <div style={{ display:"flex",alignItems:"flex-start",gap:0,marginBottom:"32px" }}>
            {[{n:1,label:"Details"},{n:2,label:"Events"},{n:3,label:"Payment"}].map(({n,label},i,arr) => (
              <div key={n} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative" }}>
                {i < arr.length-1 && (
                  <div style={{ position:"absolute",top:13,left:"50%",width:"100%",height:"1px",background:step>n?"#a0896a":"#e0dbd4",transition:"background .3s",zIndex:0 }} />
                )}
                <div style={{
                  width:27,height:27,borderRadius:"50%",
                  border:`1.5px solid ${step===n?"#1a1a1a":step>n?"#a0896a":"#ddd"}`,
                  background:step===n?"#1a1a1a":step>n?"#a0896a":"#f4f2ef",
                  color:step>=n?"#fff":"#bbb",
                  fontSize:".7rem",fontWeight:600,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  position:"relative",zIndex:1,transition:"all .25s",
                }}>
                  {step>n?"✓":n}
                </div>
                <span style={{ fontSize:".59rem",letterSpacing:"1.5px",textTransform:"uppercase",color:step===n?"#1a1a1a":"#bbb",marginTop:5,fontWeight:600,transition:"color .25s" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ══ STEP 1 ══════════════════════════════════════════ */}
        {step === 1 && (
          <>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:600,color:"#1a1a1a",marginBottom:4 }}>
              Your Details
            </h2>
            <p style={{ fontSize:".78rem",color:"#aaa",marginBottom:28,lineHeight:1.5 }}>
              Just the essentials — takes under a minute.
            </p>

            <div className="fl">
              <div className="flabel">
                <span>Full Name</span>
                {errors.playerName && <span className="fe">{errors.playerName}</span>}
              </div>
              <input
                className={`fi${errors.playerName ? " err" : ""}`}
                placeholder="Your full name"
                value={form.playerName}
                onChange={(e) => setField("playerName", e.target.value)}
              />
            </div>

            <div className="div" />

            <div className="fl">
              <div className="flabel">
                <span>Mobile Number</span>
                {errors.mobile && <span className="fe">{errors.mobile}</span>}
              </div>
              <input
                type="tel"
                className={`fi${errors.mobile ? " err" : ""}`}
                placeholder="10-digit mobile number"
                maxLength={10}
                value={form.mobile}
                onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, ""))}
              />
              <div className="nt">You'll be added to the participants WhatsApp group post-registration.</div>
            </div>

            <div className="fl">
              <div className="flabel">
                <span>Email Address</span>
                {errors.email && <span className="fe">{errors.email}</span>}
              </div>
              <input
                type="email"
                className={`fi${errors.email ? " err" : ""}`}
                placeholder="For payment receipt"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>

            <button className="bp" style={{ marginTop: 4 }} onClick={() => { if (validateStep1()) setStep(2); }}>
              Continue to Events
            </button>
          </>
        )}

        {/* ══ STEP 2 ══════════════════════════════════════════ */}
        {step === 2 && (
          <>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:600,color:"#1a1a1a",marginBottom:4 }}>
              Select Events
            </h2>
            <p style={{ fontSize:".78rem",color:"#aaa",marginBottom:20,lineHeight:1.5 }}>
              Tap to select your events. Enter partner name for doubles.
            </p>

            <div style={{ display:"flex",gap:8,marginBottom:20,flexWrap:"wrap" }}>
              <span className="lc">Singles — ₹900</span>
              <span className="lc">Doubles — ₹1,600</span>
            </div>

            {errors.events && <div className="eb">{errors.events}</div>}

            {/* Open category */}
            <p className="egroup-label">Open Category</p>
            {EVENTS.filter(ev => !ev.code.endsWith("40")).map((ev) => {
              const sel = form.selectedEvents.includes(ev.code);
              return (
                <div key={ev.code}>
                  <div className={`ec${sel ? " on" : ""}`} onClick={() => toggleEvent(ev.code)}>
                    <div className="ebox"><div className="etick" /></div>
                    <span className="en">{ev.label}</span>
                    <span className="ef">₹{ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE}</span>
                  </div>
                  {sel && ev.type === "doubles" && (
                    <div className="pb">
                      <p className="pbl">Partner — {ev.label}</p>
                      <div className="fl" style={{ marginBottom: 0 }}>
                        <div className="flabel">
                          <span>Partner Name</span>
                          {errors[`${ev.code}_name`] && <span className="fe">{errors[`${ev.code}_name`]}</span>}
                        </div>
                        <input
                          className={`fi${errors[`${ev.code}_name`] ? " err" : ""}`}
                          placeholder="Partner's full name"
                          value={form.partners[ev.code] || ""}
                          onChange={(e) => setPartnerName(ev.code, e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 40+ category */}
            <p className="egroup-label" style={{ marginTop: 24 }}>40+ Category</p>
            {EVENTS.filter(ev => ev.code.endsWith("40")).map((ev) => {
              const sel = form.selectedEvents.includes(ev.code);
              return (
                <div key={ev.code}>
                  <div className={`ec${sel ? " on" : ""}`} onClick={() => toggleEvent(ev.code)}>
                    <div className="ebox"><div className="etick" /></div>
                    <span className="en">{ev.label}</span>
                    <span className="ef">₹{ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE}</span>
                  </div>
                  {sel && ev.type === "doubles" && (
                    <div className="pb">
                      <p className="pbl">Partner — {ev.label}</p>
                      <div className="fl" style={{ marginBottom: 0 }}>
                        <div className="flabel">
                          <span>Partner Name</span>
                          {errors[`${ev.code}_name`] && <span className="fe">{errors[`${ev.code}_name`]}</span>}
                        </div>
                        <input
                          className={`fi${errors[`${ev.code}_name`] ? " err" : ""}`}
                          placeholder="Partner's full name"
                          value={form.partners[ev.code] || ""}
                          onChange={(e) => setPartnerName(ev.code, e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {form.selectedEvents.length > 0 && (
              <div className="fb" style={{ marginTop: 20 }}>
                <p className="fbt">Fee Summary</p>
                {form.selectedEvents.map((code) => {
                  const ev = EVENTS.find((x) => x.code === code)!;
                  return (
                    <div key={code} className="fr">
                      <span>{ev.label}</span>
                      <span style={{ fontWeight: 500 }}>₹{ev.type === "singles" ? SINGLES_FEE : DOUBLES_FEE}</span>
                    </div>
                  );
                })}
                <div className="ftot">
                  <span className="ftotl">Total Payable</span>
                  <span className="ftota">₹{totalFee.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            {submitError && <div className="eb">{submitError}</div>}

            <div style={{ display:"flex",gap:10,marginTop:4 }}>
              <button className="bk" onClick={() => setStep(1)}>← Back</button>
              <button
                className="bp"
                style={{ flex: 1, marginTop: 0 }}
                disabled={paying || form.selectedEvents.length === 0}
                onClick={handlePayment}
              >
                {paying ? "Opening payment…" : `Pay ₹${totalFee.toLocaleString("en-IN")}`}
              </button>
            </div>
            <p className="sn" style={{ marginTop: 13 }}>🔒 Secured by Razorpay · UPI · Cards · Net Banking</p>
          </>
        )}

        {/* ══ STEP 3 ══════════════════════════════════════════ */}
        {step === 3 && paymentDone && (
          <>
            <div style={{ textAlign:"center",paddingTop:8 }}>
              <div className="si">🏸</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.65rem",fontWeight:600,color:"#1a1a1a",marginBottom:6 }}>
                You're registered.
              </h2>
              <p style={{ fontSize:".82rem",color:"#999",lineHeight:1.7 }}>
                Welcome, <strong style={{ color:"#1a1a1a" }}>{form.playerName}</strong>.<br />
                Receipt sent to <span style={{ color:"#1a1a1a" }}>{form.email}</span>.
              </p>
            </div>

            <div style={{ background:"#fff",border:"1px solid #e0dbd4",borderRadius:9,overflow:"hidden",margin:"22px 0" }}>
              <div style={{ padding:"12px 16px",borderBottom:"1px solid #f2ede6" }}>
                <span style={{ fontSize:".63rem",fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",color:"#bbb" }}>Registered Events</span>
              </div>
              {form.selectedEvents.map((code) => {
                const ev = EVENTS.find((x) => x.code === code)!;
                const partner = form.partners[code];
                return (
                  <div key={code}>
                    <div className="ser">
                      <span className="sd" />
                      {ev.label}
                    </div>
                    {partner && (
                      <div className="ser" style={{ paddingLeft: 32, color: "#aaa", fontSize: ".78rem" }}>
                        <span className="sd" style={{ background: "#d4c9b8" }} />
                        Partner: {partner}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer" className="wb">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join Participants Group
            </a>

            <div className="is">
              <strong>📅 Dates</strong> — 6th &amp; 7th June<br />
              <strong>📍 Venue</strong> — RPUG Badminton Court, NiBM<br />
              <strong>🏆 Prizes</strong> — Cash, Medals &amp; Gifts for winner &amp; runner-up
            </div>

            <p style={{ textAlign:"center",marginTop:24,fontSize:".68rem",color:"#ccc",fontStyle:"italic",letterSpacing:".5px" }}>
              Play hard. Smash limits. Be a champion.
            </p>
          </>
        )}
      </div>
    </div>
  );
}