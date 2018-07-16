import { Component, OnInit } from '@angular/core';
import {Stock} from "../../model/stock";
import {StockService} from "../../services/stock.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../services/auth.service";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;

  constructor(private stockService: StockService, private authService: AuthService) { }

  ngOnInit() {
    this.stocks$ = this.stockService.getStocks()
      .pipe(share());
  }

  fetchStocks() {
    this.stocks$ = this.stockService.getStocks();
  }

  setAuthToken() {
    this.authService.authToken = 'TESTING';
  }

  resetAuthToken() {
    this.authService.authToken = null;
  }

  makeFailingCall() {
    this.stockService.makeFailingCall().subscribe(
      (res) => console.log('Successfully made failing call', res),
      (err) => console.error('Error making failing call', err));
  }

}
