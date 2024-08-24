export class Company {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    if (id) this.id = id;
  }
}
  