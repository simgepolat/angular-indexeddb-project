export class Employee {
  id?: number;
  name: string;
  companyId: number;

  constructor(name: string, companyId: number, id?: number) {
    this.name = name;
    this.companyId = companyId;
    if (id) this.id = id;
  }
}
  