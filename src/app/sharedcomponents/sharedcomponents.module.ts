import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        NavbarComponent
      ],
      imports: [ CommonModule, RouterModule, PipeModule ],
      exports: [ NavbarComponent, PipeModule ],
      providers: [],
      bootstrap: [AppComponent]
})

export class SharedcomponentsModule {}
