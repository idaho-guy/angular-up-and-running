import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { _throw as ObservableThrow } from 'rxjs/observable/throw';
import { of as ObservableOf } from 'rxjs/observable/of';
import { Stock } from 'app/model/stock';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class StockService {

  private stocks: Stock[];
  constructor(private http: HttpClient) {

  }

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>('/api/stock', {
        headers: new HttpHeaders()
        .set('Authorization', 'MyAuthorizationHeaderValue')
        .set('X-EXAMPLE-HEADER', 'TestValue'),
      params: {
      q: 'test',
        test: 'value'
    }
  });
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post('/api/stock',stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>('/api/stock/' + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}
