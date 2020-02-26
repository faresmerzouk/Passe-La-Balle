import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  @Input() path: string;
  @Input() icon: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Méthode qui permet de rediriger l'utilisateur vers la page demandée.
   * @param page le chemin de la page voulue.
   */
  btnClick(page) {
    this.router.navigateByUrl(page);
  }
}
