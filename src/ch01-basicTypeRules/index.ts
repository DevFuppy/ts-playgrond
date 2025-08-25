// --- Basic syntax for declaring types ---

// Type Annotation (型別註記)
let value: string = 'Hello world';

function foo1(val: string): string {
  return val + 1;
}

// In this case, return type is "erased" to void (型別層面被擦掉)，
// so compiler allows functions with return values here.
// But at runtime the value still exists, just not tracked by TS.
const foo2_1: (val: string) => void = (val) => val + 2.1;
const typeWillBeVoid = foo2_1('k'); // typeWillBeVoid: void

// In this case, return type will be strictly checked
const foo2_2 = (val: string): string => val + 2.3;

// Function expression with type annotation
const foo3 = function (val: string): string {
  return val + 3;
};



export function main() {

   console.log(foo1(value));
   console.log(foo2_1(value));
   console.log(foo2_2(value));
  

} 

