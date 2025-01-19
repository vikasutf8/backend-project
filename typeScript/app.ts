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