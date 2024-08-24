import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'CompanyEmployeeDB';
  private dbVersion = 1;
  
  private getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        const companyStore = db.createObjectStore('companies', { keyPath: 'id', autoIncrement: true });
        companyStore.createIndex('name', 'name', { unique: false });
        const employeeStore = db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
        employeeStore.createIndex('companyId', 'companyId', { unique: false });
      };
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        reject('Error opening database: ' + event);
      };
    });
  }
  
  async addCompany(company: Company): Promise<number> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['companies'], 'readwrite');
      const store = transaction.objectStore('companies');
      const request = store.add(company);
      
      request.onsuccess = () => {
        resolve(request.result as number);
      };
      
      request.onerror = (event) => {
        reject('Error adding company: ' + event);
      };
    });
  }

  async updateCompany(company: Company): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['companies'], 'readwrite');
      const store = transaction.objectStore('companies');
      const request = store.put(company);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error updating company: ' + event);
      };
    });
  }

  async deleteCompany(companyId: number): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['employees', 'companies'], 'readwrite');
      const employeeStore = transaction.objectStore('employees');
      const companyStore = transaction.objectStore('companies');

      const deleteEmployeesRequest = employeeStore.index('companyId').openCursor(companyId);
      deleteEmployeesRequest.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };

      const request = companyStore.delete(companyId);
      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error deleting company: ' + event);
      };
    });
  }

  async getAllCompanies(): Promise<Company[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['companies'], 'readonly');
      const store = transaction.objectStore('companies');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject('Error fetching companies: ' + event);
      };
    });
  }

  async addEmployee(employee: Employee): Promise<number> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['employees'], 'readwrite');
      const store = transaction.objectStore('employees');
      const request = store.add(employee);
      
      request.onsuccess = () => {
        resolve(request.result as number);
      };
      
      request.onerror = (event) => {
        reject('Error adding employee: ' + event);
      };
    });
  }

  async updateEmployee(employee: Employee): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['employees'], 'readwrite');
      const store = transaction.objectStore('employees');
      const request = store.put(employee);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error updating employee: ' + event);
      };
    });
  }

  async deleteEmployee(employeeId: number): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['employees'], 'readwrite');
      const store = transaction.objectStore('employees');
      const request = store.delete(employeeId);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error deleting employee: ' + event);
      };
    });
  }

  async getEmployeesByCompanyId(companyId: number): Promise<Employee[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['employees'], 'readonly');
      const store = transaction.objectStore('employees');
      const index = store.index('companyId');
      const request = index.getAll(companyId);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject('Error fetching employees: ' + event);
      };
    });
  }
}
