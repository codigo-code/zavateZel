import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public serialCode: any;
  public name: string;
  public price: number;
  public count: number;
  public imageB64: any;
  public description: string;
  public displayImage: boolean = false;
  public message: any;



  constructor(public navCtrl: NavController,
    private qrScanner: QRScanner,
    private camera: Camera,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private http: Http) {

  }


  photo() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageB64 = 'data:image/jpeg;base64,' + imageData;
      this.displayImage = true;
    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

  displayErrorAlert(err) {
    
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }
  scan() {
    this.barcodeScanner.scan().then(data => {
      // this is called when a barcode is found
      this.serialCode = data.text
    });
  }

  showInfo() {
    let alert = this.alertCtrl.create({
      title: 'Genio y super talentoso!',
      subTitle: 'super millonario y adinerado Dante Panella',
      buttons: ['OK']
    });
    alert.present();
  }

  send() {
    let data = {
      name: this.name,
      imageB64: this.imageB64,
      count: this.count,
      serialCode: this.serialCode,
      description: this.description
    };
    this.http.post('https://zavatecrest.herokuapp.com/setPoduct', JSON.stringify(data)).map((response: Response) => {

      let alert = this.alertCtrl.create({
        title: 'Guardado Exitoso',
        subTitle:  this.serialCode + ', se ha guardado exitosamente',
        buttons: ['OK']
      });
      alert.present();

    });

  }
}
