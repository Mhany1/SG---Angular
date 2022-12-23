import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Iprogram } from 'src/app/moduls/main';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
  constructor(private mainservice: MainService, private fb: FormBuilder) { }
  category: string = 'None'
  Language: string = 'None'
  level: string = 'None'
  city: string = 'None'
  school: string = 'None'
  num: number = 1
  baseUrl: string = `https://admin-mfyg726r7q-uc.a.run.app/filter2/${this.num}?name=None&city=${this.city}&Language=${this.Language}&type=None&level=${this.level}&sort=None&school=${this.school}&category=${this.category}`
  programs: Iprogram[] = []
  finalData: Iprogram[] = []
  searchTerm: string = ''

  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12]


  form: any = FormGroup
  formprice: any = FormGroup



  ngOnInit(): void {
    this.mainservice.postData(this.baseUrl).subscribe(data => {
      this.programs = data
      this.finalData = data
    }
    )
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }

  filterData(event: any) {
    if (event.target.name == 'level')
      this.level = event.target.value
    if (event.target.name == 'language')
      this.Language = event.target.value
    if (event.target.name == 'school')
      this.school = event.target.value
    if (event.target.name == 'city')
      this.city = event.target.value
    if (event.target.name == 'category')
      this.category = event.target.value
    this.baseUrl = `https://admin-mfyg726r7q-uc.a.run.app/filter2/${this.num}?name=None&city=None&Language=${this.Language}&type=None&level=${this.level}&sort=None&school=None&category=${this.category}`
    this.ngOnInit()
  }

  priceFilter(event: any) {
    if (event.target.value == 'high-to-low') {
      this.programs.sort((a: Iprogram, b: Iprogram) => {
        if (a.fee < b.fee) return 1;
        if (a.fee > b.fee) return -1;
        return 0;
      })
    }
    if (event.target.value == 'low-to-high') {
      this.programs.sort((a: Iprogram, b: Iprogram) => {
        if (a.fee > b.fee) return 1;
        if (a.fee < b.fee) return -1;
        return 0;
      })
    }

  }

  resetData() {
    this.baseUrl = "https://admin-mfyg726r7q-uc.a.run.app/filter2/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None"
    this.ngOnInit()
  }

  searchValue() {
    let filtaredarray: Iprogram[] = []
    if (this.searchTerm == '') {
      this.finalData = this.programs
    } else {
      for (let index = 0; index < this.programs.length; index++) {
        if (this.programs[index].category != null) {
          if (this.programs[index].category.toLocaleLowerCase().trim().includes(this.searchTerm.toLocaleLowerCase().trim())) {
            filtaredarray.push(this.programs[index])
          }
        }
      }
      this.finalData = filtaredarray
    }


  }


}
