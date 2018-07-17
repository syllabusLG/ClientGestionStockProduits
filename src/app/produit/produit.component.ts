import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {Produit} from '../shared/produit';
import {ProduitService} from './produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[];

  //variable pour le formulaire
  produitForm: FormGroup;
  operation:string='add';
  selectedProduit:Produit;
  constructor(private produitServie:ProduitService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createFrom();
  }

  ngOnInit() {
    this.initProduit();
    this.produits = this.route.snapshot.data.produits;
  }
  createFrom(){
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixUnitaire: ''
    });
  }
  loadProduits(){
    this.produitServie.getProduits().subscribe(
      data=>{this.produits = data},
      error=>{console.log("An error was occured.")},
      ()=>{console.log('loading produits was done')}
    );
  }
  addProduit(){
    const p = this.produitForm.value;
    this.produitServie.addProduit(p).subscribe(
      res =>{
        this.initProduit();
        this.loadProduits();
      }
    );
  }
  updateProduit(){
    this.produitServie.updateProduit(this.selectedProduit).subscribe(
      res=>{
        this.initProduit();
        this.loadProduits();
      }
    )
  }
  initProduit(){
    this.selectedProduit = new Produit();
    this.createFrom();
  }
  deleteProduit(){
    this.produitServie.deleteProduit(this.selectedProduit.id).subscribe(
      res=>{
        this.selectedProduit = new Produit();
        this.loadProduits();
      }
    );
  }
}
