import { ImageData } from "./../../models/image-data";

import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HistoryService {
  
  /**
   * 
   * @param afs Used for the angular firestore
   * @param domSanitizer Used for the bypass urls
   */

  constructor(
    private afs: AngularFirestore,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * Retrive images form the firestore
   */

  getImages() {
    return this.afs
      .collection("images", ref => ref
      .orderBy('timestamp', 'desc')
    )
      .snapshotChanges()
      .pipe(
        map(data =>
          data.map(e => {
            const vl: ImageData = {
              id: e.payload.doc.id,
              isEdit: false,
              imgName: e.payload.doc.data()["imgName"],
              imgUrl: this.domSanitizer.bypassSecurityTrustUrl(
                "data:image/png;base64," + e.payload.doc.data()["imgUrl"]
              )
            };
            return vl;
          })
        )
      );
  }
}
