import {Component, OnInit} from '@angular/core';

declare var SVG: any;
import 'svg.js';
import 'svg.panzoom.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  draw;
  minimap;
  private zoom = 1;
  private baseViewbox;

  ngOnInit() {
    this.draw = SVG('scheme');
    let g = this.draw.group();
    g.add(this.draw.rect(100, 100).attr({ fill: '#f06' }));
    g.add(this.draw.rect(100, 100).attr({ fill: '#000'}).move(200, 350));
    this.baseViewbox = this.draw.viewbox();
    let d = document.getElementById(this.draw.node.id);
    d.addEventListener('wheel', (e) => {
      console.log(e);
      if (e.deltaY > 0) {
        this.zoom += e.deltaY / 1000;
      } else {
        if (this.zoom > 0.1) {
          this.zoom += e.deltaY / 1000;
        }
      }
      console.log(g.rbox());
      const d = this.draw.viewbox();
      this.draw.viewbox(d.x, d.y, this.baseViewbox.width*this.zoom, this.baseViewbox.height*this.zoom);
      console.log(this.zoom);
      if (this.zoom >= 1) {
        this.draw.size(1900*(1+(1-this.zoom)), 800*(1+(1-this.zoom)));
      } else {
        this.draw.size(1900*this.zoom, 800*this.zoom);
      }
    });
    // const s = document.getElementById('scheme').children[0];
    // this.minimap = SVG('minimap').panZoom({zoomMin: 0.5, zoomMax: 20});
    // document.getElementById('minimap').children[0].appendChild(this.draw.parent().children[0].cloneNode(true));
    // const d = this.draw.viewbox();
    // this.minimap.viewbox(0, 0, 1900, 800);
    // console.log('------------------------');
    // console.log(this.draw);
    // console.log(this.minimap);
    // this.draw.on('zoom', function(box, focus) {
    //   console.log(box);
    // });
  }

}
