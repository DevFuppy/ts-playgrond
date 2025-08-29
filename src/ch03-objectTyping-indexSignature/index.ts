//物件 typing

//1.分別訂不同屬性名稱各自的type
let x :{a:string, c:number} ={a:'a',b:2} //不會過

type testObj= {a:string, c:number}

let y: testObj = {a:'a',b:2} //還是不會過, 屬性簽名必須一樣



//2. 索引簽名 (index signature)
//因為js index 取值數字與數字字串會去一樣的地方取值，所以為做區分，key:string必須去涵蓋其他type key的值的型別，以下示範：

type testObj2 = {[key:string]:string, [key:number]:number} //報錯

type testObj3 = {[key:number]:number, [key:string]:string, } //報錯

type testObj4 = {[key:number]:number, [key:string]:number } //可過

type testObj5 = {[key:number]:number, [key:string]:number | string } //可過





type testA = {[key:number]:string} //dictionary-like object

//賦值取值，數字或數字字串都可以被當number type index
let tk:testA = {'1':'3'}
let tv:testA = {1:'7'}
tv[1];
tv['1']
const {1:k} = tv
// console.log(k) //還是可以解構賦值的
// const [ua,ub] = tv //無法用陣列解構物件(js層級本來就不行)



let tc :testA = {a:'3'} //賦值拿非數字字串，就會直接報錯 
let tt :testA = {'a':'3'} //字串形式也一樣

// ===== （僅 JS 行為示範，非 TS） =====
const {a} = tc //❌
// console.log(a) //但js還是抓的到

