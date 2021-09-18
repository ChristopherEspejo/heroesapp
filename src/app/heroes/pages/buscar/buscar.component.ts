import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino:string = ''
  heroes:Heroe[]=[];
  hola:boolean=false;
  heroeSeleccionado!:Heroe|undefined;
  constructor(private heroesService:HeroesService) { }
  
  ngOnInit(): void {
  }

  buscando(){
   this.hola= false;
    if(this.termino.trim().length===0){
      this.heroes=[]
    }
  
   if(this.termino.trim().length >0){ 
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe((heroes) => {this.heroes=heroes
    this.hola = true},
      );
     } 
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

  if(!event.option.value){
    this.heroeSeleccionado = undefined;
    return;
  }

    const heroe:Heroe = event.option.value;
    this.termino=heroe.superhero;
    

    this.heroesService.getHeroePorId(heroe.id!)
    .subscribe(heroe =>this.heroeSeleccionado = heroe) 
  }

}
