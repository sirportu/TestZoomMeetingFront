import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  signatureEndpoint = '';
  apiKey = 'E5MMw61eTMGB4ybLHICeSw';
  secretKey = '8LcDvQIWvAME7avS5uV09MtVeF3hjELqE0LN';
  meetingNumber = 75786013700;
  role = 1;
  leaveUrl = 'http://localhost:4200';
  userName = 'Luis Prueba';
  userEmail = '';
  passWord = 'MmZwMzlZVUJEMks2UGZZd3YrYmxaUT09';
  signature = '';

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: this.apiKey,
      apiSecret: this.secretKey,
      role: this.role,
      success: function(res) {
        console.log(res.result);
      }
    });
    this.startMeeting(this.signature);
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
