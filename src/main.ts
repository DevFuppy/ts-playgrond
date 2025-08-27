// src/main.ts
console.clear(); // 每次重跑先清畫面（接近 Vite/Next 體驗）


// 讀參數與預設值
const arg = process.argv[2]?.trim();              // 例如 "02" 或 "ch02-types"
const fallback = "ch01-basicTypeRules";                     // 預設章節（找不到參數時）

// 將參數正規化成資料夾名稱
function resolveChapterName(input?: string): string {
  if (!input) return fallback;
  // 允許 "02" → "ch02-*"
  if (/^\d+$/.test(input)) return `ch${input.padStart(2, "0")}-*`;
  // 允許直接給資料夾名
  return input;
}

const pattern = resolveChapterName(arg);

// 掃描符合的章節（簡單做法：列出你維護的章節清單）
const chapters = [
  "ch01-basicTypeRules",
  "ch02-typeAssertions",
  "ch03-functions",
  // 之後新增章節就在這裡加一行即可
];

// 找到第一個符合 pattern 的章節資料夾
const target = chapters.find((c) => {
  if (pattern.endsWith("*")) {
    const base = pattern.slice(0, -1);
    return c.startsWith(base);
  }
  return c === pattern;
}) ?? fallback;

console.log(`[Runner] Using chapter: ${target}`);

let cleanupFns: Array<() => void> = []; // 章節可把清理函數 push 進來

// 讓章節可取得一個「可取消」的 signal 與註冊清理函數的方法
const ctx = {
  addCleanup(fn: () => void) { cleanupFns.push(fn); }
} as const;

// --- 執行章節 ---
try {
  // ⚠️ ESM 相對路徑請帶 .js
  const mod = await import(`./${target}/index.js`);

  // 章節若匯出 main(ctx) 就執行；沒有就當作 side‑effect 模組
  if (typeof mod?.main === "function") {
    await mod.main(ctx);
  }

  // 執行完畢主動清理（正常收尾）
  for (const fn of cleanupFns.splice(0)) {
    try { fn(); } catch {}
  }
  console.log("[Runner] done.");

} catch (err) {
  // 這次執行失敗：顯示漂亮錯誤，並以非 0 退出
  console.error("\n[Runner] ❌ Failed with error:\n");
  console.error(err instanceof Error ? err.stack ?? err.message : err);

  // 失敗也嘗試清理殘留
  for (const fn of cleanupFns.splice(0)) {
    try { fn(); } catch {}
  }

  // 關鍵：退出非 0 → 本次程序結束；tsx watch 仍然在外層等待你的下一次存檔
  process.exit(1);
}
