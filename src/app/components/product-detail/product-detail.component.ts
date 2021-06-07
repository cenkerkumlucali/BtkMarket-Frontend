import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/models/product';
import { ProductCommentDetails } from 'src/app/models/productCommentDetail';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductCommentService } from 'src/app/services/product-comment.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products:ProductDetail[]=[]
  productDto:ProductDetail
  brandId:number
  productComment:ProductCommentDetails[]=[]
  Images:string[]=[]
  imageBasePath = environment.imageUrl;
  defaultImg="/images/default.jpg"
  constructor(private productService:ProductService,
              private productCommentService:ProductCommentService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService,
              private cartService:CartService,
              private authService:AuthService,
              private dialogService:DialogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      if(params["productId"]){
       await this.getProductDetail(params["productId"]);
        this.getCommentByProductId(params["productId"])
      }
    });
   
  }

   async getProductDetail(productId:number){
   let productDetail=(await this.productService.getProductDetailByProductId(productId).toPromise())

   this.productDto = productDetail.data[0];
   console.log(this.productDto);
   this.Images = this.productDto.images;
   this.getProductDetailByBrandId()
  
  }

   getProductDetailByBrandId(){
   this.productService.getProductDetailByBrandId(this.productDto.brandId).subscribe((response)=>{
    this.products = response.data
    console.log(this.products);
    this.Images = this.productDto.images;
  
   })
}
  getCommentByProductId(productId:number){
    this.productCommentService.getDetailByProductId(productId).subscribe((response)=>{
      this.productComment = response.data
    })
  }
  addToCart(product:ProductDetail){
    this.cartService.add({
      userId:this.authService.getCurrentUserId(),
      brandId:product.brandId,
      productId:product.productId,
      count:1
    }).subscribe((response)=>{
      this.toastrService.success(response.message)
    })
  }
  openComment() {
    const ref = this.dialogService.open(CommentComponent, {
      data: {
        productDto: this.productDto
      },
      header: 'Yorum yap',
      width: '50%',
    });
  }
}
