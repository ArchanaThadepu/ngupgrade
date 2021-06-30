import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateComponent} from "../create/create.component";
import {IndexComponent} from "../index/index.component";
import {AboutYouComponent} from "../about-you/about-you.component";
import {MigProgressionHeaderComponent} from "../mig-progression-header/mig-progression-header.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonHeaderComponent} from "../common-header/common-header.component";
import {NgxMaskModule, IConfig} from 'ngx-mask'
import {AppConstants} from "../../mercury/config/AppConstants";
import {PolicyLineExtensionConfiguration} from "../../integration/quoteandbind/PolicyLineExtensionConfiguration";
import {LocaleConfig} from "../../i18n/LocaleConfig";
import {ContextService} from "../../mercury/services/base/ContextService";
import {InitialLoadingService} from "../../mercury/services/InitialLoadingService";
import {ValidValueService} from "../../mercury/services/ValidValueService";
import {LabelService} from "../../mercury/services/LabelService";
import {HelpService} from "../../mercury/services/HelpService";
import {MessageService} from "../../mercury/services/MessageService";
import {HideShowService} from "../../mercury/services/HideShowService";
import {HttpClientModule} from "@angular/common/http";
import {AddressService} from "../../mercury/services/AddressService";
import {RESTService} from "../../mercury/services/communication/RESTService";
import {VehicleComponent} from "../vehicles/vehicles.component";
import {MIGValidDate} from "../../mercury/directives/MIGValidDate";

@NgModule({
  declarations: [
    MIGValidDate,
    AppComponent,
    MigProgressionHeaderComponent,
    CommonHeaderComponent,

    CreateComponent,
    IndexComponent,
    AboutYouComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    AppConstants, LocaleConfig, ContextService,
    AddressService,
    InitialLoadingService,
    ValidValueService,
    LabelService,
    HelpService,
    MessageService,
    HideShowService,
    RESTService,
    PolicyLineExtensionConfiguration,
    MIGValidDate
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
