class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department ${this.id}: ${this.name} `);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  //admins: string[]; is declared in the constructor using public/private key
  constructor(id: string, public admins: string[]) {
    super(id, "IT"); //super must be declared before any 'this' key
    this.admins = admins;
  }
}

const it = new ITDepartment("d1", ["Max"]);

it.describe();

it.addEmployee("Max");
it.addEmployee("Manu");

it.printEmployeeInformation();
console.log(it);

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting"); //super must be declared before any 'this' key
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}
const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong");
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.printReports();
console.log(accounting)
