import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { ListResponseModel } from '../models/listResponseModel';
import { ProductComment } from '../models/productComment';
import { ProductCommentDetails } from '../models/productCommentDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductCommentService {
apiUrl=environment.baseUrl
  constructor(private httpClient:HttpClient) { }

  add(productComment:ProductComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"productcomment/add",productComment)
  }
  getDetail():Observable<ListResponseModel<ProductCommentDetails>>{
    return this.httpClient.get<ListResponseModel<ProductCommentDetails>>(this.apiUrl+"productcomment/getalldetails")
  }
  getDetailByProductId(productId:number):Observable<ListResponseModel<ProductCommentDetails>>{
    return this.httpClient.get<ListResponseModel<ProductCommentDetails>>(this.apiUrl+"productComment/getalldetailsbyproductid?productId="+productId)
  }
}