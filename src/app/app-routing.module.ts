import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewClientComponent } from './Components/User/view-client/view-client.component';
import { FoodComponent } from './Components/User/food/food.component';
import { HallcoverComponent } from './Components/User/hallcover/hallcover.component';
import { SoundComponent } from './Components/User/sound/sound.component';
import { ChairComponent } from './Components/User/chair/chair.component';
import { LightComponent } from './Components/User/light/light.component';
import { MemorialComponent } from './Components/User/memorial/memorial.component';
import { ShorteatComponent } from './Components/User/shorteat/shorteat.component';
import { PhotographyComponent } from './Components/User/photography/photography.component';
import { FirstpageComponent } from './Components/User/firstpage/firstpage.component';
import { AddchairComponent } from './Components/Admin/addchair/addchair.component';
import { AddfoodComponent } from './Components/Admin/addfood/addfood.component';
import { AddhallcoverComponent } from './Components/Admin/addhallcover/addhallcover.component';
import { AddmemorialComponent } from './Components/Admin/addmemorial/addmemorial.component';
import { AddsoundComponent } from './Components/Admin/addsound/addsound.component';
import { AddshorteatComponent } from './Components/Admin/addshorteat/addshorteat.component';
import { addListener } from 'cluster';
import { AddlightComponent } from './Components/Admin/addlight/addlight.component';
import { ViewchairComponent } from './Components/Admin/viewchair/viewchair.component';
import { ViewfoodComponent } from './Components/Admin/viewfood/viewfood.component';
import { ViewhallcoverComponent } from './Components/Admin/viewhallcover/viewhallcover.component';
import { ViewlightComponent } from './Components/Admin/viewlight/viewlight.component';
import { ViewmemorialComponent } from './Components/Admin/viewmemorial/viewmemorial.component';
import { ViewphotographyComponent } from './Components/Admin/viewphotography/viewphotography.component';
import { ViewshorteatComponent } from './Components/Admin/viewshorteat/viewshorteat.component';
import { ViewsoundComponent } from './Components/Admin/viewsound/viewsound.component';
import { AddclientComponent } from './Components/Admin/addclient/addclient.component';
import { HomeComponent } from './Components/User/home/home.component';
import { AddphotographyComponent } from './Components/Admin/addphotography/addphotography.component';
import { LoginComponent } from './Components/Admin/login/login.component';
import { ViewclientComponent } from './Components/Admin/viewclient/viewclient.component';
import { AddChairtypeComponent } from './Components/Admin/add-chairtype/add-chairtype.component';
import { AddMemorialtypeComponent } from './Components/Admin/add-memorialtype/add-memorialtype.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'viewClient',
    component: ViewClientComponent
  },

  {
    path: 'food',
    component: FoodComponent,
    canActivate: []  // AuthGuard in angular
  },

  {
    path: 'hallcover',
    component: HallcoverComponent
  },

  {
    path: 'light',
    component: LightComponent
  },

  {
    path: 'sound',
    component: SoundComponent
  },

  {
    path: 'chair',
    component: ChairComponent
  },

  {
    path: 'memorial',
    component: MemorialComponent
  },

  {
    path: 'shorteat',
    component: ShorteatComponent
  },
  {
    path: 'photography',
    component: PhotographyComponent
  },
 
  {
    path: 'addchair',
    component: AddchairComponent
  },
  {
    path: 'addfood',
    component: AddfoodComponent
  },
  {
    path: 'addhallcover',
    component: AddhallcoverComponent
  },
  {
    path: 'addmemorial',
    component: AddmemorialComponent
  },
  {
    path: 'addsound',
    component: AddsoundComponent
  },
  {
    path: 'addshorteat',
    component: AddshorteatComponent
  },
  {
    path: 'addphotography',
    component: AddphotographyComponent
  },
  {
    path: 'addlight',
    component: AddlightComponent
  },
  {
    path: 'addclient',
    component: AddclientComponent
  },

  
  {
    path: 'viewchair',
    component: ViewchairComponent
  },
  {
    path: 'viewfood',
    component: ViewfoodComponent
  },
  {
    path: 'viewhallcover',
    component: ViewhallcoverComponent
  },
  {
    path: 'viewlight',
    component: ViewlightComponent
  },
  {
    path: 'viewmemorial',
    component: ViewmemorialComponent
  },
  {
    path: 'viewphotography',
    component: ViewphotographyComponent
  },
  {
    path: 'viewshorteat',
    component: ViewshorteatComponent
  },
  {
    path: 'viewsound',
    component: ViewsoundComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'viewclient',
    component: ViewclientComponent
  },
  {
    path: 'addchairtype',
    component: AddChairtypeComponent
  },
  {
    path: 'addmemorialtype',
    component: AddMemorialtypeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
