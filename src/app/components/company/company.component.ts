import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndexedDBService } from '../../services/indexeddb.service';
import { Company } from '../../models/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  isLoggedIn: boolean = false;
  companyForm: FormGroup;
  companies: Company[] = [];
  editCompany: Company | null = null;

  @Output() companySelected = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private indexedDBService: IndexedDBService, private authService: AuthService, private router: Router) {
    this.companyForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn;
    this.loadCompanies();
  }

  addOrUpdateCompany() {
    if(this.isLoggedIn){
      if (this.editCompany) {
        this.editCompany.name = this.companyForm.value.name;
        this.indexedDBService.updateCompany(this.editCompany).then(() => {
          this.loadCompanies();
          this.resetCompanyForm();
        });
      } else {
        const company = new Company(this.companyForm.value.name);
        this.indexedDBService.addCompany(company).then(() => {
          this.loadCompanies();
          this.resetCompanyForm();
        });
      }
    } else { this.router.navigate(['/login'])}
    
  }

  loadCompanies() {
    this.indexedDBService.getAllCompanies().then(companies => {
      this.companies = companies;
    });
  }

  editCompanyDetails(company: Company) {
    if(this.isLoggedIn){
      this.editCompany = company;
      this.companyForm.setValue({ name: company.name });
    } else { this.router.navigate(['/login'])}
    
  }

  deleteCompany(companyId: number) {
    if(this.isLoggedIn){
      this.indexedDBService.deleteCompany(companyId).then(() => {
        this.loadCompanies();
      });
    } else { this.router.navigate(['/login'])}
    
  }

  selectCompany(companyId: number) {
    this.companySelected.emit(companyId);
  }

  resetCompanyForm() {
    this.companyForm.reset();
    this.editCompany = null;
  }
}
