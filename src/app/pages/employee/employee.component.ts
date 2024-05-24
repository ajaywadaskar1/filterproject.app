import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  isVisible:boolean=true;
  department:any[]=[];
  EmployeeList:any[]=[];
  employeeObject = {
    "firstName":"",
    "lastName":"",
    "email":"",
    "gender":"",
    "phoneNo":"",
    "departmentId":""

  }
  constructor(private _http:HttpClient){}

  ngOnInit(): void {
    this.loadDepartment();
    this.loadEmployeeList();
  }

  loadDepartment(){
    this._http.get("assets/getDeprtment.json").subscribe((res:any)=>{
      this.department = res.data;
    })
  }

  loadEmployeeList(){
    this._http.get("assets/getEmployeeList.json").subscribe((res:any)=>{
      this.EmployeeList = res.data;
    })
  }

  onAddEmployee(){
    
    this._http.post("assets/postEmployee.json",this.employeeObject).subscribe((res:any)=>{
      alert(res.message)
      this.loadEmployeeList();

    })

    this._http.get("assets/postEmployee.json").subscribe((res:any)=>{
      
      alert(res.message)

    })
  }

  onEdit(item:any){
    this.employeeObject = item;
    this.isVisible = false;
  }

  onDelete(id:any){
    this.employeeObject = id;
    alert("Item delete successful")
  }
}
