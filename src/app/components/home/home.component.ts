import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCompanyId: number | null = null;

  onCompanySelected(companyId: number) {
    this.selectedCompanyId = companyId;
  }
}
