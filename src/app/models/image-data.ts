import { SafeUrl } from '@angular/platform-browser';

export interface ImageData {
    /**
     * This is the model for retrive data from firestore 
     */
    id: string;
    isEdit: boolean;
    imgName: string;
    imgUrl: SafeUrl | string;
}
