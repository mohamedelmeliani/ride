import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { AuthorProfileComponent } from './components/pages/author-profile/author-profile.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardAddListingsComponent } from './components/pages/dashboard/dashboard-add-listings/dashboard-add-listings.component';
import { DashboardBookingsComponent } from './components/pages/dashboard/dashboard-bookings/dashboard-bookings.component';
import { DashboardMyListingsComponent } from './components/pages/dashboard/dashboard-my-listings/dashboard-my-listings.component';
import { DashboardMyProfileComponent } from './components/pages/dashboard/dashboard-my-profile/dashboard-my-profile.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { GridListingsFullWidthComponent } from './components/pages/grid-listings-full-width/grid-listings-full-width.component';
import { GridListingsLeftSidebarComponent } from './components/pages/grid-listings-left-sidebar/grid-listings-left-sidebar.component';
import { GridListingsRightSidebarComponent } from './components/pages/grid-listings-right-sidebar/grid-listings-right-sidebar.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HowItWorksPageComponent } from './components/pages/how-it-works-page/how-it-works-page.component';
import { ListingsDetailsComponent } from './components/pages/listings-details/listings-details.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { TopPlaceComponent } from './components/pages/top-place/top-place.component';
import { VerticalListingsFullWidthComponent } from './components/pages/vertical-listings-full-width/vertical-listings-full-width.component';
import { VerticalListingsLeftSidebarComponent } from './components/pages/vertical-listings-left-sidebar/vertical-listings-left-sidebar.component';
import { VerticalListingsRightSidebarComponent } from './components/pages/vertical-listings-right-sidebar/vertical-listings-right-sidebar.component';

const routes: Routes = [
    {path: '', component: HomeDemoOneComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'how-it-works', component: HowItWorksPageComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'user-profile', component: AuthorProfileComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'destinations', component: TopPlaceComponent},
    {path: 'vertical-listings-left-sidebar', component: VerticalListingsLeftSidebarComponent},
    {path: 'vertical-listings-right-sidebar', component: VerticalListingsRightSidebarComponent},
    {path: 'vertical-listings-full-width', component: VerticalListingsFullWidthComponent},
    {path: 'grid-listings-left-sidebar', component: GridListingsLeftSidebarComponent},
    {path: 'grid-listings-right-sidebar', component: GridListingsRightSidebarComponent},
    {path: 'grid-listings-full-width', component: GridListingsFullWidthComponent},
    {path: 'single-listings', component: ListingsDetailsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard-bookings', component: DashboardBookingsComponent},
    {path: 'dashboard-my-profile', component: DashboardMyProfileComponent},
    {path: 'dashboard-add-listings', component: DashboardAddListingsComponent},
    {path: 'dashboard-my-listings', component: DashboardMyListingsComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }