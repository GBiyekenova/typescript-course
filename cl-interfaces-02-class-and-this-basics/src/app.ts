type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//function overloads
function add1(a: string, b: string): string;
function add1(a: number, b: number): number;
function add1(a: string, b: number): string;
function add1(a: number, b: string): string;
function add1(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add1("Shawn", " Max");
result.split(' ');

const fetchedUserData = {
  id: "u1",
  name: "Shawn",
  job: { title: "CEO", description: "My own company" }
}
//optional chaining (?) after an object or an object property checks if it exists => then proceeds, or else doesn't execute.
console.log(fetchedUserData?.job?.title)

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date " + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a Truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo - " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird"; //type guards
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Horse | Bird;

//Discriminated Unions
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//Type Casting
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;

//or --->In the following case js has jsx syntax that is similar to <>.
// const userInputElement = <HTMLInputElement> document.getElementById("user-input");

userInputElement.value = "Hi There!";


//Index Properties
interface ErrorContainer {
  //{ email: "Not a valid email!", username: "Must start with a capital character!" }
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid emai!",
  username: "Must start with a capital character!",
};
