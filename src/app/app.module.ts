import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TextComponent } from './text.component';
import {MdButtonModule, MdToolbarModule} from "@angular/material";
import {DataService} from "./data.service";
import { ButtonsComponent } from './buttons.component';
import {DrumsService} from './drums.service';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule
  ],
  providers: [DataService, DrumsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
