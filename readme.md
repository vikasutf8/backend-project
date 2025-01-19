# Robust Backend
? what is web server -- a server is just piece of software whose duty is just to serve.

? JS -- browser lang. 

**# always response return/send with statusCode **

### bun:
```
import {serve}from 'bun' 
Bun.serve({
  fetch(req) {
    return new Response("Bun!");
  },
});
```
? when we are deploying an application supporting system having node install can we use node bun server ?
---
? what is expressjs :it write a routes for us

? what is Hono ? another framework similiaring writing routes,infrastructure

? Elysia.js 

? monogoose having other ORM that prisma,drizzle,

- require --tyep :commonJs
- import. -- type : module
? nodemon

```
import 'dotenv/config'
```
?postman -- authorization,variable(maintain a urls),Script(test),Run

```
{
    "name":"{{$randomColor}}",
    "price":"{{$randomPrice}}"
}
```
#### Custom Logger | [﻿docs.chaicode.com/advance-node-logger/](https://docs.chaicode.com/advance-node-logger/) 
?issue of console.log()

**quick debugging,**

 allow you to log messages to the console, file, or other destinations
---

# TypeScript :basics 
```
let variable ="hello"

// variable =50  //Type 'number' is not assignable to type 'string'.
variable ="jghnasdf"

let age =34
// age ="adsjkfghas" //Type 'number' is not assignable to type 'string'.

let agewihtpe :number =94;
agewihtpe =234
// agewihtpe="sfdgkjasn"

//string,boolean,string|number --multiple tyees


// ------ARRAY---
let names =["viuas","adskjf","ljgasd"];
// names.push(34);Type 'number' is not assignable to type 'string'.
names.push("asdfas");
let stringtesting :string []
let stringwithnumber : (string | number)[]
// let stringwithnumber : string | number[]
stringwithnumber =[23,'asdfas',43]

//----OBJECT----
let user ={
    username :"test",
    age:22,
    isAdmin:false,
}// we dont need to defined object types
// let user: {
//     username: string;
//     age: number;
//     isAdmin: boolean;
// }

user.username ="adgfkjads"
// user.username =34

//also define something like that also::but should difine all properties not left anything
let userdefine: {
    username: string;
    age: number;
    isAdmin: boolean;
    phoneNo ?:string  //optional 
}

//-----ANY ------we dont provide any type /define any type should assigned as 'any'
let testanyArray :any[];


//----functions---
let  sayHI =()=>{ //by defualt void
    console.log("what is type of functions");
}
let returnfun =() :string =>{  //by defualt string and also explicit write
    console.log("asgfkjas");
    return "return string";
}

let multiples =(num :number) :number=>{
    return num*2
// return "num*2"
console.log("num")
}

let sum =(n1 :number ,n2 :number,extra? :number) :boolean=>{
return n1+n2 >45
}
sum(3,4) //optional
sum(3,5,6)

let func =(user :{
    username: string;
    age: number;
    isAdmin: boolean;
    phoneNo ?:string  //optional 
}):string=>{
return (user.username + user.phoneNo)
}
// func({"viaks",342,false}); //how to calling with object argument ???

// ----type ALIASES

type UserType ={
    username: string;
    age: number;
    isAdmin: boolean;
    phoneNo ?:string  
}
  // Use nullish coalescing operator to handle undefined
let betterfun=(user :UserType):void=>{
console.log((user.phoneNo ?? 837254793) + String(user.age)) // concatnation should be same type
}

//making a function as type of another functions
type myFunc =(a:number ,b :string) =>void ;

let bodmas :myFunc =(cnt,str)=>{
    console.log(cnt +"fdsalkfja : " +str);
}

type UserType2 ={
    username: string;
    age: number;
    isAdmin: boolean;
    phoneNo ?:string  
    theme :"dark" |"light"
}

const userthemes :UserType2 ={
username :"ljdsakghnas",
age :43,
isAdmin :false,
theme:"light"
// theme :'black'
}


// ----INTERFACES --advance version of type

interface IUser {
    username :string;
    email :string;
    password :string;
    age ?: number
}

interface IEmployee extends IUser { //acutally its having everything is IUser have
   employeeId :number;
//one is its own and other are from above
}

const emp :IEmployee ={
    username :"vikas test",
    email :"sdfaA@gmail.com",
    password :"daltkjahwrf",
    age :34,
    employeeId :345
}

const client :IUser ={
    username :"asgkhjah fdaf",
    email :"afa@gmail.com",
    password :"dsfalsd"
}

// -----generics :T is defualt syntex insert any object in it 

interface ICate {
    id :number,
    cat :string
}

interface IObj {
    id :number,
    prod :string
}

interface IPost  <T>{
    id :number,
    title :string,
    desc ?:string,
    extra :T[]
}

const test1 :IPost<String> ={
    id :34,
    title :"wertw",
    extra :["dsfa","hty"]
}

const test2 :IPost<ICate> ={
    id :34,
    title :"wertw",
    extra :[{id :34,cat :"agfasd"},{id:32,cat:"asdfa"}]
}
```
-  using props as ts :`const data: Postporps[] = await getData();` 
```
//this `Postporps` should define in types.ts as separate folder :
export type Postporps ={id :number ;
    tittle :string;
    body :string
}
```
- components as props --eg :parent,child1,child2. ---used as entire component are render layout.ts
```
{ children }: {children:React.ReactNode}. //place at props statement
```
- React event with typeScript :eg onclick()
    - `const handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void`   
    - `const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void` 
    - `const handleDelete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void` 
- useState with typeScrpt :
```
type UserType = {
  sessionId: number;
  name: string;
};//generally this can be defined in  type folder || zustand ||RTk

const [user, setUser] = useState<UserType | null>(null);
// OR
const [user, setUser] = useState<UserType>();

??? user is NULL --waringn user? {}
{/* BE AWARE */}
{user?.name}
```
- useReducer and useContext with Ts
```
"use client";
import { createContext, useReducer } from "react";

type StateType = {
  theme: string;
  fontSize: number;
};

// type ActionType = {
//   type: "CHANGE_THEME" | "CHANGE_FONTSIZE";
//   payload?: number;
// };

//Discriminated Unions
type ColorActionType = {
  type: "CHANGE_THEME";
};
type SizeActionType = {
  type: "CHANGE_FONTSIZE";
  payload: number;
};

type ActionType = ColorActionType | SizeActionType;

const INITIAL_STATE = {
  theme: "dark",
  fontSize: 16,
};
// const ThemeContext: Context<{
//   state: StateType;
//   dispatch: React.Dispatch<ActionType>;
// }> object defined as type and by defualt value
export const ThemeContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});
//const reducer: (state: StateType, action: ActionType) => StateType
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    case "CHANGE_FONTSIZE":
      return {
        ...state,
        fontSize: action.payload,
      };

    default:
      return state;
  }
};

export const ThemeProvider = (
  { children }: { children: React.ReactNode } // component as props
) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

```
- useRef in Ts :generic type using 
```
const inputRef = useRef<HTMLInputElement>(null);
const usernameInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
```
- **Gernics Ts :using any type of user taking extra: T[] or <T>**
- T  :any ,object ,component ,another type,interface etc..
- Ts combined types and Exclude :

