import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-update/:id', component: ProductUpdateComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

// const routes: Routes = [
//   {
//     path: '',
//     component: LayoutClientComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'about', component: AboutComponent },
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent },
//       { path: 'product/:id', component: ProductDetailComponent },
//     ],
//   },
//   {
//     path: 'admin',
//     component: LayoutAdminComponent,
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'products', component: ProductsComponent },
//       { path: 'create-product', component: CreateProductComponent },
//     ],
//   },

//   { path: '**', component: NotfoundComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
