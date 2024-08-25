import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../camera.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera',
  standalone: true,
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  imports: [CommonModule]
})
export class CameraComponent implements OnInit {
  locations: any[] = [];
  currentStreamUrl: string | null = null;
  JSMpeg: any;

  @ViewChild('streaming', { static: false }) streamingcanvas!: ElementRef; 

  constructor(private cameraService: CameraService) {
    if (typeof window !== 'undefined') {
      import('jsmpeg-player').then((JSMpegModule) => {
        this.JSMpeg = JSMpegModule.default;
        console.log('JSMpeg library loaded successfully');
      }).catch(error => {
        console.error('Error loading JSMpeg:', error);
      });
    }
  }

  ngOnInit(): void {
    this.cameraService.getLocations().subscribe((data: any) => {
      this.locations = data;
      console.log('Locations data loaded:', data);
    }, error => {
      console.error('Error loading locations:', error);
    });
  }

  viewStream(cameraId: string) {
    console.log(`Requesting stream for camera ID: ${cameraId}`);
    this.cameraService.getStream(cameraId).subscribe((data: any) => {
      if (!data || !data.message) {
        console.error('Invalid API response:', data);
        return;
      }

      const wsUrl = `ws://localhost:${data.message.split('ws://localhost:')[1]}`;
      console.log('WebSocket URL:', wsUrl);

      if (typeof wsUrl !== 'string') {
        console.error('WebSocket URL is not a string:', wsUrl);
        return;
      }

      this.currentStreamUrl = wsUrl; // Update the current stream URL

      const videoElement = document.getElementById('cameraStream') as HTMLCanvasElement;

      if (!videoElement) {
        console.error('Canvas element not found or does not exist in the DOM');
        return;
      }

      if (!(videoElement instanceof HTMLCanvasElement)) {
        console.error('Canvas element is not a canvas');
        return;
      }

      if (this.JSMpeg) {
        console.log('Initializing JSMpeg Player...');
        const player = new this.JSMpeg.Player(wsUrl, {
          canvas: this.streamingcanvas.nativeElement,
          autoplay: true,
          audio: false,
          loop: true,
          responsive: false
        });

        console.log('JSMpeg Player initialized. Awaiting video stream...');
      }
    }, error => {
      console.error('Error fetching stream URL:', error);
    });
  }
}
