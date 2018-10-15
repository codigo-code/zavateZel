import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  public serialCode: any;
  public name: string;
  public price: number;
  public count: number;
  public image: any;
  public err: string;
  public test = 'tes';
  public productList:any;


  constructor(public navCtrl: NavController, private http: Http) {
    this.http.get('https://zavatecrest.herokuapp.com/getProduct/').map(res => res.json()).subscribe(data => {
      this.productList=data;
    });

  }

  recargar(){
    this.http.get('https://zavatecrest.herokuapp.com/getProduct/').map(res => res.json()).subscribe(data => {
      this.productList=data;
    });
  }

  ngOnInit(): void {

  }


}
