abstract class Department {
  static fiscalYear = 2022;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    console.log(Department.fiscalYear)
  }

  static createEmployee(name: string) {
    return {name: name};
  }
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

class ITDepartment extends Department {
  //admins: string[]; is declared in the constructor using public/private key

  constructor(id: string, public admins: string[]) {
    super(id, "IT"); //super must be declared before any 'this' key
    this.admins = admins;
  }

  describe() {
    console.log(`IT Department - ID: ${this.id}`)
  }
}

const it = new ITDepartment("d1", ["Max"]);

it.describe();

it.addEmployee("Max");
it.addEmployee("Manu");

it.printEmployeeInformation();
console.log(it);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    //getter method has to return somethig.
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);


  }
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting"); //super must be declared before any 'this' key
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log(`Accounting Department - ID: ${this.id}`)
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}
// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance(); //because it's a singleton pattern (created with private keyword in front of the constructor, it can be instantiated only once. If we create another variable, the containing info will be the same.)
accounting.mostRecentReport = 'Year end report.'; //access the setter as a property
accounting.addReport("Something went wrong");
console.log(accounting.mostRecentReport);//getter is not executed as a functions call.
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.printReports();
accounting.describe();
console.log(accounting);
