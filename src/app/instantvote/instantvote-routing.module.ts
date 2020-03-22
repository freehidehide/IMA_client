import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InstantvoteComponent } from "./Instantvote.component";

const routes: Routes = [
    {
        path: "",
        component: InstantvoteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstantvoteRoutingModule {}
