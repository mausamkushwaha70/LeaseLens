import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, ".lease-deck-build");
if (fs.existsSync(buildDir)) throw new Error(`Refusing to reuse existing build folder: ${buildDir}`);
fs.mkdirSync(buildDir, { recursive: true });

const C = {
  navy: "111827", navy2: "1F2937", lime: "A3E635", limeLight: "ECFCCB",
  white: "FFFFFF", ink: "111827", gray: "6B7280", muted: "94A3B8",
  line: "E5E7EB", canvas: "F8FAFC", blue: "2563EB", blueLight: "EFF6FF",
  amber: "D97706", amberLight: "FFFBEB", green: "15803D", greenLight: "F0FDF4",
  red: "B91C1C", redLight: "FEF2F2", slate: "CBD5E1",
};
const EMU = 914400;
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const emu = (n) => Math.round(n * EMU);

class Slide {
  constructor(background = C.canvas) {
    this.background = background;
    this.parts = [];
    this.id = 2;
  }
  shape(x, y, w, h, { fill = C.white, line = fill, radius = false, lineWidth = 0.8 } = {}) {
    const id = this.id++;
    this.parts.push(`<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Shape ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="${radius ? "roundRect" : "rect"}"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="${Math.round(lineWidth * 12700)}"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr></p:sp>`);
  }
  circle(x, y, d, fill, line = fill) {
    const id = this.id++;
    this.parts.push(`<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Circle ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(d)}" cy="${emu(d)}"/></a:xfrm><a:prstGeom prst="ellipse"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="${fill}"/></a:solidFill><a:ln w="12700"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln></p:spPr></p:sp>`);
  }
  text(x, y, w, h, value, { size = 16, color = C.ink, bold = false, align = "l", valign = "t", font = "Aptos", margin = 0 } = {}) {
    const id = this.id++;
    const pars = String(value).split("\n").map((line) => `<a:p><a:pPr algn="${align}"/><a:r><a:rPr lang="en-US" sz="${Math.round(size * 100)}"${bold ? ' b="1"' : ""}><a:solidFill><a:srgbClr val="${color}"/></a:solidFill><a:latin typeface="${esc(font)}"/><a:ea typeface="${esc(font)}"/></a:rPr><a:t xml:space="preserve">${esc(line)}</a:t></a:r><a:endParaRPr lang="en-US" sz="${Math.round(size * 100)}"/></a:p>`).join("");
    this.parts.push(`<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Text ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr wrap="square" lIns="${emu(margin)}" tIns="${emu(margin)}" rIns="${emu(margin)}" bIns="${emu(margin)}" anchor="${valign}"/><a:lstStyle/>${pars}</p:txBody></p:sp>`);
  }
  line(x1, y1, x2, y2, color = C.line, width = 1) {
    const id = this.id++;
    this.parts.push(`<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="Line ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${emu(x1)}" y="${emu(y1)}"/><a:ext cx="${emu(x2 - x1)}" cy="${emu(y2 - y1)}"/></a:xfrm><a:prstGeom prst="line"><a:avLst/></a:prstGeom><a:ln w="${Math.round(width * 12700)}"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:ln></p:spPr></p:sp>`);
  }
  card(x, y, w, h, title, body, accent = C.lime, opts = {}) {
    this.shape(x, y, w, h, { fill: opts.fill ?? C.white, line: opts.line ?? C.line, radius: true });
    this.shape(x, y, 0.08, h, { fill: accent, line: accent });
    this.text(x + 0.24, y + 0.17, w - 0.42, 0.31, title, { size: opts.titleSize ?? 14, bold: true, color: opts.titleColor ?? C.ink });
    if (body) this.text(x + 0.24, y + 0.56, w - 0.42, h - 0.68, body, { size: opts.bodySize ?? 11, color: opts.bodyColor ?? C.gray });
  }
  pill(x, y, label, fill, color, w = 1.25) {
    this.shape(x, y, w, 0.27, { fill, line: fill, radius: true });
    this.text(x + 0.04, y + 0.015, w - 0.08, 0.22, label, { size: 8.5, color, bold: true, align: "ctr", valign: "ctr" });
  }
  footer(page) {
    this.line(0.55, 7.06, 12.78, 7.06, C.line, 0.7);
    this.text(0.6, 7.12, 6, 0.2, "LEASELENS  /  PRODUCT OVERVIEW", { size: 7.5, color: C.muted, bold: true });
    this.text(12.1, 7.11, 0.5, 0.2, String(page).padStart(2, "0"), { size: 8, color: C.gray, align: "r" });
  }
  heading(kicker, title, subtitle) {
    this.text(0.65, 0.45, 7, 0.25, kicker.toUpperCase(), { size: 8.5, color: C.green, bold: true });
    this.text(0.65, 0.78, 12, 0.55, title, { size: 29, color: C.navy, bold: true });
    this.text(0.67, 1.38, 11.8, 0.43, subtitle, { size: 12, color: C.gray });
  }
  xml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="${this.background}"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>${this.parts.join("")}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
  }
}

const slides = [];
const newSlide = (bg) => { const s = new Slide(bg); slides.push(s); return s; };

// 01 — Cover
{
  const s = newSlide(C.navy);
  s.shape(9.25, 0, 4.08, 7.5, { fill: "172033", line: "172033" });
  s.circle(10.95, 0.72, 1.25, C.lime);
  s.text(0.82, 0.7, 4.8, 0.5, "LeaseLens", { size: 24, color: C.white, bold: true });
  s.shape(0.83, 1.35, 0.65, 0.06, { fill: C.lime, line: C.lime });
  s.text(0.83, 2.02, 7.6, 1.55, "Every Lease.\nClearly Understood.", { size: 37, color: C.white, bold: true });
  s.text(0.86, 3.9, 7, 0.85, "An AI-powered commercial lease intelligence\nplatform concept and frontend product preview.", { size: 16, color: "CBD5E1" });
  s.pill(0.86, 5.2, "PROJECT OVERVIEW", "273449", C.lime, 1.72);
  s.text(0.86, 6.73, 7, 0.25, "LEASE PORTFOLIOS  ·  OBLIGATIONS  ·  EVIDENCE", { size: 8.5, color: "9CA3AF", bold: true });
  // dashboard illustration
  s.shape(8.18, 1.38, 4.25, 4.58, { fill: C.white, line: C.white, radius: true });
  s.text(8.48, 1.68, 3.55, 0.35, "Portfolio overview", { size: 15, bold: true });
  s.text(8.49, 2.04, 3.5, 0.3, "A clear view of the obligations ahead", { size: 8.5, color: C.gray });
  const tiles = [["128", "Total leases"], ["96", "Analyzed"], ["08", "Processing"]];
  tiles.forEach(([v, l], i) => {
    const x = 8.48 + i * 1.18;
    s.shape(x, 2.56, 1.05, 0.94, { fill: i === 0 ? "F7FEE7" : C.canvas, line: C.line, radius: true });
    s.text(x + 0.09, 2.68, 0.86, 0.34, v, { size: 17, bold: true });
    s.text(x + 0.09, 3.1, 0.9, 0.23, l, { size: 7.2, color: C.gray });
  });
  s.shape(8.48, 3.8, 3.56, 1.43, { fill: C.canvas, line: C.line, radius: true });
  s.text(8.69, 3.99, 2.5, 0.25, "Expiration timeline", { size: 9, bold: true });
  [0.34,0.62,0.48,0.79,0.55,0.92,0.66,0.4].forEach((h, i) => s.shape(8.76 + i * 0.36, 4.41 + (0.72-h*0.72), 0.18, h*0.72, { fill: i === 5 ? C.lime : "CBD5E1", line: i === 5 ? C.lime : "CBD5E1", radius: true }));
  s.shape(8.48, 5.46, 3.56, 0.29, { fill: C.navy, line: C.navy, radius: true });
  s.text(8.58, 5.48, 3.3, 0.22, "SAMPLE INTERFACE · ILLUSTRATIVE DATA", { size: 7, color: C.white, bold: true, align: "ctr", valign: "ctr" });
}

// 02 — Problem and product value
{
  const s = newSlide(); s.heading("THE CHALLENGE", "Lease obligations are easy to miss.", "Commercial leases are dense, long-lived documents. Teams need a faster way to find the facts that drive portfolio decisions.");
  s.card(0.68, 2.16, 3.77, 2.2, "Information is buried", "Critical dates and financial terms are spread across lengthy agreements.", C.blue, { bodySize: 12 });
  s.card(4.77, 2.16, 3.77, 2.2, "Review work repeats", "Portfolio teams often re-read documents to answer the same operational questions.", C.amber, { bodySize: 12 });
  s.card(8.86, 2.16, 3.77, 2.2, "Deadlines carry risk", "Renewal windows, rent steps and notice dates need dependable follow-through.", C.red, { bodySize: 12 });
  s.shape(0.68, 4.77, 11.95, 1.47, { fill: C.navy, line: C.navy, radius: true });
  s.text(1.02, 5.05, 2.2, 0.3, "LeaseLens organizes", { size: 16, color: C.white, bold: true });
  s.text(1.02, 5.47, 10.8, 0.5, "Documents  →  Structured lease records  →  Reviewable insights  →  Actionable dates", { size: 15, color: C.lime, bold: true });
  s.text(1.04, 6.02, 10.7, 0.2, "Designed for commercial real estate operators, landlords, property managers and legal teams.", { size: 9.5, color: "CBD5E1" });
  s.footer(2);
}

// 03 — Workflow
{
  const s = newSlide(); s.heading("THE WORKFLOW", "From agreement to portfolio-ready information.", "The product experience is organized around a human-reviewable lease lifecycle.");
  const steps = [
    ["01", "Add a document", "Choose a lease PDF and prepare it for intake."],
    ["02", "Structure key terms", "Organize rent, dates, CAM and responsibilities."],
    ["03", "Review evidence", "Inspect extracted terms alongside source references."],
    ["04", "Track obligations", "Monitor expirations and important lease events."],
  ];
  steps.forEach(([n, title, body], i) => {
    const x = 0.68 + i * 3.08;
    s.shape(x, 2.38, 2.76, 2.53, { fill: C.white, line: C.line, radius: true });
    s.circle(x + 0.23, 2.64, 0.53, i === 3 ? C.navy : C.lime);
    s.text(x + 0.28, 2.77, 0.43, 0.18, n, { size: 9, color: i === 3 ? C.white : C.navy, bold: true, align: "ctr" });
    s.text(x + 0.23, 3.44, 2.3, 0.35, title, { size: 14, bold: true });
    s.text(x + 0.23, 3.91, 2.24, 0.7, body, { size: 10.5, color: C.gray });
    if (i < 3) s.text(x + 2.78, 3.28, 0.28, 0.35, "→", { size: 19, color: C.green, bold: true, align: "ctr" });
  });
  s.card(0.68, 5.35, 11.95, 0.98, "Human review stays visible", "Review flags and clause evidence help users validate key terms. AI output is presented as a starting point, not legal advice.", C.lime, { bodySize: 10.5 });
  s.footer(3);
}

// 04 — Dashboard
{
  const s = newSlide(); s.heading("PRODUCT TOUR · OVERVIEW", "See the portfolio at a glance.", "The dashboard brings lease volume, analysis progress, expirations and recent activity into one workspace.");
  const metrics = [["128", "Total leases", C.limeLight], ["96", "Analyzed", C.blueLight], ["08", "Processing", C.amberLight], ["12", "Expiring soon", "FEF2F2"]];
  metrics.forEach(([v, l, bg], i) => {
    const x = 0.68 + i * 3.04;
    s.shape(x, 2.05, 2.79, 0.98, { fill: C.white, line: C.line, radius: true });
    s.circle(x + 0.18, 2.27, 0.36, bg);
    s.text(x + 0.66, 2.17, 1.9, 0.36, v, { size: 21, bold: true });
    s.text(x + 0.66, 2.56, 1.95, 0.24, l, { size: 9, color: C.gray });
  });
  s.shape(0.68, 3.35, 7.42, 2.64, { fill: C.white, line: C.line, radius: true });
  s.text(0.96, 3.6, 3.8, 0.28, "Lease portfolio overview", { size: 13, bold: true });
  s.text(0.96, 3.95, 4.2, 0.22, "Illustrative status mix", { size: 8.5, color: C.gray });
  const bars = [["Active", 0.78, C.lime], ["Expired", 0.18, "CBD5E1"], ["Pending review", 0.32, "FBBF24"], ["Processing", 0.22, "93C5FD"]];
  bars.forEach(([label, pct, color], i) => {
    const y = 4.35 + i * 0.42;
    s.text(0.98, y, 1.4, 0.22, label, { size: 8.5, color: C.gray });
    s.shape(2.48, y + 0.02, 4.95, 0.13, { fill: "F1F5F9", line: "F1F5F9", radius: true });
    s.shape(2.48, y + 0.02, 4.95 * pct, 0.13, { fill: color, line: color, radius: true });
  });
  s.shape(8.38, 3.35, 4.25, 2.64, { fill: C.white, line: C.line, radius: true });
  s.text(8.67, 3.6, 3.5, 0.28, "Expirations by month", { size: 13, bold: true });
  [0.31,0.5,0.4,0.72,0.48,0.91,0.64,0.39,0.74,0.5,0.82,0.44].forEach((v, i) => {
    const x = 8.78 + i * 0.27; const bh = v * 1.12;
    s.shape(x, 5.48 - bh, 0.15, bh, { fill: i === 5 ? C.lime : "CBD5E1", line: i === 5 ? C.lime : "CBD5E1", radius: true });
  });
  s.text(8.75, 5.58, 3.45, 0.19, "JAN     MAR     MAY     JUL     SEP     NOV", { size: 6.5, color: C.muted });
  s.text(0.7, 6.34, 11.7, 0.23, "All displayed portfolio figures and chart values are illustrative sample data.", { size: 9, color: C.gray });
  s.footer(4);
}

// 05 — Lease library
{
  const s = newSlide(); s.heading("PRODUCT TOUR · LEASE LIBRARY", "A working list for the whole portfolio.", "Search, filter, sort and move from a record to details, analysis or a document preview.");
  s.shape(0.68, 2.0, 11.95, 4.32, { fill: C.white, line: C.line, radius: true });
  s.shape(0.92, 2.27, 4.15, 0.4, { fill: C.canvas, line: C.line, radius: true });
  s.text(1.12, 2.35, 3.65, 0.18, "⌕  Search by lease, tenant or property", { size: 8.5, color: C.gray });
  [[5.22, "Status"], [6.77, "Expiration"], [8.3, "Property type"]].forEach(([x, t]) => {
    s.shape(x, 2.27, 1.38, 0.4, { fill: C.white, line: C.line, radius: true });
    s.text(x + 0.13, 2.37, 1.1, 0.18, t, { size: 8, color: C.gray });
  });
  s.shape(10.02, 2.27, 1.21, 0.4, { fill: C.navy, line: C.navy, radius: true });
  s.text(10.1, 2.37, 1.04, 0.18, "Export data", { size: 8, color: C.white, bold: true, align: "ctr" });
  s.text(1.0, 2.94, 3.1, 0.2, "DOCUMENT", { size: 7, color: C.muted, bold: true });
  s.text(4.52, 2.94, 1.65, 0.2, "TENANT", { size: 7, color: C.muted, bold: true });
  s.text(6.5, 2.94, 2.0, 0.2, "PROPERTY", { size: 7, color: C.muted, bold: true });
  s.text(8.65, 2.94, 1.35, 0.2, "LEASE END", { size: 7, color: C.muted, bold: true });
  s.text(10.18, 2.94, 1.5, 0.2, "STATUS", { size: 7, color: C.muted, bold: true });
  const rows = [
    ["Office Lease Agreement.pdf", "Northstar Wellness", "Riverside Plaza · 410", "Jun 30, 2028", "Completed", C.greenLight, C.green],
    ["Retail Space Lease.pdf", "Juniper & Co.", "Market Street Center", "Mar 31, 2029", "Processing", C.blueLight, C.blue],
    ["Commercial Building Agreement.pdf", "Alder Financial Group", "Westlake Tower · 820", "Dec 31, 2027", "Needs review", C.amberLight, C.amber],
    ["Shopping Mall Lease.pdf", "Pine & Peak Outfitters", "Pinecrest Commons · 12", "Dec 03, 2026", "Completed", C.greenLight, C.green],
  ];
  rows.forEach((r, i) => {
    const y = 3.25 + i * 0.63;
    s.line(0.94, y - 0.08, 12.34, y - 0.08, "F1F5F9", 0.7);
    s.text(1.0, y, 3.35, 0.22, r[0], { size: 8.1, bold: true });
    s.text(4.52, y, 1.76, 0.22, r[1], { size: 7.7, color: C.gray });
    s.text(6.5, y, 2.0, 0.22, r[2], { size: 7.6, color: C.gray });
    s.text(8.65, y, 1.3, 0.22, r[3], { size: 7.6, color: C.gray });
    s.pill(10.15, y - 0.03, r[4], r[5], r[6], r[4] === "Needs review" ? 1.18 : 0.98);
    s.text(11.7, y, 0.34, 0.2, "•••", { size: 10, color: C.gray, align: "ctr" });
  });
  s.text(0.99, 5.98, 9.7, 0.2, "12 sample lease records  ·  Table and grid views  ·  Row and bulk actions  ·  Confirm-before-delete", { size: 8.4, color: C.gray });
  s.footer(5);
}

// 06 — Analysis/evidence
{
  const s = newSlide(); s.heading("PRODUCT TOUR · ANALYSIS", "Show the clause and its source.", "The analysis workspace is designed to keep extracted terms connected to evidence and human review.");
  s.shape(0.68, 2.06, 11.95, 0.58, { fill: C.white, line: C.line, radius: true });
  s.text(0.94, 2.22, 5.25, 0.22, "Office Lease Agreement.pdf   ·   Northstar Wellness", { size: 10, bold: true });
  s.pill(10.6, 2.2, "ANALYSIS COMPLETE", C.greenLight, C.green, 1.55);
  const tabs = [["Overview", true], ["Base rent", false], ["CAM", false], ["Repairs", false], ["Termination", false]];
  tabs.forEach(([t, active], i) => {
    const x = 0.82 + i * 1.63;
    s.text(x, 2.9, 1.45, 0.22, t, { size: 8.5, color: active ? C.navy : C.gray, bold: active, align: "ctr" });
    if (active) s.shape(x + 0.18, 3.19, 1.08, 0.04, { fill: C.lime, line: C.lime });
  });
  s.shape(0.68, 3.42, 5.5, 2.65, { fill: C.white, line: C.line, radius: true });
  s.text(0.97, 3.68, 3.8, 0.27, "Extracted lease terms", { size: 13, bold: true });
  s.card(0.95, 4.12, 2.35, 1.5, "Base rent", "$8,400 / month\n3.0% annual increase", C.lime, { titleSize: 11, bodySize: 10 });
  s.card(3.52, 4.12, 2.35, 1.5, "Lease term", "Jul 2023 — Jun 2028\n5 years", C.blue, { titleSize: 11, bodySize: 10 });
  s.shape(6.42, 3.42, 6.21, 2.65, { fill: C.white, line: C.line, radius: true });
  s.text(6.72, 3.68, 3.5, 0.27, "Evidence & review", { size: 13, bold: true });
  s.pill(10.43, 3.68, "SOURCE · PAGE 12", C.blueLight, C.blue, 1.55);
  s.shape(6.72, 4.15, 5.55, 0.86, { fill: C.canvas, line: C.line, radius: true });
  s.text(6.94, 4.31, 5.1, 0.52, "“Base rent shall be $8,400 per month ... increasing by three percent on each anniversary of the Commencement Date.”", { size: 9.3, color: C.navy2 });
  s.text(6.73, 5.23, 5.4, 0.32, "Review status: Extracted field with source reference", { size: 8.5, color: C.amber, bold: true });
  s.text(0.74, 6.36, 11.65, 0.28, "Illustrative UI only: values are mock data and do not represent verified AI extraction or legal accuracy.", { size: 9, color: C.gray });
  s.footer(6);
}

// 07 — Operations
{
  const s = newSlide(); s.heading("PRODUCT TOUR · OPERATIONS", "Keep important dates in view.", "LeaseLens connects portfolio review with practical follow-through across expirations, renewals and reports.");
  s.shape(0.68, 2.05, 7.25, 3.96, { fill: C.white, line: C.line, radius: true });
  s.text(0.98, 2.34, 4.5, 0.28, "Upcoming portfolio dates", { size: 13, bold: true });
  s.text(0.98, 2.7, 4.5, 0.2, "A short list for timely review", { size: 8.5, color: C.gray });
  const dates = [["DEC 03", "Lease expiration", "Pinecrest Commons · Unit 12", "30 days"], ["FEB 28", "Renewal decision", "Oak Commons", "117 days"], ["DEC 31", "Lease expiration", "Westlake Tower · Suite 820", "423 days"]];
  dates.forEach((r, i) => {
    const y = 3.22 + i * 0.82;
    s.line(0.98, y - 0.08, 7.59, y - 0.08, "F1F5F9", 0.8);
    s.shape(1.0, y, 0.72, 0.5, { fill: i === 0 ? C.redLight : C.canvas, line: C.line, radius: true });
    s.text(1.02, y + 0.15, 0.67, 0.17, r[0], { size: 8, color: i === 0 ? C.red : C.navy2, bold: true, align: "ctr" });
    s.text(1.92, y + 0.03, 3.5, 0.22, r[1], { size: 9, bold: true });
    s.text(1.92, y + 0.32, 3.6, 0.18, r[2], { size: 7.8, color: C.gray });
    s.text(6.1, y + 0.15, 1.0, 0.18, r[3], { size: 8, color: C.gray, align: "r" });
  });
  s.shape(8.2, 2.05, 4.43, 3.96, { fill: C.navy, line: C.navy, radius: true });
  s.text(8.55, 2.4, 3.7, 0.32, "Portfolio reporting", { size: 15, color: C.white, bold: true });
  s.text(8.55, 2.84, 3.65, 0.6, "A lightweight view across sample records and review status.", { size: 10, color: "CBD5E1" });
  [["Lease records", "12"], ["Completed", "5"], ["Need attention", "3"]].forEach(([a, b], i) => {
    const y = 3.68 + i * 0.52;
    s.line(8.55, y - 0.04, 12.2, y - 0.04, "374151", 0.7);
    s.text(8.58, y + 0.06, 2.8, 0.22, a, { size: 9, color: "CBD5E1" });
    s.text(11.4, y + 0.06, 0.6, 0.22, b, { size: 10, color: C.lime, bold: true, align: "r" });
  });
  s.pill(8.55, 5.47, "PRINT REPORT", "273449", C.lime, 1.35);
  s.text(0.72, 6.36, 11.6, 0.24, "Dates and reports shown here are drawn from illustrative mock records.", { size: 9, color: C.gray });
  s.footer(7);
}

// 08 — Architecture and demo boundaries
{
  const s = newSlide(); s.heading("IMPLEMENTATION", "A modular frontend, ready for integration.", "LeaseLens is built as a responsive Next.js product preview with reusable routes, components and data boundaries.");
  const stack = [["Experience", "Next.js App Router · React · TypeScript", C.lime], ["UI system", "Tailwind CSS · Lucide · Recharts", C.blue], ["Forms & feedback", "React Hook Form · Zod · Sonner", C.amber], ["Integration seam", "Axios client · lease service · API URL config", C.navy]];
  stack.forEach((r, i) => {
    const y = 2.06 + i * 0.91;
    s.shape(0.68, y, 5.63, 0.7, { fill: C.white, line: C.line, radius: true });
    s.shape(0.68, y, 0.08, 0.7, { fill: r[2], line: r[2] });
    s.text(0.96, y + 0.1, 4.9, 0.2, r[0], { size: 9.3, bold: true });
    s.text(0.96, y + 0.36, 5.0, 0.18, r[1], { size: 8.2, color: C.gray });
  });
  s.shape(6.68, 2.06, 5.95, 3.44, { fill: C.navy, line: C.navy, radius: true });
  s.text(7.02, 2.4, 4.9, 0.35, "What works in this preview", { size: 15, color: C.white, bold: true });
  const works = ["Responsive dashboard and lease library", "Search, filters, sorting and pagination", "Record details, status and review views", "Demo sign-in and sign-out interactions", "PDF selection preview with file checks"];
  works.forEach((w, i) => { s.circle(7.03, 2.98 + i * 0.43, 0.16, C.lime); s.text(7.32, 2.97 + i * 0.43, 4.8, 0.22, w, { size: 9, color: "E5E7EB" }); });
  s.shape(6.68, 5.72, 5.95, 0.61, { fill: C.amberLight, line: "FDE68A", radius: true });
  s.text(6.95, 5.87, 5.4, 0.28, "Mock data only · no backend, file storage or live AI analysis connected", { size: 8.3, color: "92400E", bold: true, align: "ctr" });
  s.text(0.72, 6.4, 11.7, 0.22, "The UI labels sample content clearly; API integration can be introduced behind existing service boundaries.", { size: 9, color: C.gray });
  s.footer(8);
}

// 09 — Next steps
{
  const s = newSlide(); s.heading("NEXT STEPS", "Turn the product preview into a connected workspace.", "A practical path from the current frontend to a production-ready lease intelligence platform.");
  const stages = [
    ["01", "Connect the platform", "Implement organization-aware authentication, REST APIs and persistent lease records."],
    ["02", "Secure document handling", "Add protected file upload, storage, permissions and a real PDF viewer."],
    ["03", "Ground AI in evidence", "Connect extraction to source pages, review queues, provenance and audit history."],
    ["04", "Operate at portfolio scale", "Add team workflows, monitoring, reporting exports and production controls."],
  ];
  stages.forEach((r, i) => {
    const y = 2.06 + i * 0.94;
    s.circle(0.76, y + 0.07, 0.48, i === 0 ? C.lime : C.navy);
    s.text(0.8, y + 0.21, 0.4, 0.16, r[0], { size: 8.5, color: i === 0 ? C.navy : C.white, bold: true, align: "ctr" });
    s.text(1.48, y + 0.04, 3.2, 0.28, r[1], { size: 12, bold: true });
    s.text(4.78, y + 0.04, 7.35, 0.48, r[2], { size: 9.5, color: C.gray });
    if (i < 3) s.line(1.0, y + 0.62, 1.0, y + 0.94, C.line, 1.2);
  });
  s.shape(0.68, 6.08, 11.95, 0.52, { fill: C.limeLight, line: C.limeLight, radius: true });
  s.text(0.88, 6.22, 11.55, 0.22, "Product principle: every important term should remain reviewable against its source document.", { size: 10, color: C.navy, bold: true, align: "ctr" });
  s.footer(9);
}

// 10 — Closing
{
  const s = newSlide(C.navy);
  s.circle(10.95, 0.82, 1.28, C.lime);
  s.text(0.82, 0.78, 4.8, 0.45, "LeaseLens", { size: 24, color: C.white, bold: true });
  s.shape(0.84, 1.43, 0.65, 0.06, { fill: C.lime, line: C.lime });
  s.text(0.84, 2.04, 10.4, 0.95, "Every Lease. Clearly Understood.", { size: 34, color: C.white, bold: true });
  s.text(0.87, 3.22, 8.6, 0.66, "A clearer way to organize lease terms,\nreview evidence and manage obligations.", { size: 17, color: "CBD5E1" });
  s.shape(0.86, 4.55, 2.12, 0.53, { fill: C.lime, line: C.lime, radius: true });
  s.text(0.97, 4.7, 1.9, 0.2, "EXPLORE THE PREVIEW", { size: 8.5, color: C.navy, bold: true, align: "ctr" });
  s.text(0.88, 6.72, 7, 0.25, "COMMERCIAL LEASE INTELLIGENCE  ·  FRONTEND PROJECT OVERVIEW", { size: 8.5, color: "9CA3AF", bold: true });
  s.text(9.15, 6.68, 3.2, 0.24, "LEASELENS", { size: 10, color: C.lime, bold: true, align: "r" });
}

const write = (rel, data) => {
  const target = path.join(buildDir, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data, "utf8");
};
const rel = (target, type) => `<Relationship Id="rId${target}" Type="${type}" Target="${target}"/>`;
const relsXml = (items) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${items}</Relationships>`;

write("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>${slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("")}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`);
write("_rels/.rels", relsXml(`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>`));
write("ppt/presentation.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>${slides.map((_, i) => `<p:sldId id="${256+i}" r:id="rId${i+2}"/>`).join("")}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`);
write("ppt/_rels/presentation.xml.rels", relsXml([rel("slideMasters/slideMaster1.xml", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster").replace("Id=\"rIdslideMasters/slideMaster1.xml\"", "Id=\"rId1\""), ...slides.map((_, i) => `<Relationship Id="rId${i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i+1}.xml"/>`)].join("")));
const groupTree = `<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree>`;
write("ppt/slideMasters/slideMaster1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld name="LeaseLens Master">${groupTree}</p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>`);
write("ppt/slideMasters/_rels/slideMaster1.xml.rels", relsXml(`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>`));
write("ppt/slideLayouts/slideLayout1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank">${groupTree}</p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`);
write("ppt/slideLayouts/_rels/slideLayout1.xml.rels", relsXml(`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>`));
write("ppt/theme/theme1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="LeaseLens"><a:themeElements><a:clrScheme name="LeaseLens"><a:dk1><a:srgbClr val="111827"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F2937"/></a:dk2><a:lt2><a:srgbClr val="F8FAFC"/></a:lt2><a:accent1><a:srgbClr val="A3E635"/></a:accent1><a:accent2><a:srgbClr val="2563EB"/></a:accent2><a:accent3><a:srgbClr val="D97706"/></a:accent3><a:accent4><a:srgbClr val="15803D"/></a:accent4><a:accent5><a:srgbClr val="B91C1C"/></a:accent5><a:accent6><a:srgbClr val="94A3B8"/></a:accent6><a:hlink><a:srgbClr val="2563EB"/></a:hlink><a:folHlink><a:srgbClr val="6B7280"/></a:folHlink></a:clrScheme><a:fontScheme name="LeaseLens"><a:majorFont><a:latin typeface="Aptos Display"/><a:ea typeface="Aptos Display"/><a:cs typeface="Aptos Display"/></a:majorFont><a:minorFont><a:latin typeface="Aptos"/><a:ea typeface="Aptos"/><a:cs typeface="Aptos"/></a:minorFont></a:fontScheme><a:fmtScheme name="LeaseLens"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`);
slides.forEach((s, i) => {
  write(`ppt/slides/slide${i+1}.xml`, s.xml());
  write(`ppt/slides/_rels/slide${i+1}.xml.rels`, relsXml(`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>`));
});
write("docProps/core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>LeaseLens — Project Overview</dc:title><dc:subject>Commercial lease intelligence product overview</dc:subject><dc:creator>LeaseLens</dc:creator><cp:keywords>LeaseLens, commercial real estate, leases, product overview</cp:keywords></cp:coreProperties>`);
write("docProps/app.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft PowerPoint</Application><PresentationFormat>On-screen Show (16:9)</PresentationFormat><Slides>${slides.length}</Slides><Company>LeaseLens</Company></Properties>`);
console.log(`Created ${slides.length} slides in ${buildDir}`);
