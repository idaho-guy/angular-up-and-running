import { Component, OnInit } from '@angular/core';
import { Stock } from 'app/model/stock';
import {StockService} from "../../services/stock.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
  providers: [MessageService] // this providers entry creates a MessageService for this class
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  public message = null;
  constructor(private stockService: StockService) {
    this.initializeStock();
  }

  initializeStock() {                 2
    this.stock =  {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    };
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      this.stockService.createStock(this.stock)
        .subscribe((result: any) => {
          this.message = result.msg;
          this.initializeStock();      3
        }, (err) => {
          this.message = err.error.msg;
        });
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}
