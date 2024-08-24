import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndexedDBService } from '../../services/indexeddb.service';
import { Employee } from '../../models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnChanges, OnInit {
  @Input() companyId: number | null = null;

  isLoggedIn: boolean = false;

  employeeForm: FormGroup;
  employees: Employee[] = [];
  editEmployee: Employee | null = null;

  constructor(private fb: FormBuilder, private indexedDBService: IndexedDBService, private authService: AuthService, private router: Router) {
    this.employeeForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && this.companyId !== null) {
        this.loadEmployees();
    }
  }

  loadEmployees() {
    if (this.companyId !== null) {
        this.indexedDBService.getEmployeesByCompanyId(this.companyId).then(employees => {
            this.employees = employees;
        });
    }
  }


  addOrUpdateEmployee() {
    if(this.isLoggedIn){
      if (this.editEmployee) {
        this.editEmployee.name = this.employeeForm.value.name;
        this.indexedDBService.updateEmployee(this.editEmployee).then(() => {
          this.loadEmployees();
          this.resetEmployeeForm();
        });
      } else if (this.companyId !== null) {
        const employee = new Employee(this.employeeForm.value.name, this.companyId);
        this.indexedDBService.addEmployee(employee).then(() => {
          this.loadEmployees();
          this.resetEmployeeForm();
        });
      }
    } else { this.router.navigate(['/login'])}
    
  }

  editEmployeeDetails(employee: Employee) {
    if(this.isLoggedIn) {
      this.editEmployee = employee;
      this.employeeForm.setValue({ name: employee.name });
    } else { this.router.navigate(['/login'])}
    
  }

  deleteEmployee(employeeId: number) {
    if(this.isLoggedIn) {
      this.indexedDBService.deleteEmployee(employeeId).then(() => {
        this.loadEmployees();
      });
    } else { this.router.navigate(['/login'])}
    
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.editEmployee = null;
  }
}
