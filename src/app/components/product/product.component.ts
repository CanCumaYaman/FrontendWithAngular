import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { threadId } from 'node:worker_threads';
import { Product } from 'src/app/models/product';
//import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  products:Product[] = [];
  dataLoaded=false;
  
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { 

  }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
  if(params["categoryID"]){
    this.getProductsByCategory(params["categoryID"]);
  }else{
    this.getProducts();
  }
   });

    
  }

getProducts(){
this.productService.getProducts().subscribe(response=>
  {
    this.products=response.data;
    this.dataLoaded=true;
  })
}
getProductsByCategory(categoryID:number){
  this.productService.getProductsByCategory(categoryID).subscribe(response=>
    {
      this.products=response.data;
      this.dataLoaded=true;
    })
  }

}
