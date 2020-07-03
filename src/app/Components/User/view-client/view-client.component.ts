import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/Service/client.service';
import { FACILITYTYPE } from 'src/app/Model/utils';
import { FoodServiceService } from 'src/app/Service/Food.service';


@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  dataArray: any[];
  data: any;
  selectedType: FACILITYTYPE;
  coverQty: any;
  uncoverQty: any;
  shorteatquantity: any;
  foodquantity: any;
  memorialquantity: any;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private foodService: FoodServiceService,
              private clientService: ClientService) { }

  ngOnInit() {



    // console.log(this.route.snapshot.queryParams['clickbutton'])

    if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.HALLCOVER) {
      this.clientService.viewHallcoverClient(this.route.snapshot.queryParams['hall_size']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.HALLCOVER;
          this.dataArray = res.data
        })
    }

    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.LIGHT) {
      this.clientService.viewLightClient(this.route.snapshot.queryParams['size']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.LIGHT;
          this.dataArray = res.data
        })
    }

    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.SOUND) {
      this.clientService.viewSoundClient(this.route.snapshot.queryParams['size'], this.route.snapshot.queryParams['type']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.SOUND;
          this.dataArray = res.data
        })
    }

    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.CHAIR)
     {
      this.uncoverQty = this.route.snapshot.queryParams['uncoveredChairs'];
      this.coverQty = this.route.snapshot.queryParams['coveredChairs'];
      this.clientService.viewChairClient(this.route.snapshot.queryParams['type'], this.route.snapshot.queryParams['uncoveredChairs'], this.route.snapshot.queryParams['coveredChairs']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.CHAIR;
          this.dataArray = res.data
        })
    }
    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.MEMORIAL)
    {
     this.memorialquantity = this.route.snapshot.queryParams['memorialQty'];
     
     this.clientService.viewMemorialClient(this.route.snapshot.queryParams['memorialtype'], this.route.snapshot.queryParams['memorialQty']).
       subscribe(res => {
         console.log(res)
         this.selectedType = FACILITYTYPE.MEMORIAL;
         this.dataArray = res.data
       })
   }
   

    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.SHORTEAT) 
    {
      this. shorteatquantity = this.route.snapshot.queryParams['shorteatQty'];;

      this.clientService.viewShorteatClient(this.route.snapshot.queryParams['shorteattype'], this.route.snapshot.queryParams['shorteatQty']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.SHORTEAT;
          this.dataArray = res.data

        })
    }

    else if (this.route.snapshot.queryParams['clickbutton'] == FACILITYTYPE.PHOTOGRAPHY) {
      this.clientService.viewPhotographyClient(this.route.snapshot.queryParams['duration']).
        subscribe(res => {
          console.log(res)
          this.selectedType = FACILITYTYPE.PHOTOGRAPHY;
          this.dataArray = res.data
        })
    }

    else
     {
      this. foodquantity = this.route.snapshot.queryParams['foodQty'];;
      this.clientService.viewFoodClient(this.route.snapshot.queryParams['foodname'], this.route.snapshot.queryParams['foodQty']).
        subscribe(res => {

          this.dataArray = res

          console.log(res)
          this.selectedType = FACILITYTYPE.FOOD;
        })
    }
  }

  get FACILITYTYPE() { return FACILITYTYPE; }

}
