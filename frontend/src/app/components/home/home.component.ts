import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { FormControl } from '@angular/forms';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import * as jsPDF from 'jspdf';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  count = [];
  constructor(private homeService: HomeService, private httpCLient: HttpClient) { }
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  date = new Date();
  formattedDate = `${this.date.getFullYear().toString().substr(-2)}
  /${(this.date.getMonth() + 1).toString().padStart(2, '0')}
  /${this.date.getDate().toString().padStart(2, '0')}`;

  ngAfterViewInit() { }

  data: any[] = [];
  formattedData: any[] = [];
  currentMonth: string = '01'; // default to January

  dataPoints = [];

  visit: any[] = [];
  chartData: any[] = [];

  monthsFromApi: any[] = []
  ngOnInit(): void {

    this.httpCLient.get('http://localhost:3000/admin/getAllData/').subscribe(data => {

      this.visit.push(data);


      // Initialize the chart data

      this.visit.forEach((element) => {
        element.data.monthly.forEach((monthData) => {
          const newData = {
            month: monthData.monthabs,
            EffectifTotal: element.data.userscount.nbuser,
            NbrAbsense: element.data.allabsences.nbtotal,
            Visiteur: element.data.visitcount.nbvisit,
          };
          this.chartData.push(newData);
        });
      });


      this.formattedData = this.chartData
        .filter((item) => item.month === 'April') // Keep only the data for April
        .map((item) => ({
          label: item.month,
          y: {
            EffectifTotal: item.EffectifTotal,
            NbrAbsense: item.NbrAbsense,
            Visiteur: item.Visiteur,
          },
        }));


      console.log('ssssssss', this.chartData)


      // this.monthsFromApi.forEach((element,index)=>{
      //  this.chartData[index].day = this.monthsFromApi[index][index].monthabs
      // })

      // Format the data for CanvasJS
      const formattedData = this.chartData.map((item) => ({
        label: item.month,
        y: {
          EffectifTotal: item.EffectifTotal,
          NbrAbsense: item.NbrAbsense,
          Visiteur: item.Visiteur,
        },
      }));

      // Initialize the chart
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Data of the month',
        },
        axisX: {
          title: 'Month',
          valueFormatString: 'MMM'
        },
        axisY: {
          title: 'Number of people',
        },
        data: [
          {
            type: 'column',
            name: 'EffectifTotal',
            showInLegend: true,
            legendText: 'EffectifTotal',
            dataPoints: formattedData.map((item) => ({
              label: item.label,
              y: item.y.EffectifTotal,
            })),
          },
          {
            type: 'column',
            name: 'NbrAbsense',
            showInLegend: true,
            legendText: 'NbrAbsense',
            dataPoints: formattedData.map((item) => ({
              label: item.label,
              y: item.y.NbrAbsense,
            })),
          },
          {
            type: 'column',
            name: 'Visiteur',
            showInLegend: true,
            legendText: 'Visiteur',
            dataPoints: formattedData.map((item) => ({
              label: item.label,
              y: item.y.Visiteur,
            })),
          },
        ],
        exportEnabled: true, // enable export button
        exportFileName: "chart", // set export file name
      });

      // Render the chart
      chart.render();

      // Filter by month
      const select = document.getElementById('monthFilter') as HTMLSelectElement;
      if (select) {
        select.addEventListener('change', (event) => {
          const selectedMonth = (event.target as HTMLSelectElement).value;
          const filteredData = formattedData.filter((item) => item.label === selectedMonth);

          chart.options.data[0].dataPoints = filteredData.map((item) => ({
            label: item.label,
            y: item.y.EffectifTotal,
          }));

          chart.options.data[1].dataPoints = filteredData.map((item) => ({
            label: item.label,
            y: item.y.NbrAbsense,
          }));

          chart.options.data[2].dataPoints = filteredData.map((item) => ({
            label: item.label,
            y: item.y.Visiteur,
          }));

          chart.render();
        });
      }
    });



  }

  refreshChart() {
    // Format the data for CanvasJS
    const formattedData = this.chartData.map((item) => ({
      label: item.month,
      y: {
        EffectifTotal: item.EffectifTotal,
        NbrAbsense: item.NbrAbsense,
        Visiteur: item.Visiteur,
      },
    }));

    // Update the chart data
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Data of the month',
      },
      axisX: {
        title: 'Month',
        valueFormatString: 'MMM'
      },
      axisY: {
        title: 'Number of people',
      },
      data: [
        {
          type: 'column',
          name: 'EffectifTotal',
          showInLegend: true,
          legendText: 'EffectifTotal',
          dataPoints: formattedData.map((item) => ({
            label: item.label,
            y: item.y.EffectifTotal,
          })),
        },
        {
          type: 'column',
          name: 'NbrAbsense',
          showInLegend: true,
          legendText: 'NbrAbsense',
          dataPoints: formattedData.map((item) => ({
            label: item.label,
            y: item.y.NbrAbsense,
          })),
        },
        {
          type: 'column',
          name: 'Visiteur',
          showInLegend: true,
          legendText: 'Visiteur',
          dataPoints: formattedData.map((item) => ({
            label: item.label,
            y: item.y.Visiteur,
          })),
        },
      ],
      exportEnabled: true, // enable export button
      exportFileName: "chart", // set export file name
    });

    // Render the chart
    chart.render();

    // Add export button
    // Filter by month
    const select = document.getElementById('monthFilter') as HTMLSelectElement;
    if (select) {
      select.addEventListener('change', (event) => {
        const selectedMonth = (event.target as HTMLSelectElement).value;
        const filteredData = formattedData.filter((item) => item.label === selectedMonth);

        chart.options.data[0].dataPoints = filteredData.map((item) => ({
          label: item.label,
          y: item.y.EffectifTotal,
        }));

        chart.options.data[1].dataPoints = filteredData.map((item) => ({
          label: item.label,
          y: item.y.NbrAbsense,
        }));

        chart.options.data[2].dataPoints = filteredData.map((item) => ({
          label: item.label,
          y: item.y.Visiteur,
        }));

        chart.render();
      });
    }
  }


}
