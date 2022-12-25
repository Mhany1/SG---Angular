import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iprogram } from 'src/app/models/main';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-programdetails',
  templateUrl: './programdetails.component.html',
  styleUrls: ['./programdetails.component.css']
})
export class ProgramdetailsComponent {
  id: any
  allData: Iprogram[] = []
  finalProgram: Iprogram[] = []
  url: string = "https://admin-mfyg726r7q-uc.a.run.app/filter2/1?name=None&city=None&Language=None&type=None&level=None&sort=None&school=None&category=None"


  constructor(private activatedRoute: ActivatedRoute, private mainservice: MainService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.mainservice.postData(this.url).subscribe(data => {
      this.allData = data
      this.finalProgram = this.allData.filter(p => {
        return p.id == this.id
      })
      console.log(this.finalProgram);

    })
  }

}
