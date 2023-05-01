import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gerer-visiteur',
  templateUrl: './gerer-visiteur.component.html',
  styleUrls: ['./gerer-visiteur.component.scss']
})
export class GererVisiteurComponent implements OnInit {
  date = new Date();
  formattedDate = `${this.date.getFullYear().toString().substr(-2)}
  /${(this.date.getMonth() + 1).toString().padStart(2, '0')}
  /${this.date.getDate().toString().padStart(2, '0')}`;

  constructor(private homeService: HomeService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getVisits()
  }

  data: any[] = []
  element: any

  getVisits() {
    this.homeService.getAllVisits().subscribe(resp => {
      console.log(resp)
      const visits = Object.values(resp).map((visit) => ({
        id: visit.id,
        nom: visit.nom,
        prenom: visit.prenom,
        date_arrivee: visit.date_arrivee,
        raison: visit.raison
      }));
      this.data.push(...visits);
      console.log(this.data)
    })
  }
 
  deleteVisiteur(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this visitor data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.homeService.deleteVisiteur(id).subscribe();
        Swal.fire(
          'Deleted!',
          'Visitor data has been deleted.',
          'success'
        ).then(()=>{this.refresh()});
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Visitor data is safe :)',
          'error'
        )
      }
    })
  }
  
  formData = {
    nom: '',
    prenom: '',
    date_arrivee: '',
    raison: ''
  };
  refresh(): void {
    window.location.reload();
}


  submitData(formData: any) {
    const url = 'http://localhost:3000/admin/createvisit';
    this.httpClient.post(url, formData).subscribe(
      (response) => {
        Swal.fire('Success!', 'Data has been submitted.', 'success').then(()=>{this.refresh()});
      },
      (error) => {
        Swal.fire('Error!', 'Error occurred while submitting data.', 'error');
      }
    );
  }

}
