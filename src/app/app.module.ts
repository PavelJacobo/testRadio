import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomcomponentModule } from './customcomponents/customcomponent.module';
import { SharedcomponentsModule } from './sharedcomponents/sharedcomponents.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomcomponentModule,
    SharedcomponentsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
