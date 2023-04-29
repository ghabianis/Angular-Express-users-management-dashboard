import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  date = new Date();
   formattedDate = `${this.date.getFullYear().toString().substr(-2)}/${(this.date.getMonth() + 1).toString().padStart(2, '0')}/${this.date.getDate().toString().padStart(2, '0')}`;

  ngAfterViewInit() {
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "dark", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Benchmark"
      },
      axisY: {
        title: "Infromations"
      },
      data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "Mois",
        dataPoints: [      
          { y: 300878, label: "Janvier" },
          { y: 266455,  label: "Fevrier" },
          { y: 169709,  label: "Mars" },
          { y: 158400,  label: "Avril" },
          { y: 142503,  label: "Mai" },
          { y: 101500, label: "Juin" },
          { y: 97800,  label: "Juillet" },
          { y: 80000,  label: "Aout" },
          { y: 142503,  label: "September" },
          { y: 101500, label: "October" },
          { y: 97800,  label: "November" },
          { y: 80000,  label: "December" }
        ]
      }]
    });
    chart.render();
  }


}
