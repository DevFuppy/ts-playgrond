
// --- Type Assertion (型別斷言) ---
// TL;DR : annotation -> needs to include all the properties; assertion ->With at least one overlap, it can pass the check 
// Old syntax (not recommended, conflicts in JSX/TSX)
let vTwo = <string>'Hey';

// Preferred syntax
let vThree = 'Hey' as string;

// You can also assert a function type
const foo2_3 = <(val: string) => void>((val) => val + 2.1);
const foo2_4 = ((val) => val + 2.5) as (val: string) => void



//assertion tests
let x:string = 'cake';  


// ❌ string has no overlap with number → compiler error/warning
let y = x + 1 as number;

// ✅ double assertion through unknown: compiles, but runtime value is still string
let z = (x + '你') as unknown as number;


// --- object types & assertions ---
type ObjA = {cake:string}
type ObjB = {coke:number}
type ObjC = {cake:string, juice:boolean}   


let a : ObjA  = {cake:'abc'}

// ❌ no overlap with ObjB (completely different props): usually TS2352
let a_1 = a as ObjB;

// ✅ overlaps with ObjC (shared prop cake:string): allowed, but unsafe
let a_2 = a as ObjC;



// --- assignability rules (annotations/assignments) ---
// Source must at least include all required properties of the target
const c = { cake: 'abc', coke: 6, juice: true };

let c_1: ObjC = c;                // ✅ covers all required props of ObjC
let c_2 = c as ObjA;              // ✅ asserting to fewer props is fine
let c_3: ObjA & ObjB = c;         // ✅ intersection requires both cake and coke

let a_3: ObjC = a;                // ❌ missing juice:boolean → not assignable


///-------
const r:void = (():void=>{})();

const k = (()=>5)() as void //as報錯? function類物件這怎麼看overlap? 問gpt去比較 上面可以被斷言void回傳形式的函數