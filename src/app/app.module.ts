import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatInputModule, MatCardModule} from '@angular/material';
import {MatSelectModule,  MAT_LABEL_GLOBAL_OPTIONS, MatButtonModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/User/header/header.component';
import { FoodComponent } from './Components/User/food/food.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChairComponent } from './Components/User/chair/chair.component';
import { ShorteatComponent } from './Components/User/shorteat/shorteat.component';
import { LightComponent } from './Components/User/light/light.component';
import { SoundComponent } from './Components/User/sound/sound.component';
import { HallcoverComponent } from './Components/User/hallcover/hallcover.component';
import { PhotographyComponent } from './Components/User/photography/photography.component';
import { MemorialComponent } from './Components/User/memorial/memorial.component';
import { ClientComponent } from './Components/User/client/client.component';
import { FunctionComponent } from './Components/User/function/function.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewClientComponent } from './Components/User/view-client/view-client.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FirstpageComponent } from './Components/User/firstpage/firstpage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddshorteatComponent } from './Components/Admin/addshorteat/addshorteat.component';
import { utils } from 'protractor';
import { AddchairComponent } from './Components/Admin/addchair/addchair.component';
import { AddmemorialComponent } from './Components/Admin/addmemorial/addmemorial.component';
import { AddfoodComponent } from './Components/Admin/addfood/addfood.component';
import { AddsoundComponent } from './Components/Admin/addsound/addsound.component';
import { AddlightComponent } from './Components/Admin/addlight/addlight.component';
import { AddphotographyComponent } from './Components/Admin/addphotography/addphotography.component';
import { AddhallcoverComponent } from './Components/Admin/addhallcover/addhallcover.component';
import { LoginComponent } from './Components/Admin/login/login.component';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { ViewchairComponent } from './Components/Admin/viewchair/viewchair.component';

import { ViewfoodComponent } from './Components/Admin/viewfood/viewfood.component';
import { ViewhallcoverComponent } from './Components/Admin/viewhallcover/viewhallcover.component';
import { ViewlightComponent } from './Components/Admin/viewlight/viewlight.component';
import { ViewmemorialComponent } from './Components/Admin/viewmemorial/viewmemorial.component';
import { ViewphotographyComponent } from './Components/Admin/viewphotography/viewphotography.component';
import { ViewshorteatComponent } from './Components/Admin/viewshorteat/viewshorteat.component';
import { ViewsoundComponent } from './Components/Admin/viewsound/viewsound.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewclientComponent } from './Components/Admin/viewclient/viewclient.component';
import { AddclientComponent } from './Components/Admin/addclient/addclient.component';
import { HomeComponent } from './Components/User/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AddChairtypeComponent } from './Components/Admin/add-chairtype/add-chairtype.component';
import { AddMemorialtypeComponent } from './Components/Admin/add-memorialtype/add-memorialtype.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodComponent,
    ChairComponent,
    ShorteatComponent,
    LightComponent,
    SoundComponent,
    HallcoverComponent,
    PhotographyComponent,
    MemorialComponent,
    ClientComponent,
    FunctionComponent,
    ViewClientComponent,
    FirstpageComponent,
    AddshorteatComponent,
    AddchairComponent,
    AddmemorialComponent,
    AddfoodComponent,
    AddsoundComponent,
    AddlightComponent,
    AddphotographyComponent,
    AddhallcoverComponent,
    LoginComponent,
    AdminHomeComponent,
    ViewchairComponent,
    ViewfoodComponent,
    ViewhallcoverComponent,
    ViewlightComponent,
    ViewmemorialComponent,
    ViewphotographyComponent,
    ViewshorteatComponent,
    ViewsoundComponent,
    ViewclientComponent,
    AddclientComponent,
    HomeComponent,
    AddChairtypeComponent,
    AddMemorialtypeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,


    MatProgressSpinnerModule,
    NgbModule,
    MatAutocompleteModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
