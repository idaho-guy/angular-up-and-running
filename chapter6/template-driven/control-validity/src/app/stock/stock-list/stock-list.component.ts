import { Component, OnInit } from '@angular/core';
import {Stock} from "../../model/stock";
import {StockService} from "../../services/stock.service";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
      });
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stockService.toggleFavorite(stock);
  }

}
