import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent {
  data: any[] = [];
  displayedColumns: String[] = ['position','image', 'name','delete'];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 150; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  eliminarPokemon(row: any) {
    const index = this.data.findIndex((pokemon: any) => pokemon === row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSource.data = this.data;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any){
      console.log(row);
  }
}
