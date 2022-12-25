import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Iprogram } from 'src/app/models/main';
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
  baseUrl: string = `https://admin-mfyg726r7q-uc.a.run.app/filter2/1?name=None&city=${this.city}&Language=${this.Language}&type=None&level=${this.level}&sort=None&school=${this.school}&category=${this.category}`
  programs: Iprogram[] = []
  finalData: Iprogram[] = []
  searchTerm: string = ''
  showd: boolean = true
  categoryItemNotFound: boolean = false
  loadingDiv: boolean = false

  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12]

  @ViewChild('loading') load!: ElementRef
  @ViewChild('datares') data!: ElementRef


  form: any = FormGroup
  formprice: any = FormGroup

  categories: Array<any> = [
    { name: 'Arts, Design & Architecture', value: 'Arts, Design %26 Architecture' },
    { name: 'Business & Management', value: 'Business %26 Management' },
    { name: 'Computer Science & IT', value: 'Computer Science %26 IT' },
    { name: 'Engineering & Technology', value: 'Engineering %26 Technology' },
    { name: 'Marketing & communication', value: 'Marketing %26 communication' }
  ];

  schools: Array<any> = [
    { name: 'AUDENCIA', value: 'AUDENCIA' },
    { name: 'CYTech', value: 'CYTech' },
    { name: 'IESEG', value: 'IESEG' },
    { name: 'ISC', value: 'ISC' },
    { name: 'IUBH', value: 'IUBH' }
  ];

  cities: Array<any> = [
    { name: 'Bad Honnef', value: 'Bad Honnef' },
    { name: 'Berlin', value: 'Berlin' },
    { name: 'Oxford', value: 'Oxford' },
    { name: 'Paris', value: 'Paris' },
    { name: 'Raleigh', value: 'Raleigh' }
  ];



  ngOnInit(): void {
    this.loadingDiv = true
    this.mainservice.postData(this.baseUrl).subscribe(data => {
      if (data) {
        this.hideloader()
        this.programs = data
        this.finalData = data
        if (data.length == 0) {
          this.categoryItemNotFound = true
        } else {
          this.categoryItemNotFound = false
        }
      }
    })
  }

  hideloader() {
    this.loadingDiv = false
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
    this.baseUrl = `https://admin-mfyg726r7q-uc.a.run.app/filter2/1?name=None&city=${this.city}&Language=${this.Language}&type=None&level=${this.level}&sort=None&school=${this.school}&category=${this.category}`
    this.ngOnInit()
  }

  priceFilter(event: any) {
    if (event.target.value == 'high-to-low') {
      this.programs.sort((a: Iprogram, b: Iprogram) => {
        if (a.fee < b.fee) return 1;
        if (a.fee > b.fee) return -1;
        return 0;
      })
      this.categoryItemNotFound = false
    }
    if (event.target.value == 'low-to-high') {
      this.programs.sort((a: Iprogram, b: Iprogram) => {
        if (a.fee > b.fee) return 1;
        if (a.fee < b.fee) return -1;
        return 0;
      })
    }

  }

  showData() {
    if (this.showd == true) {
      this.data.nativeElement.style.display = 'block'
      this.showd = false
    } else {
      this.data.nativeElement.style.display = 'none'
      this.showd = true
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
            this.categoryItemNotFound = false
          } if (filtaredarray.length == 0) {
            this.categoryItemNotFound = true
          }
        }
      }
      this.finalData = filtaredarray
    }


  }
}
