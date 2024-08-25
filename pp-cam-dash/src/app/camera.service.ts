import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';  // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getStream(cameraId: string) {
    return this.http.get(`${this.apiUrl}/api/stream/${cameraId}`);
  }

  getLocations() {
    return this.http.get(`${this.apiUrl}/api/locations`);
  }

  getRecordings() {
    return this.http.get(`${this.apiUrl}/api/recordings`);
  }
}
