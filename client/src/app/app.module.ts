import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { HomeComponent } from './components/home/home.component';
import { UpdatepicComponent } from './components/updatepic/updatepic.component';
import { AddskillComponent } from './components/addskill/addskill.component';
import { ChooseComponent } from './components/choose/choose.component';
import { OrgprofileComponent } from './components/orgprofile/orgprofile.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { CreatejobComponent } from './components/createjob/createjob.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { JobdetailComponent } from './components/jobdetail/jobdetail.component';
import { AddeduComponent } from './components/addedu/addedu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';

const appRoutes: Routes = [
  { path: '', component: ChooseComponent },
  { path: 'loading/:id', component: LoadingComponent },
  { path: 'createjob', component: CreatejobComponent },
  { path: 'jobs', component: JoblistComponent },
  { path: 'jobdetail/:id', component: JobdetailComponent },
  { path: 'updateProfile', component: UpdateprofileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/org/:id', component: OrgprofileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createPost', component: CreatepostComponent },
  { path: 'updatePic', component: UpdatepicComponent },
  { path: 'addSkill/:id', component: AddskillComponent },
  { path: 'addEd/:id', component: AddeduComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreatepostComponent,
    HomeComponent,
    UpdatepicComponent,
    AddskillComponent,
    ChooseComponent,
    OrgprofileComponent,
    UpdateprofileComponent,
    CreatejobComponent,
    JoblistComponent,
    JobdetailComponent,
    AddeduComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    // NgFlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService, AuthService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
